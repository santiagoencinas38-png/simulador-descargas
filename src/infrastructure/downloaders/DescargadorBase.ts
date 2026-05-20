import { IDescargable } from '../../domain/interfaces/Interfaces';
import { ErrorMaxReintentos } from '../../domain/errors/Errores';

export abstract class DescargadorBase implements IDescargable {
  protected progreso = 0;
  public abstract descargar(url: string): Promise<Buffer>;
  public cancelar(): void { console.log('Descarga cancelada.'); }
  public getProgreso(): number { return this.progreso; }
  protected validarUrl(url: string): boolean {
    try { new URL(url); return true; } catch { return false; }
  }

  public async ejecutarConReintento<T>(fn: () => Promise<T>, maxIntentos: number, onRetry?: (msg: string) => void): Promise<T> {
    let intento = 0;
    while (intento < maxIntentos) {
      try { intento++; return await fn(); } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        if (onRetry && intento < maxIntentos) onRetry(msg);
        if (intento >= maxIntentos) throw new ErrorMaxReintentos(`Falló tras ${maxIntentos} intentos. ` + msg);
        await new Promise(r => setTimeout(r, Math.pow(2, intento) * 200));
      }
    }
    throw new ErrorMaxReintentos();
  }
}