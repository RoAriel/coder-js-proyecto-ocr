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
let maxId = Math.max(...idUsuarios);

//Render Usuarios
renderizarUsuarios(usuarios);
renderAvatar(idUsuarios);

// Buscar Usuarios y Mostrar usuarios
buscarUser(usuarios)


// Aportar
let idUserAportar = document.getElementById('id-user-aportar');
let montoIngresado = document.getElementById('in-monto');

validarInputId(idUserAportar)
validarInputAportarMonto(montoIngresado);
nuevoAporte(idUserAportar,montoIngresado,usuarios);

// Historial
let idInputHist = document.getElementById('id-user-hist');

validarInputId(idInputHist);
buscarHistorial(idInputHist,usuarios)

// Agregar nuevo usuario

const formulario = document.querySelector('form');
nuevoUsuario(formulario);








