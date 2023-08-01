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
