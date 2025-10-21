// Set active navigation link based on current page
document.addEventListener('DOMContentLoaded', function() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    
    // Check if the current path matches the link path
    if (currentPath === linkPath || 
        (currentPath.startsWith(linkPath) && linkPath !== '/')) {
      link.classList.add('active');
    }
  });
});

// Add this to your existing navigation.js file
document.addEventListener('DOMContentLoaded', function() {
  // Handle mobile navigation toggle
  const navMoreBtn = document.querySelector('.nav-more-btn');
  
  if (navMoreBtn) {
    navMoreBtn.addEventListener('click', function() {
      const dropdown = this.nextElementSibling;
      if (dropdown && dropdown.classList.contains('nav-dropdown')) {
        dropdown.classList.toggle('show');
      }
    });
  }
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.nav-more')) {
      const dropdown = document.querySelector('.nav-dropdown');
      if (dropdown) {
        dropdown.classList.remove('show');
      }
    }
  });
});