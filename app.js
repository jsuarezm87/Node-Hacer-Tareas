require('colors');

const { guardarBD, leerBD } = require('./helpers/gurdarArchivo');
const { inquirerMenu, 
        pausa, 
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');


// async: para indicar que se utilizaran metodos que retornan una promesa.
const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    const tareasBD = leerBD();

    if ( tareasBD ) {// Establecer las tareas.
        tareas.cargarTareasFromArray( tareasBD );       
    }


    do { 
        // Imprime el menu. 
        // await : espera hasta que se ejecute el [ resolve, return ] de la promesa.      
        opt = await inquirerMenu(); 

        switch ( opt ) {
            case '1': // crear opcion
                const desc = await leerInput('Descripción: '); 
                tareas.crearTarea( desc ); 
            break;

            case '2': // Listar tareas
                tareas.listadoCompleto(); 
            break;

            case '3': // Listar tareas completas
                tareas.listarPendientesCompletadas( true );
            break;

            case '4': // Listar tareas pendientes
                tareas.listarPendientesCompletadas( false );
            break;

            case '5': // Completado | pendiente
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas( ids ); 
            break;            

            case '6': // Borrar tareas
                const id = await listadoTareasBorrar( tareas.listadoArr );

                if ( id !== '0' ) {
                    const ok = await confirmar('¿Está seguro?');
                    if ( ok ) {
                        tareas.borrarTarea( id ); 
                        console.log('Tarea borrada');
                    }     
                }                     
            break;

            
        }
        
        guardarBD( tareas.listadoArr );

        if ( opt !== '0' ) await pausa();

    } while ( opt !== '0' );  

}

main();