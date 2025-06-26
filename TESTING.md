# Highwater Testing Guide

This document outlines the testing strategy and setup for the Highwater project, which includes both API and web packages.

## Overview

The testing strategy focuses on:
- **API Integration Tests**: Testing all API endpoints with real HTTP requests
- **Web Unit Tests**: Testing individual React components in isolation
- **Web Integration Tests**: Testing user flows and component interactions
- **End-to-End Tests**: Testing complete user journeys (planned)

## Test Structure

```
highwater/
├── packages/
│   ├── api/
│   │   ├── tests/
│   │   │   ├── setup.ts                 # Test setup and utilities
│   │   │   └── integration/             # API integration tests
│   │   │       ├── portfolios.test.ts
│   │   │       ├── clients.test.ts
│   │   │       ├── assets.test.ts
│   │   │       ├── risk.test.ts
│   │   │       └── compliance.test.ts
│   │   └── jest.config.js              # Jest configuration
│   └── web/
│       ├── src/
│       │   ├── components/
│       │   │   └── __tests__/           # Component unit tests
│       │   │       ├── NetWorthOverview.test.tsx
│       │   │       ├── HoldingsTable.test.tsx
│       │   │       ├── NavBar.test.tsx
│       │   │       ├── AllocationBreakdown.test.tsx
│       │   │       └── AddButtonWithDropdown.test.tsx
│       │   └── __tests__/
│       │       └── integration/         # User flow integration tests
│       │           └── DashboardFlow.test.tsx
│       ├── jest.config.js              # Jest configuration
│       └── jest.setup.js               # Test setup and mocks
```

## Setup Instructions

### Prerequisites

1. Install dependencies:
```bash
pnpm install
```

2. Install testing dependencies (if not already installed):
```bash
cd packages/api && pnpm add -D jest @types/jest supertest @types/supertest ts-jest
cd packages/web && pnpm add -D jest @types/jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom ts-jest
```

### Environment Setup

1. Create test environment file for API:
```bash
# packages/api/.env.test
DATABASE_URL="file:./test.db"
NODE_ENV="test"
```

2. Create test environment file for web:
```bash
# packages/web/.env.test
NEXT_PUBLIC_API_URL="http://localhost:3001"
NODE_ENV="test"
```

## Running Tests

### API Tests

```bash
cd packages/api

# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run only integration tests
pnpm test:integration
```

### Web Tests

```bash
cd packages/web

# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run end-to-end tests (when implemented)
pnpm test:e2e
```

### Root Level Commands

```bash
# Run all tests across packages
pnpm test

# Run tests with coverage
pnpm test:coverage
```

## Test Coverage Goals

### API Package (Target: 90%+)
- **Routes**: 100% coverage for all API endpoints
- **Controllers**: 90% coverage for business logic
- **Services**: 90% coverage for data processing
- **Middleware**: 100% coverage for authentication and validation

### Web Package (Target: 80%+)
- **Components**: 80% coverage for all React components
- **Hooks**: 90% coverage for custom hooks
- **Utils**: 90% coverage for utility functions
- **Integration**: 70% coverage for user flows

## Test Types

### API Integration Tests

These tests verify that API endpoints work correctly with real HTTP requests:

```typescript
// Example: portfolios.test.ts
describe('Portfolios API Integration Tests', () => {
  describe('GET /api/v1/portfolios', () => {
    it('should return HTML dashboard with portfolios data', async () => {
      const response = await request(app)
        .get('/api/v1/portfolios')
        .expect(200);

      expect(response.type).toBe('text/html');
      expect(response.text).toContain('Portfolios');
    });
  });
});
```

**Coverage Areas:**
- ✅ Portfolios endpoints
- ✅ Clients endpoints
- ✅ Assets endpoints
- ✅ Risk endpoints
- ✅ Compliance endpoints
- ✅ Authentication middleware
- ✅ Error handling

### Web Unit Tests

