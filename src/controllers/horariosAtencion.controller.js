import { response } from "express";
import { pool } from "../db.js";

export const getHorarioAtencion = async(req, res= response) => {
    try {
        const [data] = await pool.query('SELECT * FROM horarioAtencion');
        res.json(data)    
    } catch (error) {
        res.status(500).json({
            message: 'Error en el servidor, comunicarse con un administrador'
        })
    }
}

export const createHorarioAtencion = async(req, res = response) => {
    try {
        const {estado, fechaRegistro, horaInicio, horaFin, idOdontologo} = req.body;

        const [data] = await pool.query('INSERT INTO horarioAtencion(estado, fechaRegistro, horaInicio, horaFin, idOdontologo) VALUES(?, ?, ?, ?, ?)', [estado, fechaRegistro, horaInicio, horaFin, idOdontologo]);
        
        res.json({
            idHorarioAtencion: data.insertId,
            ...req.body
        }) 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error en el servidor, comunicarse con un administrador'
        })    
    }
}

export const updateHorarioAtencion = async(req, res = response) => {
    try {
        const {id} = req.params;
        const {estado, fechaRegistro, horaInicio, horaFin, idOdontologo} = req.body;
        const [result] = await pool.query('UPDATE horarioAtencion SET estado = ?, fecharegistro = ?, horainicio = ?, horafin = ?, idOdontologo = ? WHERE idHorarioAtencion= ?', [estado, fechaRegistro, horaInicio, horaFin, idOdontologo, id]);

        if (result.affectedRows === 0) return res.status(404).json(
            {message: 'El horario de atención a actualizar no existe'}
        )

        const [horarioActualizado] = await pool.query('SELECT * FROM horarioAtencion WHERE idHorarioAtencion = ?', [id]);

        res.json(horarioActualizado[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error en el servidor, comunicarse con un administrador'
        })        
    }
}

export const deleteHorarioAtencion = (req, res = response) => {

    // TODO: consta a la db
    res.json({
        message: 'eliminando horario de atención'
    })
}