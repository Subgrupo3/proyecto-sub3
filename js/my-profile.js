document.addEventListener("DOMContentLoaded", function() {

//Email
const user = localStorage.getItem("userName"); //Obtengo el correo que se guardo en el localStorage cuando se ingresó
const email = document.getElementById("inputEmail"); //Obtengo el elemento del email 
email.value = user; //Seteo el input de email para el correo que dio el usuario





botonGuardarPerfil.addEventListener("click", function(){ //Lo que pasa cuando hace click en el boton "Guardar cambios"

localStorage.setItem("userName", inputEmail.value); //Se setea el correo del usuario en el local storage con el ingresado en el input correo (Se actualiza el dropdown que muestra el username y el de los comentarios)

})

})


