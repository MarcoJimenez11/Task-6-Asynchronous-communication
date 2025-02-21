/*
    Datos de la API
*/
const url = 'https://free-images-api.p.rapidapi.com/v2/cat/1';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'bb6d4e8eacmsh041a1a4660f0414p1d001djsnece24de8c5eb',
        'x-rapidapi-host': 'free-images-api.p.rapidapi.com'
    }
};

/*
    Función para obtener y mostrar las imágenes desde la API
*/
async function fetchAndDisplayImages() {
    try {
        //Recoge los datos de la API
        const response = await fetch(url, options);
        const result = await response.json();
        const results = result['results'];

        const section = document.getElementById('content');
        section.setAttribute('class', 'flex flex-wrap m-8');

        //Por cada imagen, crea una tarjeta con la imagen, descripción y el id como título (no hay título mejor en la API)
        results.forEach(element => {
            const card = document.createElement('section');
            card.setAttribute('class', 'flex flex-col m-8 max-w-xs bg-white shadow-md rounded-lg overflow-hidden transform transition-transform duration-300 hover:shadow-lg hover:-translate-y-1');

            //Imagen
            const image = document.createElement('img');
            image.src = element['image'];
            image.setAttribute('class', 'w-full h-48 object-cover');
            card.appendChild(image);

            //Cuerpo de la tarjeta
            const cardBody = document.createElement('section');
            cardBody.setAttribute('class', 'p-4');

            //Título
            const title = document.createElement('h2');
            title.innerText = element['id'];
            title.setAttribute('class', 'text-xl font-bold mb-2');
            cardBody.appendChild(title);

            //Descripción
            const description = document.createElement('p');
            description.innerText = element['description'];
            description.setAttribute('class', 'text-gray-700 text-base');
            cardBody.appendChild(description);

            card.appendChild(cardBody);
            section.appendChild(card);
        });

        console.log('Elements appended successfully:', section.innerHTML);
    } catch (error) {
        console.error(error);
    }
}

//Descarga inicial de imágenes
fetchAndDisplayImages();

/*
    El observador de intersección comprueba si las imágenes están llegando
    al final de la página para seguir cargando imágenes
*/
const infiniteScrollLimit = document.createElement('section');
document.body.appendChild(infiniteScrollLimit);

const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        fetchAndDisplayImages();
    }
}, {
    rootMargin: '200px'
});

observer.observe(infiniteScrollLimit);