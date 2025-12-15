# Drive Thru Website

A modern, mobile-first website for **Drive Thru**, a cigarette & vape store in Kahnawake, Quebec. This website complies with Canadian laws for age-restricted products and features a clean, intuitive design that inspires trust and convenience.

![Drive Thru](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🎯 Features

### Compliance & Legal
- ✅ **Age Verification Modal** - Mandatory age gate on first visit
- ✅ **Health Warnings** - Displayed on every page footer and product pages
- ✅ **Mature Imagery** - Professional, adult-focused design
- ✅ **Canadian Regulations** - Full compliance with federal and provincial tobacco laws

### Design & UX
- 🎨 **Dark Theme** - Sophisticated charcoal and muted brown color palette
- 📱 **Mobile-First** - Fully responsive across all devices
- ♿ **WCAG Compliant** - Accessibility features including skip links, ARIA labels, keyboard navigation
- 🚀 **Performance Optimized** - Fast load times with optimized assets

### Pages
- **Home** - Hero section, category highlights, promotions, customer reviews, newsletter signup
- **Shop** - Product catalog with filtering, sorting, quick view modal
- **About Us** - Company story, values, community involvement
- **How Drive-Thru Works** - Step-by-step guide with FAQs
- **Blog** - Educational content and local news
- **Events** - Upcoming events calendar with RSVP
- **Contact** - Location map, contact form, directions
- **FAQs** - Comprehensive Q&A covering common topics

### Functionality
- 🔍 **Search with Autocomplete** - Real-time product search
- 🗂️ **Category Filtering** - E-cigarettes, E-liquids, Cigarettes, Accessories
- ⭐ **Product Reviews** - Display customer ratings and reviews
- 📧 **Newsletter Signup** - Email collection for marketing
- 🗺️ **Google Maps Integration** - Store location and directions

### SEO & Local Marketing
- 📍 **Local SEO** - Optimized for "vape shop Kahnawake" and related keywords
- 🏷️ **Meta Tags** - Proper title, description, keywords on all pages
- 📱 **Social Media Integration** - Links to Instagram, Facebook, TikTok
- 🔗 **NAP Consistency** - Name, Address, Phone consistent across site

## 🛠️ Tech Stack

- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Modern styling with Flexbox and Grid
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript (Vanilla)** - No dependencies, pure JS
- **PostCSS** - CSS processing and autoprefixer

## 📦 Installation

### Prerequisites
- Node.js 14+ and npm

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/drivethru_website.git
cd drivethru_website
```

2. **Install dependencies**
```bash
npm install
```

3. **Build CSS**
```bash
npm run build
```

4. **Development mode (with watch)**
```bash
npm run dev
```

5. **Start local server**
```bash
npm run serve
```

The site will be available at `http://localhost:8080`

## 📁 Project Structure

```
drivethru_website/
├── dist/                   # Production-ready files
│   ├── index.html         # Home page
│   ├── shop.html          # Product catalog
│   ├── about.html         # About page
│   ├── drive-thru.html    # How it works
│   ├── blog.html          # Blog listing
│   ├── events.html        # Events calendar
│   ├── contact.html       # Contact page
│   ├── faq.html           # FAQs
│   └── css/
│       └── output.css     # Compiled CSS (generated)
├── src/                   # Source files
│   ├── css/
│   │   └── input.css      # Tailwind source
│   └── js/
│       ├── age-gate.js    # Age verification
│       ├── navigation.js  # Menu & search
│       └── products.js    # Product catalog
├── .gitignore
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🚀 Deployment

### Option 1: GitHub Pages

1. Push your code to GitHub
2. Go to Settings → Pages
3. Select source: `main` branch, `/dist` folder
4. Your site will be live at `https://yourusername.github.io/drivethru_website`

### Option 2: Netlify

1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy!

### Option 3: Traditional Hosting

1. Run `npm run build`
2. Upload contents of `/dist` folder to your web server
3. Configure your domain

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to customize the color palette:

```javascript
colors: {
  primary: {...},  // Muted browns
  dark: {...},     // Charcoal grays
  accent: {...}    // Red accents
}
```

### Content

- **Contact Information**: Update NAP (Name, Address, Phone) in all HTML files
- **Social Media**: Replace `#` with actual social media URLs
- **Google Maps**: Add your embed code in `contact.html`
- **Products**: Modify product data in `src/js/products.js`

### Images

Replace placeholder emojis with actual product images:
1. Add images to `dist/images/`
2. Update image references in HTML
3. Optimize images for web (use WebP format)

## ♿ Accessibility Features

- ✅ Skip to main content link
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Sufficient color contrast (WCAG AA)
- ✅ Semantic HTML structure
- ✅ Alt text for images (when implemented)
- ✅ Focus indicators

## 📊 SEO Checklist

- ✅ Unique meta titles on every page
- ✅ Meta descriptions with local keywords
- ✅ Semantic heading hierarchy (H1 → H6)
- ✅ NAP consistency across pages
- ✅ Mobile-friendly design
- ✅ Fast load times
- ✅ Schema markup ready (can be added)
- ✅ XML sitemap ready (can be generated)

## 🔐 Compliance Notes

This website is designed to comply with:
- **Tobacco and Vaping Products Act (Canada)**
- **Quebec Tobacco Control Act**
- **Health Canada Regulations**

Key compliance features:
- Age verification on entry
- Mandatory health warnings
- No youth-appealing content
- Proper product labeling
- Responsible marketing practices

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

This is a proprietary project for Drive Thru. If you're part of the team:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📞 Support

For questions or issues:
- Email: info@drivethruvape.ca
- Phone: (450) 632-8888
- Location: 123 Main Road, Kahnawake, QC J0L 1B0

## 🗺️ Roadmap

### Phase 1 (Current)
- [x] Basic website structure
- [x] Age verification
- [x] Product catalog
- [x] Order Builder
- [x] Blog pages

### Phase 2 (Planned)
- [ ] E-commerce functionality
- [ ] Online ordering system
- [ ] User accounts
- [ ] Live inventory tracking

### Phase 3 (Future)
- [ ] Mobile app
- [ ] Push notifications
- [ ] Advanced analytics
- [ ] CRM integration

## 📈 Analytics

To add Google Analytics:

1. Get your GA4 tracking code
2. Add to `<head>` of all HTML files:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔧 Troubleshooting

**CSS not updating?**
- Run `npm run build` to recompile
- Clear browser cache
- Check console for errors

**Age gate not working?**
- Clear localStorage
- Check browser console for errors
- Ensure JavaScript is enabled

**Search not functioning?**
- Verify `navigation.js` is loaded
- Check for JavaScript errors
- Test with browser dev tools

---

**Built with ❤️ for the Kahnawake community**

© 2025 Drive Thru. All rights reserved.

