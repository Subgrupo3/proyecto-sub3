/*función que recibe un array con los datos, y los muestra en pantalla a través del uso del DOM.
 (Arregle la función para mostrar la lista de productos en el HTML, agregandolé un 
 products) 
*/

let productsArray = [];

 const ORDER_ASC_BY_PRICE = document.getElementById("sortAsc");
 const ORDER_DESC_BY_PRICE = document.getElementById("sortDesc");
 const ORDER_BY_PROD_COUNT = document.getElementById("sortByCount");
 let currentSortCriteria = undefined;
 let minCount = undefined;
 let maxCount = undefined;


 

// Aquí el elemento HTML en donde se mostrará la lista de productos
const productListElement = document.getElementById("product-list-container");

// Verifica si el usuario está logueado
if (sessionStorage.getItem("usuarioEstaLogueado") == "confirmado") {
    // Obtiene el identificador de categoría almacenado en localStorage
    let catID = localStorage.getItem("catID");

    // Aquí verifica si el identificador es válido
    if (catID) {
        // Construí la URL para obtener los productos de las diferentes categorías
        let productsURL = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

        // Realiza la solicitud de datos utilizando la URL actualizada
        
        fetch(productsURL)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                // Asigna los productos obtenidos al array productsArray
                productsArray = data.products;
                //aca
                productsArray.sort((a, b) => b.soldCount - a.soldCount);  // Aquí se ordenaron los productos en ventas de menor a mayor. 
                showProductsList(productsArray);


                // Llama a la función para mostrar la lista de productos en el HTML
                showProductsList(productsArray);
               // Obtiene el nombre de la categoría
            const catName = data.catName; // Asegúrate de que "catName" sea la propiedad correcta en tu objeto de datos

                // Obtén el elemento con el id "titulo"
                const catDescripcion = document.getElementById("catDescripcion");

                // Actualiza el contenido del elemento "titulo" con el nombre de la categoría
                catDescripcion.textContent = `Verás aquí todos los productos de la categoría ${catName}`;


                
            })
            .catch(function(error) {
                console.log("Error al cargar los productos:", error);
            });
    } else {
        console.log("Identificador de categoría no válido");
    }
    
    function setProdID(id) {
        localStorage.setItem("prodID", id);
        window.location = "product-info.html"
};

    /* Función que recibe un array con los datos y los muestra en pantalla a través del uso del DOM.
       Aquí arregle la función para mostrar la lista de productos en el HTML, 
       agregandole un products*/
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

        // Inserta el contenido HTML construido en el elemento productListElement
        productListElement.innerHTML = htmlContentToAppend;
    }

    //Obtener el item definido en login.js con la key userName
    let storedData = localStorage.getItem("userName");

    //Obtenemos los elementos con id user para mostrar el usuario en el html
    let mostrarUser = document.getElementsByClassName("user");

    //Agregamos el nombre de usuario al html
    for (let i = 0; i < mostrarUser.length; i++) {
        mostrarUser[i].textContent = storedData;
    }


    // Eventos que pasan cuando se hace click
    ORDER_ASC_BY_PRICE.addEventListener("click", function() {
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    ORDER_DESC_BY_PRICE.addEventListener("click", function() {
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    ORDER_BY_PROD_COUNT.addEventListener("click", function() {
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
        if (criteria === ORDER_ASC_BY_PRICE)
        {
            result = array.sort(function(a, b) {
                if ( a.cost < b.cost ){ return -1; }
                if ( a.cost > b.cost ){ return 1; }
                return 0;
            });
        }else if (criteria === ORDER_DESC_BY_PRICE){
            result = array.sort(function(a, b) {
                if ( a.cost > b.cost ){ return -1; }
                if ( a.cost < b.cost ){ return 1; }
                return 0;
            });
        }else if (criteria === ORDER_BY_PROD_COUNT){
            result = array.sort(function(a, b) {
                let aCount = parseInt(a.soldCount);
                let bCount = parseInt(b.soldCount);
    
                if ( aCount > bCount ){ return -1; }
                if ( aCount < bCount ){ return 1; }
                return 0;
            });
        }
    return array;
}

//Funcion limpiar
document.getElementById("clearRangeFilterP").addEventListener("click", function(){
    document.getElementById("rangeFilterCountMinP").value = "";
    document.getElementById("rangeFilterCountMaxP").value = "";

    minCount = undefined;
    maxCount = undefined;

    showProductsList();
});

//Funcion filtrar
    document.addEventListener("DOMContentLoaded", function(filtrarPrecio) {
        //Definimos variables con los inputs
        const minPriceInput = document.getElementById("rangeFilterCountMinP");
        const maxPriceInput = document.getElementById("rangeFilterCountMaxP");
        const applyFilterButton = document.getElementById("rangeFilterCountP");
    
        //Lo que pasa cunado se hace click en filtrar
        applyFilterButton.addEventListener("click", applyPriceFilter);
          
        function applyPriceFilter() {
            //Parseamos a int los valores de los input y los asignamos a variables
            const minPrice = parseInt(minPriceInput.value);
            const maxPrice = parseInt(maxPriceInput.value);
            
            // Obtener todos los elementos de producto (debe ser un array, no un NodeList)
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
}});

//Busqueda
document.addEventListener("DOMContentLoaded", function (e) { //Cuando la pagina se cargue

    

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
      const searchTerm = searchInput.value.toLowerCase();//Convertir todas las letras a minusculas

      for (const product of productItems) { 
        const productName = product.querySelector(".mb-1 h4").textContent.toLowerCase(); //Obtener el valor de el nombre de el producto
        const productDescription = product.querySelector(".mb-1 p").textContent.toLowerCase();//Obtener el valor de la descripcion de el producto

        if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {//Si se cumple la condicion, muestra el producto. y sino lo oculta
          product.style.display = "block";
        } else {
          product.style.display = "none";
        }
      }
    }


});

