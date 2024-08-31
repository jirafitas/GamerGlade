document.querySelectorAll('button[name="btnAccion"]').forEach((button) => {
  button.addEventListener("click", function () {
    const card = this.closest(".card");
    const title = card.querySelector("samp").textContent;
    const price = card.querySelector(".card-title").textContent.replace(/[$,.]/g, "").replace(".", "");
    const imgSrc = card.querySelector(".card-img-top").src;

    addItemToCart(title, price, imgSrc);
    updateCounterCart();
  });
});

// Agregar producto al carrito
function addItemToCart(title, price, imgSrc) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Buscar si el producto ya está en el carrito
  const existingItem = cartItems.find((item) => item.title === title);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ title, price, imgSrc, quantity: 1 });
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateCartModal();
  updateCounterCart();
}

// Actualiza el modal del carrito
function updateCartModal() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = "";

  let total = 0;

  cartItems.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${item.imgSrc}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: cover;"></td>
      <td>${item.title}</td>
      <td>$${parseInt(item.price).toLocaleString()}</td>
      <td>
        <button class="btn btn-sm btn-dark" onclick="changeQuantity('${item.title}', -1)">-</button>
        <span class="mx-2 cantidad-producto">${item.quantity}</span>
        <button class="btn btn-sm btn-dark" onclick="changeQuantity('${item.title}', 1)">+</button>
      </td>
      <td>$${parseInt(itemTotal).toLocaleString()}</td>
      <td><button class="btn btn-danger btn-sm" onclick="removeItemFromCart('${item.title}')">Eliminar</button></td>
    `;
    cartItemsContainer.appendChild(row);
  });

  document.getElementById("total-price").textContent = `${total.toLocaleString()}`;
}

// Cambiar la cantidad de un producto
function changeQuantity(title, change) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const item = cartItems.find((item) => item.title === title);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cartItems = cartItems.filter((item) => item.title !== title);
    }
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateCartModal();
  updateCounterCart();
}

// Eliminar un producto del carrito
function removeItemFromCart(title) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  cartItems = cartItems.filter((item) => item.title !== title);

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateCartModal();
  updateCounterCart();
}

// Actualiza el badge que indica la cantidad de productos
function updateCounterCart() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  let totalProductos = 0;

  cartItems.forEach((item) => {
    totalProductos += item.quantity;
  });

  document.getElementById("cart-count").textContent = totalProductos;
}

// Actualiza el modal y el badge cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  updateCartModal();
  updateCounterCart();
});

