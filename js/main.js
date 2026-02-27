/* ===================================
   YourBusiness – Main JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ─── STICKY HEADER SHADOW ────────────────────────────────
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 4px 30px rgba(21,101,192,0.18)';
    } else {
      header.style.boxShadow = '0 2px 20px rgba(21,101,192,0.1)';
    }
  });

  // ─── ACTIVE NAV ON SCROLL ────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#mainNav a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  });

  // ─── MOBILE NAV TOGGLE ───────────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    const icon = navToggle.querySelector('i');
    icon.className = mainNav.classList.contains('open') ? 'fa fa-times' : 'fa fa-bars';
  });

  // Mobile dropdown toggle
  document.querySelectorAll('.has-dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });

  // Close nav when a link is clicked (mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768 && !link.closest('.has-dropdown')) {
        mainNav.classList.remove('open');
        navToggle.querySelector('i').className = 'fa fa-bars';
      }
    });
  });

  // ─── ENQUIRY FORM VALIDATION & SUBMIT ────────────────────
  const form = document.getElementById('enquiryForm');
  const formSuccess = document.getElementById('formSuccess');
  const formError = document.getElementById('formError');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formSuccess.style.display = 'none';
      formError.style.display = 'none';

      // Validate required fields
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(field => {
        field.style.borderColor = '';
        if (!field.value.trim() || (field.type === 'checkbox' && !field.checked)) {
          field.style.borderColor = '#e53935';
          valid = false;
        }
      });

      // Email format check
      const emailField = document.getElementById('email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailField && !emailRegex.test(emailField.value)) {
        emailField.style.borderColor = '#e53935';
        valid = false;
      }

      if (!valid) {
        formError.style.display = 'flex';
        formError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        return;
      }

      // ── Collect form data ──
      const data = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        phone: form.phone.value,
        company: form.company.value,
        service: form.service.value,
        budget: form.budget.value,
        message: form.message.value
      };

      // ── Send via Formspree (replace YOUR_FORM_ID) ──
      // Uncomment and add your Formspree endpoint:
      /*
      fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(res => {
        if (res.ok) { showSuccess(); } else { showError(); }
      })
      .catch(() => showError());
      */

      // For now – simulate a successful submission:
      console.log('Form submitted:', data);
      showSuccess();
    });
  }

  function showSuccess() {
    formSuccess.style.display = 'flex';
    form.reset();
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  function showError() {
    formError.textContent = 'Something went wrong. Please try again or email us directly.';
    formError.style.display = 'flex';
  }

  // ─── SMOOTH SCROLL ───────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = document.getElementById('header').offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ─── STATS COUNTER ANIMATION ─────────────────────────────
  const statsSection = document.querySelector('.stats-section');
  let counted = false;
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      document.querySelectorAll('.stat-item h3').forEach(counter => {
        const target = counter.textContent;
        const num = parseInt(target.replace(/\D/g, ''));
        const suffix = target.replace(/[0-9]/g, '');
        let current = 0;
        const increment = Math.ceil(num / 60);
        const interval = setInterval(() => {
          current = Math.min(current + increment, num);
          counter.textContent = current + suffix;
          if (current === num) clearInterval(interval);
        }, 30);
      });
    }
  }, { threshold: 0.3 });
  if (statsSection) observer.observe(statsSection);

  // ─── CARD ENTRANCE ANIMATION ─────────────────────────────
  const animItems = document.querySelectorAll('.service-card, .testimonial-card, .feature-item');
  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  animItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(28px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    animObserver.observe(item);
  });

});
