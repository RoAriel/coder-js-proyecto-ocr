// Funcion que suma todos los aportes ingresados
function appAportes(usuarios) {
    let total = 0
    usuarios.forEach(usuario => {
        total += usuario.aportesTotales();
    });
    return total;
};

export function existeUserDeNombre(nombresDeUsuarios, usrNombre) {
    return (nombresDeUsuarios.includes(usrNombre));
};

function existeUserDeApellido(apellidosDeUsuarios, usrApellido) {
    return (apellidosDeUsuarios.includes(usrApellido));
};

function existeId(idUsuarios, usrID) {
    return (idUsuarios.includes(usrID));
};

function getUserByID(usuarios, idUsr) {
    return usuarios.find(usr => usr.id == idUsr);
};

// Valido los lo que ingreso a los inpus  
const validInputID = (id, elem) => {
    if (!existeId(id)) {
        elem.style.color = 'red';
        idValido = false;
        idUserHistValido = false;
    } else {
        elem.style.color = 'green';
        idValido = true
        idUserHistValido = true;
    };
}