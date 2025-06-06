import ejs from 'ejs';
import PATHS from '../../paths/paths.js';



export async function dashboard(req, res) {
    let html = await ejs.renderFile(PATHS.dashboardView);
    res.status(200).send(html);
}

export async function viewAlta(req,res){
    let html = await ejs.renderFile(PATHS.altaView, { abm:'A' });
    res.status(200).send(html);
}

export async function viewBaja(req,res){
    let html = await ejs.renderFile(PATHS.dashboardView, { abm:'B' });
    res.status(200).send(html);
}

// export async function viewMod(req,res){
//     let html = await ejs.renderFile(PATHS.modificarView, { abm:'M' });
//     res.status(200).send(html);
// }

export async function viewMod(req, res) { 
    const idProducto = parseInt(req.params.idProducto);
    const response = await fetch('http://localhost:3000/api/productos');
    const data = await response.json();
    
    const producto = data.find(p => p.idProducto === idProducto);

    if (!producto) {
        return res.status(404).send('Producto no encontrado');
    }

    let html = await ejs.renderFile(PATHS.modificarView, { abm: 'M', producto });
    res.status(200).send(html);
}
