document.getElementById('btnBuscar').addEventListener('click', async () => {
    const query = document.getElementById('inputBuscar').value.trim();
    if (!query) {
        alert('Por favor, ingrese un término de búsqueda.');
        return;
    }

    // Realiza la solicitud a la API de la NASA
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Limpia el contenedor antes de mostrar los nuevos resultados
        const contenedor = document.getElementById('contenedor');
        contenedor.innerHTML = '';

        // Verifica si hay resultados
        if (data.collection.items.length === 0) {
            contenedor.innerHTML = '<p>No se encontraron imágenes.</p>';
            return;
        }

        // Recorre los resultados y crea tarjetas para cada imagen
        data.collection.items.forEach(item => {
            // Extrae la información relevante
            const title = item.data[0].title; // Acceder al título
            const description = item.data[0].description; // Acceder a la descripción
            const date = item.data[0].date_created; // Acceder a la fecha
            const imageUrl = item.links[0].href; // Asegúrate de que hay enlaces

            const card = document.createElement('div');
            card.className = 'card mb-4';
            card.innerHTML = `
                <img src="${imageUrl}" class="card-img-top" alt="${title}">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${description || 'Descripción no disponible.'}</p>
                    <p class="card-text"><small class="text-muted">Fecha: ${date ? new Date(date).toLocaleDateString() : 'Desconocida'}</small></p>
                </div>
            `;
            contenedor.appendChild(card);
        });
    } catch (error) {
        console.error('Error al obtener las imágenes:', error);
        alert('Ocurrió un error al buscar las imágenes. Por favor, intenta de nuevo más tarde.');
    }
});