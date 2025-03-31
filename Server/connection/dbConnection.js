import mongoose from "mongoose";

// Conexión a MongoDB
export const connectionDb = async () => {
   try {
     const connectDb = await mongoose.connect(process.env.DATABASE_URL);
     console.log(
       'Connection established',
       connectDb.connection.name,
       connectDb.connection.host);
   } catch (err) {
     console.log('Fallo en la conexion: ' + err);
   };
 };
 