import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from './routes';
import logger from './utils/logger';

const app: Application = express();

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req: Request, res: Response, _next: NextFunction) => {
  logger.info({ message: 'Incoming request', method: req.method, url: req.url });
  _next();
});

// Mount all routes
app.use('/api/v1', routes);

// 404 handler
app.use((req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error({ message: err.message, stack: err.stack });
  const status = (err as { status?: number }).status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

export default app;
