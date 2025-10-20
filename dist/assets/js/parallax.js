document.addEventListener('DOMContentLoaded', function() {
  // Simple parallax implementation
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (parallaxElements.length === 0) return;
  
  window.addEventListener('scroll', function() {
    const scrollY = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-parallax') || 0.5;
      const yPos = -(scrollY * speed);
      
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
  
  // Initialize parallax sections
  const parallaxSections = document.querySelectorAll('.parallax-section');
  
  parallaxSections.forEach(section => {
    const parallaxBg = section.querySelector('.parallax-bg');
    
    if (parallaxBg) {
      window.addEventListener('scroll', function() {
        const rect = section.getBoundingClientRect();
        const speed = 0.5;
        
        if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
          const yPos = -(rect.top * speed);
          parallaxBg.style.transform = `translateY(${yPos}px)`;
        }
      });
    }
  });
});