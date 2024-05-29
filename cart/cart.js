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
  let storeItems = JSON.parse(localStorage.getItem("storeItems"));

  // Đặt tên biến----------
const tableBody = document.getElementById("categoryBody");
const itemsPerPage = 5; //Số item trên trang phân chia
let currentPage = 1;

// Global render function
function render(data) {
  const tableBody = document.getElementById("categoryBody");
  let stringHTML = "";

  data.forEach((product, i) => {
    stringHTML += `
      <tr>
        <td>${(currentPage-1)*itemsPerPage + i +1}</td>
           <td>${product.productName}</td>
        <td  style="text-align: center">  <img src="${
          product.img
        }"  style="width: 50%"></td>
        <td>${product.quantity}</td>
        <td>${product.price}</td>
        <td>${product.price * }</td>
        <td>${product.status}</td>
        <td>
          ${`
            <button class="action-button update-button" data-product-id="${
              product.id
            }">Update</button>
            <button class="action-button status-button" data-product-id="${
              product.id
            }">${
            product.status === "available" ? "Unavailable" : "Available"
          }</button>
            <button class="action-button delete-button" data-product-id="${
              product.id
            }">Delete</button>
          `}
        </td>
      </tr>`;
  });

  tableBody.innerHTML = stringHTML;
}

// Display page function
function displayPage(page, data) {
  let startIndex = (page - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;
  let pageItems = data.slice(startIndex, endIndex);

  render(pageItems);
  document.querySelector(".current-page").textContent = `Page ${page}`;

  //Cập nhật trạng thái button dựa trên trang hiện tại
  let prevButton = document.querySelector(".prev-page");
  let nextButton = document.querySelector(".next-page");
  prevButton.disabled = page === 1;
  nextButton.disabled = page === Math.ceil(data.length / itemsPerPage);
}

render(productData);
// Chạy hàm khởi tạo
displayPage(currentPage, productData);
// Tạo sự kiện phân trang
document.querySelector(".prev-page").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayPage(currentPage, productData);
  }
});

document.querySelector(".next-page").addEventListener("click", () => {
  if (currentPage < Math.ceil(productData.length / itemsPerPage)) {
    currentPage++;
    displayPage(currentPage, productData);
  }
});
