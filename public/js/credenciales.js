async function obtenerCredenciales() {
  try {
    const response = await axios.get('/credenciales');
    const credenciales = response.data;

    console.log('Credenciales obtenidas:', credenciales);

    const container = document.getElementById('credenciales-container');
    container.innerHTML = credenciales
      .map(
        (cred) =>
          `<p>Usuario: ${cred.Usr} - Contraseña: ${cred.Contraseña}</p>`
      )
      .join('');
  } catch (error) {
    console.error('Error al obtener credenciales:', error);
  }
}

document.addEventListener('DOMContentLoaded', obtenerCredenciales);
