# Nostromo Theme Landing Page

This folder contains the GitHub Pages landing page for the Nostromo Theme VSCode extension.

## Structure

```
docs/
├── index.html              # Main landing page
├── css/
│   └── styles.css          # Nostromo-themed styles
├── js/
│   └── monaco-loader.js    # Monaco editor with live theme preview
├── assets/                 # Images, icons, screenshots
└── CNAME                   # Custom domain configuration
```

## Features

- 🎨 Live theme preview using Monaco Editor (same engine as VSCode)
- 📱 Fully responsive design
- 🔍 SEO optimized with Open Graph, Twitter Cards, JSON-LD
- ♿ Accessible with ARIA labels and semantic HTML
- ⚡ Performance optimized with lazy loading

## Local Development

To test locally, you can use any static file server:

```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve .

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## GitHub Pages Setup

1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` / folder: `/docs`
4. Custom domain: `nostromo.nbr.st`
5. Ensure HTTPS is enabled

## DNS Configuration

For the custom domain `nostromo.nbr.st`, configure your DNS:

### Option A: CNAME Record (Recommended)
```
Type: CNAME
Name: nostromo
Value: grikomsn.github.io
TTL: 3600
```

### Option B: A Records (for apex domain)
```
Type: A
Name: @
Values:
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153
TTL: 3600
```

After DNS changes, it may take up to 24 hours for SSL certificate to be issued by GitHub.

## SEO Checklist

- [ ] Submit sitemap to Google Search Console
- [ ] Verify Open Graph with Facebook Debugger
- [ ] Verify Twitter Card with Card Validator
- [ ] Test structured data with Google's Rich Results Test

## Credits

- Monaco Editor by Microsoft
- Inspired by the USCSS Nostromo from Alien (1979)
