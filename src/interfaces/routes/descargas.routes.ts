import { Router } from 'express';
import {
  crearDescarga,
  obtenerEstadoDescarga,
  listarDescargas,
  reintentarDescarga
} from '../controllers/descargas.controller';
import { validarCreacionDescarga } from '../middleware/validationMiddleware';

const router = Router();

/**
 * @swagger
 * /api/descargas:
 *   post:
 *     summary: Crear nueva descarga
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *               tipo:
 *                 type: string
 *                 enum: [http, ftp, mock]
 *               maxReintentos:
 *                 type: number
 *     responses:
 *       201:
 *         description: Descarga creada exitosamente
 */
router.post('/', validarCreacionDescarga, crearDescarga);

/**
 * @swagger
 * /api/descargas:
 *   get:
 *     summary: Listar todas las descargas
 *     responses:
 *       200:
 *         description: Lista de descargas
 */
router.get('/', listarDescargas);

/**
 * @swagger
 * /api/descargas/{id}/estado:
 *   get:
 *     summary: Obtener estado de una descarga
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/:id/estado', obtenerEstadoDescarga);

/**
 * @swagger
 * /api/descargas/{id}/reintentar:
 *   post:
 *     summary: Reintentar una descarga fallida
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.post('/:id/reintentar', reintentarDescarga);

export default router;