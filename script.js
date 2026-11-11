// 1. Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle.addEventListener('click', function () {
  const open = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

// 2. Services filter (only runs on the services page)
const filterButtons = document.querySelectorAll('.filter-btn');
const services = document.querySelectorAll('.service');
filterButtons.forEach(function (btn) {
  btn.addEventListener('click', function () {
    filterButtons.forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    const choice = btn.dataset.filter;
    services.forEach(function (card) {
      const show = choice === 'all' || card.dataset.category === choice;
      card.classList.toggle('hidden', !show);
    });
  });
});

// 3. Contact form validation (only runs on the contact page)
const form = document.getElementById('contactForm');
if (form) {
  const fields = ['name', 'email', 'subject', 'message'];
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateField(id) {
    const input = document.getElementById(id);
    const error = document.getElementById(id + 'Error');
    const value = input.value.trim();
    let msg = '';
    if (value === '') {
      msg = 'This field is required.';
    } else if (id === 'email' && !emailPattern.test(value)) {
      msg = 'Please enter a valid email address.';
    } else if (id === 'message' && value.length < 10) {
      msg = 'Message must be at least 10 characters.';
    }
    error.textContent = msg;
    input.classList.toggle('invalid', msg !== '');
    return msg === '';
  }

  fields.forEach(function (id) {
    document.getElementById(id).addEventListener('blur', function () { validateField(id); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const feedback = document.getElementById('formFeedback');
    const allValid = fields.map(validateField).every(Boolean);
    if (allValid) {
      feedback.className = 'success';
      feedback.textContent = 'Thank you! Your details look good. (Demo form: no message is actually sent.)';
      form.reset();
    } else {
      feedback.className = '';
      feedback.textContent = 'Please fix the errors above and try again.';
    }
  });
}
