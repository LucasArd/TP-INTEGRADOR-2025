import express from 'express';
import { mostrarProductos } from './AppBDD.js';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express()
const port = process.env.PORT_API;

app.use(express.json());
app.use(cors());

app.get('/api/productos', async (req,res,next) => {
    try {
        const productos = await mostrarProductos();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});