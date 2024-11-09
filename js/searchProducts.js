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
            window.location.assign("/shop-details.html");
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
    } else {
        document.getElementById("product-details").innerText = "Product not found.";
    }
}