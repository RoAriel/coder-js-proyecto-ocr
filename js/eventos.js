// Buscar usuarios
function buscarUser(usuarios) {
    let btBuscar = document.getElementById('bt-buscar-usr');
    let usrNameBuscado = document.getElementById('name-usr')
    let usrApellidoBuscado = document.getElementById('lastName-usr')

    btBuscar.addEventListener('click', () => {
        if (existeUserDeNombre(nombresDeUsuarios, usrNameBuscado.value) || existeUserDeApellido(apellidosDeUsuarios, usrApellidoBuscado.value)) {
            let lista1 = usuarios.filter(usr => usr.nombre === usrNameBuscado.value);
            let lista2 = usuarios.filter(usr => usr.apellido === usrApellidoBuscado.value);
            let usuariosEncontrados = lista1.concat(lista2)
            renderizarReusltadosDeBusqueda(usuariosEncontrados);
            usrNameBuscado.value = '';
            usrApellidoBuscado.value = '';
        } else {
            document.getElementById('resultadosBody').innerHTML = '';
            usrNameBuscado.value = '';
            usrApellidoBuscado.value = '';
            miToastify('⛔ Usuario no encontrado.',
                'linear-gradient(90deg, rgba(255,145,0,1) 3%, rgba(252,80,14,1) 25%, rgba(250,26,26,1) 100%)');
        };
    });
};

// Inputs de ID
function validarInputId(idElem) {

    idElem.onkeyup = () => {
        let idInt = parseInt(idElem.value);
        formatIdValue(idInt, idElem);

    };
};

function validarInputAportarMonto(elem) {
    elem.onkeyup = () => {
        if (parseFloat(elem.value) <= 0) {
            document.getElementById('bt-aportar').disabled = true;
        } else {
            document.getElementById('bt-aportar').disabled = false;
        };
    };
};

// Aportar
function nuevoAporte(elem_id, elem_monto) {

    let btAportar = document.getElementById('bt-aportar');

    btAportar.addEventListener('click', () => {
        if (idValido && parseFloat(elem_monto.value) > 0) {
            let usuario = getUserByID(usuarios, parseInt(elem_id.value))
            usuario.aportar(parseFloat(elem_monto.value));

            elem_monto.value = 0;
            idUserAportar.value = '';
            let aportes = aportesTotalesDeLaApp(usuarios)
            renderizarUsuarios(usuarios);
            updateLSUsers(usuarios);
            updateLSTotalRecaudacion(aportes);
            renderiazarTotal(aportes);
            renderAvatar(idUsuarios);

            miToastify(` ✅ Aporte de ${usuario.nombre} ${usuario.apellido} realizado.`
                , 'linear-gradient(90deg, rgba(26,250,236,1) 0%, rgba(26,250,150,1) 66%)')

        } else {
            miToastify('⛔ ID incorrecto, valide por favor.',
                'linear-gradient(90deg, rgba(255,145,0,1) 3%, rgba(252,80,14,1) 25%, rgba(250,26,26,1) 100%)');
        };
    });
};

//Buscar Historial

function buscarHistorial(id_elem) {
    let nombreUsuario = document.getElementById('usr-hist-name');
    let montoTotal = document.getElementById('usr-monto-total');
    let btBuscarHist = document.getElementById('bt-buscar-hist');
    btBuscarHist.addEventListener('click', () => {

        if (idValido) {
            let usuario = getUserByID(usuarios, parseInt(id_elem.value));
            nombreUsuario.innerText = `${usuario.nombre} ${usuario.apellido}`;
            montoTotal.innerText = `$ ${usuario.aportesTotales()}`
            renderHistorialDeAportes(usuario);

        } else {
            miToastify('⛔ ID incorrecto, valide por favor.',
                'linear-gradient(90deg, rgba(255,145,0,1) 3%, rgba(252,80,14,1) 25%, rgba(250,26,26,1) 100%)');
        };
        idInputHist.value = '';
    });
};