document.addEventListener("DOMContentLoaded", function () {
  const primerNombre = document.getElementById("inputPrimerNombre");
  const segundoNombre = document.getElementById("inputSegundoNombre");
  const primerApellido = document.getElementById("inputPrimerApellido");
  const segundoApellido = document.getElementById("inputSegundoApellido");
  const telefono = document.getElementById("inputTelefono");
  const email = document.getElementById("inputEmail");
  const botonGuardarPerfil = document.getElementById("botonGuardarPerfil");
  const inputImagenPerfil = document.getElementById('inputImagenPerfil');
  const imagenPerfilPreview = document.getElementById('imagenPerfilPreview');

  const user = localStorage.getItem("userName");
  email.value = user;

  const userData = JSON.parse(localStorage.getItem("userData"));

  if (userData) {
    primerNombre.value = userData.primerNombre || "";
    segundoNombre.value = userData.segundoNombre || "";
    primerApellido.value = userData.primerApellido || "";
    segundoApellido.value = userData.segundoApellido || "";
    telefono.value = userData.telefono || "";
    email.value = userData.email || "";
  }

  const userImage = localStorage.getItem("userImage");

  if (userImage) {
    // Si hay una imagen guardada, mostrarla
    imagenPerfilPreview.src = userImage;
  } else {
    // Si no hay imagen guardada, establecer la imagen por defecto directamente
    imagenPerfilPreview.src = './img/UserProfile.png'
  }

  botonGuardarPerfil.addEventListener("click", function (event) {
    event.preventDefault();

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

    if (primerNombre.value.trim() === '' || primerApellido.value.trim() === '' || email.value.trim() === '') {
      alert('Complete los campos obligatorios.');
    } else {
      const imagenBase64 = imagenPerfilPreview.src;
      localStorage.setItem("userImage", imagenBase64);

      alert('Los cambios han sido guardados.');
      window.location.href = window.location.href;
    }
  });

  inputImagenPerfil.addEventListener('change', function () {
    if (inputImagenPerfil.files && inputImagenPerfil.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        imagenPerfilPreview.src = e.target.result;
      };

      reader.readAsDataURL(inputImagenPerfil.files[0]);
    }
  });
});