import { Router } from "express";
import { readAll, readById, insert, 
    updateById, deleteById } from "../Controllers/employeesController.js";

const router = Router()

router.get('/employees', readAll)
//para acceder a esta ruta, tienen que ingresar el parametro pedido
router.get('/employees/:id', readById)
router.post('/employees',insert )
router.patch('/employees/:id', updateById)
router.delete('/employees/:id', deleteById)


export default router