const input = document.getElementById("ingresar-tarea");
const boton = document.querySelector("button");
const listaDeTareas = document.getElementById("lista-de-tareas");

function agregarTarea() {
    if (input.value) {
        // Crear Tarea
        let tareaNueva = document.createElement("div");
        tareaNueva.classList.add("tarea");

        // Texto ingresado por el usuario
        let texto = document.createElement("p");
        texto.innerText = input.value;
        tareaNueva.appendChild(texto);

        // Crear y agregar contenedor de iconos
        let iconos = document.createElement("div");
        iconos.classList.add("iconos");
        tareaNueva.appendChild(iconos);

        // Iconos
        let completar = document.createElement("i");
        completar.classList.add('bi', 'bi-check-circle-fill', 'icono-completar');
        completar.addEventListener('click', completarTarea);

        let editar = document.createElement("i");
        editar.classList.add('bi', 'bi-pencil-fill', 'icono-editar');
        editar.addEventListener('click', editarTarea);

        let eliminar = document.createElement("i");
        eliminar.classList.add('bi', 'bi-trash3-fill', 'icono-eliminar');
        eliminar.addEventListener('click', eliminarTarea);

        iconos.append(completar, editar, eliminar);

        // Agregar tarea a la lista
        listaDeTareas.appendChild(tareaNueva);

        // Limpiar el input después de agregar la tarea
        input.value = "";
    } else {
        alert("Por favor ingresa una tarea");
    }
}

function completarTarea(e) {
    let tarea = e.target.parentNode.parentNode;
    tarea.classList.toggle('completada');
}

function eliminarTarea(e) {
    let tarea = e.target.parentNode.parentNode;
    tarea.remove();
}

function editarTarea(e) {
    let tarea = e.target.parentNode.parentNode;
    let texto = tarea.querySelector("p");

    // Crear un input para editar
    let inputEditar = document.createElement("input");
    inputEditar.type = "text";
    inputEditar.value = texto.innerText;
    inputEditar.classList.add("input-editar");

    // Reemplazar el texto con el input
    tarea.replaceChild(inputEditar, texto);

    // Evento para guardar la edición al presionar Enter o salir del input
    inputEditar.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            guardarEdicion(inputEditar, tarea);
        }
    });

    inputEditar.addEventListener("blur", () => {
        guardarEdicion(inputEditar, tarea);
    });

    // Coloca el foco en el input
    inputEditar.focus();
}

function guardarEdicion(inputEditar, tarea) {
    let nuevoTexto = inputEditar.value.trim();
    
    if (nuevoTexto) {
        let texto = document.createElement("p");
        texto.innerText = nuevoTexto;
        tarea.replaceChild(texto, inputEditar);
    } else {
        alert("El texto no puede estar vacío");
        inputEditar.focus();
    }
}

boton.addEventListener('click', agregarTarea);

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        agregarTarea();
    }
});

// Se elimina la tarea completada al hacer clic en el icono de eliminar
listaDeTareas.addEventListener('click', (e) => {
    if (e.target.classList.contains('icono-eliminar')) {
        e.target.parentNode.parentNode.remove();
    }
});







