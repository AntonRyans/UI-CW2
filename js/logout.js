// Function to handle logout
function logout() {
    const logoutMessage = document.getElementById('logoutMessage');
    
    logoutMessage.style.opacity = '0';
  
    
    setTimeout(() => {
      localStorage.removeItem("username");  
      window.location.href = "login.html";  
    }, 1000);  
  }
  
  // Execute the logout function when the page loads
  window.onload = logout;
  
  window.addEventListener("DOMContentLoaded", () => {
 
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('username');

  
  window.location.href = "index.html"; 
});
