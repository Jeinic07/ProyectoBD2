import { Router } from "express";
import { readTecnicos, readTecnicoById, CreateTecnico, 
    deleteTecnicoById, updateTecnicoById,
    readTecnicosByNombres, readTecnicosByApellidos, readTecnicos20 } from "../Controllers/tecnicosController.js";

const router = Router()


router.get('/tecnicos', readTecnicos)
router.get('/tecnicos/:id', readTecnicoById)
router.post('/tecnicos', CreateTecnico)
router.delete('/tecnicos/:id', deleteTecnicoById)
router.patch('/tecnicos/:id', updateTecnicoById)
router.get('/tecnicos-filtro1', readTecnicosByNombres)
router.get('/tecnicos-filtro2', readTecnicosByApellidos)
router.get('/tecnicos-filtro3', readTecnicos20)


export default router