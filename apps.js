/* Meine Apps – zentrale Liste und App-Umschalter für alle Tools.
 *
 * Einbinden in jeder App (eine Zeile im <head>):
 *   <script src="https://tools-hub-topaz-zeta.vercel.app/apps.js" defer></script>
 * und dort, wo der Button erscheinen soll (oben links in der Kopfzeile):
 *   <app-switcher></app-switcher>
 *
 * Neue App: unten in APPS ergänzen – sie erscheint dann automatisch in der Übersicht
 * und im Umschalter aller Apps. Ist diese Datei einmal nicht erreichbar, bleibt der
 * Platzhalter einfach leer; die App funktioniert normal weiter.
 */
(() => {
  const HUB = "https://tools-hub-topaz-zeta.vercel.app";
  const tile = (bg, inner) => `<svg viewBox="0 0 100 100" aria-hidden="true"><rect width="100" height="100" rx="28" fill="${bg}"/>${inner}</svg>`;
  const emoji = (e, bg = "#dbfb5f") => tile(bg, `<text x="50" y="67" font-size="50" text-anchor="middle">${e}</text>`);

  const APPS = [
    { id: "family-os", url: "https://family-os-kappa-eight.vercel.app", isNew: true, icon: emoji("🏡"),
      name: { de: "Family OS", en: "Family OS" }, cat: { de: "Familie", en: "Family" },
      text: { de: "Unser Familien-Betriebssystem: Kinder & Entwicklung, Woche, Haushalt, Team & Rituale, Papierkram, Gesundheit, Ziele und die Familienkasse als Finanzen.",
              en: "Our family operating system: kids & development, week, home, team & rituals, paperwork, health, goals and the Familienkasse for money." } },
    { id: "familienkasse", url: "https://familienkasse-nine.vercel.app", isNew: true, icon: emoji("🪙"),
      name: { de: "Familienkasse", en: "Familienkasse" }, cat: { de: "Finanzen", en: "Finance" },
      text: { de: "Unsere Familienfinanzen auf einen Blick: Rückblick, Planung, Fixkosten, Potenziale und Vermögen. Gemeinsam planen, Erfolge sehen.",
              en: "Our family finances at a glance: review, planning, fixed costs, potentials and wealth. Plan together, see the wins." } },
    { id: "fitness", url: "https://fitness-coach-nu-six.vercel.app", isNew: true,
      icon: tile("#0e0e10", '<g fill="none" stroke="#dbfb5f" stroke-width="7" stroke-linecap="round"><path d="M29 50h42M23 38v24M77 38v24M16 44v12M84 44v12"/></g>'),
      name: { de: "Fitness", en: "Fitness" }, cat: { de: "Gesundheit", en: "Health" },
      text: { de: "Mein Training in 15 Minuten: Plan in Blöcken, Sätze loggen, Fortschritt mit Stufenleitern, Läufe und Padel. Mit Anbindung an meinen Fitness Coach.",
              en: "My training in 15 minutes: block-based plan, set logging, progress ladders, runs and padel. Connected to my fitness coach." } },
    { id: "careerpilot", url: "https://web-orpin-zeta-52.vercel.app", isNew: true,
      icon: tile("#dbfb5f", '<path d="M66 32 A 24 24 0 1 0 66 68" fill="none" stroke="#0e0e10" stroke-width="10" stroke-linecap="round"/><path d="M70 41 L73 49 L81 52 L73 55 L70 63 L67 55 L59 52 L67 49 Z" fill="#0e0e10"/>'),
      name: { de: "CareerPilot", en: "CareerPilot" }, cat: { de: "Karriere", en: "Career" },
      text: { de: "Mein Bewerbungs-Cockpit mit Karrierecoach: Stellen werden dreimal täglich gesucht und nach Rolle und Firma bewertet, Anschreiben entstehen im Chat.",
              en: "My job-search cockpit with a career coach: roles are searched three times a day and rated by role and company fit, cover letters are written in chat." } },
    { id: "grevo", url: "https://project-1a4uz.vercel.app",
      icon: tile("#dbfb5f", '<text x="50" y="70" font-size="60" text-anchor="middle" font-family="Arial" font-weight="800" fill="#0e0e10">G</text>'),
      name: { de: "Grevo", en: "Grevo" }, cat: { de: "Produktivität", en: "Productivity" },
      text: { de: "Erfolge, Ziele und Kudos festhalten. Mit Jahresrückblick fürs Mitarbeitergespräch.", en: "Capture wins, goals and kudos. With a yearly review for your performance talk." } },
  ];
  window.ToolsHub = { HUB, APPS };

  if (!window.customElements || customElements.get("app-switcher")) return;

  const lang = () => ((document.documentElement.lang || "de").startsWith("en") ? "en" : "de");
  const T = { de: { title: "Meine Apps", open: "Apps wechseln", here: "Hier", all: "Alle Tools ansehen" },
              en: { title: "My apps", open: "Switch apps", here: "Here", all: "See all tools" } };
  const originOf = u => { try { return new URL(u).origin; } catch { return ""; } };

  const CSS = `
:host { display: inline-flex; flex: none; --fg: #0e0e10; --muted: #5f5b60; --line: #dcd8db; --surface: #fafafa; --surface-2: #efedee; --lime: #dbfb5f; }
@media (prefers-color-scheme: dark) { :host { --fg: #f4f3f4; --muted: #a8a4a9; --line: #343136; --surface: #1d1c1f; --surface-2: #2a282c; } }
:host-context([data-theme="light"]) { --fg: #0e0e10; --muted: #5f5b60; --line: #dcd8db; --surface: #fafafa; --surface-2: #efedee; }
* { box-sizing: border-box; }
.trigger { width: 40px; height: 40px; border-radius: 14px; border: 1.5px solid var(--line); background: transparent; color: var(--fg); display: grid; place-items: center; cursor: pointer; padding: 0; -webkit-tap-highlight-color: transparent; }
.trigger:hover, .trigger[aria-expanded="true"] { background: var(--surface-2); }
.trigger:focus-visible, a:focus-visible { outline: 2.5px solid #e2559f; outline-offset: 2px; }
.trigger svg { width: 18px; height: 18px; }
.panel { position: fixed; z-index: 2147483000; width: min(320px, calc(100vw - 24px)); background: var(--surface); color: var(--fg); border: 1px solid var(--line); border-radius: 24px;
  box-shadow: 0 18px 50px rgba(0,0,0,.18), 0 2px 8px rgba(0,0,0,.06); padding: 10px; font-family: inherit; transform-origin: top left; animation: pop .16s ease-out; }
.panel[hidden] { display: none; }
@keyframes pop { from { opacity: 0; transform: scale(.96) translateY(-4px); } }
@media (prefers-reduced-motion: reduce) { .panel { animation: none; } }
.head { font: 600 .7rem/1 inherit; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); padding: 8px 10px 10px; }
a.app { display: flex; align-items: center; gap: 12px; padding: 8px 10px; border-radius: 16px; color: inherit; text-decoration: none; }
a.app:hover { background: var(--surface-2); }
a.app[aria-current="page"] { background: var(--surface-2); }
.ic { width: 40px; height: 40px; flex: none; border-radius: 12px; overflow: hidden; display: block; }
.ic svg { width: 100%; height: 100%; display: block; }
.tx { display: flex; flex-direction: column; min-width: 0; line-height: 1.25; }
.tx b { font-weight: 700; font-size: .98rem; }
.tx span { font-size: .78rem; color: var(--muted); }
.here { margin-left: auto; font-size: .68rem; font-weight: 700; background: var(--lime); color: #0e0e10; border-radius: 999px; padding: 3px 8px; }
.foot { display: block; margin: 6px 4px 2px; padding: 10px; border-top: 1px solid var(--line); color: var(--muted); font-size: .82rem; font-weight: 600; text-decoration: none; text-align: center; border-radius: 0 0 14px 14px; }
.foot:hover { color: var(--fg); }`;

  class AppSwitcher extends HTMLElement {
    connectedCallback() {
      if (!this.shadowRoot) this.build();
      document.addEventListener("click", this._outside, true);
      document.addEventListener("keydown", this._key);
      addEventListener("resize", this._close);
    }
    build() {
      const root = this.attachShadow({ mode: "open" });
      const l = lang(), t = T[l], here = location.origin;
      root.innerHTML = `<style>${CSS}</style>
        <button class="trigger" type="button" aria-haspopup="dialog" aria-expanded="false" aria-label="${t.open}" title="${t.open}">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${[5, 12, 19].map(y => [5, 12, 19].map(x => `<circle cx="${x}" cy="${y}" r="2.2"/>`).join("")).join("")}</svg></button>
        <div class="panel" role="dialog" aria-label="${t.title}" hidden>
          <div class="head">${t.title}</div>
          ${APPS.map(a => { const cur = originOf(a.url) === here;
            return `<a class="app" href="${a.url}" ${cur ? 'aria-current="page"' : ""}><span class="ic">${a.icon}</span><span class="tx"><b>${a.name[l]}</b><span>${a.cat[l]}</span></span>${cur ? `<span class="here">${t.here}</span>` : ""}</a>`; }).join("")}
          <a class="foot" href="${HUB}">${t.all} →</a></div>`;
      const btn = root.querySelector(".trigger"), panel = root.querySelector(".panel");
      const close = () => { panel.hidden = true; btn.setAttribute("aria-expanded", "false"); };
      const open = () => {
        const r = btn.getBoundingClientRect();
        panel.style.top = `${Math.round(r.bottom + 8)}px`;
        panel.style.left = `${Math.round(Math.max(12, Math.min(r.left, innerWidth - Math.min(320, innerWidth - 24) - 12)))}px`;
        panel.hidden = false; btn.setAttribute("aria-expanded", "true");
        (panel.querySelector('a.app:not([aria-current])') || panel.querySelector("a"))?.focus({ preventScroll: true });
      };
      btn.addEventListener("click", e => { e.stopPropagation(); panel.hidden ? open() : close(); });
      root.querySelectorAll("a.app[aria-current]").forEach(a => a.addEventListener("click", e => { e.preventDefault(); close(); }));
      this._outside = e => { if (!panel.hidden && !e.composedPath().includes(this)) close(); };
      this._key = e => { if (e.key === "Escape" && !panel.hidden) { close(); btn.focus(); } };
      this._close = close;
    }
    disconnectedCallback() {
      document.removeEventListener("click", this._outside, true);
      document.removeEventListener("keydown", this._key);
      removeEventListener("resize", this._close);
    }
  }
  customElements.define("app-switcher", AppSwitcher);
})();
