/* =========================================================
   VELFOX — shared site behavior
   Loaded by every page. Hero canvas keeps its own inline
   script; nothing here touches it.
   ========================================================= */

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initMobileNav();
  initReveal();
  initTimeline();
  initScrollSpy();
  initCardGlow();
  initCounters();
  initBackToTop();
  initContactForm();
  initNewsletterForm();
  initChatbot();
});

/* ---------- theme toggle (dark / light) ---------- */
const THEME_COLOR = { dark: '#0A0D16', light: '#F8FAFC' };

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);

  // keep the browser chrome (mobile address bar) with the page
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', THEME_COLOR[theme] || THEME_COLOR.dark);
}

function initTheme() {
  // two controls now: one in the bar on desktop, one inside the mobile menu
  const toggles = document.querySelectorAll('.theme-switch');

  // check local preference or sync with system
  const saved = localStorage.getItem('velfox-theme');
  applyTheme(saved === 'light' ? 'light' : 'dark');

  toggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const nextTheme = isLight ? 'dark' : 'light';

      applyTheme(nextTheme);
      localStorage.setItem('velfox-theme', nextTheme);
    });
  });
}

/* ---------- navbar scroll state ---------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => navbar.classList.toggle('is-scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- mobile nav ---------- */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  const setOpen = (open) => {
    links.classList.toggle('is-open', open);
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };

  toggle.setAttribute('aria-expanded', 'false');
  toggle.addEventListener('click', () => setOpen(!links.classList.contains('is-open')));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && links.classList.contains('is-open')) setOpen(false);
  });

  // reset if the viewport grows back to desktop while the drawer is open
  window.addEventListener('resize', () => {
    if (window.innerWidth > 980 && links.classList.contains('is-open')) setOpen(false);
  });
}

/* ---------- scroll reveal ---------- */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  if (!('IntersectionObserver' in window) || REDUCED_MOTION) {
    els.forEach(el => el.classList.add('in-view'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => io.observe(el));
}

/* ---------- process timeline: rail progress + step reveal ---------- */
function initTimeline() {
  const timeline = document.querySelector('.timeline');
  if (!timeline) return;

  const progress = timeline.querySelector('.timeline-progress');
  const steps = Array.from(timeline.querySelectorAll('.step'));

  if ('IntersectionObserver' in window && !REDUCED_MOTION) {
    const stepIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
      });
    }, { threshold: 0.35 });
    steps.forEach(s => stepIO.observe(s));
  } else {
    steps.forEach(s => s.classList.add('in-view'));
  }

  const firstNum = steps[0]?.querySelector('.step-num');
  const lastNum = steps[steps.length - 1]?.querySelector('.step-num');

  let ticking = false;
  const updateProgress = () => {
    if (!firstNum || !lastNum) return;

    const timelineRect = timeline.getBoundingClientRect();
    const firstRect = firstNum.getBoundingClientRect();
    const lastRect = lastNum.getBoundingClientRect();

    // Line starts at center of step 01 and ends at center of step 07
    const startY = (firstRect.top + firstRect.height / 2) - timelineRect.top;
    const endY = (lastRect.top + lastRect.height / 2) - timelineRect.top;
    const totalDistance = Math.max(0, endY - startY);

    timeline.style.setProperty('--rail-top', startY + 'px');
    timeline.style.setProperty('--rail-height', totalDistance + 'px');

    if (progress) {
      const currentScrollPos = window.innerHeight * 0.70 - timelineRect.top;
      const progressDist = Math.min(Math.max(currentScrollPos - startY, 0), totalDistance);
      // scaleY on a fixed-height rail rather than animating height every frame.
      // Set on the element, not as a variable on .timeline -- a custom property
      // on the parent would restyle all ten children on every scroll frame.
      progress.style.transform = 'scaleY(' + (totalDistance ? progressDist / totalDistance : 0) + ')';
    }

    ticking = false;
  };

  const request = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateProgress);
  };

  updateProgress();
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);

  // The first measurement lands before the web font swaps in, which leaves the
  // rail ~24px short of step 07. Re-measure once layout has actually settled,
  // and again whenever the steps reflow.
  window.addEventListener('load', request);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(request);
  }
  if ('ResizeObserver' in window) {
    new ResizeObserver(request).observe(timeline);
  }
}

