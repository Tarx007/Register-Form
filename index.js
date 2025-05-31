const form = document.getElementById("registrationForm");
const tableBody = document.querySelector("#entriesTable tbody");

function getEntriesFromStorage() {
  return JSON.parse(localStorage.getItem("user-entries") || "[]");
}

function saveEntriesToStorage(entries) {
  localStorage.setItem("user-entries", JSON.stringify(entries));
}

function displayEntries() {
  const entries = getEntriesFromStorage();
  tableBody.innerHTML = "";

  entries.forEach(entry => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.email}</td>
      <td>${entry.password}</td>
      <td>${entry.dob}</td>
      <td>${entry.termsAccepted}</td>
    `;

    tableBody.appendChild(row);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const termsAccepted = document.getElementById("acceptTerms").checked;

  const dobDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - dobDate.getFullYear();

  if (age < 18 || age > 55) {
    alert("Age must be between 18 and 55");
    return;
  }

  const newEntry = { name, email, password, dob, termsAccepted };
  const entries = getEntriesFromStorage();
  entries.push(newEntry);
  saveEntriesToStorage(entries);
  displayEntries();
});

window.addEventListener("DOMContentLoaded", displayEntries);