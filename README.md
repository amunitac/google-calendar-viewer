# Instrucciones para ejecutar el proyecto en local

Este proyecto es una aplicación web que integra autenticación con Auth0 y visualización de eventos semanales del calendario de Google.

## Requisitos previos

1. **Node.js**: Asegúrate de tener instalada la versión `v18.20.2` de Node.js.
2. **Gestor de paquetes**: Confirma que tienes `npm` configurado correctamente (instalado junto con Node.js).
3. **Archivo de configuración `.env.local`**: Necesitarás un archivo `.env.local` con las siguientes credenciales:

```env
AUTH0_SECRET=9751bca0e3d6ec4d10552e4e6014552809f8e946c473f8a54718192c00fdeaa6
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://dev-lijlirssxrtm1358.us.auth0.com
AUTH0_CLIENT_ID=WpCXdhmk1FnpQU5L8adQxmO0kaJsAVDS
AUTH0_CLIENT_SECRET=1ndPzItWDalvcoWI80Kods9WQ4VGuCkMgcx1pwrG4FTRbqG_5JU0CmJdCOXr0eG9
AUTH0_DOMAIN=dev-lijlirssxrtm1358.us.auth0.com
AUTH0_MANAGEMENT_API_CLIENT_ID=IMO2gT2EbXMudkgJIo2ZxSOu7s5ySZNM
AUTH0_MANAGEMENT_API_CLIENT_SECRET=Qk01vVFW3SwMUXFC2tgJ05dZ9jgIc1Htn4TOfn4PYZ3-9IA-iNRhVXfi_qoW0ZnZ
```

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto en local:

1. Clona el repositorio del proyecto:
   ```bash
   git clone <URL-del-repositorio>
   ```

2. Accede a la carpeta del proyecto:
   ```bash
   cd <nombre-del-repositorio>
   ```

3. Instala las dependencias necesarias:
   ```bash
   npm install
   ```

4. Asegúrate de tener el archivo `.env.local` con la estructura proporcionada en la raíz del proyecto.

## Ejecución en desarrollo

Para iniciar el proyecto en modo desarrollo:

1. Ejecuta el siguiente comando:
   ```bash
   npm run dev
   ```

2. Accede a la aplicación en tu navegador en la dirección:
   ```
   http://localhost:3000
   ```

## Construcción y ejecución en producción

Si deseas construir y ejecutar el proyecto en un entorno de producción:

1. Asegúrate de crear un archivo `.env.production` en la raíz del proyecto con las mismas variables que `.env.local`.

2. Construye el proyecto:
   ```bash
   npm run build
   ```

3. Ejecuta la aplicación en modo producción:
   ```bash
   npm start
   ```

## Consideraciones

- Asegúrate de tener configurado correctamente tu entorno con Node.js en la versión indicada.
- El proyecto utiliza Auth0 para la autenticación y requiere las credenciales proporcionadas en las variables de entorno para funcionar correctamente.
- Si encuentras problemas o necesitas soporte, revisa los logs generados en la consola para identificar posibles errores.

## Documentación básica

### Resumen de la arquitectura
Este proyecto utiliza **Next.js** como framework principal para el frontend y backend, integrando **Auth0** para manejar la autenticación de usuarios y la conexión segura con el API de Google Calendar. A continuación, un resumen de cómo interactúan los componentes:

1. **Next.js**: Proporciona tanto las rutas del frontend como las rutas API para conectar con servicios externos.
   - El frontend muestra una vista semanal del calendario del usuario utilizando componentes como `WeeklyCalendar`.
   - Las rutas API en Next.js actúan como intermediarios para realizar solicitudes al API de gestión de Auth0 y al API de Google Calendar.

2. **Auth0**:
   - Gestiona la autenticación de usuarios utilizando OAuth2.
   - Proporciona tokens de acceso que se utilizan para interactuar con el API de Google Calendar y el API de gestión de usuarios de Auth0.

3. **Google Calendar API**:
   - Se utiliza para obtener los eventos del calendario del usuario autenticado.
   - El token de acceso generado por Auth0 incluye los permisos necesarios para acceder al calendario del usuario.

### Decisiones clave
1. **Elección de Next.js**:
   - Next.js permite manejar el frontend y backend en un solo entorno, simplificando la estructura del proyecto.
   - Soporte para renderizado del lado del servidor (SSR) y APIs integradas.

2. **Uso de Auth0**:
   - Auth0 se eligió por su facilidad de integración y manejo seguro de autenticación.
   - Permite conectar fácilmente con Google OAuth2 para acceder al calendario del usuario.

3. **Lenguajes y Herramientas**:
   - **TypeScript**: Para proporcionar tipado estático y mejorar la mantenibilidad del código.
   - **TailwindCSS**: Para estilizar rápidamente los componentes y mantener un diseño limpio y profesional.

4. **Despliegue en Vercel**:
   - Vercel fue elegido por su integración nativa con Next.js y su facilidad de configuración para entornos de producción.

## Enlace funcional
Puedes acceder a la aplicación desplegada en el siguiente enlace:

[Google Calendar Viewer App](https://google-calendar-viewer.vercel.app/)
