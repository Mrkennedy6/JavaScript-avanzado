// 1. Importar Zod desde un CDN para poder usarlo sin instalar nada
import { z } from "https://cdn.skypack.dev/zod";

// 2. Definir el esquema con las reglas de validación
const schema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("El correo electrónico no es válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

// 3. Obtener el formulario y los elementos donde mostraremos errores
const form = document.getElementById("registration-form");
const errorName = document.getElementById("error-name");
const errorEmail = document.getElementById("error-email");
const errorPassword = document.getElementById("error-password");

// 4. Escuchar el evento de enviar formulario
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Evita que la página se recargue al enviar

  // Limpiar mensajes de error previos
  errorName.textContent = "";
  errorEmail.textContent = "";
  errorPassword.textContent = "";

  // Obtener los valores ingresados en el formulario
  const formData = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    password: form.password.value,
  };

  // Validar los datos con safeParse para no detener el código si hay errores
  const result = schema.safeParse(formData);

  if (result.success) {
    alert("¡Formulario enviado con éxito!");
    form.reset(); // Limpiar formulario
  } else {
    // Mostrar errores en el lugar correspondiente
    result.error.errors.forEach((err) => {
      if (err.path[0] === "name") errorName.textContent = err.message;
      if (err.path[0] === "email") errorEmail.textContent = err.message;
      if (err.path[0] === "password") errorPassword.textContent = err.message;
    });
  }
});

