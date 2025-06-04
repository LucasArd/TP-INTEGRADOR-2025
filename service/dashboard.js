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
                <button class="btn-estado" data-id="${prod.idProducto}" data-activo="${prod.activo}">
                ${prod.activo == 1 ? 'Desactivar' : 'Activar'}
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
            window.location.href = `http://localhost:3000/modificacion?id=${id}`;
        });
    });
});