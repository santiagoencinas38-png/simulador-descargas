import { v4 as uuidv4 } from 'uuid';

/**
 * UUID generators for downloads
 */
export class UuidGenerator {
  static generar(): string {
    return uuidv4();
  }

  static generarCorto(): string {
    return uuidv4().split('-')[0];
  }

  static esValido(id: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  }
}