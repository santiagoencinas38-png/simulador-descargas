/**
 * Download states
 */
export enum EstadoDescarga {
  PENDIENTE = 'PENDIENTE',
  EN_PROGRESO = 'EN_PROGRESO',
  COMPLETADA = 'COMPLETADA',
  FALLIDA = 'FALLIDA',
  REINTENTANDO = 'REINTENTANDO',
  CANCELADA = 'CANCELADA'
}

/**
 * Supported downloader types
 */
export enum TipoDescargador {
  HTTP = 'http',
  FTP = 'ftp',
  MOCK = 'mock'
}

/**
 * Domain error codes
 */
export enum CodigoError {
  TIMEOUT = 'TIMEOUT_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  SERVER_ERROR = 'SERVER_ERROR',
  MAX_RETRIES = 'MAX_RETRIES_ERROR',
  INVALID_URL = 'INVALID_URL',
  INVALID_TYPE = 'INVALID_TYPE',
  DESCARGA_NO_ENCONTRADA = 'DESCARGA_NO_ENCONTRADA',
  ESTADO_INVALIDO = 'ESTADO_INVALIDO'
}