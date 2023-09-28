// Función para cambiar el modo
function cambiarModo() {
    const body = document.body;
    const boton = document.getElementById('modoBoton');
    let modoActual = localStorage.getItem('modo');

    if (modoActual === 'noche') {
        body.classList.remove('modo-noche');
        localStorage.setItem('modo', 'dia');
        boton.textContent = 'Cambiar a Modo Noche';
        modoActual = 'dia';
    } else {
        body.classList.add('modo-noche');
        localStorage.setItem('modo', 'noche');
        boton.textContent = 'Cambiar a Modo Día';
        modoActual = 'noche';
    }
    localStorage.setItem('modo', modoActual);
}

// Manejador de eventos para el botón de cambio de modo
let boton = document.getElementById('modoBoton');
if (boton) {
    boton.addEventListener('click', cambiarModo);
}

// Verificar el modo al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    let modoActual = localStorage.getItem('modo');
    const body = document.body;

    if (modoActual === 'noche') {
        body.classList.add('modo-noche');
    }
});
