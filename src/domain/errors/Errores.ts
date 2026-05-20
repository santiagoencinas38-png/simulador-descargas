export class ErrorDescarga extends Error {
  constructor(message: string, public readonly codigo: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ErrorTimeout extends ErrorDescarga {
  constructor(message = 'La descarga superó el tiempo límite de espera') {
    super(message, 'TIMEOUT_ERROR');
  }
}

export class ErrorNotFound extends ErrorDescarga {
  constructor(message = 'El recurso solicitado no fue encontrado') {
    super(message, 'NOT_FOUND_ERROR');
  }
}

export class ErrorServidor extends ErrorDescarga {
  constructor(message = 'Error interno en el servidor de descarga remoto') {
    super(message, 'SERVER_ERROR');
  }
}

export class ErrorMaxReintentos extends ErrorDescarga {
  constructor(message = 'Se alcanzó el número máximo de reintentos permitidos') {
    super(message, 'MAX_RETRIES_EXCEEDED');
  }
}