import {Zapatilla} from "../model/zapatilla.js";
import {Botin} from "../model/botin.js";

function $(x) {
    return document.getElementById(x);
}

const jsonCalzados = '[{"id":1,"name":"Nike Air Max 90","type":"Zapatilla","color":"Blanco/Rojo","sizes":[38,40,42,44],"image":"./resources/img/calzado-running-1.webp","url":"https://nike.com/airmax90","price":120.99,"sneakerType":"Air Max"},{"id":2,"name":"Nike Air Force 1","type":"Zapatilla","color":"Negro","sizes":[39,41,43],"image":"./resources/img/calzado-running-1.webp","url":"https://nike.com/airforce1","price":110.5,"sneakerType":"Air Force"},{"id":3,"name":"Nike Jordan Retro","type":"Zapatilla","color":"Rojo/Negro","sizes":[40,42,44,45],"image":"./resources/img/calzado-running-1.webp","url":"https://nike.com/jordanretro","price":150,"sneakerType":"Jordan"},{"id":4,"name":"Adidas Predator","type":"Botin","color":"Negro/Blanco","sizes":[40,41,42],"image":"./resources/img/calzado-running-1.webp","url":"https://adidas.com/predator","price":130.99,"bootType":"Cesped","spikeLength":12},{"id":5,"name":"Puma Future","type":"Botin","color":"Amarillo","sizes":[39,40,41,43],"image":"./resources/img/calzado-running-1.webp","url":"https://puma.com/future","price":125,"bootType":"Piso"},{"id":6,"name":"Nike Tiempo","type":"Botin","color":"Blanco/Azul","sizes":[40,42,44],"image":"./resources/img/calzado-running-1.webp","url":"https://nike.com/tiempo","price":140,"bootType":"Cesped","spikeLength":10}]';


let vector = JSON.parse(jsonCalzados)

let c = vector.map((calzado) =>{
    if (calzado.sneakerType) {
        return new Zapatilla(calzado.id,calzado.name,calzado.type,calzado.color,calzado.sizes,calzado.image,calzado.url,calzado.price,calzado.sneakerType);
    } else {
        return new Botin(calzado.id,calzado.name,calzado.type,calzado.color,calzado.sizes,calzado.image,calzado.url,calzado.price,calzado.bootType,calzado.spikeLength);
    }
});

console.log(c);

const divZapatillas = $("zapatillas");
c.forEach(calzado => {
    divZapatillas.appendChild(calzado.createHtmlElement());
});
