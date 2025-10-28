import { Router } from "express";
import type { Request, Response, NextFunction } from "express";

const router = Router();

export function registerRoutes() {
  // Health check
  router.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Basic routes - add all your API routes here
  router.get('/test', (req, res) => {
    res.json({ message: 'API is working' });
  });

  // Add any other routes from your original file here
  
  return router;
}