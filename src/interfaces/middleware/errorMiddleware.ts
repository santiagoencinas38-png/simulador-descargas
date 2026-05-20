import { Request, Response, NextFunction } from 'express';

/**
 * Interface for domain errors
 */
export interface IErrorDominio extends Error {
  codigo: string;
  statusCode: number;
}

/**
 * Global error handler
 */
export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', error.message);

  const errorDominio = error as IErrorDominio;

  const statusCode = errorDominio?.statusCode || 500;
  const codigo = errorDominio?.codigo || 'INTERNAL_ERROR';

  res.status(statusCode).json({
    error: error.message || 'Error interno del servidor',
    codigo,
    statusCode
  });
};