import type { Request, Response, NextFunction } from "express";
import type { User } from "@shared/schema";

declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
      username: string;
      role: string;
      firstName?: string;
      lastName?: string;
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  // Check for development admin token (supports frontend dev mode)
  const authHeader = req.headers?.authorization;
  if (authHeader === 'Bearer admin-dev-token') {
    return next();
  }
  
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  const user = req.user as Express.User;
  if (user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  
  next();
}
