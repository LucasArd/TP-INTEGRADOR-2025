import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PATHS = {
    // CARPETAS
    base: path.resolve(__dirname, '..'),
    controllers: path.resolve(__dirname, '..', 'controllers'),
    controllersApi: path.resolve(__dirname, '..', 'controllers', 'controllersApi'),
    controllersView: path.resolve(__dirname, '..', 'controllers', 'controllersView'),
    controllersLogin: path.resolve(__dirname, '..', 'controllers', 'controllersLogin'),
    model: path.resolve(__dirname, '..', 'model'),
    service: path.resolve(__dirname, '..', 'service'),
    staticService: path.resolve(__dirname, '..', 'service', 'static'),
    static: path.resolve(__dirname, '..', 'static'),
    view: path.resolve(__dirname, '..', 'view'),
    paths: path.resolve(__dirname),

    // CONTROLLERSAPI
    AppApiAbm: path.resolve(__dirname, '..', 'controllers', 'controllersApi', 'AppApiAbm.js'),
    AppBDD: path.resolve(__dirname, '..', 'controllers', 'controllersApi', 'AppBDD.js'),

    // CONTROLLERSVIEWS
    AppEjs: path.resolve(__dirname, '..', 'controllers', 'controllersView', 'AppEjs.js'),

    // MAIN
    main: path.resolve(__dirname, '..', 'main.js'),

    // MODEL
    botin: path.resolve(__dirname, '..', 'model', 'botin.js'),
    calzado: path.resolve(__dirname, '..', 'model', 'calzado.js'),
    routerModel: path.resolve(__dirname, '..', 'model', 'router.js'),
    vistaModel: path.resolve(__dirname, '..', 'model', 'vista.js'),
    zapatilla: path.resolve(__dirname, '..', 'model', 'zapatilla.js'),

    // SERVICE
    altaService: path.resolve(__dirname, '..', 'service', 'alta.js'),
    cargaInicialService: path.resolve(__dirname, '..', 'service', 'cargaInicial.js'),
    carritoService: path.resolve(__dirname, '..', 'service', 'carrito.js'),
    dashboardService: path.resolve(__dirname, '..', 'service', 'dashboard.js'),
    modificarService: path.resolve(__dirname, '..', 'service', 'modificar.js'),

    // STATIC
    staticBienvenidaHtml: path.resolve(__dirname, '..', 'static', 'bienvenida.html'),
    staticBotinesHtml: path.resolve(__dirname, '..', 'static', 'botines.html'),
    staticCarritoHtml: path.resolve(__dirname, '..', 'static', 'carrito.html'),
    staticProductosHtml: path.resolve(__dirname, '..', 'static', 'productos.html'),
    staticTicketHtml: path.resolve(__dirname, '..', 'static', 'ticket.html'),
    staticZapatillasHtml: path.resolve(__dirname, '..', 'static', 'zapatillas.html'),

    staticCssAlta: path.resolve(__dirname, '..', 'static', 'css', 'alta.css'),
    staticCssBienvenida: path.resolve(__dirname, '..', 'static', 'css', 'bienvenida.css'),
    staticCssCarrito: path.resolve(__dirname, '..', 'static', 'css', 'carrito.css'),
    staticCssDashboard: path.resolve(__dirname, '..', 'static', 'css', 'dashboard.css'),
    staticCssModificar: path.resolve(__dirname, '..', 'static', 'css', 'modificar.css'),
    staticCssProductos: path.resolve(__dirname, '..', 'static', 'css', 'productos.css'),

    // VIEW
    altaView: path.resolve(__dirname, '..', 'view', 'alta.ejs'),
    dashboardView: path.resolve(__dirname, '..', 'view', 'dashboard.ejs'),
    loginView: path.resolve(__dirname, '..', 'view', 'login.ejs'),
    modificarView: path.resolve(__dirname, '..', 'view', 'modificacion.ejs'),
    ticketView: path.resolve(__dirname, "..", 'view', 'ticket.ejs')
};

export default PATHS;
