
import {Router} from "express";
import { readAllPlans, createPlan} from "../Controllers/planesController.js";

const router = Router();

router.get('/planes', await readAllPlans);
router.post('/planes', createPlan);

export default router;