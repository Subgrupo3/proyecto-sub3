
function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html"
};

document.addEventListener("DOMContentLoaded", function () {
  
  // Obtenemos el ID del producto guardado en el almacenamiento local
  const productId = localStorage.getItem("prodID");
// Creamos la funcion que detecta el nuemro de estrelas y las muestra en pantalla
  function generateStars(score) {
    let stars = '';
    for(let i = 1; i <= 5; i++) {
        if(i <= score) {
            stars += '<span class="fa fa-star checked"></span>';
        } else {
            stars += '<span class="fa fa-star"></span>';
        }
    }
    return stars;
}

  // Verificamos si se ha guardado un ID de producto
  if (productId) {
    // Construimos la URL para obtener la información del producto
    const productURL = `https://japceibal.github.io/emercado-api/products/${productId}.json`;

    // Realizamos la solicitud GET para obtener la información del producto mediante un fetch
    fetch(productURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (productData) {
        // Accedemos a los campos de información del producto (guiado por la API)
        const productName = productData.name;
        const productDescription = productData.description;
        const productCost = productData.cost;
        const productCurrency = productData.currency;
        const productSoldCount = productData.soldCount;
        const productCategory = productData.category;
        const productImages = productData.images;
        const relatedProducts = productData.relatedProducts;
        const id = productData.id

        // Mostramos la información del producto en el HTML que para eso añadimos el container
        const productInfoContainer = document.getElementById("product-info-container");
        productInfoContainer.innerHTML = `
            <h1 class="text-start">${productName}</h1>
            <hr/>
            <p class="text-start"><strong> Precio:</strong></p>
            <p class="text-start"> ${productCurrency} ${productCost} </p>

            <p class="text-start"><strong> Descripción:</strong></p>
            <p class="text-start"> ${productDescription}</p>

            <p class="text-start"><strong> Categoría:</strong></p>
            <p class="text-start">${productCategory}</p>

            <p class="text-start"><strong> Cantidad de vendidos:</strong></p>
            <p class="text-start">${productSoldCount}</p>

            <p class="text-start"><strong> Imágenes ilustrativas </strong></p>
            
            
            <div>
  <h4>Imágenes del Producto</h4>
  <div id="product-carousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      ${productImages.map((image, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
          <div class="d-flex justify-content-center align-items-center">
            <img src="${image}" alt="Imagen del Producto" class="smaller-image">
          </div>
        </div>
      `).join("")}
    </div>
    <button class="carousel-control-prev bg-secondary" type="button" data-bs-target="#product-carousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Anterior</span>
    </button>
    <button class="carousel-control-next bg-secondary" type="button" data-bs-target="#product-carousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Siguiente</span>
    </button>
  </div>
</div>

<div>
  <h4>Productos Relacionados</h4>
  <div id="related-products-carousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      ${relatedProducts.map((relatedProduct, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
          <div class="d-flex justify-content-center align-items-center">
            <img src="${relatedProduct.image}" alt="${relatedProduct.name}" class="smaller-image" onclick="setProdID('${relatedProduct.id}')">
          </div>
        </div>
      `).join("")}
    </div>
    <button class="carousel-control-prev bg-secondary" type="button" data-bs-target="#related-products-carousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Anterior</span>
    </button>
    <button class="carousel-control-next bg-secondary" type="button" data-bs-target="#related-products-carousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Siguiente</span>
    </button>
  </div>
</div>



          `;
      })
      .catch(function (error) {
        console.error("Error al obtener la información del producto:", error);
      });


      //creamos la constante para la URL de los comentarios.
    const commentsURL = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`;


    fetch(commentsURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (commentsData) {
        // Accedemos a los comentarios de usuarios y los mostramos en el HTML
        const commentsContainer = document.getElementById("comments-container");
        
        let allCommentsHTML = '<h2>Comentarios:</h2>';  // Inicializamos una variable para construir el contenido HTML
    
        for(let comment of commentsData) {
            const cliente = comment.user;
            const fecha = comment.dateTime;
            const comentario = comment.description;
            const puntos = comment.score;
            const starsRepresentation = generateStars(puntos);
            
            // Añadimos el comentario a la variable allCommentsHTML
            allCommentsHTML += `
                <hr>
                <ul>
                    <li>
                        <p>${cliente}    ${fecha} ${starsRepresentation}</p>
                        <p>${comentario}</p>
                    </li>
                </ul>
            `;
        }
    
        // Actualizamos el contenido de commentsContainer con todos los comentarios
        commentsContainer.innerHTML = allCommentsHTML;
    })

      .catch(function (error) {
        console.error("Error al obtener los comentarios:", error);
      });

  } else {
    console.error("No se encontró un ID de producto en el almacenamiento local.");
  }

let btnComentar = document.getElementById("btnComentar");

btnComentar.addEventListener("click", function (){
 let comentarios = document.getElementById("nuevosComentarios");

let nuevoComentario = document.getElementById("comentar").value;
let usuario = localStorage.getItem("userName")
let calificacionNumero = document.getElementById("puntuaciones").value;
let calificacionEstrellas = generateStars(calificacionNumero);

// crea un nuevo objeto `Date`
let today = new Date()

 // obtener la fecha y la hora
var nowFecha = today.toISOString().split('T')[0]
var nowHora = today.toLocaleTimeString();


let comentariosNuevos = "";
comentariosNuevos += `
<hr>
<ul>
    <li>
        <p>${usuario} ${nowFecha} ${nowHora} ${calificacionEstrellas}</p>
        <p>${nuevoComentario}</p>
    </li>
</ul>
`;

comentarios.innerHTML = comentariosNuevos;

})


//Obtener el item definido en login.js con la key userName
let storedData = localStorage.getItem("userName");

//Obtenemos los elementos con id user para mostrar el usuario en el html
let mostrarUser = document.getElementsByClassName("user");

//Agregamos el nombre de usuario al html
for (let i = 0; i < mostrarUser.length; i++) {
  mostrarUser[i].textContent = storedData;
}
});

//join("") se utiliza para unir todos los fragmentos HTML en una sola cadena de texto.//
//map es un método de JavaScript que se utiliza para iterar sobre cada elemento del array//

document.addEventListener("DOMContentLoaded", function () {
  // Resto de tu código JavaScript

  // Inicializar el carrusel de imágenes del producto seleccionado al cargar la página
  var productCarousel = new bootstrap.Carousel(document.getElementById("product-carousel"));

  // Inicializar el carrusel de productos relacionados al cargar la página
  var relatedProductsCarousel = new bootstrap.Carousel(document.getElementById("related-products-carousel"));
});