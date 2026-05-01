// Navigation JavaScript for HTMX frontend
// This handles client-side routing and content loading

// Load content for a given virtual path using HTMX
function loadContent(path) {
  const HTML_PREFIX = '/html';
  // Fallback route for unknown paths
  const DEFAULT_ROUTE = '/home';

  const contentDiv = document.getElementById('content');
  if (!contentDiv) return;

  let htmlPath = path;
  if (!path || path === '/') {
    htmlPath = DEFAULT_ROUTE;
  }

  htmlPath = HTML_PREFIX + htmlPath;

  // Use HTMX's AJAX API to fetch content and swap it into the target
  htmx.ajax('GET', htmlPath, { target: '#content', swap: 'innerHTML' });
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function (_event) {
  const path = window.location.pathname;
  loadContent(path);
});

// Initialize navigation on page load
// Script is loaded at end of <body>, so DOM and HTMX are both fully ready
const path = window.location.pathname;
loadContent(path);