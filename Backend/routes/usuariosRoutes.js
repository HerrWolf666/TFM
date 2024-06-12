const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const { verifyToken } = require('../middlewares/auth'); 
const { isDoctor } = require('../middlewares/verifyRoles');

console.log('usuariosRoutes.js: Ruta /patients se está cargando');

// Ruta para obtener todos los pacientes (requiere autenticación y rol de doctor)
router.get('/patients', verifyToken, isDoctor, usuariosController.obtenerUsuarios);

// Ruta para obtener los detalles de un paciente específico
router.get('/patients/:id', verifyToken, isDoctor, usuariosController.obtenerUsuarioPorId);

// Ruta para agregar un nuevo paciente (requiere autenticación y rol de doctor)
router.post('/usuarios', verifyToken, isDoctor, usuariosController.agregarUsuario);

// Ruta para eliminar un paciente (requiere autenticación y rol de doctor)
router.delete('/patients/:id', verifyToken, isDoctor, usuariosController.eliminarUsuario);

// Ruta para editar un usuario (requiere autenticación y rol de doctor)
router.put('/usuarios/:id', verifyToken, isDoctor, usuariosController.editarUsuario);

module.exports = router;
