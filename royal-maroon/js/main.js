/* ============================================================
   Silver Jubilee — Royal Maroon · behaviour
   ============================================================ */
(() => {
  'use strict';

  const C = window.INVITE || {};
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  const pad = n => String(n).padStart(2, '0');
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const days = Array.isArray(C.days) ? C.days : [];
  const allEvents = days.flatMap(d => d.events || []);
  const start = new Date(allEvents.length ? allEvents[0].start : NaN);
  const wedding = new Date(`${C.weddingDate}T00:00`);
  const couple = `${C.partner1 || ''} & ${C.partner2 || ''}`;
  const place = [C.venue, C.address].filter(Boolean).join(', ');

  /* ---------- Fill the page from config.js ---------- */
  const computed = {
    initial1: (C.partner1 || '').charAt(0),
    initial2: (C.partner2 || '').charAt(0),
    weddingYear: isNaN(wedding) ? '' : String(wedding.getFullYear()),
    weddingLong: isNaN(wedding) ? '' : `${wedding.getDate()} ${MONTHS[wedding.getMonth()]} ${wedding.getFullYear()}`,
    jubileeYear: isNaN(start) ? '' : String(start.getFullYear())
  };
  $$('[data-bind]').forEach(el => {
    const key = el.dataset.bind;
    const value = key in computed ? computed[key] : C[key];
    if (value) el.textContent = value;
  });
  if (C.partner1 && C.partner2) document.title = `${couple} · Silver Jubilee`;

  /* ---------- Hero photo (images/hero.jpg), if there is one ---------- */
  const heroBg = $('#heroBg');
  const heroImg = new Image();
  heroImg.onload = () => {
    heroBg.style.setProperty('--photo', `url("${heroImg.src}")`);
    heroBg.classList.add('has-photo');
  };
  heroImg.src = 'images/hero.jpg';

  /* ---------- Together for: years, months, days ---------- */
  if (!isNaN(wedding)) {
    // before the celebrations, count up to them so the page reads "25 years"
    const upcoming = start > Date.now();
    const now = upcoming ? start : new Date();
    const title = $('#togetherTitle');
    if (title && upcoming) title.textContent = `Married ${computed.weddingLong} — by the celebrations, together for`;
    let months = (now.getFullYear() - wedding.getFullYear()) * 12 + now.getMonth() - wedding.getMonth();
    if (now.getDate() < wedding.getDate()) months--;
    const totals = {
      years: Math.floor(months / 12),
      months,
      days: Math.floor((now - wedding) / 864e5)
    };
    $$('[data-count]').forEach(el => {
      const target = totals[el.dataset.count];
      el.textContent = target.toLocaleString('en-IN');
    });
  }

  /* ---------- The programme ---------- */
  const ICONS = {
    mehndi: '<path d="M12 21c0-6.5.5-11.5 6.5-16.5-.5 7.5-2.5 12.5-6.5 16.5z"/><path d="M12 21c-.5-5.5-2-9.5-6.5-12.5-.5 6.5 2 10.5 6.5 12.5z"/><path d="M12 21v-8"/>',
    music: '<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
    diya: '<path d="M3.5 14h17c0 3.6-3.8 6.5-8.5 6.5S3.5 17.6 3.5 14z"/><path d="M12 11c-1.8-1.5-1.8-4 0-6.5 1.8 2.5 1.8 5 0 6.5z"/>',
    flower: '<circle cx="12" cy="12" r="2.4"/><path d="M12 9.6C10 7.2 10 4.6 12 3c2 1.6 2 4.2 0 6.6zM12 14.4c2 2.4 2 5 0 6.6-2-1.6-2-4.2 0-6.6zM9.6 12C7.2 14 4.6 14 3 12c1.6-2 4.2-2 6.6 0zM14.4 12c2.4-2 5-2 6.6 0-1.6 2-4.2 2-6.6 0z"/>',
    sparkle: '<path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z"/><path d="M18.5 16.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>'
  };

  const programme = $('#programme');
  if (programme) {
    programme.innerHTML = days.map(day => {
      const first = new Date((day.events || [])[0]?.start);
      const num = isNaN(first) ? '' : first.getDate();
      const month = isNaN(first) ? '' : MONTHS[first.getMonth()];
      return `
        <section class="day">
          <header class="day__head reveal">
            <p class="label label--gold">${esc(day.label)}</p>
            <p class="day__num">${num}</p>
            <p class="day__meta">${esc(day.weekday)} · ${month}</p>
          </header>
          <div class="events">
            ${(day.events || []).map(ev => {
              const icon = ICONS[ev.icon] ? ev.icon : 'sparkle';
              return `
              <article class="event event--${icon} reveal${ev.featured ? ' event--featured' : ''}">
                <div class="event__art">
                  ${ev.image ? `<img src="${esc(ev.image)}" alt="" loading="lazy" />` : `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[icon]}</svg>`}
                  <p class="event__time">${esc(ev.time)}</p>
                </div>
                <div class="event__body">
                  <h4>${esc(ev.name)}</h4>
                  <p>${esc(ev.note)}</p>
                  ${ev.theme ? `<span class="event__theme">Theme · ${esc(ev.theme)}</span>` : ''}
                </div>
              </article>`;
            }).join('')}
          </div>
        </section>`;
    }).join('');
  }

  /* ---------- The letter ---------- */
  const letterBody = $('#letterBody');
  if (letterBody) {
    const lines = Array.isArray(C.letter) ? C.letter : [];
    if (lines.length) letterBody.innerHTML = lines.map(l => `<p>${esc(l)}</p>`).join('');
    else letterBody.closest('section').remove();
  }

  /* ---------- Music: a YouTube clip or your own file, looped between start and end ---------- */
  const gate = $('#gate');
  const audio = $('#audio');
  const musicBtn = $('#musicBtn');
  const song = C.song || {};
  const from = Number(song.start) || 0;
  const to = Number(song.end) || Infinity;

  const setPlaying = on => {
    musicBtn.classList.toggle('is-playing', on);
    musicBtn.setAttribute('aria-pressed', String(on));
    musicBtn.setAttribute('aria-label', on ? 'Pause music' : 'Play music');
  };

  // each engine offers play(), pause() and isPlaying(); null until the song is ready
  let music = null;
  let wantPlay = false;

  if (song.file) {
    audio.src = song.file;
    audio.addEventListener('loadedmetadata', () => { audio.currentTime = from; });
    audio.addEventListener('timeupdate', () => { if (audio.currentTime >= to) audio.currentTime = from; });
    audio.addEventListener('ended', () => { audio.currentTime = from; audio.play(); });
    audio.addEventListener('canplay', () => {
      music = {
        play: () => audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false)),
        pause: () => { audio.pause(); setPlaying(false); },
        isPlaying: () => !audio.paused
      };
      musicBtn.hidden = false;
      if (wantPlay) music.play();
    }, { once: true });
    audio.addEventListener('error', () => { musicBtn.hidden = true; });
  } else if (song.youtube) {
    // YouTube's player sits out of sight; the gold button controls it
    const holder = document.createElement('div');
    holder.className = 'yt-holder';
    holder.innerHTML = '<div id="ytPlayer"></div>';
    document.body.append(holder);

    let player;
    let playing = false;
    window.onYouTubeIframeAPIReady = () => {
      player = new YT.Player('ytPlayer', {
        width: 200,
        height: 200,
        videoId: song.youtube,
        playerVars: { start: from, end: isFinite(to) ? to : undefined, controls: 0, disablekb: 1, playsinline: 1, rel: 0 },
        events: {
          onReady: () => {
            window.jubileePlayer = player;          // handy for checking the music from the console
            music = {
              play: () => player.playVideo(),
              pause: () => player.pauseVideo(),
              isPlaying: () => playing
            };
            musicBtn.hidden = false;
            if (wantPlay) music.play();
          },
          onStateChange: e => {
            if (e.data === YT.PlayerState.ENDED) {       // reached the end time: go round again
              player.seekTo(from, true);
              player.playVideo();
              return;
            }
            playing = e.data === YT.PlayerState.PLAYING;
            setPlaying(playing);
          },
          onError: () => { musicBtn.hidden = true; }
        }
      });
    };
    const api = document.createElement('script');
    api.src = 'https://www.youtube.com/iframe_api';
    document.head.append(api);
  }

  const playSong = () => {
    if (music) music.play();
    else wantPlay = true;
  };
  musicBtn.addEventListener('click', () => {
    if (!music) return;
    if (music.isPlaying()) music.pause();
    else music.play();
  });

  /* ---------- Opening gate ---------- */
  const reveal = () => {
    root.classList.remove('is-locked');
    root.classList.add('is-ready');
  };

  if (!gate || reduced || location.hash) {
    gate?.remove();
    reveal();
  } else {
    root.classList.add('is-locked');
    $('#gateSeal').addEventListener('click', () => {
      gate.classList.add('is-open');
      playSong();                       // the tap lets the browser start music
      setTimeout(reveal, 500);
      setTimeout(() => gate.classList.add('is-gone'), 1900);
    }, { once: true });
  }

  /* ---------- Map, directions, contact links ---------- */
  const query = encodeURIComponent(C.mapQuery || place);
  const mapsLink = $('#mapsLink');
  if (mapsLink) mapsLink.href = C.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${query}`;
  const mapFrame = $('#mapFrame');
  if (mapFrame && query) mapFrame.src = `https://www.google.com/maps?q=${query}&output=embed`;

  const telLink = $('#telLink');
  if (telLink && C.phone) telLink.href = `tel:${C.phone.replace(/[^\d+]/g, '')}`;
  const telLink2 = $('#telLink2');
  if (telLink2 && C.phone2) telLink2.href = `tel:${C.phone2.replace(/[^\d+]/g, '')}`;
  else $('#phone2Wrap')?.remove();
  const wa = text => `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(text)}`;
  const helpLink = $('#helpLink');
  if (helpLink && C.whatsapp) helpLink.href = wa(`Hello! I'm on my way to the ${couple} Silver Jubilee and need a little help.`);

  /* ---------- Calendar: .ics download and Google Calendar ---------- */
  const stamp = d => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
  // events are "onwards": each runs until the next one that day, at most four hours
  const endOf = i => {
    const from = new Date(allEvents[i].start);
    const next = allEvents[i + 1] ? new Date(allEvents[i + 1].start) : null;
    const sameDay = next && next.toDateString() === from.toDateString();
    return new Date(Math.min(+from + 4 * 3600e3, sameDay ? +next : Infinity));
  };

  $('#icsBtn')?.addEventListener('click', () => {
    const icsEsc = s => String(s).replace(/([,;\\])/g, '\\$1');
    const now = stamp(new Date());
    const entries = allEvents.flatMap((ev, i) => {
      const from = new Date(ev.start);
      if (isNaN(from)) return [];
      return [
        'BEGIN:VEVENT',
        `UID:${+from}-${i}@silver-jubilee`,
        `DTSTAMP:${now}`,
        `DTSTART:${stamp(from)}`,
        `DTEND:${stamp(endOf(i))}`,
        `SUMMARY:${icsEsc(`${ev.name} · ${couple} Silver Jubilee`)}`,
        `LOCATION:${icsEsc(place)}`,
        `DESCRIPTION:${icsEsc(ev.note || '')}`,
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

  const gcal = $('#gcalLink');
  if (gcal && allEvents.length) {
    const from = new Date(allEvents[0].start);
    const to = endOf(allEvents.length - 1);
    const details = allEvents.map(e => `${e.name} — ${e.time}`).join('\n');
    gcal.href = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
      + `&text=${encodeURIComponent(`${couple} · Silver Jubilee`)}`
      + `&dates=${stamp(from)}/${stamp(to)}`
      + `&details=${encodeURIComponent(details)}`
      + `&location=${encodeURIComponent(place)}`;
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
    Object.keys(cells).forEach(k => { cells[k].textContent = parts[k]; });
  };
  timer = setInterval(tick, 1000);
  tick();

  /* ---------- RSVP → WhatsApp ---------- */
  const form = $('#rsvpForm');
  const more = $('#rsvpMore');
  const checks = $('#rEvents');
  const msg = $('#rsvpMsg');

  checks.innerHTML = allEvents.map((ev, i) => `
    <label><input type="checkbox" name="ev" value="${i}" checked /><span>${esc(ev.name.split(' — ')[0])}</span></label>`).join('');

  form.addEventListener('change', e => {
    if (e.target.name === 'attend') more.hidden = e.target.value !== 'yes';
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = $('#rName').value.trim();
    if (!name) {
      msg.textContent = 'Please tell us your name.';
      $('#rName').focus();
      return;
    }
    const yes = form.attend.value === 'yes';
    const note = $('#rMsg').value.trim();
    let text;
    if (yes) {
      const chosen = $$('input[name=ev]:checked', checks).map(c => allEvents[c.value].name.split(' — ')[0]);
      const count = $('#rCount').value;
      text = `Namaste! This is ${name}. Joyfully accepting the invitation to ${couple}'s Silver Jubilee — ${count} ${count === '1' ? 'guest' : 'guests'}.`
        + (chosen.length ? `\nAttending: ${chosen.join(', ')}.` : '');
    } else {
      text = `Namaste! This is ${name}. With regret, I won't be able to attend ${couple}'s Silver Jubilee — sending all my love.`;
    }
    if (note) text += `\n\n"${note}"`;

    if (C.whatsapp) window.open(wa(text), '_blank', 'noopener');
    msg.textContent = yes ? 'Thank you! We can\'t wait to celebrate with you.' : 'Thank you for letting us know — you\'ll be missed.';
  });

  /* ---------- Navigation ---------- */
  const nav = $('#nav');
  const navToggle = $('#navToggle');
  // a marker 40px down the page: once it scrolls out of view, the bar turns solid
  // (an observer also catches the jump to a #section link on load)
  const marker = Object.assign(document.createElement('div'), { ariaHidden: 'true' });
  marker.style.cssText = 'position:absolute;top:40px;left:0;width:1px;height:1px;pointer-events:none';
  document.body.prepend(marker);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => nav.classList.toggle('is-solid', !e.isIntersecting)).observe(marker);
  } else {
    const onScroll = () => nav.classList.toggle('is-solid', scrollY > 40);
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  const setMenu = open => {
    nav.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    root.classList.toggle('is-locked', open);
  };
  navToggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  $$('#navMenu a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('resize', () => { if (innerWidth > 860) setMenu(false); });

  /* ---------- Reveal on scroll ---------- */
  const revealables = $$('.reveal');
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver(entries => {
      let order = 0;
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.style.setProperty('--stagger', `${order++ * 110}ms`);
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealables.forEach(el => io.observe(el));
  } else {
    revealables.forEach(el => el.classList.add('is-in'));
  }

  /* ---------- Journey line fills with gold as you scroll ---------- */
  const track = $('#journeyTrack');
  let queued = false;
  const fill = () => {
    queued = false;
    if (!track) return;
    const r = track.getBoundingClientRect();
    track.style.setProperty('--p', Math.min(1, Math.max(0, (innerHeight * 0.65 - r.top) / r.height)).toFixed(3));
  };
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(fill); } }, { passive: true });
  fill();

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
    frame.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
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
    root.classList.add('is-locked');
    $('#lbClose').focus();
  };
  const closeViewer = () => {
    lightbox.hidden = true;
    lbImg.src = '';
    root.classList.remove('is-locked');
    lastFocus?.focus();
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

  /* ---------- Gold & silver dust ---------- */
  (() => {
    const canvas = $('#dust');
    if (!canvas) return;
    if (reduced) { canvas.remove(); return; }
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let w = 0, h = 0, t = 0, specks = [];
    const seed = anywhere => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 10,
      r: 0.5 + Math.random() * 1.3,
      vy: 0.1 + Math.random() * 0.28,
      sway: Math.random() * Math.PI * 2,
      a: 0.15 + Math.random() * 0.4,
      silver: Math.random() < 0.3
    });
    const resize = () => {
      w = innerWidth; h = innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      specks = Array.from({ length: Math.round(Math.min(44, Math.max(16, w / 34))) }, () => seed(true));
    };
    const frame = () => {
      t += 0.01;
      ctx.clearRect(0, 0, w, h);
      specks.forEach((p, i) => {
        p.y -= p.vy;
        p.x += Math.sin(t + p.sway) * 0.25;
        if (p.y < -10) specks[i] = seed(false);
        const alpha = (p.a * (0.55 + 0.45 * Math.sin(t * 2 + p.sway))).toFixed(3);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.silver ? `rgba(228,230,234,${alpha})` : `rgba(235,211,154,${alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(frame);
    };
    resize();
    frame();
    let rt;
    addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 200); });
  })();
})();
