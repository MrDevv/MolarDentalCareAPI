import { response } from "express";
import { pool } from "../db.js";

export const getPaciente = async(req, res= response) => {
    try {
        const [data] = await pool.query('SELECT * FROM paciente');
        res.json(data)    
    } catch (error) {
        res.status(500).json({
            message: 'Server Error'
        })
    }
}

export const createPaciente = async(req, res = response) => {
    try {
        const {Apellidos, Nombres, FechaNacimiento, Dni, Telefono, Direccion, Correo, idUsuario} = req.body;

        const [data] = await pool.query('INSERT INTO paciente(apellidos, nombres, fechaNacimiento, dni, telefono, direccion, correo, idusuario) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [Apellidos, Nombres, FechaNacimiento, Dni, Telefono, Direccion, Correo, idUsuario]);
        
        res.json({
            idPaciente: data.insertId,
            ...req.body
        }) 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server Error',
            information: error
        })    
    }
}

export const updatePaciente = async(req, res = response) => {
    try {
        const {id} = req.params;
        const {Apellidos, Nombres, FechaNacimiento, Dni, Telefono, Direccion, Correo, idUsuario} = req.body;
        const [result] = await pool.query('UPDATE paciente SET Apellidos = ?, Nombres = ?, FechaNacimiento = ?, Dni = ?, Telefono = ?, Direccion = ?, Correo = ?, idUsuario = ? WHERE idPaciente = ?', [Apellidos, Nombres, FechaNacimiento, Dni, Telefono, Direccion, Correo, idUsuario, id]);

        if (result.affectedRows === 0) return res.status(404).json(
            {message: 'El paciente a actualizar no existe'}
        )

        const [pacienteActualizado] = await pool.query('SELECT * FROM paciente WHERE idPaciente = ?', [id]);

        res.json(pacienteActualizado[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error en el servidor, comunicarse con un administrador'
        })        
    }
}

export const deletePaciente = (req, res = response) => {

    // TODO: consta a la db
    res.json({
        message: 'eliminando paciente'
    })
}