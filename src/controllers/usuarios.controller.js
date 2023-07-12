import { json, response } from "express";
import { pool } from "../db.js";

export const getUsuarios = async (req, res = response) => {
    try {
        const [data] = await pool.query('SELECT * FROM usuario');
        res.json(data)
    } catch (error) {
        res.status(500).json({
            message: 'Server Error'
        })
    }
}

export const createUsuario = async(req, res = response) => {
    try {
        const {usuario, password, rol} = req.body;

        await pool.query('INSERT INTO usuario VALUES(?, ?, ?)', [usuario, password, rol]);

        res.json({
            ...req.body
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error'
        })    
    }
}

export const updateUsuario = (req, res = response) => {
    // TODO: consulta a la db

    res.json({
        message: 'actualizando paciente'
    })
}

export const deleteUsuario = (req, res = response) => {

    // TODO: consulta a la db
    res.json({
        message: 'eliminando paciente'
    })
}