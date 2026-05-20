import { config } from '../config';

type LogLevel = 'info' | 'error' | 'warn' | 'debug';

export const logger = {
  info: (msg: string, data?: any) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${msg}`, data ?? '');
  },

  error: (msg: string, error?: Error | string) => {
    const message = error instanceof Error ? error.message : error;
    console.error(`[ERROR] ${new Date().toISOString()} - ${msg}`, message ?? '');
  },

  warn: (msg: string, data?: any) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${msg}`, data ?? '');
  },

  debug: (msg: string, data?: any) => {
    // Forzamos el log de debug siempre para que veas la actividad del Pool
    console.debug(`[DEBUG] ${new Date().toISOString()} - ${msg}`, data ?? '');
  }
};

export type Logger = typeof logger;
export type LoggerLevel = LogLevel;