import { pool } from "../db.js"

export const readAll = async(req, res) => {

    try{
        const [rows] = await pool.query(`SELECT * FROM employee`)
        res.json(rows)
    } catch (error){
        return res.status(500).json({
            message: "Algo salió mal"
        })
    }

}

export const readById = async(req, res) => {
    const id = req.params.id
    const [result] = await pool.query(`SELECT * FROM employee WHERE id = ?`, id)
    if (result.length <= 0) return res.status(404).json({
        message: "Empleado no encontrado"
    })
    res.json(result[0])
}

export const insert = async (req, res) =>{
    const {name, salary} = req.body
    const [rows] = await pool.query(`INSERT INTO employee (namee, salary) VALUES (?,?)`, [name, salary])
    
    res.send({
        id: rows.insertId,
        name,
        salary,
    })
}

export const updateById = async(req, res) => {
    const id = req.params.id
    const {name, salary} = req.body
    const [result] = await pool.query(`UPDATE employee 
        SET namee = IFNULL(?, namee), salary = IFNULL(?, salary)  WHERE id  = ?`, [name, salary, id])
    
    if (result.affectedRows <= 0) return res.status(404).json({
        message: "Empleado no encontrado"
    })        
    const [rows] = await pool.query(`SELECT * FROM employee WHERE id = ?`, id)
    res.json(rows[0])
}

export const deleteById = async(req, res) => {
    const id = req.params.id
    
    const [result] = await pool.query(`DELETE FROM employee WHERE id = ?`, id)

    if (result.affectedRows <= 0) return res.status(404).json({
        message: "Empleado no encontrado"
    })

}