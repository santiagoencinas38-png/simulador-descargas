import { IDescargaRepository } from '../../domain/repositories/IDescargaRepository';
import { Descarga } from '../../domain/entities/Descarga';

export class InMemoryDescargaRepository implements IDescargaRepository {
  private static instance: InMemoryDescargaRepository;
  private descargas: Map<string, Descarga> = new Map();

  private constructor() {}

  public static getInstance(): InMemoryDescargaRepository {
    if (!InMemoryDescargaRepository.instance) {
      InMemoryDescargaRepository.instance = new InMemoryDescargaRepository();
    }
    return InMemoryDescargaRepository.instance;
  }

  public async save(descarga: Descarga): Promise<void> { this.descargas.set(descarga.getId(), descarga); }
  public async findById(id: string): Promise<Descarga | null> { return this.descargas.get(id) || null; }
  public async findAll(): Promise<Descarga[]> { return Array.from(this.descargas.values()); }
}