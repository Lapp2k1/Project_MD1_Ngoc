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
  let categoryData = JSON.parse(localStorage.getItem("categoryData")) || [];
  categoryData[0].status = "inactive";
  localStorage.setItem("categoryData", JSON.stringify(categoryData));
  localStorage.removeItem("categoryLogin");
});

// Đặt tên biến----------
let categoryData = JSON.parse(localStorage.getItem("categoryData")) || [];
const tableBody = document.getElementById("categoryBody");
const itemsPerPage = 5; //Số item trên trang phân chia
let currentPage = 1;

// Global render function
function render(data) {
  const tableBody = document.getElementById("categoryBody");
  let stringHTML = "";

  data.forEach((category, i) => {
    stringHTML += `
      <tr>
        <td>${(currentPage - 1) * itemsPerPage + i + 1}</td>
        <td>${category.id}</td>
        <td>${category.categoryName}</td>
        <td>${category.status}</td>
        <td>
          ${`
            <button class="action-button update-button" data-category-id="${
              category.id
            }">Update</button>
            <button class="action-button status-button" data-category-id="${
              category.id
            }">${
            category.status === "available" ? "Unavailable" : "Available"
          }</button>
            <button class="action-button delete-button" data-category-id="${
              category.id
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

render(categoryData);
// Chạy hàm khởi tạo
displayPage(currentPage, categoryData);
// Tạo sự kiện phân trang
document.querySelector(".prev-page").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayPage(currentPage, categoryData);
  }
});

document.querySelector(".next-page").addEventListener("click", () => {
  if (currentPage < Math.ceil(categoryData.length / itemsPerPage)) {
    currentPage++;
    displayPage(currentPage, categoryData);
  }
});

// Tạo sự kiện onchange khi select sort
document.getElementById("sortOption").addEventListener("change", (event) => {
  function compare(a, b) {
    if (event.target.value === "az") {
      return a.categoryName.localeCompare(b.categoryName);
    } else if (event.target.value === "za") {
      return b.categoryName.localeCompare(a.categoryName);
    } else if (event.target.value === "pricedown") {
      console.log("cc");
      return JSON.stringify(a.price).localeCompare(JSON.stringify(b.price));
    } else if (event.target.value === "priceup") {
      return JSON.stringify(b.price).localeCompare(JSON.stringify(a.price));
    } else if (event.target.value === "category") {
      return JSON.stringify(b.category).localeCompare(
        JSON.stringify(a.category)
      );
    } else if (event.target.value === "status") {
      return JSON.stringify(b.status).localeCompare(JSON.stringify(a.status));
    }
  }
  categoryData.sort(compare);
  displayPage(currentPage, categoryData);
});

// -------------------Tìm kiếm category---------------
document.getElementById("searchButton").addEventListener("click", (event) => {
  event.preventDefault();
  const searchTerm = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase(); // Lowercase search term for case-insensitive matching

  // Get category data (assuming you have a way to retrieve it)
  let categoryData = JSON.parse(localStorage.getItem("categoryData")) || [];
  let foundcategorys = []; // Initialize an empty array to store matching categorys

  // Filter category data based on search term
  categoryData.forEach((category) => {
    const categoryNameLower = category.categoryName.toLowerCase();

    if (categoryNameLower.indexOf(searchTerm) !== -1) {
      foundcategorys.push(category); // Add matching category to foundcategorys array
    }
  });

  render(foundcategorys);
  // Chạy hàm khởi tạo
  displayPage(currentPage, foundcategorys);
  // Tạo sự kiện phân trang
  document.querySelector(".prev-page").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayPage(currentPage, categoryData);
    }
  });

  document.querySelector(".next-page").addEventListener("click", () => {
    if (currentPage < Math.ceil(categoryData.length / itemsPerPage)) {
      currentPage++;
      displayPage(currentPage, categoryData);
    }
  });
  // Tạo sự kiện onchange khi select sort
  document.getElementById("sortOption").addEventListener("change", (event) => {
    const sortOrder = event.target.value;
    function compare(a, b) {
      if (event.target.value === "az") {
        console.log("az");
        return a.categoryName.localeCompare(b.categoryName);
      } else if (event.target.value === "za") {
        console.log("za");
        return b.categoryName.localeCompare(a.categoryName);
      }
    }
    foundcategorys.sort(compare);
    displayPage(currentPage, foundcategorys);
  });
});

// -------------------Quản trị category---------------

