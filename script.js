// ===================================================
//   CHARLENE PORTFOLIO — SCRIPT.JS
//   Pixel Art Indie Game Portfolio Interactions
// ===================================================

/* ─── PARTICLE SYSTEM ─── */
function createParticles() {
  const container = document.getElementById('particles');
  const colors = ['#b48ef0', '#d4b8f7', '#f0a8d0', '#a8e6d0', '#f5d06a', '#7ec8e3'];
  const count = 30;
  
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() > 0.5 ? 4 : 6;
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${10 + Math.random() * 20}s;
      animation-delay: ${Math.random() * 15}s;
      opacity: 0;
    `;
    container.appendChild(p);
  }
}

/* ─── PIXEL STARS ─── */
function createStars() {
  const container = document.getElementById('starsContainer');
  const count = 80;

  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 3}s;
      animation-duration: ${2 + Math.random() * 3}s;
      width: ${Math.random() > 0.7 ? 3 : 2}px;
      height: ${Math.random() > 0.7 ? 3 : 2}px;
      opacity: ${0.1 + Math.random() * 0.5};
    `;
    container.appendChild(star);
  }
}

/* ─── TYPEWRITER EFFECT ─── */
const phrases = [
  'Information Systems Student 🎓',
  'AI Engineer in Training 🤖',
  'UI/UX Designer 🎨',
  'Google Student Ambassador ☁️',
  'Problem Solver & Creator ✨',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeEl;

function typeWriter() {
  typeEl = typeEl || document.getElementById('typewriter');
  if (!typeEl) return;

  const current = phrases[phraseIndex];
  const speed = isDeleting ? 40 : 80;

  if (!isDeleting) {
    typeEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      setTimeout(() => { isDeleting = true; }, 2200);
    }
  } else {
    typeEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typeWriter, speed);
}

/* ─── NAVBAR SCROLL ─── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav link
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) {
        current = sec.id;
      }
    });

    links.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  });

  // Hamburger
  const ham = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  ham.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

/* ─── SCROLL ANIMATIONS ─── */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 100);
      }
    });
  }, { threshold: 0.1 });

  // Add fade-in-up to elements
  const animTargets = document.querySelectorAll(
    '.project-card, .quest-card, .achievement-card, .vol-card, .skill-item, .inv-item, .about-inventory'
  );

  animTargets.forEach(el => {
    el.classList.add('fade-in-up');
    observer.observe(el);
  });
}

