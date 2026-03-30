(function () {
  'use strict';
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var hasError = false;
      var nameInput = document.getElementById('form-name');
      var phoneInput = document.getElementById('form-phone');
      var serviceInput = document.getElementById('form-service');
      var submitBtn = document.getElementById('form-submit-btn');

      var nameErr = document.getElementById('error-name');
      var phoneErr = document.getElementById('error-phone');
      var serviceErr = document.getElementById('error-service');

      // Reset
      [nameInput, phoneInput, serviceInput].forEach(function(el) { el.classList.remove('is-invalid'); });
      [nameErr, phoneErr, serviceErr].forEach(function(el) { el.classList.remove('is-visible'); el.textContent = ''; });

      var name = nameInput.value.trim();
      var phone = phoneInput.value.trim();
      var service = serviceInput.value;

      if (!name) {
        nameInput.classList.add('is-invalid');
        nameErr.textContent = 'Please enter your name.';
        nameErr.classList.add('is-visible');
        hasError = true;
      }
      
      if (!phone) {
        phoneInput.classList.add('is-invalid');
        phoneErr.textContent = 'Please enter your phone number.';
        phoneErr.classList.add('is-visible');
        hasError = true;
      }

      if (!service) {
        serviceInput.classList.add('is-invalid');
        serviceErr.textContent = 'Please select a service.';
        serviceErr.classList.add('is-visible');
        hasError = true;
      }

      if (hasError) return;

      // Show sending state
      submitBtn.textContent = 'Sending...';
      submitBtn.style.opacity = '0.7';
      submitBtn.style.pointerEvents = 'none';

      // Build WhatsApp message
      var timeElem = document.getElementById('form-time');
      var time = timeElem ? timeElem.value.trim() : '';
      var message = 'Hi, I would like to book an appointment at Oriiface Dental Care.\n\n';
      message += 'Name: ' + name + '\n';
      message += 'Phone: ' + phone + '\n';
      message += 'Service: ' + serviceInput.selectedOptions[0].text + '\n';
      if (time) {
        message += 'Preferred Time: ' + time + '\n';
      }

      // UX Delay for request feeling
      setTimeout(function() {
        var whatsappUrl = 'https://wa.me/919540670276?text=' + encodeURIComponent(message);
        window.open(whatsappUrl, '_blank');

        var formEl = document.getElementById('contact-form');
        formEl.innerHTML = '<div style="text-align:center;padding:2rem 0"><h3 style="font-family:var(--font-heading);margin-bottom:0.5rem;color:var(--color-primary)">Request Sent</h3><p style="color:var(--color-text-light)">We will get back to you shortly. You can also reach us at 095406 70276.</p></div>';
      }, 600);
    });
  }
})();
