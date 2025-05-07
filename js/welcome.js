// // Ensure the user is logged in when the page loads
// document.addEventListener("DOMContentLoaded", function () {
//   const username = sessionStorage.getItem("user"); // Get the username from sessionStorage
  
//   if (!username) {
//     // Redirect to sign up page
//     window.location.href = "signup.html";
//   } else {
//     // Show a personalized greeting
//     const welcomeMessage = document.querySelector(".welcome-container p");
//     if (welcomeMessage) {
//       welcomeMessage.textContent = `Hello, ${username}! You're successfully logged in.`;
//     }
//   }
// });

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('darkModeToggle');
  const body = document.body;

  // Function to apply the theme based on localStorage or system preference
  const applyTheme = () => {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    // Apply theme based on saved preference or system preference
    if (savedTheme === 'dark' || (savedTheme === null && prefersDarkScheme)) {
      body.classList.add('dark-mode');
      toggle.checked = true;
    } else {
      body.classList.remove('dark-mode');
      toggle.checked = false;
    }
  };

  // Initial theme application
  applyTheme();

  // Toggle theme on switch change and save to localStorage
  toggle.addEventListener('change', () => {
    const isDark = toggle.checked;
    body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Listen for changes in system preference and update if no user preference is saved
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (!localStorage.getItem('theme')) {
      applyTheme();
    }
  });
});
