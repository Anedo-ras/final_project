// =======================
// 1. MOBILE NAVIGATION
// =======================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

function toggleMobileNav() {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
  body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
}

function initMobileNav() {
  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileNav);
  }

  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
      body.style.overflow = 'auto';
    });
  });
}

function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-menu a');

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    link.classList.toggle('active', linkPage === currentPage);
  });
}

// =======================
// 2. CONTACT FORM VALIDATION
// =======================
const contactForm = document.getElementById('contactForm');

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showError(fieldId, message) {
  const errorElement = document.getElementById(fieldId);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
}

function hideError(fieldId) {
  const errorElement = document.getElementById(fieldId);
  if (errorElement) {
    errorElement.style.display = 'none';
  }
}

function validateField(fieldId, validator) {
  const field = document.getElementById(fieldId);
  const value = field.value.trim();

  if (!value) {
    showError(`${fieldId}Error`, `This field is required`);
    return false;
  }
  if (validator && !validator(value)) {
    showError(`${fieldId}Error`, `Please enter a valid ${fieldId}`);
    return false;
  }
  hideError(`${fieldId}Error`);
  return true;
}

function validateForm() {
  let isValid = true;
  if (!validateField('name')) isValid = false;
  if (!validateField('email', isValidEmail)) isValid = false;
  if (!validateField('subject')) isValid = false;
  if (!validateField('message')) isValid = false;
  return isValid;
}

function handleFormSubmit(event) {
  event.preventDefault();

  if (validateForm()) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      document.getElementById('successMessage').style.display = 'block';
      document.getElementById('errorMessage').style.display = 'none';
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;

      setTimeout(() => {
        document.getElementById('successMessage').style.display = 'none';
      }, 5000);
    }, 1500);
  } else {
    document.getElementById('errorMessage').style.display = 'block';
    document.getElementById('successMessage').style.display = 'none';
  }
}

function initFormValidation() {
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);

    const formFields = ['name', 'email', 'subject', 'message'];
    formFields.forEach(field => {
      const fieldElement = document.getElementById(field);
      if (fieldElement) {
        fieldElement.addEventListener('input', () => {
          hideError(`${field}Error`);
          document.getElementById('errorMessage').style.display = 'none';
        });
      }
    });
  }
}

// =======================
// 3. ANIMATIONS
// =======================
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.testimonial-dot');
let currentTestimonial = 0;
let testimonialInterval;

function showTestimonial(index) {
  testimonials.forEach(t => t.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));

  testimonials[index].classList.add('active');
  dots[index].classList.add('active');
  currentTestimonial = index;
}

function initTestimonialNav() {
  if (dots.length > 0) {
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        showTestimonial(index);
        clearInterval(testimonialInterval);
        startTestimonialRotation();
      });
    });
  }
}

function startTestimonialRotation() {
  if (testimonials.length > 1) {
    testimonialInterval = setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    }, 5000);
  }
}

function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.feature-card, .portfolio-item, .section-title');

  function checkScroll() {
    const triggerBottom = window.innerHeight * 0.85;
    animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < triggerBottom) {
        element.style.opacity = 1;
        element.style.transform = 'translateY(0)';
      }
    });
  }

  animatedElements.forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  window.addEventListener('load', checkScroll);
  window.addEventListener('scroll', checkScroll);
  checkScroll();
}

function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
}

// =======================
// 4. PORTFOLIO GALLERY
// =======================
const portfolioFilters = document.querySelectorAll('.portfolio-filter');
const portfolioItems = document.querySelectorAll('.portfolio-item');

function filterPortfolio(category) {
  portfolioItems.forEach(item => {
    if (category === 'all' || item.getAttribute('data-category') === category) {
      item.style.display = 'block';
      setTimeout(() => {
        item.style.opacity = 1;
        item.style.transform = 'scale(1)';
      }, 50);
    } else {
      item.style.opacity = 0;
      item.style.transform = 'scale(0.8)';
      setTimeout(() => {
        item.style.display = 'none';
      }, 300);
    }
  });
}

function initPortfolioFilter() {
  if (portfolioFilters.length > 0) {
    portfolioFilters.forEach(filter => {
      filter.addEventListener('click', function () {
        portfolioFilters.forEach(f => f.classList.remove('active'));
        this.classList.add('active');
        const category = this.getAttribute('data-filter');
        filterPortfolio(category);
      });
    });
  }
}

function initPortfolioModal() {
  const items = document.querySelectorAll('.portfolio-item');
  const modal = document.createElement('div');
  modal.className = 'portfolio-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="modal-close">&times;</span>
      <img class="modal-image" src="" alt="">
      <div class="modal-details">
        <h3 class="modal-title"></h3>
        <p class="modal-description"></p>
        <div class="modal-technologies"></div>
        <a href="#" class="btn modal-link" target="_blank">View Project</a>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  items.forEach(item => {
    item.addEventListener('click', function () {
      modal.querySelector('.modal-image').src = this.querySelector('img').src;
      modal.querySelector('.modal-title').textContent = this.getAttribute('data-title') || 'Project Title';
      modal.querySelector('.modal-description').textContent = this.getAttribute('data-description') || 'Project description';
      modal.querySelector('.modal-technologies').textContent = `Technologies: ${this.getAttribute('data-technologies') || 'HTML, CSS, JS'}`;
      modal.querySelector('.modal-link').href = this.getAttribute('data-link') || '#';

      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  });

  modal.querySelector('.modal-close').addEventListener('click', function () {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
}

// =======================
// INIT ALL ON DOM LOAD
// =======================
function initMain() {
  initMobileNav();
  setActiveNavLink();
  initFormValidation();
  initTestimonialNav();
  startTestimonialRotation();
  initScrollAnimations();
  initSmoothScrolling();
  initPortfolioFilter();
  initPortfolioModal();
}

document.addEventListener('DOMContentLoaded', initMain);
