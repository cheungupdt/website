document.addEventListener('DOMContentLoaded', function() {
  const lightboxLinks = document.querySelectorAll('[data-lightbox]');
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <button class="lightbox-close">&times;</button>
    <img src="" alt="">
    <div class="lightbox-caption"></div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const lightboxClose = lightbox.querySelector('.lightbox-close');

  let currentLightbox = null;
  let currentIndex = 0;
  let images = [];

  lightboxLinks.forEach((link, index) => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      currentLightbox = this.getAttribute('data-lightbox');
      images = Array.from(document.querySelectorAll(`[data-lightbox="${currentLightbox}"]`));
      currentIndex = index;
      showImage(index);
    });
  });

  function showImage(index) {
    const image = images[index];
    lightboxImg.src = image.href;
    lightboxCaption.textContent = image.getAttribute('data-title') || '';
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
    currentLightbox = null;
    images = [];
  }

  lightboxClose.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (lightbox.style.display === 'block') {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        currentIndex--;
        showImage(currentIndex);
      } else if (e.key === 'ArrowRight' && currentIndex < images.length - 1) {
        currentIndex++;
        showImage(currentIndex);
      }
    }
  });
});