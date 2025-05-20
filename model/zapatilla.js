export class zapatilla{
    id;
    name;
    type;
    color;
    design;
    sizes = [
        sizeUS,
        sizeEU,
        sizeUK,
    ]
    image;
    url;
    constructor(id,name,type,color,design,sizes,image,url){
        this.id = id;
        this.name = name;
        this.type = type;
        this.color = color;
        this.design = design;
        this.sizes = sizes;
        this.image = image;
        this.url = url;
    }

    createHtmlElement(){
        const div = document.createElement("div");
        div.classList.add("card", "h-100");
        const h2 = document.createElement("h2");
        h2.textContent = this.name;
        const pType = document.createElement("p");
        pType.textContent = `Tipo: ${this.type}`;
        const pColor = document.createElement("p");
        pColor.textContent = `Color: ${this.color}`;
        const pDesign = document.createElement("p");
        pDesign.textContent = `Diseño: ${this.design}`;
        
        const pSizes = document.createElement("p");
        pSizes.textContent = `Talles: ${this.generes.join(', ')}`;

        const a = document.createElement('a');
        a.href = this.url;
        a.target = "_blank";

        const img = document.createElement('img');
        img.src = this.image;
        img.alt = this.name;
        img.width = 200;
        a.appendChild(img);

        div.appendChild(h2);
        div.appendChild(pType);
        div.appendChild(pColor);
        div.appendChild(pDesign);
        div.appendChild(pSizes);
        div.appendChild(a);
        return div;
    }
}