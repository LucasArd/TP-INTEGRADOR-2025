import {Calzado} from "./calzado.js";

export class Zapatilla extends Calzado {
    sneakerType;

    constructor(id, name, type, color, sizes, image, url, price, sneakerType = "") {
        super(id, name, type, color, sizes, image, url, price);
        this.sneakerType = sneakerType;
    }

    createHtmlElement() {
        const div = super.createHtmlElement();

        const pDesign = document.createElement("p");
        pDesign.textContent = `Tipo de zapatilla: ${this.sneakerType}`;
        
        div.insertBefore(pDesign, div.lastChild);

        return div;
    }
}