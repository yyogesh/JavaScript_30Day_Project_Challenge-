const products = [
    { id: 1, name: "Smart Watch", price: 199.99, image: "./images/watch.png" },
    { id: 2, name: "Wireless Earbuds", price: 129.99, image: "./images/earbud.png" },
    { id: 3, name: "Tracker", price: 89.99, image: "./images/tracker.jpg" },
    { id: 4, name: "Smart Speaker", price: 79.99, image: "./images/speaker.jpg" },
];

const productList = document.getElementById("product-list");
const cartIcon = document.getElementById("cart-icon");
const cartCount = document.getElementById("cart-count");
const cartSection = document.getElementById("cart");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const checkoutForm = document.getElementById("checkout-form");
const paymentForm = document.getElementById("payment-form");
const showProductsBtn = document.getElementById("show-products-btn");

let cart = [];

function renderProducts() {
    productList.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
         <p>$${product.price.toFixed(2)}</p>
         <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productElement);
    });
}

function addToCart(productId) {
    const product = products.find(product => product.id === productId);
    const existingItem = cart.find(product => product.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    // update cart
    updateCart();
}

function updateCart() {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
       <div>
                    <strong>${item.name}</strong> - $${item.price.toFixed(2)}
                </div>
                <div class="quantity-controls">
                    <button onclick="decreaseQuantity(${item.id})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${item.id})">+</button>
                </div>
                <button onclick="removeFromCart(${item.id})">Remove</button>
    `
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });
    cartTotal.textContent = total.toFixed(2);
}

function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item.quantity > 1) {
        item.quantity--;
        updateCart();
    } else {
        removeFromCart(productId);
    }
}

function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    item.quantity++;
    updateCart();
}


function removeFromCart(productId) {
    cart = cart.filter(item => item.id!== productId);
    updateCart();
}

cartIcon.addEventListener("click", () => {
    productList.classList.add("hidden");
    cartSection.classList.remove("hidden");
    checkoutForm.classList.add("hidden");
});

checkoutBtn.addEventListener("click", () => {
    productList.classList.add("hidden");
    cartSection.classList.add("hidden");
    checkoutForm.classList.remove("hidden");
});

function showProdcutList() {
    productList.classList.remove("hidden");
    cartSection.classList.add("hidden");
    checkoutForm.classList.add("hidden");
}

paymentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // Process payment
    alert("Payment processed successfully!");
    cart = [];
    updateCart();
    showProdcutList();
    paymentForm.reset();
 
});

showProductsBtn.addEventListener("click", showProdcutList);

renderProducts();