// Thêm sự kiện cho nút Update
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("update-button")) {
    // Lấy category ID từ thuộc tính data
    const categoryId = Number(event.target.dataset.categoryId); // Chuyển đổi categoryId thành số

    // Hiển thị form update
    document.getElementById("updateCategoryForm").style.display = "block";

    // Thêm sự kiện cho nút Submit trong form
    document
      .getElementById("submitUpdate")
      .addEventListener("click", function () {
        // Lấy dữ liệu từ form
        const categoryname = document.getElementById("categoryname").value;
        const status = document.getElementById("status").value;

        // Cập nhật categoryData
        let categoryData =
          JSON.parse(localStorage.getItem("categoryData")) || [];
        categoryData.forEach((category) => {
          if (category.id === categoryId) {
            category.categoryName = categoryname;
            category.status = status;
          }
        });

        // Lưu lại categoryData vào localStorage
        localStorage.setItem("categoryData", JSON.stringify(categoryData));

        // Ẩn form update
        document.getElementById("updateCategoryForm").style.display = "none";
        // Cập nhật bảng
        render(categoryData);
        // Chạy hàm khởi tạo
        displayPage(currentPage, categoryData);
      });
    document
      .getElementById("cancelUpdate")
      .addEventListener("click", function () {
        // Ẩn form update
        document.getElementById("updateCategoryForm").style.display = "none";
      });
  }
});

// Thêm sự kiện cho nút status
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("status-button")) {
    // Lấy category ID từ thuộc tính data
    const categoryId = Number(event.target.dataset.categoryId); // Chuyển đổi categoryId thành số

    // Lấy dữ liệu category từ localStorage
    let categoryData = JSON.parse(localStorage.getItem("categoryData")) || [];

    // Tìm category dựa trên categoryId và thay đổi trạng thái
    categoryData.forEach((category) => {
      if (category.id === categoryId) {
        if (category.status === "available") {
          category.status = "unavailable";
          event.target.innerHTML = "Available";
        } else {
          category.status = "available";
          event.target.innerHTML = "Unavailable";
        }
      }
    });

    // Lưu lại dữ liệu category vào localStorage
    localStorage.setItem("categoryData", JSON.stringify(categoryData));
    // Cập nhật bảng
    render(categoryData);
    // Chạy hàm khởi tạo
    displayPage(currentPage, categoryData);
  }
});

// Thêm sự kiện cho nút Delete
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-button")) {
    // Lấy category ID từ thuộc tính data
    const categoryId = Number(event.target.dataset.categoryId); // Chuyển đổi categoryId thành số

    // Hiển thị hộp thoại xác nhận
    let confirmDelete = confirm("Bạn có chắc chắn muốn xóa không?");

    // Nếu người dùng nhấn OK (confirmDelete === true), thực hiện xóa
    if (confirmDelete) {
      console.log("delete");
      // Xóa category khỏi localStorage
      let categoryData = JSON.parse(localStorage.getItem("categoryData")) || [];
      categoryData = categoryData.filter(
        (category) => category.id !== categoryId
      );
      localStorage.setItem("categoryData", JSON.stringify(categoryData));
    }
    // Cập nhật bảng

    render(categoryData);
    // Chạy hàm khởi tạo
    displayPage(currentPage, categoryData);
  }
});
// --------------------thêm category------------
document.getElementById("addBtn").addEventListener("click", function (event) {
  // Hiển thị form update
  document.getElementById("updateCategoryForm").style.display = "block";

  // Thêm sự kiện cho nút Submit trong form
  document
    .getElementById("submitUpdate")
    .addEventListener("click", function () {
      // Lấy dữ liệu từ form
      const categoryname = document.getElementById("categoryname").value;
      const status = document.getElementById("status").value;

      // Cập nhật categoryData
      let newcategory = {
        id: Math.floor(Math.random() * 1000000),
        categoryName: categoryname,
        status: status,
      };

      categoryData.push(newcategory);
      localStorage.setItem("categoryData", JSON.stringify(categoryData));

      // Ẩn form update
      document.getElementById("updateCategoryForm").style.display = "none";
      // Cập nhật bảng
      render(categoryData);
      // Chạy hàm khởi tạo
      displayPage(currentPage, categoryData);
    }),
    document
      .getElementById("cancelUpdate")
      .addEventListener("click", function () {
        // Ẩn form update
        document.getElementById("updateCategoryForm").style.display = "none";
      });
});
