import request from 'supertest';
import { createTestApp } from '../setup';

const app = createTestApp();

describe('Portfolios API Integration Tests', () => {
  describe('GET /api/v1/portfolios', () => {
    it('should return portfolios dashboard HTML', async () => {
      const response = await request(app)
        .get('/api/v1/portfolios')
        .expect(200);

      expect(response.text).toContain('<title>Portfolios - DEPRECATED</title>');
      expect(response.text).toContain('Growth Portfolio');
      expect(response.text).toContain('Income Portfolio');
    });

    it('should include navigation links', async () => {
      const response = await request(app)
        .get('/api/v1/portfolios')
        .expect(200);

      expect(response.text).toContain('href="/"');
      expect(response.text).toContain('href="/profile"');
      expect(response.text).toContain('href="/api/v1/clients"');
    });

    it('should display portfolios table with correct structure', async () => {
      const response = await request(app)
        .get('/api/v1/portfolios')
        .expect(200);

      expect(response.text).toContain('<table>');
      expect(response.text).toContain('<th>Name</th>');
      expect(response.text).toContain('<th>Client ID</th>');
      expect(response.text).toContain('<th># Assets</th>');
    });

    it('should include action buttons', async () => {
      const response = await request(app)
        .get('/api/v1/portfolios')
        .expect(200);

      expect(response.text).toContain('Edit</button>');
      expect(response.text).toContain('Delete</button>');
      expect(response.text).toContain('Add Portfolio</button>');
    });

    it('should apply CSS styling', async () => {
      const response = await request(app)
        .get('/api/v1/portfolios')
        .expect(200);

      expect(response.text).toContain('font-family: Arial, sans-serif');
      expect(response.text).toContain('background: #f7f9fb');
      expect(response.text).toContain('border-radius: 8px');
    });

    it('should handle invalid query parameters gracefully', async () => {
      const response = await request(app)
        .get('/api/v1/portfolios?invalid=param')
        .expect(200);

      expect(response.text).toContain('Growth Portfolio');
      expect(response.text).toContain('Income Portfolio');
    });

    it('should return 404 for non-existent portfolio', async () => {
      await request(app)
        .get('/api/v1/portfolios/nonexistent')
        .expect(404);
    });
  });

  describe('GET /api/v2/portfolios', () => {
    it('should return JSON with correct content type', async () => {
      const response = await request(app)
        .get('/api/v2/portfolios')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
    });

    it('should return portfolios with correct structure', async () => {
      const response = await request(app).get('/api/v2/portfolios');

      const portfolio = response.body.data[0];
      expect(portfolio).toHaveProperty('id');
      expect(portfolio).toHaveProperty('name');
      expect(portfolio).toHaveProperty('clientId');
      expect(portfolio).toHaveProperty('assets');
      expect(portfolio).toHaveProperty('value');
      expect(portfolio).toHaveProperty('performance');
      expect(portfolio).toHaveProperty('risk');
    });

    it('should support pagination', async () => {
      const response = await request(app)
        .get('/api/v2/portfolios?page=1&limit=2')
        .expect(200);

      expect(response.body.data).toHaveLength(2);
      expect(response.body).toHaveProperty('page', 1);
      expect(response.body).toHaveProperty('totalPages');
    });

    it('should support filtering by client ID', async () => {
      const response = await request(app)
        .get('/api/v2/portfolios?clientId=1')
        .expect(200);

      expect(response.body.data.every((portfolio: any) => portfolio.clientId === '1')).toBe(true);
    });

    it('should support filtering by risk level', async () => {
      const response = await request(app)
        .get('/api/v2/portfolios?risk=Moderate')
        .expect(200);

      expect(response.body.data.every((portfolio: any) => portfolio.risk === 'Moderate')).toBe(true);
    });
  });
}); 