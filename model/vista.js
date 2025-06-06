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
    }

    $(x) {
        return document.getElementById(x);
    }
}