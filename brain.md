# EclipX MC — Project Knowledge Base

## Overview
- **Type:** Static frontend website for a Minecraft server webstore + landing page
- **Deployment:** Vercel (SPA routing via `vercel.json`)
- **No backend, no database, no build tools** — pure HTML/CSS/JS

## Stack
- Vanilla JS, CSS, HTML (no frameworks)
- **CDN deps:** Tabler Icons v3.2.0, Font Awesome v6.5.1, Google Fonts (Bricolage Grotesque, Poppins)
- **External API:** `api.mcsrvstat.us/2/play.eclipxmc.fun` (live player count)

## Pages
| File | Route | Purpose |
|---|---|---|
| `index.html` | `/`, `/policies`, `/faq`, `/vote` | Landing page, policies, FAQ, vote |
| `store.html` | `/store`, `/store/*` | Product catalog (ranks, Epix Dust, previews) |
| `cart.html` | `/cart` | Shopping cart |

## Key Features
- **SPA routing** via History API (`Router` object in script.js)
- **Cart** — localStorage with versioning (`CART_VERSION = 2`), key `store_cart`
- **Currency** — USD/INR toggle (1 USD = 95 INR fixed), persists in localStorage
- **Product modal** — image, title, price, description, in-game info, how-to-buy
- **Categories** — Ranks (6), Epix Dust (5), Previews (0 products)
- **Featured packages** — "Oblivion" (Best Seller), "Epix Dust Bundles" (Trending)
- **Spotlight navbar** — mouse-following glow indicator with spring physics
- **Mobile sidebar** — accordion store submenu
- **Hero** — flip-fade subtitles, floating particles, click-to-copy IP, live player count
- **FAQ accordion** — 6 items (Java, Bedrock, free-to-play, voting, purchasing, payments)
- **Skeleton loader** — 800ms minimum shimmer display
- **Maintenance overlay** — always shown (no hide mechanism yet)
- **UI sound effects** — Web Audio API click tones
- **Checkout** — redirects to Discord (`dsc.gg/eclipxmc`), manual ticket-based
- **Vote links** — 5 placeholders (`href="#"`)
- **Server IP:** `play.eclipxmc.fun`, **Bedrock port:** `19139`

## Products (hardcoded USD, displayed INR)
| Name | Category | INR Price |
|---|---|---|
| Prime | Ranks | Rs. 149 |
| Omega | Ranks | Rs. 299 |
| GlitchX | Ranks | Rs. 449 |
| Nexus | Ranks | Rs. 599 |
| Oblivion | Ranks | Rs. 699 |
| EcliptiX | Ranks | Rs. 799 |
| 89 Epix Dust | Epix Dust | Rs. 49 |
| 189 Epix Dust | Epix Dust | Rs. 99 |
| 389 Epix Dust | Epix Dust | Rs. 199 |
| 799 Epix Dust | Epix Dust | Rs. 399 |
| 1699+279 Bonus Epix Dust | Epix Dust | Rs. 799 |

## File Map
```
/
  index.html              # Homepage (387 lines)
  store.html              # Store (411 lines)
  cart.html               # Cart (303 lines)
  vercel.json             # Vercel config + SPA rewrites
  run-preview.bat         # python -m http.server 8000
  README.md               # Docs
  assets/
    css/styles.css        # 4149 lines — all styling
    js/script.js          # 1034 lines — all JS
    fonts/                # Epic Pro (display), Minecraft (decorative)
    images/               # backgrounds, logo, icons, rank images
```

## Init Order (DOMContentLoaded)
1. `initFAQAccordion()` — keyboard-accessible FAQ toggle
2. `initHeroParticles()` — floating particles (3 mobile / 10 desktop)
3. `initIPCopy()` — click-to-copy `play.eclipxmc.fun`
4. `initFlipFade()` — rotating subtitle animation (5s interval)
5. `initPreloader()` — skeleton → fades → `Router.init()`
6. Cart system init, featured cards, back-to-top, currency switcher, player count, mobile sidebar, price updates

## Key JS Objects
- **`Router`** — SPA router, routes: `/`, `/store`, `/store/ranks`, `/store/epix-dust`, `/store/previews`, `/vote`, `/faq`, `/policies`
- **Cart functions** — `getCart()`, `saveCart()`, `addToCart()`, `removeCartItem()`, `renderCartPage()`
- **`escapeHTML()`** — XSS prevention
- **`formatCurrency()`** — dual-currency formatting
- **`switchStoreTab()`** — category switching with stagger animation

## Notes
- No tests exist anywhere
- `.gitignore` mentions `server/` dir but none exists in working tree
- Per-rank color themes via CSS (Prime=purple, Omega=orange, GlitchX=cyan, Nexus=multi, Oblivion=deep purple, EcliptiX=dark rainbow)
- `prefers-reduced-motion` supported
- Touch device hover suppression via `matchMedia('(hover: hover)')`
- `pageshow` event forces reload on bfcache restore
