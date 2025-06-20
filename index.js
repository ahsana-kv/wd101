// Function to display entries in the table
const displayEntries = () => {
    const userentries = JSON.parse(localStorage.getItem("userentries")) || []; // Always fresh read
    const tableBody = document.getElementById("entriesTableBody");
    tableBody.innerHTML = ""; // Clear existing rows

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

// Function to handle form submission
const saveduserform = (event) => {
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptTerms = document.getElementById("acceptTerms").checked;

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Age validation (between 18 and 55)
    const today = new Date();
    const dobDate = new Date(dob);
    let age = today.getFullYear() - dobDate.getFullYear();
    const m = today.getMonth() - dobDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
        age--;
    }

    if (age < 18 || age > 55) {
        alert("Age must be between 18 and 55.");
        return;
    }

    // Read existing entries freshly
    let userentries = JSON.parse(localStorage.getItem("userentries")) || [];
    const entry = { name, email, password, dob, acceptTerms };
    userentries.push(entry);
    localStorage.setItem("userentries", JSON.stringify(userentries));

    displayEntries(); // Update table
    document.getElementById("userentries").reset(); // Reset form
};

window.addEventListener('DOMContentLoaded', function() {
    const dobInput = document.getElementById('dob');
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());

    dobInput.max = maxDate.toISOString().split('T')[0];
    dobInput.min = minDate.toISOString().split('T')[0];

    displayEntries(); // Display table when page loads
});

// Event listener
document.getElementById("userentries").addEventListener("submit", saveduserform);
