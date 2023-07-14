import { response } from "express";
import { pool } from "../db.js";

export const getCitas = async(req, res= response) => {
    try {
        const [data] = await pool.query('SELECT * FROM cita');
        res.json(data)    
    } catch (error) {
        res.status(500).json({
            message: 'Error en el servidor, comunicarse con un administrador'
        })
    }
}

export const createCitas = async(req, res = response) => {
    try {
        const {montototal, idHorarioAtencion, idPaciente} = req.body;

        const [data] = await pool.query('INSERT INTO cita(montoTotal, idHorarioAtencion, idPaciente) VALUES(?, ?, ?)', [montototal, idHorarioAtencion, idPaciente]);
        
        res.json({
            idCita: data.insertId,
            ...req.body
        }) 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error en el servidor, comunicarse con un administrador'
        })    
    }
}

export const updateCitas = async(req, res = response) => {
    try {
        const {id} = req.params;
        const {montototal, idHorarioAtencion, idPaciente} = req.body;
        const [result] = await pool.query('UPDATE cita SET montoTotal = ?, idHorarioAtencion = ?, idPaciente = ? WHERE idCita= ?', [montototal, idHorarioAtencion, idPaciente, id]);

        if (result.affectedRows === 0) return res.status(404).json(
            {message: 'La cita a actualizar no existe'}
        )

        const [citaActualizada] = await pool.query('SELECT * FROM cita WHERE idCita = ?', [id]);

        res.json(citaActualizada[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error en el servidor, comunicarse con un administrador'
        })        
    }
}

export const deleteCitas = (req, res = response) => {

    // TODO: consta a la db
    res.json({
        message: 'eliminando citas'
    })
}

export const reportCitas = async(req, res = response) => {
    try {
        const {id} = req.params;

        const [data] = await pool.query('SELECT c.idCita AS ID, ha.fecharegistro AS FECHA, ha.horainicio AS INICIO, ha.horafin AS FIN, CASE WHEN c.montototal >= 20 THEN "ATENDIDO" ELSE "NO ATENDIDO" END AS ESTADO FROM cita as c INNER JOIN paciente as p on c.idPaciente = p.idPaciente INNER JOIN horarioatencion as ha on c.idHorarioAtencion = ha.idHorarioAtencion WHERE p.idPaciente = ?', [id]);
        res.json(data)
    } catch (error) {
        res.status(500).json({
            message: 'Error en el servidor, comunicarse con un administrador',
            description: error
        })
    }
}