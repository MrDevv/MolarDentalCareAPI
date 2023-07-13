import { Router } from "express";
import { getCitas, createCitas, updateCitas, deleteCitas } from "../controllers/citas.controller.js";

const router = Router();


router.get('/citas', getCitas);

router.post('/citas', createCitas);

router.delete('/citas/:id', deleteCitas);

router.put('/citas/:id', updateCitas);

export default router;