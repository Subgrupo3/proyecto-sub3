// En tu archivo cart.js
document.addEventListener("DOMContentLoaded", function () {
  const cartInfoContainer = document.getElementById("carrito-info");

  // Obtener el carrito del almacenamiento local
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Verificar si el carrito está vacío
  if (cart.length === 0) {
    cartInfoContainer.innerHTML = '<p class="alert alert-info">El carrito está vacío</p>';
  } else {
    let cartHTML = '<h2 class="mb-4">Carrito de Compras</h2>';
    cartHTML += '<div class="table-responsive">';
    cartHTML += '<table class="table table-striped">';
    cartHTML += '<thead>';
    cartHTML += '<tr>';
    cartHTML += '<th>Imagen</th>';
    cartHTML += '<th>Producto</th>';
    cartHTML += '<th>Precio</th>';
    cartHTML += '<th>Cantidad</th>';
    cartHTML += '<th>Acciones</th>';
    cartHTML += '<th>Subtotal</th>';
    cartHTML += '</tr>';
    cartHTML += '</thead>';
    cartHTML += '<tbody>';

    for (const [index, product] of cart.entries()) {
      cartHTML += '<tr>';
      cartHTML += `<td><img src="${product.image}" alt="${product.name}" width="100"></td>`;
      cartHTML += `<td>${product.name}</td>`;
      cartHTML += `<td>${product.currency} ${product.cost.toFixed(2)}</td>`;
      cartHTML += `<td><input class="form-control form-control-sm" type="number" value="${product.quantity}" id="cantidad-input-${index}" onchange="updateSubtotal(${index})"></td>`;
      cartHTML += `<td><button class="btn btn-danger" onclick="removeProduct(${index})">Eliminar</button></td>`;
      cartHTML += `<td id="subtotal-${index}">${(product.cost * product.quantity).toFixed(2)}</td>`;
      cartHTML += '</tr>';
    }

    cartHTML += '</tbody>';
    cartHTML += '</table>';
    cartHTML += '</div>';

    // Mostrar el contenido del carrito en el contenedor
    cartInfoContainer.innerHTML = cartHTML;
  }
});



// Función para eliminar un producto del carrito
function removeProduct(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1); // Eliminar el producto del carrito
  localStorage.setItem("cart", JSON.stringify(cart)); // Actualizar el carrito en el almacenamiento local
  window.location.reload(); // Recargar la página para reflejar los cambios
}

function productJson() {
  // URL del carrito de compras
  const carritoUrl = 'https://japceibal.github.io/emercado-api/user_cart/25801.json';

  // Realizar la solicitud HTTP GET
  fetch(carritoUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error al obtener el carrito de compras. Código de estado: ${response.status}`);
      }
      return response.json();
    })
    .then(carritoData => {
      const producto = carritoData.articles[0];
      const nombreProducto = producto.name;
      const costoProducto = producto.unitCost;
      const cantidadProducto = producto.count;
      const monedaProducto = producto.currency;
      const imagenProducto = producto.image;

      // Calcular el subtotal inicial
      const subtotalProducto = costoProducto * cantidadProducto;

      // Crear elementos HTML para mostrar la información
      const carritoInfoContainer = document.getElementById('carrito-info');
      const productoInfo = document.createElement('div');

      productoInfo.innerHTML = `
        <table class="table">
          <tbody>
            <tr>
              <td><img src="${imagenProducto}" alt="${nombreProducto}" width="100"></td>
              <td>${nombreProducto}</td>
              <td>${monedaProducto} ${costoProducto}</td>
              <td><input class="form-control form-control-sm" type="number" value="${product.quantity}" id="cantidad-input-${index}" onchange="updateSubtotal(${index})"></td>

              <td><button class="btn btn-danger" onclick="removeProduct(0)">Eliminar</button></td>
              <td id="subtotal-0">${subtotalProducto.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>`;

      // Agregar la información del producto al contenedor del carrito
      carritoInfoContainer.appendChild(productoInfo);
    })
    .catch(error => {
      console.error(error);
    });
}

// Función para actualizar el subtotal cuando se cambie la cantidad
function updateSubtotal(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const quantityInput = document.getElementById(`cantidad-input-${index}`);
  const subtotalElement = document.getElementById(`subtotal-${index}`);

  if (quantityInput && subtotalElement) {
    const newQuantity = parseInt(quantityInput.value);
    const product = cart[index];

    if (!isNaN(newQuantity) && newQuantity >= 0) {
      product.quantity = newQuantity; // Actualizar la cantidad en el objeto del producto
      subtotalElement.textContent = (product.cost * newQuantity).toFixed(2); // Actualizar el subtotal en la tabla
      localStorage.setItem("cart", JSON.stringify(cart)); // Actualizar el carrito en el almacenamiento local
    }
  }
}
