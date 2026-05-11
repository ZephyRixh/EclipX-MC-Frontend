# Minecraft Server Webstore/Website [Frontend]

Welcome to the web repository for this modern store frontend. This project is a polished landing page and shopping experience designed for Minecraft servers.

## :rocket: Features

- **Spotlight Navigation:** A custom-engineered navbar with dynamic lighting effects that follow the mouse and highlight active sections.
- **Immersive Hero Section:** Featuring animated particles, ghost text layers, and a one-click "Copy IP" system.
- **Interactive Store Preview:** A responsive sidebar-driven category system (Ranks, Coins, etc.) with staggered fade-in animations.
- **Visual Polish:**
  - **Scroll Reveal:** Smooth intersection-based reveal animations as you scroll.
  - **3D Card Tilt:** Subtle mouse-tracking tilt and glow effects on store packages and cards.
  - **Smooth Scrolling:** Seamless navigation between sections.
- **Custom Branding:** Integrated custom fonts (Ethnocentric & Epic Pro) and server-specific assets.
- **Discord Checkout:** Customers are redirected to your Discord server to complete purchases via ticket system.

## :wrench: Tech Stack

- **HTML5:** Semantic structure.
- **CSS3:** Custom properties (variables), Flexbox, Grid, and advanced animations.
- **Vanilla JavaScript:** Zero dependencies, modular initialization, and high-performance DOM manipulation.

## :memo: Configuration / Customization Guide

This guide tells you exactly what to change and where to customize the website for your own Minecraft server.

### 1. Server IP Address

**File:** `index.html`
**Search for:** `ip-copy-value`
**Example line (line 91):**
```html
<span class="ip-copy-value">server.example.com</span>
```
**Change:** `server.example.com` to your actual server IP address.

---

### 2. Discord Server Link

Used in multiple places (Hero, Store, Footer, Checkout redirect).

**Files:** `index.html`, `cart.html`
**Search for:** `discord.gg/`
**Action:** Replace the invite code `pvc3CJpKaY` with your own Discord invite code.

| Location | Line(s) | Current Value |
|----------|---------|----------------|
| Hero (Join Discord button) | `index.html` line 86 | `discord.gg/pvc3CJpKaY` |
| Welcome section | `index.html` line 578 | `discord.gg/pvc3CJpKaY` |
| Footer | `index.html` line 600, 603 | `discord.gg/pvc3CJpKaY` |
| Checkout redirect | `cart.html` line 138, 141 | `discord.gg/pvc3CJpKaY` |

---

### 3. Server Name / Branding

**File:** `index.html`
**Search for:** `ServerName` or your current server name
**Action:** Update your server name throughout the site.

---

### 4. Store Categories & Packages

**File:** `index.html`
**Search for:** `store-category` or `package-card`

- Store categories are defined in the sidebar (lines around 140-180)
- Each category has `data-category` and `data-category-path` attributes
- Package cards in each category section have `data-product-id`, `data-product-title`, `data-product-price`, etc.

**To add/edit products:**
1. Find the category section (e.g., `<div id="ranks" class="tab-content">`)
2. Add or modify package cards with updated prices and titles
3. Update the category count/total in the sidebar if needed

---

### 5. Checkout Process (Discord Ticket System)

**File:** `cart.html` (Order Summary section)
**Search for:** `checkout-info` or `How it works`

The checkout button already redirects to your Discord server. To customize the instructions:
- Edit the `<div class="checkout-info">` section in `cart.html`
- Update the category name if your Discord has a different category for tickets

**Default flow:**
1. User clicks "Proceed to Checkout"
2. User is redirected to your Discord server
3. User creates a ticket in the Store category
4. Staff assists with payment

---

### 6. Footer Information

**File:** `index.html`
**Search for:** `footer-content`

- Update server name in footer-left
- Update copyright year
- Update social links if needed
- Update business contact email if different

---

### 7. Images & Assets

**Folder:** `assets/images/`

| Image | Purpose |
|-------|--------|
| `favicon.png` / `favicon_io/` | Site favicon |
| `hero/` | Hero section background images |
| `store/` | Product/package images |

**Tips:**
- Keep images optimized (use WebP for better performance)
- Ensure product images have transparent backgrounds where applicable

---

### 8. Theme Colors (Advanced)

**File:** `assets/css/styles.css`
**Search for:** `:root` (around line 20-40)

```css
:root {
  --primary: #your-primary-color;
  --accent: #your-accent-color;
  --background: #your-bg-color;
  /* ... other variables */
}
```

**Caution:** The site uses a carefully designed dark theme. Changing colors extensively may affect the visual design. It's recommended to keep the dark aesthetic.

---

## :computer: Local Development

### Prerequisites
A modern web browser (Chrome, Firefox, Edge, Safari).

### Run Locally

**Option 1:** Double-click `run-preview.bat` (Windows)

**Option 2:** Open `index.html` directly in your browser, OR use a local server:

```bash
# Python 3
python -m http.server 8000

# Or using npx (if Node.js installed)
npx serve
```

Then visit `http://localhost:8000`

---

## :warning: Important Notes for Public Deployment

1. **Remove sensitive data:** This repo is for frontend only. Do NOT include backend configurations or payment processing logic.
2. **Discord category name:** Ensure your Discord server has a ticket category that users can create tickets in. Update the instructions in `cart.html` if using a different category name.
3. **Terms & Policies:** Update the Policies section in `index.html` with your actual refund/terms policies.

---

## Support

**Contact** - businesszephy07@gmail.com