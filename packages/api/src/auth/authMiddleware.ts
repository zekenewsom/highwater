import { Request, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'dev-access-secret';

interface JWTPayload {
  sub: string;
  email?: string;
  [key: string]: unknown;
}

export interface AuthRequest extends Request {
  user?: {
    sub: string;
    email?: string;
    [key: string]: unknown;
  };
}

// Middleware to authenticate JWTs (access tokens)
export const authenticateJWT: RequestHandler = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing or invalid Authorization header' });
    return;
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ error: 'Invalid or expired token' });
      return;
    }
    // Only attach non-sensitive claims
    const payload = decoded as JWTPayload;
    (req as AuthRequest).user = {
      sub: payload.sub,
      email: payload.email,
      // Add other non-sensitive claims if needed
    };
    next();
  });
};
