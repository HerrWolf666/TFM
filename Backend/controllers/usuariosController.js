const pool = require('../models/database');
const bcrypt = require('bcryptjs');

// Función para obtener todos los pacientes
exports.obtenerUsuarios = async (req, res) => {
  console.log('usuariosController.js: obtenerUsuarios llamado');
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE rol = "paciente"');
    console.log('usuariosController.js: Resultados de la consulta:', result);
    res.json(result);
  } catch (error) {
    console.error(error);
    console.error('usuariosController.js: Error al obtener los usuarios:', error);
    res.status(500).send('Error al obtener los usuarios');
  }
};

exports.agregarUsuario = async (req, res) => {
  console.log('usuariosController.js: agregarUsuarios llamado');
  const { nombre, email, password, id_doctor } = req.body;

  // Validación básica
  if (!nombre || !email || !password || !id_doctor) {
    return res.status(400).send('Faltan datos necesarios');
  }

  try {
    // Verificar si el usuario ya existe
    const usuariosExistentes = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (usuariosExistentes.length > 0) {
      return res.status(409).send('El email ya está registrado');
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Agregar el usuario a la base de datos
    await pool.query('INSERT INTO usuarios (nombre, email, password, rol, id_doctor) VALUES (?, ?, ?, "paciente", ?)', [nombre, email, hashedPassword, id_doctor]);
    res.status(201).send('Usuario agregado con éxito');
  } catch (error) {
    console.error('Error al agregar el usuario:', error);
    res.status(500).send('Error al agregar el usuario');
  }
};

// Función para eliminar un usuario
exports.eliminarUsuario = async (req, res) => {
  console.log('usuariosController.js: eliminarUsuarios llamado');
  const { id } = req.params;

  try {
      const result = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);

      if (result.affectedRows === 0) {
          return res.status(404).send('Usuario no encontrado');
      }

      res.send('Usuario eliminado con éxito');
  } catch (error) {
      console.error(error);
      res.status(500).send('Error al eliminar el usuario');
  }
};

// Función para editar un usuario
exports.editarUsuario = async (req, res) => {
  console.log('usuariosController.js: editarUsuario llamado');
  const { id } = req.params;
  const { nombre, email, password, id_doctor } = req.body;

  try {
    const [usuario] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);

    if (usuario.length === 0) {
      return res.status(404).send('Usuario no encontrado');
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : usuario.password;

    await pool.query('UPDATE usuarios SET nombre = ?, email = ?, password = ?, id_doctor = ? WHERE id = ?', [nombre, email, hashedPassword, id_doctor, id]);
    res.send('Usuario actualizado con éxito');
  } catch (error) {
    console.error('usuariosController.js: Error al actualizar el usuario:', error);
    res.status(500).send('Error al actualizar el usuario');
  }
};

// Función para obtener los detalles de un paciente por ID
exports.obtenerUsuarioPorId = async (req, res) => {
  console.log('usuariosController.js: obtenerUsuarioPorId llamado');
  const { id } = req.params;
  try {
    const [result] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    if (!result) {
      return res.status(404).send('Usuario no encontrado');
    }
    console.log('usuariosController.js: Detalles del usuario:', result);
    res.json(result);
  } catch (error) {
    console.error('usuariosController.js: Error al obtener el usuario:', error);
    res.status(500).send('Error al obtener el usuario');
  }
};

