/**
 * URL validation and normalization
 */
export class UrlValidator {
  static validar(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  static normalizar(url: string): string {
    const urlObj = new URL(url);
    urlObj.hash = '';
    return urlObj.toString();
  }

  static obtenerProtocolo(url: string): string {
    try {
      return new URL(url).protocol.replace(':', '');
    } catch {
      return '';
    }
  }

  static obtenerNombreArchivo(url: string): string {
    try {
      const pathname = new URL(url).pathname;
      return pathname.split('/').pop() || 'descarga';
    } catch {
      return 'descarga';
    }
  }
}