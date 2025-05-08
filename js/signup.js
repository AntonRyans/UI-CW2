// Utility to show a message under the appropriate form with an optional animation
function showMessage(formId, text, color, isSuccess = false) {
    const form = document.getElementById(formId);
    const message = form.querySelector(".message");
  
    if (message) {
      message.textContent = text;
      message.style.color = color;
  
      if (isSuccess) {
        message.classList.add("success-animation");
  
        // Reset animation class after 1s so it can be reused
        setTimeout(() => {
          message.classList.remove("success-animation");
        }, 1000);
      }
    }
  }
  
  // Handle Sign Up logic
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
  
    if (localStorage.getItem(username)) {
      showMessage("signupForm", "❌ Username already exists!", "red");
      return;
    }
  
    localStorage.setItem(username, password);
    showMessage("signupForm", "✅ Sign up successful! Redirecting to login...", "green", true);
  
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  
    e.target.reset();
  }
  
  // Attach sign-up event listener once DOM is ready
  document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
      signupForm.addEventListener("submit", handleSignUp);
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('darkModeToggle');
  
    // Load saved theme preference
    if (localStorage.getItem('dark-mode') === 'true') {
      document.body.classList.add('dark-mode');
      toggle.checked = true;
    }
  
    toggle.addEventListener('change', () => {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
    });
  
    // Example signup form logic
    const signupForm = document.getElementById('signupForm');
    const message = document.querySelector('.message');
  
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('signupUsername').value.trim();
      const password = document.getElementById('signupPassword').value;
      const confirmPassword = document.getElementById('signupConfirmPassword').value;
  
      if (password !== confirmPassword) {
        message.textContent = "Passwords do not match!";
        message.style.color = "red";
        return;
      }
  
      message.textContent = "Signed up successfully!";
      message.style.color = "green";
  
      // Here you could add logic to send data to your backend
    });
  });
  