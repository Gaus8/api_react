import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  documento: { type: String, required: true }, 
  email: { type: String, required: true, unique: true },
  activo: {type: Boolean}
}, { timestamps: true });  

export const Usuario = mongoose.model("Usuario", UsuarioSchema);