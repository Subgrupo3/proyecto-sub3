document.addEventListener("DOMContentLoaded", function () {
  const primerNombre = document.getElementById("inputPrimerNombre");
  const segundoNombre = document.getElementById("inputSegundoNombre");
  const primerApellido = document.getElementById("inputPrimerApellido");
  const segundoApellido = document.getElementById("inputSegundoApellido");
  const telefono = document.getElementById("inputTelefono");
  const email = document.getElementById("inputEmail");
  const botonGuardarPerfil = document.getElementById("botonGuardarPerfil");

  //Email
  const user = localStorage.getItem("userName"); //Obtengo el correo que se guardo en el localStorage cuando se ingresó

  email.value = user; //Seteo el input de email para el correo que dio el usuario

  

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

  botonGuardarPerfil.addEventListener("click", function (event) {
    event.preventDefault();

    // Guardar los datos del usuario en el localStorage
    const userData = {
      primerNombre: primerNombre.value,
      segundoNombre: segundoNombre.value,
      primerApellido: primerApellido.value,
      segundoApellido: segundoApellido.value,
      telefono: telefono.value,
      email: email.value,
    };
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("userName", email.value);

    // Verificar campos obligatorios.
    if (primerNombre.value.trim() === '' || primerApellido.value.trim() === '' || email.value.trim() === '') {
      alert('Complete los campos obligatorios.');
    } else {
      localStorage.setItem("userName", email.value);
      alert('Los cambios han sido guardados.');
      window.location.href = window.location.href;
    }
  });
});


