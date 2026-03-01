// Importar el módulo readline de Node.js
const readline = require('readline');

// Crear la interfaz de entrada/salida
const rl = readline.createInterface({
  input: process.stdin,  // Entrada estándar (teclado)
  output: process.stdout // Salida estándar (consola)
});
//VARIABLES Y ARRAYS REQUERIDOS
let cantidad_clientes = (answer) => parseInt(answer);
let datos_clientes = [];
let costo_cliente = [];
let datos_finales = [];
let i = 0;
let descuento = 0.30;// DESCUENTO DEL 30% PARA CLIENTES CON MAS DE 12 HORAS DE LAVADO
let precio_hora = 5000; // PRECIO POR HORA DE LAVADO


//SECUENCIA DE EJECUCION DEL PROGRAMA
rl.question('Ingrese la cantidad de clientes: ', (answer) => {
  cantidad_clientes = parseInt(answer);
  recolectarDatos();
});

// RECOLECCIÓN DE DATOS DE LOS CLIENTES
function recolectarDatos() {
    if (i < cantidad_clientes) {
        rl.question(`Ingrese el nombre del cliente ${i + 1}: `, (nombre) => {
            rl.question(`Ingrese la cantidad de horas de lavado de ${nombre}: `, (horasR) => {
                datos_clientes.push({ nombre, horasR: parseInt(horasR) });
                i++;
                recolectarDatos();
            });
        });
    } else {
        console.log("Datos de clientes:", datos_clientes);
        costo_por_cliente();
    }
}
//CALCULO DEL COSTE POR CLIENTE
function costo_por_cliente() {
    for (let o = 0; o < cantidad_clientes; o++) {
        setTimeout(() => {
            const cliente = datos_clientes[o];
            console.log(`Calculando costo para ${cliente.nombre}...`);
            const costoBruto = cliente.horasR * precio_hora;
            // determinar si aplica descuento (más de 12 horas)
            const aplicaDescuento = cliente.horasR > 12;
            const descuentoAplicado = aplicaDescuento ? descuento : 0;
            const costoFinal = aplicaDescuento ? Math.round(costoBruto * (1 - descuentoAplicado)) : costoBruto;

            // Para guardar en el array costo_cliente con nombres
            costo_cliente.push({
                nombre: cliente.nombre,
                horas: cliente.horasR,
                costoBruto: costoBruto,
                descuentoAplicado: aplicaDescuento,
                descuentoPct: descuentoAplicado,
                costoFinal: costoFinal
            });

            console.log(`El costo para ${cliente.nombre} es de $${costoBruto}`);
            if (aplicaDescuento) {
                console.log(`Descuento aplicado ${Math.round(descuentoAplicado * 100)}% → Precio final $${costoFinal}`);
            }
        }, o * 1500);
    }

    // después de mostrar todos, imprimir resumen y cerrar
    setTimeout(() => {
        console.log("Cálculo de costos completado.");
        console.log("Resumen de costos:", costo_cliente);

        // reporte diario
        const totalAtendidos = costo_cliente.length;
        const conDescuento = costo_cliente.filter(c => c.descuentoAplicado).length;
        const ingresoTotal = costo_cliente.reduce((sum, c) => sum + c.costoFinal, 0);

        console.log("\n--- Informe del día ---");
        console.log(`Total clientes atendidos: ${totalAtendidos}`);
        console.log(`Clientes con descuento: ${conDescuento}`);
        console.log(`Ingresos totales: $${ingresoTotal}`);
        console.log("-----------------------\n");

        rl.close();
    }, cantidad_clientes * 1500);
}
    
    

    

