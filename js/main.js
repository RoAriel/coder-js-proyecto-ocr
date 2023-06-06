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

function usersMostrarIdNombreEnLista(users){
    let lista = '';

    for(let usr of users){
        lista+='ID: '+usr.id+ '  Nombre: '+usr.nombre+'\n';
    };

    return lista;
};

function ingreseUsuario(entrada) {

    let user = usuarios.find(usr => usr.nombre === entrada.trim());

    while (user == undefined) {
        alert('Usuario incorrecto o no existente. Favor vuelva a intentar.');
        let entrada2 = prompt('Ingrese usuario:');
        user = usuarios.find(usr => usr.nombre === entrada2.trim());
    };

    return user;
};

function accionesDeUser(usuario){

    // Menu de interacccion
    let opcion = parseInt(prompt(
        'Usted quiere:\n' +
        '1. Ingresar un nuevo aporte.\n' +
        '2. Ver total de sus aportes.\n' +
        '3. Ver historial de aportes. \n' +
        '4. Salir.'

    ));

    // Ciclo de inteaccion con el usuario
    while (opcion != 4) {

        switch (opcion) { //Condicional donde evaluo las opciones del usuario
            case 1:
                monto = parseFloat(prompt('Ingrse el monto a aportar:'));
                if (isNaN(monto)) {
                    alert('Ingrese valor valido'); // si no es valido el input vuelve al menu raiz
                    break;
                } else {
                    usuario.aportes.push(new Aporte(usuario.id, monto));
                    break;
                };
            case 2:
                alert('La suma de aportes hasta la fecha es:\n' + '$' + usuario.aportesTotales() + '.');
                break;
            case 3:
                alert('Sus aportes fueron:\n' + usuario.historialDeAportes());
                break;

            default:

                alert('Opcion no valida');
                break;
            };

        opcion = parseInt(prompt(
            usuario.nombre + ' usted quiere:\n' +
            '1. Ingresar un nuevo aporte.\n' +
            '2. Ver total de sus aportes.\n' +
            '3. Ver historial de aportes. \n' +
            '4. Salir.'
        ));
    };
};

function accionesDeAdmin(){

    // Menu de interacccion
    let opcion = parseInt(prompt(
        'Admin usted quiere:\n' +
        '1. Igregar usuario nuevo.\n' +
        '2. Ver todos los usuarios. \n' +
        '3. Ver usuarios que Aportaron. \n'+
        '4. Ver usuarios que No Aportaron. \n'+
        '5. Total de Aportes. \n'+
        '6. Salir.'));  

    while(opcion != 6){
        switch (opcion) { //Condicional donde evaluo las opciones del usuario
            case 1:
                let ids = usuarios.map(usr => usr.id);
                let maxId = Math.max(...ids);
                usuarios.push(new Usuario(maxId+1,prompt('Nombre para nuevo usuario:')));
                break;
            
            case 2:
                alert('Usuarios cargados en el sitema: \n'+usuarios.map(usr => usr.nombre));
                break;

            case 3:
                let aportaron = usuarios.filter(usr => usr.aportes.length > 0)
                alert('Usuarios que aportaron: \n'+usersMostrarIdNombreEnLista(aportaron));
                break;
            
            case 4:
                let noAportaron = usuarios.filter(usr => usr.aportes.length == 0)
                alert('Usuarios que NO portaron: \n'+ usersMostrarIdNombreEnLista(noAportaron));
                break;

            case 5:
                let totalAportado = 0;
                for (let usr of usuarios){
                    totalAportado+=usr.aportesTotales();
                }
                alert('Total recaudado entre todos los usuarios: \n'+
                '$ '+totalAportado);
                break;

            default:

                alert('Opcion no valida');
                break;
        };
        opcion = parseInt(prompt(
            'Admin usted quiere:\n' +
            '1. Igregar usuario nuevo.\n' +
            '2. Ver todos los usuarios. \n' +
            '3. Ver usuarios que Aportaron. \n'+
            '4. Ver usuarios que No Aportaron. \n'+
            '5. Total de Aportes. \n'+
            '6. Salir.'));  
    };

};


// Inicializo el entorno

const usr1 = new Usuario(1, 'Pepe');
const usr2 = new Usuario(2, 'Juan');
const usr3 = new Usuario(3, 'Lola');
const usr4 = new Usuario(4, 'Mari');
const admin = new Usuario(0,'admin');

const usuarios = [admin,usr1, usr2, usr3, usr4];

// Ingreso del usuario
let userIngresado;

let opcionInicial = prompt('Hola! \n'+ 'Quien eres?\n'+
                            '1. Admin.\n'+
                            '2. User.\n'+
                            '3. Salir.');

while (opcionInicial != '3') {
    if (opcionInicial === '1') {
        userIngresado = ingreseUsuario(prompt('Ingrese usuario de admin: '));
        alert('Bienvenido/a ' + userIngresado.nombre);
        accionesDeAdmin();
    } else {
        userIngresado = ingreseUsuario(prompt('Ingrese usuario: '));
        alert('Bienvenido/a ' + userIngresado.nombre);
        accionesDeUser(userIngresado);
    };

    opcionInicial = prompt('Hola! \n'+ 'Quien eres?\n'+
                            '1. Admin.\n'+
                            '2. User.\n'+
                            '3. Salir.');
};
                        





















        // case 4:
        //     userIngresado = ingreseUsuario(prompt('Ingrese usuario:'));
        //     console.log(userIngresado);
        //     break;