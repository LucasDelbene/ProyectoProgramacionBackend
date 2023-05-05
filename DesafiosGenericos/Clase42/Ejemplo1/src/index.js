//EJEMPLO 1 UTILIZANDO AXIOS (CLASE 42)//

//Basicamente, AXIOS es una biblioteca de JavaScript utilizada para realizar solicitudes HTTP desde el cliente al servidor. Es comúnmente utilizado para realizar solicitudes a APIs RESTful y obtener datos en formato JSON, XML, entre otros. Tambien se utiliza para enviar datos al servidor en formato JSON y otros formatos. Axios es fácil de usar y compatible con una amplia variedad de navegadores y entornos de ejecución de JavaScript//

//IMPORTO axios PARA PODER UTILIZARLO//
import axios from 'axios';

//CON axios YA IMPORTADO, TENGO LA POSIBILIDAD DE YA REALIZAR LAS PETICIONES GET, POST, PUT, DELETE, PATCH, HEAD y OPTIONS//
axios.get; axios.post; axios.put; axios.delete; axios.patch; axios.head; axios.options;

//ESTE CODIGO, DEFINE UNA FUNCION ASÍNCRONA LLAMADA context, QUE UTILIZA LA BIBLIOTECA axios PARA HACER UNA SOLICITUD HTTP A UN SERVIDOR EN 'http://localhost:8080/api/videogames/' y CUANDO SE COMPLETA LA SOLICITUD, SE IMPRIME LA RESPUESTA EN CONSOLA. FINALMENTE, SE LLAMA A LA FUNCION context()//
const context = async()=>{
    const respuesta = await axios.get('http://localhost:8080/api/videogames/')
    console.log(respuesta);
}
context();