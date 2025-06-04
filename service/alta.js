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