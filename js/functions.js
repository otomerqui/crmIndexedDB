function conectarDB(callback) {
    const abrirConexion = window.indexedDB.open('crm', 1);

    abrirConexion.onerror = function() {
        console.log('Hubo un error');
    };

    abrirConexion.onsuccess = function() {
        console.log('Conexion establecida');
        const db = abrirConexion.result;
        if (callback) {
            return callback(db);
        }
    }
}

function imprimirAlerta(mensaje, tipo) {
    //crear la alerta
    const alerta = document.querySelector('.alerta');

    if(!alerta) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'border', 'alerta');
        if(tipo === 'error') {
            divMensaje.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
        } else {
            divMensaje.classList.add('bg-green-100', 'border-gree-400', 'text-green-700');
        }

        divMensaje.textContent = mensaje;

        formulario.appendChild(divMensaje);

        setTimeout( () => {
            divMensaje.remove();
        }, 3000);
    }
   
}