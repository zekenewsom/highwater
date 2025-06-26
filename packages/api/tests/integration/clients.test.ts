import request from 'supertest';
import app from '../../src/app';

describe('Clients API Integration Tests', () => {
  describe('GET /api/v1/clients', () => {
    it('should return clients dashboard HTML', async () => {
      const response = await request(app)
        .get('/api/v1/clients')
        .expect(200);

      expect(response.text).toContain('<title>Clients</title>');
      expect(response.text).toContain('Alice Smith');
      expect(response.text).toContain('Bob Johnson');
    });

    it('should include navigation links', async () => {
      const response = await request(app)
        .get('/api/v1/clients')
        .expect(200);

      expect(response.text).toContain('href="/"');
      expect(response.text).toContain('href="/api/v1/portfolios"');
    });

    it('should display client table with correct structure', async () => {
      const response = await request(app)
        .get('/api/v1/clients')
        .expect(200);

      expect(response.text).toContain('<table>');
      expect(response.text).toContain('<thead>');
      expect(response.text).toContain('<tbody>');
      expect(response.text).toContain('Name');
      expect(response.text).toContain('Email');
      expect(response.text).toContain('Advisor ID');
      expect(response.text).toContain('Actions');
    });

    it('should include client data in table rows', async () => {
      const response = await request(app)
        .get('/api/v1/clients')
        .expect(200);

      // Check for specific client data
      expect(response.text).toContain('Alice Smith');
      expect(response.text).toContain('Bob Johnson');
      expect(response.text).toContain('alice@example.com');
      expect(response.text).toContain('bob@example.com');
      expect(response.text).toContain('A123');
      expect(response.text).toContain('A456');
    });

    it('should include action buttons for each client', async () => {
      const response = await request(app)
        .get('/api/v1/clients')
        .expect(200);

      // Check for Edit and Delete buttons
      const editButtonCount = (response.text.match(/Edit/g) || []).length;
      const deleteButtonCount = (response.text.match(/Delete/g) || []).length;
      
      expect(editButtonCount).toBeGreaterThan(0);
      expect(deleteButtonCount).toBeGreaterThan(0);
    });

    it('should include proper CSS styling', async () => {
      const response = await request(app)
        .get('/api/v1/clients')
        .expect(200);

      expect(response.text).toContain('<style>');
      expect(response.text).toContain('font-family: Arial, sans-serif');
      expect(response.text).toContain('background: #f7f9fb');
      expect(response.text).toContain('color: #2d72d9');
      expect(response.text).toContain('border-radius: 8px');
    });
  });

  describe('Client Data Structure', () => {
    it('should return consistent client data format', async () => {
      const response = await request(app)
        .get('/api/v1/clients')
        .expect(200);

      // Verify the mock data structure is consistent
      expect(response.text).toContain('Alice Smith');
      expect(response.text).toContain('Bob Johnson');
      expect(response.text).toContain('alice@example.com');
      expect(response.text).toContain('bob@example.com');
    });
  });

  describe('Error Handling', () => {
    it('should handle malformed requests gracefully', async () => {
      // Test with invalid query parameters
      const response = await request(app)
        .get('/api/v1/clients?invalid=param')
        .expect(200); // Should still return the dashboard

      expect(response.text).toContain('Clients');
    });

    it('should return 404 for non-existent routes', async () => {
      await request(app)
        .get('/api/v1/clients/nonexistent')
        .expect(404);
    });
  });
}); 