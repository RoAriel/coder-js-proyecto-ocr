// Uso del Storage
let storageUsers = (localStorage.getItem('usuarios')) || JSON.stringify(baseUsuarios);
let usersParse = JSON.parse(storageUsers);

function convertirAListaDeAportes(userParse) {
    let aportes = [];
    for (let aporteLiteral of userParse.aportes) {
        const aporte = new Aporte(parseInt(aporteLiteral.idUsr), parseFloat(aporteLiteral.monto));
        aporte.fecha = new Date(aporteLiteral.fecha);
        aportes.push(aporte);
    };
    return aportes;
};

function convertirObjLiteralAUsuario(usuariosParse) {
    const usuarios = [];
    for (let userLiteral of usuariosParse) {
        const usuario = new Usuario(parseInt(userLiteral.id), userLiteral.nombre, userLiteral.apellido);
        usuario.aportes = convertirAListaDeAportes(userLiteral);
        usuarios.push(usuario);
    };
    return usuarios;
};

function updateLSUsers(ususuariosAGuardar) {
    
    let save = JSON.stringify(ususuariosAGuardar);
    localStorage.setItem('usuarios', save);
    //storageUsers = (localStorage.getItem('usuarios'));
    //usersParse = JSON.parse(storageUsers);
    //usuarios = convertirObjLiteralAUsuario(usersParse);
};

const updateLSTotalRecaudacion = (total) => {
    let saveTotal = JSON.stringify(total);
    localStorage.setItem('total', saveTotal);
};

function appAportes() {
    let total=0
    usuarios.forEach(usuario => {
        total += usuario.aportesTotales();
    });
    return total;
};

let usuarios = convertirObjLiteralAUsuario(usersParse);
let storageTotal = (localStorage.getItem('total')) || JSON.stringify(appAportes());
let totalDeAportesApp = parseFloat(storageTotal);


let recaudacion = document.getElementById('recaudacion');
const renderiazarTotal=(total)=>{
    recaudacion.innerText = `$ ${total}`;
};

renderiazarTotal(totalDeAportesApp);

// VARIABLES GLOBALES
let idValido = false;
let idUsuarios = usuarios.map(usr => usr.id);
let nombresDeUsuarios = usuarios.map(usr => usr.nombre);
let apellidosDeUsuarios = usuarios.map(usr => usr.apellido);

// FUNCIONES DE RECORRIDO Y USO DE CLASES

function existeUserDeNombre(usrNombre) {
    return (nombresDeUsuarios.includes(usrNombre));
};

function existeUserDeApellido(usrApellido) {
    return (apellidosDeUsuarios.includes(usrApellido));
};

function existeId(usrID) {
    return (idUsuarios.includes(usrID));
};

function getUserByID(idUsr) {
    return usuarios.find(usr => usr.id == idUsr);
};

// USO DEL DOM

let table = document.getElementById('tablaBody');
function renderizarUsuarios(users) {
    table.innerHTML = '';
    for (const usr of users) {

        table.innerHTML += `
        <tr>
        <td scope="row">${usr.id}</td>
        <td>${usr.nombre}</td>
        <td>${usr.apellido}</td>
        <td>$ ${usr.montoDelUtimoAporte()}</td>
        <td>${usr.fechaDelUtimoAporte()}</td>
        </tr>
        `;
    };
};

renderizarUsuarios(usuarios);

// Buscar Usuarios y Mostrar usuarios

let resultados = document.getElementById('resultadosBody');
function renderizarReusltadosDeBusqueda(users) {

    let setUsers = new Set(users);
    resultados.innerHTML = '';

    setUsers.forEach(usr => {
        resultados.innerHTML += `
        <tr>
        <td>${usr.id}</td>
        <td>${usr.nombre}</td>
        <td>${usr.apellido}</td>
        </tr>
        `;
    })
};

let btBuscar = document.getElementById('bt-buscar-usr');
let usrNameBuscado = document.getElementById('name-usr')
let usrApellidoBuscado = document.getElementById('lastName-usr')

btBuscar.addEventListener('click', () => {
    if (existeUserDeNombre(usrNameBuscado.value) || existeUserDeApellido(usrApellidoBuscado.value)) {
        let lista1 = usuarios.filter(usr => usr.nombre === usrNameBuscado.value);
        let lista2 = usuarios.filter(usr => usr.apellido === usrApellidoBuscado.value);
        let usuariosEncontrados = lista1.concat(lista2)
        renderizarReusltadosDeBusqueda(usuariosEncontrados);
        usrNameBuscado.value = '';
        usrApellidoBuscado.value = '';
    } else {
        resultados.innerHTML = '';
        usrNameBuscado.value = '';
        usrApellidoBuscado.value = '';
        Toastify({
            text: "⛔ Usuario no encontrado.",
            className: 'tamanioLetra',
            style: {
                background: 'linear-gradient(90deg, rgba(255,145,0,1) 3%, rgba(252,80,14,1) 25%, rgba(250,26,26,1) 100%)'
            }
        }).showToast();
    };
});

let msjAportar = document.getElementById('msj-aporte');

// Validar Input ID Aportar.
let idUserAportar = 0;
let idInputAportar = document.getElementById('id-user');

idInputAportar.onchange = () => {
   idUserAportar = parseInt(idInputAportar.value);
};

const validInputID =(id,elem)=>{
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
idInputAportar.onkeyup = () => {
    let idUserAportar = parseInt(idInputAportar.value);
    msjAportar.innerText = '';
    validInputID(idUserAportar,idInputAportar);
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
        let aportes = appAportes()
        renderizarUsuarios(usuarios);
        updateLSUsers(usuarios);
        updateLSTotalRecaudacion(aportes);
        renderiazarTotal(aportes);


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
    validInputID(idUserHist,idInputHist);

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

