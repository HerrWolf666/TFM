const db = require('./db');

const query = 'SELECT * FROM usuarios'; // Cambia esta consulta según la tabla que quieras probar

async function testDatabase() {
  try {
    const [results, fields] = await db.query(query);
    console.log('Resultados de la consulta:');
    console.table(results);
  } catch (error) {
    console.error('Error ejecutando la consulta:', error);
  } finally {
    db.end(); // Cierra la conexión una vez que hayas terminado
  }
}

testDatabase();


