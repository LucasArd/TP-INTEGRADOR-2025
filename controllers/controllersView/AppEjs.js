import ejs from 'ejs';   
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config(); 
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT_ADMIN;

app.use(express.static(path.join(__dirname, '../../static')));
app.use(express.static(path.join(__dirname, '../../model')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function dashboard(req, res) {
    let html = await ejs.renderFile(path.join(__dirname, '../../', 'view', 'dashboard.ejs'));
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    console.log(`Acceder en: http://localhost:3001/\n`);
})

