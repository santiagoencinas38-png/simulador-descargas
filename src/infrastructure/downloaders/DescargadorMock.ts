import { DescargadorBase } from './DescargadorBase';

export class DescargadorMock extends DescargadorBase {
  public async descargar(url: string): Promise<Buffer> {
    return new Promise(resolve => setTimeout(() => resolve(Buffer.from(`MOCK_DATA:${url}`)), 500));
  }
}