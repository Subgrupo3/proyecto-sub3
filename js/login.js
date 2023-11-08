// Verifica si la información del usuario está en el almacenamiento local al cargar la página
window.addEventListener("load", () => {
  const userName = localStorage.getItem("userName");
  const password = localStorage.getItem("password");
  const unameInput = document.getElementById("uname");
  const pswInput = document.getElementById("psw");

  if (userName) {
    // Si se encuentra el nombre de usuario en el almacenamiento local, llénalo en el campo de nombre de usuario
    unameInput.value = userName;
  }

  if (password) {
    // Si se encuentra la contraseña en el almacenamiento local, llénala en el campo de contraseña
    pswInput.value = password;
  }
});

// Evento submit del formulario
document.getElementById("loginform").addEventListener("submit", (e) => {
  e.preventDefault();

  // Almacena el valor del nombre de usuario y la contraseña ingresados por el usuario
  const userName = document.getElementById("uname").value;
  const password = document.getElementById("psw").value;
  const rememberCheckbox = document.getElementById("remember");

  if (rememberCheckbox.checked) {
    // Si se selecciona "Recuérdame," almacena el nombre de usuario y la contraseña en el almacenamiento local
    localStorage.setItem("userName", userName);
    localStorage.setItem("password", password);
  }

  // Aquí debes realizar la validación real de usuario y contraseña en tu aplicación
  // Reemplaza la siguiente línea con tu lógica de validación
  if (userName !== "" && password !== "") {
    sessionStorage.setItem("usuarioEstaLogueado", "confirmado");
    window.location.href = "index.html";
  } else {
    // Muestra un mensaje de error al usuario, ya que las credenciales son incorrectas
    alert("Credenciales incorrectas. Intente de nuevo.");
  }
});
