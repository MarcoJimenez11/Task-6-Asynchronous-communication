$(document).ready(function () {
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
    function fetchAndDisplayImages() {
        $.ajax({
            //Recoge los datos de la API
            url: url,
            method: options.method,
            headers: options.headers,
            success: function (result) {
                const results = result['results'];
                const $section = $('#content');
                $section.addClass('flex flex-wrap m-8');

                //Por cada imagen, crea una tarjeta con la imagen, descripción y el id como título (no hay título mejor en la API)
                results.forEach(element => {
                    const $card = $('<section></section>').addClass('flex flex-col m-8 max-w-xs bg-white shadow-md rounded-lg overflow-hidden transform transition-transform duration-300 hover:shadow-lg hover:-translate-y-1');

                    //Imagen
                    const $image = $('<img>').attr('src', element['image']).addClass('w-full h-48 object-cover');
                    $card.append($image);

                    //Cuerpo de la tarjeta
                    const $cardBody = $('<section></section>').addClass('p-4');

                    //Título
                    const $title = $('<h2></h2>').text(element['id']).addClass('text-xl font-bold mb-2');
                    $cardBody.append($title);

                    //Descripción
                    const $description = $('<p></p>').text(element['description']).addClass('text-gray-700 text-base');
                    $cardBody.append($description);

                    $card.append($cardBody);
                    $section.append($card);
                });
            },
            error: function (error) {
                console.error(error);
            }
        });
    }

    //Descarga inicial de imágenes
    fetchAndDisplayImages();

    /*
        El observador de intersección comprueba si las imágenes están llegando
        al final de la página para seguir cargando imágenes
    */
    const $infiniteScrollLimit = $('<section></section>');
    $('body').append($infiniteScrollLimit);

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            fetchAndDisplayImages();
        }
    }, {
        rootMargin: '200px'
    });

    observer.observe($infiniteScrollLimit[0]);
});