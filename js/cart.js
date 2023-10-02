//Obtenemos el item definido en login.js con la key userName
let storedData = localStorage.getItem("userName");

//Obtenemos los elementos con id user para mostrar el usuario en el html
let mostrarUser = document.getElementsByClassName("user");

//Para verificar que se está guardando el nombre de usuario
console.log(storedData);

//Agregamos el nombre de usuario al html
 //mostrarUser.textContent(storedData);
// Agregamos el nombre de usuario al html
for (let i = 0; i < mostrarUser.length; i++) {
   mostrarUser[i].textContent = storedData;
}

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

        // Calcular el subtotal inicial
        const subtotalProducto = costoProducto * cantidadProducto;

        // Crear elementos HTML para mostrar la información
        const carritoInfoContainer = document.getElementById('carrito-info');
        const productoInfo = document.createElement('div');

        productoInfo.innerHTML = `
            <h1>Carrito de Compras</h1>
            <h3 class="text-start">Artículos a comprar<h3/>
            <table>
                <thead id="articulos-carrito">
                 <th> </th>
                 <th>Nombre</th>
                 <th>Costo</th>
                 <th>Cantidad</th>
                 <th>Subtotal</th>
                </thead>
                
                <tbody>
                
                 <th><img src="${imagenProducto}" alt="Producto" width="80%"></th>
                 <th class="fw-normal">${nombreProducto}</th>
                 <th class="fw-normal">${monedaProducto} ${costoProducto} </th>
                 <th><input class="form-control form-control-sm" type="number" value="${cantidadProducto}" id="cantidad-input" ></th>
                 <th><span id="subtotal">${monedaProducto} ${subtotalProducto} </span></th>
                </tbody>
                </table>
            <hr>
            <hr>
            `;

        // Agregar el elemento div al contenedor en la página HTML
        carritoInfoContainer.appendChild(productoInfo);

        // Agregar un controlador de eventos para el campo de entrada de cantidad
        const cantidadInput = document.getElementById('cantidad-input');
        cantidadInput.addEventListener('input', () => {
            const nuevaCantidad = parseInt(cantidadInput.value);
            const nuevoSubtotal = costoProducto * nuevaCantidad;
            
            // Actualizar el contenido del párrafo de subtotal
            const subtotalElement = document.getElementById('subtotal');
            subtotalElement.textContent = `${nuevoSubtotal} ${monedaProducto}`;
        });
    })
    .catch(error => {
        console.error(error);
    });
