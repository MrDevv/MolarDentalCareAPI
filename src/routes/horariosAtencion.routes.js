import { Router } from "express";
import { getHorarioAtencion, createHorarioAtencion, updateHorarioAtencion, deleteHorarioAtencion } from "../controllers/horariosAtencion.controller.js";

const router = Router();

router.get('/horariosAtencion', getHorarioAtencion);

router.post('/horariosAtencion', createHorarioAtencion);

router.delete('/horariosAtencion/:id', deleteHorarioAtencion);

router.put('/horariosAtencion/:id', updateHorarioAtencion);

export default router;