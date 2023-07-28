import { existeUserDeNombre } from "../utils/aportes";

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

const renderizarTotal = (recaudacion, total) => {
    recaudacion.innerText = `$ ${total}`;
};

function renderizarReusltadosDeBusqueda(users) {
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
function buscarUsuarios(usrNameBuscado, usrApellidoBuscado) {
    let btBuscar = document.getElementById('bt-buscar-usr');
    btBuscar.addEventListener('click', () => {
        if (existeUserDeNombre(usrNameBuscado.value) || existeUserDeApellido(usrApellidoBuscado.value)) {
            let lista1 = usuarios.filter(usr => usr.nombre === usrNameBuscado.value);
            let lista2 = usuarios.filter(usr => usr.apellido === usrApellidoBuscado.value);
            let usuariosEncontrados = lista1.concat(lista2)
            renderizarReusltadosDeBusqueda(usuariosEncontrados);
            usrNameBuscado.value = '';
            usrApellidoBuscado.value = '';
        } else {
            resultados.innerHTML = '';
            usrNameBuscado.value = '';
            usrApellidoBuscado.value = '';
            Toastify({
                text: "⛔ Usuario no encontrado.",
                className: 'tamanioLetra',
                style: {
                    background: 'linear-gradient(90deg, rgba(255,145,0,1) 3%, rgba(252,80,14,1) 25%, rgba(250,26,26,1) 100%)'
                }
            }).showToast();
        };
    });
}

function historialUsuarios(usuario) {
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
}

function buscarHistorialUsuario(idUserHistValido, nombreUsuario, montoTotal, idInputHist) {

    let btBuscarHist = document.getElementById('bt-buscar-hist');
    btBuscarHist.addEventListener('click', () => {

        if (idUserHistValido) {
            let usuario = getUserByID(idUserHist);
            nombreUsuario.innerText = `${usuario.nombre} ${usuario.apellido}`;
            montoTotal.innerText = `$ ${usuario.aportesTotales()}`
            renderHistorialDeAportes(usuario);

        } else {
            console.log(idUserHistValido)
            Toastify({
                text: "⛔ ID incorrecto, valide por favor.",
                className: 'tamanioLetra',
                style: {
                    background: 'linear-gradient(90deg, rgba(255,145,0,1) 3%, rgba(252,80,14,1) 25%, rgba(250,26,26,1) 100%)'
                }
            }).showToast();
        };
        idInputHist.value = '';
    });

}


// USO DE POST
function enviarNuevoUser(user) {
    const URLPOST = 'https://jsonplaceholder.typicode.com/posts';
    fetch(URLPOST, {
        method: 'POST',
        body: JSON.stringify({
            userId: user.id,
            title: `${user.nombre}`,
            body: `${user.historialDeAportes()}`,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then(response => response.json())
        .then((data) =>

            Toastify({
                text: `Se agrego el usuario ${data.title} con ID ${data.userId} .`,
                className: 'tamanioLetra',
                style: {
                    background: 'linear-gradient(90deg, rgba(26,250,236,1) 0%, rgba(26,250,150,1) 66%)',
                }
            }).showToast()
        );
};



