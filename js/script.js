const contactForm = document.querySelector('#contact-form');
const successMessage = document.querySelector('#form-success');
const mobileToggle = document.querySelector('.mobile-nav-toggle');
const mainNavigation = document.querySelector('#main-navigation');

if (mobileToggle && mainNavigation) {
  mobileToggle.addEventListener('click', () => {
    const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', String(!expanded));
    mainNavigation.classList.toggle('open');
  });
}

if (contactForm && successMessage) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = contactForm.querySelector('#name').value.trim();
    const email = contactForm.querySelector('#email').value.trim();
    const message = contactForm.querySelector('#message').value.trim();

    if (name && email && message) {
      successMessage.textContent = 'Thank you! Your message has been received.';
      contactForm.reset();
    } else {
      successMessage.textContent = 'Please fill out all fields before sending.';
    }
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.scroll-fade').forEach((element) => {
  observer.observe(element);
});

const counters = document.querySelectorAll('.impact-value');
const counterObserver = new IntersectionObserver(
  (entries, observerRef) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const counter = entry.target;
      const target = parseInt(counter.dataset.target, 10);
      const duration = 1500;
      let start = 0;
      const stepTime = Math.max(Math.floor(duration / target), 10);

      const countUp = setInterval(() => {
        start += Math.ceil(target / (duration / stepTime));
        if (start >= target) {
          start = target;
          clearInterval(countUp);
        }
        counter.textContent = start.toString();
      }, stepTime);

      observerRef.unobserve(counter);
    });
  },
  { threshold: 0.4 }
);

counters.forEach((counter) => counterObserver.observe(counter));
