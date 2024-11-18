import { pool } from "../db.js";

export const readTecnicos = async(req, res) => {

    try{
        const [rows] = await pool.query(`SELECT * FROM Tecnico`)
        res.json(rows)
    } catch (error){
        return res.status(500).json({
            message: "Algo salió mal",
            error: error.message
        })
    }

}

export const readTecnicosByNombres = async(req, res) => {

    try{
        const [rows] = await pool.query(`SELECT * FROM Tecnico ORDER BY nom1_tec ASC`)
        res.json(rows)
    } catch (error){
        return res.status(500).json({
            message: "Algo salió mal",
            error: error.message
        })
    }

}


export const readTecnicosByApellidos = async(req, res) => {

    try{
        const [rows] = await pool.query(`SELECT * FROM Tecnico ORDER BY ape1_tec ASC`)
        res.json(rows)
    } catch (error){
        return res.status(500).json({
            message: "Algo salió mal",
            error: error.message
        })
    }

}

export const readTecnicos20 = async(req, res) => {

    try{
        const [rows] = await pool.query(`SELECT * FROM tecnico ORDER BY Id_tecnico ASC LIMIT 20`)
        res.json(rows)
    } catch (error){
        return res.status(500).json({
            message: "Algo salió mal",
            error: error.message
        })
    }

}

export const readTecnicoById = async(req, res) => {
    const id = req.params.id
    const [result] = await pool.query(`SELECT * FROM Tecnico WHERE id_tecnico = ?`, id)
    if (result.length <= 0) return res.status(404).json({
        message: "Tecnico no encontrado"
    })
    res.json(result[0])
}


export const CreateTecnico = async (req, res) =>{

    try{
        const {nom1, nom2, ape1, ape2, cedula, telefono} = req.body
        const [rows] = await pool.query(`INSERT INTO Tecnico (nom1_tec, nom2_tec, ape1_tec, ape2_tec, cedula, Telefono_emp) 
    VALUES (?, ?, ?, ?, ?, ?)`, [nom1, nom2, ape1, ape2, cedula, telefono])
        
    res.status(200).json({ success: true, message: 'Técnico agregado exitosamente.' });
    }catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al agregar técnico.' });
      }

}

export const updateTecnicoById = async(req, res) => {
    const id = req.params.id
    const {nom1, nom2, ape1, ape2, cedula, telefono} = req.body
    const [result] = await pool.query(`UPDATE Tecnico 
        SET nom1_tec = IFNULL(?, nom1_tec), nom2_tec = IFNULL(?, nom2_tec), 
        ape1_tec = IFNULL(?, ape1_tec), ape2_tec = IFNULL(?, ape2_tec),
        cedula = IFNULL(?, cedula), Telefono_emp = IFNULL(?, Telefono_emp)
        WHERE id_tecnico  = ?`, [nom1, nom2, ape1, ape2, cedula, telefono, id])
    
    if (result.affectedRows <= 0) return res.status(404).json({
        message: "Tecnico no encontrado"
    })        
    const [rows] = await pool.query(`SELECT * FROM Tecnico WHERE id_tecnico = ?`, id)
    res.json(rows[0])
}

export const deleteTecnicoById = async(req, res) => {
    const id = req.params.id
    
    const [result] = await pool.query(`DELETE FROM Tecnico WHERE id_tecnico = ?`, id)

    if (result.affectedRows <= 0) return res.status(404).json({
        message: "Tecnico no encontrado"
    })
    res.status(202).json({
        message: "Tecnico eliminado con exito"
    })
}