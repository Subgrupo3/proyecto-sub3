let subtotalFinal = 0;

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
      cartHTML += `<td><input class="form-control form-control-sm" type="number" value="${product.quantity}" id="cantidad-input-${index}" onchange="updateSubtotalProducto(${index}, document.querySelector('input[name=envio]:checked'))"> </td>`; //Se fija en que radiobutton esta seleccionado
      cartHTML += `<td><button class="btn btn-danger" onclick="removeProduct(${index}, document.querySelector('input[name=envio]:checked'))">Eliminar</button></td>`;

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
    subtotalFinal = calcularSubtotalFinal(cart);
    document.getElementById("subtotalFinal").textContent = 'USD ' + subtotalFinal.toFixed(2);

}
}

function calcularSubtotalFinal(cart) {
  subtotalFinal = 0; // Inicializa en 0
  for (const product of cart) { // Recorre los productos del carrito
    if(product.currency === 'UYU'){
      subtotalFinal += product.subtotalProductoUSD;
      console.log(subtotalFinal);
    } else{
      subtotalFinal += product.subtotalProducto; 
    }
  }
  return subtotalFinal; 
}

function updateSubtotalProducto(index, selectedRadioButton) {//Recibe el index del producto y el rabiobutton seleccionado
  const quantityInput = document.getElementById(`cantidad-input-${index}`);

  // Obtener el carrito del almacenamiento local
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Actualizar la cantidad en el carrito en localStorage
  cart[index].quantity = parseInt(quantityInput.value);
  localStorage.setItem("cart", JSON.stringify(cart));

  // Llamar a mostrarCarrito para actualizar la vista
  mostrarCarrito(cart);

   // Llamar a calcularEnvio para actualizar el precio del envio
   calcularEnvio(selectedRadioButton);

}

function removeProduct(index, selectedRadioButton){ //Se ejecuta cuando se elimina un producto del carrito

  // Obtener el carrito del almacenamiento local
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Eliminar el producto del carrito por su índice
  cart.splice(index, 1);

  // Guardar el carrito actualizado en localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Volver a mostrar el carrito actualizado
  mostrarCarrito(cart);

  // Llamar a calcularEnvio para actualizar el precio del envio
  calcularEnvio(selectedRadioButton);
}

function calcularEnvio(radioButton){

  //Obtengo el elemento con id precioEnvio
  let precioEnvio = document.getElementById("precioEnvio");
  let envioFinal = 0; //Inicializo en 0

  //Si premium esta seleccionado
  if (radioButton.value === "premium") {
    console.log('Radio button Premium seleccionado'); //Verificacion interna
    envioFinal = (subtotalFinal * 0.15).toFixed(2); //Calculo el precio del envio
    precioEnvio.textContent = 'USD ' + envioFinal; //Cambio el contenido al subtotal más el porcentaje, con 2 cifras luego de la coma
    calcularTotal(envioFinal); //Llamo a la función que calcula el total
  } //Si express esta seleccionado
  else if (radioButton.value === "express") {
    console.log('Radio button Express seleccionado');//Verificacion interna
    envioFinal = (subtotalFinal * 0.07).toFixed(2);//Calculo el precio del envio
    precioEnvio.textContent = 'USD ' + envioFinal; //Cambio el contenido al subtotal más el porcentaje, con 2 cifras luego de la coma
    calcularTotal(envioFinal); //Llamo a la función que calcula el total
  } //Si standard esta seleccionado
  else if (radioButton.value === "standard") {
    console.log('Radio button Standard seleccionado');//Verificacion interna
    envioFinal = (subtotalFinal * 0.05).toFixed(2);//Calculo el precio del envio
    precioEnvio.textContent = 'USD ' + envioFinal ; //Cambio el contenido al subtotal más el porcentaje, con 2 cifras luego de la coma
    calcularTotal(envioFinal); //Llamo a la función que calcula el total
  }

}

function calcularTotal(envioFinal){ //Recibe el precio del envio

  let total = document.getElementById("total"); //Obtengo el elemento html donde se muestra el total
  let precioTotal = parseFloat(subtotalFinal) + parseFloat(envioFinal); //Sumo el subtotal final con el precio del envio
  total.textContent = 'USD ' + precioTotal; //Actualizo el contenido del total

}

function habilitarCampos(metodoPago) {
  // Obtener los campos de entrada relevantes
  const camposTarjeta = document.querySelectorAll('.campos-tarjeta');
  const camposTransferencia = document.querySelectorAll('.campos-transferencia');
  const metodoPagoSeleccionado = document.getElementById("metodoPagoSeleccionado");

  if (metodoPago === 'credit_card') {
    // Deshabilitar campos de transferencia y agregar el fondo gris
    camposTransferencia.forEach(campo => {
      campo.disabled = true;
      campo.style.backgroundColor = '#ccc'; // Fondo gris
      campo.value = ''; // Borra el contenido del campo
    });

    // Habilitar campos de tarjeta de crédito
    camposTarjeta.forEach(campo => {
      campo.disabled = false;
      campo.style.backgroundColor = ''; // Restablecer el fondo
    })

    metodoPagoSeleccionado.innerHTML = "Tarjeta de Crédito";
  } else if (metodoPago === 'bank') {
    // Deshabilitar campos de tarjeta de crédito y agregar el fondo gris
    camposTarjeta.forEach(campo => {
      campo.disabled = true;
      campo.style.backgroundColor = '#ccc'; // Fondo gris
      campo.value = ''; // Borra el contenido del campo
    });

    // Habilitar campos de transferencia bancaria
    camposTransferencia.forEach(campo => {
      campo.disabled = false;
      campo.style.backgroundColor = ''; // Restablecer el fondo
    });
    
    metodoPagoSeleccionado.innerHTML = "Transferencia bancaria";
  }
}

