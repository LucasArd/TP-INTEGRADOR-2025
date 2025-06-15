import { Vista } from "../model/vista.js";
const v = new Vista();
v.init();

export const carrito = cargarCarritoDeLocalStorage(); // inicializo carrito a ver si tiene algo

export function agregarAlCarrito(calzado) {
    const productoExistente = carrito.find(item => item.id === calzado.id);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        calzado.cantidad = 1;
        carrito.push(calzado);
    }

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

function cargarNombreDeClienteLocalStorage() {
    return localStorage.getItem("nombreCliente") || "Comprador de las sombras";
}

// ---------------------------------------- Lista, (posible tabla) con productos agregados --------------------------

function renderizarCarritoComoLista(carrito) {
    console.log("Intentando renderizar carrito");
    console.log("contenedorCarrito:", v.$("carrito"));
    v.pagCarrito.divCarrito.innerHTML = "";

    const divCarritoContenedor = document.createElement("div");
    divCarritoContenedor.classList.add("carrito"); // esta clase te la paso en CSS

    if (carrito.length === 0) {
        divCarritoContenedor.innerHTML = "<p>El carrito está vacío.</p>";
        v.pagCarrito.divCarrito.appendChild(divCarritoContenedor);
        return;
    }

    const ul = document.createElement("ul");
    ul.classList.add("list-group");

    carrito.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("div-producto-cart");

        const li = document.createElement("li");
        li.classList.add("list-group-item", "li-producto-cart", "nunito");
        li.innerHTML = `
            ${producto.name}<br>
            Precio: $${producto.price * producto.cantidad} <br>
            Cantidad: ${producto.cantidad}
        `;
        const divBotones = document.createElement("div");
        divBotones.classList.add("div-botones-producto-cart");

        const botonSumar = document.createElement("button");
        botonSumar.classList.add("btn-sumar-producto-cart");
        const botonRestar = document.createElement("button");
        botonRestar.classList.add("btn-restar-producto-cart");
        divBotones.appendChild(botonSumar);
        divBotones.appendChild(botonRestar);

        botonSumar.addEventListener("click", async (e) => {
            producto.cantidad += 1;
            guardarCarritoEnLocalStorage();
            renderizarCarritoComoLista(carrito);
        });

        botonRestar.addEventListener("click", async (e) => {
            if (producto.cantidad > 1) {
                producto.cantidad -= 1;
            } else {
                const index = carrito.indexOf(producto);
                if (index !== -1) carrito.splice(index, 1);
            }
            guardarCarritoEnLocalStorage();
            renderizarCarritoComoLista(carrito);
        });

        div.appendChild(li);
        div.appendChild(divBotones);

        ul.appendChild(div);
    });

    const botonConfirmar = document.createElement("button");
    botonConfirmar.textContent = "Confirmar Compra";
    botonConfirmar.classList.add("btn", "btn-success", "mt-3");

    botonConfirmar.addEventListener("click", async () => {
    const comprador = cargarNombreDeClienteLocalStorage();
    const precioTotal = carrito.reduce((total, producto) => total + producto.price * producto.cantidad, 0);;
    

    const res = await fetch('/generar-ticket', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comprador, precioTotal })
    });

    const data = await res.json();

    if (data.success) {
        // Vaciar carrito y mostrar mensaje con botón para ir al ticket
        carrito.length = 0;
        localStorage.removeItem("carrito");
        v.pagCarrito.divCarrito.innerHTML = `
            <p>¡Pedido confirmado! El carrito ha sido vaciado.</p>
            <button type="button" class="btn btn-success mt-3" id="btnTicket">Ir al ticket</button>`;

        // Agregar event listener para btnTicket que redirige al ticket
        const btnTicket = v.$("btnTicket");
        btnTicket.addEventListener("click", () => {
            window.location.href = `/ticket-html/${data.idTicket}`;
        });

    } else {
        alert("Error al generar el ticket.");
    }
});
divCarritoContenedor.appendChild(ul);
divCarritoContenedor.appendChild(botonConfirmar);

v.pagCarrito.divCarrito.appendChild(divCarritoContenedor);
}

if (v.pagCarrito?.divCarrito) renderizarCarritoComoLista(carrito);