import express, { Request, Response } from 'express';
import {
  createClientController,
  getClientsController,
  updateClientController,
  deleteClientController,
} from '../controllers/clientsController';
import { authenticateJWT } from '../auth/authMiddleware';

import { baseStyles } from "../utils/baseStyles";
const router = express.Router();


// Clients dashboard with mock data for UI/UX
router.get('/', async (req: Request, res: Response) => {
  // TODO: Replace with actual DB call
  const clients = [
    { id: '1', name: 'Alice Smith', email: 'alice@example.com', advisorId: 'A123' },
    { id: '2', name: 'Bob Johnson', email: 'bob@example.com', advisorId: 'A456' },
  ];
  res.send(`
    <html>
      <head>
        <title>Clients</title>
        <style>${baseStyles}</style>
      </head>
      <body>
        <div class="container">
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
              ${clients.map(c => `
                <tr>
                  <td>${c.name}</td>
                  <td>${c.email}</td>
                  <td>${c.advisorId}</td>
                  <td class="actions">
                    <button class="btn" disabled>Edit</button>
                    <button class="btn" disabled>Delete</button>
                  </td>
                </tr>
              `).join('')}
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
