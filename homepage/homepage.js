let userData = [
  {
    id: 1,
    name: "NgocSora",
    userName: "NgocSora",
    password: "Lappy1111@",
    email: "vulengocvip2015@gmail.com",
    permission: "admin",
    order: [],
    wishList: [],
    status: "inactive",
  },
];

if (!localStorage.getItem("userData")) {
  localStorage.setItem("userData", JSON.stringify(userData));
}
document.querySelector(".user-icon").addEventListener("click", function () {
  document.getElementById("userMenu").style.display = "block";
});
