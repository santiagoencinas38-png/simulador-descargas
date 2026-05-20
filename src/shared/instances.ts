import { WorkerPool } from './utils/workerPool';

let workerPool: WorkerPool | null = null;

export function getWorkerPool(): WorkerPool {
  if (!workerPool) {
    // Le pasamos la cantidad de hilos deseados (por ejemplo, 3 como tenías antes)
    workerPool = new WorkerPool(3);
  }
  return workerPool;
}

export function destruirWorkerPool(): void {
  // Cambiado de .destruir() al método real .apagar()
  workerPool?.apagar();
  workerPool = null;
}