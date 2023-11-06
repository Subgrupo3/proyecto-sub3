
/* En index.html tengo un form con el id loginform. Voy a obtener este elemento por su id y 
le agrego el Event Listener de la acción submit que tiene el login. */
document.getElementById("loginform").addEventListener("submit", (e) => {
  e.preventDefault();
  //Almacenamos en el almacenamiento local el valor de nombre de usuario ingresado por el usuario 
  localStorage.setItem("userName", document.getElementById("uname").value);
  /* El prevent default lo que hace es impedir que el navegador realice acciones por default, ya que quiero que realice las acciones en las próximas lineas.*/
  sessionStorage.setItem("usuarioEstaLogueado", "confirmado");
  window.location.href = "index.html";
});
/* SessionStorage me permite almacenar información en la sesión a la que despues vamos a poder acceder en otras partes del código utilizando 
una clave, en este caso "usuarioEstaLogueado". Se le asigna el valor "confirmado" y después en el código voy a buscar que este sea 
el valor que tiene la clave para ver si está logueado o no.*/