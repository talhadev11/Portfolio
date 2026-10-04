# Senior Full Stack & Mobile Engineer Portfolio

A fully professional, responsive personal portfolio website built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**. Designed for a Senior Full Stack Web & Mobile Application Developer with 5–7 years of experience.

![Portfolio Preview Banner](https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop)

---

## ⚡ Tech Stack & Architecture

- **Framework**: [React 18](https://react.dev/) with [Vite](https://vitejs.dev/) for lightning-fast HMR and bundle speeds.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom glassmorphism tokens, dark-mode-first styling, and responsive layout breakpoints.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for scroll-reveal animations, animated tab indicator, rotating role ticker, and layout re-ordering.
- **Icons**: [Lucide React](https://lucide.dev/) for clean, lightweight, retina-ready tech icons.
- **Typography**: Google Fonts — [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) for display headings and [Inter](https://fonts.google.com/specimen/Inter) for body copy.
- **Forms**: Fully validated contact form with real-time feedback states (idle, submitting, success, error) and plug-and-play Formspree/EmailJS support.

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js** 18.0 or higher
- **npm** (or `pnpm` / `yarn`)

### Installation & Run

1. Clone or navigate to the project directory:
   ```bash
   cd c:/Users/G3NZ/Downloads/Portfolio
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000` (or the port Vite outputs).

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview the production build:
   ```bash
   npm run preview
   ```

---

## 📂 Project Architecture

All portfolio data (skills, projects, career history, education, bio) is separated into modular files under `/src/data/`, making it effortless to customize without touching UI code:

```text
Portfolio/
├── index.html                  # HTML5 boilerplate, Google Fonts, Open Graph SEO tags
├── tailwind.config.js          # Color tokens, glassmorphism, keyframes, typography
├── vite.config.js              # Vite bundler configuration
├── package.json                # Dependencies & scripts
└── src/
    ├── main.jsx                # React root mount & ThemeProvider wrapping
    ├── App.jsx                 # Main layout assembling all sections
    ├── index.css               # Tailwind directives, custom sleek scrollbar, glass tokens
    ├── context/
    │   └── ThemeContext.jsx    # Dark/Light mode state with localStorage persistence
    ├── data/
    │   ├── profile.js          # Personal name, tagline, stats, bio, socials, contacts
    │   ├── skills.js           # Categorized frontend, backend, mobile, DB, deployment
    │   ├── projects.js         # Web & mobile case studies with tags, metrics & links
    │   ├── experience.js       # Career history timeline with bulleted achievements
    │   └── education.js        # Degrees, honors, and professional industry certs
    ├── components/
    │   ├── Navbar.jsx          # Sticky glass navbar, active tracking, mobile drawer
    │   ├── ThemeToggle.jsx     # Animated Sun/Moon switcher
    │   ├── SectionHeader.jsx   # Consistent badge + display title + subtitle
    │   ├── ProjectModal.jsx    # Deep-dive interactive case study modal
    │   └── Footer.jsx          # Quick links, copyright, and smooth back-to-top button
    └── sections/
        ├── HeroSection.jsx     # Rotating role typewriter, CTA buttons, floating chips
        ├── AboutSection.jsx    # Bio, key highlights checklist, stats counter, CV download
        ├── SkillsSection.jsx   # Grid of categorized skill cards with icons for all items
        ├── ProjectsSection.jsx # Functional animated filter: All, Web, Mobile
        ├── ExperienceSection.jsx # Vertical glowing timeline of career roles
        ├── EducationSection.jsx  # Academic degrees & industry certifications
        └── ContactSection.jsx  # Interactive form with validation & contact channels
```

---

## ✏️ How to Customize with Your Own Information

### 1. Update Profile & Bio
Edit [`src/data/profile.js`](file:///c:/Users/G3NZ/Downloads/Portfolio/src/data/profile.js):
- Change `name`, `title`, `tagline`, and `roles`.
- Update `contact.email`, `contact.phone`, `contact.location`.
- Update `socials` with your real GitHub, LinkedIn, and X profiles.

### 2. Update Skills
Edit [`src/data/skills.js`](file:///c:/Users/G3NZ/Downloads/Portfolio/src/data/skills.js):
- Add or modify technologies and proficiency badges across Frontend, Backend, Mobile, Database, and Cloud.

### 3. Update Projects & Case Studies
Edit [`src/data/projects.js`](file:///c:/Users/G3NZ/Downloads/Portfolio/src/data/projects.js):
- Add your real projects with `category: "web"` or `category: "mobile"`.
- Set `liveUrl` and `githubUrl`.

### 4. Backend & MongoDB Integration
The project includes an Express backend with Mongoose for storing submitted contact messages:
- Configure `.env` with your `MONGODB_URI` (MongoDB Atlas URI or local `mongodb://127.0.0.1:27017/portfolio`).
- Messages submitted through [`src/sections/ContactSection.jsx`](file:///c:/Users/G3NZ/Downloads/Portfolio/src/sections/ContactSection.jsx) are automatically validated and persisted in MongoDB.
- Run both frontend and backend concurrently using `npm run dev`.
- View submissions at `GET /api/contact` or check server status at `GET /api/health`.

---

## 🌐 Deploying to Vercel or Netlify

### Vercel
1. Push your code to a GitHub/GitLab repository.
2. Import the repository into [Vercel](https://vercel.com).
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Click **Deploy**.

### Netlify
1. Connect repository in [Netlify](https://www.netlify.com/).
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Click **Deploy Site**.

---

## 📄 License
MIT License. Free to use and customize for your personal portfolio.
