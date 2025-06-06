
document.querySelector('.form-bienvenida').addEventListener('submit', function (e) {
    const nombre = document.getElementById('basic-url').value;
    if (nombre.trim() !== "") {
      localStorage.setItem('nombreCliente', nombre);
    }
  });
  