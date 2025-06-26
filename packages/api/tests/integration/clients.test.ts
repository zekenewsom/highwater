import request from 'supertest';
import { createTestApp } from '../setup';

const app = createTestApp();

describe('Clients API Integration Tests', () => {
  describe('GET /api/v1/clients', () => {
    it('should return clients dashboard HTML', async () => {
      const response = await request(app)
        .get('/api/v1/clients')
        .expect(200);

      expect(response.text).toContain('<title>Clients - DEPRECATED</title>');
      expect(response.text).toContain('Alice Smith');
      expect(response.text).toContain('Bob Johnson');
    });

    it('should include navigation links', async () => {
      const response = await request(app)
        .get('/api/v1/clients')
        .expect(200);

      expect(response.text).toContain('href="/"');
      expect(response.text).toContain('href="/profile"');
      expect(response.text).toContain('href="/api/v1/portfolios"');
    });

    it('should display clients table with correct structure', async () => {
      const response = await request(app)
        .get('/api/v1/clients')
        .expect(200);

      expect(response.text).toContain('<table>');
      expect(response.text).toContain('<th>Name</th>');
      expect(response.text).toContain('<th>Email</th>');
      expect(response.text).toContain('<th>Advisor ID</th>');
    });

    it('should include action buttons', async () => {
      const response = await request(app)
        .get('/api/v1/clients')
        .expect(200);

      expect(response.text).toContain('Edit</button>');
      expect(response.text).toContain('Delete</button>');
      expect(response.text).toContain('Add Client</button>');
    });

    it('should apply CSS styling', async () => {
      const response = await request(app)
        .get('/api/v1/clients')
        .expect(200);

      expect(response.text).toContain('font-family: Arial, sans-serif');
      expect(response.text).toContain('background: #f7f9fb');
      expect(response.text).toContain('border-radius: 8px');
    });

    it('should handle invalid query parameters gracefully', async () => {
      const response = await request(app)
        .get('/api/v1/clients?invalid=param')
        .expect(200);

      expect(response.text).toContain('Alice Smith');
      expect(response.text).toContain('Bob Johnson');
    });

    it('should return 404 for non-existent client', async () => {
      await request(app)
        .get('/api/v1/clients/nonexistent')
        .expect(404);
    });
  });

  describe('GET /api/v2/clients', () => {
    it('should return JSON with correct content type', async () => {
      const response = await request(app)
        .get('/api/v2/clients')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
    });

    it('should return clients with correct structure', async () => {
      const response = await request(app).get('/api/v2/clients');

      const client = response.body.data[0];
      expect(client).toHaveProperty('id');
      expect(client).toHaveProperty('name');
      expect(client).toHaveProperty('email');
      expect(client).toHaveProperty('advisorId');
      expect(client).toHaveProperty('status');
      expect(client).toHaveProperty('totalAssets');
      expect(client).toHaveProperty('riskProfile');
    });

    it('should support pagination', async () => {
      const response = await request(app)
        .get('/api/v2/clients?page=1&limit=2')
        .expect(200);

      expect(response.body.data).toHaveLength(2);
      expect(response.body).toHaveProperty('page', 1);
      expect(response.body).toHaveProperty('totalPages');
    });

    it('should support filtering by advisor ID', async () => {
      const response = await request(app)
        .get('/api/v2/clients?advisorId=A123')
        .expect(200);

      expect(response.body.data.every((client: any) => client.advisorId === 'A123')).toBe(true);
    });

    it('should support filtering by status', async () => {
      const response = await request(app)
        .get('/api/v2/clients?status=Active')
        .expect(200);

      expect(response.body.data.every((client: any) => client.status === 'Active')).toBe(true);
    });

    it('should support filtering by risk profile', async () => {
      const response = await request(app)
        .get('/api/v2/clients?riskProfile=Moderate')
        .expect(200);

      expect(response.body.data.every((client: any) => client.riskProfile === 'Moderate')).toBe(true);
    });
  });
}); 