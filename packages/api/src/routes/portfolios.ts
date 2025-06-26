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


// Portfolios dashboard with mock data for UI/UX
router.get('/', async (req: Request, res: Response) => {
  // TODO: Replace with actual DB call
  const portfolios = [
    { id: '1', name: 'Growth Portfolio', clientId: '1', assets: 5 },
    { id: '2', name: 'Income Portfolio', clientId: '2', assets: 7 },
  ];
  res.send(`
    <html>
      <head>
        <title>Portfolios</title>
        <style>${baseStyles}</style>
      </head>
      <body>
        <div class="container">
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
