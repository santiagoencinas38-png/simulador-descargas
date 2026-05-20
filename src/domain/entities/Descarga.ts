import { EstadoDescarga } from '../enums/EstadoDescarga';
import { UrlDescarga } from '../value-objects/UrlDescarga';
import { IReportable, ICacheable } from '../interfaces/Interfaces';

export class Descarga implements IReportable, ICacheable {
  private readonly id: string;
  private readonly url: UrlDescarga;
  private readonly tipo: string;
  private estado: EstadoDescarga;
  private intentos: number;
  private tiempoInicio: number;
  private tiempoFin: number;
  private errorMsg: string | null;
  private cache: Buffer | null;

  constructor(id: string, url: string, tipo: string) {
    this.id = id;
    this.url = new UrlDescarga(url);
    this.tipo = tipo.toLowerCase();
    this.estado = EstadoDescarga.PENDIENTE;
    this.intentos = 0;
    this.tiempoInicio = Date.now();
    this.tiempoFin = 0;
    this.errorMsg = null;
    this.cache = null;
  }

  public getId(): string { return this.id; }
  public getUrl(): string { return this.url.getValue(); }
  public getTipo(): string { return this.tipo; }
  public getEstado(): EstadoDescarga { return this.estado; }
  public getIntentos(): number { return this.intentos; }
  public getErrorMsg(): string | null { return this.errorMsg; }

  public iniciar(): void { this.estado = EstadoDescarga.EN_PROGRESO; }
  public registrarIntento(): void { this.intentos++; }
  public marcarComoReintento(error: string): void {
    this.estado = EstadoDescarga.REINTENTANDO;
    this.errorMsg = error;
  }
  public completar(data?: Buffer): void {
    this.estado = EstadoDescarga.COMPLETADA;
    this.tiempoFin = Date.now();
    this.errorMsg = null;
    if (data) this.guardarEnCache(data);
  }
  public fallar(error: string): void {
    this.estado = EstadoDescarga.FALLIDA;
    this.tiempoFin = Date.now();
    this.errorMsg = error;
  }

  public obtenerClaveCache(): string { return `cache:${this.tipo}:${this.url.getValue()}`; }
  public guardarEnCache(data: Buffer): void { this.cache = data; }
  public recuperarDeCache(): Buffer | null { return this.cache; }

  public generarReporte() {
    const tiempoTotal = this.tiempoFin > 0 ? this.tiempoFin - this.tiempoInicio : Date.now() - this.tiempoInicio;
    return { id: this.id, estado: this.estado, intentos: this.intentos, tiempoTotal };
  }
}