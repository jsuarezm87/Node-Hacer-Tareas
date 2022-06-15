require('colors');

const { mostrarMenu, pausa } = require('./helpers/mensajes');

console.clear();

// async: para indicar que se utilizaran metodos que retornan una promesa.
const main = async () => {

    let opt = '';

    do {  
        // await : espera hasta que se ejecute el [ resolve ] de la promesa (mostrarMenu, pausa).      
        opt = await mostrarMenu(); 
        console.log({ opt });

        if ( opt !== '0' ) await pausa(); 

    } while ( opt !== '0' );  

}

main();