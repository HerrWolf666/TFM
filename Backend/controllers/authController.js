const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../models/database.js');

exports.register = async (req, res) => {
    const { nombre, email, password, rol, admin } = req.body;

    try {
        // Verificar si el usuario ya existe
        const usuariosExistentes = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (usuariosExistentes.length > 0) {
            return res.status(409).send({ message: 'El email ya está registrado.' });
        }

        // Hash de la contraseña antes de guardarla en la base de datos
        const hashedPassword = await bcrypt.hash(password, 10);

        // Inserta el nuevo usuario en la base de datos
        await pool.query('INSERT INTO usuarios (nombre, email, password, rol, admin) VALUES (?, ?, ?, ?, ?)', [nombre, email, hashedPassword, rol, admin]);
        
        // Si todo fue bien, devuelve una respuesta exitosa
        res.status(201).send({ message: 'Usuario registrado con éxito.' });
    } catch (error) {
        // Si algo sale mal, envía una respuesta de error general
        res.status(500).send({ message: 'Error al registrar el usuario', error: error.message });
    }
};


exports.login = async (req, res) => {
    // Extraer el email y la contraseña del cuerpo de la solicitud
    const { email, password } = req.body;
    let connection; // Definir una variable para la conexión a la base de datos

    try {
        // Obtiener una conexión del pool de conexiones
        connection = await pool.getConnection();

        // Verificar si la conexión se estableció correctamente
        if (!connection) {
            console.error('Error al conectar con la base de datos.');
            return res.status(500).send({ message: 'Error al conectar con la base de datos.' });
        }

        console.log('Conexión a la base de datos establecida.'); // Mensaje de depuración

        // Definir la consulta para obtener los datos del usuario por email
        const query = 'SELECT id, nombre, email, rol, admin, password FROM usuarios WHERE email = ?';
        // Ejecutar la consulta con el email proporcionado
        const result = await connection.query(query, [email]);

        console.log('Resultado de la consulta:', result); // Muestra el resultado de la consulta

        // Asegurar de que el resultado es un arreglo
        const users = Array.isArray(result) ? result : [result];

        // Verificra si no se encontró ningún usuario con el email proporcionado
        if (users.length === 0) {
            console.error('Usuario no encontrado para el email:', email); // Mensaje de error
            return res.status(404).send({ message: 'Usuario no encontrado.' }); // Responde con un error 404
        }

        // Obtener el primer usuario del resultado de la consulta
        const user = users[0];

        console.log('Usuario encontrado:', user); // Mostrar los datos del usuario encontrado

        // Verificar si la contraseña del usuario está definida
        if (!user.password) {
            console.error('Error en los datos del usuario. La contraseña no está definida para el usuario:', user);
            return res.status(500).send({ message: 'Error en los datos del usuario. La contraseña no está definida.' });
        }

        // Comparar la contraseña proporcionada con la contraseña cifrada en la base de datos
        const passwordIsValid = await bcrypt.compare(password, user.password);

        // Si la contraseña no es válida, responder con un error 401
        if (!passwordIsValid) {
            return res.status(401).send({ auth: false, token: null, message: 'Contraseña incorrecta.' });
        }

        // Generar un token JWT con el id y rol del usuario
        const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET, {
            expiresIn: 86400 // El token expira en 24 horas
        });

        // Responder con el token generado y los datos del usuario
        res.status(200).send({
            auth: true,
            token: token,
            user: {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol,
                admin: user.admin
            }
        });

    } catch (error) {
        // Capturar y mostrar cualquier error ocurrido durante el proceso
        console.error('Error en el proceso de inicio de sesión:', error);
        res.status(500).send({ message: 'Error al iniciar sesión.', error: error.message });
    } finally {
        // Cerrar la conexión a la base de datos si fue establecida
        if (connection) await connection.end();
    }
};