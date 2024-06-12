const express = require('express');
const router = express.Router();
const sesionesController = require('../controllers/sesionesController');
const { verifyToken } = require('../middlewares/auth');
const { isDoctor, isPatient } = require('../middlewares/verifyRoles');

console.log('sesiones.js: Ruta /sessions se está cargando');

// Ruta para obtener todas las sesiones (requiere autenticación y rol de doctor)
router.get('/sessions', verifyToken, isDoctor, sesionesController.obtenerSesiones);
// Ruta para obtener todas las sesiones de un paciente específico
router.get('/sessions/patient/:id', verifyToken, isPatient, sesionesController.obtenerSesionesPorPaciente);

// Ruta para obtener los detalles de una sesión específica
router.get('/sessions/:id', verifyToken, isDoctor, isPatient, sesionesController.obtenerSesionPorId);

// Ruta para agregar una nueva sesión
router.post('/sessions', verifyToken, isDoctor, sesionesController.agregarSesion);

// Ruta para eliminar una sesión
router.delete('/sessions/:id', verifyToken, isDoctor, sesionesController.eliminarSesion);

// Ruta para editar una sesión
router.put('/sessions/:id', verifyToken, isDoctor, sesionesController.editarSesion);

// Ruta para marcar una sesión como completada
router.put('/sessions/markAsCompleted/:id', verifyToken, isPatient, sesionesController.marcarSesionComoRealizada);

module.exports = router;


