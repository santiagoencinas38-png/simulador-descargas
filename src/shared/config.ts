import path from 'path';

/**
 * Centralized application config
 */
export const config = {
  // Server
  PORT: parseInt(process.env.PORT || '3000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Downloads
  DOWNLOAD_TIMEOUT_MS: parseInt(process.env.DOWNLOAD_TIMEOUT_MS || '5000', 10),
  MAX_CONCURRENT_WORKERS: parseInt(process.env.MAX_CONCURRENT_WORKERS || '3', 10),
  MAX_RETRIES: parseInt(process.env.MAX_RETRIES || '3', 10),

  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',

  // Paths
  WORKERS_PATH: path.join(__dirname, '../infrastructure/workers')
} as const;

if (config.PORT < 1 || config.PORT > 65535) {
  throw new Error('PORT must be between 1 and 65535');
}

if (config.DOWNLOAD_TIMEOUT_MS < 1000) {
  throw new Error('DOWNLOAD_TIMEOUT_MS must be >= 1000');
}

if (config.MAX_CONCURRENT_WORKERS < 1) {
  throw new Error('MAX_CONCURRENT_WORKERS must be >= 1');
}

export type Config = typeof config;