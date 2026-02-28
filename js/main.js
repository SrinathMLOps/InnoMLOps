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
    dropdown.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) {
        dropdown.classList.add('open');
      }
    });
    
    dropdown.addEventListener('mouseleave', () => {
      if (window.innerWidth > 768) {
        dropdown.classList.remove('open');
      }
    });
    
    // Click behavior
    link.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (window.innerWidth <= 768) {
        // Mobile: toggle dropdown
        dropdown.classList.toggle('open');
      }
      // Desktop: do nothing (hover handles it)
    });
  });

  // Close dropdown when clicking anywhere else
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-dropdown')) {
      document.querySelectorAll('.has-dropdown').forEach(item => {
        item.classList.remove('open');
      });
    }
  });

  // Close dropdowns when clicking other nav links
  document.querySelectorAll('#mainNav a:not(.has-dropdown a)').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.has-dropdown').forEach(item => {
        item.classList.remove('open');
      });
    });
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
      // Close mobile nav
      if (window.innerWidth <= 768 && !link.closest('.has-dropdown')) {
        mainNav.classList.remove('open');
        navToggle.querySelector('i').className = 'fa fa-bars';
      }
      
      // Close any open dropdowns when clicking non-dropdown links
      if (!link.closest('.has-dropdown')) {
        document.querySelectorAll('.has-dropdown').forEach(item => {
          item.classList.remove('open');
        });
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
      let errorMessage = 'Please fill in all required fields correctly.';
      
      required.forEach(field => {
        field.style.borderColor = '';
        if (!field.value.trim() || (field.type === 'checkbox' && !field.checked)) {
          field.style.borderColor = '#e53935';
          valid = false;
        }
      });

      // Name validation (no numbers or special chars except space, hyphen, apostrophe)
      const nameRegex = /^[A-Za-z\s\-']+$/;
      const firstName = document.getElementById('firstName');
      const lastName = document.getElementById('lastName');
      
      if (firstName && !nameRegex.test(firstName.value.trim())) {
        firstName.style.borderColor = '#e53935';
        errorMessage = 'First name should only contain letters, spaces, hyphens, or apostrophes.';
        valid = false;
      }
      
      if (lastName && !nameRegex.test(lastName.value.trim())) {
        lastName.style.borderColor = '#e53935';
        errorMessage = 'Last name should only contain letters, spaces, hyphens, or apostrophes.';
        valid = false;
      }

      // Email format check (strict validation)
      const emailField = document.getElementById('email');
      const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
      if (emailField && !emailRegex.test(emailField.value.trim())) {
        emailField.style.borderColor = '#e53935';
        errorMessage = 'Please enter a valid email address (e.g., name@company.com).';
        valid = false;
      }

      // Company name validation (letters, numbers, basic punctuation only)
      const companyField = document.getElementById('company');
      const companyRegex = /^[A-Za-z0-9\s\-&.,()]+$/;
      if (companyField && !companyRegex.test(companyField.value.trim())) {
        companyField.style.borderColor = '#e53935';
        errorMessage = 'Company name contains invalid characters.';
        valid = false;
      }

      // Project details validation (minimum 20 chars, must contain letters)
      const messageField = document.getElementById('message');
      const messageValue = messageField.value.trim();
      const hasLetters = /[a-zA-Z]/.test(messageValue);
      
      if (messageField && (messageValue.length < 20 || !hasLetters)) {
        messageField.style.borderColor = '#e53935';
        errorMessage = 'Project details must be at least 20 characters and contain meaningful text (not just numbers).';
        valid = false;
      }

      // GDPR checkbox validation
      const gdprCheckbox = document.getElementById('gdpr');
      if (gdprCheckbox && !gdprCheckbox.checked) {
        errorMessage = 'You must agree to the Privacy Policy to continue.';
        valid = false;
      }

      if (!valid) {
        formError.textContent = errorMessage;
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
        const target = counter.textContent.trim();
        
        // Skip animation for percentage and time formats
        if (target.includes('%') || target.includes('/')) {
          return; // Keep original text as-is
        }
        
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
