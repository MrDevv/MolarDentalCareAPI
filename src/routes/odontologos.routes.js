import { Router } from "express";
import { getOdontologo, createOdontologo, updateOdontologo, deleteOdontologo } from "../controllers/odontologos.controller.js";

const router = Router();

router.get('/odontologos', getOdontologo);

router.post('/odontologos', createOdontologo);

router.delete('/odontologos/:id', deleteOdontologo);

router.put('/odontologos/:id', updateOdontologo);

export default router;