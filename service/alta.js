import { Vista } from "../model/vista.js";
import { validarString, validarPrecio, validarTalle, validarTamanioTapones } from "./validaciones.js";

const v = new Vista();
v.init();

document.addEventListener("DOMContentLoaded", () => {
  v.pagAlta.tipoSelect.addEventListener("change", () => {
    limpiarCamposTipo();
    v.toggleCampos();
  });
  v.toggleCampos(); // Ocultar al inicio
});

  document.getElementById('formAltaProducto').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const talleInput = form.querySelector('[name="talle"]');
    if (talleInput && talleInput.value) {
        const limpio = talleInput.value.split(',').map(t => t.trim()).filter(t => t !== '').join(',');
        formData.set('talle', limpio);
    }

    const esColorValido = validarString(data.color);
    const esTalleValido = validarTalle(data.talle);
    const esPrecioValido = validarPrecio(data.precio);
    let esTipoValido = true;
    if (data.tipo === "Zapatilla") {
      esTipoValido = validarString(data.tipoZapatilla); // asi no queda guardado si cambiamos a botin
    }

    let esTamanoValido = true;
    if (data.tipo === "Botin") {
      esTamanoValido = validarTamanioTapones(data.tamañoTapones);
    }

    if (!esColorValido) {
      alert("El color no puede ser un numero y debe tener al menos 3 caracteres.");
      return;
    }

    if (!esTalleValido) {
      alert("Todos los talles deben ser números válidos separados por coma.");
      return;
    }

    if (!esPrecioValido) {
      alert("El precio debe ser un número mayor a 0.");
      return;
    }
    if (!esTipoValido) {
      alert("El tipo de zapatilla no puede ser numerico");
      return;
    }

    if (!esTamanoValido) {
      alert("El tamaño de los tapones debe ser 'largo', 'mediano' o 'corto'.");
      return;
    }

    try {
      const response = await fetch('/alta', {
        method: 'POST',
        body: formData
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

function limpiarCamposTipo() {
  const tipoSeleccionado = v.pagAlta.tipoSelect.value;

  if (tipoSeleccionado === "Botin") {
    v.$("txtSneakerType").value = ""; // Limpia campo exclusivo de zapatillas
  }

  if (tipoSeleccionado === "Zapatilla") {
    v.$("selBotinType").value = "";   // Limpia campo exclusivo de botines
    v.$("txtSpike").value = "";
  }
}