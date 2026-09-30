const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Reveal on scroll */
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
);
$$('.reveal').forEach((el) => io.observe(el));

/* Top bar: floating variant appears after the hero */
const topbar = $('#topbar');
const hero = $('.hero');
if (topbar?.classList.contains('topbar--float') && hero) {
  new IntersectionObserver(([e]) => topbar.classList.toggle('show', !e.isIntersecting), { rootMargin: '-40% 0px 0px 0px' }).observe(hero);
}
const menuBtn = $('#menuBtn');
menuBtn?.addEventListener('click', () => {
  const open = topbar!.classList.toggle('menu-open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
$$('#topnav a').forEach((a) => a.addEventListener('click', () => topbar?.classList.remove('menu-open')));

/* Hero slideshow */
const slides = $$('[data-hero-slides] img');
const dots = $$('[data-hero-dots] button');
if (slides.length > 1) {
  let i = 0;
  let timer: number;
  const go = (n: number) => {
    if (n === i) return;
    slides.forEach((s) => s.classList.remove('is-prev'));
    slides[i].classList.replace('is-active', 'is-prev'); dots[i]?.classList.remove('is-active');
    i = (n + slides.length) % slides.length;
    slides[i].classList.add('is-active'); dots[i]?.classList.add('is-active');
  };
  const play = () => { clearInterval(timer); if (!reduced) timer = window.setInterval(() => go(i + 1), 6000); };
  dots.forEach((d, n) => d.addEventListener('click', () => { go(n); play(); }));
  play();
}

/* Count-up stats */
const counter = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    counter.unobserve(e.target);
    const el = e.target as HTMLElement;
    const end = Number(el.dataset.count);
    const suffix = el.dataset.suffix ?? '';
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1400);
      el.textContent = String(Math.round(end * (1 - Math.pow(1 - p, 3)))).padStart(2, '0') + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    if (!reduced) requestAnimationFrame(tick);
  });
});
$$('[data-count]').forEach((el) => counter.observe(el));

/* Room sliders */
$$('[data-slider]').forEach((slider) => {
  const track = $('.slider__track', slider)!;
  const count = track.children.length;
  const now = $('[data-now]', slider);
  const thumbs = $$('button', slider.closest('section')!.querySelector('[data-thumbs]') ?? document.createElement('div'));
  let i = 0;
  const go = (n: number) => {
    i = (n + count) % count;
    track.style.transform = `translateX(-${i * 100}%)`;
    if (now) now.textContent = String(i + 1).padStart(2, '0');
    thumbs.forEach((t, k) => t.classList.toggle('is-active', k === i));
  };
  $('.slider__prev', slider)?.addEventListener('click', () => go(i - 1));
  $('.slider__next', slider)?.addEventListener('click', () => go(i + 1));
  thumbs.forEach((t, k) => t.addEventListener('click', () => go(k)));
  let x0: number | null = null;
  slider.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
    x0 = null;
  });
});

/* Filter chips (gallery + blog) */
const setupFilter = (bar: HTMLElement | null, items: HTMLElement[]) => {
  if (!bar) return;
  $$('button', bar).forEach((b) => b.addEventListener('click', () => {
    $$('button', bar).forEach((x) => x.classList.toggle('is-active', x === b));
    const f = b.dataset.f;
    items.forEach((it) => it.classList.toggle('hide', f !== 'all' && it.dataset.cat !== f));
  }));
};
setupFilter($('[data-filters]'), $$('[data-masonry] a'));
setupFilter($('[data-blog-filters]'), $$('.blog-list [data-cat]'));

/* Lightbox */
const lb = $('#lightbox');
const lbImg = lb ? $<HTMLImageElement>('img', lb) : null;
const lbCap = lb ? $('figcaption', lb) : null;
let lbItems: HTMLAnchorElement[] = [];
let lbI = 0;
const lbShow = (n: number) => {
  lbI = (n + lbItems.length) % lbItems.length;
  const a = lbItems[lbI];
  lbImg!.src = a.href;
  lbImg!.alt = a.dataset.cap ?? '';
  lbCap!.textContent = `${a.dataset.cap ?? ''} · ${lbI + 1} / ${lbItems.length}`;
};
let lbReturn: HTMLElement | null = null;
const lbClose = () => { lb?.classList.remove('open'); lb?.setAttribute('inert', ''); document.body.style.overflow = ''; lbReturn?.focus(); };
$$<HTMLAnchorElement>('[data-masonry] a').forEach((a) => a.addEventListener('click', (e) => {
  e.preventDefault();
  lbItems = $$<HTMLAnchorElement>('[data-masonry] a:not(.hide)');
  lbShow(lbItems.indexOf(a));
  lbReturn = a;
  lb?.removeAttribute('inert'); lb?.classList.add('open'); document.body.style.overflow = 'hidden';
  $<HTMLButtonElement>('.lb-close', lb!)?.focus();
}));
if (lb) {
  $('.lb-close', lb)?.addEventListener('click', lbClose);
  $('.lb-prev', lb)?.addEventListener('click', () => lbShow(lbI - 1));
  $('.lb-next', lb)?.addEventListener('click', () => lbShow(lbI + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) lbClose(); });
  addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') lbClose();
    if (e.key === 'ArrowLeft') lbShow(lbI - 1);
    if (e.key === 'ArrowRight') lbShow(lbI + 1);
  });
}

