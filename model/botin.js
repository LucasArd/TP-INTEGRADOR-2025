import { Calzado } from './calzado.js';

export class Botin extends Calzado {
    spikeLength;

    constructor(id, name, type, color, sizes, image, url, spikeLength = null) {
        super(id, name, type, color, sizes, image, url);

        if (type.toLowerCase() === 'cesped') {
            this.spikeLength = spikeLength; // pued ser TALL o SMALL
        }
    }

    createHtmlElement() {
        const div = super.createHtmlElement();

        
        if (this.spikeLength) {
            const pSpike = document.createElement("p");
            pSpike.textContent = `Largo de tapones: ${this.spikeLength}`;

            div.insertBefore(pSpike, div.lastChild); // lo inserta antes de la URL de l imagne
        }

        return div;
    }
}

// const botin1 = new Botin(1, "Botín Pro", "cesped", "Rojo", [39, 40, 41], "img/botin.png", "ejemplo.com", "tall");