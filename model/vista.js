export class Vista {    
    pagBienvenida;
    pagProductos;
    pagZapatillas;
    pagBotines;
    pagCarrito;
    header;
    static instancia = null;
    constructor() {
        if (Vista.instancia) {
            return Vista.instancia;
        }

        console.log("Init constructor");
        this.pagBienvenida = {
            frmBienvenida: this.$('frmBienvenida'),
            txtUsuario: this.$('basic-url'),
            btnContinuar: this.$('btn-continuar'),
            imgLogoCircular: this.$('img-circular'),
            btnAdmin: this.$('btnAdmin')
        },
        this.pagProductos = {
            divCalzados: this.$('divCalzados')
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
        this.header = {
            imgLogoNav: this.$("contenedor-logo-img-nav"),
            botonTheme: this.$("boton-theme"),
            btnNavDesplegable: this.$("btnNavDesplegable"),
            navMenu: this.$("navMenu")
        }
        this.initTheme();
        this.setearLogo();
        
        if (this.header.btnNavDesplegable) {
            this.abrirNavegacionResp();
        }

        Vista.instancia = this;
    }

    $(x) {
        return document.getElementById(x);
    }

    initTheme() {
        const body = document.body;
        const temas = ['modoClaro', 'modoOscuro', 'modoJPI'];
        let temaActual = localStorage.getItem('theme') || 'modoJPI';

        body.classList.add(temaActual);

        if (this.header.botonTheme) {
            this.header.botonTheme.addEventListener('click', () => {
                body.classList.remove(temaActual);
                let nextIndex = (temas.indexOf(temaActual) + 1) % temas.length;
                temaActual = temas[nextIndex];
                body.classList.add(temaActual);
                localStorage.setItem('theme', temaActual);
                this.setearLogo();
            });
        }
    }

    setearLogo() {
        const temaActual = localStorage.getItem('theme') || 'modoJPI';
        
        let logoSrc = './resources/img/imagen_logo_circular.png';
        switch (temaActual) {
            case 'modoClaro':
                logoSrc = './resources/img/imagen_logo_sinfondo.webp';
                break;
            case 'modoOscuro':
                logoSrc = './resources/img/logo_tema_oscuro.png';
                break;
            case 'modoJPI':
                logoSrc = './resources/img/imagen_logo_circular.webp';
                break;
        }

        if (this.pagBienvenida.imgLogoCircular) {
            this.pagBienvenida.imgLogoCircular.src = logoSrc;
        }

        if (this.header.imgLogoNav) {
            this.header.imgLogoNav.src = logoSrc;
        }
    }

    abrirNavegacionResp() {
        this.header.btnNavDesplegable.addEventListener("click", (e) => {
            const yaVisible = this.header.navMenu.classList.contains('nav-menu-visible');

            if (yaVisible) {
                console.log("Ocultando menú");
            } else {
                console.log("Mostrando menú");
            }

            this.header.navMenu.classList.toggle('nav-menu-visible');
        });

        console.log("Init navegación");
    }

}