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
  let userData = JSON.parse(localStorage.getItem("userData")) || [];
  userData[0].status = "inactive";
  localStorage.setItem("userData", JSON.stringify(userData));
  localStorage.removeItem("userLogin");
});

// Global render function
let productData = JSON.parse(localStorage.getItem("productData")) || [];
function render(data) {
  const tableBody = document.getElementById("categoryBody");
  let stringHTML = "";

  data.forEach((user, i) => {
    stringHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.quantity}</td>
        <td>${user.price}</td>
        <td>${user.category}</td>
        <td>${user.status}</td>
        <td>
          ${`
            <button class="action-button update-button" data-user-id="${user.id}">Update</button>
            <button class="action-button block-button" data-user-id="${user.id}">${(user.status === "available")? "Block" : "Unblock"}</button>
            <button class="action-button delete-button" data-user-id="${user.id}">Delete</button>
          `}
        </td>
      </tr>`;
  });

  tableBody.innerHTML = stringHTML;
}

// Define function to display and sort table
function displayAndSortTable(sortOrder) {
  let productData = JSON.parse(localStorage.getItem("productData")) || [];
  const tableBody = document.getElementById("categoryBody");
  const itemsPerPage = 3; //Số item trên trang phân chia

  // Sort function
  function compare(a, b) {
    if (sortOrder === "az") {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === "za") {
      return b.name.localeCompare(a.name);
    }
  }
  let currentPage = 1;
  // Sort productData
  productData.sort(compare);

  // Display page function
  function displayPage(page) {
    let startIndex = (page - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;
    let pageItems = productData.slice(startIndex, endIndex);

    render(pageItems);
    document.querySelector(".current-page").textContent = `Page ${page}`;

    //Cập nhật trạng thái button dựa trên trang hiện tại
    let prevButton = document.querySelector(".prev-page");
    let nextButton = document.querySelector(".next-page");
    prevButton.disabled = page === 1;
    nextButton.disabled = page === Math.ceil(productData.length / itemsPerPage);
  }

  // Chạy hàm khởi tạo
  displayPage(currentPage);
  // Tạo sự kiện phân trang
  document.querySelector(".prev-page").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayPage(currentPage);
    }
  });

  document.querySelector(".next-page").addEventListener("click", () => {
    if (currentPage < Math.ceil(productData.length / itemsPerPage)) {
      currentPage++;
      displayPage(currentPage);
    }
  });
}

// Tạo sự kiện onchange khi select sort
document.getElementById("sortOption").addEventListener("change", (event) => {
  const sortOrder = event.target.value;
  displayAndSortTable(sortOrder);
});

displayAndSortTable("az"); //Mặc định sort a-z

// -------------------Tìm kiếm user---------------
document.getElementById("searchButton").addEventListener("click", (event) => {
  event.preventDefault();
  const searchTerm = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase(); // Lowercase search term for case-insensitive matching

  // Get user data (assuming you have a way to retrieve it)
  let productData = JSON.parse(localStorage.getItem("productData")) || [];
  let foundProducts = []; // Initialize an empty array to store matching users

  // Filter user data based on search term
  productData.forEach((user) => {
    const nameLower = user.name.toLowerCase();
    const emailLower = user.email.toLowerCase();
    if (
      nameLower.indexOf(searchTerm) !== -1 ||
      emailLower.indexOf(searchTerm) !== -1
    ) {
      foundProducts.push(user); // Add matching user to foundProducts array
    }
  });

  function displayAndSortTable(sortOrder) {
    const tableBody = document.getElementById("categoryBody");
    const itemsPerPage = 3; //Số item trên trang phân chia
    let currentPage = 1;

    // Sort function
    function compare(a, b) {
      if (sortOrder === "az") {
        return a.name.localeCompare(b.name);
      } else if (sortOrder === "za") {
        return b.name.localeCompare(a.name);
      }
    }

    // Sort productData
    foundProducts.sort(compare);

    // Display page function
    function displayPage(page) {
      let startIndex = (page - 1) * itemsPerPage;
      let endIndex = startIndex + itemsPerPage;
      let pageItems = foundProducts.slice(startIndex, endIndex);

      render(pageItems);
      document.querySelector(".current-page").textContent = `Page ${page}`;

      //Cập nhật trạng thái button dựa trên trang hiện tại
      let prevButton = document.querySelector(".prev-page");
      let nextButton = document.querySelector(".next-page");
      prevButton.disabled = page === 1;
      nextButton.disabled =
        page === Math.ceil(foundProducts.length / itemsPerPage);
    }

    // Chạy hàm khởi tạo
    displayPage(currentPage);

    // Tạo sự kiện phân trang
    document.querySelector(".prev-page").addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        displayPage(currentPage);
      }
    });

    document.querySelector(".next-page").addEventListener("click", () => {
      if (currentPage < Math.ceil(productData.length / itemsPerPage)) {
        currentPage++;
        displayPage(currentPage);
      }
    });
  }
  // Tạo sự kiện onchange khi select sort
  document.getElementById("sortOption").addEventListener("change", (event) => {
    const sortOrder = event.target.value;
    displayAndSortTable(sortOrder);
  });

  displayAndSortTable("az"); //Mặc định sort a-z
});

// -------------------Quản trị user---------------

// Thêm sự kiện cho nút Update
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("update-button")) {
    // Lấy user ID từ thuộc tính data
    const userId = Number(event.target.dataset.userId); // Chuyển đổi userId thành số

    // Hiển thị form update
    document.getElementById("updateUserForm").style.display = "block";

    // Thêm sự kiện cho nút Submit trong form
    document
      .getElementById("submitUpdate")
      .addEventListener("click", function () {
        // Lấy dữ liệu từ form
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const permission = document.getElementById("permission").value;

        // Cập nhật productData
        let productData = JSON.parse(localStorage.getItem("productData")) || [];
        productData.forEach((user) => {
          if (user.id === userId) {
            user.userName = username;
            user.email = email;
            user.permission = permission;
          }
        });

        // Lưu lại productData vào localStorage
        localStorage.setItem("productData", JSON.stringify(productData));

        // Ẩn form update
        document.getElementById("updateUserForm").style.display = "none";
        // Cập nhật bảng
        displayAndSortTable(productData);
      });
    document
      .getElementById("cancelUpdate")
      .addEventListener("click", function () {
        // Ẩn form update
        document.getElementById("updateUserForm").style.display = "none";
      });
  }
});

// Thêm sự kiện cho nút Block(Lỗi chưa hiện thị Unblock)
// Thêm sự kiện cho nút Block
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("block-button")) {
    // Lấy user ID từ thuộc tính data
    const userId = Number(event.target.dataset.userId); // Chuyển đổi userId thành số

    // Lấy dữ liệu user từ localStorage
    let productData = JSON.parse(localStorage.getItem("productData")) || [];

    // Tìm user dựa trên userId và thay đổi trạng thái
    productData.forEach((user) => {
      if (user.id === userId) {
        if (user.status === "available") {
          user.status = "unavailable";
          event.target.innerHTML = "Block";
        } else {
          user.status = "available";
          event.target.innerHTML = "Unblock";
        }
      }
    });

    // Lưu lại dữ liệu user vào localStorage
    localStorage.setItem("productData", JSON.stringify(productData));
    // Cập nhật bảng
    displayAndSortTable(productData);
  }
});

// Thêm sự kiện cho nút Delete
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-button")) {
    // Lấy user ID từ thuộc tính data
    const userId = Number(event.target.dataset.userId); // Chuyển đổi userId thành số

    // Hiển thị hộp thoại xác nhận
    let confirmDelete = confirm("Bạn có chắc chắn muốn xóa không?");

    // Nếu người dùng nhấn OK (confirmDelete === true), thực hiện xóa
    if (confirmDelete) {
      console.log("delete");
      // Xóa user khỏi localStorage
      let productData = JSON.parse(localStorage.getItem("productData")) || [];
      productData = productData.filter((user) => user.id !== userId);
      localStorage.setItem("productData", JSON.stringify(productData));

      // Cập nhật bảng

      displayAndSortTable(productData);
    }
  }
});
