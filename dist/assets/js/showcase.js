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
  // Initialize parallax layers
  const parallaxLayers = document.querySelectorAll('.parallax-layer');
  
  if (parallaxLayers.length === 0) return;
  
  // Add mouse move effect for parallax demo
  const parallaxDemo = document.querySelector('.parallax-demo');
  
  if (parallaxDemo) {
    parallaxDemo.addEventListener('mousemove', function(e) {
      const rect = parallaxDemo.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      parallaxLayers.forEach(layer => {
        const speed = parseFloat(layer.getAttribute('data-speed')) || 0.5;
        const xPos = (x - 0.5) * 20 * speed;
        const yPos = (y - 0.5) * 20 * speed;
        
        layer.style.transform = `translate(${xPos}px, ${yPos}px)`;
      });
    });
    
    // Reset on mouse leave
    parallaxDemo.addEventListener('mouseleave', function() {
      parallaxLayers.forEach(layer => {
        layer.style.transform = 'translate(0, 0)';
      });
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
      
      setTimeout(() => {
        // Update metrics with new values
        const metrics = document.querySelectorAll('.metric-value');
        metrics[0].textContent = '0.8s'; // Load Time
        metrics[1].textContent = '198KB'; // Page Size
        
        // Add a new metric
        const metricsContainer = document.querySelector('.performance-metrics');
        const newMetric = document.createElement('div');
        newMetric.className = 'metric';
        newMetric.innerHTML = `
          <span class="metric-label">Performance Score</span>
          <span class="metric-value">95/100</span>
        `;
        metricsContainer.appendChild(newMetric);
        
        this.textContent = 'Test Complete';
        
        setTimeout(() => {
          this.textContent = 'Run Test';
          this.disabled = false;
        }, 2000);
      }, 2000);
    });
  }
}