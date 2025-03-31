import express from "express";
import { Tarea } from "../Models/tareasModel.js";

export const routerConsultarTareas = express.Router()

routerConsultarTareas.get('/:fecha', async (req, res) => {
  try {
    const { fecha } = req.params; // Recibe fecha en formato "YYYY-MM-DD"

    // Convertir la fecha en formato ISO sin modificar la hora
    const fechaISO = new Date(`${fecha}T00:00:00.000Z`);

    // Buscar tareas con esa fecha exacta
    const tareas = await Tarea.find({ fecha: fechaISO });

    res.status(200).json(tareas);
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    res.status(500).json({ error: "Error al obtener tareas" });
  }
});

routerConsultarTareas.get('/rango/:fechaInicio/:fechaFin', async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.params;

    // Convertir fechas a formato Date asegurando que tengan T00:00:00.000Z
    const inicio = new Date(`${fechaInicio}T00:00:00.000Z`);
    const fin = new Date(`${fechaFin}T23:59:59.999Z`); // Incluir todo el día

    // Buscar tareas con fecha en el rango sin importar la hora
    const tareas = await Tarea.find({
      fecha: { $gte: inicio, $lte: fin }
    });

    res.status(200).json(tareas);
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    res.status(500).json({ error: "Error al obtener tareas" });
  }
});

routerConsultarTareas.get('/persona/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tareas = await Tarea.find({ persona: id });

    if (tareas.length === 0) {
      return res.status(404).json({ error: "No se encontraron tareas para esta persona" });
    }

    res.status(200).json(tareas);
  } catch (error) {
    console.error("Error al obtener tareas por persona:", error);
    res.status(500).json({ error: "Error al obtener tareas" });
  }
});