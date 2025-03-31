import express from "express";
import { Tarea } from "../Models/tareasModel.js";

export const routerTareas = express.Router()

routerTareas.get('/', async (req, res) => {
  try {
    const tareas = await Tarea.find(); 
    res.status(200).json(tareas);
  } catch (error) {
    console.error(" Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

routerTareas.post('/', async (req, res) => {
  try {
    const { titulo, descripcion, fecha, persona } = req.body;
    if (!titulo || !descripcion || !fecha || !persona) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const tarea = new Tarea({ titulo, descripcion, fecha, persona });
    await tarea.save(); 

    res.status(201).json({ message: " Tarea creado", tarea });
  } catch (error) {
    console.error(" Error al crear la tarea:", error);
    res.status(500).json({ error: "Error al crear la tarea" });
  }
});

routerTareas.delete('/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const resultado = await Tarea.findOneAndDelete({_id:id});
    
    if (!resultado) {
      return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }

    res.json({ mensaje: "Tarea eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error eliminando la Tarea", error });
  }
});

routerTareas.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const nuevosDatos = req.body;

    const tareaActualizada = await Tarea.findByIdAndUpdate(id, nuevosDatos, { new: true });

    if (!tareaActualizada) {
      return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }

    res.json({ mensaje: "Tarea actualizada correctamente", tarea: tareaActualizada });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar la tarea", error });
  }
});