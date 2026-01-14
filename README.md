# Sanzida Akter - Front-End Developer Portfolio

A cutting-edge, fully animated portfolio website featuring cyberpunk-inspired design with GSAP animations, custom cursor, particle systems, and responsive layout.

## ✨ Features

- **Modern Cyberpunk Design**: Neon cyan/purple color scheme with glow effects
- **Advanced GSAP Animations**: Scroll-triggered reveals, parallax effects, typing animations
- **Custom Cursor**: Interactive ring cursor with hover effects
- **Particle System**: Animated particles in hero section
- **Fully Responsive**: Optimized for all devices (320px to 4K)
- **8 Project Showcases**: Interactive flip cards with live demos and GitHub links
- **5 Professional Experiences**: Animated timeline with detailed descriptions
- **8 Animated Skill Progress Bars**: Real-time progress bar animations
- **SEO Optimized**: Meta tags, Open Graph, schema.org markup
- **Accessible**: ARIA labels, keyboard navigation, reduced motion support

## 🎨 Color Palette

- Primary Black: `#0A0A0A`
- Electric Cyan: `#00D4FF` (main accent/glows)
- Vibrant Purple: `#7C3AED` (secondary)
- Glow Blue: `#00B4D8`
- Neon Pink: `#FF6B9D` (CTAs/hovers)

## 📂 Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # All styles and animations
├── js/
│   └── main.js            # JavaScript and GSAP animations
├── assets/
│   └── images/
│       └── profile.jpg    # Your profile photo (REPLACE THIS)
└── README.md              # This file
```

## 🚀 Quick Start

### Option 1: Deploy to Netlify (Recommended)

1. Visit [Netlify Drop](https://app.netlify.com/drop)
2. Drag and drop the entire portfolio folder
3. Your site will be live instantly with a custom URL

### Option 2: GitHub Pages

1. Create a new GitHub repository
2. Upload all files to the repository
3. Go to Settings → Pages
4. Select "main" branch as source
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Option 3: Vercel

1. Install Vercel CLI: `npm install -g vercel`
2. Navigate to portfolio folder
3. Run `vercel` and follow prompts
4. Your site will be deployed instantly

### Option 4: Local Development

1. Open `index.html` directly in your browser, or
2. Use a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx http-server
   ```
3. Visit `http://localhost:8000`

## 📝 Customization Guide

### 1. Replace Profile Image

1. Prepare your professional headshot:
   - Minimum 800x800px (square aspect ratio)
   - JPG or PNG format
   - Clear, professional photo
2. Replace `assets/images/profile.jpg` with your image
3. Keep the filename as `profile.jpg`

### 2. Update Personal Information

Edit `index.html` to update:
- Contact email and phone number
- Social media links (GitHub, LinkedIn)
- Location information
- Any text content in sections

### 3. Customize Colors

Edit CSS variables in `css/style.css` (lines 4-39):

```css
:root {
    --primary-black: #0A0A0A;
    --electric-cyan: #00D4FF;    /* Change main accent color */
    --vibrant-purple: #7C3AED;   /* Change secondary color */
    /* ... more variables */
}
```

### 4. Adjust Animations

Edit animation speeds in `js/main.js`:
- Typing speed: Modify delay values
- Scroll trigger timing: Adjust GSAP ScrollTrigger parameters
- Particle count: Change particle generation settings

## 📱 Responsive Breakpoints

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px - 1439px
- Large Desktop: 1440px+
- 4K: 2560px+

## 🎯 Sections Included

1. **Hero Section**
   - Typing animation with name and title
   - Floating particles
   - Tech stack badges
   - CTA buttons

2. **About Section**
   - Professional bio
   - 4 animated stats cards
   - 8 animated skill progress bars
   - Education, languages, and location cards

3. **Skills Section**
   - 3 core competency cards
   - Additional technical skills with animated bars in About

4. **Projects Section**
   - 8 featured projects with flip cards
   - Live demo and GitHub links for each
   - Tech stack tags

5. **Experience Section**
   - 5 positions in timeline format
   - Detailed descriptions and achievements
   - Animated on scroll

6. **Education & Certifications**
   - 3 certification/education cards
   - Status badges
   - Animated icons

7. **Contact Section**
   - Contact form with animated labels
   - Contact information cards
   - Social media links

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, animations, grid/flexbox
- **JavaScript ES6+**: Modern JavaScript features
- **GSAP 3.12.2**: Professional-grade animations
- **Google Fonts**: Orbitron, JetBrains Mono, Inter

## 🔍 SEO Features

- Semantic HTML5 markup
- Meta description and keywords
- Open Graph tags for social media
- Twitter Card markup
- Schema.org structured data (Person type)
- Optimized loading performance

## ♿ Accessibility Features

- ARIA labels on all interactive elements
- Keyboard navigation support
- Reduced motion media queries
- Sufficient color contrast
- Alt text on images
- Focus indicators

## 📊 Performance

- Lazy loading for images
- Optimized animations (60fps target)
- Minimal dependencies (only GSAP via CDN)
- No build process required
- Fast initial load (<2s on standard connection)

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This portfolio template is free to use for personal projects. Feel free to customize it for your own portfolio!

## 🎓 Credits

**Design & Development**: Sanzida Akter  
**Animation Library**: GSAP (GreenSock)  
**Fonts**: Google Fonts

## 📞 Support

For questions or issues:
- **Email**: mim53711@gmail.com
- **LinkedIn**: [linkedin.com/in/sanzida-akter-b7b583233](https://www.linkedin.com/in/sanzida-akter-b7b583233/)
- **GitHub**: [github.com/sanzida-mim](https://github.com/sanzida-mim)

---

**Built with 💙 by Sanzida Akter** | Front-End Developer & Tech Innovator
