import { Worker } from 'worker_threads';
import * as path from 'path'; 
import { MensajeWorker, RespuestaWorker } from '../types'; 
import { logger } from './logger'; 

interface EntradaCola {
  mensaje: MensajeWorker;
  resolve: (value: RespuestaWorker) => void;
  reject: (reason: any) => void;
}

export class WorkerPool {
  private workers: Worker[] = [];
  private workersActivos: Set<Worker> = new Set();
  private colaTareas: EntradaCola[] = [];
  private maxWorkers: number;
  private rutaWorker: string;

  constructor(maxWorkers: number) {
    this.maxWorkers = maxWorkers;
    this.rutaWorker = path.resolve(__dirname, '../../infrastructure/workers/descargaWorker.ts');
    this.inicializarPool();
  }

  private inicializarPool(): void {
    logger.info(`Inicializando Worker Pool con ${this.maxWorkers} hilos...`);
    
    for (let i = 0; i < this.maxWorkers; i++) {
      const worker = new Worker(this.rutaWorker, {
        execArgv: ['--require', 'ts-node/register']
      });

      worker.on('message', (respuesta: RespuestaWorker) => {
        this.manejarRespuestaWorker(worker, respuesta);
      });

      worker.on('error', (err: any) => {
        logger.error(`Error crítico en el Worker de fondo: ${err?.message || err}`);
        this.reemplazarWorkerMuerto(worker);
      });

      this.workers.push(worker);
    }
    logger.info(`Worker Pool inicializado correctamente.`);
  }

  public ejecutarTarea(mensaje: MensajeWorker): Promise<RespuestaWorker> {
    return new Promise<RespuestaWorker>((resolve, reject) => {
      const tarea: EntradaCola = { mensaje, resolve, reject };
      const workerLibre = this.workers.find(w => !this.workersActivos.has(w));

      if (workerLibre) {
        this.enviarTareaAWorker(workerLibre, tarea);
      } else {
        logger.debug(`Todos los hilos ocupados. Encolando descarga ID: ${mensaje.id}`);
        this.colaTareas.push(tarea);
      }
    });
  }

  private enviarTareaAWorker(worker: Worker, tarea: EntradaCola): void {
    this.workersActivos.add(worker);
    (worker as any).tareaActual = tarea;
    worker.postMessage(tarea.mensaje);
  }

  private manejarRespuestaWorker(worker: Worker, respuesta: RespuestaWorker): void {
    const tareaAsociada = (worker as any).tareaActual as EntradaCola;
    if (tareaAsociada) {
      tareaAsociada.resolve(respuesta);
      (worker as any).tareaActual = null;
    }
    this.workersActivos.delete(worker);

    if (this.colaTareas.length > 0) {
      const siguienteTarea = this.colaTareas.shift()!;
      this.enviarTareaAWorker(worker, siguienteTarea);
    }
  }

  private reemplazarWorkerMuerto(workerMuerto: Worker): void {
    this.workersActivos.delete(workerMuerto);
    this.workers = this.workers.filter(w => w !== workerMuerto);
    
    const nuevoWorker = new Worker(this.rutaWorker, {
      execArgv: ['--require', 'ts-node/register']
    });

    nuevoWorker.on('message', (respuesta: RespuestaWorker) => {
      this.manejarRespuestaWorker(nuevoWorker, respuesta);
    });

    nuevoWorker.on('error', (err: any) => {
      logger.error(`Error crítico en el nuevo Worker: ${err?.message || err}`);
      this.reemplazarWorkerMuerto(nuevoWorker);
    });

    this.workers.push(nuevoWorker);
    logger.info("Hilo secundario defectuoso reemplazado.");
  }

  public async apagar(): Promise<void> {
    await Promise.all(this.workers.map(w => w.terminate()));
    this.workers = [];
  }
}
