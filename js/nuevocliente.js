(function() {
    let DB;
    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', () => {

        conectarDB();
        formulario.addEventListener('submit', validarCliente);
    });

   

    function validarCliente(e) {
        e.preventDefault();

        //console.log('Desde validar cliente');

        //leer todos los inputs 
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if(nombre === '' || email === '' || telefono === '' || empresa === '') {
            console.log('error');
            imprimirAlerta('All fields are required', 'error');
            return;
        }

        //Crear un objeto
        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
            id: Date.now()
        }
        conectarDB(db => {
            crearNuevoCliente(db, cliente)
        });
       
    }

    function crearNuevoCliente(db,cliente) {
        const transaction = db.transaction(['crm'], 'readwrite');

        const objectStore = transaction.objectStore('crm');

        objectStore.add(cliente);

        transaction.onerror = function() {
            imprimirAlerta('There was an error', 'error');
            transaction.db.close();
        }

        transaction.oncomplete = function() {
            
            imprimirAlerta('Customer was added successfully');
            transaction.db.close();

            setTimeout( () => {
                window.location.href = 'index.html'
            }, 3000);
        }
    }      
    

    

})();