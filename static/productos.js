import {Zapatilla} from "../model/zapatilla.js";
import {Botin} from "../model/botin.js";

function $(x) {
    return document.getElementById(x);
}

const jsonCalzados = '[{"id": 1,"name": "Zapatilla Running X","type": "Running","color": "Azul","sizes": [40, 41, 42],"image": "https://example.com/images/zapatilla1.jpg","url": "https://example.com/zapatilla1","design": "moderno"},{"id": 2,"name": "Zapatilla Urbana Vibe","type": "Urbana","color": "Negro","sizes": [41, 42, 43],"image": "https://example.com/images/zapatilla2.jpg","url": "https://example.com/zapatilla2","design": "urbano"},{"id": 3,"name": "Zapatilla Retro Classic","type": "Escalar","color": "Blanco","sizes": [38, 39, 40],"image": "https://example.com/images/zapatilla3.jpg","url": "https://example.com/zapatilla3","design": "retro"},{"id": 4,"name": "Botin Fútbol Pro","type": "type","color": "Rojo","sizes": [39, 40, 41],"image": "https://example.com/images/botin1.jpg","url": "https://example.com/botin1","spikeLength": "12mm"},{"id": 5,"name": "Botin Césped Artificial","type": "cesped","color": "Verde","sizes": [40, 41, 42],"image": "https://example.com/images/botin2.jpg","url": "https://example.com/botin2","spikeLength": "8mm"},{"id": 6,"name": "Botin de Competición","type": "piso","color": "Negro y Dorado","sizes": [42, 43, 44],"image": "https://example.com/images/botin3.jpg","url": "https://example.com/botin3","spikeLength": "10mm"}]'
let vector = JSON.parse(jsonCalzados)

let c = vector.map((calzado) =>{
    if (calzado.design) {
        return new Zapatilla(calzado.id,calzado.name,calzado.type,calzado.color,calzado.sizes,calzado.image,calzado.url,calzado.design);
    } else {
        return new Botin(calzado.id,calzado.name,calzado.type,calzado.color,calzado.sizes,calzado.image,calzado.url,calzado.spikeLength);
    }
});

console.log(c);

const divZapatillas = $("zapatillas");
c.forEach(calzado => {
    divZapatillas.appendChild(calzado.createHtmlElement());
});
