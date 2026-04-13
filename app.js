const CART_KEY = "bazar_don_pedro_cart";

function getCart() {
  const raw = localStorage.getItem(CART_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(item => item.name === product.name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      name: product.name,
      price: product.price,
      qty: 1
    });
  }

  saveCart(cart);
  alert(product.name + " añadido al carrito");
}

function getCartTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function renderCartPage() {
  const cartItemsBox = document.getElementById("cart-items");
  const cartTotalBox = document.getElementById("cart-total");

  if (!cartItemsBox || !cartTotalBox) return;

  const cart = getCart();

  if (cart.length === 0) {
    cartItemsBox.innerHTML = `
      <div class="category-card">
        <h4>Tu carrito está vacío</h4>
        <p>Puedes volver a la tienda y añadir productos de ejemplo.</p>
      </div>
    `;
    cartTotalBox.textContent = "0,00 €";
    return;
  }

  cartItemsBox.innerHTML = cart.map(item => `
    <div class="category-card" style="margin-bottom:18px;">
      <h4>${item.name}</h4>
      <p><strong>Precio:</strong> ${item.price.toFixed(2)} €</p>
      <p><strong>Cantidad:</strong> ${item.qty}</p>
      <p><strong>Total:</strong> ${(item.price * item.qty).toFixed(2)} €</p>
    </div>
  `).join("");

  cartTotalBox.textContent = getCartTotal().toFixed(2).replace(".", ",") + " €";
}

function bindAddToCartButtons() {
  const buttons = document.querySelectorAll("[data-add-demo]");

  buttons.forEach(button => {
    button.addEventListener("click", function () {
      const name = button.getAttribute("data-name");
      const price = parseFloat(button.getAttribute("data-price"));

      addToCart({ name, price });
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  bindAddToCartButtons();
  renderCartPage();
});
