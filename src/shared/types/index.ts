/**
 * Standard API response
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  codigo?: string;
  statusCode?: number;
}

/**
 * DTO to create a download
 */
export interface CrearDescargaDTO {
  url: string;
  tipo: 'http' | 'ftp' | 'mock';
  maxReintentos?: number;
}

/**
 * DTO for created download response
 */
export interface DescargaCreadaDTO {
  id: string;
  url: string;
  tipo: string;
  estado: string;
  fechaCreacion: Date;
  mensaje: string;
}

/**
 * DTO for download status
 */
export interface EstadoDescargaDTO {
  id: string;
  url: string;
  tipo: string;
  estado: string;
  progreso: number;
  intentos: number;
  tiempoTranscurrido: number;
  error?: string;
}

/**
 * DTO for downloads list
 */
export interface ListaDescargasDTO {
  descargas: EstadoDescargaDTO[];
  total: number;
  completadas: number;
  pendientes: number;
  fallidas: number;
}

/**
 * Message between worker and main thread
 */
export interface MensajeWorker {
  id: string;
  url: string;
  tipo: 'http' | 'ftp' | 'mock';
  maxReintentos: number;
}

/**
 * Worker response
 */
export interface RespuestaWorker {
  id: string;
  success: boolean;
  data?: Buffer;
  error?: string;
  codigo?: string;
  intentos: number;
}