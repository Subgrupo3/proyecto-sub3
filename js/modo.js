// Función para cambiar el modo (Día o Noche)
function cambiarModo() {
    const body = document.body; // Obtiene la referencia al elemento <body> del documento
    const boton = document.getElementById('modoBoton'); // Obtiene la referencia al botón de cambio de modo
    let modoActual = localStorage.getItem('modo'); // Obtiene el modo actual almacenado en el almacenamiento local del navegador

    if (modoActual === 'noche') { // Si el modo actual es 'noche'
        body.classList.remove('modo-noche'); // Elimina la clase 'modo-noche' del elemento <body>
        localStorage.setItem('modo', 'dia'); // Establece el modo en 'dia' en el almacenamiento local
        boton.textContent = 'Cambiar a Modo Noche'; // Cambia el texto del botón
        modoActual = 'dia'; // Actualiza el modo actual
    } else { // Si el modo actual no es 'noche' (es 'dia' o es la primera vez)
        body.classList.add('modo-noche'); // Agrega la clase 'modo-noche' al elemento <body>
        localStorage.setItem('modo', 'noche'); // Establece el modo en 'noche' en el almacenamiento local
        boton.textContent = 'Cambiar a Modo Día'; // Cambia el texto del botón
        modoActual = 'noche'; // Actualiza el modo actual
    }
    localStorage.setItem('modo', modoActual); // Almacena el modo actual en el almacenamiento local
}

// Manejador de eventos para el botón de cambio de modo
let boton = document.getElementById('modoBoton'); // Obtiene la referencia al botón de cambio de modo
if (boton) { // Si se encuentra el botón en el documento
    boton.addEventListener('click', cambiarModo); // Agrega un oyente de eventos al botón que llama a la función cambiarModo al hacer clic
}

// Verificar el modo al cargar la página
document.addEventListener('DOMContentLoaded', function () { // Agrega un oyente de eventos para el evento 'DOMContentLoaded' que se dispara cuando el documento ha sido completamente cargado
    let modoActual = localStorage.getItem('modo'); // Obtiene el modo actual almacenado en el almacenamiento local del navegador
    const body = document.body; // Obtiene la referencia al elemento <body> del documento

    if (modoActual === 'noche') { // Si el modo actual es 'noche'
        body.classList.add('modo-noche'); // Agrega la clase 'modo-noche' al elemento <body> para cambiar al modo nocturno
    }
}
)