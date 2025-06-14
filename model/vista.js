export class Vista {
    static instancia = null;
    pagBienvenida = null;
    pagProductos = null;
    pagZapatillas = null;
    pagBotines = null;
    pagCarrito = null;
    pagLogin = null;
    pagAlta = null;
    header = null;

    constructor() {
        if (Vista.instancia) {
            return Vista.instancia;
        }
        console.log("Init constructor");
        Vista.instancia = this;
    }

    static getInstance() {
        if (!Vista.instancia) {
            Vista.instancia = new Vista();
        }
        return Vista.instancia;
    }

    init() {
        this.initPagBienvenida();
        this.initPagProductos();
        this.initPagZapatillas();
        this.initPagBotines();
        this.initPagCarrito();
        this.initPagAlta();
        this.initPagLogin();

        this.initHeader();

        this.initTheme();
        this.setearLogo();

        if (this.header?.btnNavDesplegable) {
            this.abrirNavegacionResp();
        }
    }

    initPagBienvenida() {
        const frm = this.$('frmBienvenida')
        if (!frm) return;
        this.pagBienvenida = {
            frmBienvenida: frm,
            txtUsuario: this.$('basic-url'),
            btnContinuar: this.$('btn-continuar'),
            imgLogoCircular: this.$('img-circular'),
            btnAdmin: this.$('btnAdmin')
        };
    }

    initPagProductos() {
        const divCalzados = this.$('divCalzados');
        if (divCalzados) {
            this.pagProductos = { divCalzados };
        }
    }

    initPagZapatillas() {
        const divZapatillas = this.$('zapatillas');
        if (divZapatillas) {
            this.pagZapatillas = { divZapatillas };
        }
    }

    initPagBotines() {
        const divBotines = this.$('botines');
        if (divBotines) {
            this.pagBotines = { divBotines };
        }
    }

    initPagCarrito() {
        const divCarrito = this.$('carrito');
        if (divCarrito) {
            this.pagCarrito = { divCarrito };
        }
    }

    initPagAlta() {
        const tipoSelect = this.$('selType');
        if (tipoSelect) {
            this.pagAlta = { tipoSelect };
        }
    }

    initPagLogin(){
        const btn = this.$('btnLogin');
        if (!btn) return;
        this.pagLogin = {
            frmLogin: this.$('frmLogin'),
            btnLogin: btn,
            txtEmail: this.$('txtEmail'),
            txtPass: this.$('txtPass'),
            btnPassOn: this.$('btnPassOn'),
            btnPassOff: this.$('btnPassOff'),
            aAccesoRapido: this.$('aAccesoRapido')
        };
        console.log("AAAAAAAA")
    }

    initHeader() {
        this.header = {
            imgLogoNav: this.$('contenedor-logo-img-nav'),
            botonTheme: this.$('boton-theme'),
            btnNavDesplegable: this.$('btnNavDesplegable'),
            navMenu: this.$('navMenu')
        };
    }


    $(x) {
        return document.getElementById(x);
    }

    toggleCampos() {
        if (!this.pagAlta?.tipoSelect) return;

        const tipo = this.pagAlta?.tipoSelect.value;
        const camposBotin = ["selBotinType", "txtSpike"];
        const camposZapatilla = ["txtSneakerType"];

        camposBotin.forEach(id => {
            this.$(id).closest(".mb-3").style.display = tipo === "Botin" ? "block" : "none";
        });

        camposZapatilla.forEach(id => {
            this.$(id).closest(".mb-3").style.display = tipo === "Zapatilla" ? "block" : "none";
        });
    }

    initTheme() {
        const body = document.body;
        const temas = ['modoClaro', 'modoOscuro', 'modoJPI'];
        let temaActual = localStorage.getItem('theme') || 'modoJPI';

        body.classList.add(temaActual);

        if (this.header?.botonTheme) {
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

        if (this.pagBienvenida?.imgLogoCircular) {
            this.pagBienvenida.imgLogoCircular.src = logoSrc;
        }

        if (this.header?.imgLogoNav) {
            this.header.imgLogoNav.src = logoSrc;
        }
    }

    abrirNavegacionResp() {
        if (!this.header?.btnNavDesplegable || !this.header?.navMenu) return;

        if (this.header.btnNavDesplegable.dataset.listenerAgregado === "true") {
            return;
        }

        this.header.btnNavDesplegable.addEventListener("click", (e) => {
            const yaVisible = this.header.navMenu.classList.contains('nav-menu-visible');

            if (yaVisible) {
                console.log("Ocultando menú");
            } else {
                console.log("Mostrando menú");
            }

            this.header.navMenu.classList.toggle('nav-menu-visible');
        });

        this.header.btnNavDesplegable.dataset.listenerAgregado = "true";
        console.log("Init navegación");
    }

}