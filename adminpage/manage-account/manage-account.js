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
function render(data) {
  const tableBody = document.getElementById("categoryBody");
  let stringHTML = "";

  data.forEach((user, i) => {
    stringHTML += `
      <tr>
        <td>${(currentPage-1)*itemsPerPage + i +1}</td>
        <td>${user.userName}</td>
        <td>${user.email}</td>
        <td>${user.permission}</td>
        <td>${user.status}</td>
        <td>
          ${
            user.permission !== "admin"
              ? `
            <button class="action-button update-button" data-user-id="${
              user.id
            }">Update</button>
            <button class="action-button block-button" data-user-id="${
              user.id
            }">${user.status === "block" ? "Unblock" : "Block"} </button>
            <button class="action-button delete-button" data-user-id="${
              user.id
            }">Delete</button>
          `
              : ""
          }
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
// Sort function

let userData = JSON.parse(localStorage.getItem("userData")) || [];
const tableBody = document.getElementById("categoryBody");
const itemsPerPage = 5; //Số item trên trang phân chia
let currentPage = 1;
render(userData);
// Chạy hàm khởi tạo
displayPage(currentPage, userData);
// Tạo sự kiện phân trang
document.querySelector(".prev-page").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayPage(currentPage, userData);
  }
});

document.querySelector(".next-page").addEventListener("click", () => {
  if (currentPage < Math.ceil(userData.length / itemsPerPage)) {
    currentPage++;
    displayPage(currentPage, userData);
  }
});

// Tạo sự kiện onchange khi select sort
document.getElementById("sortOption").addEventListener("change", (event) => {
  const sortOrder = event.target.value;
  function compare(a, b) {
    if (event.target.value === "az") {
      return a.userName.localeCompare(b.userName);
    } else if (event.target.value === "za") {
      return b.userName.localeCompare(a.userName);
    }
  }
  userData.sort(compare);
  displayPage(currentPage, userData);
});

// -------------------Tìm kiếm user---------------
document.getElementById("searchButton").addEventListener("click", (event) => {
  event.preventDefault();
  const searchTerm = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase(); // Lowercase search term for case-insensitive matching

  // Get user data (assuming you have a way to retrieve it)
  let userData = JSON.parse(localStorage.getItem("userData")) || [];
  let foundUsers = []; // Initialize an empty array to store matching users

  // Filter user data based on search term
  userData.forEach((user) => {
    const userNameLower = user.userName.toLowerCase();
    const emailLower = user.email.toLowerCase();
    if (
      userNameLower.indexOf(searchTerm) !== -1 ||
      emailLower.indexOf(searchTerm) !== -1
    ) {
      foundUsers.push(user); // Add matching user to foundUsers array
    }
  });
  render(foundUsers);
  // Chạy hàm khởi tạo
  displayPage(currentPage, foundUsers);
  // Tạo sự kiện onchange khi select sort
document.getElementById("sortOption").addEventListener("change", (event) => {
  const sortOrder = event.target.value;
  function compare(a, b) {
    if (event.target.value === "az") {
      return a.userName.localeCompare(b.userName);
    } else if (event.target.value === "za") {
      return b.userName.localeCompare(a.userName);
    }
  }
  foundUsers.sort(compare);
  displayPage(currentPage, foundUsers);
});
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

        // Cập nhật userData
        let userData = JSON.parse(localStorage.getItem("userData")) || [];
        userData.forEach((user) => {
          if (user.id === userId) {
            user.userName = username;
            user.email = email;
            user.permission = permission;
          }
        });

        // Lưu lại userData vào localStorage
        localStorage.setItem("userData", JSON.stringify(userData));

        // Ẩn form update
        document.getElementById("updateUserForm").style.display = "none";
      });
    document
      .getElementById("cancelUpdate")
      .addEventListener("click", function () {
        // Ẩn form update
        document.getElementById("updateUserForm").style.display = "none";
      });
  }
});

// Thêm sự kiện cho nút Block
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("block-button")) {
    // Lấy user ID từ thuộc tính data
    const userId = Number(event.target.dataset.userId); // Chuyển đổi userId thành số

    // Lấy dữ liệu user từ localStorage
    let userData = JSON.parse(localStorage.getItem("userData")) || [];

    // Tìm user dựa trên userId và thay đổi trạng thái
    userData.forEach((user) => {
      if (user.id === userId) {
        if (user.status === "block") {
          user.status = "inactive";
          event.target.innerHTML = "Block";
        } else {
          user.status = "block";
          event.target.innerHTML = "Unblock";
        }
      }
    });

    // Lưu lại dữ liệu user vào localStorage
    localStorage.setItem("userData", JSON.stringify(userData));
    // Cập nhật bảng
    render(userData);
    // Chạy hàm khởi tạo
    displayPage(currentPage, userData);
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
      let userData = JSON.parse(localStorage.getItem("userData")) || [];
      userData = userData.filter((user) => user.id !== userId);
      localStorage.setItem("userData", JSON.stringify(userData));

      // Cập nhật bảng

      render(userData);
      // Chạy hàm khởi tạo
      displayPage(currentPage, userData);
    }
  }
});
