
function updateLSUsers(ususuariosAGuardar) {
    let save = JSON.stringify(ususuariosAGuardar);
    localStorage.setItem('usuarios', save);
};

const updateLSTotalRecaudacion = (total) => {
    let saveTotal = JSON.stringify(total);
    localStorage.setItem('total', saveTotal);
};