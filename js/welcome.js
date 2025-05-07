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

  // Apply saved theme preference
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    toggle.checked = true;
  }

  // Toggle theme on switch change
  toggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
  });
});