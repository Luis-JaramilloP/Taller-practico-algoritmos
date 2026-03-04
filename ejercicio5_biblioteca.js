// Importar módulo
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Convertir question en promesa
function preguntar(texto) {
  return new Promise(resolve => rl.question(texto, resolve));
}

// VARIABLES GENERALES 
let totalUsuarios = 0;
let totalLibros = 0;
let librosConRetraso = 0;
let librosPuntuales = 0;
let multasTotales = 0;

async function main() {

  totalUsuarios = parseInt(await preguntar("¿Cuántos usuarios van a realizar devoluciones hoy? "));

  //  FOR EXTERNO → USUARIOS
  for (let i = 0; i < totalUsuarios; i++) {

    let nombre = await preguntar(`Digite el nombre del usuario ${i + 1}: `);

    let cantidadLibros = parseInt(await preguntar("Digite la cantidad de libros que devuelve (máx 3): "));

    while (cantidadLibros > 3) {
      console.log("Máximo 3 libros.");
      cantidadLibros = parseInt(await preguntar("Ingrese nuevamente la cantidad: "));
    }

    let multaTotalUsuario = 0;

    console.log(`\nDetalle del usuario: ${nombre}`);

    //  FOR ANIDADO → LIBROS
    for (let j = 0; j < cantidadLibros; j++) {

      let dias = parseInt(await preguntar(`Días que tuvo el libro ${j + 1}: `));

      let diasRetraso = 0;
      let multa = 0;

      //  CÁLCULO DE RETRASO
      if (dias > 7) {
        diasRetraso = dias - 7;
      }

      //  CÁLCULO DE MULTA (if / else if / else)
      if (diasRetraso === 0) {
        multa = 0;
      } 
      else if (diasRetraso >= 1 && diasRetraso <= 15) {
        multa = diasRetraso * 1500;
      } 
      else {
        multa = (diasRetraso * 1500) + 10000;
      }

      //  OPERADOR TERNARIO (clasificación)
      let clasificacion = multa === 0 
        ? "PUNTUAL" 
        : (diasRetraso > 15 ? "CON RETRASO GRAVE" : "CON RETRASO");

      //  CONTADORES
      totalLibros++;

      if (multa === 0) {
        librosPuntuales++;
      } else {
        librosConRetraso++;
      }

      multaTotalUsuario += multa;
      multasTotales += multa;

      //  DETALLE POR LIBRO
      console.log(`Libro ${j + 1}`);
      console.log(`Días préstamo: ${dias}`);
      console.log(`Días retraso: ${diasRetraso}`);
      console.log(`Multa: $${multa}`);
      console.log(`Estado: ${clasificacion}`);
      console.log("--------------------");
    }

    //  TOTAL POR USUARIO
    console.log(`Multa total del usuario ${nombre}: $${multaTotalUsuario}`);
    console.log("=====================================\n");
  }

  //  RESUMEN FINAL DEL DÍA
  console.log("RESUMEN DEL DÍA");
  console.log("Total usuarios:", totalUsuarios);
  console.log("Total libros devueltos:", totalLibros);
  console.log("Libros puntuales:", librosPuntuales);
  console.log("Libros con retraso:", librosConRetraso);
  console.log("Multas recaudadas totales: $", multasTotales);

  rl.close();
}

main();