/* ─── SKILL BAR ANIMATION ─── */
function initSkillBars() {
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.skill-fill');
        fills.forEach(fill => {
          const target = fill.style.getPropertyValue('--fill');
          fill.style.width = '0%';
          setTimeout(() => { fill.style.width = target; }, 300);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const skillsSection = document.querySelector('.skills-grid');
  if (skillsSection) skillObserver.observe(skillsSection);
}

/* ─── DIALOGUE BOX ─── */
const dialogues = [
  "Hey there, traveler! I'm an Information Systems student at Universitas Pelita Harapan, currently leveling up my skills in AI engineering and full-stack development. ✨",
  "I'm passionate about building tech that actually helps people — from AI tools for autism support to smart financial chatbots. 💙",
  "When I'm not coding, you'll find me designing, mentoring fellow students, or contributing to communities like GDG Live Indonesia and Generation Girl. 🌍",
  "I believe technology should be inclusive, beautiful, and impactful. Let's build something amazing together! 🚀",
];

let dialogueIndex = 0;
let dialogueEl;

function initDialogue() {
  dialogueEl = document.getElementById('dialogueText');
  const box = document.getElementById('dialogueBox');
  if (!box || !dialogueEl) return;

  box.addEventListener('click', () => {
    dialogueIndex = (dialogueIndex + 1) % dialogues.length;
    dialogueEl.style.opacity = '0';
    setTimeout(() => {
      dialogueEl.textContent = dialogues[dialogueIndex];
      dialogueEl.style.opacity = '1';
      dialogueEl.style.transition = 'opacity 0.3s ease';
    }, 200);
  });
}

/* ─── PROJECT MODAL ─── */
const projectData = {
  projectTalkieBuddy: {
    title: 'TalkieBuddy',
    emoji: '🗣️',
    tags: ['AI', 'HealthTech', 'Research'],
    desc: `TalkieBuddy is an AI-powered communication assistant designed to support children with Autism Spectrum Disorder (ASD). 

The app uses natural language processing and emotion recognition to facilitate smoother communication for children who struggle with verbal and social interactions. 

It was developed as part of PKM-KI (Program Kreativitas Mahasiswa — Karya Inovatif) and successfully received national funding. The research was later published at the SATESI 2025 international conference, and the team reached the finals of PIMNAS 38.`,
    highlights: ['📄 Published at SATESI 2025', '🏆 PIMNAS 38 Finalist', '💰 PKM-KI Funded Awardee'],
    tech: ['Python', 'NLP', 'Machine Learning', 'Mobile Dev'],
    color: '#b48ef0',
  },
  projectXiongMao: {
    title: 'XiongMao',
    emoji: '🐼',
    tags: ['Mobile App', 'AI'],
    desc: `XiongMao (熊猫 — meaning "panda" in Mandarin) is a charming mobile application that combines an adorable panda theme with AI-powered features.

The app provides an engaging and interactive experience for users, blending functionality with a delightful visual design. It showcases the intersection of cute UX/UI design and practical AI integration.`,
    highlights: ['📱 Mobile Application', '🤖 AI-Powered Features', '🎨 Delightful UI Design'],
    tech: ['Flutter', 'Dart', 'AI Integration', 'Figma'],
    color: '#7ec8e3',
  },
  projectKizuna: {
    title: 'Kizuna',
    emoji: '🤝',
    tags: ['Social', 'Web App'],
    desc: `Kizuna (絆) is inspired by the Japanese word meaning "bond" or "connection." It's a community-focused platform designed to strengthen meaningful relationships through thoughtful technology.

The platform was built with the vision of creating authentic digital spaces where people can form and maintain genuine connections — moving beyond surface-level social media interactions.`,
    highlights: ['🌐 Community Platform', '💜 Human-Centered Design', '🔗 Connection-Focused'],
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.IO'],
    color: '#f0a8d0',
  },
  projectPavey: {
    title: 'Pavey',
    emoji: '💰',
    tags: ['FinTech', 'AI Chatbot', 'Full-Stack'],
    desc: `Pavey is an intelligent financial management chatbot that helps users take control of their finances. It provides real-time currency exchange rates, personalized budgeting advice, and AI-powered financial insights.

Built with a Python FastAPI backend and React TypeScript frontend, Pavey integrates AI to understand user spending patterns and provide actionable financial recommendations in a conversational interface.`,
    highlights: ['💬 AI-Powered Chatbot', '💱 Real-time Exchange Rates', '📊 Smart Budgeting'],
    tech: ['Python', 'FastAPI', 'React', 'TypeScript', 'AI/LLM'],
    color: '#a8e6d0',
  },
};

function initProjectModals() {
  const overlay = document.getElementById('modalOverlay');
  const closeBtn = document.getElementById('modalClose');
  const content = document.getElementById('modalContent');

  Object.keys(projectData).forEach(id => {
    const card = document.getElementById(id);
    if (!card) return;

    card.addEventListener('click', () => openModal(id));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') openModal(id);
    });
  });

  function openModal(id) {
    const data = projectData[id];
    if (!data) return;

    content.innerHTML = `
      <div style="border-bottom: 2px solid var(--border-pixel); padding-bottom: 1rem; margin-bottom: 1.5rem;">
        <div style="font-size: 3rem; margin-bottom: 0.5rem;">${data.emoji}</div>
        <h2 style="font-family: var(--pixel-font); font-size: 0.9rem; color: ${data.color}; letter-spacing: 2px; line-height: 1.5; margin-bottom: 0.5rem;">${data.title}</h2>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          ${data.tags.map(t => `<span style="font-family: var(--pixel-font); font-size: 0.3rem; padding: 3px 8px; border: 1px solid ${data.color}; color: ${data.color}; letter-spacing: 0.5px;">${t}</span>`).join('')}
        </div>
      </div>
      <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.9; margin-bottom: 1.5rem; white-space: pre-line;">${data.desc}</p>
      <div style="margin-bottom: 1.5rem;">
        <div style="font-family: var(--pixel-font); font-size: 0.45rem; color: var(--accent-gold); margin-bottom: 0.75rem; letter-spacing: 1px;">✦ HIGHLIGHTS</div>
        ${data.highlights.map(h => `<div style="padding: 6px 0; border-bottom: 1px solid var(--border-pixel); font-size: 0.85rem; color: var(--text-primary);">${h}</div>`).join('')}
      </div>
      <div>
        <div style="font-family: var(--pixel-font); font-size: 0.45rem; color: var(--accent-mint); margin-bottom: 0.75rem; letter-spacing: 1px;">🛠 TECH STACK</div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          ${data.tech.map(t => `<span style="font-family: var(--pixel-font); font-size: 0.35rem; padding: 4px 10px; background: var(--bg-deep); border: 1px solid var(--border-pixel); color: var(--text-secondary);">${t}</span>`).join('')}
        </div>
      </div>
    `;

    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

/* ─── CONTACT FORM ─── */
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const success = document.getElementById('formSuccess');

  btn.textContent = '⏳ SENDING...';
  btn.disabled = true;

  setTimeout(() => {
    btn.style.display = 'none';
    success.style.display = 'block';
  }, 1500);
}

/* ─── INVENTORY HOVER TOOLTIP ─── */
function initInventoryHover() {
  const items = document.querySelectorAll('.inv-item');
  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateY(-4px) scale(1.05)';
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
    });
  });
}

