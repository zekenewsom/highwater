import express, { Request, Response } from 'express';
import {
  createPortfolioController,
  getPortfoliosController,
  updatePortfolioController,
  deletePortfolioController,
} from '../controllers/portfoliosController';
import { authenticateJWT } from '../auth/authMiddleware';

import { baseStyles } from "../utils/baseStyles";
const router = express.Router();

// Advanced JSON API endpoints for frontend consumption
router.get('/api/v2/portfolios', async (req: Request, res: Response) => {
  try {
    // TODO: Replace with actual DB call
    const portfolios = [
      { id: '1', name: 'Growth Portfolio', clientId: '1', assets: 5, value: 1250000, performance: 12.5, risk: 'Moderate' },
      { id: '2', name: 'Income Portfolio', clientId: '2', assets: 7, value: 890000, performance: 8.2, risk: 'Conservative' },
      { id: '3', name: 'Aggressive Portfolio', clientId: '1', assets: 12, value: 2100000, performance: 18.7, risk: 'High' },
    ];
    
    // Support for filtering and pagination
    const { page = 1, limit = 10, clientId, risk } = req.query;
    let filteredPortfolios = portfolios;
    
    if (clientId) {
      filteredPortfolios = filteredPortfolios.filter(p => p.clientId === clientId);
    }
    
    if (risk) {
      filteredPortfolios = filteredPortfolios.filter(p => p.risk === risk);
    }
    
    // Pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedPortfolios = filteredPortfolios.slice(startIndex, endIndex);
    
    res.setHeader('Content-Type', 'application/json');
    res.json({
      success: true,
      data: paginatedPortfolios,
      count: paginatedPortfolios.length,
      total: filteredPortfolios.length,
      page: Number(page),
      totalPages: Math.ceil(filteredPortfolios.length / Number(limit)),
      filters: { clientId, risk }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch portfolios',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

router.get('/api/v2/portfolios/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // TODO: Replace with actual DB call
    const portfolio = { 
      id, 
      name: 'Growth Portfolio', 
      clientId: '1', 
      assets: 5,
      value: 1250000,
      performance: 12.5,
      risk: 'Moderate',
      allocation: {
        stocks: 60,
        bonds: 25,
        alternatives: 10,
        cash: 5
      },
      holdings: [
        { symbol: 'AAPL', name: 'Apple Inc.', weight: 15, value: 187500 },
        { symbol: 'MSFT', name: 'Microsoft Corp.', weight: 12, value: 150000 },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', weight: 10, value: 125000 }
      ]
    };
    
    res.setHeader('Content-Type', 'application/json');
    res.json({
      success: true,
      data: portfolio
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch portfolio',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Advanced portfolio analytics endpoint
router.get('/api/v2/portfolios/:id/analytics', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { period = '1y' } = req.query;
    
    // TODO: Replace with actual analytics calculation
    const analytics = {
      portfolioId: id,
      period,
      returns: {
        total: 12.5,
        annualized: 11.8,
        monthly: [2.1, -1.2, 3.4, 1.8, -0.5, 2.9, 1.2, -0.8, 2.1, 1.5, 0.9, 1.8]
      },
      risk: {
        volatility: 8.2,
        sharpeRatio: 1.45,
        maxDrawdown: -5.2,
        beta: 0.95
      },
      performance: {
        vsBenchmark: 2.1,
        vsSector: 1.8,
        percentile: 75
      }
    };
    
    res.setHeader('Content-Type', 'application/json');
    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch portfolio analytics',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Portfolio rebalancing endpoint
router.post('/api/v2/portfolios/:id/rebalance', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { targetAllocation } = req.body;
    
    // TODO: Implement actual rebalancing logic
    const rebalanceResult = {
      portfolioId: id,
      currentAllocation: {
        stocks: 60,
        bonds: 25,
        alternatives: 10,
        cash: 5
      },
      targetAllocation,
      trades: [
        { symbol: 'AAPL', action: 'BUY', shares: 50, value: 7500 },
        { symbol: 'BND', action: 'SELL', shares: 100, value: 8500 }
      ],
      estimatedCost: 1500,
      estimatedTaxImpact: 250
    };
    
    res.setHeader('Content-Type', 'application/json');
    res.json({
      success: true,
      data: rebalanceResult,
      message: 'Rebalancing analysis completed'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to analyze rebalancing',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// DEPRECATED: Legacy HTML endpoint (will be removed in v3)
router.get('/', async (req: Request, res: Response) => {
  // Add deprecation warning header
  res.setHeader('X-API-Deprecation-Warning', 'This endpoint is deprecated and will be removed in API v3. Please use /api/v2/portfolios instead.');
  res.setHeader('X-API-Deprecation-Date', '2024-12-31');
  
  // TODO: Replace with actual DB call
  const portfolios = [
    { id: '1', name: 'Growth Portfolio', clientId: '1', assets: 5 },
    { id: '2', name: 'Income Portfolio', clientId: '2', assets: 7 },
  ];
  res.send(`
    <html>
      <head>
        <title>Portfolios - DEPRECATED</title>
        <style>${baseStyles}</style>
      </head>
      <body>
        <div class="container">
          <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 1rem; margin-bottom: 1rem; border-radius: 4px;">
            <strong>⚠️ Deprecation Warning:</strong> This HTML endpoint is deprecated and will be removed in API v3. 
            Please use the new JSON API at <code>/api/v2/portfolios</code> for better performance and features.
          </div>
          <nav>
            <a href="/">Dashboard</a>
            <a href="/profile">Profile</a>
            <a href="/api/v1/clients">Clients</a>
            <a href="/logout">Log Out</a>
          </nav>
          <h2>Portfolios</h2>
          <table>
            <thead>
              <tr><th>Name</th><th>Client ID</th><th># Assets</th><th class="actions">Actions</th></tr>
            </thead>
            <tbody>
              ${portfolios.map(p => `
                <tr>
                  <td>${p.name}</td>
                  <td>${p.clientId}</td>
                  <td>${p.assets}</td>
                  <td class="actions">
                    <button class="btn" disabled>Edit</button>
                    <button class="btn" disabled>Delete</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <button class="btn" style="margin-top:2rem;" disabled>Add Portfolio</button>
        </div>
      </body>
    </html>
  `);
});

// API endpoints (if needed)
// router.post('/', authenticateJWT, createPortfolioController);
// router.get('/', authenticateJWT, getPortfoliosController);
// router.put('/:id', authenticateJWT, updatePortfolioController);
// router.delete('/:id', authenticateJWT, deletePortfolioController);

export default router;
