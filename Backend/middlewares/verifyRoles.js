const pool = require('../models/database');

const verifyRoles = (rolesPermitidos) => {
    return async (req, res, next) => {
        const { id } = req.usuario;

        try {
            const [user] = await pool.query('SELECT rol FROM usuarios WHERE id = ?', [id]);
            if (!user || !rolesPermitidos.includes(user.rol)) {
                return res.status(403).send('Acceso denegado. No tienes los permisos necesarios.');
            }
            next();
        } catch (error) {
            console.error('Error al verificar el rol del usuario:', error);
            res.status(500).send('Error al verificar el rol del usuario');
        }
    };
};

const isDoctor = verifyRoles(['doctor']);
const isAdmin = verifyRoles(['administrador']);
const esAdminORoot = verifyRoles(['administrador', 'root']);
const isPatient = verifyRoles(['paciente']);

module.exports = { isDoctor, isAdmin, esAdminORoot, isPatient, verifyRoles };
