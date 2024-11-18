import { Router } from "express"
import { inicio } from "../Controllers/indexController.js"

const router = Router()

router.get('/', inicio)

export default router