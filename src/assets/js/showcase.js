document.addEventListener('DOMContentLoaded', function() {
  // Initialize 3D models
  init3DModels();
  
  // Initialize animation demos
  initAnimationDemos();
  
  // Initialize parallax effects
  initParallaxEffects();
  
  // Initialize performance demo
  initPerformanceDemo();
});

function init3DModels() {
  // This is a placeholder for 3D model initialization
  // In a real implementation, you would use a library like Three.js or Babylon.js
  
  const modelContainers = document.querySelectorAll('.model-container');
  
  modelContainers.forEach(container => {
    const canvas = container.querySelector('canvas');
    const loading = container.querySelector('.model-loading');
    const rotateBtn = container.querySelector('[id^="rotate-"]');
    const resetBtn = container.querySelector('[id^="reset-"]');
    
    if (canvas && loading) {
      // Simulate model loading
      setTimeout(() => {
        loading.style.display = 'none';
        
        // Draw a placeholder representation of the 3D model
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        // Draw a simple representation of a robotic arm
        drawRoboticArm(ctx, canvas.width, canvas.height);
        
        // Add rotation functionality
        let isRotating = false;
        let rotation = 0;
        
        if (rotateBtn) {
          rotateBtn.addEventListener('click', function() {
            isRotating = !isRotating;
            this.textContent = isRotating ? 'Stop Rotation' : 'Toggle Rotation';
            
            if (isRotating) {
              animateRotation();
            }
          });
        }
        
        if (resetBtn) {
          resetBtn.addEventListener('click', function() {
            rotation = 0;
            isRotating = false;
            rotateBtn.textContent = 'Toggle Rotation';
            drawRoboticArm(ctx, canvas.width, canvas.height);
          });
        }
        
        function animateRotation() {
          if (!isRotating) return;
          
          rotation += 0.01;
          drawRoboticArm(ctx, canvas.width, canvas.height, rotation);
          requestAnimationFrame(animateRotation);
        }
        
        // Add mouse interaction for manual rotation
        let isDragging = false;
        let startX = 0;
        
        canvas.addEventListener('mousedown', function(e) {
          isDragging = true;
          startX = e.clientX;
          isRotating = false;
          rotateBtn.textContent = 'Toggle Rotation';
        });
        
        document.addEventListener('mousemove', function(e) {
          if (!isDragging) return;
          
          const deltaX = e.clientX - startX;
          rotation += deltaX * 0.01;
          startX = e.clientX;
          
          drawRoboticArm(ctx, canvas.width, canvas.height, rotation);
        });
        
        document.addEventListener('mouseup', function() {
          isDragging = false;
        });
      }, 1500);
    }
  });
}

function drawRoboticArm(ctx, width, height, rotation = 0) {
  ctx.clearRect(0, 0, width, height);
  
  // Set up the drawing context
  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.rotate(rotation);
  
  // Draw base
  ctx.fillStyle = '#4a5568';
  ctx.fillRect(-40, 20, 80, 20);
  
  // Draw first segment
  ctx.fillStyle = '#2d3748';
  ctx.fillRect(-15, -60, 30, 80);
  
  // Draw joint
  ctx.beginPath();
  ctx.arc(0, -60, 15, 0, Math.PI * 2);
  ctx.fillStyle = '#718096';
  ctx.fill();
  
  // Draw second segment
  ctx.save();
  ctx.translate(0, -60);
  ctx.rotate(rotation * 2);
  ctx.fillStyle = '#2d3748';
  ctx.fillRect(-10, -50, 20, 50);
  
  // Draw joint
  ctx.beginPath();
  ctx.arc(0, -50, 10, 0, Math.PI * 2);
  ctx.fillStyle = '#718096';
  ctx.fill();
  
  // Draw third segment
  ctx.save();
  ctx.translate(0, -50);
  ctx.rotate(rotation * 3);
  ctx.fillStyle = '#2d3748';
  ctx.fillRect(-8, -40, 16, 40);
  
  // Draw end effector
  ctx.beginPath();
  ctx.arc(0, -40, 8, 0, Math.PI * 2);
  ctx.fillStyle = '#e53e3e';
  ctx.fill();
  
  ctx.restore();
  ctx.restore();
  ctx.restore();
}

function initAnimationDemos() {
  // Initialize animation demo buttons
  const animationButtons = document.querySelectorAll('.demo-controls button');
  
  animationButtons.forEach(button => {
    button.addEventListener('click', function() {
      const animation = this.getAttribute('data-animation');
      const demoBox = this.closest('.demo-element').querySelector('.demo-box');
      
      // Remove any existing animation classes
      demoBox.className = 'demo-box';
      
      // Force reflow to restart animation
      void demoBox.offsetWidth;
      
      // Add the new animation class
      demoBox.classList.add(animation);
    });
  });
}

