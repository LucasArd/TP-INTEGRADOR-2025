import { Vista } from "../model/vista.js";

const v = Vista.getInstance();
v.init();

(async () => {
  try {
    const res = await fetch("/api/ventas");
    const ventas = await res.json();

    const tbody = document.querySelector("#ventas-body");
    if (!tbody) return;

    tbody.innerHTML = ventas
      .map((venta) => {
        const fechaFormateada = new Date(venta.fecha).toLocaleString();
        const precioUnitario = Number(venta.precio).toFixed(2);
        const subtotal = (venta.precio * venta.cantidad).toFixed(2);

        return `
        <tr>
          <td>${venta.idVenta}</td>
          <td>${venta.idTicket}</td>
          <td>${venta.comprador}</td>
          <td>${fechaFormateada}</td>
          <td>${venta.nombreProducto}</td>
          <td>${venta.cantidad}</td>
          <td>$${precioUnitario}</td>
          <td>$${subtotal}</td>
        </tr>
      `;
      })
      .join("");
  } catch (error) {
    console.error("Error cargando ventas:", error);
    const tbody = document.querySelector("#ventas-body");
    if (tbody) {
      tbody.innerHTML = `<tr><td colspan="8" class="text-center text-danger">Error cargando ventas</td></tr>`;
    }
  }
})();
