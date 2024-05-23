document.querySelector(".admin-img").addEventListener("click", function () {
  document.getElementById("adminMenu").style.display = "block";
});
document.querySelector(".log-out").addEventListener("click", function () {
  localStorage.removeItem("userLogin");
  let userData = JSON.parse(localStorage.getItem("userData")) || [];
  userData[0].status = "inactive";
  localStorage.setItem("userData", JSON.stringify(userData));
});
