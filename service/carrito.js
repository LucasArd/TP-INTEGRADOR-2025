import {Vista} from "../model/vista.js";
const v = new Vista();

export const carrito = cargarCarritoDeLocalStorage(); // inicializo carrito a ver si tiene algo

export function agregarAlCarrito(calzado) {
    carrito.push(calzado);
    console.log("Producto agregado al carrito:", calzado);
    console.log(carrito)
    guardarCarritoEnLocalStorage(); // cada vez que se agregue un producto actualizo el carrito en localstorage
}

function guardarCarritoEnLocalStorage() { // guardo el carrito en localstorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


function cargarCarritoDeLocalStorage() { // traigo lo guardado en la sesion del carrito, si no hay nada : []
    const data = localStorage.getItem("carrito");
    return data ? JSON.parse(data) : [];
}

// ---------------------------------------- Lista, (posible tabla) con productos agregados --------------------------

function renderizarCarritoComoLista(carrito) {
    console.log("Intentando renderizar carrito");
    console.log("contenedorCarrito:", document.getElementById("carrito"));
    // const contenedorCarrito = document.getElementById("carrito");
    
    v.pagCarrito.divCarrito.innerHTML = ""; // limpiar antes de renderizar
    if (carrito.length === 0) {
        v.pagCarrito.divCarrito.innerHTML = "<p>El carrito está vacío.</p>";
        return;
    }

    const ul = document.createElement("ul");
    ul.classList.add("list-group");

    carrito.forEach((producto) => {
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.innerHTML = `
            ${producto.name}<br>
            Precio: $${producto.price} <br>
            Cantidad: ${producto.cantidad || 1}
        `;
        ul.appendChild(li);
    });

    // boton confirmar pedido
    const botonConfirmar = document.createElement("button");
    botonConfirmar.textContent = "Confirmar Compra";
    botonConfirmar.classList.add("btn", "btn-success", "mt-3");

    // Limpio carrito y storage
    botonConfirmar.addEventListener("click", () => {
        carrito.length = 0;
        localStorage.removeItem("carrito");
        v.pagCarrito.divCarrito.innerHTML = "<p>¡Pedido confirmado! El carrito ha sido vaciado.</p>";
    });

    v.pagCarrito.divCarrito.appendChild(ul);
    v.pagCarrito.divCarrito.appendChild(botonConfirmar);
}

if (v.pagCarrito.divCarrito) renderizarCarritoComoLista(carrito);