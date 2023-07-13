import { response } from "express";
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
        const {Usuario, Contrasena, Rol} = req.body;
        const [nuevoUsuario] = await pool.query('INSERT INTO usuario(Usuario, Contrasena, Rol) VALUES(?, ?, ?)', [Usuario, Contrasena, Rol]);

        res.json({
            idUsuario: nuevoUsuario.insertId,
            ...req.body
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error en el servidor, comunicarse con el administrador',
        })    
    }
}

export const updateUsuario = async(req, res = response) => {
    try {
        const {id} = req.params;
        const { Usuario, Contrasena, Rol } = req.body;
        const [result] = await pool.query('UPDATE usuario SET Usuario = ?, Contrasena = ?, Rol = ? WHERE idUsuario = ?', [Usuario, Contrasena, Rol, id]);

        if (result.affectedRows === 0) return res.status(404).json(
            {message: 'El usuario a actualizar no existe'}
        )

        const [usuarioActualizado] = await pool.query('SELECT * FROM usuario WHERE idUsuario = ?', [id]);

        res.json(usuarioActualizado[0])
    } catch (error) {
        res.status(500).json({
            message: 'Error en el servidor, comunicarse con un administrador'
        })
    }
}

export const deleteUsuario = (req, res = response) => {

    // TODO: consulta a la db
    res.json({
        message: 'eliminando paciente'
    })
}