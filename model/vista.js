export class Vista {
    pagBienvenida;
    pagProductos;
    pagZapatillas;
    pagBotines;
    constructor() {
        this.pagBienvenida = {
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
    }

    $(x) {
        return document.getElementById(x);
    }
}