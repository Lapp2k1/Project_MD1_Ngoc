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

function render() {
  const tableBody = document.getElementById("categoryBody");
  const userData = JSON.parse(localStorage.getItem("userData"));

  let stringHTML = ""; // Initialize empty string for HTML

  userData.forEach((user, i) => {
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

  tableBody.innerHTML = stringHTML; // Set the table body HTML with the generated string
}
render();
// ---------------------function sortuser--------------------
