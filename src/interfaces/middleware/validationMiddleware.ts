import { Request, Response, NextFunction } from 'express';

/**
 * Validates body structure for creating a download
 */
export const validarCreacionDescarga = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { url, tipo } = req.body;

  if (!url || typeof url !== 'string') {
    res.status(400).json({ error: 'URL requerida y debe ser string' });
    return;
  }

  if (!tipo || !['http', 'ftp', 'mock'].includes(tipo)) {
    res.status(400).json({
      error: 'tipo requerido, debe ser: http, ftp o mock'
    });
    return;
  }

  next();
};