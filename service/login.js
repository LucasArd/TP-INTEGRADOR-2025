import { Vista } from "../model/vista.js";
const v = new Vista();
v.init();

v.pagLogin.aAccesoRapido.addEventListener("click", async(e) =>{
    //Ver esto
    e.preventDefault();
    v.pagLogin.txtEmail.value = 'admin@justpickit.com';
    v.pagLogin.txtPass.value = 'admin';
});

v.pagLogin.btnClient.addEventListener("click", async(e) =>{
    e.preventDefault()
    window.location.href = '/bienvenida.html'
});

v.pagLogin.frmLogin.addEventListener("submit", async(e) =>{
    e.preventDefault();

    const email = v.pagLogin.txtEmail.value;
    const pass = v.pagLogin.txtPass.value.trim();
    const url = '/api/login';
    const optionsPOST = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, pass }),
        credentials: 'include' //Esto es para que la cookie viaje
    }

    try {
        const response = await fetch(url, optionsPOST);
        
        if (response.ok) {
            window.location.href = "/dashboard"
        } else {
            const result = await response.json();
            alert(result.message || 'Credenciales incorrectas');
        }
    } catch (error) {
        console.error('Error en login:', error);
        alert('Error en el servidor. Intente más tarde.');
    }
});