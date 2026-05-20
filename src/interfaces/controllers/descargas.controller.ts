import { Request, Response, NextFunction } from 'express';

/**
 * POST /api/descargas
 */
export const crearDescarga = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { url, tipo, maxReintentos = 3 } = req.body;

    // TODO: Student implementation
    // - Validate URL
    // - Create Descarga entity
    // - Get WorkerPool
    // - Enqueue task

    res.status(201).json({
      id: 'xxx',
      url,
      tipo,
      estado: 'PENDIENTE',
      mensaje: 'Descarga encolada'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/descargas/:id/estado
 */
export const obtenerEstadoDescarga = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    // TODO: Student implementation
    // - Query repository

    res.json({
      id,
      estado: 'EN_PROGRESO',
      progreso: 45,
      intentos: 1
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/descargas
 */
export const listarDescargas = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // TODO: Student implementation
    // - Query repository

    res.json({
      descargas: [],
      total: 0
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/descargas/:id/reintentar
 */
export const reintentarDescarga = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    // TODO: Student implementation
    // - Validate state
    // - Re-enqueue

    res.json({
      id,
      estado: 'REINTENTANDO',
      mensaje: 'Descarga reencolada'
    });
  } catch (error) {
    next(error);
  }
};