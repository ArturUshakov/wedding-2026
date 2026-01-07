/* =========================================================
   Reveal (легкий, без blur/filters)
   ========================================================= */
(function () {
    const items = document.querySelectorAll('.js-reveal');
    if (!items.length) return;

    const reduce =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) {
        items.forEach(el => el.classList.add('is-in'));
        return;
    }

    const io = new IntersectionObserver(
        (entries, observer) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in');
                    observer.unobserve(entry.target);
                }
            }
        },
        { threshold: 0.14, rootMargin: '0px 0px -10% 0px' }
    );

    items.forEach(el => io.observe(el));
})();

/* =========================================================
   Countdown
   ========================================================= */
(function () {
    const d = document.getElementById('cd-days');
    const h = document.getElementById('cd-hours');
    const m = document.getElementById('cd-minutes');
    const s = document.getElementById('cd-seconds');
    if (!d || !h || !m || !s) return;

    // 22 Aug 2026 14:00 (локальное время устройства)
    const target = new Date(2026, 7, 22, 14, 0, 0);
    const pad = n => String(n).padStart(2, '0');

    function tick() {
        let diff = target.getTime() - Date.now();
        if (diff < 0) diff = 0;

        const days = Math.floor(diff / 86400000);
        const hours = Math.floor(diff / 3600000) % 24;
        const minutes = Math.floor(diff / 60000) % 60;
        const seconds = Math.floor(diff / 1000) % 60;

        d.textContent = String(days);
        h.textContent = pad(hours);
        m.textContent = pad(minutes);
        s.textContent = pad(seconds);
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
   Yandex Map overlay: включаем управление по тапу,
   выключаем при скролле и клике вне карты
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
   Music: best-effort autoplay + unlock на первом жесте
   ========================================================= */
(function () {
    const audio = document.getElementById('bg-music');
    const btn = document.getElementById('music-btn');
    if (!audio || !btn) return;

    const KEY = 'wedding_music_playing';
    audio.volume = 0.25;

    function setUI(on) {
        btn.classList.toggle('music--on', on);
        btn.textContent = on ? '♪ Музыка: on' : '♪ Музыка';
        btn.setAttribute('aria-label', on ? 'Музыка: выключить' : 'Музыка: включить');
    }

    async function play() {
        try {
            await audio.play();
            localStorage.setItem(KEY, '1');
            setUI(true);
            return true;
        } catch (_) {
            setUI(false);
            return false;
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

    // попытка автозапуска (может быть заблокирована браузером)
    setUI(false);
    if (localStorage.getItem(KEY) !== '0') {
        play();
    }

    // гарантированный запуск на первом жесте (если пользователь не отключал)
    const unlock = async () => {
        if (localStorage.getItem(KEY) === '0') return;
        if (!audio.paused) return;
        await play();
    };

    ['pointerdown', 'touchstart', 'keydown', 'wheel'].forEach(evt => {
        window.addEventListener(evt, unlock, { passive: true, once: true });
    });
})();