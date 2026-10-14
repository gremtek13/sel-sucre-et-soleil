// ===================================================
// Sel, Sucre & Soleil — Script principal
// ===================================================

document.addEventListener('DOMContentLoaded', () => {
  // Header : ombre légère une fois qu'on a scrollé
  const header = document.querySelector('.site-header');
  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Menu mobile
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.classList.remove('open');
      });
    });
  }

  // Apparition au scroll
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  // Photos : si l'image n'existe pas encore dans /images, on garde le dégradé
  document.querySelectorAll('.ph img').forEach((img) => {
    img.addEventListener('error', () => img.remove());
  });

  // Filtres (page blog / recettes)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const posts = document.querySelectorAll('.posts-grid .post-card');
  if (filterBtns.length && posts.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        posts.forEach((post) => {
          const match = cat === 'all' || post.dataset.cat === cat;
          post.classList.toggle('hidden', !match);
        });
      });
    });
  }

  // Formulaire de contact -> ouvre le client mail avec le message pré-rempli
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const subject = form.subject.value.trim();
      const message = form.message.value.trim();

      const body = `Nom : ${name}\nEmail : ${email}\n\nMessage :\n${message}`;
      const mailto =
        'mailto:contact@selsucreetsoleil.fr' +
        '?subject=' + encodeURIComponent('Contact site — ' + (subject || 'Sans sujet')) +
        '&body=' + encodeURIComponent(body);

      window.location.href = mailto;
    });
  }

  // Année du footer
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});
