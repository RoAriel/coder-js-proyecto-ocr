// Primeras clases
class Aporte {

    constructor(idUsr, monto) {
        this.idUsr = idUsr;
        this.monto = monto;
        this.fecha = new Date();
    };

    getFechaFormateada() {
        let mes = this.fecha.getMonth() + 1
        return this.fecha.getDate() + '/' + mes + '/' + this.fecha.getFullYear();
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

    aportesTotales() {

        let total = 0;
        for (let aporte of this.aportes) {

            total += aporte.monto;
        }

        return total;
    };

    historialDeAportes() {

        let histDeAportes = '';
        const aportesOrdenados = this.aportes.sort((a, b) => a > b)

        for (let aporte of aportesOrdenados) {

            let registro = ' Fecha: ' + aporte.getFechaFormateada() + ' --> $' + aporte.monto + '\n';
            histDeAportes = histDeAportes + registro;
        };

        return histDeAportes;
    };
};

const usr1 = new Usuario(1, 'Pepe');
const usr2 = new Usuario(2, 'Juan');
const usr3 = new Usuario(3, 'Lola');
const usr4 = new Usuario(4, 'Mari');

const usuarios = [usr1, usr2, usr3, usr4];

// Ingreso del usuario.
function ingreseUsuario(entrada) {

    let user = usuarios.find(usr => usr.nombre === entrada.trim());

    while (user == undefined) {
        console.log('el usr: ' + user);
        alert('Usuario incorrecto o no existente. Favor vuelva a intentar.');
        let entrada2 = prompt('Ingrese usuario:');
        user = usuarios.find(usr => usr.nombre === entrada2.trim());
    };

    return user;
};


let userIngresado = ingreseUsuario(prompt('Ingrese usuario: '));


alert('Bienvenido/a ' + userIngresado.nombre);

// Menu de interacccion
let opcion = parseInt(prompt(
    'Admin Sistema de aportes solidarios. Usted quiere:\n' +
    '1. Ver total Todos los aportes.\n' +
    '2. Buscar quien aporto mas. \n' +
    '3. Buscar quien no aporto. \n' +
    '4. Agregar usuario. \n' +
    '6. Eliminar usuario. \n' +
    '5. Salir.'

));

// Ciclo de inteaccion con el usuario
while (opcion != 5) {

    switch (opcion) { //Condicional donde evaluo las opciones del usuario
        case 1:
            monto = parseFloat(prompt('Ingrse el monto a aportar:'));
            if (isNaN(monto)) {
                alert('Ingrese valor valido'); // si no es valido el input vuelve al menu raiz
                break;
            } else {
                userIngresado.aportes.push(new Aporte(userIngresado.id, monto));
                break;
            }
        case 2:
            alert('La suma de aportes hasta la fecha es:\n' + '$' + userIngresado.aportesTotales() + '.');
            console.log(userIngresado)
            break;
        case 3:
            alert('Sus aportes fueron:\n' + userIngresado.historialDeAportes());
            break;

        case 4:
            userIngresado = ingreseUsuario(prompt('Ingrese usuario:'));
            console.log(userIngresado);
            break;
        default:

            alert('Opcion no valida');
            break;
    }

    opcion = parseInt(prompt(
        userIngresado.nombre + ' usted quiere:\n' +
        '1. Ingresar un nuevo aporte.\n' +
        '2. Ver total de sus aportes.\n' +
        '3. Ver historial de aportes. \n' +
        '4. Cambiar de Usuario. \n' +
        '5. Salir.'
    ));
};