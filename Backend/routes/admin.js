const express = require('express');
const router = express.Router();
const pool = require('../models/database');

// Simulación de una configuración del sistema
let systemConfig = {
    maxUsers: '100',
    sessionTimeout: '30',
    maintenanceMode: 'false'
};

// Función para loguear y manejar BigInt como texto
const safeLog = (label, value) => {
    console.log(label, JSON.stringify(value, (_, v) => typeof v === 'bigint' ? v.toString() : v));
};

// Función para convertir BigInt a texto
const convertBigIntToText = (value) => {
    return value !== undefined && value !== null ? value.toString() : '0';
};

// Función para obtener el total de usuarios
const getTotalUsuarios = async () => {
    try {
        const [rows] = await pool.query('SELECT COUNT(*) AS total FROM usuarios');
        safeLog('Total Usuarios - Rows:', rows); // Usamos la función de ayuda para loguear
        if (rows && rows.total !== undefined) {
            const totalUsuarios = convertBigIntToText(rows.total);
            console.log('Total Usuarios:', totalUsuarios); // Log adicional para depurar
            return totalUsuarios;
        } else {
            console.log('Total Usuarios: 0 (no rows)');
            return '0';
        }
    } catch (error) {
        console.error('Error al obtener el total de usuarios:', error);
        return '0';
    }
};

// Función para obtener el total de sesiones
const getTotalSesiones = async () => {
    try {
        const [rows] = await pool.query('SELECT COUNT(*) AS total FROM sesiones_rehabilitacion');
        safeLog('Total Sesiones - Rows:', rows); // Usamos la función de ayuda para loguear
        if (rows && rows.total !== undefined) {
            const totalSesiones = convertBigIntToText(rows.total);
            console.log('Total Sesiones:', totalSesiones); // Log adicional para depurar
            return totalSesiones;
        } else {
            console.log('Total Sesiones: 0 (no rows)');
            return '0';
        }
    } catch (error) {
        console.error('Error al obtener el total de sesiones:', error);
        return '0';
    }
};

// Función para obtener los usuarios activos
const getUsuariosActivos = async () => {
    try {
        const [rows] = await pool.query('SELECT COUNT(DISTINCT id_paciente) AS activos FROM sesiones_rehabilitacion');
        safeLog('Usuarios Activos - Rows:', rows); // Usamos la función de ayuda para loguear
        if (rows && rows.activos !== undefined) {
            const usuariosActivos = convertBigIntToText(rows.activos);
            console.log('Usuarios Activos:', usuariosActivos); // Log adicional para depurar
            return usuariosActivos;
        } else {
            console.log('Usuarios Activos: 0 (no rows)');
            return '0';
        }
    } catch (error) {
        console.error('Error al obtener los usuarios activos:', error);
        return '0';
    }
};

// Endpoint para obtener estadísticas

router.get('/statistics', async (req, res) => {
    try {
        const totalUsuarios = await getTotalUsuarios();
        const totalSesiones = await getTotalSesiones();
        const usuariosActivos = await getUsuariosActivos();

        console.log('Valores obtenidos:', { totalUsuarios, totalSesiones, usuariosActivos }); // Log para depurar

        const statistics = [
            { id: 1, title: 'Total de Usuarios', value: totalUsuarios },
            { id: 2, title: 'Total de Sesiones', value: totalSesiones },
            { id: 3, title: 'Usuarios Activos', value: usuariosActivos },
        ];

        console.log('Statistics response:', statistics); // Log para depurar
        res.json(statistics);
    } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        res.status(500).send('Error al obtener estadísticas');
    }
});


// Endpoint para obtener la configuración del sistema
router.get('/config', (req, res) => {
    res.json(systemConfig);
});

// Endpoint para actualizar la configuración del sistema
router.put('/configup', (req, res) => {
    const { maxUsers, sessionTimeout, maintenanceMode } = req.body;
    systemConfig = { maxUsers, sessionTimeout, maintenanceMode };
    res.json({ message: 'Configuración actualizada correctamente.' });
});

module.exports = router;