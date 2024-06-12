### Instrucciones de Despliegue y Requisitos

A continuación se detallan los pasos para desplegar tanto el backend como el frontend de la aplicación de rehabilitación. 

---

### Requisitos Previos

#### Requisitos de Hardware:
- **Servidor/PC**: 
  - CPU: Mínimo 2 núcleos (4 recomendados)
  - RAM: Mínimo 4GB (8GB recomendados)
  - Almacenamiento: 20GB de espacio libre

#### Requisitos de Software:
- **Sistema Operativo**: Windows, macOS o Linux
- **Node.js**: Versión 14.x o superior
- **npm**: Versión 6.x o superior (normalmente viene con Node.js)
- **MariaDB**: Versión 10.x o superior

---

### Configuración del Backend

#### 1. Instalación de Node.js y npm
Descarga e instala Node.js desde [nodejs.org](https://nodejs.org/). Esto también instalará npm.

#### 2. Instalación de MariaDB
Descarga e instala MariaDB desde [mariadb.org](https://mariadb.org/download/).

#### 3. Configuración de la Base de Datos
1. Crea una base de datos en MariaDB:
    ```sql
    CREATE DATABASE rehabilitacion_app;
    ```
2. Importa el esquema de la base de datos y los datos iniciales si los tienes:
    ```bash
    mysql -u your_user -p rehabilitacion_app < path/to/schema.sql
    ```

#### 4. Configuración del Proyecto Backend
1. Clona el repositorio del proyecto:
    ```bash
    git clone <repository_url>
    cd <repository_folder>/backend
    ```

2. Instala las dependencias del proyecto:
    ```bash
    npm install
    ```

3. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto backend con el siguiente contenido (ajusta según tus configuraciones):
    ```
    DB_HOST=localhost
    DB_USER=your_user
    DB_PASSWORD=your_password
    DB_NAME=rehabilitacion_app
    JWT_SECRET=your_secret_key
    ```

4. Inicia el servidor backend:
    ```bash
    node app.js
    ```

---

### Configuración del Frontend

#### 1. Instalación de Dependencias
1. Navega a la carpeta del frontend:
    ```bash
    cd <repository_folder>/frontend/rehabilitacion
    ```

2. Instala las dependencias del proyecto:
    ```bash
    npm install
    ```

#### 2. Configuración del Proyecto Frontend
1. Asegúrate de que el archivo `api.js` en la carpeta `src` apunte a la URL correcta del backend. Debería verse algo así:
    ```javascript
    import axios from 'axios';

    const api = axios.create({
        baseURL: 'http://localhost:3000', // Cambia esto si el backend está en otro puerto o dirección
    });

    export default api;
    ```

#### 3. Ejecución del Proyecto Frontend
1. Inicia el servidor de desarrollo de React Native:
    ```bash
    npx react-native run-android # para Android
    npx react-native run-ios     # para iOS (requiere macOS)
    ```

---

### Despliegue en Producción

#### Despliegue del Backend
1. Configura un servidor de producción con Node.js y MariaDB.
2. Asegúrate de que las variables de entorno estén configuradas correctamente en el servidor.
3. Utiliza un proceso de gestión como `pm2` para ejecutar el backend en segundo plano:
    ```bash
    npm install -g pm2
    pm2 start app.js --name "rehabilitacion_backend"
    ```

#### Despliegue del Frontend
1. Configura un entorno de producción para React Native utilizando servicios como [Expo](https://expo.dev/) o configurando una build de producción para Android e iOS.
2. Sigue las guías de despliegue oficiales para Android e iOS:
    - [Despliegue en Google Play](https://reactnative.dev/docs/signed-apk-android)
    - [Despliegue en Apple App Store](https://reactnative.dev/docs/publishing-to-app-store)

---

### Notas Finales

- **Seguridad**: Asegúrate de manejar las credenciales y las variables de entorno de manera segura.
- **Backups**: Configura backups regulares para la base de datos.
- **Monitoreo**: Implementa monitoreo y logging para el backend utilizando herramientas como `pm2` o servicios en la nube.

Con estos pasos, deberías poder desplegar y configurar tu aplicación de rehabilitación tanto en un entorno de desarrollo como en producción. Si tienes alguna pregunta adicional o necesitas más detalles, no dudes en preguntar.
