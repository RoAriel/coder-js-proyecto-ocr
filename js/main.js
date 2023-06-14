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

    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
        this.aportes = [];
    };

    aportar(aporte) {
        this.aportes.push(new Aporte(this.id,aporte));
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

    montoDelUtimoAporte(){

        let monto = this.aportes[this.aportes.length-1].monto;
        return monto;
    };

    fechaDelUtimoAporte(){
        let fecha = this.aportes[this.aportes.length-1].getFechaFormateada();
        return fecha;
    };

};

function existeUsuarioEnListaDeUsuarios(nombreDeUsuario,usuarios){
    let nombresDeLosUsuarios = usuarios.map(usr => usr.nombre.toLowerCase());
    let nombre =nombreDeUsuario.toLowerCase();
    return nombresDeLosUsuarios.includes(nombre);
};

const usr1 = new Usuario(1, 'Pepe');
const usr2 = new Usuario(2, 'Juan');
const usr3 = new Usuario(3, 'Lola');
const usr4 = new Usuario(4, 'Mari');
//const admin = new Usuario(0,'admin');

usr1.aportar(123);
usr1.aportar(100);
usr2.aportar(1435);
usr3.aportar(156);
usr4.aportar(700);

const usuarios = [usr1, usr2, usr3, usr4];

let table = document.getElementById('tablaBody');

function renderizarUsuarios(users){

    table.innerHTML='';
    for (const usr of users){
        table.innerHTML+=`
        <tr class="border-b dark:border-neutral-500">
             <td class="whitespace-nowrap px-6 py-4 font-medium">${usr.id}</td>
             <td class="whitespace-nowrap px-6 py-4">${usr.nombre}</td>
             <td class="whitespace-nowrap px-6 py-4">${usr.montoDelUtimoAporte()}</td>
             <td class="whitespace-nowrap px-6 py-4">${usr.fechaDelUtimoAporte()}</td>
        </tr>
        `;
    };
};


renderizarUsuarios(usuarios);
