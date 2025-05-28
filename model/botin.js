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

        const ul = div.querySelector("ul.list-group");
        if (ul) {
            const liBoot = document.createElement("li");
            liBoot.classList.add("list-group-item");
            liBoot.textContent = `Tipo de botin: ${this.bootType}`;
            ul.appendChild(liBoot);

            if (this.spikeLength) {
                const liSpike = document.createElement("li");
                liSpike.classList.add("list-group-item");
                liSpike.textContent = `Largo de tapones: ${this.spikeLength}`;
                ul.appendChild(liSpike);
            }
        }

        return div;
    }

}