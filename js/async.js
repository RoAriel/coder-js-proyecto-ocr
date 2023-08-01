// USO DE GET

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

        miToastify(`Se agrego el usuario ${data.title} con ID ${data.userId} .`,
                'linear-gradient(90deg, rgba(26,250,236,1) 0%, rgba(26,250,150,1) 66%)')
        );
};