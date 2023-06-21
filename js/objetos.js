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
const usr2 = new Usuario(2, 'Mari', 'Lozo');
const usr3 = new Usuario(3, 'Juan', 'Loto');
const usr4 = new Usuario(4, 'Cris', 'Gonzalez');
const usr5 = new Usuario(5, 'Lola', 'Indigo');
const usr6 = new Usuario(6, 'Mari', 'Miranda');
const usr7 = new Usuario(7, 'Xavi', 'Gonzalez');
//const admin = new Usuario(0,'admin');

usr1.aportar(123);
usr2.aportar(143);
usr3.aportar(156);
usr4.aportar(700);
usr5.aportar(100);

const usuarios = [usr1, usr2, usr3, usr4, usr5, usr6,usr7];