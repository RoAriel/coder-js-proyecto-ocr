
const usuarios = convertListLiteralDeUsuariosAListDeUsuarios(usersLocalStorage)
let storageTotal = (localStorage.getItem('total')) || JSON.stringify(aportesTotalesDeLaApp(usuarios));
let totalDeAportesApp = parseFloat(storageTotal);

renderizarUsuarios(usuarios)
renderiazarTotal(totalDeAportesApp);


// VARIABLES 
let idValido = false;
let idUsuarios = usuarios.map(usr => usr.id);
let nombresDeUsuarios = usuarios.map(usr => usr.nombre);
let apellidosDeUsuarios = usuarios.map(usr => usr.apellido);

//Render Usuarios
renderizarUsuarios(usuarios);
renderAvatar(idUsuarios);

// Buscar Usuarios y Mostrar usuarios
buscarUser(usuarios)


// Validar Inputs Aportar
let idUserAportar = document.getElementById('id-user-aportar');
let montoIngresado = document.getElementById('in-monto');

validarInputId(idUserAportar)
validarInputAportarMonto(montoIngresado);

// Aportar
nuevoAporte(idUserAportar,montoIngresado);



// Historial

// Validar Input ID Buscar Historial.

let idInputHist = document.getElementById('id-user-hist');

validarInputId(idInputHist);


/*
// Agregar nuevo usuario

let maxId = Math.max(...idUsuarios);

const formulario = document.querySelector('form');
formulario.addEventListener('submit', nuevoUser);


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

            Toastify({
                text: `Se agrego el usuario ${data.title} con ID ${data.userId} .`,
                className: 'tamanioLetra',
                style: {
                    background: 'linear-gradient(90deg, rgba(26,250,236,1) 0%, rgba(26,250,150,1) 66%)',
                }
            }).showToast()
        );
};

function nuevoUser(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target))

    const { nombre, apellido, aporte } = data;

    const newUser = new Usuario(maxId + 1, nombre, apellido);
    newUser.aportar(parseFloat(aporte));
    usuarios.push(newUser);
    let aportes = aportesTotalesDeLaApp()
    renderizarUsuarios(usuarios);
    updateLSUsers(usuarios);
    updateLSTotalRecaudacion(aportes);
    renderiazarTotal(aportes);
    
    // UPDATE DE VARIABLES GLOBALES DE LOS ID y NOMBRES
    idUsuarios = usuarios.map(usr => usr.id);
    updateAvatar(idUsuarios);
    nombresDeUsuarios = usuarios.map(usr => usr.nombre);
    apellidosDeUsuarios = usuarios.map(usr => usr.apellido);

    // SIMULO LE POST HACIA UN BACKEND
    enviarNuevoUser(newUser);
    document.querySelector('form').reset()


}

*/

