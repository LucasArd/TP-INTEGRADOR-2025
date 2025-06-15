import PATHS from "../paths/paths.js";
import express from 'express'
import { ObtenerProductos, ObtenerProductoPorId, PostModificar,darAltaProducto, VistaModificar, EliminarProducto, cambiarEstadoProducto, iniciarSesion, generarPDF, generarTicket} from "../controllers/controllersApi/AppApiAbm.js";
import {dashboard,ticketView,viewAlta,viewBaja,viewLogin,viewMod} from "../controllers/controllersView/AppEjs.js";
import { authMiddleware } from "../controllers/controllersLogin/AppJWT.js";

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
        iniciarSesion(this.app);
        
        darAltaProducto(this.app);
    }

    cargarRutasEjs() {        
        this.app.get('/', viewLogin);
        this.app.get('/dashboard', authMiddleware, dashboard);
        this.app.get('/alta', authMiddleware, viewAlta);
        this.app.get('/baja', authMiddleware, viewBaja);
        this.app.get('/modificacion/:idProducto', authMiddleware, viewMod);

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
