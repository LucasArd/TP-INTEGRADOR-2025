import {Calzado} from "./calzado.js";

export class Botin extends Calzado {
    bootType;
    spikeLength;

    constructor(id, name, type, color, sizes, image, url, price, bootType, spikeLength = null) {
        super(id, name, type, color, sizes, image, url, price);
        this.bootType = bootType;
        if (bootType.toLowerCase() === 'cesped') {
            this.spikeLength = spikeLength;
        }
    }

    createHtmlElement() {
        const div = super.createHtmlElement();
        
        const pbootType = document.createElement("p");
        pbootType.textContent = `Tipo de botin: ${this.bootType}`;

        div.insertBefore(pbootType, div.lastChild);
        if (this.spikeLength) {
            const pSpike = document.createElement("p");
            pSpike.textContent = `Largo de tapones: ${this.spikeLength}`;

            div.insertBefore(pSpike, div.lastChild);
        }

        return div;
    }
}