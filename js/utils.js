function existeUserDeNombre(nombres, usrNombre) {
    return (nombres.includes(usrNombre));
};

function existeUserDeApellido(apellidos, usrApellido) {
    return (apellidos.includes(usrApellido));
};

function existeId(idUsuarios, usrID) {
    return (idUsuarios.includes(usrID));
};

function getUserByID(usuarios, idUsr) {
    return usuarios.find(usr => usr.id == idUsr);
};

function updateVariablesGlobales(usuarios) {
    idUsuarios = usuarios.map(usr => usr.id);
    nombresDeUsuarios = usuarios.map(usr => usr.nombre);
    apellidosDeUsuarios = usuarios.map(usr => usr.apellido);
    maxId = Math.max(...idUsuarios);

}
// Valido los lo que ingreso a los inpus  
function formatIdValue(id, elem) {
    if (!existeId(idUsuarios, id)) {
        elem.style.color = 'red';
        idValido = false;
        idUserHistValido = false;
    } else {
        elem.style.color = 'green';
        idValido = true
        idUserHistValido = true;
    };
};

// Evento reload para esperar al async que cargue los usuarios para mostrar
window.onload = function () {
    if (! localStorage.justOnce) {
        localStorage.setItem("justOnce", "true");
        window.location.reload();
    }
}