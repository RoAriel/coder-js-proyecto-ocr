// Primeras clases

class Aporte {

    constructor(idUsr, monto) {
        this.idUsr = idUsr;
        this.monto = monto;
        this.fecha = new Date();
    };

    getFechaFormateada() {
        let mes = this.fecha.getMonth() + 1
        return this.fecha.getDate() + '-' + mes + '-' + this.fecha.getFullYear();
    };
};
class Usuario {

    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
        this.aportes = [];
    };

    aportar(aporte) {
        this.aportes.push(aporte);
    };
};

const usr1 = new Usuario(1, 'usr1');
const usr2 = new Usuario(2, 'usr2');
const usr3 = new Usuario(3, 'usr3');
const usr4 = new Usuario(4, 'usr4');

const usuarios = [usr1, usr2, usr3, usr4];

// Ingreso del usuario.

let input = prompt('Ingrese usuario:');
let user = usuarios.find(usr => usr.nombre === input.trim());

while (user == undefined) {
    console.log('el usr: ' + user);
    alert('Ingrese un usuario valido, por favor.');

    input = prompt('Ingrese usuario:');
    user = usuarios.find(usr => usr.nombre === input.trim());
};

alert('Bienvenido/a ' + user.nombre);


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