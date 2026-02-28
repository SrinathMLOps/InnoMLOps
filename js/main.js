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
    // Real-time validation for name fields (block numbers and special chars)
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    
    if (firstNameInput) {
      firstNameInput.addEventListener('input', (e) => {
        // Remove any character that is not a letter, space, hyphen, or apostrophe
        e.target.value = e.target.value.replace(/[^A-Za-z\s\-']/g, '');
      });
      
      // Validate on blur (when leaving the field)
      firstNameInput.addEventListener('blur', () => {
        validateField(firstNameInput, 'firstNameError', 
          'First name must be at least 2 letters (no numbers or special characters)');
      });
    }
    
    if (lastNameInput) {
      lastNameInput.addEventListener('input', (e) => {
        // Remove any character that is not a letter, space, hyphen, or apostrophe
        e.target.value = e.target.value.replace(/[^A-Za-z\s\-']/g, '');
      });
      
      // Validate on blur
      lastNameInput.addEventListener('blur', () => {
        validateField(lastNameInput, 'lastNameError', 
          'Last name must be at least 2 letters (no numbers or special characters)');
      });
    }

    // Real-time validation for company name
    const companyInput = document.getElementById('company');
    if (companyInput) {
      companyInput.addEventListener('input', (e) => {
        // Allow letters, numbers, spaces, and basic punctuation only
        e.target.value = e.target.value.replace(/[^A-Za-z0-9\s\-&.,()]/g, '');
      });
      
      companyInput.addEventListener('blur', () => {
        const errorSpan = document.getElementById('companyError');
        const value = companyInput.value.trim();
        const hasLetters = /[a-zA-Z]/.test(value);
        
        if (!value) {
          companyInput.classList.add('error');
          errorSpan.textContent = 'Company name is required';
        } else if (value.length < 2) {
          companyInput.classList.add('error');
          errorSpan.textContent = 'Company name must be at least 2 characters';
        } else if (!hasLetters) {
          companyInput.classList.add('error');
          errorSpan.textContent = 'Company name must contain letters (not just numbers)';
        } else {
          companyInput.classList.remove('error');
          errorSpan.textContent = '';
        }
      });
    }

    // Email validation on blur and input
    const emailInput = document.getElementById('email');
    if (emailInput) {
      emailInput.addEventListener('input', (e) => {
        // Remove any invalid email characters as user types
        e.target.value = e.target.value.replace(/[^a-zA-Z0-9._%+\-@]/g, '');
      });
      
      emailInput.addEventListener('blur', () => {
        const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
        const errorSpan = document.getElementById('emailError');
        
        if (emailInput.value.trim() && !emailRegex.test(emailInput.value.trim())) {
          emailInput.classList.add('error');
          errorSpan.textContent = 'Please enter a valid email address (e.g., name@company.com)';
        } else if (!emailInput.value.trim()) {
          emailInput.classList.add('error');
          errorSpan.textContent = 'Email address is required';
        } else {
          emailInput.classList.remove('error');
          errorSpan.textContent = '';
        }
      });
    }

    // Service validation on change
    const serviceInput = document.getElementById('service');
    if (serviceInput) {
      serviceInput.addEventListener('change', () => {
        const errorSpan = document.getElementById('serviceError');
        if (!serviceInput.value) {
          serviceInput.classList.add('error');
          errorSpan.textContent = 'Please select a service';
        } else {
          serviceInput.classList.remove('error');
          errorSpan.textContent = '';
        }
      });
    }

    // Message validation on blur
    const messageInput = document.getElementById('message');
    if (messageInput) {
      messageInput.addEventListener('blur', () => {
        const errorSpan = document.getElementById('messageError');
        const value = messageInput.value.trim();
        const hasLetters = /[a-zA-Z]/.test(value);
        
        if (!value) {
          messageInput.classList.add('error');
          errorSpan.textContent = 'Project details are required';
        } else if (value.length < 20) {
          messageInput.classList.add('error');
          errorSpan.textContent = 'Project details must be at least 20 characters';
        } else if (!hasLetters) {
          messageInput.classList.add('error');
          errorSpan.textContent = 'Project details must contain text (not just numbers or symbols)';
        } else {
          messageInput.classList.remove('error');
          errorSpan.textContent = '';
        }
      });
    }

    // Helper function to validate name fields
    function validateField(input, errorId, errorMessage) {
      const errorSpan = document.getElementById(errorId);
      const nameRegex = /^[A-Za-z\s\-']+$/;
      const value = input.value.trim();
      
      if (!value) {
        input.classList.add('error');
        errorSpan.textContent = errorMessage;
      } else if (value.length < 2) {
        input.classList.add('error');
        errorSpan.textContent = errorMessage;
      } else if (!nameRegex.test(value)) {
        input.classList.add('error');
        errorSpan.textContent = errorMessage;
      } else {
        input.classList.remove('error');
        errorSpan.textContent = '';
      }
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formSuccess.style.display = 'none';
      formError.style.display = 'none';

      // Silent validation check (no error display)
      let valid = true;

      // Validate names
      const nameRegex = /^[A-Za-z\s\-']+$/;
      
      if (!firstNameInput.value.trim() || firstNameInput.value.trim().length < 2 || !nameRegex.test(firstNameInput.value.trim())) {
        valid = false;
      }
      
      if (!lastNameInput.value.trim() || lastNameInput.value.trim().length < 2 || !nameRegex.test(lastNameInput.value.trim())) {
        valid = false;
      }

      // Validate email
      const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        valid = false;
      }

      // Validate company
      const companyValue = companyInput.value.trim();
      const companyHasLetters = /[a-zA-Z]/.test(companyValue);
      if (!companyValue || companyValue.length < 2 || !companyHasLetters) {
        valid = false;
      }

      // Validate service
      if (!serviceInput.value) {
        valid = false;
      }

      // Validate message
      const messageValue = messageInput.value.trim();
      const hasLetters = /[a-zA-Z]/.test(messageValue);
      if (!messageValue || messageValue.length < 20 || !hasLetters) {
        valid = false;
      }

      // Validate GDPR checkbox
      const gdprCheckbox = document.getElementById('gdpr');
      if (!gdprCheckbox.checked) {
        valid = false;
      }

      if (!valid) {
        // Don't show error message, user already saw errors when leaving fields
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
