export interface ICacheable {
  obtenerClaveCache(): string;
  guardarEnCache(data: Buffer): void;
  recuperarDeCache(): Buffer | null;
}

export interface IReportable {
  generarReporte(): {
    id: string;
    estado: string;
    intentos: number;
    tiempoTotal: number;
  };
}

export interface IDescargable {
  descargar(url: string): Promise<Buffer>;
  cancelar(): void;
  getProgreso(): number;
}