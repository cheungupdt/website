document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.contact-form');
  const formMessage = document.getElementById('form-message');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show loading state
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      // Simulate form submission (replace with actual Netlify submission)
      setTimeout(() => {
        // Show success message
        formMessage.textContent = 'Thank you for your message! I\'ll get back to you soon.';
        formMessage.className = 'form-message success';
        
        // Reset form
        form.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Hide message after 5 seconds
        setTimeout(() => {
          formMessage.textContent = '';
          formMessage.className = 'form-message';
        }, 5000);
      }, 1500);
    });
    
    // Add input validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateInput(this);
      });
    });
  }
});

function validateInput(input) {
  const value = input.value.trim();
  const isValid = input.checkValidity();
  
  if (!isValid && value) {
    input.classList.add('error');
    input.classList.remove('valid');
  } else if (value) {
    input.classList.add('valid');
    input.classList.remove('error');
  } else {
    input.classList.remove('valid', 'error');
  }
}