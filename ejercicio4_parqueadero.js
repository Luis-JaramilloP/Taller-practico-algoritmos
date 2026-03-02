//CONFIGURACIÓN DE READLINE Y RL.QUESTION
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout 
});
//VARIABLES INICIALES
let tipoVehiculo = 0;
let numHoras = 0;
let valorCliente = 0;
 let total;
 let opcion = 0;
 let totalVehiculos = 0;
 let desglosetipo = [];
 let ingresototal = 0;
 let promedioHoras = 0;
 let promedio2 = [];

//INICIAR PROGRAMA
inicioPrograma();

function inicioPrograma (){
  rl.question("1. Registrar vehiculo. 2. Terminar Jornada\n", (answer) =>{
    let opcion = parseInt(answer);

    switch(opcion){
      case 1: 
        mostrarMenu();
        break;
      case 2:
        promedioHoras /= promedio2.length
        cierre();
        console.log("Jornada finalizada");
        rl.close();
        break;
      default:
        console.log("Opción inválida");
        inicioPrograma();
    }
  });
}

function mostrarMenu (){
    console.log("TIPO DE VEHICULO:");
    console.log("1. Motocicleta");
    console.log("2. Carro");
    console.log("3. Camioneta");

    rl.question("Seleccione el tipo de vehículo: ", (tipo) =>{
        tipoVehiculo = parseInt(tipo);

        rl.question("Digite las horas que desea alquilar: ", (horas) =>{
            numHoras = parseInt(horas);

            asignacionTarifa();
        });
    });
}

function asignacionTarifa (){
    if(tipoVehiculo === 1){
        console.log("Tarifa tipo motocicleta: 2000 por hora");
        valorCliente = 2000;
    } 
    else if(tipoVehiculo === 2){
        console.log("Tarifa tipo carro: 4000 por hora");
        valorCliente = 4000;
    } 
    else if(tipoVehiculo === 3){
        console.log("Tarifa tipo camioneta: 6000 por hora");
        valorCliente = 6000;
    } 
    else {
        console.log("Dígito inválido, regresando al menú...");
        setTimeout(() => {
            mostrarMenu();
        }, 3000);
        return;
    }
    totalVehiculos++
    desglo();
    let total = valorCliente * numHoras;
    console.log(" SUBTOTAL a pagar sin descuento:", total);
    descuento();
    ingresototal += total;
    promedioHoras += numHoras;
    promedio2.push(numHoras)
    inicioPrograma();
}
// DESCUENTO DEL 20% SI TIENE MÁS DE 8 HORAS
 function descuento(){
    let total = valorCliente * numHoras;
 if( numHoras > 8){
    console.log("Aplicas para la TARIFA DE DIA COMPLETO con un descuento del 20%");
    total *= 0.8
    console.log("TOTAL A PAGAR CON DESCUENTO:", total);
 } else{
    console.log("Aplicas para la TARIFA POR HORAS sin descuento, TOTAL A PAGAR:", total);
 }
 }
 //RESUMEN DE CIERRE DE JORNADA
 function cierre(){
     console.log("TOTAL DE VEHICULOS REGISTRADOS:", totalVehiculos)
     console.log("TIPO DE VEHICULOS REGISTRADOS:", desglosetipo)
     console.log("INGRESO TOTAL DEL DIA:", ingresototal)
     console.log("El promedio de horas fue de:", promedioHoras)
 }

 //DESGLOSE POR TIPO
 function desglo (){
    if(tipoVehiculo === 1){
        desglosetipo.push (
           "1. Vehiculo tipo motocicleta" );
    } 
    else if(tipoVehiculo === 2){
        desglosetipo.push (
           "2. Vehiculo tipo carro ordinario" );
    } 
    else if(tipoVehiculo === 3){
        desglosetipo.push (
           "3. Vehiculo tipo camioneta" );
    } 
 }
