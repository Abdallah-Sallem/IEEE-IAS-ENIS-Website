# IEEE IAS ENIS SBC Website

A modern React 18 + Vite web application for the IEEE Industry Applications Society — ENIS Student Branch Chapter.

> **"Open the gate to industry evolution"**

![IEEE IAS ENIS SBC](https://ias-enis.ieee.tn/assets/img/LOGO.png)

---

## 🚀 Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 8 | Build tool & dev server |
| React Router v7 | 7 | Client-side routing |
| Framer Motion | 12 | Animations & page transitions |
| react-countup | 6 | Animated number counters |
| react-icons | 5 | Icon library |
| yet-another-react-lightbox | 3 | Gallery lightbox |
| CSS Modules | — | Component-scoped styles |

---

## ⚡ Quick Start

### Prerequisites
- Node.js 18+ 
- npm 9+

### Install & Run

```bash
# Clone or navigate to the project directory
cd IAS_website_2025

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at **http://localhost:5173**

---

## 📦 npm Scripts

| Script | Command | Description |
|---|---|---|
| Dev server | `npm run dev` | Start Vite dev server with HMR |
| Build | `npm run build` | Production build to `dist/` |
| Preview | `npm run preview` | Preview production build locally |
| Lint | `npm run lint` | Run ESLint |

---

## 📁 Folder Structure

```
IAS_website_2025/
├── index.html                  # HTML entry (Google Fonts, meta tags)
├── vite.config.js              # Vite config
├── package.json
└── src/
    ├── main.jsx                # React DOM root
    ├── App.jsx                 # Router + IntroScreen + lazy routes
    ├── index.css               # Minimal reset
    │
    ├── styles/
    │   ├── variables.css       # CSS custom properties (colors, spacing, etc.)
    │   ├── global.css          # Global styles, utilities, buttons
    │   └── pages.module.css    # Shared page-level CSS module
    │
    ├── data/                   # 📝 ALL static content lives here
    │   ├── navLinks.json       # Navigation links
    │   ├── stats.json          # Counter section numbers
    │   ├── gallery.json        # Gallery image URLs
    │   ├── testimonials.json   # Previous experiences quotes
    │   ├── team.json           # Board member data
    │   ├── upcomingActivities.json  # Upcoming events
    │   └── achievements.json   # Awards & achievements
    │
    ├── hooks/
    │   ├── useDocumentTitle.js # Sets <title> + meta description per page
    │   └── useInView.js        # IntersectionObserver for scroll animations
    │
    ├── components/
    │   ├── Navbar/             # Sticky navbar with hamburger menu
    │   ├── Footer/             # 3-column footer with newsletter
    │   ├── Layout/             # Shared layout (Navbar + Outlet + Footer)
    │   ├── IntroScreen/        # Animated entry screen
    │   ├── Hero/               # Full-screen hero section
    │   ├── AboutSnippet/       # 2-column about preview
    │   ├── ActivitiesSection/  # 3-card activities preview
    │   ├── StatsSection/       # Animated counter grid
    │   ├── GallerySection/     # Photo grid with lightbox
    │   ├── Testimonials/       # Manual slider (no carousel lib)
    │   └── JoinCTA/            # IEEE membership CTA
    │
    └── pages/
        ├── Home.jsx            # All home sections composed
        ├── About.jsx           # Mission, goals, team board
        ├── Activities.jsx      # Detailed activity type cards
        ├── Media.jsx           # Full photo gallery
        ├── ENIF.jsx            # Flagship event page
        ├── UpcomingActivities.jsx  # Upcoming events list
        ├── Achievements.jsx    # Awards timeline
        └── Contact.jsx         # Contact form + map
```

---

## ✏️ How to Update Content

All static content is stored in **`src/data/`** as JSON files. No JSX changes needed for most updates.

### Update Navigation Links → `src/data/navLinks.json`
```json
{ "id": "home", "label": "Home", "path": "/" }
```

### Update Stats Numbers → `src/data/stats.json`
```json
{ "id": "members", "end": 180, "suffix": "+", "label": "IAS Members", "icon": "users" }
```

### Add Gallery Photos → `src/data/gallery.json`
```json
{ "id": 20, "src": "https://ias-enis.ieee.tn/assets/img/gallery/gallery-20.jpg", "alt": "Description" }
```

### Add Testimonials → `src/data/testimonials.json`
```json
{
  "id": 8,
  "name": "Full Name",
  "title": "Role / Position",
  "photo": "https://ias-enis.ieee.tn/assets/img/testimonials/photo.jpg",
  "quote": "Their quote here..."
}
```

### Add Team Members → `src/data/team.json`
```json
{
  "id": 6,
  "name": "Name",
  "role": "Role",
  "photo": "https://ias-enis.ieee.tn/assets/img/team/photo.png",
  "social": { "facebook": "URL", "instagram": "URL", "linkedin": "URL" }
}
```

### Add Upcoming Events → `src/data/upcomingActivities.json`
```json
{
  "id": 6,
  "title": "Event Title",
  "date": "2025-11-15",
  "time": "10:00 AM",
  "location": "ENIS, Sfax",
  "category": "Workshop",
  "description": "Event description...",
  "registrationLink": "#"
}
```

---

## 🎨 Design System

### Colors (`src/styles/variables.css`)
| Variable | Value | Usage |
|---|---|---|
| `--color-primary` | `#003087` | IEEE navy blue |
| `--color-accent` | `#FFC107` | Electric gold |
| `--color-bg` | `#0A0A0F` | Near-black background |
| `--color-text` | `#F0F0F0` | Off-white text |
| `--color-text-muted` | `#a0a0b8` | Secondary text |

### Typography
- **Headings:** Rajdhani (Google Fonts) — techy, bold
- **Body:** Inter (Google Fonts) — clean, readable

---

## 🌐 Deployment

### Netlify (Recommended)

1. **Build the project:**
   ```bash
   npm run build
   ```
2. **Drag & drop** the `dist/` folder to [netlify.com/drop](https://app.netlify.com/drop)

   **OR** connect your GitHub repo on Netlify with:
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **IMPORTANT — Add `_redirects` file** for React Router SPA routing:
   ```bash
   echo "/* /index.html 200" > dist/_redirects
   ```
   Or create `public/_redirects` with:
   ```
   /* /index.html 200
   ```

### Vercel

1. Import your GitHub repo at [vercel.com](https://vercel.com)
2. Vercel auto-detects Vite — no config needed
3. Click **Deploy**

### GitHub Pages

1. Install the gh-pages helper:
   ```bash
   npm install --save-dev gh-pages
   ```
2. Add to `package.json` scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Add `base` to `vite.config.js`:
   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/IAS_website_2025/',
   })
   ```
4. Deploy:
   ```bash
   npm run deploy
   ```

---

## 🧩 Component Responsibilities

| Component | Responsibility |
|---|---|
| `Navbar` | Sticky top nav, scroll shadow, active link, hamburger menu |
| `Footer` | 3-column layout, newsletter form, social links, copyright |
| `Layout` | Wraps all pages with Navbar + animated `<Outlet>` + Footer |
| `IntroScreen` | First-visit animated entry screen with progress bar |
| `Hero` | Full-screen tagline section with particle background |
| `AboutSnippet` | Two-column about preview with logo image |
| `ActivitiesSection` | 3 hover-effect activity type cards |
| `StatsSection` | 6-cell animated counter grid (react-countup) |
| `GallerySection` | Responsive grid with lightbox (yet-another-react-lightbox) |
| `Testimonials` | Manual prev/next slider using AnimatePresence |
| `JoinCTA` | IEEE membership call-to-action section |

---

## 📝 License

© IEEE IAS ENIS SBC. All rights reserved.
