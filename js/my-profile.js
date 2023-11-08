document.addEventListener("DOMContentLoaded", function () {
  // Obtener referencias a los elementos HTML necesarios
  const primerNombre = document.getElementById("inputPrimerNombre");
  const segundoNombre = document.getElementById("inputSegundoNombre");
  const primerApellido = document.getElementById("inputPrimerApellido");
  const segundoApellido = document.getElementById("inputSegundoApellido");
  const telefono = document.getElementById("inputTelefono");
  const email = document.getElementById("inputEmail");
  const botonGuardarPerfil = document.getElementById("botonGuardarPerfil");

  // Email
  const user = localStorage.getItem("userName"); // Obtengo el correo que se guardó en el localStorage cuando se ingresó

  email.value = user; // Seteo el input de email con el correo que dio el usuario

  // Obtener los datos del usuario almacenados en el localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));

  // Rellenar los campos con los datos almacenados (si están disponibles)
  if (userData) {
    primerNombre.value = userData.primerNombre || "";
    segundoNombre.value = userData.segundoNombre || "";
    primerApellido.value = userData.primerApellido || "";
    segundoApellido.value = userData.segundoApellido || "";
    telefono.value = userData.telefono || "";
    email.value = userData.email || "";
  }

  // Agregar un evento de clic al botón "Guardar Perfil"
  botonGuardarPerfil.addEventListener("click", function (event) {
    event.preventDefault(); // Previene el comportamiento predeterminado del formulario

    // Guardar los datos del usuario en el localStorage
    const userData = {
      primerNombre: primerNombre.value,
      segundoNombre: segundoNombre.value,
      primerApellido: primerApellido.value,
      segundoApellido: segundoApellido.value,
      telefono: telefono.value,
      email: email.value,
    };
    localStorage.setItem("userData", JSON.stringify(userData)); // Almacena los datos del usuario

    // Verificar campos obligatorios
    if (primerNombre.value.trim() === '' || primerApellido.value.trim() === '' || email.value.trim() === '') {
      alert('Complete los campos obligatorios.'); // Muestra una alerta si faltan campos obligatorios
    } else {
      localStorage.setItem("userName", email.value); // Almacena el nombre de usuario (correo)
      alert('Los cambios han sido guardados.'); // Muestra una alerta de que los cambios se han guardado
      window.location.href = window.location.href; // Recarga la página para reflejar los cambios
    }
  });
});
