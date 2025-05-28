export class Calzado{
    id;
    name;
    type;
    color;
    sizes;
    image;
    url;
    price;
    constructor(id,name,type,color,sizes,image,url,price){
        this.id = id;
        this.name = name;
        this.type = type;
        this.color = color;
        this.sizes = sizes;
        this.image = image;
        this.url = url;
        this.price = price;
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

    const aCart = document.createElement("a");
    
    //logo de añadir al carrito
    aCart.classList.add("card-a-cart");
    //Le falta el href, se tendria que hacer en un carrito.js y darle toda la funcionalidad 
    const imgCart = document.createElement("img");
    imgCart.src = "../resources/img/logo_add_cart.png";
    imgCart.alt = "logo_añadir_al_carrito";
    imgCart.classList.add("card-img-cart");
    aCart.textContent = "Comprar";
    aCart.appendChild(imgCart);
    card.appendChild(aCart);

    // Card body con título y descripción
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const h4 = document.createElement("h4");
    h4.classList.add("card-title");
    h4.textContent = this.name;

    const p = document.createElement("p");
    p.classList.add("card-text");
    p.textContent = `Precio: $${this.price}`;

    cardBody.appendChild(h4);
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