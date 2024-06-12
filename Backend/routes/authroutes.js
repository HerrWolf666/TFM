const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const { verifyToken } = require('../middlewares/auth.js');
const { esAdminORoot, isDoctor } = require('../middlewares/verifyRoles.js');

console.log(authController);
console.log(verifyToken);
console.log(esAdminORoot);
console.log(isDoctor);

// Ruta para registrar doctores (solo root y administradores)
router.post('/registrarDoctor', verifyToken, esAdminORoot, authController.register);

// Ruta para registrar pacientes (solo doctores)
router.post('/registrarPaciente', verifyToken, isDoctor, authController.register);

// Ruta para hacer login
router.post('/login', authController.login);

module.exports = router;