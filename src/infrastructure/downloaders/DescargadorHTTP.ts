import { DescargadorBase } from './DescargadorBase';
import { ErrorTimeout, ErrorNotFound, ErrorServidor, ErrorDescarga } from '../../domain/errors/Errores';
import axios from 'axios';

export class DescargadorHTTP extends DescargadorBase {
  public async descargar(url: string): Promise<Buffer> {
    if (!this.validarUrl(url)) throw new ErrorDescarga('URL inválida', 'INVALID_URL');
    try {
      const timeoutMs = Number(process.env.DOWNLOAD_TIMEOUT) || 5000;
      const res = await axios.get(url, { responseType: 'arraybuffer', timeout: timeoutMs });
      return Buffer.from(res.data);
    } catch (error: any) {
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) throw new ErrorTimeout();
      if (error.response) {
        if (error.response.status === 404) throw new ErrorNotFound();
        if (error.response.status >= 500) throw new ErrorServidor();
      }
      throw new ErrorDescarga(error.message, 'HTTP_ERROR');
    }
  }
}