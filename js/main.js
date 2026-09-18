/* ============================================================
   Silver Jubilee invitation — behaviour
   ============================================================ */
(() => {
  'use strict';

  const C = window.INVITE || {};
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const pad = n => String(n).padStart(2, '0');
  const days = Array.isArray(C.days) ? C.days : [];
  const allEvents = days.flatMap(d => d.events || []);
  const start = new Date(allEvents.length ? allEvents[0].start : NaN);
  const lastStart = new Date(allEvents.length ? allEvents[allEvents.length - 1].start : NaN);
  const wedding = new Date(`${C.weddingDate}T00:00`);
  const shortDate = d => (isNaN(d) ? '' : `${pad(d.getDate())} · ${pad(d.getMonth() + 1)} · ${d.getFullYear()}`);

  // "17–18 · 10 · 2026" when the celebrations span days in the same month
  const dateRange = (a, b) => {
    if (isNaN(a)) return '';
    if (isNaN(b) || a.toDateString() === b.toDateString()) return shortDate(a);
    if (a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()) {
      return `${pad(a.getDate())}–${pad(b.getDate())} · ${pad(a.getMonth() + 1)} · ${a.getFullYear()}`;
    }
    return `${shortDate(a)} – ${shortDate(b)}`;
  };

  /* ---------- Fill the page from config.js ---------- */
  const WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
  const inWords = n => WORDS[n] || String(n);

  const computed = {
    initial1: (C.partner1 || '').charAt(0),
    initial2: (C.partner2 || '').charAt(0),
    dateShort: dateRange(start, lastStart),
    weddingYear: isNaN(wedding) ? '' : String(wedding.getFullYear()),
    jubileeYear: isNaN(start) ? '' : String(start.getFullYear()),
    eventsCount: `${inWords(allEvents.length)} Celebrations`,
    eventsSummary: `${inWords(allEvents.length)} celebrations over ${inWords(days.length).toLowerCase()} days`,
    eventsList: allEvents.map(e => e.name.split(' — ')[0].replace(/ Ceremony$/, '')).join(' · ')
  };

  $$('[data-bind]').forEach(el => {
    const key = el.dataset.bind;
    const value = key in computed ? computed[key] : C[key];
    if (value) el.textContent = value;
  });

  if (C.partner1 && C.partner2) document.title = `${C.partner1} & ${C.partner2} · Silver Jubilee`;

  /* ---------- Split the hero names into letters for their entrance ---------- */
  const heroNames = $('#heroNames');
  if (heroNames) {
    heroNames.setAttribute('aria-label', `${C.partner1 || ''} & ${C.partner2 || ''}`);
    let index = 0;
    $$('.hero__name', heroNames).forEach((name, n) => {
      if (n === 1) index += 3; // a breath for the ampersand
      const letters = [...name.textContent].map(ch => {
        const span = document.createElement('span');
        span.className = 'ch';
        span.style.setProperty('--i', index++);
        span.textContent = ch === ' ' ? ' ' : ch;
        return span;
      });
      name.setAttribute('aria-hidden', 'true');
      name.replaceChildren(...letters);
    });
  }

  /* ---------- The celebrations, built from config.js ---------- */
  const ICONS = {
    mehndi: '<path d="M12 21c0-6.5.5-11.5 6.5-16.5-.5 7.5-2.5 12.5-6.5 16.5z"/><path d="M12 21c-.5-5.5-2-9.5-6.5-12.5-.5 6.5 2 10.5 6.5 12.5z"/><path d="M12 21v-8"/>',
    music: '<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
    diya: '<path d="M3.5 14h17c0 3.6-3.8 6.5-8.5 6.5S3.5 17.6 3.5 14z"/><path d="M12 11c-1.8-1.5-1.8-4 0-6.5 1.8 2.5 1.8 5 0 6.5z"/>',
    flower: '<circle cx="12" cy="12" r="2.4"/><path d="M12 9.6C10 7.2 10 4.6 12 3c2 1.6 2 4.2 0 6.6zM12 14.4c2 2.4 2 5 0 6.6-2-1.6-2-4.2 0-6.6zM9.6 12C7.2 14 4.6 14 3 12c1.6-2 4.2-2 6.6 0zM14.4 12c2.4-2 5-2 6.6 0-1.6 2-4.2 2-6.6 0z"/>',
    sparkle: '<path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z"/><path d="M18.5 16.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>'
  };

  const daysEl = $('#days');
  if (daysEl) {
    const html = s => String(s ?? '').replace(/[&<>"']/g, c => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));

    daysEl.innerHTML = days.map(day => `
      <section class="day">
        <header class="day__head reveal">
          <p class="eyebrow">${html(day.label)}</p>
          <h3>${html(day.weekday)}</h3>
          <p class="day__date">${html(day.date)}</p>
        </header>
        <div class="events">
          ${(day.events || []).map(ev => `
            <article class="event reveal${ev.featured ? ' event--featured' : ''}">
              <svg class="event__icon" viewBox="0 0 24 24" aria-hidden="true">${ICONS[ev.icon] || ICONS.sparkle}</svg>
              <p class="event__time">${html(ev.time)}</p>
              <h4>${html(ev.name)}</h4>
              <p class="event__note">${html(ev.note)}</p>
            </article>`).join('')}
        </div>
      </section>`).join('');
  }

  // lets CSS draw the icons stroke by stroke
  $$('.dcard__icon *, .event__icon *').forEach(el => el.setAttribute('pathLength', '1'));

  /* ---------- Opening sequence ---------- */
  const root = document.documentElement;
  const intro = $('#intro');
  let opened = false;

  const openPage = () => {
    if (opened) return;
    opened = true;
    root.classList.remove('is-loading');
    root.classList.add('is-ready');
    if (intro) {
      intro.classList.add('is-out');
      setTimeout(() => intro.remove(), 1100);
    }
  };

  if (reduced || !intro) {
    openPage();
  } else {
    root.classList.add('is-loading');
    const minimum = new Promise(resolve => setTimeout(resolve, 2400));
    const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
    Promise.all([minimum, fonts]).then(openPage);
    setTimeout(openPage, 4500);          // never wait longer than this
    intro.addEventListener('click', openPage);
  }

  /* ---------- Map, directions, RSVP links ---------- */
  const place = [C.venue, C.address].filter(Boolean).join(', ');
  const query = encodeURIComponent(C.mapQuery || place);

  // a shared Google Maps pin is the most accurate; fall back to searching the address
  const mapsLink = $('#mapsLink');
  if (mapsLink) mapsLink.href = C.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${query}`;

  const mapFrame = $('#mapFrame');
  if (mapFrame && query) mapFrame.src = `https://www.google.com/maps?q=${query}&output=embed`;

  const telLink = $('#telLink');
  if (telLink && C.phone) telLink.href = `tel:${C.phone.replace(/[^\d+]/g, '')}`;

  const waLink = $('#waLink');
  if (waLink && C.whatsapp) {
    const text = `Namaste! I will be attending the Silver Jubilee celebration of ${C.partner1} & ${C.partner2} on ${C.dateText}.`;
    waLink.href = `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(text)}`;
  }

  /* ---------- Add to calendar (.ics) ---------- */
  const calBtn = $('#calBtn');
  if (calBtn) {
    calBtn.addEventListener('click', () => {
      if (!allEvents.length) return;
      const stamp = d => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
      const esc = s => String(s).replace(/([,;\\])/g, '\\$1');
      const now = stamp(new Date());

      // one calendar entry per ceremony
      const entries = allEvents.flatMap((ev, i) => {
        const from = new Date(ev.start);
        if (isNaN(from)) return [];
        // events are "onwards": each runs until the next one that day, at most four hours
        const next = allEvents[i + 1] ? new Date(allEvents[i + 1].start) : null;
        const sameDay = next && next.toDateString() === from.toDateString();
        const to = new Date(Math.min(+from + 4 * 3600e3, sameDay ? +next : Infinity));
        return [
          'BEGIN:VEVENT',
          `UID:${+from}-${i}@silver-jubilee`,
          `DTSTAMP:${now}`,
          `DTSTART:${stamp(from)}`,
          `DTEND:${stamp(to)}`,
          `SUMMARY:${esc(`${ev.name} · ${C.partner1} & ${C.partner2} Silver Jubilee`)}`,
          `LOCATION:${esc(place)}`,
          `DESCRIPTION:${esc(ev.note || '')}`,
          'END:VEVENT'
        ];
      });

      const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Silver Jubilee//EN', ...entries, 'END:VCALENDAR'].join('\r\n');

      const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
      const a = Object.assign(document.createElement('a'), { href: url, download: 'silver-jubilee.ics' });
      document.body.append(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
  }

  /* ---------- Countdown ---------- */
  const countdown = $('#countdown');
  const countdownDone = $('#countdownDone');
  const cells = {};
  $$('[data-cd]').forEach(el => { cells[el.dataset.cd] = el; });

  let timer = 0;
  const tick = () => {
    const ms = start - Date.now();
    if (isNaN(ms) || ms <= 0) {
      countdown.hidden = true;
      countdownDone.hidden = isNaN(ms);
      clearInterval(timer);
      return;
    }
    const s = Math.floor(ms / 1000);
    const parts = {
      days: Math.floor(s / 86400),
      hours: pad(Math.floor(s / 3600) % 24),
      minutes: pad(Math.floor(s / 60) % 60),
      seconds: pad(s % 60)
    };
    Object.keys(cells).forEach(k => {
      const value = String(parts[k]);
      if (cells[k].textContent === value) return;
      cells[k].textContent = value;
      cells[k].classList.remove('tick');
      void cells[k].offsetWidth;           // restart the settle animation
      cells[k].classList.add('tick');
    });
  };
  timer = setInterval(tick, 1000);
  tick();

  /* ---------- Navigation ---------- */
  const nav = $('#nav');
  const navToggle = $('#navToggle');

  const onScroll = () => nav.classList.toggle('is-solid', scrollY > 30);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const setMenu = open => {
    nav.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };
  navToggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  $$('#navMenu a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('resize', () => { if (innerWidth > 860) setMenu(false); });

  /* ---------- Reveal on scroll ---------- */
  const revealables = $$('.reveal');
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver(entries => {
      // items that appear together arrive one after another
      let order = 0;
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.style.setProperty('--stagger', `${order++ * 120}ms`);
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealables.forEach(el => io.observe(el));
  } else {
    revealables.forEach(el => el.classList.add('is-in'));
  }

  /* ---------- Gallery + photo viewer ---------- */
  const frames = $$('.frame');
  const lightbox = $('#lightbox');
  const lbImg = $('#lbImg');
  const lbCap = $('#lbCap');
  let current = 0;
  let lastFocus = null;

  const photos = () => frames.filter(f => !f.classList.contains('is-empty'));

  frames.forEach(frame => {
    const img = $('img', frame);
    const box = $('.frame__img', frame);
    frame.tabIndex = 0;

    const markEmpty = () => {
      frame.classList.add('is-empty');
      frame.removeAttribute('tabindex');
      box.dataset.file = img.getAttribute('src').split('/').pop();
    };
    img.addEventListener('error', markEmpty);
    if (img.complete && !img.naturalWidth) markEmpty();

    const open = () => { if (!frame.classList.contains('is-empty')) openViewer(photos().indexOf(frame)); };
    frame.addEventListener('click', open);
    frame.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  });

  const show = i => {
    const list = photos();
    if (!list.length) return;
    current = (i + list.length) % list.length;
    const img = $('img', list[current]);
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = $('figcaption', list[current]).textContent;
  };

  const openViewer = i => {
    if (i < 0) return;
    lastFocus = document.activeElement;
    show(i);
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    $('#lbClose').focus();
  };

  const closeViewer = () => {
    lightbox.hidden = true;
    lbImg.src = '';
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  };

  $('#lbClose').addEventListener('click', closeViewer);
  $('#lbPrev').addEventListener('click', () => show(current - 1));
  $('#lbNext').addEventListener('click', () => show(current + 1));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeViewer(); });

  let touchX = 0;
  lightbox.addEventListener('touchstart', e => { touchX = e.changedTouches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
  }, { passive: true });

  addEventListener('keydown', e => {
    if (!lightbox.hidden) {
      if (e.key === 'Escape') closeViewer();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    } else if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
    }
  });

  /* ---------- Blessings (saved in this browser) ---------- */
  const KEY = 'silver-jubilee.blessings';
  const wishList = $('#wishList');
  const wishForm = $('#wishForm');
  const wishMsg = $('#wishMsg');

  const examples = [
    { name: 'Sharma Family', text: 'Twenty-five beautiful years! May your bond grow stronger with every passing day.' },
    { name: 'Meera Aunty', text: 'Wishing you both a lifetime of happiness, good health and togetherness.' }
  ];

  const load = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY));
      if (Array.isArray(saved)) return saved;
    } catch (e) { /* storage unavailable */ }
    return examples;
  };

  const save = list => {
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) { /* storage unavailable */ }
  };

  const render = () => {
    wishList.replaceChildren(...load().map((w, i) => {
      const card = document.createElement('article');
      card.className = 'wish';

      const text = document.createElement('p');
      text.className = 'wish__text';
      text.textContent = `“${w.text}”`;

      const by = document.createElement('p');
      by.className = 'wish__by';
      by.textContent = `— ${w.name}`;

      card.append(text, by);

      if (w.ts) {
        const del = document.createElement('button');
        del.className = 'wish__del';
        del.type = 'button';
        del.setAttribute('aria-label', 'Remove this message');
        del.textContent = '×';
        del.addEventListener('click', () => {
          const list = load();
          list.splice(i, 1);
          save(list);
          render();
        });
        card.append(del);
      }
      return card;
    }));
  };
  render();

  wishForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = $('#wishName').value.trim();
    const text = $('#wishText').value.trim();
    if (!name || !text) {
      wishMsg.textContent = 'Please add your name and a message.';
      return;
    }
    save([{ name, text, ts: Date.now() }, ...load()]);
    render();
    wishForm.reset();
    wishMsg.textContent = 'Thank you for your blessings.';
    setTimeout(() => { wishMsg.textContent = ''; }, 4000);
  });

  /* ---------- Timeline lines fill with gold as you scroll ---------- */
  const tracks = $$('.journey');
  let fillQueued = false;
  const fillTracks = () => {
    fillQueued = false;
    tracks.forEach(el => {
      const r = el.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (innerHeight * 0.7 - r.top) / r.height));
      el.style.setProperty('--p', progress.toFixed(3));
    });
  };
  addEventListener('scroll', () => {
    if (fillQueued) return;
    fillQueued = true;
    requestAnimationFrame(fillTracks);
  }, { passive: true });
  addEventListener('resize', fillTracks);
  fillTracks();

  /* ---------- Gold dust ---------- */
  (() => {
    const canvas = $('#dust');
    if (!canvas) return;
    if (reduced) { canvas.remove(); return; }

    const ctx = canvas.getContext('2d');
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let specks = [];
    let t = 0;

    const seed = anywhere => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 10,
      r: 0.5 + Math.random() * 1.4,
      vy: 0.12 + Math.random() * 0.3,
      sway: Math.random() * Math.PI * 2,
      a: 0.15 + Math.random() * 0.45
    });

    const resize = () => {
      w = innerWidth;
      h = innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(48, Math.max(18, w / 32)));
      specks = Array.from({ length: count }, () => seed(true));
    };

    const frame = () => {
      t += 0.01;
      ctx.clearRect(0, 0, w, h);
      specks.forEach((p, i) => {
        p.y -= p.vy;
        p.x += Math.sin(t + p.sway) * 0.25;
        if (p.y < -10) specks[i] = seed(false);
        const alpha = p.a * (0.55 + 0.45 * Math.sin(t * 2 + p.sway));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230,205,148,${alpha.toFixed(3)})`;
        ctx.fill();
      });
      requestAnimationFrame(frame);
    };

    resize();
    frame();

    let resizeTimer;
    addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    });
  })();

  /* ---------- Music ---------- */
  const audio = $('#audio');
  const musicBtn = $('#musicBtn');

  audio.addEventListener('error', () => musicBtn.remove());
  musicBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play()
        .then(() => {
          musicBtn.classList.add('is-playing');
          musicBtn.setAttribute('aria-pressed', 'true');
        })
        .catch(() => musicBtn.remove());
    } else {
      audio.pause();
      musicBtn.classList.remove('is-playing');
      musicBtn.setAttribute('aria-pressed', 'false');
    }
  });
})();
