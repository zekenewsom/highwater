import request from 'supertest';
import { createTestApp } from '../setup';

const app = createTestApp();

describe('Assets API Integration Tests', () => {
  describe('GET /api/v1/assets/live', () => {
    it('should return assets data', async () => {
      const response = await request(app)
        .get('/api/v1/assets/live')
        .expect(200);

      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should support query parameters', async () => {
      const response = await request(app)
        .get('/api/v1/assets/live?start=1&limit=5&convert=USD')
        .expect(200);

      expect(response.body).toBeDefined();
    });
  });

  describe('GET /api/v1/assets/cache', () => {
    it('should return cached assets data', async () => {
      const response = await request(app)
        .get('/api/v1/assets/cache')
        .expect(200);

      expect(response.body).toBeDefined();
    });
  });

  describe('Error handling', () => {
    it('should return 404 for non-existent endpoint', async () => {
      await request(app)
        .get('/api/v1/assets/nonexistent')
        .expect(404);
    });
  });
}); 