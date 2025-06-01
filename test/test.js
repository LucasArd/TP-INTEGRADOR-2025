import readline from "readline";
import { spawn } from "child_process";
import { AppEjs, AppEstatico, Api } from '../paths/rutasApi.js';
import { initDB } from "../controllers/controllersApi/AppBDD.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log("Seleccione una opción:\n1) Iniciar Cliente\n2) Iniciar Admin\n3) Iniciar Ambos");

rl.question("Ingrese el número de la opción: ", async (answer) => {
    const procesos = [];

    switch (answer.trim()) {
        case "1":
            procesos.push({ nombre: "Cliente", path: AppEstatico });
            break;
        case "2":
            procesos.push({ nombre: "Admin", path: AppEjs });
            break;
        case "3":
            procesos.push(
                { nombre: "Cliente", path: AppEstatico },
                { nombre: "Admin", path: AppEjs },
                { nombre: "Api", path: Api}
            );
            break;
        default: 
            console.log("Opción inválida. Saliendo...");
            rl.close();
            process.exit(1);
    }

    for (const proc of procesos) {
        console.log(`Iniciando ${proc.nombre}...`);
        const subprocess = spawn("node", [proc.path], { stdio: "inherit" });
        
        subprocess.on("close", (code) => {
            console.log(`Proceso "${proc.nombre}" finalizado con código ${code}`);
        });
    }
    initDB();

    rl.close();
});
