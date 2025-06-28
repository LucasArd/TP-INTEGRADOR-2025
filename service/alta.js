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

  // ✅ VALIDAR talle antes de usarlo
  const talleInput = form.querySelector('[name="talle"]');
  let tallesLimpios;
  try {
    tallesLimpios = validarTalle(talleInput.value); // te devuelve [31, 32, 33]
  } catch (err) {
    alert(err.message);
    return;
  }
  formData.set('talle', tallesLimpios.join(',')); // asegurás que se mande bien

  const data = Object.fromEntries(formData.entries());

  const esColorValido = validarString(data.color);
  const esPrecioValido = validarPrecio(data.precio);
  let esTipoValido = true;
  if (data.tipo === "Zapatilla") {
    esTipoValido = validarString(data.tipoZapatilla); // asi no queda guardado si cambiamos a botin
  }

  if (data.tipo === "Botin") {
  try {
    validarTamanioTapones(data.tamañoTapones);
  } catch (err) {
    alert(err.message);
    return;
  }
}

  if (!esColorValido) {
    alert("El color no puede ser un numero y debe tener al menos 3 caracteres.");
    return;
  }

  if (!esPrecioValido) {
    alert("El precio debe ser un número mayor a 0.");
    return;
  }
  if (!esTipoValido) {
    alert("El tipo de zapatilla es obligatorio y no puede ser numerico");
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