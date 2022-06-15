const fs = require('fs');

const archivo = './db/data.json';

const guardarBD = ( data ) => {    
    fs.writeFileSync( archivo, JSON.stringify( data ) );
}

const leerBD = () => {
    
    if( !fs.existsSync( archivo ) ) {
        return null;
    }

    const info = fs.readFileSync( archivo, { encoding: 'utf8' });
    const data = JSON.parse( info );

    return data;
}

module.exports = {
    guardarBD,
    leerBD
}