import express from "express";
import pacientesRoutes from "./routes/pacientes.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";

const app = express();

app.use(express.json());

app.use('/api', pacientesRoutes);
app.use('/api', usuariosRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: 'endpoint not found'
    })
})

app.listen(3000)

console.log(`Servidor corriendo en el puerto 3000`);