
async function getUsuariosFromJSON() {
    const URLUSUARIOS = 'js/dbUsuarios.json';
    const resp = await fetch(URLUSUARIOS);
    const data = await resp.json()
    return data.usuarios

}

async function convertListLiteralDeUsuariosAListDeUsuariosAsync() {
    const usuarios = []
    const jsonUsuarios = await getUsuariosFromJSON()
    jsonUsuarios.forEach(userLit => {
        const usuario = new Usuario(parseInt(userLit.id), userLit.nombre, userLit.apellido);
        usuario.aportes = convertListLiteralDeAportesAListDeAportesDeUnUser(userLit);
        usuarios.push(usuario);
    });

    return usuarios
}

async function getAvatarPk(id) {
    const POKEAPI = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    const res = await fetch(POKEAPI);
    const data = await res.json();
    return data.sprites.front_default;

};
