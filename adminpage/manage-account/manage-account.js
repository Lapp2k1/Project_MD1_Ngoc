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
  const itemsPerPage = 3; //Số item trên trang phân chia
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
       </tr>`;
    });

    tableBody.innerHTML = stringHTML;
    document.querySelector(".current-page").textContent = `Page ${page}`;

    //Cập nhật trạng thái button dựa trên trang hiện tại
    let prevButton = document.querySelector(".prev-page");
    let nextButton = document.querySelector(".next-page");
    prevButton.disabled = page === 1;
    nextButton.disabled = page === Math.ceil(userData.length / itemsPerPage);
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
    if (currentPage < Math.ceil(userData.length / itemsPerPage)) {
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
document.getElementById("searchButton").addEventListener("click", () => {
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

  let stringHTML = "";

  foundUsers.forEach((user, i) => {
    stringHTML += `
     <tr>
       <td>${i + 1}</td>
       <td>${user.userName}</td>
       <td>${user.email}</td>
       <td>${user.permission}</td>
       <td>${user.status}</td>
       <td>
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
     </tr>`;
  });
  const tableBody = document.getElementById("categoryBody");
  tableBody.innerHTML = stringHTML;
   //Cập nhật trạng thái button dựa trên trang hiện tại
   document.querySelector(".current-page").textContent = `Page 1`;
   let prevButton = document.querySelector(".prev-page");
   let nextButton = document.querySelector(".next-page");
   prevButton.style.display = "none";
   nextButton.style.display = "none";
});

// -------------------Quản trị user---------------

const tableBody = document.getElementById("categoryBody"); // Reference the table body

tableBody.addEventListener("click", (event) => { // Add event listener to the table body

  // Check if the clicked element is an action button
  if (!event.target.classList.contains("action-button")) return;

  const userId = event.target.dataset.userId; // Get user ID from data-user-id attribute

  if (event.target.classList.contains("update-button")) {
    // Handle update button click (assuming you have a function to handle updates)
    // Call your update function here, passing the userId

    // Here's an example update logic (assuming you have an update form):
    const updateForm = document.getElementById("userUpdateForm"); // Replace with your update form ID
    if (updateForm) {
      updateForm.style.display = "block"; // Show update form
      // Fill the update form with user data (assuming you have a function to retrieve user data)
      // Call your function to populate the update form with the user's details
    } else {
      console.error("Update form not found!"); // Handle form not found scenario (optional)
    }
  } else if (event.target.classList.contains("block-button")) {
    // Handle block button click
    let userData = JSON.parse(localStorage.getItem("userData")) || [];
    const userIndex = userData.findIndex((user) => user.id === userId);

    if (userIndex !== -1) {
      userData[userIndex].status = "blocked";
      localStorage.setItem("userData", JSON.stringify(userData));

      // Update table row directly
      const userRow = event.target.parentElement.parentElement; // Get the user's table row
      userRow.querySelector("td:nth-child(5)").textContent = "blocked"; // Update status cell

      // Call displayAndSortTable (optional) to potentially refresh the entire table (assuming displayAndSortTable handles filtering)
    } else {
      console.error("User not found:", userId); // Handle user not found scenario (optional)
    }
  } else if (event.target.classList.contains("delete-button")) {
    // Handle delete button click
    let userData = JSON.parse(localStorage.getItem("userData")) || [];
    const filteredUserData = userData.filter((user) => user.id !== userId);

    localStorage.setItem("userData", JSON.stringify(filteredUserData));

    // Remove table row directly
    const userRow = event.target.parentElement.parentElement; // Get the user's table row
    userRow.remove();

    // Call displayAndSortTable (optional) to potentially refresh the entire table (assuming displayAndSortTable handles filtering)
  }
});
