// Utility to show a message under the appropriate form with an optional animation
function showMessage(formId, text, color, isSuccess = false) {
  const form = document.getElementById(formId);
  const message = form.querySelector(".message");

  if (message) {
    message.textContent = text;
    message.style.color = color;

    if (isSuccess) {
      message.classList.add("success-animation");
      setTimeout(() => {
        message.classList.remove("success-animation");
      }, 1000);
    }
  }
}

// Save in localStorage under "users": { "username1": "password1", ... }
function saveUser(username, password) {
  const users = JSON.parse(localStorage.getItem("users")) || {};
  users[username] = password;
  localStorage.setItem("users", JSON.stringify(users));
}

// Handle sign-up form submission
function handleSignUp(e) {
  e.preventDefault();

  const username = document.getElementById("signupUsername").value.trim();
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("signupConfirmPassword").value;

  if (!username || !password || !confirmPassword) {
    showMessage("signupForm", "❌ All fields are required!", "red");
    return;
  }

  if (password !== confirmPassword) {
    showMessage("signupForm", "❌ Passwords do not match!", "red");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || {};
  if (users[username]) {
    showMessage("signupForm", "❌ Username already exists!", "red");
    return;
  }

  saveUser(username, password);

  // Store login session using sessionStorage
  sessionStorage.setItem("isLoggedIn", "true");
  sessionStorage.setItem("username", username);

  showMessage("signupForm", "✅ Sign up successful! Redirecting...", "green", true);

  setTimeout(() => {
    window.location.href = "welcome.html";
  }, 1500);

  e.target.reset();
}

// Attach event listeners once DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", handleSignUp);
  }

  // Dark mode toggle logic
  const toggle = document.getElementById('darkModeToggle');
  if (localStorage.getItem('dark-mode') === 'true') {
    document.body.classList.add('dark-mode');
    toggle.checked = true;
  }

  toggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
  });
});
