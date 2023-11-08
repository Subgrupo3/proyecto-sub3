// Definición de constantes para URLs de servicios web
const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

// Función para mostrar un indicador de carga
let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

// Función para ocultar el indicador de carga
let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

// Función para realizar solicitudes HTTP y obtener datos en formato JSON
let getJSONData = function (url) {
  let result = {}; // Objeto para almacenar los resultados de la solicitud
  showSpinner(); // Muestra el indicador de carga
  return fetch(url) // Realiza una solicitud HTTP a la URL especificada
    .then(response => {
      if (response.ok) { // Si la respuesta es exitosa (código de estado HTTP 200)
        return response.json(); // Convierte la respuesta en un objeto JSON
      } else {
        throw Error(response.statusText); // En caso de una respuesta no exitosa, lanza un error
      }
    })
    .then(function (response) {
      result.status = 'ok'; // Establece el estado como 'ok' en el objeto result
      result.data = response; // Almacena los datos de la respuesta en result
      hideSpinner(); // Oculta el indicador de carga
      return result; // Devuelve el objeto result
    })
    .catch(function (error) {
      result.status = 'error'; // Establece el estado como 'error' en el objeto result
      result.data = error; // Almacena información de error en result
      hideSpinner(); // Oculta el indicador de carga
      return result; // Devuelve el objeto result
    });
}
