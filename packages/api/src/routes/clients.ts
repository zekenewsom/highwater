import express, { Request, Response, Router } from 'express';
import {
  createClientController,
  getClientsController,
  updateClientController,
  deleteClientController,
} from '../controllers/clientsController';
import { authenticateJWT } from '../auth/authMiddleware';

import { baseStyles } from '../utils/baseStyles';
const router: Router = express.Router();

// Advanced JSON API endpoints for frontend consumption
router.get('/api/v2/clients', async (req: Request, res: Response) => {
  try {
    // TODO: Replace with actual DB call
    const clients = [
      {
        id: '1',
        name: 'Alice Smith',
        email: 'alice@example.com',
        advisorId: 'A123',
        status: 'Active',
        totalAssets: 2500000,
        riskProfile: 'Moderate',
      },
      {
        id: '2',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        advisorId: 'A456',
        status: 'Active',
        totalAssets: 1800000,
        riskProfile: 'Conservative',
      },
      {
        id: '3',
        name: 'Carol Davis',
        email: 'carol@example.com',
        advisorId: 'A123',
        status: 'Prospect',
        totalAssets: 0,
        riskProfile: 'Aggressive',
      },
    ];

    // Support for filtering and pagination
    const { page = 1, limit = 10, advisorId, status, riskProfile } = req.query;
    let filteredClients = clients;

    if (advisorId) {
      filteredClients = filteredClients.filter((c) => c.advisorId === advisorId);
    }

    if (status) {
      filteredClients = filteredClients.filter((c) => c.status === status);
    }

    if (riskProfile) {
      filteredClients = filteredClients.filter((c) => c.riskProfile === riskProfile);
    }

    // Pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedClients = filteredClients.slice(startIndex, endIndex);

    res.setHeader('Content-Type', 'application/json');
    res.json({
      success: true,
      data: paginatedClients,
      count: paginatedClients.length,
      total: filteredClients.length,
      page: Number(page),
      totalPages: Math.ceil(filteredClients.length / Number(limit)),
      filters: { advisorId, status, riskProfile },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch clients',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

router.get('/api/v2/clients/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // TODO: Replace with actual DB call
    const client = {
      id,
      name: 'Alice Smith',
      email: 'alice@example.com',
      advisorId: 'A123',
      status: 'Active',
      totalAssets: 2500000,
      riskProfile: 'Moderate',
      contactInfo: {
        phone: '+1-555-0123',
        address: '123 Main St, New York, NY 10001',
        emergencyContact: 'John Smith (+1-555-0124)',
      },
      preferences: {
        communication: 'Email',
        reportingFrequency: 'Monthly',
        riskTolerance: 'Moderate',
      },
      portfolios: [
        { id: '1', name: 'Growth Portfolio', value: 1500000 },
        { id: '3', name: 'Aggressive Portfolio', value: 1000000 },
      ],
    };

    res.setHeader('Content-Type', 'application/json');
    res.json({
      success: true,
      data: client,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch client',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Advanced client analytics endpoint
router.get('/api/v2/clients/:id/analytics', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { period = '1y' } = req.query;

    // TODO: Replace with actual analytics calculation
    const analytics = {
      clientId: id,
      period,
      portfolioPerformance: {
        totalReturn: 15.2,
        benchmarkReturn: 12.1,
        excessReturn: 3.1,
        riskAdjustedReturn: 1.25,
      },
      assetAllocation: {
        stocks: 65,
        bonds: 20,
        alternatives: 10,
        cash: 5,
      },
      riskMetrics: {
        volatility: 12.5,
        sharpeRatio: 1.15,
        maxDrawdown: -8.2,
        var95: -2.1,
      },
      clientBehavior: {
        loginFrequency: 12,
        reportViews: 8,
        tradeActivity: 3,
        communicationRequests: 2,
      },
    };

    res.setHeader('Content-Type', 'application/json');
    res.json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch client analytics',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Client onboarding endpoint
router.post('/api/v2/clients/onboard', async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { name: _name, email: _email, advisorId: _advisorId, riskProfile: _riskProfile, initialInvestment: _initialInvestment } = req.body;

    // TODO: Implement actual onboarding logic
    const onboardingResult = {
      clientId: 'new-client-id',
      status: 'Pending',
      nextSteps: [
        'Complete risk assessment questionnaire',
        'Provide identification documents',
        'Set up account funding',
        'Schedule initial consultation',
      ],
      estimatedTimeline: '5-7 business days',
      requiredDocuments: [
        'Government-issued ID',
        'Proof of address',
        'Employment verification',
        'Source of funds documentation',
      ],
    };

    res.setHeader('Content-Type', 'application/json');
    res.json({
      success: true,
      data: onboardingResult,
      message: 'Client onboarding initiated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to initiate client onboarding',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// DEPRECATED: Legacy HTML endpoint (will be removed in v3)
router.get('/', async (req: Request, res: Response) => {
  // Add deprecation warning header
  res.setHeader(
    'X-API-Deprecation-Warning',
    'This endpoint is deprecated and will be removed in API v3. Please use /api/v2/clients instead.',
  );
  res.setHeader('X-API-Deprecation-Date', '2024-12-31');

  // TODO: Replace with actual DB call
  const clients = [
    { id: '1', name: 'Alice Smith', email: 'alice@example.com', advisorId: 'A123' },
    { id: '2', name: 'Bob Johnson', email: 'bob@example.com', advisorId: 'A456' },
  ];
  res.send(`
    <html>
      <head>
        <title>Clients - DEPRECATED</title>
        <style>${baseStyles}</style>
      </head>
      <body>
        <div class="container">
          <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 1rem; margin-bottom: 1rem; border-radius: 4px;">
            <strong>⚠️ Deprecation Warning:</strong> This HTML endpoint is deprecated and will be removed in API v3. 
            Please use the new JSON API at <code>/api/v2/clients</code> for better performance and features.
          </div>
          <nav>
            <a href="/">Dashboard</a>
            <a href="/profile">Profile</a>
            <a href="/api/v1/portfolios">Portfolios</a>
            <a href="/logout">Log Out</a>
          </nav>
          <h2>Clients</h2>
          <table>
            <thead>
              <tr><th>Name</th><th>Email</th><th>Advisor ID</th><th class="actions">Actions</th></tr>
            </thead>
            <tbody>
              ${clients
                .map(
                  (c) => `
                <tr>
                  <td>${c.name}</td>
                  <td>${c.email}</td>
                  <td>${c.advisorId}</td>
                  <td class="actions">
                    <button class="btn" disabled>Edit</button>
                    <button class="btn" disabled>Delete</button>
                  </td>
                </tr>
              `,
                )
                .join('')}
            </tbody>
          </table>
          <button class="btn" style="margin-top:2rem;" disabled>Add Client</button>
        </div>
      </body>
    </html>
  `);
});

// API endpoints (if needed)
// router.post('/', authenticateJWT, createClientController);
// router.get('/', authenticateJWT, getClientsController);
// router.put('/:id', authenticateJWT, updateClientController);
// router.delete('/:id', authenticateJWT, deleteClientController);

export default router;
