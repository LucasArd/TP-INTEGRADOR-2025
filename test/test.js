import readline from "readline";
import { spawn } from "child_process"; //Esto sirve para que tire el comando node (path) automaticamente
import { AppEjs, AppEstatico } from '../paths/rutasApi.js';

//Aca crea la interfaz y le dice que puede leer y mostrar el texto
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log("Seleccione una opción:\n1) Iniciar Cliente\n2) Iniciar Admin");


rl.question("Ingrese el número de la opción: ", (answer) => {
    let scriptPath;

    switch (answer.trim()) {
        case "1":
            scriptPath = AppEstatico;
            break;
        case "2":
            scriptPath = AppEjs;
            break;
        default:
            console.log("Opción inválida. Saliendo...");
            rl.close();
            process.exit(1);
    }

    console.log(`Iniciando ${answer === "1" ? "Cliente" : "Admin"}...`);

    //mando el comando a la consola
    const subprocess = spawn("node", [scriptPath], { stdio: "inherit" });

    //en el caso de que el switch caiga en el default, cierra el subproceso y no tira el comando
    subprocess.on("close", (code) => {
        console.log(`Proceso finalizado con código ${code}`);
        rl.close();
    });
});
