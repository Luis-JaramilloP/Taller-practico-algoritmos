const readline = require('readline');
 
const rl = readline.createInterface({
        input: process.stdin, 
        output: process.stdout 
});

let total = 0;

function comenzarPrograma(){
    rl.question("Dale 1 para mirar el menu o 2 para finalizar: ", (answer) => {
        let opcion = parseInt(answer);
        switch(opcion){
            case 1:
                mostrarMenu();
                break
            case 2:
                console.log("Gracias por su visita. ¡Hasta luego!");
                rl.close();
                break;
            default:
                console.log("Opción no válida. Por favor, seleccione 1 o 2.");
                comenzarPrograma();
        }
    });
}

function agregarOtro(){
    rl.question("¿Desea agregar otro combo? (s/n): ", (answer) => {
        if(answer.toLowerCase() === 's'){
            mostrarMenu();
            agregarOtro();
        } else {
            console.log(`El total de su pedido es: $${total}. Gracias por su visita. ¡Hasta luego!`);
            rl.close();
        }
    })
}

function mostrarMenu(){
    let menus = [
        { id: 1, name: " Combo 1: Clasico - Hamburguesa Clásica + papas + gaseosa", price: 15000 },
        { id: 2, name: " Combo 2: Doble poder - Hamburguesa doble + papas grandes + gaseosa", price: 22000 }, 
        { id: 3, name: " Combo 3: Mega fest - Hamburguesa triple + papas + malteada + gaseosa", price: 35000 },
        { id: 4, name: "Finalizar pedido", price: null },
    ];
    let menuString = "";
    for(const menu of menus){
        let priceString = menu.price ? ` - $${menu.price}` : "";
        menuString += `${menu.id}. ${menu.name}${priceString}\n`; // esto se llama interpolacion
    }
    rl.question("Selecciona uno de los siguientes combos: " + menuString, (answer) => {
        let opcion = parseInt(answer);
        let existe = menus.some(menu => menu.id === opcion) 
        if(existe && opcion !== 4){
            console.log("Existe")
            total += menus.filter(menu => menu.id === opcion)[0].price;
            agregarOtro();
        } else if(opcion === 4){
            console.log(`El total de su pedido es: $${total}. Gracias por su visita. ¡Hasta luego!`);
            rl.close();
        } else{
            console.log("Opción no válida. Por favor, seleccione un número del menú.");
            mostrarMenu();
        }
    })
}

comenzarPrograma();