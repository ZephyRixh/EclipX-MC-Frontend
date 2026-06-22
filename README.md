# EclipxMC — Minecraft Server Webstore & Landing Page

Welcome to the EclipxMC webstore frontend — a polished landing page and shopping experience for the EclipxMC Minecraft server.

## Features

- **Spotlight Navigation:** Fixed navbar with dynamic spotlight glow and ambience effects that highlight the active section.
- **Cart Access:** Cart icon with live item count badge in the navbar, accessible from every page.
- **UI Sound Effects:** Subtle click sounds on all interactive elements (buttons, tabs, links) via Web Audio API.
- **Scroll Reveal Animations:** Elements fade, slide, and unblur as they scroll into view with staggered delays.
- **Immersive Hero Section:** Animated particles, flip-fade subtitle, one-click IP copy, and live player count.
- **Interactive Store Preview:** Sidebar-driven category system (Ranks, Epix Dust) with client-side routing and featured cards.
- **Shopping Cart:** Local storage cart with quantity controls, currency switcher (USD/INR), and Discord-based checkout flow.
- **Visual Polish:**
  - God rays / light rays effect on the cart page.
  - Gradient glints on product cards with color-matched top borders.
  - Glassmorphism nav and cards with reduced blur for performance.
  - Smooth scrolling between sections.
- **Custom Branding:** Bricolage Grotesque & Epic Pro fonts, server-specific assets.
- **Discord Checkout:** Local shopping cart redirects to Discord for manual ticket-based purchasing.

## Tech Stack

- **HTML5:** Semantic structure, meta tags, Open Graph.
- **CSS3:** Custom properties, Flexbox, Grid, keyframe animations, glassmorphism, scroll-driven animations.
- **Vanilla JavaScript:** Zero dependencies, IntersectionObserver, Web Audio API, History API SPA routing.
- **Vercel:** Deployment with `vercel.json` rewrites for SPA routing.

## Customization Quick Reference

### Server IP
**File:** `index.html`  
**Search for:** `ip-copy-value`

### Discord Invite
**Files:** `index.html`, `cart.html`, `assets/js/script.js`  
**Search for:** `dsc.gg/eclipxmc`

### Store Products
**File:** `index.html`  
**Search for:** `package-card` — each card uses `data-*` attributes for id, title, price, image, description, in-game perks, and instructions.

### Cart Checkout Redirect
**File:** `assets/js/script.js`  
**Search for:** `checkoutBtn` — update the Discord URL in the click handler.

### Theme Colors
**File:** `assets/css/styles.css`  
**Search for:** `:root` — adjust `--accent`, `--bg`, text colors, and border variables.

### Navbar Links
**Files:** `index.html`, `cart.html`  
**Search for:** `spotlight-nav-list` — add/remove nav items.

## Local Development

```bash
# Python 3
python -m http.server 8000

# Vercel CLI (recommended for full SPA routing)
vercel dev
```

*Note: Static servers won't handle SPA routes (`/store/ranks`). Use `vercel dev` for full routing emulation.*

## Deployment

Deploy to Vercel with `vercel.json` rewrites so that store category paths and page reloads are handled correctly:

```json
{
  "rewrites": [
    { "source": "/store/:path*", "destination": "/index.html" },
    { "source": "/policies", "destination": "/index.html" },
    { "source": "/faq", "destination": "/index.html" },
    { "source": "/store", "destination": "/index.html" }
  ]
}
```

## Notes

- The site is fully static — no backend, no database. Cart data persists in `localStorage`.
- All prices are configured via `data-product-price` attributes on package cards.
- Currency conversion (USD/INR) uses a fixed rate defined in `script.js`.
- Ensure your Discord server has a ticket system matching the checkout instructions in `cart.html`.
