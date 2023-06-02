// Primeras Clases

class Aporte{

    constructor(monto){
        this.fecha = new Date();
        this.monto = monto;
    };

    getMonto(){
        return this.monto;
    };

    getFechaFormateada(){
        let mes = this.fecha.getMonth()+1
        return this.fecha.getDate()+'-'+mes+'-'+this.fecha.getFullYear();
    };
};
class Usuario{

    constructor(id,nombre,apellido){
        thid.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.aportes = [];
    };
};

// Ingreso del usuario.

let user = (prompt('Ingrese usuario:')).trim();

while (user == '') {

    alert('Ingrese un usuario valido, por favor.');
    user = (prompt('Ingrese usuario:')).trim();
}


alert('Bienvenido/a ' + user);

// Definicion de variables.
let aportes = 0;
let histDeAportes = '';

// Menu de interacccion
let opcion = parseInt(prompt(
    'Sistema de aportes solidarios. Usted quiere:\n' +
    '1. Ingresar un nuevo aporte.\n' +
    '2. Ver total de sus aportes.\n' +
    '3. Ver historial de aportes. \n' +
    '4. Salir'
));

//Funcion que arma el historial de aportes del usuario
function agregarAlHistorial(monto) {
    let stringMonto = '$' + monto + '\n';
    histDeAportes = histDeAportes + stringMonto;
}

// Ciclo de inteaccion con el usuario
while (opcion != 4) {

    switch (opcion) {

        //Condicional donde evaluo las opciones del usuario
        case 1:

            monto = parseFloat(prompt('Ingrse el monto a aportar:'));
            if (isNaN(monto)) {
                alert('Ingrese valor valido'); // si no es valido el input vuelve al menu raiz
                break;
            } else {
                aportes += monto; // Sumo el nuevo aporte.
                agregarAlHistorial(monto); // Agrego nuevo monto a la lista de aportes.
                console.log(histDeAportes);
                break;
            }
        case 2:
            alert('La suma de aportes hasta la fecha es:\n' + '$' + aportes + '.');
            break;
        case 3:
            alert('Sus aportes fueron:\n' + histDeAportes);
            break;
        default:
            alert('Opcion no valida');
            break;
    }

    opcion = parseInt(prompt(
        'Usted quiere:\n' +
        '1. Ingresar un nuevo aporte.\n' +
        '2. Ver total de sus aportes.\n' +
        '3. Ver historial de aportes. \n' +
        '4. Salir'
    ));
}