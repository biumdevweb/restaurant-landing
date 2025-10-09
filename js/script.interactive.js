// JavaScript per le interazioni avanzate del sito

// DOM Elements
const menuItems = document.querySelectorAll('.menu-item');
const formGroups = document.querySelectorAll('.form-group');
const submitBtn = document.querySelector('.submit-btn');
const formMessage = document.getElementById('formMessage');
const reservationForm = document.getElementById('reservationForm');

// Micro-interazioni per i piatti del menu
menuItems.forEach(item => {
  // Espandi/contrai il piatto al click
  item.addEventListener('click', function(e) {
    // Se il click è su un bottone, non espandere
    if (e.target.classList.contains('menu-action-btn')) return;
    
    // Chiudi gli altri piatti espansi
    menuItems.forEach(otherItem => {
      if (otherItem !== item && otherItem.classList.contains('expanded')) {
        otherItem.classList.remove('expanded');
        // Rimuovi i bottoni di azione
        const actions = otherItem.querySelector('.menu-item-actions');
        if (actions) actions.remove();
      }
    });
    
    // Espandi/contrai il piatto corrente
    this.classList.toggle('expanded');
    
    // Aggiungi bottoni di azione se espanso
    if (this.classList.contains('expanded')) {
      const actionsContainer = document.createElement('div');
      actionsContainer.className = 'menu-item-actions';
      
      const addToOrderBtn = document.createElement('button');
      addToOrderBtn.className = 'menu-action-btn';
      addToOrderBtn.textContent = 'Aggiungi all\'ordine';
      
      const detailsBtn = document.createElement('button');
      detailsBtn.className = 'menu-action-btn secondary';
      detailsBtn.textContent = 'Dettagli';
      
      actionsContainer.appendChild(addToOrderBtn);
      actionsContainer.appendChild(detailsBtn);
      
      this.appendChild(actionsContainer);
      
      // Animazione di entrata per i bottoni
      setTimeout(() => {
        actionsContainer.style.opacity = '1';
        actionsContainer.style.transform = 'translateY(0)';
      }, 10);
    } else {
      // Rimuovi i bottoni di azione
      const actions = this.querySelector('.menu-item-actions');
      if (actions) actions.remove();
    }
  });
});

// Validazione in tempo reale per i campi del form
formGroups.forEach(group => {
  const input = group.querySelector('input, textarea, select');
  if (!input) return;
  
  input.addEventListener('blur', function() {
    validateField(group, input);
  });
  
  input.addEventListener('input', function() {
    // Rimuovi lo stato di errore mentre l'utente scrive
    if (group.classList.contains('invalid')) {
      group.classList.remove('invalid');
    }
  });
});

function validateField(group, input) {
  const value = input.value.trim();
  const inputType = input.type;
  let isValid = false;
  
  if (!value) {
    group.classList.add('invalid');
    group.classList.remove('valid');
    return false;
  }
  
  switch (inputType) {
    case 'email':
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      break;
    case 'tel':
      isValid = /^[\d\s\-\+\(\)]+$/.test(value) && value.replace(/\D/g, '').length >= 8;
      break;
    case 'date':
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      isValid = selectedDate >= today;
      break;
    default:
      isValid = value.length > 0;
  }
  
  if (isValid) {
    group.classList.add('valid');
    group.classList.remove('invalid');
  } else {
    group.classList.add('invalid');
    group.classList.remove('valid');
  }
  
  return isValid;
}

// Sistema di prenotazione avanzato con conferma visiva
if (reservationForm) {
  reservationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Valida tutti i campi
    let isFormValid = true;
    formGroups.forEach(group => {
      const input = group.querySelector('input, textarea, select');
      if (input) {
        const fieldValid = validateField(group, input);
        if (!fieldValid) isFormValid = false;
      }
    });
    
    if (!isFormValid) {
      showFormMessage('Per favore, compila tutti i campi obbligatori correttamente.', 'error');
      return;
    }
    
    // Mostra indicatore di caricamento
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simula invio del form
    setTimeout(() => {
      // Rimuovi indicatore di caricamento
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      
      // Mostra conferma avanzata
      showAdvancedConfirmation();
    }, 2000);
  });
}

function showFormMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
  formMessage.style.display = 'block';
  
  // Aggiungi classe per l'animazione
  setTimeout(() => {
    formMessage.classList.add('show');
  }, 10);
  
  // Nascondi il messaggio dopo 5 secondi
  setTimeout(() => {
    formMessage.classList.remove('show');
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 300);
  }, 5000);
}

function showAdvancedConfirmation() {
  // Crea il modal di conferma
  const confirmationModal = document.createElement('div');
  confirmationModal.className = 'reservation-confirmation';
  
  // Ottieni i dati dal form
  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const guests = document.getElementById('guests').value;
  
  // Formatta la data
  const formattedDate = new Date(date).toLocaleDateString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  
  confirmationModal.innerHTML = `
    <div class="confirmation-content">
      <div class="confirmation-header">
        <div class="confirmation-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        </div>
        <h2>Prenotazione Confermata!</h2>
        <p>Grazie ${name}, la tua prenotazione è stata confermata.</p>
      </div>
      <div class="confirmation-details">
        <h3>Dettagli Prenotazione</h3>
        <p><strong>Data:</strong> ${formattedDate}</p>
        <p><strong>Ora:</strong> ${time}</p>
        <p><strong>Ospiti:</strong> ${guests}</p>
        <p><strong>Email di conferma:</strong> Inviate a ${document.getElementById('email').value}</p>
      </div>
      <div class="confirmation-actions">
        <button class="confirmation-btn primary">Chiudi</button>
        <button class="confirmation-btn secondary">Modifica Prenotazione</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(confirmationModal);
  
  // Mostra il modal con animazione
  setTimeout(() => {
    confirmationModal.classList.add('show');
  }, 10);
  
  // Gestisci i click sui bottoni
  const closeBtn = confirmationModal.querySelector('.confirmation-btn.primary');
  const modifyBtn = confirmationModal.querySelector('.confirmation-btn.secondary');
  
  closeBtn.addEventListener('click', function() {
    closeConfirmationModal();
  });
  
  modifyBtn.addEventListener('click', function() {
    closeConfirmationModal();
    // Riporta l'utente al form
    reservationForm.scrollIntoView({ behavior: 'smooth' });
  });
  
  // Chiudi il modal cliccando fuori
  confirmationModal.addEventListener('click', function(e) {
    if (e.target === confirmationModal) {
      closeConfirmationModal();
    }
  });
}

function closeConfirmationModal() {
  const modal = document.querySelector('.reservation-confirmation');
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(modal);
    }, 300);
  }
}

// Effetto parallax per hero section
function setupParallax() {
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');
  
  if (!hero || !heroContent) return;
  
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    const yPos = -(scrolled * parallaxSpeed);
    
    // Applica la trasformazione solo se l'hero è visibile
    if (scrolled < hero.offsetHeight) {
      heroContent.style.transform = `translate3d(0, ${yPos}px, 0)`;
    }
  }, { passive: true });
}

// Animazioni di entrata più sofisticate per le sezioni
function setupScrollAnimations() {
  const sections = document.querySelectorAll('.menu-category, .testimonial-item, .gallery-slide, .about-text, .reservation-info, .contact-info');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Aggiungi un piccolo ritardo per un effetto a cascata
        setTimeout(() => {
          entry.target.classList.add('animated');
        }, index * 100);
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    section.style.opacity = '0';
    observer.observe(section);
  });
}

// Lazy loading avanzato per le immagini
function setupAdvancedLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // Aggiungi un leggero fade-in quando l'immagine carica
          img.style.opacity = '0';
          img.style.transition = 'opacity 0.5s ease';
          
          img.src = img.dataset.src;
          
          img.onload = function() {
            img.style.opacity = '1';
          };
          
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// Inizializza tutte le funzionalità interattive
document.addEventListener('DOMContentLoaded', function() {
  setupParallax();
  setupScrollAnimations();
  setupAdvancedLazyLoading();
  
  // Aggiungi un tocco finale con un'animazione al caricamento
  document.body.classList.add('loaded');
});