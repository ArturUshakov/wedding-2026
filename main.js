/* =========================================================
   Reveal with stagger
   ========================================================= */
(function () {
    const items = Array.from(document.querySelectorAll('.js-reveal'));
    if (!items.length) return;

    const reduce =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    items.forEach((item, index) => {
        item.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 70}ms`);
    });

    if (reduce) {
        items.forEach(el => el.classList.add('is-in'));
        return;
    }

    const io = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-in');
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.16, rootMargin: '0px 0px -12% 0px' }
    );

    items.forEach(el => io.observe(el));
})();

/* =========================================================
   Countdown with flip pulse on change
   ========================================================= */
(function () {
    const units = [
        document.getElementById('cd-days'),
        document.getElementById('cd-hours'),
        document.getElementById('cd-minutes'),
        document.getElementById('cd-seconds')
    ];
    if (units.some(unit => !unit)) return;

    const target = new Date(2026, 7, 22, 14, 0, 0);
    const pad = n => String(n).padStart(2, '0');

    function updateNode(node, value) {
        if (node.textContent === value) return;
        node.textContent = value;
        node.parentElement?.classList.remove('is-ticking');
        // Force restart of the pulse animation when a value changes.
        void node.offsetWidth;
        node.parentElement?.classList.add('is-ticking');
    }

    function tick() {
        let diff = target.getTime() - Date.now();
        if (diff < 0) diff = 0;

        const values = [
            String(Math.floor(diff / 86400000)),
            pad(Math.floor(diff / 3600000) % 24),
            pad(Math.floor(diff / 60000) % 60),
            pad(Math.floor(diff / 1000) % 60)
        ];

        units.forEach((unit, index) => updateNode(unit, values[index]));
    }

    tick();
    setInterval(tick, 1000);
})();

/* =========================================================
   Lightbox
   ========================================================= */
(function () {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    if (!lightbox || !img) return;

    const triggers = document.querySelectorAll('.js-lightbox');
    if (!triggers.length) return;

    function open(src, alt) {
        img.src = src;
        img.alt = alt || '';
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        img.src = '';
        img.alt = '';
    }

    triggers.forEach(btn => {
        btn.addEventListener(
            'click',
            () => {
                const src = btn.getAttribute('data-full');
                const alt = btn.querySelector('img')?.getAttribute('alt') || '';
                if (src) open(src, alt);
            },
            { passive: true }
        );
    });

    lightbox.addEventListener('click', e => {
        if (e.target && e.target.getAttribute('data-close') === '1') close();
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && lightbox.classList.contains('is-open')) close();
    });
})();

/* =========================================================
   Yandex Map overlay
   ========================================================= */
(function () {
    const card = document.getElementById('mapCard');
    const overlay = document.getElementById('mapOverlay');
    if (!card || !overlay) return;

    function enable() {
        card.classList.add('is-active');
    }

    function disable() {
        card.classList.remove('is-active');
    }

    overlay.addEventListener('click', enable, { passive: true });

    window.addEventListener(
        'scroll',
        () => {
            if (card.classList.contains('is-active')) disable();
        },
        { passive: true }
    );

    document.addEventListener(
        'click',
        e => {
            if (!card.classList.contains('is-active')) return;
            if (!card.contains(e.target)) disable();
        },
        { passive: true }
    );
})();

/* =========================================================
   Parallax for floating elements
   ========================================================= */
(function () {
    const items = Array.from(document.querySelectorAll('[data-parallax]'));
    if (!items.length) return;

    const reduce =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let rafId = 0;

    function render() {
        const viewport = window.innerHeight || 1;
        items.forEach(item => {
            const speed = Number(item.getAttribute('data-parallax')) || 0.1;
            const rect = item.getBoundingClientRect();
            const center = rect.top + rect.height / 2;
            const shift = ((center - viewport / 2) / viewport) * speed * 120;
            item.style.setProperty('--parallax-shift', `${shift.toFixed(2)}px`);
        });
        rafId = 0;
    }

    function requestRender() {
        if (rafId) return;
        rafId = window.requestAnimationFrame(render);
    }

    render();
    window.addEventListener('scroll', requestRender, { passive: true });
    window.addEventListener('resize', requestRender, { passive: true });
})();

/* =========================================================
   Tilt micro-interaction
   ========================================================= */
(function () {
    const cards = Array.from(document.querySelectorAll('.js-tilt'));
    if (!cards.length) return;

    const reduce =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    cards.forEach(card => {
        const reset = () => {
            card.style.setProperty('--tilt-x', '0deg');
            card.style.setProperty('--tilt-y', '0deg');
        };

        card.addEventListener('pointermove', event => {
            if (window.innerWidth <= 720) return;
            const rect = card.getBoundingClientRect();
            const px = (event.clientX - rect.left) / rect.width;
            const py = (event.clientY - rect.top) / rect.height;
            const tiltY = (px - 0.5) * 7;
            const tiltX = (0.5 - py) * 7;
            card.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
            card.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
        });

        card.addEventListener('pointerleave', reset);
        card.addEventListener('pointercancel', reset);
    });
})();

/* =========================================================
   Smooth anchor scroll
   ========================================================= */
(function () {
    const links = document.querySelectorAll('a[href^="#"]');
    if (!links.length) return;

    links.forEach(link => {
        link.addEventListener('click', event => {
            const id = link.getAttribute('href');
            if (!id || id === '#') return;
            const target = document.querySelector(id);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
})();
