
async function getUsuariosFromJSON(){
    const URLUSUARIOS = 'js/dbUsuarios.json';
    const resp =  await fetch(URLUSUARIOS);
    const data = await resp.json()
    return data.usuarios

}

// Esta funcion no es async pero al usarla en una que si la es la dejo en este archivo
function convertListLiteralDeAportesAListDeAportesDeUnUser(userLit) {
    let aportes = [];
    userLit.aportes.forEach(aporteLit => {
        const aporte = new Aporte(parseInt(aporteLit.idUsr), parseFloat(aporteLit.monto));
        aporte.fecha = new Date(aporteLit.fecha);
        aportes.push(aporte);
    });
    return aportes;
};

async function convertListLiteralDeUsuariosAListDeUsuarios() {
    const usuarios = []
    const jsonUsuarios = await getUsuariosFromJSON()
    jsonUsuarios.forEach(userLit => {
        const usuario = new Usuario(parseInt(userLit.id), userLit.nombre, userLit.apellido);
        usuario.aportes = convertListLiteralDeAportesAListDeAportesDeUnUser(userLit);
        usuarios.push(usuario);
    });

    return usuarios
}


function mainUsr(toRun){

    toRun.then(result => console.log(result))
    .catch (error => console.log(error))
}

async function magic (usrToList,stringnifica){



} 
mainUsr(convertListLiteralDeUsuariosAListDeUsuarios())


//**/
/*
class Aporte2 {

    constructor(idUsr, monto) {
        this.idUsr = idUsr;
        this.monto = monto;
        this.fecha = new Date();
    };

    getFechaFormateada() {
        return this.fecha.toLocaleDateString();
    };
};

class Usuario2 {

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

const usr1 = new Usuario2(1, 'Pepe', 'Mujica');
const usr2 = new Usuario2(2, 'Mari', 'Lozo');
const usr3 = new Usuario2(3, 'Juan', 'Loto');
const usr4 = new Usuario2(4, 'Cris', 'Gonzalez');
const usr5 = new Usuario2(5, 'Lola', 'Indigo');
const usr6 = new Usuario2(6, 'Mari', 'Miranda');
const usr7 = new Usuario2(7, 'Xavi', 'Gonzalez');
//const admin = new Usuario(0,'admin');

usr1.aportar(123);
usr2.aportar(143);
usr3.aportar(156);
usr4.aportar(700);
usr5.aportar(100);

const base = []
const lista =[usr1, usr2, usr3, usr4, usr5, usr6,usr7];

lista.forEach(e => {base.push(e)})

//console.log('mi base: ',base)
console.log(base)
*/