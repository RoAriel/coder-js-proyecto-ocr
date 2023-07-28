
function nuevoUser(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target))

    const { nombre, apellido, aporte } = data;

    const newUser = new Usuario(maxId + 1, nombre, apellido);
    newUser.aportar(parseFloat(aporte));
    usuarios.push(newUser);
    let aportes = appAportes()
    renderizarUsuarios(usuarios);
    updateLSUsers(usuarios);
    updateLSTotalRecaudacion(aportes);
    renderizarTotal(aportes);
    
    // UPDATE DE VARIABLES GLOBALES DE LOS ID y NOMBRES
    idUsuarios = usuarios.map(usr => usr.id);
    updateAvatar(idUsuarios);
    nombresDeUsuarios = usuarios.map(usr => usr.nombre);
    apellidosDeUsuarios = usuarios.map(usr => usr.apellido);

    // SIMULO LE POST HACIA UN BACKEND
    enviarNuevoUser(newUser);
    document.querySelector('form').reset()

}