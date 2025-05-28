import { Zapatilla } from "../model/zapatilla.js";
import { Botin } from "../model/botin.js";

function $(x) {
    return document.getElementById(x);
}

const jsonCalzados = `[
  {"id":1,"name":"Air Max 90","type":"Zapatilla","color":"Blanco/Rojo","sizes":[38,40,42,44],"image":"./resources/img/calzado-running-1.webp","url":"https://nike.com/airmax90","price":120.99,"sneakerType":"Air Max"},
  {"id":2,"name":"Air Force 1","type":"Zapatilla","color":"Negro","sizes":[39,41,43],"image":"./resources/img/calzado-running-1.webp","url":"https://nike.com/airforce1","price":110.5,"sneakerType":"Air Force"},
  {"id":3,"name":"Jordan Retro","type":"Zapatilla","color":"Rojo/Negro","sizes":[40,42,44,45],"image":"./resources/img/calzado-running-1.webp","url":"https://nike.com/jordanretro","price":150,"sneakerType":"Jordan"},
  {"id":7,"name":"Ultraboost","type":"Zapatilla","color":"Gris","sizes":[38,40,42],"image":"./resources/img/calzado-running-1.webp","url":"https://adidas.com/ultraboost","price":135.5,"sneakerType":"Ultraboost"},
  {"id":8,"name":"RS-X","type":"Zapatilla","color":"Blanco/Azul","sizes":[39,41,43],"image":"./resources/img/calzado-running-1.webp","url":"https://puma.com/rsx","price":105.99,"sneakerType":"RS-X"},
  {"id":9,"name":"Classic","type":"Zapatilla","color":"Negro","sizes":[40,42,44],"image":"./resources/img/calzado-running-1.webp","url":"https://reebok.com/classic","price":98.75,"sneakerType":"Classic"},
  {"id":10,"name":"574","type":"Zapatilla","color":"Azul","sizes":[38,40,42,44],"image":"./resources/img/calzado-running-1.webp","url":"https://newbalance.com/574","price":112.5,"sneakerType":"574"},
  {"id":11,"name":"Gel-Lyte III","type":"Zapatilla","color":"Verde/Gris","sizes":[40,42,43],"image":"./resources/img/calzado-running-1.webp","url":"https://asics.com/gellyte","price":125.0,"sneakerType":"Gel-Lyte"},

  {"id":4,"name":"Predator","type":"Botin","color":"Negro/Blanco","sizes":[40,41,42],"image":"./resources/img/calzado-running-1.webp","url":"https://adidas.com/predator","price":130.99,"bootType":"Cesped","spikeLength":12},
  {"id":5,"name":"Future","type":"Botin","color":"Amarillo","sizes":[39,40,41,43],"image":"./resources/img/calzado-running-1.webp","url":"https://puma.com/future","price":125,"bootType":"Piso"},
  {"id":6,"name":"Tiempo","type":"Botin","color":"Blanco/Azul","sizes":[40,42,44],"image":"./resources/img/calzado-running-1.webp","url":"https://nike.com/tiempo","price":140,"bootType":"Cesped","spikeLength":10},
  {"id":12,"name":"Morelia Neo","type":"Botin","color":"Rojo","sizes":[40,42,43],"image":"./resources/img/calzado-running-1.webp","url":"https://mizuno.com/morelia","price":145,"bootType":"Cesped","spikeLength":11},
  {"id":13,"name":"Speciali","type":"Botin","color":"Negro","sizes":[39,40,42],"image":"./resources/img/calzado-running-1.webp","url":"https://umbro.com/speciali","price":119.5,"bootType":"Piso"},
  {"id":14,"name":"Copa Mundial","type":"Botin","color":"Blanco","sizes":[40,41,43],"image":"./resources/img/calzado-running-1.webp","url":"https://adidas.com/copa","price":135,"bootType":"Cesped","spikeLength":12},
  {"id":15,"name":"Phantom GX","type":"Botin","color":"Gris/Verde","sizes":[39,41,44],"image":"./resources/img/calzado-running-1.webp","url":"https://nike.com/phantomgx","price":138,"bootType":"Cesped","spikeLength":11},
  {"id":16,"name":"Platinum","type":"Botin","color":"Negro/Dorado","sizes":[40,42,45],"image":"./resources/img/calzado-running-1.webp","url":"https://puma.com/kingplatinum","price":142,"bootType":"Piso"}
]`;


let vector = JSON.parse(jsonCalzados)
let zapatillas = new Array();
let botines = new Array();

let c = vector.map((calzado) => {
    if (calzado.sneakerType) {
        let z = new Zapatilla(calzado.id, calzado.name, calzado.type, calzado.color, calzado.sizes, calzado.image, calzado.url, calzado.price, calzado.sneakerType);
        zapatillas.push(z);
        return z;
    } else {
        let b = new Botin(calzado.id, calzado.name, calzado.type, calzado.color, calzado.sizes, calzado.image, calzado.url, calzado.price, calzado.bootType, calzado.spikeLength);
        botines.push(b);
        return b;
    }
});

console.log(c);

function cargarBotines() {
    const divBotines = $("botines");
    botines.forEach(x => {
        divBotines.appendChild(x.createHtmlElement());
    });
}

function cargarZapatillas() {
    const divZapatillas = $("zapatillas");
    zapatillas.forEach(x => {
        divZapatillas.appendChild(x.createHtmlElement());
    });
}

if ($("botines")) cargarBotines();
if ($("zapatillas")) cargarZapatillas();


