// Function to handle logout
function logout() {
    const logoutMessage = document.getElementById('logoutMessage');
    // Start the fade-out animation
    logoutMessage.style.opacity = '0';
  
    // After the fade-out, remove the user data and redirect to login page
    setTimeout(() => {
      localStorage.removeItem("username");  // Remove the username
      window.location.href = "login.html";  // Redirect to login page
    }, 1000);  // Delay redirect to match the fade-out duration
  }
  
  // Execute the logout function when the page loads
  window.onload = logout;
  
  window.addEventListener("DOMContentLoaded", () => {
  // Clear login data in localStorage
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('username');

  // Redirect to the home page or login page after logout
  window.location.href = "welcome.html"; // Or the page you want after logout
});
