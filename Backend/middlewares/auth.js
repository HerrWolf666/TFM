const jwt = require('jsonwebtoken');
const pool = require('../models/database');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send({ message: 'No se proporcionó token de autenticación.' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.usuario = decoded;
        console.log('verifyToken: Usuario decodificado:', req.usuario);
        next();
    } catch (error) {
        return res.status(401).send({ message: 'No autorizado.' });
    }
};

module.exports = { verifyToken };
