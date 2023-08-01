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
