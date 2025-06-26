import { Request, Response } from 'express';
import {
  createClientController,
  getClientsController,
  updateClientController,
  deleteClientController,
} from '../../../src/controllers/clientsController';
import { AuthRequest } from '../../../src/auth/authMiddleware';

// Mock the DAL layer
jest.mock('../../../src/dal/clientsDal', () => ({
  createClient: jest.fn(),
  getClients: jest.fn(),
  updateClient: jest.fn(),
  deleteClient: jest.fn(),
}));

import {
  createClient,
  getClients,
  updateClient,
  deleteClient,
} from '../../../src/dal/clientsDal';

describe('Clients Controller', () => {
  let mockRequest: Partial<AuthRequest>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockRequest = {
      body: {},
      params: {},
      user: { sub: 'test-user-id', email: 'test@example.com' }
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createClientController', () => {
    it('should create a client successfully', async () => {
      const clientData = {
        name: 'John Doe',
        email: 'john@example.com',
        advisorId: 'A123'
      };
      const createdClient = { id: '1', ...clientData };

      mockRequest.body = clientData;
      (createClient as jest.Mock).mockResolvedValue(createdClient);

      await createClientController(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(createClient).toHaveBeenCalledWith(clientData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(createdClient);
    });

    it('should return 400 for missing required fields', async () => {
      mockRequest.body = { name: 'John Doe' }; // Missing email

      await createClientController(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Missing required fields: name, email'
      });
    });

    it('should handle duplicate email error', async () => {
      const error = new Error('Unique constraint failed');
      (error as any).code = 'P2002';

      mockRequest.body = {
        name: 'John Doe',
        email: 'john@example.com'
      };
      (createClient as jest.Mock).mockRejectedValue(error);

      await createClientController(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(409);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Email must be unique'
      });
    });

    it('should pass other errors to next middleware', async () => {
      const error = new Error('Database error');
      mockRequest.body = {
        name: 'John Doe',
        email: 'john@example.com'
      };
      (createClient as jest.Mock).mockRejectedValue(error);

      await createClientController(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('getClientsController', () => {
    it('should return all clients successfully', async () => {
      const clients = [
        { id: '1', name: 'Alice Smith', email: 'alice@example.com' },
        { id: '2', name: 'Bob Johnson', email: 'bob@example.com' }
      ];

      (getClients as jest.Mock).mockResolvedValue(clients);

      await getClientsController(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(getClients).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(clients);
    });

    it('should handle errors and pass to next middleware', async () => {
      const error = new Error('Database error');
      (getClients as jest.Mock).mockRejectedValue(error);

      await getClientsController(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('updateClientController', () => {
    it('should update a client successfully', async () => {
      const clientId = '1';
      const updates = { name: 'Updated Name' };
      const updatedClient = { id: clientId, ...updates };

      mockRequest.params = { id: clientId };
      mockRequest.body = updates;
      (updateClient as jest.Mock).mockResolvedValue(updatedClient);

      await updateClientController(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(updateClient).toHaveBeenCalledWith(clientId, updates);
      expect(mockResponse.json).toHaveBeenCalledWith(updatedClient);
    });

    it('should handle client not found error', async () => {
      const error = new Error('Record not found');
      (error as any).code = 'P2025';

      mockRequest.params = { id: '999' };
      mockRequest.body = { name: 'Updated Name' };
      (updateClient as jest.Mock).mockRejectedValue(error);

      await updateClientController(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Client not found'
      });
    });
  });

  describe('deleteClientController', () => {
    it('should delete a client successfully', async () => {
      const clientId = '1';
      mockRequest.params = { id: clientId };
      (deleteClient as jest.Mock).mockResolvedValue(undefined);

      await deleteClientController(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(deleteClient).toHaveBeenCalledWith(clientId);
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
    });

    it('should handle client not found error', async () => {
      const error = new Error('Record not found');
      (error as any).code = 'P2025';

      mockRequest.params = { id: '999' };
      (deleteClient as jest.Mock).mockRejectedValue(error);

      await deleteClientController(
        mockRequest as AuthRequest,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Client not found'
      });
    });
  });
}); 