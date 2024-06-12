const pool = require('../models/database');
const moment = require('moment');

// Función para obtener todas las sesiones con el número de series y el nombre del paciente
exports.obtenerSesiones = async (req, res) => {
    console.log('sesionesController.js: obtenerSesiones llamado');
    try {
        const result = await pool.query(`
            SELECT s.id, s.id_paciente, s.fecha, s.conclusión, s.realizada, u.nombre as paciente_nombre, COUNT(se.id) as num_series
            FROM sesiones_rehabilitacion s
            LEFT JOIN usuarios u ON s.id_paciente = u.id
            LEFT JOIN series_rehabilitacion se ON s.id = se.id_sesion
            GROUP BY s.id, s.id_paciente, s.fecha, s.conclusión, s.realizada, u.nombre
        `);

        // Convertir BigInt a String
        const formattedResult = result.map(session => ({
            ...session,
            num_series: session.num_series.toString(),
            fecha: new Date(session.fecha).toISOString()  // Formatear fecha a ISO 8601
        }));

        console.log('sesionesController.js: Resultados de la consulta:', formattedResult);
        res.json(formattedResult);
    } catch (error) {
        console.error('sesionesController.js: Error al obtener las sesiones:', error);
        res.status(500).send('Error al obtener las sesiones');
    }
};

// Función para obtener una sesión por su ID
exports.obtenerSesionPorId = async (req, res) => {
  const { id } = req.params;

  try {
      // Consulto la base de datos para obtener los detalles de la sesión, incluyendo la información del paciente y el número de series
      const [session] = await pool.query(`
          SELECT s.id, s.id_paciente, s.fecha, s.conclusión, s.realizada, u.nombre as paciente_nombre, COUNT(se.id) as num_series
          FROM sesiones_rehabilitacion s
          LEFT JOIN usuarios u ON s.id_paciente = u.id
          LEFT JOIN series_rehabilitacion se ON s.id = se.id_sesion
          WHERE s.id = ?
          GROUP BY s.id
      `, [id]);

      // Si la sesión no se encuentra, envío una respuesta 404
      if (!session) {
          return res.status(404).send('Sesión no encontrada');
      }

      // Convertir BigInt a string para evitar problemas de serialización
      session.num_series = session.num_series.toString();

      // Consulto la base de datos para obtener los detalles de las series asociadas a la sesión
      const series = await pool.query(`
          SELECT se.id, se.resultados
          FROM series_rehabilitacion se
          WHERE se.id_sesion = ?
      `, [id]);

      // Agrego los detalles de las series a la sesión
      session.series = series.map(serie => ({
          ...serie,
          id: serie.id.toString() // Convertir BigInt a string
      }));

      // Envío la sesión completa como respuesta
      res.json(session);
  } catch (error) {
      // Si ocurre un error, lo registro en la consola y envío una respuesta 500
      console.error('Error al obtener la sesión:', error);
      res.status(500).send('Error al obtener la sesión');
  }
};



exports.agregarSesion = async (req, res) => {
  const { fecha, conclusión, id_paciente, series, realizada } = req.body;

  if (!fecha || !id_paciente || !series) {
      return res.status(400).send('Por favor complete todos los campos');
  }

  // Convertir la fecha al formato correcto
  const formattedDate = moment(fecha).format('YYYY-MM-DD HH:mm:ss');

  try {
      const result = await pool.query(
          'INSERT INTO sesiones_rehabilitacion (fecha, conclusión, id_paciente, realizada) VALUES (?, ?, ?, ?)',
          [formattedDate, conclusión, id_paciente, realizada]
      );

      const sessionId = result.insertId;

      for (const serie of series) {
          await pool.query(
              'INSERT INTO series_rehabilitacion (id_sesion, resultados) VALUES (?, ?)',
              [sessionId, serie]
          );
      }

      res.status(201).send('Sesión agregada con éxito');
  } catch (error) {
      console.error('Error al agregar la sesión:', error);
      res.status(500).send('Error al agregar la sesión');
  }
};

// Función para eliminar una sesión
exports.eliminarSesion = async (req, res) => {
  const { id } = req.params;

  try {
      // Primero, eliminar las series asociadas a la sesión
      await pool.query('DELETE FROM series_rehabilitacion WHERE id_sesion = ?', [id]);

      // Luego, eliminar la sesión
      await pool.query('DELETE FROM sesiones_rehabilitacion WHERE id = ?', [id]);

      res.status(200).json({ message: 'Sesión eliminada correctamente' });
  } catch (error) {
      console.error('Error al eliminar la sesión:', error);
      res.status(500).json({ message: 'Error al eliminar la sesión' });
  }
};

// Función para editar una sesión
exports.editarSesion = async (req, res) => {
    const { id } = req.params;
    const { id_paciente, fecha, conclusion, detalles } = req.body;
  
    try {
        // Convertir la fecha al formato esperado por MariaDB
        const formattedDate = moment(fecha).format('YYYY-MM-DD HH:mm:ss');
  
        // Actualizo la sesión en la base de datos
        await pool.query(`
            UPDATE sesiones_rehabilitacion
            SET id_paciente = ?, fecha = ?, conclusión = ?
            WHERE id = ?
        `, [id_paciente, formattedDate, conclusion, id]);
  
        // Elimino los detalles anteriores de las series
        await pool.query(`
            DELETE FROM series_rehabilitacion WHERE id_sesion = ?
        `, [id]);
  
        // Inserto los nuevos detalles de las series
        for (const detalle of detalles) {
            await pool.query(`
                INSERT INTO series_rehabilitacion (id_sesion, resultados)
                VALUES (?, ?)
            `, [id, detalle.resultados]);
        }
  
        // Envío una respuesta 200 indicando éxito
        res.status(200).send('Sesión actualizada');
    } catch (error) {
        // Si ocurre un error, lo registro en la consola y envío una respuesta 500
        console.error('Error al actualizar la sesión:', error);
        res.status(500).send('Error al actualizar la sesión');
    }
};

// Función para obtener las sesiones de un paciente específico
exports.obtenerSesionesPorPaciente = async (req, res) => {
    const { id } = req.params;

    try {
        const sesiones = await pool.query(`
            SELECT s.id, s.fecha, s.conclusión, s.realizada 
            FROM sesiones_rehabilitacion s
            WHERE s.id_paciente = ?
        `, [id]);

        if (!sesiones.length) {
            return res.status(404).send('No se encontraron sesiones para este paciente');
        }

        // Enviar las sesiones como respuesta
        res.json(sesiones);
    } catch (error) {
        console.error('Error al obtener las sesiones del paciente:', error);
        res.status(500).send('Error al obtener las sesiones del paciente');
    }
};

// Función para marcar una sesión como realizada
exports.marcarSesionComoRealizada = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query(`
            UPDATE sesiones_rehabilitacion
            SET realizada = 'Y'
            WHERE id = ?
        `, [id]);

        res.send('Sesión marcada como realizada');
    } catch (error) {
        console.error('Error al marcar la sesión como realizada:', error);
        res.status(500).send('Error al marcar la sesión como realizada');
    }
};
