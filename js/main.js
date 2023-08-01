
function loadLocalStorage(toRun) {

    toRun.then(result => localStorage.setItem('usuarios', JSON.stringify(result)))
        .catch(error => console.log(error))
}

loadLocalStorage(convertListLiteralDeUsuariosAListDeUsuariosAsync())

const usersLocalStorage = JSON.parse(localStorage.getItem('usuarios'))

const usuarios = convertListLiteralDeUsuariosAListDeUsuarios(usersLocalStorage)


renderizarUsuarios(usuarios)

// Funcion que suma todos los aportes ingresados


let storageTotal = (localStorage.getItem('total')) || JSON.stringify(aportesTotalesDeLaApp(usuarios));
let totalDeAportesApp = parseFloat(storageTotal);


function renderiazarTotal(total) {
    let recaudacion = document.getElementById('recaudacion');
    recaudacion.innerText = `$ ${total}`;
};

renderiazarTotal(totalDeAportesApp);

const updateLSTotalRecaudacion = (total) => {
    let saveTotal = JSON.stringify(total);
    localStorage.setItem('total', saveTotal);
};

function updateLSUsers(ususuariosAGuardar) {

    let save = JSON.stringify(ususuariosAGuardar);
    localStorage.setItem('usuarios', save);
};

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

/*
// Validar Input ID Aportar.
let idUserAportar = 0;
let idInputAportar = document.getElementById('id-user');

idInputAportar.onchange = () => {
    idUserAportar = parseInt(idInputAportar.value);
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

let msjAportar = document.getElementById('msj-aporte');

idInputAportar.onkeyup = () => {
    let idUserAportar = parseInt(idInputAportar.value);
    msjAportar.innerText = '';
    validInputID(idUserAportar, idInputAportar);
};

// Validar Input Monto.
let montoIngresado = document.getElementById('in-monto');

montoIngresado.onkeyup = () => {
    if (parseFloat(montoIngresado.value) <= 0) {
        document.getElementById('bt-aportar').disabled = true;
    } else {
        document.getElementById('bt-aportar').disabled = false;
    };
};

// Aportar
let btAportar = document.getElementById('bt-aportar');

btAportar.addEventListener('click', () => {
    if (idValido && parseFloat(montoIngresado.value) > 0) {
        let usuario = getUserByID(idUserAportar)
        usuario.aportar(parseFloat(montoIngresado.value));

        montoIngresado.value = 0;
        idInputAportar.value = '';
        let aportes = aportesTotalesDeLaApp()
        renderizarUsuarios(usuarios);
        updateLSUsers(usuarios);
        updateLSTotalRecaudacion(aportes);
        renderiazarTotal(aportes);
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

// Historial

// Validar Input ID Buscar Historial.
let idUserHist = 0;
let idUserHistValido = false;
let idInputHist = document.getElementById('id-user-hist');
let msjHist = document.getElementById('msj-hist');
let nombreUsuario = document.getElementById('usr-hist-name');
let montoTotal = document.getElementById('usr-monto-total');


idInputHist.onchange = () => {
    idUserHist = parseInt(idInputHist.value);
};

idInputHist.onkeyup = () => {
    let idUserHist = parseInt(idInputHist.value);
    msjHist.innerText = '';
    validInputID(idUserHist, idInputHist);

};

let tablaHist = document.getElementById('tablaHistorial');
function renderHistorialDeAportes(usuario) {
    tablaHist.innerHTML = '';

    for (let aporte of usuario.aportes) {
        tablaHist.innerHTML += `
        <tr>
        <td scope="row">${aporte.idUsr}</td>
        <td>$ ${aporte.monto}</td>
        <td>${aporte.getFechaFormateada()}</td>
        </tr>
        `;
    };
};


let btBuscarHist = document.getElementById('bt-buscar-hist');
btBuscarHist.addEventListener('click', () => {

    if (idUserHistValido) {
        let usuario = getUserByID(idUserHist);
        nombreUsuario.innerText = `${usuario.nombre} ${usuario.apellido}`;
        montoTotal.innerText = `$ ${usuario.aportesTotales()}`
        renderHistorialDeAportes(usuario);

    } else {
        console.log(idUserHistValido)
        Toastify({
            text: "⛔ ID incorrecto, valide por favor.",
            className: 'tamanioLetra',
            style: {
                background: 'linear-gradient(90deg, rgba(255,145,0,1) 3%, rgba(252,80,14,1) 25%, rgba(250,26,26,1) 100%)'
            }
        }).showToast();
    };
    idInputHist.value = '';
});

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

