document.querySelector(".admin-img").addEventListener("click", function () {
  let adminMenu = document.getElementById("adminMenu");
  if (adminMenu.style.display === "none") {
    adminMenu.style.display = "block";
  } else {
    adminMenu.style.display = "none";
  }
});
// đăng xuất cho admin
document.querySelector(".log-out").addEventListener("click", function () {
  let productData = JSON.parse(localStorage.getItem("productData")) || [];
  productData[0].status = "inactive";
  localStorage.setItem("productData", JSON.stringify(productData));
  localStorage.removeItem("productLogin");
});

// Đặt tên biến----------
let productData = JSON.parse(localStorage.getItem("productData")) || [];
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
        <td>${i + 1}</td>
        <td>${product.id}</td>
        <td>${product.productName}</td>
        <td  style="text-align: center">  <img src="${
          product.img
        }"  style="width: 50%"></td>
        <td>${product.quantity}</td>
        <td>${product.price}</td>
        <td>${product.category}</td>
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

// Tạo sự kiện onchange khi select sort
document.getElementById("sortOption").addEventListener("change", (event) => {
  function compare(a, b) {
    if (event.target.value === "az") {
      return a.productName.localeCompare(b.productName);
    } else if (event.target.value === "za") {
      return b.productName.localeCompare(a.productName);
    } else if (event.target.value === "pricedown") {
      console.log("cc");
      return JSON.stringify(a.price).localeCompare(JSON.stringify(b.price));
    } else if (event.target.value === "priceup") {
      return JSON.stringify(b.price).localeCompare(JSON.stringify(a.price));
    } else if (event.target.value === "category") {
      return JSON.stringify(b.category).localeCompare(JSON.stringify(a.category));
    } else if (event.target.value === "status") {
      return JSON.stringify(b.status).localeCompare(JSON.stringify(a.status));
    }
  }
  productData.sort(compare);
  displayPage(currentPage, productData);
});

// -------------------Tìm kiếm product---------------
document.getElementById("searchButton").addEventListener("click", (event) => {
  event.preventDefault();
  const searchTerm = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase(); // Lowercase search term for case-insensitive matching

  // Get product data (assuming you have a way to retrieve it)
  let productData = JSON.parse(localStorage.getItem("productData")) || [];
  let foundproducts = []; // Initialize an empty array to store matching products

  // Filter product data based on search term
  productData.forEach((product) => {
    const productNameLower = product.productName.toLowerCase();

    if (productNameLower.indexOf(searchTerm) !== -1) {
      foundproducts.push(product); // Add matching product to foundproducts array
    }
  });

  render(foundproducts);
  // Chạy hàm khởi tạo
  displayPage(currentPage, foundproducts);
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
  // Tạo sự kiện onchange khi select sort
  document.getElementById("sortOption").addEventListener("change", (event) => {
    const sortOrder = event.target.value;
    function compare(a, b) {
      if (event.target.value === "az") {
        console.log("az");
        return a.productName.localeCompare(b.productName);
      } else if (event.target.value === "za") {
        console.log("za");
        return b.productName.localeCompare(a.productName);
      }
    }
    foundproducts.sort(compare);
    displayPage(currentPage, foundproducts);
  });
});

// -------------------Quản trị product---------------

