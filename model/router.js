import PATHS from "../paths/paths.js";
import express from 'express'
import { ObtenerProductos, ObtenerProductoPorId, PostModificar, VistaModificar, EliminarProducto, cambiarEstadoProducto } from "../controllers/controllersApi/AppApiAbm.js";
import {dashboard,viewAlta,viewBaja,viewMod} from "../controllers/controllersView/AppEjs.js";

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
    }

    cargarRutasEjs() {        
        this.app.get('/', dashboard);
        this.app.get('/alta',viewAlta)
        this.app.get('/baja',viewBaja)
        this.app.get('/modificacion',viewMod)
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
