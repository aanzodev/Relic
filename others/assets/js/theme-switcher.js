// Themes that can be chosen ig 
const themes = [
  'default',
  'dark',
  'light',
  'midnight',
  'ocean',
  'sunset',
  'forest',
  'purple',
  'cyberpunk',
  'matrix',
  'neon',
  'fire',
  'ice',
  'retro'
];

// Initialize theme on page load
function initializeTheme() {
  const savedTheme = localStorage.getItem('selectedTheme') || 'default';
  applyTheme(savedTheme);
  
  // Update theme selector if it exists
  const themeSelector = document.getElementById('themeSelector');
  if (themeSelector) {
    themeSelector.value = savedTheme;
  }
}

// Apply theme to document
function applyTheme(themeName) {
  const root = document.documentElement;
  
  // Remove all existing theme attributes
  themes.forEach(theme => {
    root.removeAttribute(`data-theme`);
  });
  
  // Apply new theme
  if (themeName !== 'default') {
    root.setAttribute('data-theme', themeName);
  }
  
  // Save to localStorage
  localStorage.setItem('selectedTheme', themeName);
  
  // Update body background to match theme
  updateBodyBackground(themeName);
}

// Update body background with theme-specific gradient
function updateBodyBackground(themeName) {
  const body = document.body;
  
  // Get computed CSS variables for the current theme
  const style = getComputedStyle(document.documentElement);
  const bgColor = style.getPropertyValue('--bg-color').trim();
  const accentColor = style.getPropertyValue('--accent-color').trim();
  const accentSecondary = style.getPropertyValue('--accent-secondary').trim();
  
  // Apply background color directly
  body.style.backgroundColor = bgColor;
  
  // Update the gradient overlay
  const existingOverlay = body.querySelector('::before');
  // The ::before pseudo-element is styled in CSS, but we can add inline styles for additional effects
}

// Setup theme selector event listener
function setupThemeSelector() {
  const themeSelector = document.getElementById('themeSelector');
  
  if (themeSelector) {
    themeSelector.addEventListener('change', (e) => {
      const selectedTheme = e.target.value;
      applyTheme(selectedTheme);
      
      // Optional: Show a brief notification
      showThemeChangeNotification(selectedTheme);
    });
  }
}

// Optional: Show theme change notification
function showThemeChangeNotification(themeName) {
  const notification = document.createElement('div');
  notification.className = 'theme-notification';
  notification.textContent = `Theme changed to ${themeName.charAt(0).toUpperCase() + themeName.slice(1)}`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 24px;
    background: var(--accent-color);
    color: white;
    border-radius: 8px;
    font-weight: 600;
    z-index: 10000;
    animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Add notification animations to your CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes fadeOut {
    to {
      opacity: 0;
      transform: translateX(100px);
    }
  }
`;
document.head.appendChild(notificationStyles);

// Initialize on DOM load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    setupThemeSelector();
  });
} else {
  initializeTheme();
  setupThemeSelector();
}

// Export functions for use in other scripts
window.themeSystem = {
  applyTheme,
  initializeTheme,
  themes
};
