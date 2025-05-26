import {Calzado} from "./calzado.js";

export class Botin extends Calzado {
    spikeLength;

    constructor(id, name, type, color, sizes, image, url, price, spikeLength = null) {
        super(id, name, type, color, sizes, image, url, price);

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