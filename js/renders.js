function renderizarUsuarios(users) {
    let table = document.getElementById('tablaBody');
    table.innerHTML = '';
    for (const usr of users) {

        table.innerHTML += `
        <tr>
        <td scope="row">${usr.id}</td>
        <td><img id="${usr.id}" src=""></td>
        <td>${usr.nombre}</td>
        <td>${usr.apellido}</td>
        <td>$ ${usr.montoDelUtimoAporte()}</td>
        <td>${usr.fechaDelUtimoAporte()}</td>

        </tr>
        `;
    };
};

function renderiazarTotal(total) {
    let recaudacion = document.getElementById('recaudacion');
    recaudacion.innerText = `$ ${total}`;
};

function renderAvatar(idUsers) {
    for (const usrId of idUsers) {
        const imgUserID = document.getElementById(`${usrId}`);
        getAvatarPk(usrId)
            .then((data) => {
                imgUserID.setAttribute('src', data);
            })
    }
}

function renderizarReusltadosDeBusqueda(users) {

    let resultados = document.getElementById('resultadosBody');
    let setUsers = new Set(users);
    resultados.innerHTML = '';

    setUsers.forEach(usr => {
        resultados.innerHTML += `
            <tr>
            <td>${usr.id}</td>
            <td>${usr.nombre}</td>
            <td>${usr.apellido}</td>
            </tr>
            `;
    })
};

function renderiazarTotal(total) {
    let recaudacion = document.getElementById('recaudacion');
    recaudacion.innerText = `$ ${total}`;
};

function renderHistorialDeAportes(usuario) {
    let tablaHist = document.getElementById('tablaHistorial');
    tablaHist.innerHTML = '';

    for (let aporte of usuario.aportes) {
        tablaHist.innerHTML += `
        <tr>
        <td scope="row">${aporte.idUsr}</td>
        <td>$ ${aporte.monto}</td>
        <td>${aporte.getFechaFormateada()}</td>
        </tr>
        `;
    };
};