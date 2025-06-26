import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ClientsList } from '../../components/ClientsList';
import { apiService } from '../../data/api';

// Mock the API service
jest.mock('../../data/api', () => ({
  apiService: {
    getClients: jest.fn(),
  },
  ApiError: class extends Error {
    constructor(
      message: string,
      public status: number,
    ) {
      super(message);
      this.name = 'ApiError';
    }
  },
}));

const mockApiService = apiService as jest.Mocked<typeof apiService>;

describe('ClientsList', () => {
  const mockClients = [
    {
      id: '1',
      name: 'Alice Smith',
      email: 'alice@example.com',
      advisorId: 'A123',
      status: 'Active' as const,
      totalAssets: 500000,
      riskProfile: 'Moderate' as const,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: '2',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      advisorId: 'A456',
      status: 'Active' as const,
      totalAssets: 750000,
      riskProfile: 'Aggressive' as const,
      createdAt: '2024-01-02T00:00:00Z',
      updatedAt: '2024-01-02T00:00:00Z',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state initially', () => {
    mockApiService.getClients.mockImplementation(() => new Promise(() => {}));

    render(<ClientsList />);

    expect(screen.getByText('Loading clients...')).toBeInTheDocument();
  });

  it('should render clients list when data is loaded successfully', async () => {
    mockApiService.getClients.mockResolvedValue({
      success: true,
      data: mockClients,
      count: 2,
    });

    render(<ClientsList />);

    await waitFor(() => {
      expect(screen.getByText('Clients')).toBeInTheDocument();
      expect(screen.getByText('2 clients found')).toBeInTheDocument();
      expect(screen.getByText('Alice Smith')).toBeInTheDocument();
      expect(screen.getByText('alice@example.com')).toBeInTheDocument();
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
      expect(screen.getByText('bob@example.com')).toBeInTheDocument();
    });
  });

  it('should render error state when API call fails', async () => {
    const errorMessage = 'Failed to fetch clients';
    mockApiService.getClients.mockRejectedValue(new Error(errorMessage));

    render(<ClientsList />);

    await waitFor(() => {
      expect(screen.getByText('Error loading clients')).toBeInTheDocument();
      expect(screen.getByText('An unexpected error occurred')).toBeInTheDocument();
    });
  });

  it('should call onClientSelect when a client is clicked', async () => {
    const mockOnClientSelect = jest.fn();
    mockApiService.getClients.mockResolvedValue({
      success: true,
      data: mockClients,
      count: 2,
    });

    render(<ClientsList onClientSelect={mockOnClientSelect} />);

    await waitFor(() => {
      expect(screen.getByText('View Details')).toBeInTheDocument();
    });

    const viewDetailsButton = screen.getAllByText('View Details')[0];
    viewDetailsButton.click();

    expect(mockOnClientSelect).toHaveBeenCalledWith(mockClients[0]);
  });

  it('should display client initials in avatar', async () => {
    mockApiService.getClients.mockResolvedValue({
      success: true,
      data: mockClients,
      count: 2,
    });

    render(<ClientsList />);

    await waitFor(() => {
      expect(screen.getByText('AS')).toBeInTheDocument(); // Alice Smith initials
      expect(screen.getByText('BJ')).toBeInTheDocument(); // Bob Johnson initials
    });
  });

  it('should display advisor ID for each client', async () => {
    mockApiService.getClients.mockResolvedValue({
      success: true,
      data: mockClients,
      count: 2,
    });

    render(<ClientsList />);

    await waitFor(() => {
      expect(screen.getByText('Advisor: A123')).toBeInTheDocument();
      expect(screen.getByText('Advisor: A456')).toBeInTheDocument();
    });
  });

  it('should handle single client correctly', async () => {
    const singleClient = [mockClients[0]];
    mockApiService.getClients.mockResolvedValue({
      success: true,
      data: singleClient,
      count: 1,
    });

    render(<ClientsList />);

    await waitFor(() => {
      expect(screen.getByText('1 client found')).toBeInTheDocument();
    });
  });
});
