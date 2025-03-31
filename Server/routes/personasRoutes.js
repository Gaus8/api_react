import express from "express";
import { Usuario } from "../Models/usuariosModel.js";

export const routerPersonas = express.Router()

routerPersonas.get('/', async (req, res) => {
  try {
    const personas = await Usuario.find(); // Obtiene todos los usuarios
    res.status(200).json(personas);
  } catch (error) {
    console.error(" Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

routerPersonas.post('/', async (req, res) => {
  try {
    const { nombre, apellido, documento, email, activo } = req.body;
    if (!nombre || !apellido || !documento || !email) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const usuario = new Usuario({ nombre, apellido, documento, email, activo });
    await usuario.save(); 

    res.status(201).json({ message: " Usuario creado", usuario });
  } catch (error) {
    console.error(" Error al crear usuario:", error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

routerPersonas.delete('/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const resultado = await Usuario.findOneAndDelete({_id:id});
    
    if (!resultado) {
      return res.status(404).json({ mensaje: "Persona no encontrada" });
    }

    res.json({ mensaje: "Persona eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error eliminando la persona", error });
  }
});

routerPersonas.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const nuevosDatos = req.body;

    const personaActualizada = await Usuario.findByIdAndUpdate(id, nuevosDatos, { new: true });

    if (!personaActualizada) {
      return res.status(404).json({ mensaje: "Persona no encontrada" });
    }

    res.json({ mensaje: "Persona actualizada correctamente", persona: personaActualizada });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar la persona", error });
  }
});