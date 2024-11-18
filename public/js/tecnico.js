async function agregarTecnico(event) {
  event.preventDefault(); // Prevenir el envío del formulario por defecto

  // Capturar los datos del formulario
  const nom1 = document.getElementById('firstName').value.trim();
  const nom2 = document.getElementById('secondName').value.trim();
  const ape1 = document.getElementById('lastName1').value.trim();
  const ape2 = document.getElementById('lastName2').value.trim();
  const cedula = document.getElementById('idDocument').value.trim();
  const telefono = document.getElementById('phoneNumber').value.trim();

  // Crear el cuerpo de la solicitud
  const data = { nom1, nom2, ape1, ape2, cedula, telefono };

  try {
      const response = await fetch('/tecnicos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      });

      const result = await response.json();
      if (result.success) {
          alert('Técnico agregado exitosamente.');
          document.getElementById('addTechnicianForm').reset(); // Reiniciar el formulario
          bootstrap.Modal.getInstance(document.getElementById('addTechnicianModal')).hide(); // Cerrar modal
          await cargarTecnicos(currentPage); // Recargar la tabla
      } else {
          alert(result.message || 'No se pudo agregar el técnico.');
      }
  } catch (error) {
      console.error('Error al agregar técnico:', error);
      alert('Hubo un error al agregar el técnico.');
    }
}
  
  
  document.addEventListener('DOMContentLoaded', async () => {
    await cargarTecnicos(1); // Iniciar en la página 1

    // Agregar evento al formulario de técnico
    document.getElementById('addTechnicianForm').addEventListener('submit', agregarTecnico);
  });

  let tecnicos = []; // Array global para almacenar los datos de técnicos
  let currentPage = 1; // Página actual
  const rowsPerPage = 8; // Número de filas por páginas

  async function cargarTecnicos(page, url = '/tecnicos') {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error('Error en la respuesta del servidor:', response.status);
        return;
      }
  
      const result = await response.json(); // La respuesta es un array directamente
      console.log('Datos recibidos del servidor:', result);
  
      // Validar si result es un array
      if (Array.isArray(result)) {
        tecnicos = result; // Guardar los técnicos en el array global
        mostrarPagina(page); // Mostrar la página solicitada
      } else {
        console.error('La respuesta no es un array:', result);
        document.querySelector('#tecnicosTable').innerHTML = '<tr><td colspan="8">Error al cargar los técnicos.</td></tr>';
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      alert('Hubo un error al obtener los técnicos. Verifica la conexión con el servidor.');
    }
  }
  
  function mostrarPagina(page) {
    const tecnicosTableBody = document.querySelector('#tecnicosTable'); // Asegúrate de que esto es tbody
    tecnicosTableBody.innerHTML = ''; // Limpiar la tabla
  
    // Calcular los índices inicial y final para la página
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageTecnicos = tecnicos.slice(start, end);
  
    console.log('Técnicos en esta página:', pageTecnicos);
  
    // Rellenar la tabla con los datos de la página actual
    if (pageTecnicos.length > 0) {
      pageTecnicos.forEach(tecnico => {
        const nombreCompleto = `${tecnico.nom1_tec || ''} ${tecnico.nom2_tec || ''} ${tecnico.ape1_tec || ''} ${tecnico.ape2_tec || ''}`.trim();
        const row = document.createElement('tr');
        row.innerHTML = `
          <td><input type="checkbox" /></td>
          <td>${tecnico.id_tecnico || ''}</td>
          <td>${nombreCompleto}</td>
          <td>${tecnico.cedula || ''}</td>
          <td>${tecnico.tel_tec || ''}</td>
        `;
        tecnicosTableBody.appendChild(row);
      });
    } else {
      tecnicosTableBody.innerHTML = '<tr><td colspan="8">No se encontraron técnicos.</td></tr>';
    }
  
    actualizarPaginacion(page);
  }
  
  

  // Actualizar la paginación
  function actualizarPaginacion(page) {
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = ''; // Limpiar la paginación

    const totalPages = Math.ceil(tecnicos.length / rowsPerPage);

    // Botón "Anterior"
    const prev = document.createElement('li');
    prev.className = `page-item ${page === 1 ? 'disabled' : ''}`;
    prev.innerHTML = `<a class="page-link" href="#" onclick="cambiarPagina(${page - 1})">Anterior</a>`;
    pagination.appendChild(prev);

    // Números de página
    for (let i = 1; i <= totalPages; i++) {
      const pageItem = document.createElement('li');
      pageItem.className = `page-item ${i === page ? 'active' : ''}`;
      pageItem.innerHTML = `<a class="page-link" href="#" onclick="cambiarPagina(${i})">${i}</a>`;
      pagination.appendChild(pageItem);
    }

    // Botón "Siguiente"
    const next = document.createElement('li');
    next.className = `page-item ${page === totalPages ? 'disabled' : ''}`;
    next.innerHTML = `<a class="page-link" href="#" onclick="cambiarPagina(${page + 1})">Siguiente</a>`;
    pagination.appendChild(next);
  }

  // Cambiar la página actual
  function cambiarPagina(page) {
    if (page < 1 || page > Math.ceil(tecnicos.length / rowsPerPage)) {
      return; // Salir si la página es inválida
    }
    currentPage = page;
    mostrarPagina(page);
  }

  // Obtener todos los elementos con la clase 'dropdown-item'
  const items = document.querySelectorAll('.dropdown-item');

  // Iterar sobre los elementos y agregar un evento de clic
  items.forEach(item => {
    item.addEventListener('click', function(event) {
      // Prevenir que el enlace realice la acción por defecto
      event.preventDefault();

      // Obtener el valor del atributo 'data-filter'
      const opcionSeleccionada = this.getAttribute('data-filter');
      
      // Determinar la URL de filtrado según la opción seleccionada
      let url = '/tecnicos'; // URL por defecto (sin filtro)
      if (opcionSeleccionada === 'nombre') {
        url = '/tecnicos-filtro1';
      } else if (opcionSeleccionada === 'apellido') {
        url = '/tecnicos-filtro2';
      } else if (opcionSeleccionada === 'primeros20') {
        url = '/tecnicos-filtro3';
      }
      
      // Llamar a la función cargarTecnicos con la URL correspondiente
      cargarTecnicos(1, url); // Cargar la página 1 con el filtro seleccionado
    });
  });

