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

  // Desktop: Hover to open dropdown
  // Mobile: Click to toggle dropdown
  document.querySelectorAll('.has-dropdown').forEach(dropdown => {
    const link = dropdown.querySelector('a');
    
    // Desktop hover behavior
    if (window.innerWidth > 768) {
      dropdown.addEventListener('mouseenter', () => {
        dropdown.classList.add('open');
      });
      
      dropdown.addEventListener('mouseleave', () => {
        dropdown.classList.remove('open');
      });
    }
    
    // Mobile click behavior
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle('open');
      } else {
        // On desktop, prevent default but allow hover to work
        e.preventDefault();
      }
    });
  });

  // Close dropdown when clicking outside (mobile only)
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && !e.target.closest('.has-dropdown')) {
      document.querySelectorAll('.has-dropdown').forEach(item => {
        item.classList.remove('open');
      });
    }
  });

  // Re-initialize on window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Close all dropdowns on resize
      document.querySelectorAll('.has-dropdown').forEach(item => {
        item.classList.remove('open');
      });
    }, 250);
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
        phone: form.phone?.value || '',
        company: form.company.value,
        service: form.service.value,
        budget: form.budget?.value || '',
        message: form.message.value,
        _replyto: form.email.value,
        _subject: `New Enquiry from ${form.firstName.value} ${form.lastName.value} - ${form.company.value}`
      };

      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      // ── Send via FormSubmit (No signup required!) ──
      // This will send to both email addresses
      const formData = new FormData();
      formData.append('firstName', form.firstName.value);
      formData.append('lastName', form.lastName.value);
      formData.append('email', form.email.value);
      formData.append('phone', form.phone?.value || 'Not provided');
      formData.append('company', form.company.value);
      formData.append('service', form.service.value);
      formData.append('budget', form.budget?.value || 'Not specified');
      formData.append('message', form.message.value);
      formData.append('_subject', `New Enquiry from ${form.firstName.value} ${form.lastName.value} - ${form.company.value}`);
      formData.append('_cc', 'contact@innomlopssolutions.com');
      formData.append('_template', 'table');
      formData.append('_captcha', 'false');

      fetch('https://formsubmit.co/ceo@innomlopssolutions.com', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(res => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        if (res.ok) { 
          showSuccess(); 
        } else { 
          showError(); 
        }
      })
      .catch(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        showError();
      });
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
