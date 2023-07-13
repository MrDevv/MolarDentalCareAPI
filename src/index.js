import express from "express";
import pacientesRoutes from "./routes/pacientes.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import odontologosRoutes from './routes/odontologos.routes.js'
import horariosRoutes from "./routes/horariosAtencion.routes.js";

import { PORT } from "./config.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', pacientesRoutes);
app.use('/api', usuariosRoutes);
app.use('/api', odontologosRoutes);
app.use('/api', horariosRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: 'endpoint not found'
    })
})

app.listen(PORT)

console.log(`Servidor corriendo en el puerto ${PORT}`);