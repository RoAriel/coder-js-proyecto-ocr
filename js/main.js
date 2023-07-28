
// Uso del Storage

let storageUsers = (localStorage.getItem('usuarios')) || JSON.stringify(convertListLiteralDeUsuariosAListDeUsuarios())

let usuarios = convertirObjLiteralAUsuario(usersParse);
let storageTotal = (localStorage.getItem('total')) || JSON.stringify(appAportes());
let totalDeAportesApp = parseFloat(storageTotal);

let recaudacion = document.getElementById('recaudacion');
let resultados = document.getElementById('resultadosBody');

renderizarTotal(totalDeAportesApp);
renderizarUsuarios(usuarios);
updateAvatar(idUsuarios);



let usrNameBuscado = document.getElementById('name-usr')
let usrApellidoBuscado = document.getElementById('lastName-usr')


// Validar Input ID Aportar.
let idUserAportar = 0;
let idInputAportar = document.getElementById('id-user');

idInputAportar.onchange = () => {
    idUserAportar = parseInt(idInputAportar.value);
};

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


// Agregar nuevo usuario

let maxId = Math.max(...idUsuarios);

const formulario = document.querySelector('form');
formulario.addEventListener('submit', nuevoUser);

