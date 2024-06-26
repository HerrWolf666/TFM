### Instrucciones de Despliegue, Configuración de la Base de Datos y Requisitos

A continuación se detallan los pasos para desplegar tanto el backend como el frontend de esta aplicación de rehabilitación, junto con la lista completa de paquetes necesarios y la configuración de la base de datos.

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
2. Configura las tablas necesarias:
    ```sql
    USE rehabilitacion_app;

    CREATE TABLE usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        rol ENUM('doctor', 'paciente') NOT NULL,
        admin ENUM('si', 'no') DEFAULT 'no',
        creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE sesiones_rehabilitacion (
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_paciente INT,
        fecha DATETIME NOT NULL,
        conclusion TEXT,
        realizada ENUM('N', 'S') DEFAULT 'N',
        FOREIGN KEY (id_paciente) REFERENCES usuarios(id)
    );

    CREATE TABLE series_rehabilitacion (
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_sesion INT,
        resultados TEXT,
        FOREIGN KEY (id_sesion) REFERENCES sesiones_rehabilitacion(id)
    );
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

    Lista de paquetes necesarios (se instalarán automáticamente con `npm install`):
    - express
    - mariadb
    - jsonwebtoken
    - bcryptjs
    - dotenv
    - moment

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

    Lista de paquetes necesarios (se instalarán automáticamente con `npm install`):
    - @react-native-async-storage/async-storage
    - @react-native-community/datetimepicker
    - @react-native-picker/picker
    - @react-navigation/native
    - @react-navigation/stack
    - axios
    - jwt-decode
    - react-native
    - react-native-gesture-handler
    - react-native-reanimated
    - react-native-safe-area-context
    - react-native-screens

3. Configuración de las Dependencias Nativas
   Algunas dependencias nativas como `react-native-gesture-handler` y `react-native-reanimated` pueden requerir configuración adicional. Sigue las instrucciones de instalación en sus respectivas páginas de npm si encuentras algún problema.

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


### Notas Finales

- **Seguridad**: Asegúrate de manejar las credenciales y las variables de entorno de manera segura.
- **Backups**: Configura backups regulares para la base de datos.


Con estos pasos, deberías poder desplegar y configurar tu aplicación de rehabilitación en un entorno de desarrollo. Si tienes alguna pregunta adicional o necesitas más detalles, no dudes en preguntar.