function validarEnvio(){
 
  const inputCalle = document.getElementById("calle");
  if(inputCalle.value === ""){
      inputCalle.classList.add("is-invalid");
  } else{
    inputCalle.classList.remove("is-invalid");
  }

const inputNumero = document.getElementById("numero")
if(inputNumero.value === ""){
  inputNumero.classList.add("is-invalid");
} else{
inputNumero.classList.remove("is-invalid");
}

const inputEsquina = document.getElementById("esquina")
if(inputEsquina.value ===""){
  inputEsquina.classList.add("is-invalid");
  } else {
  inputEsquina.classList.remove("is-invalid");
  }

  inputCalle.addEventListener("input",function(){
    if(inputCalle.value === ""){
      inputCalle.classList.add("is-invalid");
  } else{
    inputCalle.classList.remove("is-invalid");
  }
})

  inputNumero.addEventListener("input", function(){
    if(inputNumero.value === ""){
      inputNumero.classList.add("is-invalid");
    } else{
    inputNumero.classList.remove("is-invalid");
    }
  })

  inputEsquina.addEventListener("input", function(){
    if(inputEsquina.value ===""){
      inputEsquina.classList.add("is-invalid");
      } else {
      inputEsquina.classList.remove("is-invalid");
      }
  })

}

function validarTipoEnvio(){
  const envioPremium = document.getElementById("envioPremium");
  const envioExpress = document.getElementById("envioExpress");
  const envioStandard = document.getElementById("envioStandard");
  
  const tipoEnvios = document.getElementById("tipoEnvios");

  if((!(envioPremium.checked)) && (!(envioExpress.checked)) && (!(envioStandard.checked))){
    tipoEnvios.classList.add("is-invalid");
    console.log("probando");
  } else{
    tipoEnvios.classList.remove("is-invalid");
  }
}


function validarCamposTarjeta(){

  const metodo = document.getElementById("metodoNoSeleccionado");

  const inputcardNumber = document.getElementById("cardNumber");
  if(inputcardNumber.value === ""){
    console.log("invalido numtarjeta");
    inputcardNumber.classList.add("is-invalid");
    metodo.classList.add("text-danger");
  } else {
    inputcardNumber.classList.remove("is-invalid");
    metodo.classList.remove("text-danger");
  }

const inputSecurityCode = document.getElementById("securityCode");
if(inputSecurityCode.value === ""){
  inputSecurityCode.classList.add("is-invalid");
  metodo.classList.add("text-danger");
} else{
  inputSecurityCode.classList.remove("is-invalid");
  metodo.classList.remove("text-danger");
}

const inputexpirationDate = document.getElementById("expirationDate");
if(inputexpirationDate.value === "") {
  inputexpirationDate.classList.add("is-invalid");
  metodo.classList.add("text-danger");
} else {
  inputexpirationDate.classList.remove("is-invalid"); 
  metodo.classList.remove("text-danger");
}
}


function validarCamposTransferencia(){
  
  const metodo = document.getElementById("metodoNoSeleccionado");
  const inputaccountNumber = document.getElementById ("accountNumber");

  if(inputaccountNumber.value === ""){
    inputaccountNumber.classList.add("is-invalid");
    metodo.classList.add("text-danger");
  } else {
    inputaccountNumber.classList.remove("is-invalid");
    metodo.classList.remove("text-danger");
  }
}

function validarPago(){
  const credito = document.getElementById("credit_card");
  const transferencia = document.getElementById("bank");

  const metodo = document.getElementById("metodoNoSeleccionado");
  
  if((!(credito.checked)) && (!(transferencia.checked))){
    metodo.classList.add("is-invalid");
    metodo.classList.add("text-danger");
  } else{
    metodo.classList.remove("is-invalid");
    metodo.classList.remove("text-danger");
  }

}

function validarCantidad(){
  let cart = JSON.parse(localStorage.getItem("cart"));
  for (const product of cart) { // Recorre los productos del carrito
    if(product.quantity <= 0){
      alert("La cantidad del producto " + product.name + " debe ser mayor a 0");
    }
  }

}

const confirmarCompra = document.getElementById("confirmarCompra");

confirmarCompra.addEventListener("click", function(){

  const credito = document.getElementById("credit_card");
  const transferencia = document.getElementById("bank");

  validarEnvio();
  validarPago();
  validarTipoEnvio();
  validarCantidad();
  if(credito.checked){
    validarCamposTarjeta();
  } else if(transferencia.checked){
    validarCamposTransferencia();
  }

  // Verificar si todas las validaciones han pasado
  const errorFields = document.querySelectorAll('.is-invalid');
  if (errorFields.length === 0) {
    // Todas las validaciones han pasado, muestra una alerta de compra exitosa
    alert("¡Has comprado con éxito!");
    // Aquí puedes redirigir al usuario a otra página o realizar otras acciones posteriores a la compra.
  } else {
    // Algunas validaciones han fallado.
    alert("Por favor, corrige los campos resaltados en rojo antes de volver a confirmar la compra.");
  }

});

