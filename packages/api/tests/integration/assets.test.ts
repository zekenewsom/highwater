import request from 'supertest';
import app from '../../src/app';

describe('Assets API Integration Tests', () => {
  describe('GET /api/v1/assets/live', () => {
    it('should return assets data', async () => {
      const response = await request(app)
        .get('/api/v1/assets/live')
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

  describe('Error Handling', () => {
    it('should return 404 for non-existent routes', async () => {
      await request(app)
        .get('/api/v1/assets/nonexistent')
        .expect(404);
    });
  });
}); 