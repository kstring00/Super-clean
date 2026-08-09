// Renders the whole page from content.json + styles.css.
// Nothing business-specific belongs in this file — put it in content.json.

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const attr = (s) => esc(s);

function head(c, css) {
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow, noarchive">
<title>${esc(c.business.name)} — ${esc(c.business.city)}, TX</title>
<meta name="description" content="Concept website for ${esc(c.business.name)} in ${esc(c.business.city)}, TX. Self-service laundry and wash &amp; fold, open daily until 11 PM.">
<meta name="theme-color" content="#e8f0ff">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

<style>
${css}
</style>`;
}

function header(c) {
  return `<header>
  <div class="wrap nav">
    <a class="logo" href="#top">SUPER <span>CLEAN</span></a>
    <nav class="links">
      <a href="#services">Services</a>
      <a href="#photos">Gallery</a>
      <a href="#reviews">Reviews</a>
      <a href="#visit">Visit</a>
    </nav>
    <a class="nav-btn" href="${attr(c.business.phoneHref)}">Call now</a>
  </div>
</header>`;
}

function hero(c) {
  const h = c.hero;
  return `<section class="hero">
  <div class="wrap">
    <div class="hero-fullbleed">
      <img class="hero-fullbleed__image" src="${attr(h.image)}" alt="${attr(h.imageAlt)}">

      <div class="hero-fullbleed__content">
        <div class="kicker hero-fullbleed__status">
          <span class="dot"></span>
          <span id="heroStatus">${esc(h.statusFallback)}</span>
        </div>

        <div class="hero-fullbleed__eyebrow">${esc(h.eyebrow)}</div>

        <h1 class="hero-fullbleed__title">${h.titleHtml}</h1>

        <p class="hero-fullbleed__body">${esc(h.body)}</p>

        <div class="hero-actions hero-fullbleed__actions">
          <a class="btn btn-blue" href="${attr(c.business.directionsUrl)}" target="_blank" rel="noopener">Get directions</a>
          <a class="btn btn-white" href="${attr(c.business.phoneHref)}">Call ${esc(c.business.phoneDisplay)}</a>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

function ticker(c) {
  // The visible track is duplicated so the CSS loop can translate -50% seamlessly.
  const group = [...c.ticker, ...c.ticker]
    .map((t) => `<span>${esc(t)}</span><span>•</span>`)
    .join("");
  return `<div class="marquee" aria-label="Services and amenities">
  <div class="marquee-track">
    <div class="marquee-group">${group}</div>
    <div class="marquee-group" aria-hidden="true">${group}</div>
  </div>
</div>`;
}

function serviceCard(c, card) {
  const href =
    card.ctaType === "phone" ? c.business.phoneHref : c.business.directionsUrl;
  const target =
    card.ctaType === "phone" ? "" : ' target="_blank" rel="noopener"';
  return `      <article class="service-card ${attr(card.tone)}">
        <div class="mini">${esc(card.mini)}</div>
        <h3>${esc(card.heading)}</h3>
        <p>${esc(card.body)}</p>
        <div class="accent"></div>
        <a class="btn" href="${attr(href)}"${target}>${esc(card.ctaLabel)}</a>
      </article>`;
}

function services(c) {
  return `<section class="section" id="services">
  <div class="wrap">
    <div class="section-title">
      <h2>${esc(c.services.heading)}</h2>
      <p>${esc(c.services.intro)}</p>
    </div>

    <div class="services">
${c.services.cards.map((card) => serviceCard(c, card)).join("\n\n")}
    </div>
  </div>
</section>`;
}

function visit(c) {
  const b = c.business;
  return `<section class="section visit-priority" id="visit">
  <div class="wrap">
    <div class="section-title">
      <h2>${esc(c.visit.heading)}</h2>
      <p>${esc(c.visit.intro)}</p>
    </div>

    <div class="info-grid">
      <div class="hours">
        <h3 style="font-size:32px">${esc(c.visit.hoursHeading)}</h3>
        <p style="color:var(--muted)">${esc(b.addressLine1)}<br>${esc(b.addressLine2)}<br><a href="${attr(b.phoneHref)}">${esc(b.phoneDisplay)}</a></p>
        <div class="hours-list" id="hoursList"></div>
      </div>
      <div class="map-card">
        <iframe title="Map to ${attr(b.name)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="${attr(b.mapEmbedUrl)}"></iframe>
      </div>
    </div>
  </div>
</section>`;
}

function gallery(c) {
  const g = c.gallery;
  const areas = ["stack-top", "stack-left", "stack-right"];
  return `<section class="section" id="photos">
  <div class="wrap">
    <div class="section-title">
      <h2>${esc(g.heading)}</h2>
      <p>${esc(g.intro)}</p>
    </div>

    <div class="photos">
      <div class="photo-main">
        <img src="${attr(g.main.image)}" alt="${attr(g.main.alt)}">
        <span class="photo-label">${esc(g.main.label)}</span>
      </div>
      <div class="photo-stack">
${g.stack
  .map(
    (p, i) => `        <div class="${areas[i]}">
          <img src="${attr(p.image)}" alt="${attr(p.alt)}" loading="lazy">
          <span class="photo-label">${esc(p.label)}</span>
        </div>`
  )
  .join("\n")}
      </div>
    </div>
  </div>
</section>`;
}

function reviewCard(quote) {
  return `        <article class="review-card">
          <div class="mini-stars">★★★★★</div>
          <p>${esc(quote)}</p>
          <span>Review highlight</span>
        </article>`;
}

function reviews(c) {
  const r = c.reviews;
  return `<section class="section" id="reviews">
  <div class="wrap">
    <div class="review-panel">
      <div>
        <div class="score">${esc(r.score)}</div>
        <div class="stars">★★★★★</div>
        <div class="review-note">${esc(r.count)}</div>
      </div>
      <div class="review-copy">
        <h2>${esc(r.heading)}</h2>
        <p>${esc(r.intro)}</p>
        <a class="btn btn-dark" href="${attr(r.ctaUrl)}" target="_blank" rel="noopener">${esc(r.ctaLabel)}</a>
      </div>

      <div class="review-grid">
${r.quotes.map((q) => reviewCard(q)).join("\n")}
      </div>
      <p class="review-source">${esc(r.disclaimer)}</p>
    </div>
  </div>
</section>`;
}

function cta(c) {
  return `<section class="section" style="padding-top:0">
  <div class="wrap">
    <div class="cta">
      <h2>${esc(c.cta.heading)}</h2>
      <div class="cta-actions">
        <a class="btn btn-blue" href="${attr(c.business.directionsUrl)}" target="_blank" rel="noopener">Get directions</a>
        <a class="btn btn-dark" href="${attr(c.business.phoneHref)}">Call now</a>
      </div>
    </div>
  </div>
</section>`;
}

function footer(c) {
  const b = c.business;
  return `<footer>
  <div class="wrap foot">
    <div>
      <div class="logo">SUPER <span>CLEAN</span></div>
      <p style="margin-top:12px;color:rgba(235,241,255,.80)">${esc(c.footer.tagline)}</p>
    </div>
    <div>
      <strong>Visit</strong>
      <p>${esc(b.addressLine1)}<br>${esc(b.addressLine2)}</p>
      <a href="${attr(b.phoneHref)}">${esc(b.phoneDisplay)}</a>
    </div>
    <div>
      <strong>Quick links</strong>
      <a href="#services">Services</a>
      <a href="#reviews">Reviews</a>
      <a href="#visit">Hours &amp; directions</a>
    </div>
  </div>
</footer>`;
}

function mobileBar(c) {
  return `<nav class="mobile" aria-label="Quick actions">
  <a href="${attr(c.business.directionsUrl)}" target="_blank" rel="noopener">Directions</a>
  <a href="${attr(c.business.phoneHref)}">Call</a>
</nav>`;
}

function script(c) {
  const hours = c.hours.days.map((d) => ({ open: d.open, close: d.close }));
  const days = c.hours.days.map((d) => d.day);
  return `<script>
const HOURS=${JSON.stringify(hours)};
const DAYS=${JSON.stringify(days)};

function fmt(h){
  const mer=h>=12?"PM":"AM";
  return \`\${h%12||12}:00 \${mer}\`;
}

function update(){
  const now=new Date(),d=now.getDay(),t=now.getHours()+now.getMinutes()/60,span=HOURS[d];
  let text;
  if(t<span.open) text=\`Closed · opens \${fmt(span.open)}\`;
  else if(t<span.close) text=\`Open now · until \${fmt(span.close)}\`;
  else {
    const nd=(d+1)%7;
    text=\`Closed · opens \${fmt(HOURS[nd].open)} \${DAYS[nd]}\`;
  }
  document.getElementById("heroStatus").textContent=text;

  document.getElementById("hoursList").innerHTML=HOURS.map((s,i)=>\`
    <div class="hr-row \${i===d?"today":""}">
      <span>\${DAYS[i]}\${i===d?" · Today":""}</span>
      <strong>\${fmt(s.open)} – \${fmt(s.close)}</strong>
    </div>
  \`).join("");
}
update();
setInterval(update,60000);
<\/script>`;
}

export function renderPage(content, css) {
  const c = content;
  return `<!DOCTYPE html>
<html lang="en">
<head>
${head(c, css)}
</head>
<body>

<div class="demo">Concept redesign — not affiliated with ${esc(c.business.name)}</div>

${header(c)}

<main id="top">

${hero(c)}

${ticker(c)}

${services(c)}

${visit(c)}

${gallery(c)}

${reviews(c)}

${cta(c)}

</main>

${footer(c)}

${mobileBar(c)}

${script(c)}

</body>
</html>
`;
}
