document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirmPassword");
    let isValid = true;

    // xóa thông tin lỗi trước
    document.querySelectorAll(".error").forEach(function (el) {
      el.textContent = "";
    });

    // Lấy thông tin data từ local storage
    let userData = JSON.parse(localStorage.getItem("userData")) || [];

    // kiểm tra có trùng thông tin đã có hay không
    let existingUser = userData.find(function (user) {
      return user.userName === username.value || user.email === email.value;
    });

    if (existingUser) {
      if (existingUser.userName === username.value) {
        username.nextElementSibling.textContent = "Username already exists.";
      }
      if (existingUser.email === email.value) {
        email.nextElementSibling.textContent = "Email already exists.";
      }
      isValid = false;
    }

    // Validate
    if (username.value === "") {
      username.nextElementSibling.textContent = "Username is required.";
      isValid = false;
    }
    if (email.value === "") {
      email.nextElementSibling.textContent = "Email is required.";
      isValid = false;
    }
    if (password.value === "") {
      password.nextElementSibling.textContent = "Password is required.";
      isValid = false;
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(password.value)
    ) {
      password.nextElementSibling.classList.add("text-danger");
      password.nextElementSibling.textContent = "Invalid password format.";
      isValid = false;
    }

    if (confirmPassword.value !== password.value) {
      confirmPassword.nextElementSibling.textContent =
        "Passwords do not match.";
      isValid = false;
    }

    // Lưu trữ dữ liệu và chuyển hướng trang đăng nhập
    
   
    if (isValid) {
      let newUser = {
        id: Math.floor(Math.random() * 1000000),
        name: "",
        userName: username.value,
        password: password.value,
        email: email.value,
        permission: "user",
        order: [],
        wishList: [],
        status: "inactive",
      };
     
      userData.push(newUser);
      localStorage.setItem("userData", JSON.stringify(userData));
      Swal.fire({
        title: "Chúc mừng bạn đã đăng ký thành công!",
        text: "Đang chuyển hướng...",
        icon: "success",
      }).then(function () {
        window.location.href = "http://127.0.0.1:5500/Login/login.html";
      });
    }
  });
