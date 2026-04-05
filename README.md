# ☕ Season Space & Coffee — Landing Page

A modern, responsive lifestyle café landing page for the **Season Space & Coffee** brand. Designed to feel warm, cozy, and social — not corporate, not minimal.

---

## ✅ Completed Features

### Layout Sections
- **Navbar** — Sticky, transparent at top → solid dark on scroll, with hamburger mobile menu
- **Hero** — Full-screen dark hero with animated headline, CTAs, and stats
- **About** — Brand story, features pills, floating badge
- **Signature Menu** — 6-card grid with image, name, description, and price
- **Full Menu** — Categorized tab menu (Signature Drinks, Coffee, Non-Coffee, Food)
- **Experience** — 3 feature cards + image gallery strip
- **CTA Section** — Orange call-to-action banner
- **Footer** — Dark footer with logo, links, hours, address, social media

### Interactions & Animations
- ✅ Navbar scroll behavior (transparent → dark + blur)
- ✅ Scroll-spy active link highlighting
- ✅ Hero text fade-in sequence (staggered)
- ✅ Scroll reveal (fade + translateY) via Intersection Observer
- ✅ Stagger animation for menu cards
- ✅ Card hover lift + image zoom
- ✅ Button scale + shadow on hover/tap
- ✅ Mobile hamburger menu with X animation
- ✅ Menu category tabs with panel transitions
- ✅ Back-to-top button (appears after 400px scroll)
- ✅ Scroll indicator animation in hero

---

## 📁 File Structure

```
/
├── index.html          ← Main landing page
├── css/
│   └── styles.css      ← All custom styles (navbar, cards, animations, etc.)
├── js/
│   └── script.js       ← All interactions (scroll, tabs, reveal, spy)
└── README.md
```

---

## 🎨 Color System

| Role        | Value     |
|-------------|-----------|
| Orange      | `#f84904` |
| Black       | `#0f0f0f` |
| Beige       | `#f5ede7` |
| Dark Gray   | `#2a2a2a` |
| Light Gray  | `#e5e5e5` |
| Muted Green | `#6b8f71` |
| Coffee Brown| `#8b5e3c` |

---

## 🧭 Page Anchors / URIs

| Anchor        | Section              |
|---------------|----------------------|
| `#home`       | Hero section         |
| `#about`      | About / brand story  |
| `#menu`       | Signature menu cards |
| `#full-menu`  | Full categorized menu|
| `#experience` | Experience section   |
| `#contact`    | Footer / contact     |

---

## 📋 Full Menu Data

**Signature Drinks** — Almond Cloud, Mother of Nature, Sweet Summer, Autumn of Sakura, Sourberry, Sunburst, Mystic Forest  
**Coffee** — Americano, Cappuccino, Caffe Latte, Flat White, Mocca Cino, Vanilla Latte, Espresso, Spanish Latte  
**Non-Coffee** — Choco Latte, Matcha Latte, Charcoal Latte, Red Velvet Latte  
**Food** — Nasi Goreng Season, Ayam Sambal Matah, Beef Steak, Fish and Chips, Chicken Katsudon  

---

## 🛠 Tech Stack

- **HTML5** — Semantic markup
- **Tailwind CSS** (CDN) — Utility-first styling
- **Custom CSS** — Animations, navbar behavior, card components
- **Vanilla JavaScript** — All interactions, no heavy libraries
- **Google Fonts** — Poppins
- **Font Awesome 6** — Icons

---

## 🔧 Recommended Next Steps

1. **Replace placeholder images** — Swap `<img src="...">` tags with real brand photography
2. **Update address & contact** — Real location in footer
3. **Connect Google Maps** — Update the "Get Directions" link
4. **Add online ordering** — Integrate WhatsApp order link or third-party delivery
5. **Add Instagram feed** — Embed real social content in Experience section
6. **Meeting room booking form** — Simple contact/booking form
7. **Migrate Tailwind to PostCSS** — For production performance (remove CDN)
8. **SEO** — Add Open Graph meta tags, structured data, sitemap

---

## 📌 Not Yet Implemented

- [ ] Online order / cart functionality
- [ ] Real image assets (using search-found images currently)
- [ ] Contact / booking form backend
- [ ] Blog or news section
- [ ] Loyalty / rewards program page
- [ ] Multi-language support (ID / EN)
