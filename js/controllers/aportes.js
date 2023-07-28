
function newAporte(idValido, montoIngresado, idUserAportar) {

    btAportar.addEventListener('click', () => {
        if (idValido && parseFloat(montoIngresado.value) > 0) {
            let usuario = getUserByID(idUserAportar)
            usuario.aportar(parseFloat(montoIngresado.value));

            montoIngresado.value = 0;
            idInputAportar.value = '';
            let aportes = appAportes()
            renderizarUsuarios(usuarios);
            updateLSUsers(usuarios);
            updateLSTotalRecaudacion(aportes);
            renderizarTotal(aportes);
            updateAvatar(idUsuarios);

            Toastify({
                text: ` ✅ Aporte de ${usuario.nombre} ${usuario.apellido} realizado.`,
                className: 'tamanioLetra',
                style: {
                    background: 'linear-gradient(90deg, rgba(26,250,236,1) 0%, rgba(26,250,150,1) 66%)',
                }
            }).showToast();

        } else {
            Toastify({
                text: "⛔ ID incorrecto, valide por favor.",
                className: 'tamanioLetra',
                style: {
                    background: 'linear-gradient(90deg, rgba(255,145,0,1) 3%, rgba(252,80,14,1) 25%, rgba(250,26,26,1) 100%)'
                }
            }).showToast();
        };
    });

}