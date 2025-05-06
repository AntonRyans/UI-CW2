// Utility to show a message under the appropriate form with an optional animation
function showMessage(formId, text, color, isSuccess = false) {
  const form = document.getElementById(formId);
  const message = form.querySelector(".message");

  if (message) {
    message.textContent = text;
    message.style.color = color;

    // If it's a success message, add the success animation
    if (isSuccess) {
      message.classList.add("success-animation");

      // Remove animation class after it's done so it can be re-triggered next time
      setTimeout(() => {
        message.classList.remove("success-animation");
      }, 1000);
    }
  }
}

// Handle Sign Up
function handleSignUp(e) {
  e.preventDefault();

  const username = document.getElementById("signupUsername").value.trim();
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("signupConfirmPassword").value;

  // Check if all fields are filled
  if (!username || !password || !confirmPassword) {
    showMessage("signupForm", "❌ All fields are required!", "red");
    return;
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    showMessage("signupForm", "❌ Passwords do not match!", "red");
    return;
  }

  // Check if the username already exists
  if (localStorage.getItem(username)) {
    showMessage("signupForm", "❌ Username already exists!", "red");
    return;
  }

  // Store the user credentials
  localStorage.setItem(username, password);

  // Show success message
  showMessage("signupForm", "✅ Sign up successful! Redirecting to login...", "green", true);

  // Redirect after a short delay
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);

  // Reset the form
  e.target.reset();
}

// Handle Log In
function handleLogIn(e) {
  e.preventDefault();

  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value;
  const storedPassword = localStorage.getItem(username);

  // Check if all fields are filled
  if (!username || !password) {
    showMessage("loginForm", "❌ All fields are required!", "red");
    return;
  }

  // Check credentials
  if (storedPassword && storedPassword === password) {
    showMessage("loginForm", "✅ Login successful! Redirecting...", "green", true);

    // Store session or user info
    sessionStorage.setItem("user", username);  // Optional: Store username in sessionStorage for the current session

    // Redirect to the welcome page after a short delay
    setTimeout(() => {
      window.location.href = "welcome.html";
    }, 1500);
  } else {
    showMessage("loginForm", "❌ Invalid credentials!", "red");
  }

  // Reset the form
  e.target.reset();
}

// Ensure the user is logged in
window.onload = function() {
  const user = sessionStorage.getItem("user"); // Get the username from sessionStorage
  if (!user) {
    // Redirect to login page if not logged in
    window.location.href = "login.html";
  }
};

// Attach event listeners once DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", handleSignUp);
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogIn);
  }
});
