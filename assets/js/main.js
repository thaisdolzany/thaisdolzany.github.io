/*=============== MENU ===============*/
const navMenu = document.getElementById('nav-menu');
document.getElementById('nav-toggle').addEventListener('click', () => navMenu.classList.add('show-menu'));
document.getElementById('nav-close').addEventListener('click', () => navMenu.classList.remove('show-menu'));
document.querySelectorAll('.nav__link').forEach(link =>
  link.addEventListener('click', () => navMenu.classList.remove('show-menu')));

/*=============== HEADER ON SCROLL ===============*/
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY >= 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/*=============== ACTIVE LINK ===============*/
const navLinks = [...document.querySelectorAll('.nav__link')];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(l => l.classList.toggle('active-link', l.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));

/*=============== PROJECTS: FILTER + ARROWS ===============*/
const track = document.getElementById('projects-track');
const cards = [...track.querySelectorAll('.projects__card')];
document.querySelectorAll('.projects__filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.projects__filter').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    const f = btn.dataset.filter;
    cards.forEach(c => { c.hidden = f !== 'all' && c.dataset.cat !== f; });
    track.scrollTo({ left: 0 });
  });
});
const step = () => (cards.find(c => !c.hidden)?.offsetWidth ?? 300) + 20;
document.getElementById('proj-prev').addEventListener('click', () => track.scrollBy({ left: -step() }));
document.getElementById('proj-next').addEventListener('click', () => track.scrollBy({ left: step() }));

/*=============== WORK TABS ===============*/
const tabs = document.querySelectorAll('.work__button');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('is-active'));
    document.querySelectorAll('.work__area').forEach(a => a.classList.remove('is-active'));
    tab.classList.add('is-active');
    document.querySelector(tab.dataset.target).classList.add('is-active');
  });
});

/*=============== ACCORDION ===============*/
document.querySelectorAll('.services__card').forEach(card => {
  const head = card.querySelector('.services__header');
  head.addEventListener('click', () => {
    const open = card.classList.toggle('is-open');
    head.setAttribute('aria-expanded', open);
  });
});

/*=============== MARQUEE: duplicate for seamless loop ===============*/
const marquee = document.querySelector('.marquee__track');
marquee.innerHTML += marquee.innerHTML;

/*=============== YEAR ===============*/
document.getElementById('year').textContent = new Date().getFullYear();

/*=============== SCROLL REVEAL ===============*/
const revealTargets = document.querySelectorAll(
  '.home__intro, .home__visual, .home__role, .section__title, .about__perfil, .about__data, ' +
  '.projects__container, .work__container, .services__card, .marquee, .pubs__item, .contact__container'
);
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealTargets.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = el.closest('.home') ? `${(i % 3) * 150}ms` : '0ms';
  revealObserver.observe(el);
});
