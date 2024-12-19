import mongoose from "mongoose";

export const connectDB = async () => {

    const uri = 'mongodb+srv://Grupo-12:grupo12@cursadanodejs.ls9ii.mongodb.net/Node-js';
    try {
        await mongoose.connect(uri);
        console.log('Conexión exitosa a la BD');
    } catch (error) {
        console.error('error al conectar a la base de datos', error);
        process.exit(1);
    }

};
console.log('Pasó por /config/dbConfig.mjs');

//connectDB();