These tests verify individual React components work correctly:

```typescript
// Example: NetWorthOverview.test.tsx
describe('NetWorthOverview', () => {
  it('renders net worth overview component', () => {
    render(<NetWorthOverview />);
    
    expect(screen.getByText(/Net Worth/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Assets/i)).toBeInTheDocument();
  });
});
```

**Coverage Areas:**
- ✅ NetWorthOverview component
- ✅ HoldingsTable component
- ✅ NavBar component
- ✅ AllocationBreakdown component
- ✅ AddButtonWithDropdown component
- ✅ All chart components
- ✅ Form components

### Web Integration Tests

These tests verify user flows and component interactions:

```typescript
// Example: DashboardFlow.test.tsx
describe('Dashboard Integration Tests', () => {
  describe('Dashboard Navigation Flow', () => {
    it('should navigate between dashboard sections', async () => {
      // Test complete user journey
    });
  });
});
```

**Coverage Areas:**
- ✅ Dashboard navigation flow
- ✅ Portfolio management flow
- ✅ Client management flow
- ✅ Data loading states
- ✅ Error handling

## Mocking Strategy

### API Mocks
- Database connections are mocked for unit tests
- External API calls are mocked
- Authentication is mocked for testing

### Web Mocks
- Next.js router is mocked
- Recharts components are mocked
- External API calls are mocked
- Authentication context is mocked

## Continuous Integration

### GitHub Actions Workflow

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test-api:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: pnpm install
      - run: cd packages/api && pnpm test:coverage
      
  test-web:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: pnpm install
      - run: cd packages/web && pnpm test:coverage
```

## Best Practices

### Writing Tests

1. **Test Structure**: Use describe blocks to group related tests
2. **Test Names**: Use descriptive names that explain the expected behavior
3. **Arrange-Act-Assert**: Structure tests with clear setup, action, and verification
4. **Isolation**: Each test should be independent and not rely on other tests
5. **Mocking**: Mock external dependencies to ensure test reliability

### Test Data

1. **Fixtures**: Use consistent test data across tests
2. **Factories**: Create helper functions to generate test data
3. **Cleanup**: Always clean up test data after tests

### Coverage

1. **Critical Paths**: Ensure all critical user flows are tested
2. **Edge Cases**: Test error conditions and edge cases
3. **Accessibility**: Test that components are accessible
4. **Performance**: Test that components render efficiently

## Troubleshooting

### Common Issues

1. **TypeScript Errors**: Ensure @types/jest is installed
2. **Module Resolution**: Check tsconfig.json paths configuration
3. **Environment Variables**: Ensure .env.test files are created
4. **Mock Issues**: Verify mocks are properly configured in jest.setup.js

### Debugging Tests

1. **Verbose Output**: Use `--verbose` flag for detailed test output
2. **Single Test**: Use `--testNamePattern` to run specific tests
3. **Debug Mode**: Use `--detectOpenHandles` to find hanging processes

## Future Enhancements

### Planned Improvements

1. **End-to-End Tests**: Add Playwright tests for complete user journeys
2. **Visual Regression Tests**: Add visual testing for UI components
3. **Performance Tests**: Add performance testing for critical paths
4. **Security Tests**: Add security testing for authentication and authorization
5. **Load Tests**: Add load testing for API endpoints

### Test Automation

1. **Pre-commit Hooks**: Add pre-commit hooks to run tests
2. **Coverage Thresholds**: Set minimum coverage thresholds
3. **Test Reports**: Generate detailed test reports
4. **Test Metrics**: Track test performance and reliability

## Contributing

When adding new features:

1. **Write Tests First**: Follow TDD principles when possible
2. **Update Documentation**: Update this guide when adding new test types
3. **Maintain Coverage**: Ensure new code has adequate test coverage
4. **Review Tests**: Have tests reviewed along with code changes

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Playwright Documentation](https://playwright.dev/docs/intro) 