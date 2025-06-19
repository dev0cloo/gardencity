// Product data for modal info
const products = [
  {
    id: 1,
    name: "Garden Trowel",
    price: 12.99,
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=300&q=80",
    desc: "A durable stainless steel trowel, perfect for digging, planting, and potting. Ergonomic handle for comfortable use.",
  },
  {
    id: 2,
    name: "Watering Can",
    price: 18.5,
    img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=300&q=80",
    desc: "Classic metal watering can with a long spout for gentle, even watering. Holds up to 2 liters.",
  },
  {
    id: 3,
    name: "Rose Plant",
    price: 24.0,
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=300&q=80",
    desc: "Beautiful blooming rose plant, perfect for gardens and patios. Comes in a 1-gallon pot.",
  },
  {
    id: 4,
    name: "Sunflower Seeds",
    price: 3.99,
    img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=300&q=80",
    desc: "Premium sunflower seed packets. Grow tall, vibrant sunflowers easily in your garden.",
  },
];

let cart = [];

function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${item.name} (x${item.qty})</span> <span>&#8373;${(
      item.price * item.qty
    ).toFixed(2)} <button class='remove-item' data-id='${
      item.id
    }' title='Remove'>&times;</button></span>`;
    cartItems.appendChild(li);
    total += item.price * item.qty;
  });
  document.getElementById(
    "cart-total"
  ).innerHTML = `Total: <b>&#8373;${total.toFixed(2)}</b>`;
}

function showCartModal() {
  renderCart();
  document.getElementById("cart-modal").style.display = "block";
}

function hideCartModal() {
  document.getElementById("cart-modal").style.display = "none";
}

function showInfoModal(productId) {
  const prod = products.find((p) => p.id === productId);
  if (!prod) return;
  document.getElementById("info-title").textContent = prod.name;
  document.getElementById("info-img").src = prod.img;
  document.getElementById("info-desc").textContent = prod.desc;
  document.getElementById("info-modal").style.display = "block";
}

function hideInfoModal() {
  document.getElementById("info-modal").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  // Add to Cart
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", function () {
      const card = btn.closest(".product");
      const id = parseInt(card.getAttribute("data-id"));
      const prod = products.find((p) => p.id === id);
      if (!prod) return;
      const existing = cart.find((item) => item.id === id);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ ...prod, qty: 1 });
      }
      updateCartCount();
    });
  });
  // Info Modal (on product title click)
  document.querySelectorAll(".product-title.clickable").forEach((title) => {
    title.addEventListener("click", function () {
      const card = title.closest(".product");
      const id = parseInt(card.getAttribute("data-id"));
      showInfoModal(id);
    });
  });
  // Cart button
  document.getElementById("cart-btn").addEventListener("click", showCartModal);
  // Cart modal close
  document
    .getElementById("close-cart")
    .addEventListener("click", hideCartModal);
  // Info modal close
  document
    .getElementById("close-info")
    .addEventListener("click", hideInfoModal);
  // Remove item from cart
  document.getElementById("cart-items").addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-item")) {
      const id = parseInt(e.target.getAttribute("data-id"));
      cart = cart.filter((item) => item.id !== id);
      renderCart();
      updateCartCount();
    }
  });
  // Hide modals on outside click
  window.onclick = function (event) {
    if (event.target === document.getElementById("cart-modal")) hideCartModal();
    if (event.target === document.getElementById("info-modal")) hideInfoModal();
  };
  // Checkout
  document
    .getElementById("checkout-btn")
    .addEventListener("click", function () {
      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }
      alert("Thank you for your purchase! (Demo only)");
      cart = [];
      renderCart();
      updateCartCount();
      hideCartModal();
    });
  document.querySelectorAll(".product").forEach((card) => {
    // Update price display to use Ghana Cedi symbol
    const priceEl = card.querySelector(".product-price");
    if (priceEl) {
      const price = parseFloat(priceEl.textContent.replace(/[^\d.]/g, ""));
      priceEl.innerHTML = `&#8373;${price.toFixed(2)}`;
    }
  });
});
