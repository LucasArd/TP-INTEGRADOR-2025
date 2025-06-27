import { Vista } from "../model/vista.js";
const v = new Vista();
v.init();

export const carritoLS = cargarCarritoDeLocalStorage(); // inicializo carrito a ver si tiene algo

export function agregarAlCarrito(calzado) {
    const productoExistente = carritoLS.find(item => item.id === calzado.id);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        calzado.cantidad = 1;
        carritoLS.push(calzado);
    }

    console.log("Producto agregado al carrito:", calzado);
    console.log(carritoLS)
    guardarCarritoEnLocalStorage(); // cada vez que se agregue un producto actualizo el carrito en localstorage
}

function guardarCarritoEnLocalStorage() { // guardo el carrito en localstorage
    localStorage.setItem("carrito", JSON.stringify(carritoLS));
}


function cargarCarritoDeLocalStorage() { // traigo lo guardado en la sesion del carrito, si no hay nada : []
    const data = localStorage.getItem("carrito");
    return data ? JSON.parse(data) : [];
}

function cargarNombreDeClienteLocalStorage() {
    return localStorage.getItem("nombreCliente") || "Comprador de las sombras";
}

// ---------------------------------------- Lista, (posible tabla) con productos agregados --------------------------

function renderizarCarritoComoLista(carritoLS) {
    console.log("Intentando renderizar carrito");
    console.log("contenedorCarrito:", v.$("carrito"));
    v.pagCarrito.divCarrito.innerHTML = "";

    const divCarritoContenedor = document.createElement("div");
    divCarritoContenedor.classList.add("carrito");

    if (carritoLS.length === 0) {
        divCarritoContenedor.innerHTML = "<p>El carrito está vacío.</p>";
        v.pagCarrito.divCarrito.appendChild(divCarritoContenedor);
        return;
    }

    const ul = document.createElement("ul");
    ul.classList.add("list-group");

    carritoLS.forEach((producto) => {
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
        botonSumar.textContent = "+";

        const botonRestar = document.createElement("button");
        botonRestar.classList.add("btn-restar-producto-cart");
        botonRestar.textContent = "-";

        divBotones.appendChild(botonSumar);
        divBotones.appendChild(botonRestar);

        botonSumar.addEventListener("click", () => {
            producto.cantidad += 1;
            guardarCarritoEnLocalStorage();
            renderizarCarritoComoLista(carritoLS);
        });

        botonRestar.addEventListener("click", () => {
            if (producto.cantidad > 1) {
                producto.cantidad -= 1;
            } else {
                const index = carritoLS.indexOf(producto);
                if (index !== -1) carritoLS.splice(index, 1);
            }
            guardarCarritoEnLocalStorage();
            renderizarCarritoComoLista(carritoLS);
        });

        div.appendChild(li);
        div.appendChild(divBotones);
        ul.appendChild(div);
    });

    // --------------------- Botón Confirmar ---------------------
    const botonConfirmar = document.createElement("button");
    botonConfirmar.textContent = "Confirmar Compra";
    botonConfirmar.classList.add("btn", "btn-success", "mt-3");

    botonConfirmar.addEventListener("click", () => {
        const modal = new bootstrap.Modal(document.getElementById('modalConfirmacion'));
        modal.show();

        window.__confirmarDatos = {
            comprador: cargarNombreDeClienteLocalStorage(),
            productos: carritoLS.map(producto => ({
                idProducto: producto.id,
                cantidad: producto.cantidad,
                precio: producto.price
            })),
            precioTotal: carritoLS.reduce((total, producto) => total + producto.price * producto.cantidad, 0)
        };
    });

    divCarritoContenedor.appendChild(ul);
    divCarritoContenedor.appendChild(botonConfirmar);
    v.pagCarrito.divCarrito.appendChild(divCarritoContenedor);
}
document.addEventListener("DOMContentLoaded", () => {
    const btnConfirmarModal = document.getElementById("btnConfirmarModal");

    btnConfirmarModal?.addEventListener("click", async () => {
        const modalConfirmacion = bootstrap.Modal.getInstance(document.getElementById('modalConfirmacion'));
        modalConfirmacion.hide();

        const { comprador, productos, precioTotal } = window.__confirmarDatos || {};

        try {
            const res = await fetch('/generar-ticket', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ comprador, precioTotal, productos })
            });

            const data = await res.json();

            if (data.success) {
                carritoLS.length = 0;
                localStorage.removeItem("carrito");

                v.pagCarrito.divCarrito.innerHTML = `
                    <p>¡Pedido confirmado! El carrito ha sido vaciado.</p>
                    <button type="button" class="btn btn-success mt-3" id="btnTicket">Ir al ticket</button>`;

                const btnTicket = v.$("btnTicket");
                btnTicket.addEventListener("click", () => {
                    window.location.href = `/ticket-html/${data.idTicket}`;
                });
            } else {
                alert("Error al generar el ticket.");
            }
        } catch (err) {
            console.error("Error al confirmar compra:", err);
            alert("Error de conexión al servidor.");
        }
    });
});

if (v.pagCarrito?.divCarrito) {
    renderizarCarritoComoLista(carritoLS);
}