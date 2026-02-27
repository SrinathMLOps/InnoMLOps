# InnoMLOps Website Setup Guide

## ✅ What's Been Created

A complete, professional MLOps consulting website with:

### Pages
- **Home** (index.html) - Hero section, services overview, industries, contact form
- **About** (about.html) - Mission, vision, founder story, certifications
- **Services** (services.html) - Detailed service descriptions with problem/solution/outcome
- **Solutions** (solutions.html) - Industry-specific solutions (FinTech, Healthcare, Retail, Logistics, Startups)
- **Case Studies** (case-studies.html) - 5 real project case studies with tech stacks and results
- **Tech Stack** (tech-stack.html) - All technologies organized by category
- **Blog** (blog.html) - MLOps insights and best practices
- **Careers** (careers.html) - Join the team page
- **Privacy Policy** (privacy.html)
- **Terms of Use** (terms.html)

### Features
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Professional color scheme based on your brand
- ✅ Working contact/enquiry form (needs Formspree setup)
- ✅ Smooth animations and transitions
- ✅ SEO-friendly structure
- ✅ Fast loading and optimized
- ✅ GitHub Pages deployment configured

## 🚀 Next Steps

### 1. Enable GitHub Pages
1. Go to https://github.com/SrinathMLOps/InnoMLOps/settings/pages
2. Under "Build and deployment":
   - Source: Select "GitHub Actions"
3. The workflow will automatically deploy on every push
4. Your site will be live at: https://srinathmlops.github.io/InnoMLOps/

### 2. Configure Contact Form (Formspree)
1. Go to https://formspree.io and create a free account
2. Create a new form and get your Form ID (e.g., `xpzgkbnd`)
3. Open `js/main.js`
4. Find line ~60 with the commented Formspree code
5. Uncomment it and replace `YOUR_FORM_ID` with your actual ID
6. Comment out the `showSuccess()` line below it
7. Commit and push changes

### 3. Update Contact Information
Replace placeholder contact details in all files:
- Email: `contact@innomlops.com` (update if different)
- Add your LinkedIn URL
- Add your Twitter/X URL
- Update GitHub link (already set to SrinathMLOps)

### 4. Add Your Logo
- Replace `InnoMLOps.png` with your actual logo
- Recommended size: 200x50px (transparent PNG)
- The CSS will handle sizing automatically

### 5. Custom Domain (Optional)
If you have a custom domain:
1. Update `CNAME` file with your domain (currently: innomlops.com)
2. In your domain registrar (Namecheap, etc.):
   - Add A records pointing to GitHub's IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - Add CNAME record: www → srinathmlops.github.io
3. In GitHub repo settings → Pages → Custom domain: enter your domain
4. Enable "Enforce HTTPS" (after DNS propagates)

### 6. Customize Content
- Update service descriptions to match your exact offerings
- Add real case study details and metrics
- Update the "About" page with your actual background
- Add blog posts over time for SEO

### 7. SEO Optimization
- Add Google Analytics (optional)
- Submit sitemap to Google Search Console
- Add meta descriptions to each page
- Consider adding structured data (Schema.org)

## 📧 Form Integration Options

### Option 1: Formspree (Recommended - Free)
- Free tier: 50 submissions/month
- Easy setup, no backend needed
- Instructions above

### Option 2: Netlify Forms
- Deploy to Netlify instead of GitHub Pages
- Built-in form handling
- Free tier: 100 submissions/month

### Option 3: EmailJS
- Send emails directly from JavaScript
- Free tier: 200 emails/month
- Requires API key setup

### Option 4: Custom Backend
- Build your own API with FastAPI/Flask
- Deploy on AWS Lambda or similar
- Full control but more complex

## 🎨 Customization

### Colors
Edit `css/style.css` CSS variables (lines 8-18):
```css
:root {
  --primary:      #2C3E50;  /* Main dark color */
  --secondary:    #3498DB;  /* Accent blue */
  --accent:       #E74C3C;  /* Highlight red */
  /* ... */
}
```

### Fonts
Currently using:
- Headings: Raleway
- Body: Open Sans

To change, update the Google Fonts link in each HTML file.

## 📱 Testing

Test your site on:
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Mobile devices (iOS Safari, Chrome Android)
- Tablet sizes
- Different screen resolutions

## 🔒 Security

- All forms include GDPR consent checkbox
- Privacy policy and terms pages included
- HTTPS enforced via GitHub Pages
- No sensitive data stored client-side

## 📊 Analytics (Optional)

Add Google Analytics:
1. Create GA4 property
2. Add tracking code to all HTML files before `</head>`
3. Track form submissions, page views, etc.

## 🐛 Troubleshooting

**Site not deploying?**
- Check Actions tab in GitHub for errors
- Ensure GitHub Pages is enabled in settings
- Verify workflow file is in `.github/workflows/`

**Form not working?**
- Check browser console for errors
- Verify Formspree ID is correct
- Test with valid email format

**Images not loading?**
- Ensure InnoMLOps.png is in root directory
- Check file name case sensitivity
- Verify image paths in HTML

## 📞 Support

For questions or issues:
- GitHub Issues: https://github.com/SrinathMLOps/InnoMLOps/issues
- Email: contact@innomlops.com

## 🎉 You're All Set!

Your professional MLOps consulting website is ready to go live. Just enable GitHub Pages and start attracting clients!
