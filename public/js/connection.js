const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Importar el paquete CORS

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bd2',
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1); // Finaliza la aplicación si no se puede conectar
  }
  console.log('Conexión exitosa a la base de datos MySQL!');
});

// Crear la aplicación Express
const app = express();
const port = 3000;

// Habilitar CORS para todas las rutas
app.use(cors());
app.use(express.json());

// Función para obtener técnicos
function obtenerTecnicos(callback) {
  const query = 'SELECT * FROM Tecnico';
  connection.query(query, (err, rows) => {
    if (err) {
      console.error('Error al obtener técnicos:', err);
      return callback(err, null);
    }
    callback(null, rows);
  });
}

/**
 * Ruta para obtener todos los técnicos
 */
app.get('/tecnicos', (req, res) => {
  obtenerTecnicos((err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: 'Error en la base de datos' });
    }
    res.json({ success: true, data });
  });
});

function obtenerTecnicos_nombres(callback) {
  const query = 'SELECT * FROM tecnico ORDER BY nom1_tec ASC;';
    ;
    connection.query(query, (err, rows) => {
      if (err) {
        console.error('Error al obtener técnicos:', err);
        return callback(err, null);
      }
      callback(null, rows);
    });
  }

app.get('/tecnicos-filtro1', (req, res) => {
  obtenerTecnicos_nombres((err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: 'Error en la base de datos' });
    }
    res.json({ success: true, data });
  });
});

function obtenerTecnicos_apellidos(callback) {
  const query = 'SELECT * FROM tecnico ORDER BY apell1_tec ASC;';
    ;
    connection.query(query, (err, rows) => {
      if (err) {
        console.error('Error al obtener técnicos:', err);
        return callback(err, null);
      }
      callback(null, rows);
    });
  }

app.get('/tecnicos-filtro2', (req, res) => {
  obtenerTecnicos_apellidos((err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: 'Error en la base de datos' });
    }
    res.json({ success: true, data });
  });
});

function obtenerTecnicos_veinte(callback) {
  const query = 'SELECT * FROM tecnico ORDER BY Id_tecnico ASC LIMIT 20;';
    ;
    connection.query(query, (err, rows) => {
      if (err) {
        console.error('Error al obtener técnicos:', err);
        return callback(err, null);
      }
      callback(null, rows);
    });
  }

app.get('/tecnicos-filtro3', (req, res) => {
  obtenerTecnicos_veinte((err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: 'Error en la base de datos' });
    }
    res.json({ success: true, data });
  });
});

// Función para obtener todos los usuarios y contraseñas
function obtenerUsuariosYContraseñas(callback) {
  const query = 'SELECT Usr, Contraseña FROM Credenciales';
  connection.query(query, (err, rows) => {
    if (err) {
      console.error('Error al obtener usuarios y contraseñas:', err);
      return callback(err, null);
    }
    const usuarios = rows.map((row) => row.Usr);
    const contraseñas = rows.map((row) => row.Contraseña);
    callback(null, { usuarios, contraseñas });
  });
}

// Ruta para obtener usuarios y contraseñas
app.get('/usuarios-y-contrasenas', (req, res) => {
  obtenerUsuariosYContraseñas((err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: 'Error en la base de datos' });
    }
    res.json({ success: true, data });
  });
});

// Ruta para agregar un nuevo técnico
app.post('/tecnicos', (req, res) => {
  const { nom1_tec, nom2_tec, apell1_tec, apell2_tec, cedula, tel_tec } =
    req.body;

  // Validar que los campos obligatorios estén presentes
  if (!nom1_tec || !apell1_tec || !cedula || !tel_tec) {
    return res
      .status(400)
      .json({ success: false, message: 'Faltan datos obligatorios.' });
  }

  const query = `INSERT INTO Tecnico (nom1_tec, nom2_tec, apell1_tec, apell2_tec, cedula, tel_tec) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [nom1_tec, nom2_tec, apell1_tec, apell2_tec, cedula, tel_tec];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al insertar técnico:', err);
      return res
        .status(500)
        .json({ success: false, message: 'Error en la base de datos.' });
    }
    res.json({
      success: true,
      message: 'Técnico agregado exitosamente.',
      id: result.insertId,
    });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

// Exportar módulos
module.exports = { connection, obtenerUsuariosYContraseñas };
