const express = require('express');
const mariadb = require('mariadb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variEntor.env' });

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5
});

// Importar las rutas
const authRoutes = require('./routes/authroutes');
const sesionesRoutes = require('./routes/sesiones'); 
const usuariosRoutes = require('./routes/usuariosRoutes');
const adminRoutes = require('./routes/admin');
const configRoutes = require('./routes/config');

// Utilizar las rutas
app.use('/api/auth', authRoutes);
app.use('/api', sesionesRoutes);
app.use('/api', usuariosRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/config', configRoutes);

app.get('/', (req, res) => {
  res.send('Servidor Express funcionando correctamente!');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
