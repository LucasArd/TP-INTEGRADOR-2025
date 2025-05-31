import express from 'express';
import { mostrarProductos } from './AppBDD';
const app = express()

app.use(express.json());//si viene una solicitud con header content-type aplication/json

//utiliza CORS
var cors = require('cors');
//setea cors abierto para todos los dominios
//mas opciones de configuracion https://expressjs.com/en/resources/middleware/cors.html
app.use(cors());//estoy seteando cors como middleware para todas las solicitudes

app.get('/api/productos',async (req,res,next) => {
    const productos = await mostrarProductos();
    res.status(200).send(productos);
    res.status(500).json({ error: 'Error al obtener productos' });
});

app.post('/alta', async (req,res,next)=>{
    const datos = req.body;
    console.log(datos);
    res.status(200).send({id:2158354});
});

const port = 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});