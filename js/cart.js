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
    cartInfoContainer.innerHTML = '<h2 class="mb-4">Artículos a comprar</h2><p class="text-light bg-danger card">El carrito está vacío.</p>';
  } else {
    // Si hay productos en el carrito, mostrar la tabla
    let cartHTML = '<h2 class="mb-4" id="tituloCarrito">Artículos a comprar</h2>';
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
      cartHTML += `<td><input class="form-control form-control-sm" type="number" value="${product.quantity}" id="cantidad-input-${index}" onchange="updateSubtotalProducto(${index})"></td>`;
      cartHTML += `<td><button class="btn btn-danger" onclick="removeProduct(${index})">Eliminar</button></td>`;

      if (product.currency === 'UYU') { //Si la moneda es UYU
      // Calcula el subtotal en UYU
      const subtotalProductoUYU = product.cost * product.quantity;

      // Convierte el subtotal a USD 
       const subtotalProductoUSD = subtotalProductoUYU / 40;

       product.subtotalProductoUSD = subtotalProductoUSD;

       //Lo agrego
      cartHTML += `<td id="subtotal-${index}">USD ${subtotalProductoUSD.toFixed(2)}</td>`;

      } else{ //Si la poneda es USD
        // Calcula el subtotal del producto
        const subtotalProducto = product.cost * product.quantity;
        product.subtotalProducto = subtotalProducto;
        cartHTML += `<td id="subtotal-${index}">USD ${subtotalProducto.toFixed(2)}</td>`;

      }

      cartHTML += '</tr>';
    }

    cartHTML += '</tbody>';
    cartHTML += '</table>';
    cartHTML += '</div>';

    cartInfoContainer.innerHTML = cartHTML;

  
    // Calcula el subtotalFinal y lo muestra
    const subtotalFinal = calcularSubtotalFinal(cart); //Llama a la función calcularSubtotalFinal() y almacena lo que devuelve en subtotalFinal
    document.getElementById("subtotalFinal").textContent = 'USD ' + subtotalFinal.toFixed(2); //Lo muestra en el elemento con id subtotalFinal

}
}

function calcularSubtotalFinal(cart) {
  let subtotalFinal = 0; // Inicializa en 0
  for (const product of cart) { // Recorre los productos del carrito
    if(product.currency === 'UYU'){
      subtotalFinal += product.subtotalProductoUSD;
    } else{
      subtotalFinal += product.subtotalProducto; 
    }
  }
  return subtotalFinal; 
}

function updateSubtotalProducto(index) { //Función que se ejecuta cuando cambia la cantidad de un producto
  
  const quantityInput = document.getElementById(`cantidad-input-${index}`);

  // Obtener el carrito del almacenamiento local
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Actualizar la cantidad en el carrito en localStorage
  cart[index].quantity = parseInt(quantityInput.value);
  localStorage.setItem("cart", JSON.stringify(cart));

  // Accede al objeto product dentro del carrito
  const product = cart[index];


  if (product.currency === 'UYU') { //Si la moneda es UYU

      // Calcula el subtotal en UYU
      const subtotalProductoUYU = product.cost * product.quantity;
  
      // Convierte el subtotal a USD 
      const subtotalProductoUSD = subtotalProductoUYU / 40;
      document.getElementById(`subtotal-${index}`).textContent = 'USD ' + subtotalProductoUSD.toFixed(2);
  
      // Actualiza el subtotal en el producto
      product.subtotalProductoUSD = subtotalProductoUSD;
    } else { // Si la moneda es USD
      // Actualiza el subtotal del producto (de cada producto individual)
      const subtotalProducto = product.cost * product.quantity;
      document.getElementById(`subtotal-${index}`).textContent = 'USD ' + subtotalProducto.toFixed(2);
  
      // Actualiza el subtotal en el producto
      product.subtotalProducto = subtotalProducto;
    }
  
    // Recalcula el subtotalFinal (la suma de los subtotales de los productos)
    const subtotalFinal = calcularSubtotalFinal(cart);
    document.getElementById("subtotalFinal").textContent = 'USD ' + subtotalFinal.toFixed(2);
}

function removeProduct(index) { //Se ejecuta cuando se elimina un producto del carrito

  // Obtener el carrito del almacenamiento local
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Eliminar el producto del carrito por su índice
  cart.splice(index, 1);

  // Guardar el carrito actualizado en localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Volver a mostrar el carrito actualizado
  mostrarCarrito(cart);
}


function validateForm() {
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
  const cardNumber = document.getElementById('cardNumber');
  const securityCode = document.getElementById('securityCode');
  const expirationDate = document.getElementById('expirationDate');
  const accountNumber = document.getElementById('accountNumber');

  if (!paymentMethod) {
    alert('Debes seleccionar un método de pago.');
  } else if (paymentMethod.value === 'credit_card') {
    if (!cardNumber.value || !securityCode.value || !expirationDate.value) {
      alert('Debes completar los campos de la tarjeta de crédito.');
    }
  } else if (paymentMethod.value === 'bank' && !accountNumber.value) {
    alert('Debes completar el campo de número de cuenta.');
  } else {
    alert('Formulario válido. Puedes enviar los datos al servidor.');
  }
}

