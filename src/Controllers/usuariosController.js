import { pool } from "../dbPost.js";

export const readUsuarios = async (req, res) => {
    try {
      const result = await pool.query(`SELECT * FROM "Usuario"`);
  
      res.json(result.rows);

    } catch (error) {
      return res.status(500).json({
        message: "Algo salió mal",
      });
    }
  };

  export const readUsuarioById = async (req, res) => {
    try {
      const {id }=  req.params;
      const values = [id];
  
      const query = `SELECT * FROM "Usuario" WHERE id_usuario = $1`;
  
      const result = await pool.query(query, values);
  
      if (result.rows.length === 0) {
        return res.status(404).json({
          message: "Usuario no encontrado",
        });
      }
  
      res.json(result.rows[0]);
    } catch (error) {
      return res.status(500).json({
        message: "Algo salió mal",
        error: error.message
      });
    }
  };

  export const createUsuario = async (req, res) => {
    try {
      const { Nom1_usr, Nom2_usr, Ape1_usr, Ape2_usr, Cedula, Direccion, Ciudad } = req.body;
  
      const query = `
        INSERT INTO "Usuario" ("Nom1_usr", "Nom2_usr", "Ape1_usr", "Ape2_usr", "Cedula", "Direccion", "Ciudad")
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id_usuario;
      `;
      const values = [Nom1_usr, Nom2_usr, Ape1_usr, Ape2_usr, Cedula, Direccion, Ciudad];
  
      const result = await pool.query(query, values);
  
      res.status(201).json({
        message: "Usuario creado con éxito",
        id_usuario: result.rows[0].id_usuario
      });
    } catch (error) {
      return res.status(500).json({
        message: "Algo salió mal",
        error: error.message
      });
    }
  };

export const deleteUsuarioById = async (req, res) => {
  try {
    const id = req.params.id;
    const values = [id]
    const query = `
      DELETE FROM "Usuario"
      WHERE id_usuario = $1;
    `;

    const result = await pool.query(query,values );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Usuario no encontrado"
      });
    }

    res.status(200).json({
      message: "Usuario eliminado con éxito"
    });
  } catch (error) {
    return res.status(500).json({
      message: "Algo salió mal",
      error: error.message
    });
  }
};
