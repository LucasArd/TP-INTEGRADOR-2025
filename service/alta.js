import { Vista } from "../model/vista.js";
import {
  validarString,
  validarPrecio,
  validarTalle,
  validarTamanioTapones,
} from "./validaciones.js";

const v = new Vista();
v.init();

document.addEventListener("DOMContentLoaded", () => {
  v.pagAlta.selType.addEventListener("change", () => {
    v.limpiarCamposTipo();
    v.toggleCampos();
  });

  v.pagAlta.selBotinType.addEventListener("change", () =>{
    console.log('Cambio')
    v.toggleCamposBotin();
  });
  v.toggleCampos();
  if (v.pagAlta.selType.value === "Botin") {
    v.toggleCamposBotin();
  }
});

v.pagAlta.frmAltaProducto.addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  const talleInput = form.querySelector('[name="talle"]');
  let tallesLimpios;
  try {
    tallesLimpios = validarTalle(talleInput.value);
  } catch (err) {
    alert(err.message);
    return;
  }
  formData.set("talle", tallesLimpios.join(","));

  const data = Object.fromEntries(formData.entries());

  if (data.tipo === "Botin" && data.tamanoTapones) {
    const valor = data.tamanoTapones.trim();
    const capitalizado = valor.charAt(0).toUpperCase() + valor.slice(1).toLowerCase();
    data.tamanoTapones = capitalizado;
    formData.set("tamanoTapones", capitalizado);
  }

  const esColorValido = validarString(data.color);
  const esPrecioValido = validarPrecio(data.precio);
  let esTipoValido = true;
  if (data.tipo === "Zapatilla") {
    esTipoValido = validarString(data.tipoZapatilla);
  }

  if (data.tipo === "Botin") {
    try {
      if (data.tipoBotin === "Cesped") {
        validarTamanioTapones(data.tamanoTapones);
      }
    } catch (err) {
      alert(err.message);
      return;
    }
  }

  if (!esColorValido) {
    alert(
      "El color no puede ser un numero y debe tener al menos 3 caracteres."
    );
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

  console.log(data)
  try {
    const response = await fetch("/alta", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const modal = new bootstrap.Modal(v.pagAlta.modalExito);
      modal.show();
      form.reset();
    } else {
      const modal = new bootstrap.Modal(v.pagAlta.modalError);
      modal.show();
    }
  } catch (err) {
    const modal = new bootstrap.Modal(v.pagAlta.modalError);
    modal.show();
  }
});