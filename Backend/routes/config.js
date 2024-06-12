const express = require('express');
const router = express.Router();
const configController = require('../controllers/configController'); // Asegúrate de que el controlador está importado correctamente

// Endpoint para obtener la configuración del sistema
router.get('/config', configController.getConfig);

// Endpoint para actualizar la configuración del sistema
router.put('/configup', configController.updateConfig);

module.exports = router;

