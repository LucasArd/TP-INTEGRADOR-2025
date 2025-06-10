document.addEventListener("DOMContentLoaded", () => {
    const tipoSelect = document.getElementById("selType");
    const camposBotin = ["selBotinType", "txtSpike"];
    const camposZapatilla = ["txtSneakerType"];

    function toggleCampos() {
      const tipo = tipoSelect.value;

      camposBotin.forEach(id => {
        document.getElementById(id).closest(".mb-3").style.display = tipo === "Botin" ? "block" : "none";
      });

      camposZapatilla.forEach(id => {
        document.getElementById(id).closest(".mb-3").style.display = tipo === "Zapatilla" ? "block" : "none";
      });
    }

    tipoSelect.addEventListener("change", toggleCampos);
    toggleCampos(); // Ocultar al inicio
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