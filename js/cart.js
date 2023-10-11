document.addEventListener("DOMContentLoaded", function () {
  // Obtener el carrito del almacenamiento local
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Cargar el producto desde el JSON si no está en el carrito
  if (cart.length === 0) {
    fetch("https://japceibal.github.io/emercado-api/user_cart/25801.json")
      .then((response) => response.json())
      .then((carritoData) => {
        const producto = carritoData.articles[0];
        const nombreProducto = producto.name;
        const costoProducto = producto.unitCost;
        const cantidadProducto = producto.count;
        const monedaProducto = producto.currency;
        const imagenProducto = producto.image;

        const initialProduct = {
          name: nombreProducto,
          cost: costoProducto,
          currency: monedaProducto,
          image: imagenProducto,
          quantity: cantidadProducto,
        };

        cart.push(initialProduct);
        localStorage.setItem("cart", JSON.stringify(cart));

        mostrarCarrito(cart);
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    mostrarCarrito(cart);
  }
});

function mostrarCarrito(cart) {
  let cartInfoContainer = document.getElementById("carrito-info");
  
  if (cart.length === 0) {
    // Si el carrito está vacío, mostrar un mensaje
    cartInfoContainer.innerHTML = '<h2 class="mb-4">Carrito de Compras</h2><p class="text-light bg-danger card">El carrito está vacío.</p>';
  } else {
    // Si hay productos en el carrito, mostrar la tabla
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
      cartHTML += `<td><img src="${product.image}" alt="${product.name}" width="100" class="product-image" onclick='localStorage.setItem("prodID", ${product.id}), window.location = "product-info.html"'></td>`;
      cartHTML += `<td>${product.name}</td>`;
      cartHTML += `<td>${product.currency} ${product.cost.toFixed(2)}</td>`;
      cartHTML += `<td><input class="form-control form-control-sm" type="number" value="${product.quantity}" id="cantidad-input-${index}" onchange="updateSubtotalProducto(${index}, ${product.cost})"></td>`;
      cartHTML += `<td><button class="btn btn-danger" onclick="removeProduct(${index})">Eliminar</button></td>`;
      cartHTML += `<td id="subtotal-${index}">${(product.cost * product.quantity).toFixed(2)}</td>`;
      cartHTML += '</tr>';
    }

    cartHTML += '</tbody>';
    cartHTML += '</table>';
    cartHTML += '</div>';

    cartInfoContainer.innerHTML = cartHTML;
  }
}

function removeProduct(index) {
  // Obtener el carrito del almacenamiento local
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Eliminar el producto del carrito por su índice
  cart.splice(index, 1);

  // Guardar el carrito actualizado en localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Volver a mostrar el carrito actualizado
  mostrarCarrito(cart);
}

function updateSubtotalProducto(index, costoProducto) {
  const quantityInput = document.getElementById(`cantidad-input-${index}`);
  const subtotalElement = document.getElementById(`subtotal-${index}`);

  const newQuantity = parseInt(quantityInput.value);
  const newSubtotal = (costoProducto * newQuantity).toFixed(2);

  subtotalElement.textContent = newSubtotal;

  // Actualizar la cantidad en el carrito en localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity = newQuantity;
  localStorage.setItem("cart", JSON.stringify(cart));
}


