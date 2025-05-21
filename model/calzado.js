export class Calzado{
    id;
    name;
    type;
    color;
    sizes;
    image;
    url;
    constructor(id,name,type,color,sizes,image,url){
        this.id = id;
        this.name = name;
        this.type = type;
        this.color = color;
        this.sizes = sizes;
        this.image = image;
        this.url = url;
    }

    createHtmlElement() {
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.width = "18rem";

    // Imagen
    const img = document.createElement("img");
    img.src = this.image;
    img.classList.add("card-img-top");
    img.alt = this.name;
    card.appendChild(img);

    // Card body con título y descripción
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const h5 = document.createElement("h5");
    h5.classList.add("card-title");
    h5.textContent = this.name;

    const p = document.createElement("p");
    p.classList.add("card-text");
    p.textContent = `Tipo: ${this.type} - Color: ${this.color}`;

    cardBody.appendChild(h5);
    cardBody.appendChild(p);
    card.appendChild(cardBody);

    // Lista de detalles
    const ul = document.createElement("ul");
    ul.classList.add("list-group", "list-group-flush");

    const liType = document.createElement("li");
    liType.classList.add("list-group-item");
    liType.textContent = `Tipo: ${this.type}`;

    const liColor = document.createElement("li");
    liColor.classList.add("list-group-item");
    liColor.textContent = `Color: ${this.color}`;

    const liSizes = document.createElement("li");
    liSizes.classList.add("list-group-item");
    liSizes.textContent = `Talles: ${this.sizes.join(', ')}`;

    ul.appendChild(liType);
    ul.appendChild(liColor);
    ul.appendChild(liSizes);
    card.appendChild(ul);

    // Card body con enlaces
    const cardBodyLinks = document.createElement("div");
    cardBodyLinks.classList.add("card-body");

    const link = document.createElement("a");
    link.href = this.url;
    link.classList.add("card-link");
    link.target = "_blank";
    link.textContent = "Ver producto";

    cardBodyLinks.appendChild(link);
    card.appendChild(cardBodyLinks);

    return card;
}
}