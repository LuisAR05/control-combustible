import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import tanqueosRoutes from './routes/tanqueos.routes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/api/tanqueos', tanqueosRoutes);

// Conexión a BD y Arranque
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('🔥 MongoDB Conectado');
        app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
    })
    .catch(err => console.error('Error conectando a MongoDB:', err));