document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const heroContainer = document.querySelector('.hero-container');
    const navBar = document.querySelector('.floating-nav');

    // Quitar preloader e iniciar animaciones fluidas al terminar la carga
    window.addEventListener('load', () => {
        setTimeout(() => {
            if(preloader) {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                setTimeout(() => preloader.remove(), 600);
            }
            if(heroContainer) heroContainer.classList.add('init-visible');
            if(navBar) navBar.classList.add('init-visible-nav');
        }, 600);
    });

    // Barra superior de lectura
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if(progressBar) progressBar.style.width = ((scrollTop / scrollHeight) * 100) + '%';
    });

    // Cambiador de estilos de color
    const themeBtns = document.querySelectorAll('.theme-btn');
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-theme');
            document.body.className = theme;
            themeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Intersection Observer mejorado para el efecto fade de las tarjetas
    const cards = document.querySelectorAll('.animate-on-scroll');
    cards.forEach(c => c.classList.add('js-hidden'));
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('js-visible');
            }
        });
    }, { threshold: 0.1 });
    cards.forEach(c => observer.observe(c));

    // Volver arriba
    document.getElementById('back-to-top')?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});