/* ---------- active nav link while scrolling the homepage ---------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href*="#"]');
  if (!sections.length || !navLinks.length || !('IntersectionObserver' in window)) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const hash = '#' + entry.target.id;
      navLinks.forEach(a => a.classList.toggle('active', (a.getAttribute('href') || '').endsWith(hash)));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(s => io.observe(s));
}



/* ---------- pointer-tracking glow on service cards ---------- */
function initCardGlow() {
  const cards = document.querySelectorAll('.service-card');
  if (!cards.length || REDUCED_MOTION) return;

  cards.forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width) * 100 + '%');
      card.style.setProperty('--my', ((e.clientY - rect.top) / rect.height) * 100 + '%');
    });
  });
}

/* ---------- count-up stats ---------- */
function initCounters() {
  const nums = document.querySelectorAll('[data-count]');
  if (!nums.length) return;

  const render = (el, value) => {
    const suffix = el.dataset.suffix || '';
    el.innerHTML = value + (suffix ? `<em>${suffix}</em>` : '');
  };

  if (!('IntersectionObserver' in window) || REDUCED_MOTION) {
    nums.forEach(el => render(el, Number(el.dataset.count)));
    return;
  }

  const run = (el) => {
    const target = Number(el.dataset.count);
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      render(el, Math.round(target * eased));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      run(entry.target);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  nums.forEach(el => { render(el, 0); io.observe(el); });
}

/* ---------- back to top ---------- */
function initBackToTop() {
  const btn = document.querySelector('.to-top');
  if (!btn) return;

  const onScroll = () => btn.classList.toggle('is-visible', window.scrollY > 900);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: REDUCED_MOTION ? 'auto' : 'smooth' });
  });
}

/* ---------- form status helper ---------- */
function setStatus(el, message, isError) {
  if (!el) return;
  el.textContent = message;
  el.classList.toggle('is-error', Boolean(isError));
  el.hidden = false;
}

/* ---------- contact form ----------
   Front-end demo only: nothing is sent anywhere yet. Point this at your form
   endpoint / CRM to start capturing leads — the copy for both states is ready. */
function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  const status = document.querySelector('#contact-status');
  const SUCCESS = "Got it. We'll reply within 24 hours, usually with a time to talk.";
  const FAILURE = "Something didn't send. Try again, or email hello@velfox.com.";

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;

    if (status) status.hidden = true;

    const original = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    setTimeout(() => {
      // no endpoint yet — the demo always resolves as sent
      const sent = true;

      if (sent) {
        btn.textContent = "Sent, we'll be in touch";
        setStatus(status, SUCCESS, false);
        form.reset();
      } else {
        setStatus(status, FAILURE, true);
      }

      setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 3200);
    }, 900);
  });
}

/* ---------- newsletter form ----------
   Front-end demo only: no email service is wired up yet. */
function initNewsletterForm() {
  const form = document.querySelector('#newsletter-form');
  if (!form) return;

  const status = document.querySelector('#newsletter-status');
  const SUCCESS = "You're in. The next issue goes to this inbox, nothing else will.";
  const INVALID = 'Enter a real email address.';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button');
    const input = form.querySelector('input');
    if (!btn || !input) return;

    if (!input.value.trim() || !input.checkValidity()) {
      setStatus(status, INVALID, true);
      input.focus();
      return;
    }

    btn.textContent = 'Subscribed';
    input.value = '';
    setStatus(status, SUCCESS, false);
    setTimeout(() => { btn.textContent = 'Subscribe'; }, 3000);
  });
}

/* =========================================================
   Chatbot — lightweight rule-based Velfox assistant.
   Front-end demo shell: swap `getBotReply()` for a real API
   call to wire this up to an actual LLM backend.
   ========================================================= */
