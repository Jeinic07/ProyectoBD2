import { Router } from "express";
import { readUsuariosYContraseñas} from '../Controllers/CredencialesController.js'

const router = Router();

router.get('/credenciales', readUsuariosYContraseñas );

export default router;