import { ErrorDescarga } from '../errors/Errores';

export class UrlDescarga {
  private readonly value: string;

  constructor(url: string) {
    if (!this.validar(url)) {
      throw new ErrorDescarga(`URL Inválida: ${url}`, 'INVALID_URL');
    }
    this.value = url;
  }

  public getValue(): string {
    return this.value;
  }

  private validar(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}