import request from 'supertest';
import app from '../../src/app';

describe('Portfolios API Integration Tests', () => {
  describe('GET /api/v1/portfolios', () => {
    it('should return portfolios dashboard HTML', async () => {
      const response = await request(app)
        .get('/api/v1/portfolios')
        .expect(200);

      expect(response.text).toContain('<title>Portfolios</title>');
      expect(response.text).toContain('Growth Portfolio');
      expect(response.text).toContain('Income Portfolio');
    });

    it('should include navigation links', async () => {
      const response = await request(app)
        .get('/api/v1/portfolios')
        .expect(200);

      expect(response.text).toContain('href="/"');
      expect(response.text).toContain('href="/api/v1/clients"');
    });

    it('should display portfolio table with correct structure', async () => {
      const response = await request(app)
        .get('/api/v1/portfolios')
        .expect(200);

      expect(response.text).toContain('<table>');
      expect(response.text).toContain('<thead>');
      expect(response.text).toContain('<tbody>');
      expect(response.text).toContain('Name');
      expect(response.text).toContain('Client ID');
      expect(response.text).toContain('# Assets');
      expect(response.text).toContain('Actions');
    });

    it('should include portfolio data in table rows', async () => {
      const response = await request(app)
        .get('/api/v1/portfolios')
        .expect(200);

      // Check for specific portfolio data
      expect(response.text).toContain('Growth Portfolio');
      expect(response.text).toContain('Income Portfolio');
      expect(response.text).toContain('1'); // Client ID
      expect(response.text).toContain('2'); // Client ID
      expect(response.text).toContain('5'); // Assets count
      expect(response.text).toContain('7'); // Assets count
    });

    it('should include action buttons for each portfolio', async () => {
      const response = await request(app)
        .get('/api/v1/portfolios')
        .expect(200);

      // Check for Edit and Delete buttons
      const editButtonCount = (response.text.match(/Edit/g) || []).length;
      const deleteButtonCount = (response.text.match(/Delete/g) || []).length;
      
      expect(editButtonCount).toBeGreaterThan(0);
      expect(deleteButtonCount).toBeGreaterThan(0);
    });

    it('should include proper CSS styling', async () => {
      const response = await request(app)
        .get('/api/v1/portfolios')
        .expect(200);

      expect(response.text).toContain('<style>');
      expect(response.text).toContain('font-family: Arial, sans-serif');
      expect(response.text).toContain('background: #f7f9fb');
      expect(response.text).toContain('color: #2d72d9');
      expect(response.text).toContain('border-radius: 8px');
    });
  });

  describe('Portfolio Data Structure', () => {
    it('should return consistent portfolio data format', async () => {
      const response = await request(app)
        .get('/api/v1/portfolios')
        .expect(200);

      // Verify the mock data structure is consistent
      expect(response.text).toContain('Growth Portfolio');
      expect(response.text).toContain('Income Portfolio');
      expect(response.text).toContain('Client ID');
      expect(response.text).toContain('# Assets');
    });
  });

  describe('Error Handling', () => {
    it('should handle malformed requests gracefully', async () => {
      // Test with invalid query parameters
      const response = await request(app)
        .get('/api/v1/portfolios?invalid=param')
        .expect(200); // Should still return the dashboard

      expect(response.text).toContain('Portfolios');
    });

    it('should return 404 for non-existent routes', async () => {
      await request(app)
        .get('/api/v1/portfolios/nonexistent')
        .expect(404);
    });
  });
}); 