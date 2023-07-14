import { Router } from "express";
import { getCitas, createCitas, updateCitas, deleteCitas, reportCitas } from "../controllers/citas.controller.js";

const router = Router();


router.get('/citas', getCitas);

router.post('/citas', createCitas);

router.delete('/citas/:id', deleteCitas);

router.put('/citas/:id', updateCitas);

router.get('/reporteCitas/:id', reportCitas);

export default router;