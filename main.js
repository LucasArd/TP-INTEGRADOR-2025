import express from 'express';
import dotenv from 'dotenv';
import { initDB } from './controllers/controllersApi/AppBDD.js';
import { Router } from './model/router.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = new Router(app);
initDB();
router.iniciar();

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}/`);
});
