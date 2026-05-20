Simulador de Descargas Concurrentes
Este proyecto es una API REST de alto rendimiento diseñada para gestionar tareas de descarga de archivos de forma asíncrona. Implementa una arquitectura robusta basada en DDD (Domain-Driven Design) y utiliza un Worker Pool para el procesamiento en paralelo, evitando el bloqueo del hilo principal (Main Thread) de Node.js.


Características Principales
Arquitectura DDD: Separación clara de responsabilidades en capas (Domain, Application, Infrastructure, Shared).

Worker Pool: Gestión eficiente de hilos para procesos de carga pesada.

Concurrencia: Procesamiento paralelo limitado por configuración (Pool de 3 trabajadores).

Robustez: Sistema de reintentos y manejo de errores centralizado.

Logging Profesional: Sistema de seguimiento de estados en tiempo real.



Tecnologías Utilizadas
Node.js con TypeScript.

Worker Threads para concurrencia.

Express como framework web.

Swagger/OpenAPI para documentación interactiva.


Instalación y Ejecución
Requisitos previos
Node.js v18 o superior.

npm o pnpm instalado.

Instalación
Clona el repositorio.

Instala las dependencias:

Bash
npm install
Crea un archivo .env en la raíz basándote en la configuración necesaria:

Fragmento de código
PORT=3000
NODE_ENV=development
DOWNLOAD_TIMEOUT_MS=5000
MAX_CONCURRENT_WORKERS=3
MAX_RETRIES=3
LOG_LEVEL=info
Comandos de Ejecución
Modo Desarrollo: (Con recarga automática mediante ts-node-dev)

Bash
npm run dev
Modo Producción:

Bash
npm run build
npm start


Pruebas y Endpoints
Una vez que el servidor esté corriendo, puedes interactuar con la API a través de la documentación interactiva:

Documentación API: http://localhost:3000/api-docs

Endpoints Principales:
POST /api/descargas: Envía una nueva tarea de descarga.

Payload esperado: {"id": "string", "url": "string", "tipo": "http" | "ftp" | "mock", "maxReintentos": number}

GET /api/descargas: Obtiene el historial completo de las descargas procesadas.



Estructura del Proyecto (DDD)
src/domain/: Reglas de negocio y entidades.

src/application/: Casos de uso y lógica de gestión.

src/infrastructure/: Implementación técnica (Servidor Express, Worker Pool, Worker Threads).

src/shared/: Utilidades transversales (Logger, Configuración, Tipos compartidos).