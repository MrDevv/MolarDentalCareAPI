import { Router } from "express";
import { getCitas, createCitas, updateCitas, deleteCitas, reportCitas, getAllReportsCitas } from "../controllers/citas.controller.js";

const router = Router();


router.get('/citas', getCitas);

router.post('/citas', createCitas);

router.delete('/citas/:id', deleteCitas);

router.put('/citas/:id', updateCitas);

router.get('/reporteCitas/:id', reportCitas);

router.get('/reporteCitas', getAllReportsCitas);

export default router;