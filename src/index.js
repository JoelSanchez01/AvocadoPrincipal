/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const url = 'https://platzi-avo.vercel.app/api/avo';

const appNode = document.querySelector('#app')

const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: 'USD',
    }).format(price);
    return newPrice;
};

//WEBAPI FETCH
//PASOS: CONECTARNOS AL SERVIDOR
window.fetch(url)
//PROCESAR RESPUESTA Y CONVERTIRLA EN JSON
.then((respuesta) => respuesta.json())
//JSON -> DATA -> RENDERIZAR INFO BROWSER
.then((responseJSON) => {
    responseJSON.data.forEach((item) => {
        console.log(item.name);
    });
});

//PODEMOS MEJORAR EL CODIGO CAMBIANDO PROMESAS POR ASYNC/AWAIT


const fetchData  =  async (API) => {
    const conectar = await window.fetch(API);
    const respuesta = await conectar.json();
    const todos = [];
    try{
        respuesta.data.forEach((item) =>{
            //CREAR IMAGEN
            const imagen = document.createElement('img');
            imagen.src = `https://platzi-avo.vercel.app/${item.image}`;
            imagen.className = 'imgAg';


            const titulo = document.createElement('h2');
            titulo.textContent = item.name;
            titulo.className = 'title';
            
            const precio = document.createElement('div');
            precio.textContent = formatPrice(item.price);
            precio.className = 'price';

            const container = document.createElement('div');
            container.className = 'shadow-lg rounded-2xl w-64 p-4 bg-white relative overflow-hidden';
            container.className += ' container';



            container.append(imagen, titulo, precio);
            todos.push(container);
        })
        appNode.append(...todos);
    }catch(error){
        console.error(error);
    }
}

fetchData(url);