const express = require('express');
const mysql = require('mariadb');

const app = express();
const port = 3000;

// Configuración de la conexión a MariaDB
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Ramon252',
  database: 'rehabilitacion_app'
});

// Conectar a la base de datos
connection.connect(error => {
  if (error) {
    console.error('Error conectando a la base de datos:', error);
    return;
  }
  console.log('Conectado a la base de datos');
});

// Ruta para obtener datos de la tabla usuarios
app.get('/usuarios', (req, res) => {
  connection.query('SELECT * FROM usuarios', (error, results) => {
    if (error) {
      console.error('Error ejecutando la consulta:', error);
      res.status(500).send('Error ejecutando la consulta');
      return;
    }
    res.json(results);
  });
});

// Ruta para obtener datos de la tabla sesiones_rehabilitacion
app.get('/sesiones', (req, res) => {
  connection.query('SELECT * FROM sesiones_rehabilitacion', (error, results) => {
    if (error) {
      console.error('Error ejecutando la consulta:', error);
      res.status(500).send('Error ejecutando la consulta');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
