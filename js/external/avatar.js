async function getAvatarPk(id) {
    const POKEAPI = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    const res = await fetch(POKEAPI);
    const data = await res.json();
    return data.sprites.front_default;
     
};