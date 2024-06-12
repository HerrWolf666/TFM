const pool = require('./database');

const getSesionesByPaciente = async (idPaciente) => {
  try {
    const sql = 'SELECT * FROM sesiones_rehabilitacion WHERE id_paciente = ?';
    const rows = await pool.query(sql, [idPaciente]);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getSesionById = async (idSesion) => {
  try {
    const sql = 'SELECT id, fecha, conclusion FROM sesiones_rehabilitacion WHERE id = ?';
    const rows = await pool.query(sql, [idSesion]);
    return rows;
  } catch (error) {
    throw error;
  }
};

// Función para insertar una nueva sesión de rehabilitación
const insertarSesion = async (idPaciente, conclusion) => {
  try {
    const sql = 'INSERT INTO sesiones_rehabilitacion (id_paciente, fecha, datos, conclusión, realizada) VALUES (?, NOW(), ?, ?, "N")';
    const result = await pool.query(sql, [idPaciente, conclusion]);
    return result;
  } catch (error) {
    throw error;
  }
};

// Función para actualizar una sesión de rehabilitación existente
const actualizarSesion = async (idSesion, conclusion, realizada) => {
  try {
    const sql = 'UPDATE sesiones_rehabilitacion SET datos = ?, conclusión = ?, realizada = ? WHERE id = ?';
    const result = await pool.query(sql, [conclusion, realizada, idSesion]);
    return result;
  } catch (error) {
    throw error;
  }
};

// Función para eliminar una sesión de rehabilitación
const eliminarSesion = async (idSesion) => {
  try {
    const sql = 'DELETE FROM sesiones_rehabilitacion WHERE id = ?';
    const result = await pool.query(sql, [idSesion]);
    return result;
  } catch (error) {
    throw error;
  }
};

// Obtener todas las sesiones
const obtenerTodasLasSesiones = async () => {
  try {
    const sql = 'SELECT * FROM sesiones_rehabilitacion';
    const sesiones = await pool.query(sql);
    return sesiones;
  } catch (error) {
    throw error;
  }
};

// Obtener las sesiones de un paciente específico
const obtenerSesionesPorPaciente = async (idPaciente) => {
  try {
    const sql = 'SELECT * FROM sesiones_rehabilitacion WHERE id_paciente = ? ORDER BY fecha DESC';
    const sesiones = await pool.query(sql, [idPaciente]);
    return sesiones;
  } catch (error) {
    throw error;
  }
};

// Obtener las sesiones asociadas a un doctor específico
const obtenerSesionesPorDoctor = async (idDoctor) => {
  try {
    const sql = `
      SELECT sr.* FROM sesiones_rehabilitacion sr
      JOIN usuarios u ON sr.id_paciente = u.id
      WHERE u.id_doctor = ? ORDER BY sr.fecha DESC
    `;
    const sesiones = await pool.query(sql, [idDoctor]);
    return sesiones;
  } catch (error) {
    throw error;
  }
};



module.exports = {
  getSesionesByPaciente,
  getSesionById,
  insertarSesion,
  actualizarSesion,
  eliminarSesion,
  obtenerTodasLasSesiones,
  obtenerSesionesPorPaciente,
  obtenerSesionesPorDoctor
};
