if(sessionStorage.getItem("usuarioEstaLogueado") == "confirmado"){
    /* Primero obtengo el item con la clave "usuarioEstaLogueado" y me fijo si tiene el valor que yo le asigné 
al loguear al usuario. Si los datos son los que yo le asigné, se va a desplegar toda la página, dando acceso al usuario. Sino entra en el else*/

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function(){
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function(){
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function(){
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    
 //Obtenemos el item definido en login.js con la key userName
 let storedData = localStorage.getItem("userName");

 //Obtenemos los elementos con id user para mostrar el usuario en el html
 let mostrarUser = document.getElementsByClassName("user");

 //Para verificar que se está guardando el nombre de usuario
 console.log(storedData);

 //Agregamos el nombre de usuario al html
  //mostrarUser.textContent(storedData);
 // Agregamos el nombre de usuario al html
 for (let i = 0; i < mostrarUser.length; i++) {
    mostrarUser[i].textContent = storedData;
}
});}

else { 
   /*Si entra al else es porque los datos no se pudo obtener la clave "usuarioEstaLogueado" o esta no tiene el valor "confirmado"*/ 
    window.location.href = "login.html";
}

// Verifico si el usuario está logueado.
const usuarioEstaLogueado = sessionStorage.getItem("usuarioEstaLogueado") === "confirmado";
//Obtengo estos elementos del documento html.
const menuUsuario = document.getElementById("user-menu");
const linkCerrarSesion = document.getElementById("link-cerrarsesion");


if (usuarioEstaLogueado) {
    // Obtenemos el nombre de usuario desde localStorage
    const userName = localStorage.getItem("userName");
    const botonMenuUsuario = document.getElementById("botonMenuUsuario");
    botonMenuUsuario.textContent = userName;

    menuUsuario.style.display = "inline-block";
// Permite que el usuario cierre sesión y lo redirige a la página de inicio de sesión. 
    linkCerrarSesion.addEventListener("click", function (e) {
        e.preventDefault();

        sessionStorage.removeItem("usuarioEstaLogueado");
        localStorage.removeItem("userName");
        window.location.href = "login.html";
    });

} else {
    menuUsuario.style.display = "none";
}



// Verificamos si el usuario ya ha seleccionado un modo previamente
let modoActual = localStorage.getItem('modo');

// Función para cambiar el modo
function cambiarModo() {
    // Obtenemos una referencia al cuerpo (body) del documento
    const body = document.body;
    
    // Obtenemos una referencia al botón con el id 'modoBoton'
    const boton = document.getElementById('modoBoton');

    // Verificar el modo actual y cambiarlo
    if (modoActual === 'noche') {
        // Si el modo actual es "noche", eliminamos la clase 'modo-noche' del cuerpo
        body.classList.remove('modo-noche');

        // Actualizamos el valor del modo en el almacenamiento local a "día"
        localStorage.setItem('modo', 'dia');

        // Cambiamos el texto del botón para indicar que se puede cambiar a Modo Noche
        boton.textContent = 'Cambiar a Modo Noche';

        // Actualizamos la variable 'modoActual' para reflejar el nuevo modo
        modoActual = 'dia';
    } else {
        // Si el modo actual no es "noche" (por defecto es "día"), agregamos la clase 'modo-noche' al cuerpo
        body.classList.add('modo-noche');

        // Actualizamos el valor del modo en el almacenamiento local a "noche"
        localStorage.setItem('modo', 'noche');

        // Cambiamos el texto del botón para indicar que se puede cambiar a Modo Día
        boton.textContent = 'Cambiar a Modo Día';

        // Actualizamos la variable 'modoActual' para reflejar el nuevo modo
        modoActual = 'noche';
    }
}

// Obtenemos una referencia al botón con el id 'modoBoton'
let boton = document.getElementById('modoBoton');

// Asignamos un manejador de eventos al botón para que llame a la función 'cambiarModo' cuando se haga clic
boton.addEventListener('click', cambiarModo); 


