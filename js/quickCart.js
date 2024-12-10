// Search functionality
function searchProduct() {
    // Clear previous search data from localStorage
    localStorage.removeItem("selectedProduct");

    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const productList = [
        { name: "laptop", productName: "DELL Laptop", productDescription: "The 1920 x 1080 resolution boasts impressive color and clarity. " + 
        "IPS technology for wide viewing angles. Energy-efficient LED backlight. Designed with tiny rubber feet and bumpers on the hinge " + 
        "that keep it from skidding and provide additional stability.", price: 600, image: "img/electronics/laptop.jpg" },
        { name: "airpods", productName: "Apple Airpods", productDescription: "PIONEERING HEARING — AirPods Pro 2 unlock the world’s first " + 
        " all-in-one hearing health experience: a scientifically validated Hearing Test,* clinical-grade and active Hearing Protection.*", price: 200, 
        image: "img/electronics/airpods.jpg" },
        { name: "iphone", productName: "iPhone 14 Pro", productDescription: "The iPhone 14 display has rounded corners that follow a beautiful " + 
        "curved design, and these corners are within a standard rectangle. When measured as a standard rectangular shape, the screen is 6.06 inches " + 
        "diagonally (actual viewable area is less). iPhone 14 Plus. Super Retina XDR display.", price: 700, 
        image: "img/electronics/iphone.jpg" },
        // Add more products as needed
    ];
    
    const result = productList.find(product => product.name === searchInput);
    if (result) {
        // Store the product details in localStorage as a string
        localStorage.setItem("selectedProduct", JSON.stringify(result));
        
        // Redirect to the product page
        setTimeout(() => {
            window.location.assign("/QuickCart/shop-details.html");
            // window.location.assign("/shop-details.html");
        }, 10); 
    } else {
        alert("Product not found.");
    }

}


// Function to display product details on shop-details.html
function displayProductDetails() {
    const product = JSON.parse(localStorage.getItem("selectedProduct"));
    
    if (product) {
        document.getElementById("product-name").innerText = product.productName;
        document.getElementById("product-image").src = product.image;
        document.getElementById("product-description").innerText = product.productDescription;
        document.getElementById("product-price").innerText = `$${product.price}`;
    } 
}


// ------ Add to Cart functionality ----

// Initialize cart from localStorage or start with an empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to update the cart count in the UI
function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");

    if (cartCountElement) {
        cartCountElement.innerText = cart.reduce((acc, item) => acc + item.quantity, 0);
    }
}

// Function to save cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart () {
     // Redirect to the shopping cart page
     setTimeout(() => {
        window.location.assign("/QuickCart/shoping-cart.html");
        // window.location.assign("/shoping-cart.html");
    }, 10); 
}

// Function to increment item quantity or add it to cart if it doesn't exist
function incrementItem(productName, productPrice, productImage) {
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        // If the product exists, increase the quantity
        existingProduct.quantity += 1;
    } else {
        // If it's a new product, add it with quantity of 1
        cart.push({ name: productName, image: productImage, price: parseFloat(productPrice.replace("$", "")), quantity: 1 });
    }

    // Update cart count and save to localStorage
    updateCartCount();
    saveCartToLocalStorage();
}

// Function to decrement item quantity or remove it from the cart if quantity reaches 0
function decrementItem(productName) {
    const productIndex = cart.findIndex(item => item.name === productName);

    if (productIndex > -1) {
        if (cart[productIndex].quantity > 1) {
            // Decrease quantity if more than 1
            cart[productIndex].quantity -= 1;
        } else {
            // Remove product if quantity is 1
            cart.splice(productIndex, 1);
        }

        updateCartCount();
        saveCartToLocalStorage();
    }
}

// Load cart count on page load
window.onload = updateCartCount;


// ----- Diplsat Cart items functionality ----

