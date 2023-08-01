function loadLocalStorage(toRun) {

    toRun.then(result => localStorage.setItem('usuarios', JSON.stringify(result)))
        .catch(error => console.log(error))
}

function updateLSUsers(ususuariosAGuardar) {

    let save = JSON.stringify(ususuariosAGuardar);
    localStorage.setItem('usuarios', save);
};

const updateLSTotalRecaudacion = (total) => {
    let saveTotal = JSON.stringify(total);
    localStorage.setItem('total', saveTotal);
};

loadLocalStorage(convertListLiteralDeUsuariosAListDeUsuariosAsync())

const usersLocalStorage = JSON.parse(localStorage.getItem('usuarios'))