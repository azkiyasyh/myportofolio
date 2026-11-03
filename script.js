
/* ── AUTO YEAR ─────────────────────────────────────────────── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ── PROJECT DATA ──────────────────────────────────────────── */
/* To add a URL later: set the url field, e.g. url: 'https://...' */
const projects = {
  sirandu: {
    cat: 'Website Development',
    name: 'SiRandu',
    subtitle: 'Website Sistem Informasi Desa Randusongo',
    desc: 'Mengembangkan website untuk mendukung pengelolaan administrasi dan informasi Desa. Membangun antarmuka website yang memudahkan pengelolaan data dan aktivitas administrasi.',
    role: 'Web Developer',
    img: 'images/sirandu.jpg',
    url: 'https://azkiyasyh.github.io/sirandu/',    /* ← Tambahkan URL proyek di sini jika sudah ada */
  },
  sahabat: {
    cat: 'Web Development · Accessibility Technology',
    name: 'Sahabat Isyarat',
    subtitle: 'Video Call Bahasa Isyarat',
    desc: 'Mengembangkan platform video call berbasis WebRTC dengan dukungan teknologi MediaPipe. Mengintegrasikan fitur pengenalan gerakan isyarat dan subtitle untuk mendukung komunikasi yang lebih aksesibel.',
    role: 'Web Developer',
    img: 'images/sahabatisyarat.png',
    url: 'https://azkiyasyh.github.io/sahabatisyarat/',    /* ← Tambahkan URL proyek di sini jika sudah ada */
  },
  solo: {
    cat: 'UI/UX Design · Website',
    name: 'S.O.L.O',
    subtitle: 'S.O.L.O',
    desc: 'Merancang desain UI/UX website menggunakan Figma, mulai dari penyusunan alur pengguna hingga prototipe interaktif.',
    role: 'UI/UX Designer',
    img: 'images/solo.jpg',
    url: 'https://www.figma.com/proto/7rWHCDAw4GL0OMNooqM33l/UI-UX-Design?node-id=31-271&starting-point-node-id=31%3A271&t=GkLwgdGrzMblmVqN-1',    /* ← Tambahkan URL proyek di sini jika sudah ada */
  },
  imajinaku: {
    cat: 'Augmented Reality',
    name: 'Imajinaku',
    subtitle: 'Imajinaku',
    desc: 'Mengembangkan interaksi objek Augmented Reality untuk mendukung pengalaman membaca dan mengenal hewan. Mengintegrasikan elemen audio sebagai pendukung interaksi dan pengalaman belajar pengguna.',
    role: 'AR Interaction & Audio Integration',
    img: 'images/imajinaku.jpg',
    url: 'https://farica.met.student.pens.ac.id/imajinaku/mainmenu.html',    
  },
  catfe: {
    cat: 'UI/UX Design · Mobile Application',
    name: 'CatFe',
    subtitle: 'CatFe — Cat Café Mobile Application',
    desc: 'Designed the UI/UX for the CatFe mobile application, a platform for cat café services. Planned user flows and created interactive prototypes for the menu, shopping cart, and ordering processes.',
    role: 'UI/UX Designer',
    img: 'images/catfe.jpg',
    url: '',    /* ← Tambahkan URL proyek di sini jika sudah ada */
  },
};

/* ── SMOOTH SCROLL ─────────────────────────────────────────── */
function smoothTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 68;
  window.scrollTo({ top, behavior: 'smooth' });
}

/* ── NAVBAR ────────────────────────────────────────────────── */
const navbar  = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const mobileLinks = document.querySelectorAll('.mobile-menu a');

window.addEventListener('scroll', () => {
  /* Scrolled state */
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  /* Active section */
  const sections = ['home','about','skills','projects','activities','contact'];
  let current = 'home';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= 90) current = id;
  });

  navLinks.forEach(link => {
    const isActive = link.getAttribute('onclick').includes(`'${current}'`);
    link.classList.toggle('active', isActive);
  });
  mobileLinks.forEach(link => {
    const isActive = link.getAttribute('onclick').includes(`'${current}'`);
    link.classList.toggle('active', isActive);
  });
}, { passive: true });

/* ── HAMBURGER ─────────────────────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

function closeMobile() {
  menuOpen = false;
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-label', 'Open menu');
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
}

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  hamburger.classList.toggle('open', menuOpen);
  hamburger.setAttribute('aria-expanded', String(menuOpen));
  hamburger.setAttribute('aria-label', menuOpen ? 'Close menu' : 'Open menu');
  mobileMenu.classList.toggle('open', menuOpen);
  mobileMenu.setAttribute('aria-hidden', String(!menuOpen));
});

/* Close on outside click */
document.addEventListener('click', e => {
  if (menuOpen && !hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    closeMobile();
  }
});

/* ── REVEAL ON SCROLL ──────────────────────────────────────── */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

/* ── SKILL CARD TOP BORDER COLORS ─────────────────────────── */
document.querySelectorAll('.skill-card').forEach(card => {
  const accent = getComputedStyle(card).getPropertyValue('--accent').trim();
  if (accent) card.style.setProperty('--accent', accent);
  // Apply top border via ::before — handled in CSS via var(--accent)
  card.style.setProperty('border-top', `4px solid ${accent}`);
  card.style.setProperty('border-radius', 'var(--radius-lg)');
});

/* ── PROJECT MODAL ─────────────────────────────────────────── */
const overlay   = document.getElementById('modalOverlay');
const modalImg  = document.getElementById('modalImg');
const modalImgPh = document.getElementById('modalImgPh');
const modalImgPhLabel = document.getElementById('modalImgPh_label');
const modalCat  = document.getElementById('modalCat');
const modalTitle = document.getElementById('modalTitle');
const modalSub  = document.getElementById('modalSubtitle');
const modalDesc = document.getElementById('modalDesc');
const modalRole = document.getElementById('modalRole');

function openModal(key) {
  const p = projects[key];
  if (!p) return;

  /* If URL exists, open it directly */
  if (p.url) {
    window.open(p.url, '_blank', 'noopener,noreferrer');
    return;
  }

  /* Otherwise show modal */
  modalImg.src = p.img;
  modalImg.alt = p.name;
  modalImg.style.display = '';
  modalImgPh.style.display = 'none';
  modalImgPhLabel.textContent = p.name;
  modalCat.textContent  = p.cat;
  modalTitle.textContent = p.name;
  modalSub.textContent  = p.subtitle !== p.name ? p.subtitle : '';
  modalDesc.textContent = p.desc;
  modalRole.textContent = p.role;

  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function handleOverlayClick(e) {
  if (e.target === overlay) closeModal();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* ── SKILL TAG HOVER ACCENT ────────────────────────────────── */
document.querySelectorAll('.skill-card').forEach(card => {
  const accent = getComputedStyle(card).getPropertyValue('--accent').trim();
  card.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      tag.style.background = hexToRgba(accent, 0.2);
      tag.style.borderColor = accent;
      tag.style.color = 'var(--olive-deep)';
    });
    tag.addEventListener('mouseleave', () => {
      tag.style.background = '';
      tag.style.borderColor = '';
      tag.style.color = '';
    });
  });
});

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/* ── SCROLL REVEAL on load (first fold) ───────────────────── */
window.dispatchEvent(new Event('scroll'));
