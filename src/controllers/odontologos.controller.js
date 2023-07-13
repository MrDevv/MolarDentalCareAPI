import { response } from "express";
import { pool } from "../db.js";

export const getOdontologo = async(req, res= response) => {
    try {
        const [data] = await pool.query('SELECT * FROM odontologo');
        res.json(data)    
    } catch (error) {
        res.status(500).json({
            message: 'Error en el servidor, comunicarse con un administrador'
        })
    }
}

export const createOdontologo = async(req, res = response) => {
    try {
        const {Apellidos, Nombres, FechaNacimiento, Dni, Telefono, Direccion, Correo, idUsuario} = req.body;

        const [data] = await pool.query('INSERT INTO odontologo(apellidos, nombres, fechaNacimiento, dni, telefono, direccion, correo, idusuario) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [Apellidos, Nombres, FechaNacimiento, Dni, Telefono, Direccion, Correo, idUsuario]);
        
        res.json({
            idOdontologo: data.insertId,
            ...req.body
        }) 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error en el servidor, comunicarse con un administrador'
        })    
    }
}

export const updateOdontologo = async(req, res = response) => {
    try {
        const {id} = req.params;
        const {Apellidos, Nombres, FechaNacimiento, Dni, Telefono, Direccion, Correo, idUsuario} = req.body;
        const [result] = await pool.query('UPDATE odontologo SET Apellidos = ?, Nombres = ?, FechaNacimiento = ?, Dni = ?, Telefono = ?, Direccion = ?, Correo = ?, idUsuario = ? WHERE idOdontologo = ?', [Apellidos, Nombres, FechaNacimiento, Dni, Telefono, Direccion, Correo, idUsuario, id]);

        if (result.affectedRows === 0) return res.status(404).json(
            {message: 'El odontologo a actualizar no existe'}
        )

        const [OdontologoActualizado] = await pool.query('SELECT * FROM odontologo WHERE idOdontologo = ?', [id]);

        res.json(OdontologoActualizado[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error en el servidor, comunicarse con un administrador'
        })        
    }
}

export const deleteOdontologo = (req, res = response) => {
    // TODO: consta a la db
    res.json({
        message: 'eliminando odontologo'
    })
}