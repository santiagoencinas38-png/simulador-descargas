

 1. Justificación :omisión de la Capa "application"
En la teoría pura de Arquitectura Limpia (Clean Architecture) y DDD, la capa de Aplicación contiene los "Casos de Uso" u orquestadores que ejecutan las reglas del negocio. Sin embargo, en este diseño se decidió omitir una carpeta física independiente llamada  application bajo el principio de diseño de software YAGNI (You Aren't Gonna Need It) y la prevención de la Sobreingeniería 

 Razones fundamentales:

Complejidad Innecesaria: Al tratarse de un simulador con operaciones directas (crear, listar y reintentar), separar el código en interfaces, comandos y manejadores asíncronos para cada acción habría duplicado la cantidad de archivos ("CrearDescargaUseCase.ts", "ObtenerEstadoUseCase.ts", etc.) sin aportar valor real.
Cohesión de Infraestructura: El flujo de la aplicación requiere reaccionar instantáneamente a eventos de red periféricos y coordinar hilos del sistema nativo ("worker_threads"). Mantener esta lógica acoplada controladamente en los controladores permite un flujo de datos más rápido y legible.


2. Cómo se absorbió la Capa de Aplicación en las demás Carpetas

La responsabilidad de la capa de aplicación no desapareció; fue estratégicamente absorbida y redistribuida en los dos componentes adyacentes:

 A. Absorción por la Infraestructura (`src/interfaces/controllers`)
El controlador "descargas.controller.ts" actúa como el orquestador directo del caso de uso. Reemplaza la capa de aplicación realizando las siguientes tareas de coordinación:


1. Orquestación del Flujo: Recibe la petición HTTP, extrae los parámetros primitivos y llama al Dominio.
2. Sincronización: Invoca al repositorio ("InMemoryDescargaRepository.getInstance()") para persistir las entidades en memoria.
3. Disparo de Efectos Secundarios: Instancia el hilo físico del sistema operativo ("new Worker(...)"), enviando los datos para su procesamiento asíncrono en segundo plano.

 B. Absorción por el Dominio (`src/domain/entities`)
Para evitar que los controladores se llenaran de lógica lógica de negocio (lo que crearía un "Modelo Anémico"), los cambios de estado internos se delegaron estrictamente a la entidad `Descarga`.

El controlador solo dice **cuándo** pasar a otra etapa invocando métodos de comportamiento (`nuevaDescarga.iniciar()`, `descarga.marcarComoReintento()`, `descarga.completar()`).
La entidad se encarga de cambiar internamente los Enums, capturar las marcas de tiempo (`Date.now()`) e inicializar su propio identificador único real (`randomUUID()`).


3. Guía de Ejecución y Pruebas del Sistema

Para comprobar que el sistema se ejecuta correctamente, compila sin errores y responde de manera dinámica a todas las exigencias (concurrencia, multi-protocolo y persistencia), tenemos que ejecutar los siguientes comandos en orden :
Paso 1: Levantar el Servidor

Ejecutar el comando para encender el entorno de desarrollo. 
npm run dev
Esto permitira  ver los mensajes de inicialización del Worker Pool y la confirmación de que la API corre en el puerto 3000.*


Paso 2: Verificación de Estado del Servidor 

Comprueba que el servidor Express responde de manera correcta y la infraestructura base está activa:

curl.exe http://localhost:3000/health


Paso 3: Crear una Tarea de Descarga de tipo `mock`

Inserta una descarga simulada. La API debe responder con un "Código 201", devolver un "ID único real" autogenerado en formato alfanumérico largo y marcar el estado inicial como "PENDIENTE" o "EN_PROGRESO":

curl.exe -X POST http://localhost:3000/api/descargas -H "Content-Type: application/json" -d "{\"url\":\"archivo-prueba.pdf\",\"tipo\":\"mock\"}"


Paso 4: Prueba de Estrés y Concurrencia (10 Peticiones Simultáneas)

Este comando simula ráfagas de tráfico masivo enviando 10 peticiones de descarga consecutivas a la API utilizando un bucle de PowerShell.

1..10 | ForEach-Object { curl.exe -X POST http://localhost:3000/api/descargas -H "Content-Type: application/json" -d "{\`"url\`":\`"test$_\`",\`"tipo\`":\`"mock\`"}"; Write-Host "" }

Esto demuestra que el sistema genera 10 IDs totalmente distintos de forma consecutiva y que los hilos del sistema operativo procesan las tareas concurrentemente en segundo plano sin ralentizar ni congelar el servidor principal.


Paso 5: Probar Validaciones y Multi-Protocolos

El sistema asimila de manera polimórfica los diferentes tipos de descargas solicitados a través del parámetro "tipo". Debemos enviar estas peticiones para confirmar el correcto mapeo en el dominio:

curl.exe -X POST http://localhost:3000/api/descargas -H "Content-Type: application/json" -d "{\"url\":\"test\",\"tipo\":\"mock\"}"


"Protocolo HTTP Real:"

curl.exe -X POST http://localhost:3000/api/descargas -H "Content-Type: application/json" -d "{\"url\":\"https://httpbin.org/json\",\"tipo\":\"http\"}"

"Protocolo FTP:"

curl.exe -X POST http://localhost:3000/api/descargas -H "Content-Type: application/json" -d "{\"url\":\"ftp://test.com/file.txt\",\"tipo\":\"ftp\"}"


 Paso 6: Listar el Historial de Descargas (Comprobación del Repositorio)

Para verificar que el repositorio persistió de forma correcta todas las descargas previas con sus respectivos IDs reales generados, ejecuta:


curl.exe http://localhost:3000/api/descargas

Recibiremos un arreglo JSON completo con todas las descargas enviadas en los pasos anteriores, verificando que el patrón **Repository Singleton** retiene la información de manera íntegra.
