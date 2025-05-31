const form = document.getElementById("registrationForm");
const tableBody = document.getElementById("tableBody");

function getEntries() {
  let entries = localStorage.getItem("user-entries");
  return entries ? JSON.parse(entries) : [];
}

function showEntries() {
  const entries = getEntries();
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

function validateEmail(email) {
  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  return pattern.test(email);
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

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTerms = document.getElementById("acceptTerms").checked;

  if (!validateEmail(email)) {
    alert("Enter a valid email.");
    return;
  }

  const age = calculateAge(dob);
  if (age < 18 || age > 55) {
    alert("Age must be between 18 and 55.");
    return;
  }

  const entry = { name, email, password, dob, termsAccepted: acceptTerms };
  const entries = getEntries();
  entries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(entries));

  showEntries();
  form.reset();
});

window.addEventListener("DOMContentLoaded", showEntries);