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
        const {apellidos, nombres, fechaNacimiento, dni, telefono, direccion, correo, idusuario} = req.body;
        console.log(body);

        const data = await pool.query('INSERT INTO paciente(apellidos, nombres, fechaNacimiento, dni, telefono, direccion, correo, idusuario) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [apellidos, nombres, fechaNacimiento, dni, telefono, direccion, correo, idusuario]);
    } catch (error) {
        res.status(500).json({
            message: 'Server Error'
        })    
    }
}

export const updatePaciente = (req, res = response) => {
    // TODO: consta a la db

    res.json({
        message: 'actualizando paciente'
    })
}

export const deletePaciente = (req, res = response) => {

    // TODO: consta a la db
    res.json({
        message: 'eliminando paciente'
    })
}