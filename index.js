// Load existing data from LocalStorage if any
let userentries = JSON.parse(localStorage.getItem("userentries")) || [];

// Function to display entries in the table
const displayEntries = () => {
    const tableBody = document.getElementById("entriesTableBody");
    tableBody.innerHTML = ""; // Clear existing rows

    userentries.forEach((entry) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>${entry.password}</td>
            <td>${entry.dob}</td>
            <td>${entry.acceptTerms }</td>
        `;
        tableBody.appendChild(row);
    });
};

// Function to handle form submission
const saveduserform = (event) => {
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptTerms = document.getElementById("acceptTerms").checked;

    //  Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return; // Stop form submission
    }

    //  Age validation (between 18 and 55)
    const today = new Date();
    const dobDate = new Date(dob);
    let age = today.getFullYear() - dobDate.getFullYear();
    const m = today.getMonth() - dobDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
        age--;
    }

    if (age < 18 || age > 55) {
        alert("Age must be between 18 and 55.");
        return; // Stop form submission
    }

    // If all valid, save entry
    const entry = { name, email, password, dob, acceptTerms };
    userentries.push(entry);
    localStorage.setItem("userentries", JSON.stringify(userentries));
    
    displayEntries(); // Update table
    document.getElementById("userentries").reset(); // Reset form
};

// Event listeners
document.getElementById("userentries").addEventListener("submit", saveduserform);
window.addEventListener("DOMContentLoaded", displayEntries);