/* Dates: disallow past dates, keep check-out after check-in */
const today = new Date().toISOString().slice(0, 10);
$$<HTMLInputElement>('input[type=date]').forEach((d) => (d.min = today));
const form = $<HTMLFormElement>('[data-reserve]');
if (form) {
  const ci = form.elements.namedItem('checkin') as HTMLInputElement;
  const co = form.elements.namedItem('checkout') as HTMLInputElement;
  ci.addEventListener('change', () => {
    co.min = ci.value;
    if (!co.value || co.value <= ci.value) {
      const d = new Date(ci.value); d.setDate(d.getDate() + 1);
      co.value = d.toISOString().slice(0, 10);
    }
  });

  const message = () => {
    const v = (k: string) => (form.elements.namedItem(k) as HTMLInputElement).value.trim();
    return [
      'Hello Khwab Villa, I would like to make a reservation enquiry.',
      '',
      `Name: ${v('name')}`,
      `Phone: ${v('phone')}`,
      `Check in: ${v('checkin')}`,
      `Check out: ${v('checkout')}`,
      `Adults: ${v('adults')} · Children: ${v('children')} · Rooms: ${v('rooms')}`,
      v('msg') ? `Message: ${v('msg')}` : '',
    ].filter(Boolean).join('\n');
  };
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    window.open(`https://wa.me/${form.dataset.wa}?text=${encodeURIComponent(message())}`, '_blank', 'noopener');
  });
  $('[data-email-btn]', form)?.addEventListener('click', () => {
    if (!form.reportValidity()) return;
    const to = form.dataset.email!;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
    const subject = `Reservation enquiry${name ? ` — ${name}` : ''}`;
    const body = message();
    const q = (o: Record<string, string>) => new URLSearchParams(o).toString().replace(/\+/g, '%20');

    // An <a> click is more dependable than assigning location.href for mailto: links
    const mailto = document.createElement('a');
    mailto.href = `mailto:${to}?${q({ subject, body })}`;
    mailto.click();

    // Many computers have no default mail app, so offer webmail and copy as backups
    const panel = $('[data-mail-fallback]', form)!;
    $<HTMLAnchorElement>('[data-gmail]', panel)!.href = `https://mail.google.com/mail/?${q({ view: 'cm', fs: '1', to, su: subject, body })}`;
    $<HTMLAnchorElement>('[data-outlook]', panel)!.href = `https://outlook.live.com/mail/0/deeplink/compose?${q({ to, subject, body })}`;
    const copy = $('[data-copy]', panel)!;
    copy.textContent = 'Copy details';
    copy.onclick = async () => {
      try {
        await navigator.clipboard.writeText(`To: ${to}\nSubject: ${subject}\n\n${body}`);
        copy.textContent = 'Copied ✓';
      } catch {
        copy.textContent = `Email us at ${to}`;
      }
    };
    panel.hidden = false;
  });

  /* Hero quick-book carries values into the reservation form */
  $<HTMLFormElement>('[data-quickbook]')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = e.currentTarget as HTMLFormElement;
    ci.value = (q.elements.namedItem('checkin') as HTMLInputElement).value;
    ci.dispatchEvent(new Event('change'));
    (form.elements.namedItem('adults') as HTMLSelectElement).value = (q.elements.namedItem('adults') as HTMLSelectElement).value;
    $('#reserve')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    setTimeout(() => (form.elements.namedItem('name') as HTMLInputElement).focus({ preventScroll: true }), 900);
  });
}

/* Parallax band */
const bandBg = $('.band__bg');
if (bandBg && !reduced) {
  const band = bandBg.closest('.band')!;
  let ticking = false;
  const update = () => {
    ticking = false;
    const r = band.getBoundingClientRect();
    const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
    bandBg.style.transform = `translateY(${p * -60}px)`;
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { addEventListener('scroll', onScroll, { passive: true }); onScroll(); }
    else removeEventListener('scroll', onScroll);
  }).observe(band);
}
