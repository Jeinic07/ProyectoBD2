document.addEventListener("DOMContentLoaded", function () {
  const togglePassword = document.getElementById("togglePassword");
  const passwordField = document.getElementById("password");

  togglePassword.addEventListener("click", function () {
    // Alterna el tipo de campo entre 'password' y 'text'
    const type = passwordField.type === "password" ? "text" : "password";
    passwordField.type = type;

    // Cambia el ícono del botón dependiendo del tipo de campo
    this.innerHTML = type === "password"
      ? '<i class="bi bi-eye"></i>'
      : '<i class="bi bi-eye-slash"></i>';
  });
});

function disableBack() {
  // Reemplaza el historial actual para que no puedan regresar
  history.pushState(null, null, window.location.href);

  // Escucha el evento `popstate` para evitar ir atrás
  window.onpopstate = function () {
    history.pushState(null, null, window.location.href);
  };
}

const form = document.getElementById("loginForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Validar que los campos no estén vacíos
  if (!username || !password) {
    const errorAlert = document.getElementById("errorAlert");
    errorAlert.style.display = "block";
    errorAlert.textContent = "Por favor completa todos los campos.";
    return;
  }

  fetch("/credenciales")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener los datos del servidor");
      }
      return response.json();
    })
    .then((data) => {
      // data debe ser un arreglo de objetos con usuarios y contraseñas
      const usuarios = data.map((row) => row.Usr);
      const contraseñas = data.map((row) => row.Contraseña);

      // Validar credenciales
      const posicionUsuario = usuarios.indexOf(username);
      if (posicionUsuario !== -1 && contraseñas[posicionUsuario] === password) {
        // Credenciales válidas
        window.location.href = "inicio.html";
        disableBack();
      } else {
        // Credenciales inválidas
        const errorAlert = document.getElementById("errorAlert");
        errorAlert.style.display = "block";
        errorAlert.textContent = "Usuario o contraseña incorrectos.";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Hubo un problema al conectar con el servidor.");
    });
});
