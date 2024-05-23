document.querySelector(".admin-img").addEventListener("click", function () {
  document.getElementById("adminMenu").style.display = "block";
});
document.querySelector(".log-out").addEventListener("click", function () {
  let userData = JSON.parse(localStorage.getItem("userData")) || [];
  userData[0].status = "inactive";
  localStorage.setItem("userData", JSON.stringify(userData));
  localStorage.removeItem("userLogin");
});

// -------------------table---------------------
let userData = JSON.parse(localStorage.getItem("userData"));
const tableBody = document.getElementById("categoryBody");
const itemsPerPage = 3; // Number of users per page
let currentPage = 1;

// -----------------------------sortfunctionZ-A không hoạt động-----------
document.getElementById("sortOption").addEventListener("change", (event) => {
  event.preventDefault();
  if (event.target.value === "az") {
    function compare(a, b) {
      if (a.userName < b.userName) {
        return -1;
      }
      if (a.userName > b.userName) {
        return 1;
      }
      return 0;
    }
    userData.sort(compare);
  } else if (event.target.value === "za") {
    function compare(a, b) {
      if (a.userName < b.userName) {
        return 1;
      }
      if (a.userName > b.userName) {
        return -1;
      }
      return 0;
    }
    userData.sort(compare);
  }
  console.log(userData);
});

function displayPage(page) {
  let startIndex = (page - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;
  let pageItems = userData.slice(startIndex, endIndex);

  function render() {
    let stringHTML = "";

    pageItems.forEach((user, i) => {
      stringHTML += `
     <tr>
       <td>${i + 1}</td>
       <td>${user.userName}</td>
       <td>${user.email}</td>
       <td>${user.permission}</td>
       <td>${user.status}</td>
       <td>
       ${user.permission === "admin" ? "" : ` `}
       ${
         user.permission !== "admin"
           ? `
         <button class="action-button update-button" data-user-id="${user.id}">Update</button>
         <button class="action-button block-button" data-user-id="${user.id}">Block</button>
         <button class="action-button delete-button" data-user-id="${user.id}">Delete</button>
       `
           : ""
       }
       </td>
     </tr>
   `;
    });

    tableBody.innerHTML = stringHTML; // Thêm nội dung vào bảng
  }
  render();
  document.querySelector(".current-page").textContent = `Page ${page}`;

  // Update button states (enabled/disabled) based on current page
  let prevButton = document.querySelector(".prev-page");
  let nextButton = document.querySelector(".next-page");
  prevButton.disabled = page === 1;
  nextButton.disabled = page === Math.ceil(userData.length / itemsPerPage);
}

// Initial page render
displayPage(currentPage);

// Add event listeners for pagination buttons
document.querySelector(".prev-page").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayPage(currentPage);
  }
});

document.querySelector(".next-page").addEventListener("click", () => {
  if (currentPage < Math.ceil(userData.length / itemsPerPage)) {
    currentPage++;
    displayPage(currentPage);
  }
});
