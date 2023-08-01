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

function convertListLiteralDeUsuariosAListDeUsuarios(users) {
    const usuarios = []
    for (let userLit of users) {
        const usuario = new Usuario(parseInt(userLit.id), userLit.nombre, userLit.apellido);
        usuario.aportes = convertListLiteralDeAportesAListDeAportesDeUnUser(userLit);
        usuarios.push(usuario);
    };

    return usuarios
};