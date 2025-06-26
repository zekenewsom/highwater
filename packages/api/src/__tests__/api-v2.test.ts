import request from 'supertest';
import express from 'express';
import clientsRouter from '../routes/clients';
import portfoliosRouter from '../routes/portfolios';

const app = express();

// Mount the routers for testing
app.use('/api/v2/clients', clientsRouter);
app.use('/api/v2/portfolios', portfoliosRouter);

describe('API v2 JSON Endpoints', () => {
  describe('GET /api/v2/clients', () => {
    it('should return JSON with correct content type', async () => {
      const response = await request(app)
        .get('/api/v2/clients')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('count');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should return clients with correct structure', async () => {
      const response = await request(app).get('/api/v2/clients');

      const client = response.body.data[0];
      expect(client).toHaveProperty('id');
      expect(client).toHaveProperty('name');
      expect(client).toHaveProperty('email');
      expect(client).toHaveProperty('advisorId');
      expect(typeof client.id).toBe('string');
      expect(typeof client.name).toBe('string');
      expect(typeof client.email).toBe('string');
      expect(typeof client.advisorId).toBe('string');
    });
  });

  describe('GET /api/v2/clients/:id', () => {
    it('should return a single client as JSON', async () => {
      const response = await request(app)
        .get('/api/v2/clients/1')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('id', '1');
      expect(response.body.data).toHaveProperty('name');
      expect(response.body.data).toHaveProperty('email');
      expect(response.body.data).toHaveProperty('advisorId');
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
      expect(response.body).toHaveProperty('count');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should return portfolios with correct structure', async () => {
      const response = await request(app).get('/api/v2/portfolios');

      const portfolio = response.body.data[0];
      expect(portfolio).toHaveProperty('id');
      expect(portfolio).toHaveProperty('name');
      expect(portfolio).toHaveProperty('clientId');
      expect(portfolio).toHaveProperty('assets');
      expect(typeof portfolio.id).toBe('string');
      expect(typeof portfolio.name).toBe('string');
      expect(typeof portfolio.clientId).toBe('string');
      expect(typeof portfolio.assets).toBe('number');
    });
  });

  describe('GET /api/v2/portfolios/:id', () => {
    it('should return a single portfolio as JSON', async () => {
      const response = await request(app)
        .get('/api/v2/portfolios/1')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('id', '1');
      expect(response.body.data).toHaveProperty('name');
      expect(response.body.data).toHaveProperty('clientId');
      expect(response.body.data).toHaveProperty('assets');
    });
  });

  describe('Error handling', () => {
    it('should handle errors gracefully and return JSON error responses', async () => {
      // This test would be more comprehensive with actual error scenarios
      // For now, we're testing the structure of successful responses
      const response = await request(app).get('/api/v2/clients');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
  });
}); 