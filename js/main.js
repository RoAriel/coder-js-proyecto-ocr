class Aporte {

    constructor(idUsr, monto) {
        this.idUsr = idUsr;
        this.monto = monto;
        this.fecha = new Date();
    };

    getFechaFormateada() {
        return this.fecha.toLocaleDateString();
    };
};

class Usuario {

    constructor(id, nombre, apellido) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.aportes = [];
    };

    aportar(aporte) {
        this.aportes.push(new Aporte(this.id, aporte));
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

    montoDelUtimoAporte() {
        if (this.aportes.length == 0) {
            return 0;
        } else {
            let monto = this.aportes[this.aportes.length - 1].monto
            return monto;
        }
    };

    fechaDelUtimoAporte() {
        if (this.aportes.length == 0) {
            return '--/--/----';
        } else {
            let fecha = this.aportes[this.aportes.length - 1].getFechaFormateada();
            return fecha;
        }
    };

};

const usr1 = new Usuario(1, 'Pepe', 'Mujica');
const usr2 = new Usuario(2, 'Pepe', 'Lozo');
const usr3 = new Usuario(3, 'Juan', 'Loto');
const usr4 = new Usuario(4, 'Lola', 'Indigo');
const usr5 = new Usuario(5, 'Lola', 'Miranda');
const usr6 = new Usuario(6, 'Mari', 'Gonzalez');
//const admin = new Usuario(0,'admin');

usr1.aportar(123);
usr2.aportar(143);
usr3.aportar(156);
usr4.aportar(700);
usr5.aportar(100);

const usuarios = [usr1, usr2, usr3, usr4, usr5, usr6];

// VARIABLES GLOBALES

let usrValido = false;
let montoValido = false;
let idUsuarios = usuarios.map(usr => usr.id);
let nombresDeUsuarios = usuarios.map(usr => usr.nombre);
let table = document.getElementById('tablaBody');
let usrIngresado = document.getElementById('name-usr');
let montoIngresado = document.getElementById('in-monto');
let idIngresado = document.getElementById('id-user');

// FUNCIONES DE RECORRIDO Y USO DE CLASES

function existeUserDeNombre(usrNombre) {
    return (nombresDeUsuarios.includes(usrNombre));
};

function existeId(usrID) {
    return (idUsuarios.includes(usrID));
};

function getUserByName(usrName) {
    return usuarios.find(usr => usr.nombre == usrName);
};

function getUserByID(idUsr) {
    return usuarios.find(usr => usr.id == idUsr);
};

// USO DEL DOM

function renderizarUsuarios(users) {
    table.innerHTML = '';
    for (const usr of users) {
        table.innerHTML += `
         <tr>
              <td>${usr.id}</td>
              <td>${usr.nombre}</td>
              <td>$ ${usr.montoDelUtimoAporte()}</td>
              <td>${usr.fechaDelUtimoAporte()}</td>
         </tr>
         `;
    };
};
renderizarUsuarios(usuarios);

// Validar Input ID.
let paseID = parseInt(idIngresado.value);

idIngresado.onkeyup = () => {
let paseID = parseInt(idIngresado.value);
    if (!existeId(paseID)) {
        idIngresado.style.color = 'red';
    } else {
        idIngresado.style.color = 'green';
        usrValido = true
    };
};

// Validar Input Monto.

montoIngresado.onkeyup = () => {
    if (parseFloat(montoIngresado.value) <= 0) {
        document.getElementById('bt-aportar').disabled = true;
    } else {
        document.getElementById('bt-aportar').disabled = false;
        montoValido = true;
    };
};

// Aportar
let botonAportar = document.getElementById('bt-aportar');
botonAportar.addEventListener('click',()=>{
    if(usrValido && montoValido){
        getUserByID(paseID).aportar(parseFloat(montoIngresado.value));
        renderizarUsuarios(usuarios);

         // Reset inputs
         idIngresado.value = '';
         montoIngresado.value = '';

         // reset de las variables  XValido
         usrValido =  false;
         montoValido =  false;
     }else{
         alert('ID o Monto incorrecto, valide por favor');
     }
 })