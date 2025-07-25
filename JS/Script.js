const menuHamburguesa = document.getElementById('menu-hamburguesa');
const nav = document.querySelector('.navegacion');

menuHamburguesa.addEventListener('click', () => {
    nav.classList.hamburguesa('active');
});


const botonesAgregar = document.querySelectorAll('.agregar-carrito');
const carritoContenedor = document.getElementById('carrito-container');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total');
const carritoBtn = document.querySelector('.cart a');

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

carritoBtn.addEventListener('click', (e) => {
  e.preventDefault();
  carritoContenedor.classList.toggle('hidden');
});


function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function renderizarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}
      <button class="eliminar-producto" data-index="${index}">❌</button>
    `;
    listaCarrito.appendChild(li);
    total += item.precio * item.cantidad;
  });

  totalCarrito.textContent = `Total: $${total}`;

  
  
  document.querySelectorAll('.eliminar-producto').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      carrito.splice(index, 1); 
      renderizarCarrito();      
    });
  });
  
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

document.querySelectorAll('.agregar-carrito').forEach(btn => {
btn.addEventListener('click', () => {
  const nombre = btn.dataset.nombre;
  const precio = parseFloat(btn.dataset.precio);

  const productoExistente = carrito.find(p => p.nombre === nombre);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  renderizarCarrito();
  carritoContenedor.classList.remove('hidden'); 
});
});

