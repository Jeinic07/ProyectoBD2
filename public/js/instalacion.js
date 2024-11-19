document.addEventListener("DOMContentLoaded", function () {
    const btnRadio1 = document.getElementById("btnradio1");
    const btnRadio2 = document.getElementById("btnradio2");
    const tableContainer = document.getElementById("tableContainer");

    // Mostrar/ocultar la tabla dependiendo del botón seleccionado
    function toggleTableDisplay() {
        if (btnRadio2.checked) {
            tableContainer.style.display = "block"; // Mostrar tabla
        } else {
            tableContainer.style.display = "none"; // Ocultar tabla
        }
    }

    // Escuchar eventos de cambio en los botones
    btnRadio1.addEventListener("change", toggleTableDisplay);
    btnRadio2.addEventListener("change", toggleTableDisplay);

    // Inicializar estado
    toggleTableDisplay();
});

document.addEventListener("DOMContentLoaded", function () {
    const btnRadio1 = document.getElementById("btnradio1");
    const btnRadio2 = document.getElementById("btnradio2");
    const formContainer = document.getElementById("formContainer");
    const tableContainer = document.getElementById("tableContainer");

    // Datos simulados para técnicos y planes (estos deben venir de la base de datos)
    const tecnicos = ["Juan Pérez", "Ana Gómez", "Carlos López"];
    const planes = [
        { nombre: "Básico", precio: 50000 },
        { nombre: "Estándar", precio: 75000 },
        { nombre: "Premium", precio: 100000 },
    ];

    // Llenar select de técnicos
    const tecnicoSelect = document.getElementById("tecnico");
    tecnicos.forEach((tecnico) => {
        const option = document.createElement("option");
        option.value = tecnico;
        option.textContent = tecnico;
        tecnicoSelect.appendChild(option);
    });

    // Llenar select de planes y manejar precio dinámico
    const tipoPlanSelect = document.getElementById("tipoPlan");
    const precioPlanInput = document.getElementById("precioPlan");
    planes.forEach((plan) => {
        const option = document.createElement("option");
        option.value = plan.nombre;
        option.textContent = plan.nombre;
        option.dataset.precio = plan.precio;
        tipoPlanSelect.appendChild(option);
    });

    tipoPlanSelect.addEventListener("change", function () {
        const selectedOption = tipoPlanSelect.selectedOptions[0];
        precioPlanInput.value = selectedOption ? selectedOption.dataset.precio : "";
    });

    // Mostrar/ocultar contenedores según selección de botones
    function toggleContainers() {
        if (btnRadio1.checked) {
            formContainer.style.display = "block";
            tableContainer.style.display = "none";
        } else if (btnRadio2.checked) {
            formContainer.style.display = "none";
            tableContainer.style.display = "block";
        }
    }

    btnRadio1.addEventListener("change", toggleContainers);
    btnRadio2.addEventListener("change", toggleContainers);

    // Estado inicial
    toggleContainers();
});