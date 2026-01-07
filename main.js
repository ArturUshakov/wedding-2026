/* =========================================================
   Reveal animations (IntersectionObserver)
   ========================================================= */
(function () {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    const io = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.14 }
    );

    items.forEach(el => io.observe(el));
})();

/* =========================================================
   Countdown timer
   ========================================================= */
(function () {
    const d = document.getElementById('cd-days');
    const h = document.getElementById('cd-hours');
    const m = document.getElementById('cd-minutes');
    const s = document.getElementById('cd-seconds');
    if (!d || !h || !m || !s) return;

    const target = new Date(2026, 7, 22, 14, 0, 0); // 22 Aug 2026 14:00

    const pad = n => String(n).padStart(2, '0');

    function tick() {
        let diff = target.getTime() - Date.now();
        if (diff < 0) diff = 0;

        const days = Math.floor(diff / 86400000);
        const hours = Math.floor(diff / 3600000) % 24;
        const minutes = Math.floor(diff / 60000) % 60;
        const seconds = Math.floor(diff / 1000) % 60;

        d.textContent = days;
        h.textContent = pad(hours);
        m.textContent = pad(minutes);
        s.textContent = pad(seconds);
    }

    tick();
    setInterval(tick, 1000);
})();

/* =========================================================
   Lightbox (gallery)
   ========================================================= */
(function () {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    if (!lightbox || !img) return;

    function open(src, alt) {
        img.src = src;
        img.alt = alt || '';
        lightbox.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        lightbox.classList.remove('is-open');
        img.src = '';
        img.alt = '';
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.js-lightbox').forEach(btn => {
        btn.addEventListener(
            'click',
            () => {
                const src = btn.getAttribute('data-full');
                const alt = btn.querySelector('img')?.alt || '';
                if (src) open(src, alt);
            },
            { passive: true }
        );
    });

    lightbox.addEventListener('click', e => {
        if (e.target.dataset.close === '1') close();
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
            close();
        }
    });
})();

/* =========================================================
   Yandex Map overlay (disable scroll capture)
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

    // при любом скролле — выключаем карту
    window.addEventListener(
        'scroll',
        () => {
            if (card.classList.contains('is-active')) disable();
        },
        { passive: true }
    );

    // клик вне карты
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
   Hero parallax (very soft)
   ========================================================= */
(function () {
    const hero = document.getElementById('heroMedia');
    if (!hero) return;

    if (
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
        return;
    }

    let ticking = false;

    function update() {
        ticking = false;

        const rect = hero.getBoundingClientRect();
        const vh = window.innerHeight || 800;

        const center = rect.top + rect.height / 2;
        const progress = (center - vh / 2) / (vh / 2);
        const clamped = Math.max(-1, Math.min(1, progress));

        hero.style.setProperty('--hero-parallax', `${clamped * 14}px`);
    }

    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
})();

/* =========================================================
   Background music (safe autoplay)
   ========================================================= */
(function () {
    const audio = document.getElementById('bg-music');
    const btn = document.getElementById('music-btn');
    if (!audio || !btn) return;

    const KEY = 'wedding_music';
    audio.volume = 0.25;

    function setUI(on) {
        btn.classList.toggle('music--on', on);
        btn.textContent = on ? '♪ Музыка: on' : '♪ Музыка';
    }

    async function play() {
        try {
            await audio.play();
            localStorage.setItem(KEY, '1');
            setUI(true);
        } catch (_) {
            setUI(false);
        }
    }

    function pause() {
        audio.pause();
        localStorage.setItem(KEY, '0');
        setUI(false);
    }

    btn.addEventListener(
        'click',
        () => {
            if (audio.paused) play();
            else pause();
        },
        { passive: true }
    );

    // попытка автозапуска
    if (localStorage.getItem(KEY) !== '0') {
        play();
    }

    // гарантированный запуск на первом жесте
    const unlock = () => {
        if (audio.paused && localStorage.getItem(KEY) !== '0') play();
    };

    ['pointerdown', 'touchstart', 'wheel', 'keydown'].forEach(evt => {
        window.addEventListener(evt, unlock, { once: true, passive: true });
    });
})();