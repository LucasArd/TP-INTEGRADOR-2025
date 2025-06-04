import { conectarBase } from "../controllers/controllersApi/AppBDD";
const db = conectarBase();
window.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('http://localhost:3000/api/productos');
    const productos = await response.json();

    const main = document.querySelector('main');

    main.innerHTML = '';

    const container = document.createElement('div');
    container.classList.add('container-fluid', 'mt-4');

    const table = document.createElement('table');
    table.classList.add('table', 'table-striped', 'table-hover', 'table-bordered', 'align-middle', 'text-center');

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
                <button class="btn-modificar" data-id="${prod.idProducto}">Modificar</button>
                <button class="btn-eliminar" data-id="${prod.idProducto}">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    
    container.appendChild(table);
    main.appendChild(container);

    // Eventos para botones eliminar
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.dataset.id;
            console.log(id)
            if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
                // TIENE QUE DESACTIVAR EL PRODUCTO, NO ELIMINARLO

                const res = await fetch(`http://localhost:3000/api/productos/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    btn.closest('tr').remove();
                } else {
                    alert('No se pudo eliminar el producto');
                }
            }
        });
    });

    // Eventos para botones modificar (ajusta la ruta si hace falta)
    document.querySelectorAll('.btn-modificar').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            window.location.href = `http://localhost:3000/modificacion?id=${id}`;
        });
    });
});