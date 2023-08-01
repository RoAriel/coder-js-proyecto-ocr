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

function convertListLiteralDeAportesAListDeAportesDeUnUser(userLit) {
    let aportes = [];
    for (let aporteLit of userLit.aportes) {
        const aporte = new Aporte(parseInt(aporteLit.idUsr), parseFloat(aporteLit.monto));
        aporte.fecha = new Date(aporteLit.fecha);
        aportes.push(aporte);
    };
    return aportes;
};

function aportesTotalesDeLaApp(usuarios) {
    let total = 0
    usuarios.forEach(usuario => {
        total += usuario.aportesTotales();
    });
    return total;
};