import mongoose from 'mongoose';

const tanqueoSchema = new mongoose.Schema({
    fecha: { type: Date, required: true },
    litros: { type: Number, required: true },
    precio_litro: { type: Number, required: true },
    odometro: { type: Number, required: true },
    costo_carga: { type: Number, required: true },
    consumo_parcial: { type: Number, default: 0 },
    costo_km: { type: Number, default: 0 },
}, {
    timestamps: true
});

export default mongoose.model('Tanqueo', tanqueoSchema);