function initChatbot() {
  const launcher = document.querySelector('.chatbot-launcher');
  const panel = document.querySelector('.chatbot-panel');
  const body = document.querySelector('.chat-body');
  const form = document.querySelector('.chat-input');
  const input = form ? form.querySelector('input') : null;
  const quickWrap = document.querySelector('.chat-quick');
  if (!launcher || !panel || !body || !form || !input) return;

  const QUICK_REPLIES = [
    'What does Velfox do?',
    'Do you build proofs of concept?',
    'How does a project start?',
    'What have you shipped?'
  ];

  const KB = [
    { k: ['service', 'do', 'offer', 'help with'], a: "Four areas, one team: AI Integrations & Automation, AI Vision, Web Applications, and Mobile Applications. Most work cuts across more than one. Which is closest to what you need?" },
    { k: ['automat', 'workflow'], a: "We wire AI into the systems you already run and take the manual steps out of the loop: agents, internal tools, and process work, not a chatbot bolted onto the homepage." },
    { k: ['vision', 'image', 'video', 'detect'], a: "Computer vision, image and video analysis, object detection, visual inspection, and monitoring that flags a problem before a person has to go looking." },
    { k: ['web', 'app', 'dashboard', 'saas'], a: "Custom web apps, SaaS products, dashboards, APIs, and integrations, with AI only where it earns its place." },
    { k: ['mobile', 'ios', 'android'], a: "iOS, Android, and cross-platform. Built for people doing the work, including offline." },
    { k: ['poc', 'proof', 'experiment', 'validate', 'prototype'], a: "Yes. We prove the risky assumption first, then you decide whether full scope is worth it." },
    { k: ['price', 'cost', 'much', 'budget'], a: "It depends on scope. Fastest path to a real number: a Discovery Call, then an estimate within 24 hours." },
    { k: ['how long', 'timeline', 'duration'], a: "You'll get a proposal with timeline and effort before anything starts. Nothing is open-ended." },
    { k: ['start', 'begin', 'process', 'how do i', 'how does it work'], a: "Discovery Call, then scope, then a proposal, then kick-off. Always in that order." },
    { k: ['product', 'built', 'shipped'], a: "The Products page is the shipped work, not a list of things we could build." },
    { k: ['newsletter', 'subscribe', 'updates'], a: "The Velfox Signal: applied AI, without the hype. Subscribe on the Newsletter page." },
    { k: ['contact', 'email', 'reach', 'talk to someone'], a: "Book a Discovery Call, or send the form. We reply within 24 hours." },
    { k: ['hi', 'hello', 'hey'], a: "Hi. Ask me about the work, the process, or how to start." },
  ];

  function getBotReply(text) {
    const lower = text.toLowerCase();
    for (const entry of KB) {
      if (entry.k.some(kw => lower.includes(kw))) return entry.a;
    }
    return "That's a better question for the team than for this window. Book a Discovery Call and you'll get a straight answer.";
  }

  function addMessage(text, who) {
    const el = document.createElement('div');
    el.className = 'msg ' + who;
    el.textContent = text;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
    return el;
  }

  function renderQuickReplies() {
    if (!quickWrap) return;
    quickWrap.innerHTML = '';
    QUICK_REPLIES.forEach(q => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = q;
      b.addEventListener('click', () => sendMessage(q));
      quickWrap.appendChild(b);
    });
  }

  function sendMessage(text) {
    if (!text.trim()) return;
    addMessage(text, 'user');
    input.value = '';

    const thinking = addMessage('…', 'bot');
    setTimeout(() => {
      thinking.textContent = getBotReply(text);
      body.scrollTop = body.scrollHeight;
    }, 520);
  }

  let started = false;

  function openPanel() {
    panel.classList.add('is-open');
    launcher.classList.add('is-open');
    launcher.setAttribute('aria-expanded', 'true');

    if (!started) {
      started = true;
      addMessage("Hi, I'm the Velfox assistant. I can tell you what we build, how a project runs, or get you to a Discovery Call.", 'bot');
      renderQuickReplies();
    }
    input.focus();
  }

  function closePanel() {
    panel.classList.remove('is-open');
    launcher.classList.remove('is-open');
    launcher.setAttribute('aria-expanded', 'false');
  }

  launcher.addEventListener('click', () => {
    panel.classList.contains('is-open') ? closePanel() : openPanel();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage(input.value);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) closePanel();
  });
}
