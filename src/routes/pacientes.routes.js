import { Router } from "express";
import { getPaciente, createPaciente, updatePaciente, deletePaciente } from "../controllers/pacientes.controller.js";

const router = Router();

router.get('/pacientes', getPaciente);

router.post('/pacientes', createPaciente);

router.delete('/pacientes/:id', deletePaciente);

router.put('/pacientes/:id', updatePaciente);

export default router;