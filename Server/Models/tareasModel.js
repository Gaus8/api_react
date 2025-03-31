import mongoose from "mongoose";

const tareaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  fecha: { type: Date, required: true }, 
  persona: { type: String, required: true},
}, { timestamps: true });  

export const Tarea = mongoose.model("Tarea", tareaSchema);