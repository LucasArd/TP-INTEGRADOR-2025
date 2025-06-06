import { Vista } from "../model/vista.js";
const v = new Vista();

v.pagBienvenida.frmBienvenida.addEventListener('submit', async(e) =>{
  e.preventDefault();
    const nombre = v.pagBienvenida.txtUsuario.value
    if (nombre.trim() !== "") {
      localStorage.setItem('nombreCliente', nombre);
      window.location.href = 'productos.html';
    }else{
      window.alert("Ingrese un nombre");
      v.pagBienvenida.txtUsuario.focus();
    }
});
  