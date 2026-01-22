import { Router } from 'express';
import Tanqueo from '../models/tanqueo.model.js';

const router = Router();

// GET /api/tanqueos -> Obtener todos (Ordenados por odómetro descendente)
router.get('/', async (req, res) => {
    try {
        const tanqueos = await Tanqueo.find().sort({ odometro: -1 });
        res.json(tanqueos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener tanqueos' });
    }
});

// POST /api/tanqueos -> Crear uno nuevo
router.post('/', async (req, res) => {
    try {
        const nuevoTanqueo = new Tanqueo(req.body);
        const guardado = await nuevoTanqueo.save();
        res.status(201).json(guardado);
    } catch (error) {
        res.status(400).json({ error: 'Error al guardar datos: ' + error.message });
    }
});

// DELETE /api/tanqueos/:id -> Eliminar
router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await Tanqueo.findByIdAndDelete(req.params.id);
        if (!eliminado) return res.status(404).json({ error: 'Tanqueo no encontrado' });
        res.json({ message: 'Tanqueo eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar' });
    }
});

export default router;