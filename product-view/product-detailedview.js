if (localStorage.getItem("userLogin")) {
  let userLogin = JSON.parse(localStorage.getItem("userLogin"));

  let userMenu = document.getElementById("userMenu");
  let userName = document.getElementById("userName");
  userMenu.innerHTML = `
      <a class="user-login" style="display: block;" href="../Login/login.html">Logout</a>`;
  userName.textContent = userLogin.userName;
  userName.style.display = "block";
}
document.querySelector(".user-login").addEventListener("click", function () {
  localStorage.removeItem("userLogin");
  userData[userIndex].status = "inactive";
  localStorage.setItem("userData", JSON.stringify(userData));
});
document.querySelector(".user-icon").addEventListener("click", function () {
  let userMenu = document.getElementById("userMenu");
  if (userMenu.style.display === "none") {
    userMenu.style.display = "flex";
  } else {
    userMenu.style.display = "none";
  }
});

// Lấy sản phẩm từ localStorage

let currentItem = JSON.parse(localStorage.getItem("currentItem"));
let productList = document.getElementById("product-detail");
function render(data) {
  data.forEach(function (product) {
    let productCard = `
        <div class="product-card">
            <img src="${product.img}" alt="${product.name}">
            <h2>${product.productName}</h2>
            <p>${product.price}VND <button class = "buyBtn" data-product-id="${product.id}">Buy Now</button></p>
              </div>
    `;
    productList.innerHTML += productCard;
  });
}
render(currentItem);
let storeItems = JSON.parse(localStorage.getItem("storeItems")) || [];
let cartnumber = document.getElementById("cart-quantity")
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("buyBtn")) {
    // Lấy product ID từ thuộc tính data
    const productId = Number(event.target.dataset.productId); // Chuyển đổi productId thành số
    let productData = JSON.parse(localStorage.getItem("productData")) || [];
    currentItem = productData.filter((product) => product.id === productId);
    storeItems.push(currentItem);}
 
  localStorage.setItem("currentItem", JSON.stringify(currentItem));
  localStorage.setItem("storeItems", JSON.stringify(storeItems));
  cartnumber.textContent =
    storeItems.length;
   
});
