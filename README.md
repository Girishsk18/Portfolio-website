# Girish — Personal Portfolio

A modern, responsive personal portfolio website built with **HTML, CSS, and JavaScript** — no frameworks or build tools required.

## ✨ Features

- **Dark Theme** with cyan accent colors
- **Responsive Design** — works on mobile, tablet, and desktop
- **Smooth Scroll** navigation with active link highlighting
- **Typewriter Effect** on the hero section
- **Scroll Reveal** animations using Intersection Observer
- **Animated Skill Bars** triggered on scroll
- **Project Cards** with hover overlays
- **Timeline Resume** section
- **Contact Form** with client-side validation
- **Floating Particles** background
- **Back-to-Top** button

## 🚀 Getting Started

### Local Development

1. Clone or download this repository
2. Open `index.html` in your browser

That's it — no build step needed.

### Live Server (optional)

For hot-reloading during development, use VS Code's **Live Server** extension or run:

```bash
npx serve .
```

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML (single page)
├── css/
│   └── styles.css      # All styles, responsive design, animations
├── js/
│   └── main.js         # Interactivity (typewriter, scroll, form, etc.)
└── README.md           # This file
```

## 🌐 Deployment

### GitHub Pages

1. Push the code to a GitHub repository
2. Go to **Settings → Pages**
3. Under *Source*, select `main` branch and `/ (root)` folder
4. Click **Save** — your site will be live at `https://<username>.github.io/<repo>/`

### Netlify

1. Push to GitHub (or drag-and-drop the folder)
2. Go to [netlify.com](https://www.netlify.com/) → **Add new site → Import from Git**
3. Select your repo → Deploy
4. Your site is live instantly with a custom `.netlify.app` URL

## 🎨 Customization

- **Colors**: Edit CSS custom properties in `:root` at the top of `css/styles.css`
- **Content**: Update text, links, and project info directly in `index.html`
- **Typewriter strings**: Modify the `strings` array in `initTypewriter()` in `js/main.js`

## 📄 License

MIT — free to use and modify.
