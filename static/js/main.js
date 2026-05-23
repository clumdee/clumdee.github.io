// Site-wide JS. Loaded with `defer`, so DOM is parsed by the time this runs.
(function () {
    // ----- Mobile navbar toggle -----
    const btn = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    const iconOpen = document.getElementById('nav-icon-open');
    const iconClose = document.getElementById('nav-icon-close');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            const isOpen = menu.dataset.state === 'open';
            if (isOpen) {
                menu.classList.add('hidden');
                menu.classList.remove('flex');
                menu.dataset.state = 'closed';
                btn.setAttribute('aria-expanded', 'false');
                iconOpen && iconOpen.classList.remove('hidden');
                iconClose && iconClose.classList.add('hidden');
            } else {
                menu.classList.remove('hidden');
                menu.classList.add('flex');
                menu.dataset.state = 'open';
                btn.setAttribute('aria-expanded', 'true');
                iconOpen && iconOpen.classList.add('hidden');
                iconClose && iconClose.classList.remove('hidden');
            }
        });
    }

    // ----- Highlight active nav link by matching page.category -----
    const pageCategory = document.body.dataset.pageCategory;
    if (pageCategory) {
        document.querySelectorAll('a.nav-link-modern').forEach((a) => {
            const href = (a.getAttribute('href') || '').toLowerCase();
            if (href.includes('/' + pageCategory + '/')) {
                a.classList.add('text-accent', 'font-semibold');
            }
        });
    }

    // ----- Quote injector (post pages) -----
    const qText = document.getElementById('opening-quote');
    if (qText) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);
        fetch('https://quoteslate.vercel.app/api/quotes/random', { signal: controller.signal })
            .then((r) => (r.ok ? r.json() : Promise.reject(new Error('bad status'))))
            .then((q) => {
                clearTimeout(timeout);
                if (q && q.quote) {
                    qText.textContent = q.quote;
                }
            })
            .catch(() => {
                clearTimeout(timeout);
                qText.textContent = '';
            });
    }
})();
