export class Vista {
    pagBienvenida;
    pagProductos;
    pagZapatillas;
    pagBotines;
    pagCarrito;
    constructor() {
        this.pagBienvenida = {
            frmBienvenida: this.$('frmBienvenida'),
            txtUsuario: this.$('basic-url'),
            btnContinuar: this.$('btn-continuar')
        },
        this.pagProductos = {

        },
        this.pagZapatillas = {
            divZapatillas: this.$("zapatillas")
        }
        this.pagBotines = {
            divBotines: this.$("botines")
        }
        this.pagCarrito ={
            divCarrito: this.$("carrito")
        }

        this.botonTheme = this.$("boton-theme");
        this.initTheme();
    }

    $(x) {
        return document.getElementById(x);
    }

    initTheme() {
        const body = document.body;
        const temas = ['modoClaro', 'modoOscuro', 'modoJPI'];
        let temaActual = localStorage.getItem('theme') || 'modoClaro';

        body.classList.add(temaActual);

        if (this.botonTheme) {
            this.botonTheme.addEventListener('click', () => {
                body.classList.remove(temaActual);
                let nextIndex = (temas.indexOf(temaActual) + 1) % temas.length;
                temaActual = temas[nextIndex];
                body.classList.add(temaActual);
                localStorage.setItem('theme', temaActual);
            });
        }
    }

    setearLogo(){
        
    }
}