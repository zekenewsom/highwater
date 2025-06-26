import dotenv from 'dotenv';
import request from 'supertest';
import express from 'express';
import { auth, requiresAuth } from 'express-openid-connect';

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.COINMARKETCAP_API_KEY = 'test_api_key_12345';
process.env.ALPACA_API_KEY = 'test_alpaca_key';
process.env.ALPACA_SECRET_KEY = 'test_alpaca_secret';
process.env.JWT_SECRET = 'test_jwt_secret_key_for_testing_only';
process.env.LOG_LEVEL = 'error';

// Load environment variables for testing
dotenv.config({ path: '.env.test' });

// Mock Auth0 OpenID Connect for testing
jest.mock('express-openid-connect', () => ({
  auth: jest.fn(() => (req: any, res: any, next: any) => next()),
  requiresAuth: jest.fn(() => (req: any, res: any, next: any) => next()),
}));

// Mock JWT verification for testing
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn((token, secret, callback) => {
    if (token === 'valid-token') {
      callback(null, { sub: 'test-user-id', email: 'test@example.com' });
    } else {
      callback(new Error('Invalid token'), null);
    }
  }),
}));

// Mock external API calls
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({
    data: {
      data: [
        {
          id: 1,
          name: 'Bitcoin',
          symbol: 'BTC',
          quote: {
            USD: {
              price: 50000,
              market_cap: 1000000000,
              volume_24h: 50000000
            }
          }
        }
      ]
    }
  }))
}));

// Mock Prisma client
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    client: {
      findMany: jest.fn(() => Promise.resolve([
        { id: '1', name: 'Alice Smith', email: 'alice@example.com', advisorId: 'A123' },
        { id: '2', name: 'Bob Johnson', email: 'bob@example.com', advisorId: 'A456' }
      ])),
      findUnique: jest.fn(() => Promise.resolve({ id: '1', name: 'Alice Smith', email: 'alice@example.com' })),
      create: jest.fn((data) => Promise.resolve({ id: '3', ...data.data })),
      update: jest.fn((data) => Promise.resolve({ id: data.where.id, ...data.data })),
      delete: jest.fn(() => Promise.resolve({ id: '1' }))
    },
    portfolio: {
      findMany: jest.fn(() => Promise.resolve([
        { id: '1', name: 'Growth Portfolio', clientId: '1', assets: 5 },
        { id: '2', name: 'Income Portfolio', clientId: '2', assets: 7 }
      ])),
      findUnique: jest.fn(() => Promise.resolve({ id: '1', name: 'Growth Portfolio', clientId: '1' })),
      create: jest.fn((data) => Promise.resolve({ id: '3', ...data.data })),
      update: jest.fn((data) => Promise.resolve({ id: data.where.id, ...data.data })),
      delete: jest.fn(() => Promise.resolve({ id: '1' }))
    },
    $connect: jest.fn(),
    $disconnect: jest.fn()
  }))
}));

// Global test setup
beforeAll(async () => {
  // Setup test database or mocks here
});

afterAll(async () => {
  // Cleanup after all tests
});

// Global test utilities
export const createTestUser = () => ({
  id: 'test-user-id',
  email: 'test@example.com',
  name: 'Test User'
});

export const createTestPortfolio = () => ({
  id: 'test-portfolio-id',
  name: 'Test Portfolio',
  clientId: 'test-client-id',
  assets: 5
});

export const createTestClient = () => ({
  id: 'test-client-id',
  name: 'Test Client',
  email: 'client@example.com',
  advisorId: 'test-advisor-id'
});

// Test utilities
export const createTestApp = (): express.Application => {
  const app = express();
  
  // Add basic middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // Add routes
  app.use('/', require('../../src/routes').default);
  
  return app;
};

export const createAuthenticatedRequest = (app: express.Application) => {
  return request(app).set('Authorization', 'Bearer valid-token');
};

// Global test timeout
jest.setTimeout(10000); 