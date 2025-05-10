// Simulando una base de datos JSON 

let inventario = [
      { titulo: "Cien años de soledad", autor: "Gabriel García Márquez", genero: "Realismo mágico", disponible: true },
  { titulo: "1984", autor: "George Orwell", genero: "Distopía", disponible: true },
  { titulo: "El Principito", autor: "Antoine de Saint-Exupéry", genero: "Fábula", disponible: false }
]

// 1 Funcion para simular lectura asincrona con callback

function leerInventario(callback) {
    setTimeout(() => {
        callback(null, inventario);
        
    }, 500); //Simula retraso de 500 ms
}


// 2. Función para simular escritura asincrona con callback
function escribirInventario(nuevosDatos, callback){
    setTimeout(() =>{
        inventario = nuevosDatos;
        callback(null, "Inventario actualizado correctamente");
    }, 500);
}

// 3. Mostrar todos los libros

function consultarLibros() {
    leerInventario((err, datos) => {
        if (err) return console.error("Error al leer ek inventario");
        console.log("Inventario de libros:");
        datos.forEach((libro, index) => {
            console.log(
                `${index + 1}. ${libro.titulo} - ${libro.autor} [${libro.genero}] - ${libro.disponible ? "Disponible":"prestado"}`
            );
        });
    });
}

// 4. Agregar un nuevo libro
function agregarLibro(libroNuevo){
    leerInventario((err, datos) => {
        if (err) return console.error("Error al leer el inventario");
        datos.push(libroNuevo);
        escribirInventario(datos, (err, mensaje) => {
            if (err) return console.error("Error al guardar el inventario");
            console.log(`Libro agregado: ${libroNuevo.titulo}`);
            console.log(mensaje);
        });
    });
}

// 5. Actualizar disponibilidad de un libro

function actualizarDisponibilidad(tituloBuscado, disponible) {
    leerInventario((err, datos) => {
        if (err) return console.error("Error al leer el inventario");

        const libro = datos.find(l => l.titulo.toLowerCase() === tituloBuscado.toLowerCase());
        if (!libro) return console.log("libro no encontrado");

        libro.disponible = disponible;
        escribirInventario(datos, (err, mensaje) => {
            if (err) return console.error("Error al guardar el inventario");
            console.log(` Disponible actualizada: ${libro.titulo} ahora esta ${disponible ? "disponible" : "prestado"}`);
            console.log(mensaje);
        });
    });
}


// Mostrar todos los libros
consultarLibros();

// Agregar un libro nuevo
agregarLibro({
  titulo: "La sombra del viento",
  autor: "Carlos Ruiz Zafón",
  genero: "Misterio",
  disponible: true
});

// Cambiar disponibilidad
actualizarDisponibilidad("1984", false);