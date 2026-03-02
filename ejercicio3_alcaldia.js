//CONFIGURACIÓN DEL READLINE
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//VARIABLES INICIALES
let registros = 0;
let i = 0;
let datosR = [];
let o = 0;
 let valor;
 

 

// CANTIDAD DE REGISTROS (PREGUNTA INICIAL)


rl.question('Ingrese la cantidad de registros: ', (answer) => {
    registros = parseInt(answer);
    recoleccion();
});

//RECOLECTAR DATOS (NOMBRE,EDAD)

function recoleccion() {
    if (i < registros) {
        rl.question('Ingrese nombre completo: ', (nombre) => {
            rl.question('Ingrese la edad: ', (edad) => {

                datosR.push({
                    nombre,
                    edad: parseInt(edad)
                });

                i++;
                recoleccion(); // ← vuelve a llamar hasta completar

            });
        });
    } else {
        clasificacion(); // ← ahora sí se ejecuta al final
    }
}
//FILTRO DE TOTAL DE BENEFICIADOS


function filtro() {

    datosR.forEach(persona => {
        if (persona.edad >= 60 && persona.edad <= 80 && persona.edad > 80) {
            console.log(`${persona.nombre} Total de personas beneficiadas:`, $({registros}));
        } else if (persona.edad < 60) {
            console.log(`${persona.nombre} Esta persona no esta beneficiada`);
        } 
    });

    
}


// RESUMEN POR PERSONA 
function clasificacion() {

    let clasificados = [];

    datosR.forEach(persona => {

        let categoria;
        let porcentaje;
       

        if (persona.edad >= 60 && persona.edad <= 80) {
            categoria = "Adulto mayor";
            porcentaje = "12%";
            valor = 156000;
        } 
        else if (persona.edad > 80) {
            categoria = "Adulto mayor senior";
            porcentaje = "15%";
            valor = 195000;
        } 
        else {
            categoria = "No aplica";
            porcentaje = "0%";
            valor = 0;
        }

        clasificados.push({
            nombre: persona.nombre,
            edad: persona.edad,
            categoria: categoria,
            porcentaje: porcentaje,
            valor: valor
        });
        

    });
     // ORDEN DE EJECUCIÓN DE FINAL DEL CODIGO !!
    console.log("\nResumen por persona:");
    console.log(clasificados);
    console.log("INFORME FINAL");
    clasificacio();
    let sumat = datosR.length;
    let totalDinero = clasificados.reduce((acc, persona) => acc + persona.valor, 0);
    console.log("Cantidad de adultos mayores:", adultosMayores);
    console.log("Cantidad de adultos mayores senior:", cantidadSenior);
    console.log("Cantidad de personas que no aplican:", noaplican);
    console.log("Total de personas registradas:", sumat);
    console.log("Total de presupuesto requerido:", totalDinero);
    console.log("Total de personas beneficiadas:", beneficiadoss);

    rl.close();
}
// ZONA DE CLASIFICACIÓN SEGUN EDAD,TOTAL DE BENEFICIADOS,ETC.
let adultosMayores;
let cantidadSenior;
let noaplican;
let beneficiadoss;


function clasificacio() {

    adultosMayores = datosR.filter(p =>
        p.edad >= 60 && p.edad <= 80
    ).length;

    cantidadSenior = datosR.filter(p =>
        p.edad > 80
    ).length;

    noaplican = datosR.filter(p =>
        p.edad < 60
    ).length;

    beneficiadoss = adultosMayores + cantidadSenior;
    
}

