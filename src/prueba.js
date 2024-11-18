// URL del endpoint
const apiUrl = '/tecnicos';

// Consumir la API con fetch
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
    return response.json();
  })
  .then(data => {
    const productosDiv = document.getElementById('productos');
    productosDiv.innerHTML = data
      .map(producto => `<p>${producto.nombre} - $${producto.precio}</p>`)
      .join('');
  })
  .catch(error => {
    console.error('Error:', error);
  });
