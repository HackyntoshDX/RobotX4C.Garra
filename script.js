document.addEventListener("DOMContentLoaded", () => {
    // 1. ELIMINAR PANTALLA DE CARGA (Para que deje de tapar el fondo)
    const preloader = document.getElementById("preloader");
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = "0";
            setTimeout(() => {
                preloader.style.display = "none";
            }, 500); // Medio segundo para desaparecer
        }, 800); // Espera un ratito y se va
    }

    // 2. ANIMACIONES MAGICAS DE SCROLL (Hace que los elementos aparezcan)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.init-hidden, .animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // 3. BOTONES DE MODO OSCURO / CLARO / FRUTIGER
    const themeBtns = document.querySelectorAll('.theme-btn');
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Saca la clase "active" de todos los botones
            themeBtns.forEach(b => b.classList.remove('active'));
            // Se la pone al que tocaste
            btn.classList.add('active');
            // Cambia el tema de toda la página
            document.body.className = btn.getAttribute('data-theme');
        });
    });

    // 4. BARRA DE PROGRESO DE LECTURA (Arriba de todo)
    window.addEventListener("scroll", () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progress = document.getElementById("scroll-progress");
        if (progress) {
            progress.style.width = scrolled + "%";
        }
    });

    // 5. BOTÓN "VOLVER AL INICIO"
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});