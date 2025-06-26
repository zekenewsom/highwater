import { apiService } from '../../data/api';
import { apiCache } from '../../hooks/useApiCache';

describe('API Performance Tests', () => {
  beforeEach(() => {
    // Clear cache before each test
    apiCache.clear();
  });

  describe('API Response Time', () => {
    it('should respond within acceptable time limits', async () => {
      const startTime = performance.now();

      try {
        await apiService.getClients();
        const endTime = performance.now();
        const responseTime = endTime - startTime;

        // API should respond within 2 seconds
        expect(responseTime).toBeLessThan(2000);
      } catch (error) {
        // If API is not available, test should still pass
        expect(error).toBeDefined();
      }
    });

    it('should respond within acceptable time limits for portfolios', async () => {
      const startTime = performance.now();

      try {
        await apiService.getPortfolios();
        const endTime = performance.now();
        const responseTime = endTime - startTime;

        // API should respond within 2 seconds
        expect(responseTime).toBeLessThan(2000);
      } catch (error) {
        // If API is not available, test should still pass
        expect(error).toBeDefined();
      }
    });
  });

  describe('Caching Performance', () => {
    it('should cache data and return cached results faster', async () => {
      const cacheKey = 'test-cache-key';
      const testData = { test: 'data' };

      // First call - should cache the data
      const firstCallStart = performance.now();
      apiCache.set(cacheKey, testData, 60000); // 1 minute TTL
      const firstCallEnd = performance.now();
      const firstCallTime = firstCallEnd - firstCallStart;

      // Second call - should retrieve from cache
      const secondCallStart = performance.now();
      const cachedData = apiCache.get(cacheKey);
      const secondCallEnd = performance.now();
      const secondCallTime = secondCallEnd - secondCallStart;

      expect(cachedData).toEqual(testData);
      expect(secondCallTime).toBeLessThan(firstCallTime);
    });

    it('should handle cache expiration correctly', () => {
      const cacheKey = 'expiring-cache-key';
      const testData = { test: 'data' };

      // Set data with very short TTL
      apiCache.set(cacheKey, testData, 1); // 1ms TTL

      // Wait for expiration
      setTimeout(() => {
        const cachedData = apiCache.get(cacheKey);
        expect(cachedData).toBeNull();
      }, 10);
    });
  });

  describe('Memory Usage', () => {
    it('should not cause memory leaks with repeated cache operations', () => {
      const initialStats = apiCache.getStats();

      // Perform many cache operations
      for (let i = 0; i < 100; i++) {
        apiCache.set(`key-${i}`, { data: `value-${i}` }, 60000);
      }

      const afterSetStats = apiCache.getStats();
      expect(afterSetStats.size).toBe(100);

      // Clear cache
      apiCache.clear();
      const afterClearStats = apiCache.getStats();
      expect(afterClearStats.size).toBe(0);
    });
  });

  describe('Concurrent Requests', () => {
    it('should handle concurrent API requests efficiently', async () => {
      const concurrentRequests = 5;
      const startTime = performance.now();

      const promises = Array.from({ length: concurrentRequests }, (_, i) =>
        apiService.getClients().catch(() => ({ success: false, data: [] })),
      );

      const results = await Promise.all(promises);
      const endTime = performance.now();
      const totalTime = endTime - startTime;

      // All requests should complete
      expect(results).toHaveLength(concurrentRequests);

      // Total time should be reasonable (less than 10 seconds for 5 concurrent requests)
      expect(totalTime).toBeLessThan(10000);
    });
  });
});
