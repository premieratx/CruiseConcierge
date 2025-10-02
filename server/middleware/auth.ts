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
  console.log('🔒 requireAdmin middleware called for:', req.method, req.path);
  console.log('   isAuthenticated:', req.isAuthenticated?.());
  console.log('   user:', req.user);
  
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    console.log('   ❌ Not authenticated - returning 401');
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  const user = req.user as Express.User;
  if (user.role !== 'admin') {
    console.log('   ❌ Not admin - returning 403');
    return res.status(403).json({ error: 'Admin access required' });
  }
  
  console.log('   ✅ Admin authenticated - proceeding');
  next();
}
