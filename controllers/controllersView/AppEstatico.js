// AppEstatico.js
import express from 'express';
import { modelPath, staticPath } from '../../paths/rutasVistas.js';

const app = express()
const port = 3000

app.use(express.static(staticPath));

app.use("/model",express.static(modelPath));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}\n`);
  console.log(`Acceder en: http://localhost:3000/bienvenida.html`);
})
