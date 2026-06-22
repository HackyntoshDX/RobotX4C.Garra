document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================
    // SONIDOS ROBÓTICOS
    // ==========================================================
    const playRoboticSound = (type) => {
        try {
            if (document.body.classList.contains('accessible-mode')) return;
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            if (type === 'click') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, ctx.currentTime);
                gain.gain.setValueAtTime(0.04, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
                osc.start(); osc.stop(ctx.currentTime + 0.06);
            } 
            else if (type === 'switch') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(320, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(680, ctx.currentTime + 0.1);
                gain.gain.setValueAtTime(0.03, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
                osc.start(); osc.stop(ctx.currentTime + 0.1);
            } 
            else if (type === 'secret') {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(90, ctx.currentTime);
                osc.frequency.linearRampToValueAtTime(850, ctx.currentTime + 0.4);
                gain.gain.setValueAtTime(0.05, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
                osc.start(); osc.stop(ctx.currentTime + 0.4);
            }
        } catch (e) {
            // Protección de navegadores
        }
    };

    document.querySelectorAll('button, .nav-links a, .accordion-header').forEach(element => {
        element.addEventListener('click', () => playRoboticSound('click'));
    });

    // ==========================================================
    // MODO ACCESIBILIDAD (Botón del ojito)
    // ==========================================================
    const accessToggle = document.getElementById('access-toggle');
    if (localStorage.getItem('accessibilityMode') === 'true') {
        document.body.classList.add('accessible-mode');
    }

    if (accessToggle) {
        accessToggle.addEventListener('click', () => {
            document.body.classList.toggle('accessible-mode');
            const state = document.body.classList.contains('accessible-mode');
            localStorage.setItem('accessibilityMode', state);
            playRoboticSound('switch');
            
            if (state) {
                document.body.style.setProperty('--bg-color', '#000000');
                document.body.style.setProperty('--glass-bg', '#000000');
            } else {
                document.body.style.removeProperty('--bg-color');
                document.body.style.removeProperty('--glass-bg');
            }
        });
    }

    // ==========================================================
    // ANIMACIONES POR SCROLL
    // ==========================================================
    const options = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, options);

    document.querySelectorAll('.animate-on-scroll, .timeline-item').forEach(el => observer.observe(el));

    // ==========================================================
    // CAMBIO DE TEMAS VISUALES
    // ==========================================================
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            playRoboticSound('switch');
            themeButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            
            document.body.classList.remove('theme-light', 'theme-dark', 'theme-frutiger');
            const targetTheme = button.getAttribute('data-theme');
            document.body.classList.add(targetTheme);
        });
    });

    // ==========================================================
    // ACORDEÓN PARA ERRORES Y DIAGNÓSTICO
    // ==========================================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.accordion-icon');
            
            if (content.style.maxHeight && content.style.maxHeight !== '0px') {
                content.style.maxHeight = '0px';
                if (icon) icon.textContent = '+';
            } else {
                document.querySelectorAll('.accordion-content').forEach(c => c.style.maxHeight = '0px');
                document.querySelectorAll('.accordion-icon').forEach(i => i.textContent = '+');
                
                content.style.maxHeight = content.scrollHeight + 'px';
                if (icon) icon.textContent = '-';
            }
        });
    });

    // ==========================================================
    // EASTER EGG DE HACKEO (3 Clics rápidos)
    // ==========================================================
    let clickCount = 0;
    let clickTimer;
    const logoElement = document.getElementById('secreto-logo');
    const overlayElement = document.getElementById('easter-egg-overlay');
    const closeOverlayBtn = document.getElementById('close-easter-egg');

    if (logoElement && overlayElement) {
        logoElement.addEventListener('click', () => {
            clickCount++;
            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => { clickCount = 0; }, 800);

            if (clickCount === 3) {
                playRoboticSound('secret');
                overlayElement.style.display = 'flex';
                clickCount = 0;
            }
        });
    }

    if (closeOverlayBtn && overlayElement) {
        closeOverlayBtn.addEventListener('click', () => {
            overlayElement.style.display = 'none';
            playRoboticSound('click');
        });
    }

    // ==========================================================
    // PRELOADER Y BARRA DE PROGRESO DE LECTURA
    // ==========================================================
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.display = 'none', 500);
        }
        const nav = document.querySelector('.floating-nav');
        if (nav) nav.classList.remove('init-hidden');
        const hero = document.querySelector('.hero-container');
        if (hero) hero.classList.remove('init-hidden');
    }, 800);

    const progressBar = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) progressBar.style.width = scrolled + '%';
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});