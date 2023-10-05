//Obtenemos el item definido en login.js con la key userName
let storedData = localStorage.getItem("userName");

// Obtenemos los elementos con la clase "user" para mostrar el usuario en el HTML
let mostrarUser = document.getElementsByClassName("user");

// Para verificar que se está guardando el nombre de usuario
console.log(storedData);

// Obtener el contenedor de información del carrito en el HTML
const carritoInfoContainer = document.getElementById('carrito-info');

// Agregar el nombre de usuario al HTML
for (let i = 0; i < mostrarUser.length; i++) {
   mostrarUser[i].textContent = storedData;
}

document.addEventListener("DOMContentLoaded", function () {

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
            const nombreProducto = carritoData.articles[0].name;
            const costoProducto = carritoData.articles[0].unitCost;
            const cantidadProducto = carritoData.articles[0].count;
            const monedaProducto = carritoData.articles[0].currency;
            const imagenProducto = carritoData.articles[0].image;

            let productName = localStorage.getItem("prodName");
            let productCost = localStorage.getItem("prodCost");
            let productCurrency = localStorage.getItem("prodCurrency");
            let productImage = localStorage.getItem("prodImage");

            console.log(productCost);

            // Calcular el subtotal inicial
            const subtotalProducto = costoProducto * cantidadProducto;
            const subtotalProductoLocal = productCost * cantidadProducto;

            // Crear elementos HTML para mostrar la información
            const productoInfo = document.createElement('div');
            productoInfo.innerHTML = `
                
            <div class="container">
            <h1 class="my-4">Carrito de Compras</h1>
        
            <h3 class="text-start">Artículos a comprar</h3>
        
            <div class="row mt-2">
                <div class="col-md-2">
                    <img src="${imagenProducto}" alt="Producto" class="img-fluid">
                </div>
                <div class="col-md-2">
                    <p class="fw-normal">${nombreProducto}</p>
                </div>
                <div class="col-md-2">
                    <p class="fw-normal">${monedaProducto} ${costoProducto}</p>
                </div>
                <div class="col-md-2">
                    <input class="form-control form-control-sm" type="number" value="${cantidadProducto}" id="cantidad-input">
                </div>
                <div class="col-md-2">
                    <p><span id="subtotal">${monedaProducto} ${subtotalProducto}</span></p>
                </div>
            </div>
        
            <div class="row mt-2">
                <div class="col-md-2">
                    <img src="${productImage}" alt="Producto" class="img-fluid">
                </div>
                <div class="col-md-2">
                    <p>${productName}</p>
                </div>
                <div class="col-md-2">
                    <p>${productCurrency} ${productCost}</p>
                </div>
                <div class="col-md-2">
                    <input class="form-control form-control-sm" type="number" value="${cantidadProducto}" id="cantidad-input-local">
                </div>
                <div class="col-md-2">
                    <p><span id="subtotal-local">${productCurrency} ${subtotalProductoLocal}</span></p>
                </div>
            </div>
        
            <hr>
            <hr>
        </div>
        
            `;

            // Agregar el elemento div al contenedor en la página HTML
            carritoInfoContainer.appendChild(productoInfo);

            // Agregar un controlador de eventos para el campo de entrada de cantidad del producto
            const cantidadInput = document.getElementById('cantidad-input');
            cantidadInput.addEventListener('input', () => {
                const nuevaCantidad = parseInt(cantidadInput.value);
                const nuevoSubtotal = costoProducto * nuevaCantidad;

                // Actualizar el contenido del párrafo de subtotal
                const subtotalElement = document.getElementById('subtotal');
                subtotalElement.textContent = `${monedaProducto} ${nuevoSubtotal}`;
            });

            // Agregar un controlador de eventos para el campo de entrada de cantidad del producto en el localStorage
            const cantidadInputLocal = document.getElementById('cantidad-input-local');
            cantidadInputLocal.addEventListener('input', () => {
                const nuevaCantidadLocal = parseInt(cantidadInputLocal.value);
                const nuevoSubtotalLocal = productCost * nuevaCantidadLocal;

                // Actualizar el contenido del párrafo de subtotal del producto en el localStorage
                const subtotalElementLocal = document.getElementById('subtotal-local');
                subtotalElementLocal.textContent = `${productCurrency} ${nuevoSubtotalLocal}`;
            });
        })
        .catch(error => {
            console.error(error);
        });

});
