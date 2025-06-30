import { Calzado } from "./calzado.js";

export class Zapatilla extends Calzado {
  sneakerType;

  constructor(
    id,
    name,
    type,
    color,
    sizes,
    image,
    url,
    price,
    sneakerType = null
  ) {
    super(id, name, type, color, sizes, image, url, price);
    this.sneakerType = sneakerType;
  }

  createHtmlElement() {
    const div = super.createHtmlElement();

    const liExtra = document.createElement("li");
    liExtra.classList.add("list-group-item");
    liExtra.textContent = `Tipo de zapatilla: ${this.sneakerType}`;

    const ul = div.querySelector("ul.list-group");
    if (ul) {
      ul.appendChild(liExtra);
    }

    return div;
  }
}
