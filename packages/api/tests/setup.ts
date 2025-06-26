import dotenv from 'dotenv';

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.COINMARKETCAP_API_KEY = 'test_api_key_12345';
process.env.ALPACA_API_KEY = 'test_alpaca_key';
process.env.ALPACA_SECRET_KEY = 'test_alpaca_secret';
process.env.JWT_SECRET = 'test_jwt_secret_key_for_testing_only';
process.env.LOG_LEVEL = 'error';

// Load environment variables for testing
dotenv.config({ path: '.env.test' });

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