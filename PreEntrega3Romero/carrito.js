let carrito = [];
let totalCompra = 0;

// Añadir productos al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const nombreProducto = this.getAttribute('data-producto-nombre');
        const precioProducto = Number(this.getAttribute('data-producto-precio'));
        const imagenProducto = this.getAttribute('data-producto-imagen');
        
        console.log("Has añadido " + nombreProducto + " al carrito.");
        
        const productoEnCarrito = carrito.find(producto => producto.nombre === nombreProducto);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
        } else {
            carrito.push({ nombre: nombreProducto, precio: precioProducto, cantidad: 1, imagen: imagenProducto });
        }

        totalCompra += precioProducto;
        actualizarCarritoDOM();
    });
});

function actualizarCarritoDOM() {
    const carritoContainer = document.getElementById('carrito-container');
    carritoContainer.innerHTML = '<h2>Tu carrito de compras</h2><div id="productos-carrito"></div><p id="total-carrito"></p>';
    
    const productosCarritoContainer = document.getElementById('productos-carrito');
    carrito.forEach((producto, index) => {
        const productoElement = document.createElement('div');
        productoElement.classList.add('producto-en-carrito');
        productoElement.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px; margin-right: 10px;">
            <span>${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: €${producto.precio * producto.cantidad}</span>
            <button class="eliminar-producto" data-index="${index}">Eliminar</button>
        `;
        productosCarritoContainer.appendChild(productoElement);
    });

    const totalElement = document.getElementById('total-carrito');
    totalElement.innerText = `Total: €${totalCompra}`;

    document.querySelectorAll('.eliminar-producto').forEach(button => {
        button.addEventListener('click', function() {
            const nombreProducto = carrito[parseInt(this.getAttribute('data-index'))].nombre;
            console.log("Has eliminado " + nombreProducto + " del carrito.");
            eliminarProductoDesdeCarrito(parseInt(this.getAttribute('data-index')));
        });
    });

    if (!document.getElementById('volver-tienda')) {
        const volverBtn = document.createElement('button');
        volverBtn.id = 'volver-tienda';
        volverBtn.innerText = 'Volver a la tienda';
        volverBtn.addEventListener('click', () => {
            document.getElementById('ecommerce-container').style.display = 'block';
            document.getElementById('carrito-container').style.display = 'none';
        });
        carritoContainer.appendChild(volverBtn);
    }
    
    let cantidadProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    document.getElementById('cart-count').innerText = cantidadProductos;
}

function eliminarProductoDesdeCarrito(index) {
    // Ajusta la cantidad si es mayor que 1, o elimina el producto si solo hay uno
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
    } else {
        carrito.splice(index, 1);
    }

    totalCompra = carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);

    actualizarCarritoDOM();
}

document.getElementById('go-to-cart-btn').addEventListener('click', () => {
    const carritoContainer = document.getElementById('carrito-container');
    const ecommerceContainer = document.getElementById('ecommerce-container');
    const isVisible = carritoContainer.style.display === 'block';
    
    carritoContainer.style.display = isVisible ? 'none' : 'block';
    ecommerceContainer.style.display = isVisible ? 'block' : 'none';

    console.log("Tienes en el carrito " + carrito.length + " productos por valor de " + totalCompra + "€.");
});
