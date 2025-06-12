import { Vista } from "../model/vista.js";
const v = new Vista();
v.init();

document.addEventListener("DOMContentLoaded", () => {
    v.pagAlta.tipoSelect.addEventListener("change", () => v.toggleCampos());
    v.toggleCampos(); // Ocultar al inicio
});

  document.getElementById('formAltaProducto').addEventListener('submit', async function (e) {
    e.preventDefault(); // Evita el envío normal

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Si viene talle separado por comas, mandalo como string
    data.talle = data.talle || '';

    try {
      const response = await fetch('/alta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const modal = new bootstrap.Modal(document.getElementById('modalExito'));
        modal.show();
        form.reset();
      } else {
        const modal = new bootstrap.Modal(document.getElementById('modalError'));
        modal.show();
      }
    } catch (err) {
      const modal = new bootstrap.Modal(document.getElementById('modalError'));
      modal.show();
    }
  });