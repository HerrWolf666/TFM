 const mariadb = require('mariadb');
require('dotenv').config();

// Crear un pool de conexiones a la base de datos
const pool = mariadb.createPool({
  host: process.env.DB_HOST, // La dirección del servidor de la base de datos, p.ej., 'localhost'
  user: process.env.DB_USER, // El usuario para acceder a la base de datos, p.ej., 'root'
  password: process.env.DB_PASSWORD, // La contraseña del usuario de la base de datos
  database: process.env.DB_NAME, // El nombre de la base de datos a la que te quieres conectar
  connectionLimit: 5, // El número máximo de conexiones a crear al mismo tiempo
  port: process.env.DB_PORT // Puerto en el que escucha la base de datos, por defecto MariaDB usa el 3306
});

module.exports = pool;

