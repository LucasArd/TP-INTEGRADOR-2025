import PATHS from "../paths/paths.js";
import express from 'express'
import { ObtenerProductos, ObtenerProductoPorId, PostModificar,darAltaProducto, VistaModificar, EliminarProducto, cambiarEstadoProducto, buscadorTicket,generarTicket, generarPDF} from "../controllers/controllersApi/AppApiAbm.js";
import {dashboard,ticketView,viewAlta,viewBaja,viewLogin,viewMod} from "../controllers/controllersView/AppEjs.js";

export class Router {
    constructor(app) {
        this.app = app;
    }

    cargarRutasApiAbm() {
        ObtenerProductos(this.app);
        ObtenerProductoPorId(this.app);
        EliminarProducto(this.app);
        VistaModificar(this.app);
        PostModificar(this.app);
        cambiarEstadoProducto(this.app);
        buscadorTicket(this.app);
        
        darAltaProducto(this.app);
    }

    cargarRutasEjs() {        
        this.app.get('/',viewLogin);
        this.app.get('/dashboard',dashboard);
        this.app.get('/alta',viewAlta);
        this.app.get('/baja',viewBaja);
        this.app.get('/modificacion/:idProducto',viewMod);
        this.app.get('/ticket-html/:id', ticketView);
        this.app.get('/ticket/:id', generarPDF);
        this.app.post('/generar-ticket', generarTicket);
    }

    cargarRutasStatic(){
        this.app.use(express.static(PATHS.static));
        this.app.use('/model', express.static(PATHS.model));
        this.app.use('/service', express.static(PATHS.service));
    }

    iniciar() {
        this.cargarRutasStatic();
        this.cargarRutasEjs();
        this.cargarRutasApiAbm();
    }
}
