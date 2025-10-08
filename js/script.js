// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const reservationForm = document.getElementById('reservationForm');
const formMessage = document.getElementById('formMessage');

// Gallery Carousel Elements
const galleryContainer = document.querySelector('.gallery-container');
const gallerySlides = document.querySelectorAll('.gallery-slide');
const galleryPrev = document.querySelector('.gallery-prev');
const galleryNext = document.querySelector('.gallery-next');
const galleryIndicators = document.querySelectorAll('.indicator');

// Gallery Carousel State
let currentSlide = 0;
const totalSlides = gallerySlides.length;

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
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

// Gallery Carousel Functions
function showSlide(index) {
  // Ensure index is within bounds
  if (index < 0) {
    currentSlide = totalSlides - 1;
  } else if (index >= totalSlides) {
    currentSlide = 0;
  } else {
    currentSlide = index;
  }
  
  // Update slide position
  const offset = -currentSlide * 100;
  galleryContainer.style.transform = `translateX(${offset}%)`;
  
  // Update indicators
  galleryIndicators.forEach((indicator, i) => {
    if (i === currentSlide) {
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }
  });
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function goToSlide(index) {
  showSlide(index);
}

// Gallery Carousel Event Listeners
if (galleryPrev) {
  galleryPrev.addEventListener('click', prevSlide);
}

if (galleryNext) {
  galleryNext.addEventListener('click', nextSlide);
}

if (galleryIndicators) {
  galleryIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToSlide(index));
  });
}

// Touch support for mobile gallery
let touchStartX = 0;
let touchEndX = 0;

if (galleryContainer) {
  galleryContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  galleryContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
}

function handleSwipe() {
  const swipeThreshold = 50; // Minimum distance for swipe
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swiped left - go to next slide
      nextSlide();
    } else {
      // Swiped right - go to previous slide
      prevSlide();
    }
  }
}

// Auto-advance gallery (optional)
let galleryInterval;

function startGalleryAutoPlay() {
  galleryInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function stopGalleryAutoPlay() {
  clearInterval(galleryInterval);
}

// Start auto-play and pause on hover
if (galleryContainer) {
  startGalleryAutoPlay();
  
  galleryContainer.addEventListener('mouseenter', stopGalleryAutoPlay, { passive: true });
  galleryContainer.addEventListener('mouseleave', startGalleryAutoPlay, { passive: true });
  
  // Also pause on touch for mobile
  galleryContainer.addEventListener('touchstart', stopGalleryAutoPlay, { passive: true });
  galleryContainer.addEventListener('touchend', startGalleryAutoPlay, { passive: true });
}

// Form Validation and Submission
if (reservationForm) {
  reservationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const guests = document.getElementById('guests').value;
    const requests = document.getElementById('requests').value.trim();
    
    // Basic validation
    if (!name || !email || !phone || !date || !time || !guests) {
      showFormMessage('Per favore, compila tutti i campi obbligatori.', 'error');
      return;
    }
    
    // Email validation
    if (!isValidEmail(email)) {
      showFormMessage('Per favore, inserisci un indirizzo email valido.', 'error');
      return;
    }
    
    // Phone validation
    if (!isValidPhone(phone)) {
      showFormMessage('Per favore, inserisci un numero di telefono valido.', 'error');
      return;
    }
    
    // Date validation (not in the past)
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      showFormMessage('La data di prenotazione non può essere nel passato.', 'error');
      return;
    }
    
    // Simulate form submission (replace with actual implementation)
    simulateReservationSubmission({ 
      name, 
      email, 
      phone, 
      date, 
      time, 
      guests, 
      requests 
    });
  });
}

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone validation function
function isValidPhone(phone) {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 8;
}

// Show form message
function showFormMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
  formMessage.style.display = 'block';
  
  // Scroll to message
  formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  
  // Hide message after 5 seconds
  setTimeout(() => {
    formMessage.style.display = 'none';
  }, 5000);
}

// Simulate reservation submission (replace with actual implementation)
function simulateReservationSubmission(reservationData) {
  // Show loading message
  showFormMessage('Elaborazione prenotazione in corso...', 'info');
  
  // Simulate API call
  setTimeout(() => {
    // Reset form
    reservationForm.reset();
    
    // Show success message
    showFormMessage(`Grazie ${reservationData.name}! La tua prenotazione per ${reservationData.guests} persone il ${formatDate(reservationData.date)} alle ${reservationData.time} è stata confermata. Ti abbiamo inviato una email di conferma a ${reservationData.email}.`, 'success');
    
    // In a real implementation, you would send the data to a server here
    console.log('Reservation data submitted:', reservationData);
    
    // Example of what a real implementation might look like:
    /*
    fetch('https://your-api-endpoint.com/reservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationData),
    })
    .then(response => response.json())
    .then(data => {
      showFormMessage(`Grazie ${reservationData.name}! La tua prenotazione per ${reservationData.guests} persone il ${formatDate(reservationData.date)} alle ${reservationData.time} è stata confermata. Ti abbiamo inviato una email di conferma a ${reservationData.email}.`, 'success');
      reservationForm.reset();
    })
    .catch(error => {
      showFormMessage('Si è verificato un errore durante la prenotazione. Riprova più tardi o contattaci direttamente.', 'error');
      console.error('Error:', error);
    });
    */
  }, 1500);
}

// Format date for display
function formatDate(dateString) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('it-IT', options);
}

// Set minimum date for reservation (today)
document.addEventListener('DOMContentLoaded', () => {
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    dateInput.setAttribute('min', formattedDate);
  }
  
  // Initialize gallery
  if (gallerySlides.length > 0) {
    showSlide(0);
  }
  
  // Set current year in footer
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.menu-category, .gallery-carousel, .about-text, .reservation-info, .contact-info');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Header background on scroll - ottimizzato con passive listener
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 100) {
    header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
  } else {
    header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
  }
}, { passive: true });

// Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
    });
  }
});

// Utility function to check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Add active class to navigation based on scroll position - ottimizzato con passive listener
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
}, { passive: true });

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  console.log('Osteria della Tradizione website loaded successfully!');
  
  // Handle keyboard navigation for gallery - ottimizzato con passive listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  }, { passive: true });
  
  // Pause gallery auto-play when page is not visible - ottimizzato con passive listener
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopGalleryAutoPlay();
    } else {
      startGalleryAutoPlay();
    }
  }, { passive: true });
});