import { Calzado } from './calzado.js';

export class Zapatilla extends Calzado {
    design;

    constructor(id, name, type = "street", color, sizes, image, url, design = "") {
        super(id, name, type, color, sizes, image, url);
        this.design = design;
    }

    createHtmlElement() {
        const div = super.createHtmlElement();

        const pDesign = document.createElement("p");
        pDesign.textContent = `Diseño: ${this.design}`;
        
        // Insertamos el diseño antes del enlace con la imagen
        div.insertBefore(pDesign, div.lastChild);

        return div;
    }
}