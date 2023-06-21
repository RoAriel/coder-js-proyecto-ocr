// VARIABLES GLOBALES

let idValido = false;
let idUsuarios = usuarios.map(usr => usr.id);
let nombresDeUsuarios = usuarios.map(usr => usr.nombre);
let apellidosDeUsuarios = usuarios.map(usr => usr.apellido);

// FUNCIONES DE RECORRIDO Y USO DE CLASES

function existeUserDeNombre(usrNombre, usrApellido) {
    return (nombresDeUsuarios.includes(usrNombre));
};

function existeUserDeApellido(usrApellido) {
    return (apellidosDeUsuarios.includes(usrApellido));
};

function existeId(usrID) {
    return (idUsuarios.includes(usrID));
};

function getUserByName(usrName) {
    return usuarios.find(usr => usr.nombre == usrName);
};

function getUserByApellido(usrApellido) {
    return usuarios.find(usr => usr.apellido == usrApellido);
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
        <td>${usr.id}</td>
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
        usrApellidoBuscado.value ='';
    } else {
        resultados.innerHTML = '';

        resultados.innerHTML += `
            <tr>
            <td>Usuario no encontrado</td>
            <td>N/A</td>
            <td>N/A</td>
            </tr>
            `;
    };


    
});

let msj = document.getElementById('msj-aporte');

// Validar Input ID.
let parseID = 0;
let idIngresado = document.getElementById('id-user');

idIngresado.onchange = ()=>{
    parseID = parseInt(idIngresado.value);
};

console.log(parseID)
idIngresado.onkeyup = () => {
    let parseID = parseInt(idIngresado.value);
    msj.innerText='';
    if (!existeId(parseID)) {
        idIngresado.style.color = 'red';
        idValido=false;
    } else {
        idIngresado.style.color = 'green';
        idValido=true
    };
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



let botonAportar = document.getElementById('bt-aportar');
botonAportar.addEventListener('click', () => {


    if (idValido) {

        getUserByID(parseID).aportar(parseFloat(montoIngresado.value));
        
        montoIngresado.value = 0;
        idIngresado.value='';

        renderizarUsuarios(usuarios);
    } else {
        msj.style.color = 'red';
        msj.innerText = 'ID o Monto incorrecto, valide por favor';

    }
})