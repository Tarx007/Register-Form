const form = document.getElementById("registrationForm");
const tableBody = document.getElementById("tableBody");

window.addEventListener("DOMContentLoaded", () => {
  const entries = getEntries();
  entries.forEach(entry => addEntryToTable(entry));
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTerms = document.getElementById("acceptTerms").checked;

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const age = calculateAge(dob);
  if (age < 18 || age > 55) {
    alert("Age must be between 18 and 55 years.");
    return;
  }

  const entry = { name, email, password, dob, termsAccepted: acceptTerms };
  const entries = getEntries();
  entries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(entries));

  addEntryToTable(entry);
  form.reset();
});

function addEntryToTable(entry) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${entry.name}</td>
    <td>${entry.email}</td>
    <td>${entry.password}</td>
    <td>${entry.dob}</td>
    <td>${entry.termsAccepted}</td>
  `;
  tableBody.appendChild(row);
}

function getEntries() {
  return JSON.parse(localStorage.getItem("user-entries") || "[]");
}

function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}