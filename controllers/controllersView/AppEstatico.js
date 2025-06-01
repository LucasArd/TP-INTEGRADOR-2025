// AppEstatico.js
import express from 'express';
import { modelPath, servicePath, staticPath } from '../../paths/rutasVistas.js';
import dotenv from 'dotenv';
dotenv.config(); 

const app = express()
const port = process.env.PORT_CLIENTE;

app.use(express.static(staticPath));

app.use("/model",express.static(modelPath));
app.use("/service",express.static(servicePath));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}\n`);
  console.log(`Acceder en: http://localhost:3000/bienvenida.html`);
})
