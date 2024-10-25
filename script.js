let todosLosProductos = [];

function obtenerProductos() {
    fetch('https://fakestoreapi.com/products')
        .then(respuesta => respuesta.json())
        .then(productos => {
            todosLosProductos = productos;
            poblarFiltro(productos);
            mostrarProductos(productos);
        });
}

function poblarFiltro(productos) {
    const filtro = document.getElementById('filtroProductos');
    productos.forEach(producto => {
        const opcion = document.createElement('option');
        opcion.value = producto.title;
        opcion.textContent = producto.title;
        filtro.appendChild(opcion);
    });
}

function mostrarProductos(productos) {
    const contenedor = document.getElementById('contenedorProductos');
    contenedor.innerHTML = '';
    productos.forEach(producto => {
        const tarjetaProducto = `
            <div class="col">
                <div class="card h-100">
                    <img src="${producto.image}" class="card-img-top" alt="${producto.title}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.title}</h5>
                        <p class="card-text">$${producto.price.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        `;
        contenedor.innerHTML += tarjetaProducto;
    });
}

document.getElementById('filtroProductos').addEventListener('change', (evento) => {
    const productoSeleccionado = evento.target.value;
    if (productoSeleccionado === 'todos') {
        mostrarProductos(todosLosProductos);
    } else {
        const productosFiltrados = todosLosProductos.filter(producto => producto.title === productoSeleccionado);
        mostrarProductos(productosFiltrados);
    }
});

obtenerProductos();