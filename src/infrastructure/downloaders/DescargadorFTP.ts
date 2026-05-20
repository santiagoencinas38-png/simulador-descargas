import { DescargadorBase } from './DescargadorBase';
import { ErrorTimeout, ErrorNotFound, ErrorServidor } from '../../domain/errors/Errores';

export class DescargadorFTP extends DescargadorBase {
  public async descargar(url: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (url.includes('404')) return reject(new ErrorNotFound());
        if (url.includes('500')) return reject(new ErrorServidor());
        if (url.includes('timeout')) return reject(new ErrorTimeout());
        resolve(Buffer.from(`FTP_DATA_SIMULATED:${url}`));
      }, 1000);
    });
  }
}