# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Build CSS
```bash
npm run build
```

### 3. View the Site
```bash
npm run serve
```

Then open http://localhost:8080 in your browser.

## 📝 Making Changes

### Update Colors
Edit `tailwind.config.js` → `theme.extend.colors`

### Update Content
Edit HTML files in `/dist` folder

### Update Products
Edit `src/js/products.js`

### Update Styles
1. Edit `src/css/input.css`
2. Run `npm run build`

## 🔧 Development Workflow

**Watch mode** (auto-rebuild CSS on changes):
```bash
npm run dev
```

**Production build**:
```bash
npm run build
```

## 📤 Deploying to GitHub

### First Time Setup
```bash
# Already initialized! Now commit and push:
git commit -m "Initial commit - Drive Thru website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/drivethru_website.git
git push -u origin main
```

### Enable GitHub Pages
1. Go to repository Settings
2. Click "Pages" in sidebar
3. Source: Deploy from branch `main`
4. Folder: `/dist`
5. Save

Your site will be live at: `https://YOUR_USERNAME.github.io/drivethru_website`

## ✅ Next Steps

### Immediate
- [ ] Replace placeholder emojis with real product images
- [ ] Add your actual Google Maps embed code in `contact.html`
- [ ] Update social media links (Instagram, Facebook, TikTok)
- [ ] Update NAP (Name, Address, Phone) throughout site
- [ ] Test age verification on different browsers

### Soon
- [ ] Add Google Analytics tracking code
- [ ] Set up real product database/API
- [ ] Connect contact form to email service
- [ ] Add more product images
- [ ] Create actual blog posts

### Later
- [ ] Implement e-commerce functionality
- [ ] Add user accounts
- [ ] Set up online ordering
- [ ] Integrate with inventory system

## 🔍 Testing Checklist

- [ ] Age gate appears on first visit
- [ ] Navigation menu works on mobile
- [ ] Search functionality works
- [ ] Product filters work on shop page
- [ ] Quick view modal opens
- [ ] All internal links work
- [ ] Site is responsive on phone/tablet/desktop
- [ ] Forms validate properly
- [ ] Health warnings visible on all pages

## 💡 Tips

- **Clear age verification**: Delete localStorage to test age gate again
- **Live reload**: Use `npm run serve` for local testing with auto-refresh
- **CSS not updating**: Run `npm run build` and hard refresh browser
- **Test accessibility**: Use browser dev tools accessibility tab

## 📞 Need Help?

Refer to the main [README.md](README.md) for detailed documentation.

---

**Happy coding! 🎉**

