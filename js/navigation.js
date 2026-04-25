// Navigation JavaScript for HTMX frontend
// This handles client-side routing and content loading

// Navigation function that loads content via HTMX
// eslint-disable-next-line no-unused-vars
function navigateTo(path) {
  // Update the URL without page reload
  window.history.pushState({}, '', path);

  // Load the content using HTMX
  const contentDiv = document.getElementById('content');
  if (contentDiv) {
    contentDiv.setAttribute('hx-get', path);
    htmx.trigger(contentDiv, 'htmx:load');
  }
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function (_event) {
  const path = window.location.pathname;
  const contentDiv = document.getElementById('content');
  if (contentDiv) {
    contentDiv.setAttribute('hx-get', path);
    htmx.trigger(contentDiv, 'htmx:load');
  }
});

// Initialize navigation on page load
document.addEventListener('DOMContentLoaded', function () {
  // Set up HTMX event listeners
  document.body.addEventListener('htmx:afterRequest', function (_event) {
    // Update active navigation state
    updateActiveNavigation();
  });

  // Initial navigation state
  updateActiveNavigation();
});

// Update active navigation button styling
function updateActiveNavigation() {
  const currentPath = window.location.pathname;
  const navButtons = document.querySelectorAll('.navbar');

  navButtons.forEach(button => {
    // Remove active class from all buttons
    button.classList.remove('active');

    // Add active class to current page button
    if (button.textContent.toLowerCase() === 'home' && currentPath === '/') {
      button.classList.add('active');
    } else if (
      button.textContent.toLowerCase() === 'blog' &&
      currentPath === '/blog'
    ) {
      button.classList.add('active');
    } else if (
      button.textContent.toLowerCase() === 'projects' &&
      currentPath === '/projects'
    ) {
      button.classList.add('active');
    } else if (
      button.textContent.toLowerCase() === 'playground' &&
      currentPath === '/playground'
    ) {
      button.classList.add('active');
    }
  });
}

// Add active state styles to CSS
const style = document.createElement('style');
style.textContent = `
    .navbar.active {
        background-color: var(--accent-color) !important;
        color: var(--global-background-color) !important;
    }
`;
document.head.appendChild(style);