// Thêm sự kiện cho nút Update
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("update-button")) {
    // Lấy product ID từ thuộc tính data
    const productId = Number(event.target.dataset.productId); // Chuyển đổi productId thành số

    // Hiển thị form update
    document.getElementById("updateProductForm").style.display = "block";

    // Thêm sự kiện cho nút Submit trong form
    document
      .getElementById("submitUpdate")
      .addEventListener("click", function () {
        // Lấy dữ liệu từ form
        const productname = document.getElementById("productname").value;
        const quantity = document.getElementById("quantity").value;
        const price = document.getElementById("price").value;
        const category = document.getElementById("category").value;
        const fileUpload = document.getElementById("imagelink").value;
        const status = document.getElementById("status").value;

        // Cập nhật productData
        let productData = JSON.parse(localStorage.getItem("productData")) || [];
        productData.forEach((product) => {
          if (product.id === productId) {
            product.productName = productname;
            product.img = fileUpload;
            product.quantity = quantity;
            product.price = price;
            product.category = category;
            product.status = status;
          }
        });

        // Lưu lại productData vào localStorage
        localStorage.setItem("productData", JSON.stringify(productData));

        // Ẩn form update
        document.getElementById("updateProductForm").style.display = "none";
        // Cập nhật bảng
        render(productData);
        // Chạy hàm khởi tạo
        displayPage(currentPage, productData);
      });
    document
      .getElementById("cancelUpdate")
      .addEventListener("click", function () {
        // Ẩn form update
        document.getElementById("updateProductForm").style.display = "none";
      });
  }
});

// Thêm sự kiện cho nút status
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("status-button")) {
    // Lấy product ID từ thuộc tính data
    const productId = Number(event.target.dataset.productId); // Chuyển đổi productId thành số

    // Lấy dữ liệu product từ localStorage
    let productData = JSON.parse(localStorage.getItem("productData")) || [];

    // Tìm product dựa trên productId và thay đổi trạng thái
    productData.forEach((product) => {
      if (product.id === productId) {
        if (product.status === "available") {
          product.status = "unavailable";
          event.target.innerHTML = "Available";
        } else {
          product.status = "available";
          event.target.innerHTML = "Unavailable";
        }
      }
    });

    // Lưu lại dữ liệu product vào localStorage
    localStorage.setItem("productData", JSON.stringify(productData));
    // Cập nhật bảng
    render(productData);
    // Chạy hàm khởi tạo
    displayPage(currentPage, productData);
  }
});

// Thêm sự kiện cho nút Delete
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-button")) {
    // Lấy product ID từ thuộc tính data
    const productId = Number(event.target.dataset.productId); // Chuyển đổi productId thành số

    // Hiển thị hộp thoại xác nhận
    let confirmDelete = confirm("Bạn có chắc chắn muốn xóa không?");

    // Nếu người dùng nhấn OK (confirmDelete === true), thực hiện xóa
    if (confirmDelete) {
      console.log("delete");
      // Xóa product khỏi localStorage
      let productData = JSON.parse(localStorage.getItem("productData")) || [];
      productData = productData.filter((product) => product.id !== productId);
      localStorage.setItem("productData", JSON.stringify(productData));
    }
    // Cập nhật bảng

    render(productData);
    // Chạy hàm khởi tạo
    displayPage(currentPage, productData);
  }
});
// --------------------thêm product------------
document.getElementById("addBtn").addEventListener("click", function (event) {
  // Hiển thị form update
  document.getElementById("updateProductForm").style.display = "block";

  // Thêm sự kiện cho nút Submit trong form
  document
    .getElementById("submitUpdate")
    .addEventListener("click", function () {
      // Lấy dữ liệu từ form
      const productname = document.getElementById("productname").value;
      const quantity = document.getElementById("quantity").value;
      const price = document.getElementById("price").value;
      const category = document.getElementById("category").value;
      const fileUpload = document.getElementById("imagelink").value;
      const status = document.getElementById("status").value;

      // Cập nhật productData
      let newProduct = {
        id: Math.floor(Math.random() * 1000000),
        productName: productname,
        img: fileUpload,
        quantity: quantity,
        price: price,
        category: category,
        status: status,
      };

      productData.push(newProduct);
      localStorage.setItem("productData", JSON.stringify(productData));

      // Ẩn form update
      document.getElementById("updateProductForm").style.display = "none";
      // Cập nhật bảng
      render(productData);
      // Chạy hàm khởi tạo
      displayPage(currentPage, productData);
    }),
    document
      .getElementById("cancelUpdate")
      .addEventListener("click", function () {
        // Ẩn form update
        document.getElementById("updateProductForm").style.display = "none";
      });
});
