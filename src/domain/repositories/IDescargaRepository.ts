import { Descarga } from '../entities/Descarga';

export interface IDescargaRepository {
  save(descarga: Descarga): Promise<void>;
  findById(id: string): Promise<Descarga | null>;
  findAll(): Promise<Descarga[]>;
}