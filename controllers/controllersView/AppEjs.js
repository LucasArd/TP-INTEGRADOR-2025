import ejs from 'ejs';
import PATHS from '../../paths/paths.js';

import { conectarBase } from '../controllersApi/AppBDD.js';


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

export async function viewLogin(req,res){
    let html = await ejs.renderFile(PATHS.loginView);
    res.status(200).send(html);
}

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

export async function ticketView(req, res) {
    const idTicket = req.params.id;
    const db = await conectarBase();
    try {
        const [rows] = await db.query('SELECT * FROM ticket WHERE idTicket = ?', [idTicket]);
        const ticket = rows[0];

        if (!ticket) return res.status(404).send('Ticket no encontrado');

        const html = await ejs.renderFile(PATHS.ticketView, { ticket, mostrarBoton: true });
        res.status(200).send(html);

    } catch (error) {
        console.error('Error obteniendo ticket:', error);
        res.status(500).send('Error cargando ticket');
    } finally {
        await db.end();
    }
}