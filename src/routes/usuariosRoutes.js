import { Router} from "express";
import { readUsuarios, readUsuarioById,
       createUsuario, deleteUsuarioById } from "../Controllers/usuariosController.js";

const router = Router()

router.get('/usuarios',  readUsuarios)
router.get('/usuarios/:id', readUsuarioById)
router.post('/usuarios', createUsuario)
router.delete('/usuarios/:id', deleteUsuarioById)

export default router