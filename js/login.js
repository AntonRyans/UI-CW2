// Utility to show a message in the form
function showMessage(formId, text, color, isSuccess = false) {
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
}

// Handle login form submission
function handleLogIn(e) {
  e.preventDefault();

  const username = document.getElementById("loginUsername")?.value.trim();
  const password = document.getElementById("loginPassword")?.value;
  const storedPassword = localStorage.getItem(username);

  if (!username || !password) {
    showMessage("loginForm", "❌ All fields are required!", "red");
    return;
  }

  if (storedPassword === password) {
    showMessage("loginForm", "✅ Login successful! Redirecting...", "green", true);
    sessionStorage.setItem("user", username);
    setTimeout(() => window.location.href = "welcome.html", 1500);
  } else {
    showMessage("loginForm", "❌ Invalid credentials!", "red");
  }

  e.target.reset();
}

// Redirect unauthenticated users on protected pages
window.onload = function () {
  const currentPage = window.location.pathname.split("/").pop();
  const user = sessionStorage.getItem("user");
  const protectedPages = ["welcome.html"];

  if (protectedPages.includes(currentPage) && !user) {
    window.location.href = "login.html";
  }

  // Initialize theme and carousel on page load
  handleCarousel();
};

// Theme toggle logic
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");
  const savedMode = localStorage.getItem("darkMode") === "true";

  // Set the toggle state based on saved theme preference
  toggle.checked = savedMode;

  // Apply the initial theme based on saved preference
  applyTheme(savedMode);

  // Event listener for theme toggle
  toggle.addEventListener("change", () => {
    applyTheme(toggle.checked);
  });
});

// Handle carousel functionality
function handleCarousel() {
  const carousel = document.querySelector(".background-carousel");
  const lightImages = document.querySelector(".light-images");
  const darkImages = document.querySelector(".dark-images");

  // Set initial visibility based on the current theme
  const isDark = document.body.classList.contains("dark-mode");
  lightImages?.classList.toggle("visible", !isDark);
  darkImages?.classList.toggle("visible", isDark);

  // Start rotating images every 5 seconds with modern methods
  startImageRotation(isDark ? darkImages : lightImages);
}

// Start rotating images every 5 seconds using modern JavaScript
function startImageRotation(carousel) {
  const images = carousel.querySelectorAll("img");
  let currentIndex = 0;

  function rotateImages() {
    const totalImages = images.length;

    images[currentIndex].classList.remove("visible");
    currentIndex = (currentIndex + 1) % totalImages;
    images[currentIndex].classList.add("visible");

    requestAnimationFrame(() => {
      setTimeout(rotateImages, 5000); // Wait for 5 seconds before rotating again
    });
  }

  rotateImages(); // Start the rotation
}

// Apply theme and handle carousel visibility
function applyTheme(isDark) {
  const lightImages = document.querySelector(".light-images");
  const darkImages = document.querySelector(".dark-images");

  // Toggle theme on body
  document.body.classList.toggle("dark-mode", isDark);
  localStorage.setItem("darkMode", isDark);

  // Toggle carousel image visibility based on theme
  lightImages?.classList.toggle("visible", !isDark);
  darkImages?.classList.toggle("visible", isDark);
}

// CSS Class for 'visible' to make images appear
// This CSS will handle the fading in/out of images with smooth transitions:

// CSS Example:

/*
.background-carousel img {
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.background-carousel img.visible {
  opacity: 1;
}
*/

