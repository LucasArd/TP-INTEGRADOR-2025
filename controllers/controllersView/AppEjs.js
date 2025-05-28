import { Zapatilla } from "../../model/zapatilla.js";

import ejs from 'ejs';       // npm install ejs
import path from 'path';
import express from 'express';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Para obtener __dirname en ES Modules:
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, '../../static'))); // Esto seria un middleware

app.use(express.urlencoded({ extended: true })); //const datos = req.body;
app.use(express.json());

const zapatilla1 = new Zapatilla(
    1,
    "Nike Air Max 90",
    "running",
    "Rojo",
    [38, 39, 40],
    "nike_air_max_90.jpg",
    "https://www.nike.com/air-max-90",
    120.99,
    "Retro-Moderno"
);

const zapatilla2 = new Zapatilla(
    2,
    "Adidas Ultraboost",
    "training",
    "Negro",
    [40, 41, 42, 43],
    "adidas_ultraboost.jpg",
    "https://www.adidas.com/ultraboost",
    150.50,
    "Minimalismo"
);

const zapatilla3 = new Zapatilla(
    3,
    "Puma RS-X",
    "street",
    "Blanco",
    [39, 40, 41, 42],
    "puma_rsx.jpg",
    "https://www.puma.com/rs-x",
    99.99,
    "Futurista"
);


async function dashboard(req, res) {
    const zapatillas = [zapatilla1, zapatilla2, zapatilla3];
    let html = await ejs.renderFile(path.join(__dirname, '../../', 'view', 'dashboard.ejs'), { zapatillas });
    res.status(200).send(html);
}

async function viewAlta(req,res){
    let html = await ejs.renderFile( path.join(__dirname, '../../', 'view', 'alta.ejs') , {abm:'A'} );
    res.status(200).send(html);
}

async function viewBaja(req,res){
    let html = await ejs.renderFile( path.join(__dirname, '../../', 'view', 'dashboard.ejs') , {abm:'B'} );
    res.status(200).send(html);
}

async function viewMod(req,res){
    let html = await ejs.renderFile( path.join(__dirname, '../../', 'view', 'dashboard.ejs') , {abm:'M'} );
    res.status(200).send(html);
}

app.get('/', dashboard);
app.get('/alta',viewAlta)
app.get('/baja',viewBaja)
app.get('/modificacion',viewMod)

const port = 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}\n`);
    console.log(`Acceder en: http://localhost:3000/`);
})

