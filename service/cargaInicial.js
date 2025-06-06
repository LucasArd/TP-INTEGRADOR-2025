import { Zapatilla } from "../model/zapatilla.js";
import { Botin } from "../model/botin.js";
import { Vista } from "../model/vista.js";
const v = new Vista();
const url = 'http://localhost:3000/api/productos'
const optionsGET = {
    method: "GET",
    headers: {}
};
let zapatillas = new Array();
let botines = new Array();

async function obtenerDatos() {
    try {
        const response = await fetch(url,optionsGET)
        if (response.ok) {
            const calzadosJSON = await response.json();
            return calzadosJSON;
        }else{
            console.error(`Error HTTP: ${response.status}`)
            return [];
        }
    } catch (error) {
        window.alert("Error al cargar los datos")
        return [];
    }
}

async function crearCalzados() {
    let vector = await obtenerDatos();

    let c = vector.map((calzado) => {
    if (calzado.tipo === "Zapatilla") {
        let z = new Zapatilla(calzado.idProducto, calzado.nombre, calzado.tipo, calzado.color, calzado.talle, calzado.img, calzado.url, calzado.precio, calzado.tipoZapatilla);
        z.activo = calzado.activo;
        zapatillas.push(z);
        return z;
    } else {
        let b = new Botin(calzado.idProducto, calzado.nombre, calzado.tipo, calzado.color, calzado.talle, calzado.img, calzado.url, calzado.precio, calzado.tipoBotin, calzado.largoTapones);
        b.activo = calzado.activo;
        botines.push(b);
        return b;
    }
    });

    return c;
}

const c = await crearCalzados()

console.log(c);

function cargarBotines() {
    botines.forEach(x => {
        if (x.activo) {
            v.pagBotines.divBotines.appendChild(x.createHtmlElement());
        }    
    });
}

function cargarZapatillas() {
    zapatillas.forEach(x => {
        if (x.activo) {
            v.pagZapatillas.divZapatillas.appendChild(x.createHtmlElement());
        }
    });
}

if (v.pagBotines.divBotines) cargarBotines();
if (v.pagZapatillas.divZapatillas) cargarZapatillas();


