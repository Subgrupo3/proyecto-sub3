/* 
   Esta función recibe un array de productos y muestra estos productos en el HTML.
   La función ha sido corregida para mostrar la lista de productos en el contenedor "product-list-container".
*/

let productsArray = [];

const ORDER_ASC_BY_PRICE = document.getElementById("sortAsc");
const ORDER_DESC_BY_PRICE = document.getElementById("sortDesc");
const ORDER_BY_PROD_COUNT = document.getElementById("sortByCount");
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

// Aquí se selecciona el elemento HTML donde se mostrará la lista de productos
const productListElement = document.getElementById("product-list-container");

// Se verifica si el usuario está logueado
if (sessionStorage.getItem("usuarioEstaLogueado") == "confirmado") {
    // Se obtiene el identificador de categoría almacenado en localStorage
    let catID = localStorage.getItem("catID");

    // Se verifica si el identificador es válido
    if (catID) {
        // Se construye la URL para obtener los productos de diferentes categorías
        let productsURL = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

        // Se realiza la solicitud de datos utilizando la URL actualizada
        fetch(productsURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // Se asignan los productos obtenidos al array productsArray
                productsArray = data.products;
                productsArray.sort((a, b) => b.soldCount - a.soldCount);  // Se ordenan los productos por ventas de mayor a menor
                showProductsList(productsArray);

                // Llama a la función para mostrar la lista de productos en el HTML
                showProductsList(productsArray);

                // Se obtiene el nombre de la categoría
                const catName = data.catName;

                // Se obtiene el elemento con el id "catDescripcion"
                const catDescripcion = document.getElementById("catDescripcion");

                // Se actualiza el contenido del elemento "catDescripcion" con el nombre de la categoría
                catDescripcion.textContent = `Verás aquí todos los productos de la categoría ${catName}`;

            })
            .catch(function (error) {
                console.log("Error al cargar los productos:", error);
            });
    } else {
        console.log("Identificador de categoría no válido");
    }

    // Función para establecer el ID de producto en el almacenamiento local y redirigir a la página de información del producto
    function setProdID(id) {
        localStorage.setItem("prodID", id);
        window.location = "product-info.html"
    };

    /* 
       Función que recibe un array de productos y los muestra en el HTML.
       Se utiliza esta función para construir el contenido HTML que muestra la lista de productos.
    */
    function showProductsList(productsArray) {
        let htmlContentToAppend = "";

        for (let i = 0; i < productsArray.length; i++) {
            let product = productsArray[i];

            htmlContentToAppend += `
            <div onclick="setProdID(${product.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" alt="product image" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                                <h4>${product.name} - ${product.currency} ${product.cost}</h4>
                                <p>${product.description}</p>
                            </div>
                            <small class="text-muted">${product.soldCount} vendidos</small>
                        </div>
                    </div>
                </div>
            </div>`;
        }

        // Se inserta el contenido HTML construido en el elemento productListElement
        productListElement.innerHTML = htmlContentToAppend;
    }

    // Obtiene el nombre de usuario almacenado en localStorage
    let storedData = localStorage.getItem("userName");

    // Obtiene los elementos con la clase "user" para mostrar el nombre de usuario en el HTML
    let mostrarUser = document.getElementsByClassName("user");

    // Agrega el nombre de usuario al HTML
    for (let i = 0; i < mostrarUser.length; i++) {
        mostrarUser[i].textContent = storedData;
    }

    // Eventos que ocurren cuando se hace clic en los botones de ordenamiento
    ORDER_ASC_BY_PRICE.addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    ORDER_DESC_BY_PRICE.addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    ORDER_BY_PROD_COUNT.addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });
} else {
    window.location.href = "login.html";
}

// Función para ordenar y mostrar productos
function sortAndShowProducts(sortCriteria) {
    currentSortCriteria = sortCriteria;
    productsArray = sortProducts(currentSortCriteria, productsArray);
    showProductsList(productsArray);
}

// Función para ordenar productos según el criterio
function sortProducts(criteria, array) {
    // Implementa la lógica para ordenar según el criterio
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }
    return result;
}

// Función para limpiar los campos de filtro
document.getElementById("clearRangeFilterP").addEventListener("click", function () {
    document.getElementById("rangeFilterCountMinP").value = "";
    document.getElementById("rangeFilterCountMaxP").value = "";

    minCount = undefined;
    maxCount = undefined;

    showProductsList();
});

// Función para filtrar productos por precio
document.addEventListener("DOMContentLoaded", function (filtrarPrecio) {
    // Se definen variables con los inputs
    const minPriceInput = document.getElementById("rangeFilterCountMinP");
    const maxPriceInput = document.getElementById("rangeFilterCountMaxP");
    const applyFilterButton = document.getElementById("rangeFilterCountP");

    // Lo que sucede cuando se hace clic en el botón de filtrar
    applyFilterButton.addEventListener("click", applyPriceFilter);

    function applyPriceFilter() {
        // Se analizan como enteros los valores de los inputs y se asignan a variables
        const minPrice = parseInt(minPriceInput.value);
        const maxPrice = parseInt(maxPriceInput.value);

        // Se obtienen todos los elementos de producto
        const productItems = productListElement.getElementsByClassName("list-group-item");

        for (const product of productItems) {
            const productPrice = parseInt(product.querySelector(".mb-1 h4").textContent.match(/\d+(\.\d+)?/)[0]);

            if ((isNaN(minPrice) || productPrice >= minPrice) &&
                (isNaN(maxPrice) || productPrice <= maxPrice)) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        }

        showProductsList();
    }
});

// Función para realizar la búsqueda de productos
document.addEventListener("DOMContentLoaded", function (e) {
    const searchInput = document.getElementById("searchInput");
    const productItems = document.getElementsByClassName("list-group-item");

    // Agregar el evento 'input' al campo de búsqueda
    searchInput.addEventListener("input", function (event) {
        const searchTerm = searchInput.value.toLowerCase();

        // Verificar si el evento fue causado por borrar caracteres
        if (event.inputType === "insertFromPaste" || event.inputType === "insertText" || event.inputType === "deleteContentBackward") {
            performSearch(searchTerm);
        }
    });

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();//Convertir todas las letras a minúsculas

        for (const product of productItems) {
            const productName = product.querySelector(".mb-1 h4").textContent.toLowerCase();
            const productDescription = product.querySelector(".mb-1 p").textContent.toLowerCase();

            if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        }
    }
});
