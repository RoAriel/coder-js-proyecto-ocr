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