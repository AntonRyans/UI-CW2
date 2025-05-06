// Ensure the user is logged in when the page loads
document.addEventListener("DOMContentLoaded", function () {
  const username = sessionStorage.getItem("user"); // Get the username from sessionStorage
  
  if (!username) {
    // Redirect to login page if user is not logged in
    window.location.href = "login.html";
  } else {
    // Show a personalized greeting
    const welcomeMessage = document.querySelector(".welcome-container p");
    if (welcomeMessage) {
      welcomeMessage.textContent = `Hello, ${username}! You're successfully logged in.`;
    }
  }
});
