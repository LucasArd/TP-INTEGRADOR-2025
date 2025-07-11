import { Vista } from "../model/vista.js";
const v = new Vista();
v.init();

let paginaActual = 1;
let productosGlobal = [];
let totalPaginasGlobal = 1;

window.addEventListener("DOMContentLoaded", async () => {
  const main = document.getElementById("main");
  const response = await fetch("/api/productos?pagina=1&limite=4");

  const respuesta = await response.json();
  const productos = respuesta.productos;

  function renderProductos(productos, totalPaginas) {
    main.innerHTML = "";
    const esPantallaChica = window.innerWidth < 768;

    const container = document.createElement("div");
    container.classList.add("container-fluid", "mt-4");

    if (esPantallaChica) {
      const row = document.createElement("div");
      row.classList.add("row", "gy-4");

      productos.forEach((prod) => {
        const col = document.createElement("div");
        col.classList.add("col-12");

        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = v.buscarUrlImagen(prod.img);
        img.classList.add("card-img-top");
        img.alt = prod.nombre;

        const body = document.createElement("div");
        body.classList.add("card-body");

        const title = document.createElement("h5");
        title.classList.add("card-title");
        title.textContent = prod.nombre;

        const text = document.createElement("p");
        text.classList.add("card-text");
        text.innerHTML = `
                <strong>Tipo:</strong> ${prod.tipo}<br>
                <strong>Talle:</strong> ${prod.talle}<br>
                <strong>Color:</strong> ${prod.color}<br>
                <strong>Precio:</strong> $${prod.precio}<br>
                <strong>Estado:</strong> ${prod.activo}<br>

                <div style="display: flex; justify-content: center; gap: 20px; margin-top: 10px;">
                    <button class="btn-modificar" data-id="${prod.idProducto}">
                        <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#F19E39">
                            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                        </svg>
                    </button>

                    <button class="btn-estado" data-id="${
                      prod.idProducto
                    }" data-activo="${prod.activo}">
                    ${
                      prod.activo == 1
                        ? ` <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#78A75A"><path d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70h400q100 0 170 70t70 170q0 100-70 170t-170 70H280Zm0-80h400q66 0 113-47t47-113q0-66-47-113t-113-47H280q-66 0-113 47t-47 113q0 66 47 113t113 47Zm400-40q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM480-480Z"/></svg>`
                        : `<svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#EA3323"><path d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70h400q100 0 170 70t70 170q0 100-70 170t-170 70H280Zm0-80h400q66 0 113-47t47-113q0-66-47-113t-113-47H280q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-40q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm200-120Z"/></svg>`
                    }
                    </button>
                </div>`;

        body.append(title, text);
        card.append(img, body);
        col.append(card);
        row.append(col);
      });

      container.append(row);
    } else {
      const tableWrapper = document.createElement("div");
      tableWrapper.classList.add("table-responsive");

      const table = document.createElement("table");
      table.classList.add(
        "tabla-dashboard",
        "table",
        "table-striped",
        "table-hover",
        "table-bordered",
        "align-middle",
        "text-center"
      );

      table.innerHTML = `
                <thead class="table-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Talle</th>
                        <th>Color</th>
                        <th>Imagen</th>
                        <th>Precio</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody></tbody>
            `;

      const tbody = table.querySelector("tbody");

      productos.forEach((prod) => {
        const row = document.createElement("tr");

        row.innerHTML = `
                    <td>${prod.nombre}</td>
                    <td>${prod.tipo}</td>
                    <td>${prod.talle}</td>
                    <td>${prod.color}</td>
                    <td><img src="${v.buscarUrlImagen(prod.img)}" alt="${
          prod.nombre
        }" style="max-width: 100px;"></td>
                    <td>$${prod.precio}</td>
                    <td>${prod.activo}</td>
                    <td>
                        <button class="btn-modificar" data-id="${
                          prod.idProducto
                        }">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F19E39"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>                </button>
                <button class="btn-estado" data-id="${
                  prod.idProducto
                }" data-activo="${prod.activo}">
                ${
                  prod.activo == 1 //Si no gusta, cambiar los svg por texto
                    ? `<svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#78A75A"><path d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70h400q100 0 170 70t70 170q0 100-70 170t-170 70H280Zm0-80h400q66 0 113-47t47-113q0-66-47-113t-113-47H280q-66 0-113 47t-47 113q0 66 47 113t113 47Zm400-40q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM480-480Z"/></svg>`
                    : `<svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#EA3323"><path d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70h400q100 0 170 70t70 170q0 100-70 170t-170 70H280Zm0-80h400q66 0 113-47t47-113q0-66-47-113t-113-47H280q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-40q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm200-120Z"/></svg>`
                }
                </button>
                    </td>
                `;

        tbody.appendChild(row);
      });

      tableWrapper.appendChild(table);
      container.appendChild(tableWrapper);
      renderPaginacion(paginaActual, totalPaginas);
    }

    main.appendChild(container);
    renderPaginacion(paginaActual, totalPaginas);

    // Eventos para botones eliminar
    document.querySelectorAll(".btn-estado").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        const activoActual = btn.dataset.activo === "1";
        const nuevoEstado = !activoActual;

        const url = `http://localhost:3000/api/productos/${id}/estado`;
        const optionsPATCH = {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ activo: nuevoEstado }),
        };

        if (
          confirm(
            `¿Estás seguro de que deseas ${
              nuevoEstado ? "activar" : "desactivar"
            } este producto?`
          )
        ) {
          try {
            const res = await fetch(url, optionsPATCH);

            if (res.ok) {
              btn.dataset.activo = nuevoEstado ? "1" : "0";
              btn.innerHTML = nuevoEstado
                ? `<svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#78A75A"><path d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70h400q100 0 170 70t70 170q0 100-70 170t-170 70H280Zm0-80h400q66 0 113-47t47-113q0-66-47-113t-113-47H280q-66 0-113 47t-47 113q0 66 47 113t113 47Zm400-40q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM480-480Z"/></svg>`
                : `<svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#EA3323"><path d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70h400q100 0 170 70t70 170q0 100-70 170t-170 70H280Zm0-80h400q66 0 113-47t47-113q0-66-47-113t-113-47H280q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-40q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm200-120Z"/></svg>`;
            } else {
              alert("Error al cambiar el estado del producto");
            }
          } catch (error) {
            alert("Error de red o servidor");
            console.error(error);
          }
        }
        location.reload();
      });
    });

    // Eventos para botones modificar (ajusta la ruta si hace falta)
    document.querySelectorAll(".btn-modificar").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        window.location.href = `http://localhost:3000/modificacion/${id}`;
      });
    });
  }

  async function cargarProductos(pagina = 1) {
    paginaActual = pagina;
    const response = await fetch(
      `http://localhost:3000/api/productos?pagina=${pagina}&limite=4`
    );
    const data = await response.json();
    productosGlobal = data.productos;
    totalPaginasGlobal = data.totalPaginas;

    renderProductos(productosGlobal, totalPaginasGlobal);
  }

  function renderPaginacion(paginaActual, totalPaginas) {
    const pagContainer =
      document.getElementById("paginacion") || document.createElement("div");
    pagContainer.id = "paginacion";
    pagContainer.classList.add(
      "d-flex",
      "justify-content-center",
      "mt-3",
      "gap-2"
    );

    pagContainer.innerHTML = "";

    // Botón anterior
    if (paginaActual > 1) {
      const btnPrev = document.createElement("button");
      btnPrev.textContent = "Anterior";
      btnPrev.classList.add("btn", "btn-outline-primary");
      btnPrev.onclick = () => {
        cargarProductos(paginaActual - 1);
      };
      pagContainer.appendChild(btnPrev);
    }

    // Botones numéricos
    for (let i = 1; i <= totalPaginas; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.classList.add(
        "btn",
        i === paginaActual ? "btn-primary" : "btn-outline-primary"
      );
      btn.onclick = () => {
        cargarProductos(i);
      };
      pagContainer.appendChild(btn);
    }

    // Botón siguiente
    if (paginaActual < totalPaginas) {
      const btnNext = document.createElement("button");
      btnNext.textContent = "Siguiente";
      btnNext.classList.add("btn", "btn-outline-primary");
      btnNext.onclick = () => {
        cargarProductos(paginaActual + 1);
      };
      pagContainer.appendChild(btnNext);
    }

    document.getElementById("main").appendChild(pagContainer);
  }

  await cargarProductos(); // arranca desde la página 1

  let anchoAnterior = window.innerWidth;

  window.addEventListener("resize", () => {
    const anchoActual = window.innerWidth;
    const antesEraChico = anchoAnterior < 768;
    const ahoraEsChico = anchoActual < 768;

    if (antesEraChico !== ahoraEsChico) {
      renderProductos(productosGlobal, totalPaginasGlobal);
    }

    anchoAnterior = anchoActual;
  });
});
