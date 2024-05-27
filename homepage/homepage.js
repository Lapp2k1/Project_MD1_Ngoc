
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
  {
    id: Math.floor(Math.random() * 1000000),
    name: "NgocSora",
    userName: "aNgocSora",
    password: "Lappy1111",
    email: "vulengocvip201@gmail.com",
    permission: "user",
    order: [],
    wishList: [],
    status: "inactive",
  },
  {
    id: Math.floor(Math.random() * 1000000),
    name: "NgocSora",
    userName: "bNgocSora",
    password: "Lappy1111",
    email: "vulengocvip215@gmail.com",
    permission: "user",
    order: [],
    wishList: [],
    status: "inactive",
  },
  {
    id: Math.floor(Math.random() * 1000000),
    name: "NgocSora",
    userName: "cNgocSora",
    password: "Lappy1111",
    email: "vulengocvip015@gmail.com",
    permission: "user",
    order: [],
    wishList: [],
    status: "inactive",
  },
  {
    id: Math.floor(Math.random() * 1000000),
    name: "NgocSora",
    userName: "dNgocSora",
    password: "Lappy1111",
    email: "ulengocvip2015@gmail.com",
    permission: "user",
    order: [],
    wishList: [],
    status: "inactive",
  },
  {
    id: Math.floor(Math.random() * 1000000),
    name: "NgocSora",
    userName: "eNgocSora",
    password: "Lappy1111",
    email: "vulengocvip5@gmail.com",
    permission: "user",
    order: [],
    wishList: [],
    status: "inactive",
  },
];

let categoryData = [
  {
    id: Math.floor(Math.random() * 1000000),
    categoryName: "Computer & Laptop",
    status: "available",
  },{
    id: Math.floor(Math.random() * 1000000),
    categoryName: "SmartPhone",
    status: "available",
    
  },{
    id: Math.floor(Math.random() * 1000000),
    categoryName: "Headphones",
    status: "unavailable",
  },{
    id: Math.floor(Math.random() * 1000000),
    categoryName: "Accessories",
    status: "unavailable",
  },{
    id: Math.floor(Math.random() * 1000000),
    categoryName: "Camera & Photo",
    status: "available",
  },
  {
    id: Math.floor(Math.random() * 1000000),
    categoryName: "TV & Homes",
    status: "available",
  },
];


let productData = [
  {
    id: Math.floor(Math.random() * 1000000),
    productName: "MSI",
    quantity: 40,
    img: "https://anphat.com.vn/media/product/46739_laptop_msi_thin_gf63_12uc_887vn__1_.jpg",
    price: 15000000,
    category: "Computer & Laptop",
    status: "available",
  },{
    id: Math.floor(Math.random() * 1000000),
    productName: "Samsung",
    quantity: 50,
    price: 34000000,
    category: "SmartPhone",
    status: "available",
  },{
    id: Math.floor(Math.random() * 1000000),
    productName: "Airpod",
    quantity: 0,
    price: 34000000,
    category: "Headphones",
    status: "unavailable",
  },{
    id: Math.floor(Math.random() * 1000000),
    productName: "Dareu MK 2000",
    quantity: 0,
    price: 34000000,
    category: "Accessories",
    status: "unavailable",
  },{
    id: Math.floor(Math.random() * 1000000),
    productName: "Leica",
    quantity: 50,
    price: 34000000,
    category: "Camera & Photo",
    status: "available",
  },
  {
    id: Math.floor(Math.random() * 1000000),
    productName: "LGTV+",
    quantity: 50,
    price: 34000000,
    category: "TV & Homes",
    status: "available",
  },
];
if (!localStorage.getItem("userData")) {
  localStorage.setItem("userData", JSON.stringify(userData));
}

if (!localStorage.getItem("productData")) {
  localStorage.setItem("productData", JSON.stringify(productData));
}
if (!localStorage.getItem("categoryData")) {
  localStorage.setItem("categoryData", JSON.stringify(categoryData));
}
document.querySelector(".user-icon").addEventListener("click", function () {
  document.getElementById("userMenu").style.display = "block";
});
document.querySelector(".category").addEventListener("click", function () {
  let categoryItems = document.getElementById("category-items");

  if (categoryItems.style.display === "none") {
    categoryItems.style.display = "flex";
  } else {
    categoryItems.style.display = "none";
  }
});
