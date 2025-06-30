import { Zapatilla } from "../model/zapatilla.js";
import { Botin } from "../model/botin.js";
import { Vista } from "../model/vista.js";
const v = new Vista();
v.init();

const url = '/api/productos/todos'
const optionsGET = {
    method: "GET",
    headers: {}
};

let zapatillas = [];
let botines = [];

async function obtenerDatos() {
    try {
        const response = await fetch(url, optionsGET);
        if (response.ok) {
            const calzadosJSON = await response.json();
            return calzadosJSON.productos; // Array de productos
        } else {
            console.error(`Error HTTP: ${response.status}`);
            return [];
        }
    } catch (error) {
        window.alert("Error al cargar los datos");
        return [];
    }
}

async function crearCalzados() {
    let vector = await obtenerDatos();

    vector.forEach(calzado => {
        console.log("Calzado tipo:", calzado.tipo);
        if (calzado.tipo === "Zapatilla") {
            let z = new Zapatilla(calzado.idProducto, calzado.nombre, calzado.tipo, calzado.color, calzado.talle, calzado.img, calzado.url, calzado.precio, calzado.tipoZapatilla);
            z.activo = calzado.activo;
            zapatillas.push(z);
        } else if (calzado.tipo === "Botin") {
            let b = new Botin(calzado.idProducto, calzado.nombre, calzado.tipo, calzado.color, calzado.talle, calzado.img, calzado.url, calzado.precio, calzado.tipoBotin, calzado.largoTapones);
            b.activo = calzado.activo;
            botines.push(b);
        }
    });
}

const productosPorPagina = 4;
let currentPageZapatilla = 0;
let currentPageBotin = 0;
const itemsPerPage = productosPorPagina; // para claridad

function paginar(array, pagina, cantidadPorPagina) {
    const inicio = pagina * cantidadPorPagina;
    return array.slice(inicio, inicio + cantidadPorPagina);
}

function cargarZapatillas() {
    if (!v.pagZapatillas?.divZapatillas) return;

    const div = v.pagZapatillas.divZapatillas;
    div.innerHTML = "";

    const zapatillasActivas = zapatillas.filter(z => z.activo);
    const pagina = paginar(zapatillasActivas, currentPageZapatilla, itemsPerPage);

    pagina.forEach(z => {
        div.appendChild(z.createHtmlElement());
    });

    renderPaginadorZapatillas(zapatillasActivas.length);
    actualizarBotonesZapatillas(zapatillasActivas.length);
}

function cargarBotines() {
    console.log("Cargando botines. Cantidad:", botines.length);
    if (!v.pagBotines?.divBotines) return;

    const div = v.pagBotines.divBotines;
    div.innerHTML = "";

    const botinesActivos = botines.filter(b => b.activo);
    const pagina = paginar(botinesActivos, currentPageBotin, itemsPerPage);

    pagina.forEach(b => {
        div.appendChild(b.createHtmlElement());
    });

    renderPaginadorBotines(botinesActivos.length);
    actualizarBotonesBotines(botinesActivos.length);
}

function renderPaginadorZapatillas(totalItems) {
    const cont = document.getElementById("paginador-zapatillas");
    if (!cont) return;
    cont.innerHTML = "";

    const totalPaginas = Math.ceil(totalItems / itemsPerPage);

    for (let i = 0; i < totalPaginas; i++) {
        const btn = document.createElement("button");
        btn.textContent = (i + 1).toString();
        btn.classList.add("btn", "btn-outline-primary", "mx-1");
        if (i === currentPageZapatilla) btn.classList.add("active");

        btn.addEventListener("click", () => {
            currentPageZapatilla = i;
            cargarZapatillas();
        }); 

        cont.appendChild(btn);
    }
}

function renderPaginadorBotines(totalItems) {
    const cont = document.getElementById("paginador-botines");
    if (!cont) return;
    cont.innerHTML = "";

    const totalPaginas = Math.ceil(totalItems / itemsPerPage);

    for (let i = 0; i < totalPaginas; i++) {
        const btn = document.createElement("button");
        btn.textContent = (i + 1).toString();
        btn.classList.add("btn", "btn-outline-primary", "mx-1");
        if (i === currentPageBotin) btn.classList.add("active");

        btn.addEventListener("click", () => {
            currentPageBotin = i;
            cargarBotines();
        });

        cont.appendChild(btn);
    }
}

function actualizarBotonesZapatillas(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const prevBtn = document.getElementById('prevZapatillas');
    const nextBtn = document.getElementById('nextZapatillas');

    if (prevBtn) prevBtn.disabled = currentPageZapatilla === 0;
    if (nextBtn) nextBtn.disabled = currentPageZapatilla >= totalPages - 1;
}

function actualizarBotonesBotines(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const prevBtn = document.getElementById('prevBotines');
    const nextBtn = document.getElementById('nextBotines');

    if (prevBtn) prevBtn.disabled = currentPageBotin === 0;
    if (nextBtn) nextBtn.disabled = currentPageBotin >= totalPages - 1;
}

// Eventos botones prev/next zapatillas
document.getElementById('prevZapatillas')?.addEventListener('click', () => {
    if (currentPageZapatilla > 0) {
        currentPageZapatilla--;
        cargarZapatillas();
    }
});

document.getElementById('nextZapatillas')?.addEventListener('click', () => {
    const totalPages = Math.ceil(zapatillas.filter(z => z.activo).length / itemsPerPage);
    if (currentPageZapatilla < totalPages - 1) {
        currentPageZapatilla++;
        cargarZapatillas();
    }
});

// Eventos botones prev/next botines
document.getElementById('prevBotines')?.addEventListener('click', () => {
    if (currentPageBotin > 0) {
        currentPageBotin--;
        cargarBotines();
    }
});

document.getElementById('nextBotines')?.addEventListener('click', () => {
    const totalPages = Math.ceil(botines.filter(b => b.activo).length / itemsPerPage);
    if (currentPageBotin < totalPages - 1) {
        currentPageBotin++;
        cargarBotines();
    }
});

// Inicialización principal, si no hacemos esto no carga la apgina
(async () => {
    await crearCalzados();

    cargarZapatillas();
    cargarBotines();
})();