function initParallaxEffects() {
  // Initialize parallax layers in showcase cards
  const parallaxDemos = document.querySelectorAll('.parallax-demo');
  
  parallaxDemos.forEach(demo => {
    const layers = demo.querySelectorAll('.parallax-layer');
    
    if (layers.length === 0) return;
    
    // Mouse movement parallax
    demo.addEventListener('mousemove', function(e) {
      const rect = demo.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      layers.forEach(layer => {
        const speed = parseFloat(layer.getAttribute('data-speed')) || 0.5;
        const xPos = (x - 0.5) * 30 * speed;
        const yPos = (y - 0.5) * 30 * speed;
        
        layer.style.transform = `translate(${xPos}px, ${yPos}px) scale(1.1)`;
        layer.style.transition = 'transform 0.1s ease-out';
      });
    });
    
    // Reset on mouse leave
    demo.addEventListener('mouseleave', function() {
      layers.forEach(layer => {
        layer.style.transform = 'translate(0, 0) scale(1)';
        layer.style.transition = 'transform 0.3s ease-out';
      });
    });
  });
  
  // Scroll-based parallax for full-page sections
  const parallaxSections = document.querySelectorAll('.parallax-section');
  
  if (parallaxSections.length > 0) {
    window.addEventListener('scroll', function() {
      const scrollY = window.pageYOffset;
      
      parallaxSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const speed = section.getAttribute('data-speed') || 0.5;
        
        // Only apply parallax when section is in view
        if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
          const yPos = -(scrollY * speed);
          const parallaxBg = section.querySelector('.parallax-bg');
          
          if (parallaxBg) {
            parallaxBg.style.transform = `translateY(${yPos}px)`;
          }
        }
      });
    });
  }
  
  // Parallax for showcase cards on scroll
  const showcaseCards = document.querySelectorAll('.showcase-card');
  
  window.addEventListener('scroll', function() {
    const scrollY = window.pageYOffset;
    
    showcaseCards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const windowCenter = window.innerHeight / 2;
      const distance = cardCenter - windowCenter;
      
      // Apply subtle parallax effect based on distance from center
      const maxDistance = window.innerHeight;
      const normalizedDistance = Math.max(-1, Math.min(1, distance / maxDistance));
      const parallaxOffset = normalizedDistance * 20;
      
      // Apply different speeds for different cards
      const speed = 0.5 + (index * 0.1);
      const yPos = parallaxOffset * speed;
      
      card.style.transform = `translateY(${yPos}px)`;
    });
  });
  
  // Parallax for page header
  const pageHeader = document.querySelector('.page-header');
  
  if (pageHeader) {
    window.addEventListener('scroll', function() {
      const scrollY = window.pageYOffset;
      const headerRect = pageHeader.getBoundingClientRect();
      
      // Only apply when header is still visible
      if (headerRect.bottom > 0) {
        const yPos = scrollY * 0.5;
        pageHeader.style.transform = `translateY(${yPos}px)`;
        pageHeader.style.opacity = 1 - (scrollY / 500);
      }
    });
  }
}

function initPerformanceDemo() {
  const runTestBtn = document.getElementById('run-performance-test');
  
  if (runTestBtn) {
    runTestBtn.addEventListener('click', function() {
      // Simulate running a performance test
      this.textContent = 'Running...';
      this.disabled = true;
      
      // Show progress
      const metricsContainer = document.querySelector('.performance-metrics');
      const progressBar = document.createElement('div');
      progressBar.className = 'progress-bar';
      progressBar.innerHTML = '<div class="progress-fill"></div>';
      metricsContainer.appendChild(progressBar);
      
      const progressFill = progressBar.querySelector('.progress-fill');
      let progress = 0;
      
      const progressInterval = setInterval(() => {
        progress += 10;
        progressFill.style.width = progress + '%';
        
        if (progress >= 100) {
          clearInterval(progressInterval);
          
          setTimeout(() => {
            // Update metrics with new values
            const metrics = document.querySelectorAll('.metric-value');
            if (metrics[0]) metrics[0].textContent = '0.8s'; // Load Time
            if (metrics[1]) metrics[1].textContent = '198KB'; // Page Size
            
            // Add new metrics
            const newMetrics = [
              { label: 'Performance Score', value: '95/100' },
              { label: 'First Contentful Paint', value: '0.6s' },
              { label: 'Largest Contentful Paint', value: '1.2s' }
            ];
            
            newMetrics.forEach(metric => {
              const metricElement = document.createElement('div');
              metricElement.className = 'metric';
              metricElement.innerHTML = `
                <span class="metric-label">${metric.label}</span>
                <span class="metric-value">${metric.value}</span>
              `;
              metricsContainer.appendChild(metricElement);
            });
            
            // Remove progress bar
            progressBar.remove();
            
            this.textContent = 'Test Complete';
            
            setTimeout(() => {
              this.textContent = 'Run Test';
              this.disabled = false;
            }, 2000);
          }, 500);
        }
      }, 100);
    });
  }
}

// Add smooth scroll behavior for parallax sections
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Initialize smooth scroll on page load
initSmoothScroll();