// Function to display cart items in shopping-cart.html
function displayCartItems() {
    // Get the cart container element in shopping-cart.html
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = ""; // Clear existing items
    
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    // Display each item in the cart
    cart.forEach(item => {
        const itemRow = document.createElement("tr");

        itemRow.innerHTML = `
                <td class="shoping__cart__item">
                    <img src=${item.image} alt="">
                    <h5>${item.name}</h5>
                </td>
                <td class="shoping__cart__price">
                    $${item.price}
                </td>
                <td class="shoping__cart__quantity">
                    <div class="quantity">
                        <div class="pro-qty">
                            <input type="text" value="${item.quantity}">
                        </div>
                    </div>
                </td>
                <td class="shoping__cart__total">
                    $${Number(item.price) * Number(item.quantity)}
                </td>
                <td class="shoping__cart__item__close">
                    <span class="icon_close"></span>
                </td>
        `;

        cartContainer.appendChild(itemRow);
    });

    // Update total price
    updateTotalPrice();
}

// Function to update total price in shopping-cart.html
function updateTotalPrice() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    document.getElementById("subtotal-price").innerText = `$${total.toFixed(2)}`;
    document.getElementById("total-price").innerText = `$${total.toFixed(2)}`;
}

function displayCheckoutItems() {
    // Get the cart container element in checkout.html
    const cartContainer = document.getElementById("checkout-items");
    cartContainer.innerHTML = ""; // Clear existing items
    
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>No items to checkout!</p>";
        return;
    }

    // Display each item in the cart
    cart.forEach(item => {
        const itemRow = document.createElement("li");

        itemRow.innerHTML = `
            ${item.name} <span>$${Number(item.price) * Number(item.quantity)}</span>
        `;

        cartContainer.appendChild(itemRow);
    });

    // Update total price
    updateTotalPrice();
}

// Call displayCartItems when the page loads
if (window.location.pathname.endsWith("/shoping-cart.html")) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', displayCartItems);
    } else {
        displayCartItems();
    }
}


// Call display checkout items when the page loads
if (window.location.pathname.endsWith("/checkout.html")) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', displayCheckoutItems);
    } else {
        displayCheckoutItems();
    }
}

function placeOrder() {

    localStorage.removeItem('cart');
    localStorage.removeItem('selectedProduct');
    
    alert("Your order has been placed!");

    // Redirect to the product page
    setTimeout(() => {
        window.location.assign("/QuickCart/index.html");
        // window.location.assign("/index.html");
    }, 0.5); 
}


 // Function to toggle between login and register forms
 function showForm(formType) {
    // Hide both forms
    document.getElementById('login-form').classList.remove('active');
    document.getElementById('register-form').classList.remove('active');
    
    // Remove active class from both tabs
    document.getElementById('login-tab').classList.remove('active');
    document.getElementById('register-tab').classList.remove('active');
    
    // Show the selected form and add active class to the corresponding tab
    if (formType === 'login') {
        document.getElementById('login-form').classList.add('active');
        document.getElementById('login-tab').classList.add('active');
    } else {
        document.getElementById('register-form').classList.add('active');
        document.getElementById('register-tab').classList.add('active');
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login-btn');
    
    if (loginButton) { // Ensure the login button exists on the page
        // Check if the user is logged in
        if (localStorage.getItem('isLoggedIn') === 'true') {
            loginButton.textContent = 'Sign Out';
            loginButton.onclick = handleSignOut;
        } else {
            loginButton.textContent = 'Log In';
            loginButton.onclick = () => window.location.href = '/QuickCart/login.html'; // Redirect to login page
        }
    }
});

// Function to handle login
function handleLogin(event) {
    event.preventDefault(); // Prevent form from submitting

    // Set isLoggedIn flag to true in local storage
    localStorage.setItem('isLoggedIn', 'true');

    // Redirect to the home page
    window.location.href = '/QuickCart/index.html'; // Replace with the actual home page URL
}

function handleSignOut() {
    // Remove the isLoggedIn flag from local storage and reload the page
    localStorage.removeItem('isLoggedIn');
    window.location.reload();
}

function handleRegister() {
    alert('User account has been created!')
}

function sendMessage() {
    alert( "Your Message has been Sent!" );
}