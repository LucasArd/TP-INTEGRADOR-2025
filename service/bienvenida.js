import { Vista } from "../model/vista.js";
import { validarNombreUsuario } from "./cargaInicial.js";

const v = new Vista();
v.init();

v.pagBienvenida.frmBienvenida.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = v.pagBienvenida.txtUsuario.value;
  const validacion = validarNombreUsuario(nombre);

  if (!validacion.valido) {
    window.alert(validacion.mensaje);
    v.pagBienvenida.txtUsuario.focus();
    return;
  }

  localStorage.setItem("nombreCliente", validacion.nombre);
  window.location.href = "productos.html";
});

v.pagBienvenida.btnAdmin.addEventListener("click", async (e) => {
  e.preventDefault();
  window.location.href = '/'
});
