import {Zapatilla} from "../model/zapatilla.js";
import {Botin} from "../model/botin.js";

function $(x) {
    return document.getElementById(x);
}

const jsonCalzados = '[{"id":1,"name":"AirZoom Alpha","type":"Running","color":"Red","sizes":[40,41,42],"image":"../resources/img/calzado-running-1.webp","url":"https://example.com/airzoom-alpha","price":120.0,"design":"Futuristic"},{"id":2,"name":"SprintForce X","type":"Cesped","color":"Black","sizes":[39,40,42],"image":"../resources/img/calzado-running-1.webp","url":"https://example.com/sprintforce-x","price":130.0,"spikeLength":6},{"id":3,"name":"Marathon Pro","type":"Long Distance","color":"Blue","sizes":[41,42,43],"image":"../resources/img/calzado-running-1.webp","url":"https://example.com/marathon-pro","price":140.0,"design":"Lightweight"},{"id":4,"name":"Flash Bolt","type":"Cesped","color":"Yellow","sizes":[40,41],"image":"../resources/img/calzado-running-1.webp","url":"https://example.com/flash-bolt","price":125.0,"spikeLength":7},{"id":5,"name":"TrailRunner Max","type":"Trail","color":"Green","sizes":[42,43,44],"image":"../resources/img/calzado-running-1.webp","url":"https://example.com/trailrunner-max","price":150.0,"design":"Rugged"},{"id":6,"name":"SpeedGrip Z","type":"Cesped","color":"White","sizes":[39,41,43],"image":"../resources/img/calzado-running-1.webp","url":"https://example.com/speedgrip-z","price":135.0,"spikeLength":5}]';


let vector = JSON.parse(jsonCalzados)

let c = vector.map((calzado) =>{
    if (calzado.design) {
        return new Zapatilla(calzado.id,calzado.name,calzado.type,calzado.color,calzado.sizes,calzado.image,calzado.url,calzado.price,calzado.design);
    } else {
        return new Botin(calzado.id,calzado.name,calzado.type,calzado.color,calzado.sizes,calzado.image,calzado.url,calzado.price,calzado.spikeLength);
    }
});

console.log(c);

const divZapatillas = $("zapatillas");
c.forEach(calzado => {
    divZapatillas.appendChild(calzado.createHtmlElement());
});
