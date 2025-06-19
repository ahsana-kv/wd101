let userentries = JSON.parse(localStorage.getItem("userentries")) || []; // Load existing data if any
const displayEntries = () => {
    const tableBody = document.getElementById("entriesTableBody");
    tableBody.innerHTML = ""; // clear table first

    userentries.forEach((entry) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>${entry.password}</td>
            <td>${entry.dob}</td>
            <td>${entry.acceptTerms ? 'Yes' : 'No'}</td>
        `;
        tableBody.appendChild(row);
    });
};

const saveduserform = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTerms = document.getElementById("acceptTerms").checked;
  const entry = { name, email, password, dob, acceptTerms };
  userentries.push(entry);
  localStorage.setItem("userentries", JSON.stringify(userentries));
  console.log("User entry saved:", entry);

  alert("Form submitted successfully!");
  document.getElementById("userentries").reset();
};

// const userform = document.getElementById("userentries").reset();
// userform.addEventListener("submit", saveduserform);

document.getElementById("userentries").addEventListener("submit", saveduserform);
window.addEventListener("DOMContentLoaded", displayEntries);
