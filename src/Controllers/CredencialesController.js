import {pool} from '../db.js'

export const readUsuariosYContraseñas = async(req, res) =>{
  try {

    const [rows] = await pool.query('SELECT Usr, Contraseña FROM Credenciales');

    const usuarios = rows.map(row => row.Usr);
    const contraseñas = rows.map(row => row.Contraseña);

    res.json(rows)
  } catch (error) {
    console.error('Error al obtener usuarios y contraseñas:', error);
    throw error; 
  }
}

  
