document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const username = sessionStorage.getItem("username");

  const greetingEl = document.getElementById("personalGreeting");
  const logoutLink = document.getElementById("logoutLink");

  // Redirect to login page if not logged in
  if (!isLoggedIn || !username) {
    window.location.href = "login.html";
    return;
  }

  // Show personalized greeting
  if (greetingEl) {
    greetingEl.textContent = `👋 Welcome, ${username}!`;
  }

  // Show logout link
  if (logoutLink) {
    logoutLink.style.display = "inline";
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      sessionStorage.setItem("isLoggedIn", "false");
      sessionStorage.removeItem("username");
      window.location.href = "login.html";
    });
  }

  // Dark mode toggle functionality
  const toggle = document.getElementById('darkModeToggle');
  const body = document.body;

  const applyTheme = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      body.classList.add('dark-mode');
      toggle.checked = true;
    } else {
      body.classList.remove('dark-mode');
      toggle.checked = false;
    }
  };

  applyTheme();

  toggle.addEventListener('change', () => {
    const isDark = toggle.checked;
    body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (!localStorage.getItem('theme')) {
      applyTheme();
    }
  });
});
