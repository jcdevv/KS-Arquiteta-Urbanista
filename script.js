// ============================================================
// Karen Santos — Arquitetura & Urbanismo
// script.js — menu mobile, scroll-spy, reveal on scroll e envio
// de mensagem de contato (com fallback para quando o WhatsApp
// não consegue abrir um app de e-mail automaticamente).
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    const yr = document.getElementById('yr');
    if (yr) yr.textContent = new Date().getFullYear();
  
    // ---------- Menu mobile ----------
    const ham = document.getElementById('ham');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('menu-overlay');
    const iconOpen = document.getElementById('icon-open');
    const iconClose = document.getElementById('icon-close');
  
    function toggleMenu() {
      const open = mobileMenu.classList.toggle('open');
      overlay.classList.toggle('open', open);
      document.body.classList.toggle('menu-locked', open);
      iconOpen.style.display = open ? 'none' : 'block';
      iconClose.style.display = open ? 'block' : 'none';
      ham.setAttribute('aria-expanded', open);
    }
  
    function closeMenu() {
      mobileMenu.classList.remove('open');
      overlay.classList.remove('open');
      document.body.classList.remove('menu-locked');
      iconOpen.style.display = 'block';
      iconClose.style.display = 'none';
      ham.setAttribute('aria-expanded', 'false');
    }
  
    if (ham) ham.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  
    // ---------- Voltar ao topo ----------
    const toTop = document.getElementById('to-top');
    if (toTop) {
      toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
  
    // ---------- Nav: sombra ao rolar + scroll-spy ----------
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('[data-nav]');
    const sections = ['sobre', 'processo', 'servicos', 'contato']
      .map(id => document.getElementById(id))
      .filter(Boolean);
  
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 12);
    }, { passive: true });
  
    if (sections.length) {
      const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active'));
            const active = document.querySelector('[data-nav][href="#' + entry.target.id + '"]');
            if (active) active.classList.add('active');
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sections.forEach(s => spyObserver.observe(s));
    }
  
    // ---------- Reveal on scroll ----------
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      revealEls.forEach(el => revealObserver.observe(el));
    }
  
    // ---------- Formulário de contato ----------
    const form = document.getElementById('contact-form');
    const hint = document.getElementById('form-hint');
    const status = document.getElementById('form-status');
    const WHATSAPP_NUMBER = '5511974376984'; // +55 (11) 9.7437-6984
  
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
  
        const name = document.getElementById('f-name').value.trim();
        const phone = document.getElementById('f-phone').value.trim();
        const email = document.getElementById('f-email').value.trim();
        const service = document.getElementById('f-service').value;
        const msg = document.getElementById('f-msg').value.trim();
  
        if (!name || !email || !msg) return;
  
        const plainMsg =
          'Olá, Karen! Meu nome é ' + name + '.\n' +
          'E-mail: ' + email + (phone ? '\nTelefone: ' + phone : '') + '\n' +
          'Serviço de interesse: ' + (service || 'Não informado') + '\n\n' +
          msg;
  
        const waUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(plainMsg);
  
        // Abre o WhatsApp (app no celular, WhatsApp Web no computador)
        // já com a mensagem pronta para envio.
        window.open(waUrl, '_blank', 'noopener');
  
        showFallback({ waUrl, plainMsg });
      });
    }
  
    function showFallback({ waUrl, plainMsg }) {
      if (!status) return;
  
      hint.hidden = true;
      status.hidden = false;
      status.innerHTML = `
        <p class="form-status-title">Se o WhatsApp não abriu automaticamente:</p>
        <div class="form-status-actions">
          <a href="${waUrl}" target="_blank" rel="noopener" class="form-status-link">Abrir WhatsApp manualmente</a>
          <button type="button" id="copy-msg-btn" class="form-status-link form-status-link--btn">Copiar mensagem</button>
        </div>
        <p class="form-status-note">ou chame direto no <strong>+55 (11) 9.7437-6984</strong></p>
      `;
  
      const copyBtn = document.getElementById('copy-msg-btn');
      if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
          try {
            await navigator.clipboard.writeText(plainMsg);
            copyBtn.textContent = 'Mensagem copiada ✓';
          } catch (err) {
            copyBtn.textContent = 'Não foi possível copiar';
          }
          setTimeout(() => { copyBtn.textContent = 'Copiar mensagem'; }, 2500);
        });
      }
    }
  });