// Utility function to show messages in the form
const showMessage = (formId, text, color, isSuccess = false) => {
  const form = document.getElementById(formId);
  const message = form?.querySelector(".message");

  if (message) {
    message.textContent = text;
    message.style.color = color;

    if (isSuccess) {
      message.classList.add("success-animation");
      setTimeout(() => message.classList.remove("success-animation"), 1000);
    }
  }
};

// Handle login form submission
const handleLogin = (e) => {
  e.preventDefault();

  const username = document.getElementById("loginUsername")?.value.trim();
  const password = document.getElementById("loginPassword")?.value;

  if (!username || !password) {
    showMessage("loginForm", "❌ Please enter both username and password.", "red");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || {};
  const storedPassword = users[username];

  if (storedPassword === password) {
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("username", username);

    showMessage("loginForm", "✅ Login successful! Redirecting...", "green", true);
    setTimeout(() => window.location.href = "welcome.html", 1500);
  } else {
    showMessage("loginForm", "❌ Invalid credentials!", "red");
  }

  e.target.reset();
};

// Attach event listener after DOM loads
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }
});

// Method to redirect to welcome page
const redirectToWelcomePage = () => {
  window.location.href = "welcome.html";
};

// Redirect unauthenticated users on protected pages
window.onload = () => {
  const currentPage = window.location.pathname.split("/").pop();
  const user = sessionStorage.getItem("user");
  const protectedPages = ["welcome.html"];

  // Redirect to login page if not authenticated
  if (protectedPages.includes(currentPage) && !user) {
    window.location.href = "login.html";
  }

  // Initialize carousel
  handleCarousel();
};

// Handle theme toggle logic
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");
  const savedMode = localStorage.getItem("darkMode") === "true";

  // Set toggle and apply initial theme
  toggle.checked = savedMode;
  applyTheme(savedMode);

  // Event listener for theme toggle
  toggle.addEventListener("change", () => applyTheme(toggle.checked));
});

// Handle carousel functionality
const handleCarousel = () => {
  const carousel = document.querySelector(".background-carousel");
  const lightImages = document.querySelector(".light-images");
  const darkImages = document.querySelector(".dark-images");

  const isDark = document.body.classList.contains("dark-mode");

  // Set initial visibility based on the current theme
  lightImages?.classList.toggle("visible", !isDark);
  darkImages?.classList.toggle("visible", isDark);

  // Start rotating images
  startImageRotation(isDark ? darkImages : lightImages);
};

// Start rotating images every 5 seconds
const startImageRotation = (carousel) => {
  const images = carousel.querySelectorAll("img");
  let currentIndex = 0;

  const rotateImages = () => {
    const totalImages = images.length;

    images[currentIndex].classList.remove("visible");
    currentIndex = (currentIndex + 1) % totalImages;
    images[currentIndex].classList.add("visible");

    setTimeout(rotateImages, 5000); // Wait for 5 seconds before rotating again
  };

  rotateImages(); // Start the rotation
};

// Apply theme and handle carousel visibility
const applyTheme = (isDark) => {
  document.body.classList.toggle("dark-mode", isDark);
  localStorage.setItem("darkMode", isDark);

  const lightImages = document.querySelector(".light-images");
  const darkImages = document.querySelector(".dark-images");

  lightImages?.classList.toggle("visible", !isDark);
  darkImages?.classList.toggle("visible", isDark);
};
