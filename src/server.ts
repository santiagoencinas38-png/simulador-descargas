import 'dotenv/config';
import express, { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import descargasRoutes from './interfaces/routes/descargas.routes';
import { errorMiddleware } from './interfaces/middleware/errorMiddleware';
import { corsMiddleware } from './interfaces/middleware/corsMiddleware';
import { config } from './shared/config';
import { logger } from './shared/utils/logger';
import { getWorkerPool } from './shared/instances'; // <-- Importamos el inicializador del pool

const app: Express = express();

// Base middleware
app.use(express.json());
app.use(corsMiddleware);

logger.info(`Starting application in mode: ${config.NODE_ENV}`);

// === Inicialización del Worker Pool de hilos concurrentes ===
try {
  getWorkerPool(); 
  logger.info('Worker Pool creado exitosamente. Hilos listos en segundo plano.');
} catch (poolError: any) {
  logger.error('Error crítico al inicializar el Worker Pool:', poolError?.message || poolError);
}

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Concurrent Download Simulator API',
      version: '1.0.0',
      description: 'REST API for concurrent downloads with Worker Threads and DDD'
    },
    servers: [
      {
        url: `http://localhost:${config.PORT}`,
        description: 'Development server'
      }
    ]
  },
  apis: ['./src/interfaces/routes/*.ts']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec));

// Routes
app.use('/api/descargas', descargasRoutes);

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling
app.use(errorMiddleware);

// Server
app.listen(config.PORT, () => {
  logger.info(`Server running on http://localhost:${config.PORT}`);
  logger.info(`Swagger available at http://localhost:${config.PORT}/api-docs`);
  logger.info('Configuration:');
  logger.info(`  - MAX_CONCURRENT_WORKERS: ${config.MAX_CONCURRENT_WORKERS}`);
  logger.info(`  - DOWNLOAD_TIMEOUT_MS: ${config.DOWNLOAD_TIMEOUT_MS}`);
  logger.info(`  - MAX_RETRIES: ${config.MAX_RETRIES}`);
});

export default app;