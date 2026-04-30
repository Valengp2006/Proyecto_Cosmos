# Cosmos: Instalación Audiovisual Interactiva

Cosmos es un ecosistema audiovisual vivo moldeado por la interacción colectiva. La obra propone un diálogo a tres bandas: un pulso sonoro constante, un performer que guía la tensión narrativa a través de estados visuales (de un campo de estrellas a un vórtice profundo), y un público activo que, mediante sus propios dispositivos, tiñe e interviene la instalación en tiempo real. Es una exploración de cómo las interfaces web pueden difuminar la barrera entre el espectador y la obra.

## Arquitectura Tecnológica y Puertos

El proyecto utiliza una arquitectura de red local distribuida mediante **OSC** y **WebSockets** para garantizar comunicación simultánea y fluida.

| Componente | Plataforma / Tecnología | Puerto de Entrada (TD) | Función Principal |
| :--- | :--- | :--- | :--- |
| **Audio (Pulsar)** | Strudel (Live Coding) + OSC Bridge | `8080` (UDP) | Sincroniza el parpadeo de la Luna mediante la detección del sonido `bd`. |
| **Performer** | iPad (Open Stage Control) | `9000` (UDP) | Controla la transición de estados (Estrellas → Vórtice) y el ciclo evolutivo de la obra. |
| **Público** | Smartphones (Node.js + Socket.io) | `7000` (UDP) | Envía datos de color RGB en tiempo real para teñir la Luna. |

## Estructura del Repositorio

El repositorio está organizado en módulos independientes para facilitar su ejecución y comprensión:

- `/Visuales`: Contiene el archivo `.toe` principal de TouchDesigner con la síntesis visual.
- `/Servidor`: Entorno de Node.js, incluyendo `server.js` y la carpeta `/public` con la interfaz del espectador (`index.html`).
- `/Control`: Layout de configuración de interfaz para Open Stage Control.
- `/Audio`: Archivos de texto plano con la partitura generativa escrita en Strudel.

## Manual de Operación (Cómo ejecutar la obra)

Para que el ecosistema funcione sin latencia y evadiendo restricciones o firewalls institucionales, el sistema está diseñado para ejecutarse sobre un **Hotspot móvil (Punto de acceso personal)**.

### 1. Preparación de Red

1.  Activar el Hotspot desde el dispositivo móvil del host.
2.  Conectar todos los equipos centrales (MacBook Pro, iPad) a esta red.
3.  Obtener la IP Local de la máquina host (Ej. `172.20.10.7`) para configurar los servidores.

### 2. Secuencia de Inicio

1.  **Audio:** Cargar el script de la carpeta `/Audio` en Strudel y verificar la salida de paquetes hacia el puerto `8080`.
2.  **Visuales:** Abrir el `.toe` en TouchDesigner. Confirmar que los tres nodos receptores (`TDStrudelSync`, `oscin1`, `oscin2`) estén activos en sus respectivos puertos.
3.  **Performer:** Iniciar Open Stage Control (`port: 8082`, `send: 127.0.0.1:9000`). Abrir la interfaz web en el iPad.
4.  **Público:** En la terminal del computador, navegar a la carpeta `/Servidor` y ejecutar `node server.js`. El público accederá escaneando un código QR que apunta a `http://[IP_DEL_HOST]:3000`.

*Desarrollo técnico e integración de sistemas generativos.*
