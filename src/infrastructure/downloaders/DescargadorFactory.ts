import { DescargadorBase } from './DescargadorBase';
import { DescargadorHTTP } from './DescargadorHTTP';
import { DescargadorFTP } from './DescargadorFTP';
import { DescargadorMock } from './DescargadorMock';
import { ErrorDescarga } from '../../domain/errors/Errores';

export class DescargadorFactory {
  public static crear(tipo: string): DescargadorBase {
    switch (tipo.toLowerCase()) {
      case 'http': return new DescargadorHTTP();
      case 'ftp': return new DescargadorFTP();
      case 'mock': return new DescargadorMock();
      default: throw new ErrorDescarga(`Protocolo ${tipo} no soportado`, 'BAD_PROTOCOL');
    }
  }
}