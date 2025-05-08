let orderCount = 0; // contador para IDs

// Función para crear un nuevo pedido
function recibirPedido() {
  orderCount++;
  const orderId = `Pedido #${orderCount}`;
  mostrarPedidoEnInterfaz(orderId);
  prepararPedido(orderId);
}

// Función para mostrar el pedido en la interfaz
function mostrarPedidoEnInterfaz(id) {
  const container = document.getElementById("ordersContainer");

  const orderDiv = document.createElement("div");
  orderDiv.classList.add("order");
  orderDiv.setAttribute("id", id);
  orderDiv.textContent = `${id} - En Proceso...`;

  container.appendChild(orderDiv);
}

// Simula la preparación con Promesa y setTimeout
function simularPreparacion() {
  return new Promise((resolve) => {
    const tiempo = Math.floor(Math.random() * 4000) + 2000; // 2s - 6s
    setTimeout(() => {
      resolve();
    }, tiempo);
  });
}

// Función async que espera la preparación y actualiza el estado
async function prepararPedido(id) {
  await simularPreparacion();
  const pedido = document.getElementById(id);
  pedido.textContent = `${id} - ✅ Completado`;
  pedido.classList.add("completed");
}

// Asociar evento al botón
document.getElementById("addOrderBtn").addEventListener("click", recibirPedido);
