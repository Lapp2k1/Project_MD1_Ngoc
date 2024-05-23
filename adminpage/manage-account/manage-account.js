document.querySelector(".admin-img").addEventListener("click", function () {
  document.getElementById("adminMenu").style.display = "block";
});

document.querySelector(".log-out").addEventListener("click", function () {
  let userData = JSON.parse(localStorage.getItem("userData")) || [];
  userData[0].status = "inactive";
  localStorage.setItem("userData", JSON.stringify(userData));
  localStorage.removeItem("userLogin");
});

// Define function to display and sort table
function displayAndSortTable(sortOrder) {
  let userData = JSON.parse(localStorage.getItem("userData")) || [];
  const tableBody = document.getElementById("categoryBody");
  const itemsPerPage = 3; // Number of users per page
  let currentPage = 1;

  // Sort function
  function compare(a, b) {
    if (sortOrder === "az") {
      return a.userName.localeCompare(b.userName);
    } else if (sortOrder === "za") {
      return b.userName.localeCompare(a.userName);
    }
  }

  // Sort userData
  userData.sort(compare);

  // Display page function
  function displayPage(page) {
    let startIndex = (page - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;
    let pageItems = userData.slice(startIndex, endIndex);

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
           ${user.permission !== "admin" ? `
             <button class="action-button update-button" data-user-id="${user.id}">Update</button>
             <button class="action-button block-button" data-user-id="${user.id}">Block</button>
             <button class="action-button delete-button" data-user-id="${user.id}">Delete</button>
           ` : ""}
         </td>
       </tr>`;
    });

    tableBody.innerHTML = stringHTML;
    document.querySelector(".current-page").textContent = `Page ${page}`;

    // Update button states based on current page
    let prevButton = document.querySelector(".prev-page");
    let nextButton = document.querySelector(".next-page");
    prevButton.disabled = page === 1;
    nextButton.disabled = page === Math.ceil(userData.length / itemsPerPage);
  }

  // Initial display
  displayPage(currentPage);

  // Pagination event listeners
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
}

// Event listener for sorting
document.getElementById("sortOption").addEventListener("change", (event) => {
  const sortOrder = event.target.value;
  displayAndSortTable(sortOrder);
});

// Initial call to display and sort the table
displayAndSortTable("az"); // Default sorting order