/* ─── PIXEL GLITCH EFFECT on hero title ─── */
function initGlitchEffect() {
  const titleName = document.querySelector('.title-name');
  if (!titleName) return;

  setInterval(() => {
    if (Math.random() < 0.05) {
      titleName.style.textShadow = `
        ${Math.random() * 6 - 3}px 0 #f0a8d0,
        ${Math.random() * -6 + 3}px 0 #a8e6d0,
        0 0 30px rgba(180, 142, 240, 0.7)
      `;
      setTimeout(() => {
        titleName.style.textShadow = '0 0 30px rgba(180, 142, 240, 0.7)';
      }, 100);
    }
  }, 500);
}

/* ─── AWARD CARD SPARKLE ─── */
function initAwardSparkles() {
  const cards = document.querySelectorAll('.achievement-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
          position: absolute;
          width: 4px; height: 4px;
          background: #f5d06a;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          pointer-events: none;
          animation: sparkleAnim 0.6s ease forwards;
          z-index: 10;
        `;
        card.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 700);
      }
    });
  });

  // Add sparkle keyframe if not already added
  if (!document.getElementById('sparkleStyle')) {
    const style = document.createElement('style');
    style.id = 'sparkleStyle';
    style.textContent = `
      @keyframes sparkleAnim {
        0%   { transform: scale(0) translate(0,0); opacity: 1; }
        100% { transform: scale(2) translate(${Math.random()*40-20}px, -30px); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

/* ─── SMOOTH SECTION REVEAL ─── */
function initSectionReveal() {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.05 });

  document.querySelectorAll('.section-header').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    sectionObserver.observe(el);
  });
}

/* ─── COPY TO CLIPBOARD ─── */
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('📋 Copied!');
  });
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem; left: 50%;
    transform: translateX(-50%);
    background: var(--bg-card);
    border: 2px solid var(--accent-purple);
    color: var(--accent-lavender);
    font-family: var(--pixel-font);
    font-size: 0.45rem;
    padding: 10px 20px;
    z-index: 9999;
    letter-spacing: 1px;
    animation: slideUp 0.3s ease;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

/* ─── EXP BAR ANIMATE ─── */
function initExpBar() {
  const expFill = document.querySelector('.exp-fill');
  if (!expFill) return;
  
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      expFill.style.width = '0%';
      setTimeout(() => {
        expFill.style.transition = 'width 2s ease';
        expFill.style.width = '72%';
      }, 500);
      observer.disconnect();
    }
  });

  observer.observe(expFill);
}

/* ─── INIT ALL ─── */
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  createStars();
  typeWriter();
  initNavbar();
  initScrollAnimations();
  initSkillBars();
  initDialogue();
  initProjectModals();
  initInventoryHover();
  initGlitchEffect();
  initAwardSparkles();
  initSectionReveal();
  initExpBar();
});
