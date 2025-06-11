import { Vista } from "../model/vista.js";
const v = new Vista();
window.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('http://localhost:3000/api/productos');
    const productos = await response.json();

    const main = document.querySelector('main');

    main.innerHTML = '';

    const container = document.createElement('div');
    container.classList.add('container-fluid', 'mt-4');

    const table = document.createElement('table');
    table.classList.add('tabla-dashboard','table', 'table-striped', 'table-hover', 'table-bordered', 'align-middle', 'text-center');

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

    const tbody = table.querySelector('tbody');

    productos.forEach(prod => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><a href="${prod.url}" target="_blank">${prod.nombre}</a></td>
            <td>${prod.tipo}</td>
            <td>${prod.talle}</td>
            <td>${prod.color}</td>
            <td><img src="${prod.img}" alt="${prod.nombre}" style="width:60px; height:auto;"></td>
            <td>$${prod.precio.toLocaleString()}</td>
            <td>${prod.activo}</td>
            <td>
                <button class="btn-modificar" data-id="${prod.idProducto}">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F19E39"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>                </button>
                <button class="btn-estado" data-id="${prod.idProducto}" data-activo="${prod.activo}">
                ${prod.activo == 1 ? //Si no gusta, cambiar los svg por texto
                    `<svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#78A75A"><path d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70h400q100 0 170 70t70 170q0 100-70 170t-170 70H280Zm0-80h400q66 0 113-47t47-113q0-66-47-113t-113-47H280q-66 0-113 47t-47 113q0 66 47 113t113 47Zm400-40q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM480-480Z"/></svg>`
                    : 
                    `<svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#EA3323"><path d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70h400q100 0 170 70t70 170q0 100-70 170t-170 70H280Zm0-80h400q66 0 113-47t47-113q0-66-47-113t-113-47H280q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-40q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm200-120Z"/></svg>`}
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });


    container.appendChild(table);
    main.appendChild(container);

    // Eventos para botones eliminar
    document.querySelectorAll('.btn-estado').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.dataset.id;
            const activoActual = btn.dataset.activo === '1';
            const nuevoEstado = !activoActual;

            
            const url = `http://localhost:3000/api/productos/${id}/estado`;
            const optionsPATCH = {  
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ activo: nuevoEstado })
            };

            if (confirm(`¿Estás seguro de que deseas ${nuevoEstado ? 'activar' : 'desactivar'} este producto?`)) {
                try {
                    const res = await fetch(url, optionsPATCH);

                    if (res.ok) {
                        btn.textContent = nuevoEstado ? 'Desactivar' : 'Activar';
                        btn.dataset.activo = String(nuevoEstado);
                        location.reload();
                    } else {
                        alert('Error al cambiar el estado del producto');
                    }
                } catch (error) {
                    alert('Error de red o servidor');
                    console.error(error);
                }
            }
        });
    });

    // Eventos para botones modificar (ajusta la ruta si hace falta)
    document.querySelectorAll('.btn-modificar').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            window.location.href = `http://localhost:3000/modificacion/${id}`;
        });
    });
});