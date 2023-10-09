// En tu archivo cart.js
document.addEventListener("DOMContentLoaded", function () {
    const cartInfoContainer = document.getElementById("carrito-info");
  
    // Obtener el carrito del almacenamiento local
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Verificar si el carrito está vacío
    if (cart.length === 0) {
      cartInfoContainer.innerHTML = '<p class="alert alert-info">El carrito está vacío</p>';
    } else {
      // Construir una tabla de Bootstrap para mostrar los productos en el carrito
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
      cartHTML += '</tr>';
      cartHTML += '</thead>';
      cartHTML += '<tbody>';
  
      for (const product of cart) {
  cartHTML += '<tr>';
  cartHTML += `<td><img src="${product.image}" alt="${product.name}" width="100"></td>`;
  cartHTML += `<td>${product.name}</td>`;
  cartHTML += `<td>${product.currency} ${product.cost.toFixed(2)}</td>`;
  cartHTML += `<td>${product.quantity}</td>`;
  cartHTML += '<td><button class="btn btn-danger" onclick="removeProduct(${cart.indexOf(product)})">Eliminar</button></td>';
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
  