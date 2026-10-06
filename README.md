# Sidharth Devaraj — Personal Portfolio

A minimalist, high-contrast editorial personal portfolio built with semantic HTML5, modern CSS, and vanilla JavaScript.

## Features

- **Typography First**: Paired with *Newsreader* (editorial serif) and *Inter* (interface sans-serif).
- **Modern Color Schemes**: Native `color-scheme` support with automatic system dark/light adaptation, manual toggle, and zero flash of unstyled content (FOUC).
- **Fluid & Responsive**: Scales organically from 320px mobile screens to large desktop monitors using CSS `clamp()`.
- **Accessible (WCAG 2.2 AA)**: High contrast, visible `:focus-visible` states, accessible SVG markup, and reduced motion queries.
- **Zero Dependencies**: Pure static files. No npm build steps, compilers, or external runtimes required.

## Local Preview

You can open `index.html` directly in any web browser, or launch a lightweight local HTTP server:

```bash
# Using Python 3
python3 -m http.server 8000

# Or using Node.js
npx serve .
```

Then visit `http://localhost:8000` in your browser.

## Deployment

Because this project is completely static, it can be deployed for free in seconds:

### GitHub Pages
1. Push this repository to GitHub.
2. Go to **Settings** > **Pages**.
3. Under **Branch**, select `main` (root) and click **Save**.
4. Your site will be live at `https://<username>.github.io/<repo>/`.

### Cloudflare Pages / Vercel / Netlify
1. Connect your repository.
2. Leave the build command empty (or output directory as `.`).
3. Deploy!
