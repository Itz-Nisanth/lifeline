// smooth scroll to top
    function scrollToTop(){window.scrollTo({top:0,behavior:'smooth'})}

    // theme toggle (persistent in localStorage)
    const themeBtn = document.getElementById('themeBtn');
    const root = document.documentElement;
    const current = localStorage.getItem('lifelink-theme') || 'light';
    if(current === 'dark') document.documentElement.setAttribute('data-theme','dark');
    updateThemeBtn();

    themeBtn.addEventListener('click', ()=>{
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if(isDark){ document.documentElement.removeAttribute('data-theme'); localStorage.setItem('lifelink-theme','light') }
      else { document.documentElement.setAttribute('data-theme','dark'); localStorage.setItem('lifelink-theme','dark') }
      updateThemeBtn();
    })
    function updateThemeBtn(){ themeBtn.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙' }

    // overlay nav
    const hambtn = document.getElementById('hambtn');
    const overlay = document.getElementById('overlay');

    const navLinks = document.querySelectorAll('.nav-link');

    function openOverlay(){ hambtn.classList.add('open'); overlay.classList.add('open'); overlay.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden' }
    function closeOverlay(){ hambtn.classList.remove('open'); overlay.classList.remove('open'); overlay.setAttribute('aria-hidden','true'); document.body.style.overflow='' }

    hambtn.addEventListener('click', ()=>{ if(overlay.classList.contains('open')) closeOverlay(); else openOverlay(); })


    // close when clicking a link (handles "wrong click" -> user wants it to go back)
    navLinks.forEach(a=>a.addEventListener('click', (e)=>{ closeOverlay(); }))

    // close when clicking outside inner box
    overlay.addEventListener('click', (e)=>{ if(e.target === overlay) closeOverlay(); })

    // close on escape
    document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeOverlay() })

    // small animation for entry
    document.querySelectorAll('.fade-up').forEach((el,i)=>{ el.style.animationDelay = (i*80)+'ms' })

    // accessibility: if tab into hamburger, show outline
    hambtn.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); hambtn.click(); } })