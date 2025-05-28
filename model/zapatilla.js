import {Calzado} from "./calzado.js";

export class Zapatilla extends Calzado {
    sneakerType;

    constructor(id, name, type, color, sizes, image, url, price, sneakerType = "") {
        super(id, name, type, color, sizes, image, url, price);
        this.sneakerType = sneakerType;
    }

    createHtmlElement() {
        const div = super.createHtmlElement();

        // Crear el <li> con el contenido adicional
        const liExtra = document.createElement("li");
        liExtra.classList.add("list-group-item");
        liExtra.textContent = `Tipo de zapatilla: ${this.sneakerType}`;

        // Buscar el <ul> ya creado por el super
        const ul = div.querySelector("ul.list-group");
        if (ul) {
            ul.appendChild(liExtra);  // Agregar como último <li>
        }

        return div;
    }

}