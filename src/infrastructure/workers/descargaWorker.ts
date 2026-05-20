import { parentPort } from 'worker_threads';
import * as path from 'path';
import { MensajeWorker, RespuestaWorker } from '../../shared/types';
import { logger } from '../../shared/utils/logger'; // <-- Corregido a dos niveles y con "g"

/**
 * Worker that executes downloads in isolation
 */
if (!parentPort) {
  throw new Error('This script must be executed as a Worker');
}

parentPort.on('message', async (mensaje: MensajeWorker) => {
  try {
    logger.debug(`Worker starting download: ${mensaje.id}`);

    const { id, url, tipo, maxReintentos } = mensaje;

    // Aquí corre la simulación del retraso de descarga asíncrona en el hilo dedicado
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const respuesta: RespuestaWorker = {
      id,
      success: true,
      data: Buffer.from('mock data downloaded successfully'),
      intentos: 1
    };

    parentPort!.postMessage(respuesta);
  } catch (error: any) {
    logger.error(`Error dentro del procesamiento del Worker para ID ${mensaje.id}:`, error);
    
    const respuestaError: RespuestaWorker = {
      id: mensaje.id,
      success: false,
      intentos: 1,
      error: error?.message || 'Unknown download worker error'
    };
    
    parentPort!.postMessage(respuestaError);
  }
});