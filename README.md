# Sharan Thind Notary Public - Professional Website

A modern, responsive website for Sharan Thind Notary Public services in Surrey, BC, Canada. Built with clean HTML, CSS, and JavaScript.

## 🌐 Live Website
**URL:** [Professional Notary Public Services](https://your-domain.com)

---

## 📋 Project Overview

This is a complete business website for a certified Notary Public service provider. The website showcases professional notary services, client testimonials, and provides easy contact options for potential clients.

### Business Details
- **Name:** Sharan Thind Notary Public
- **Location:** Surrey, British Columbia, Canada
- **Email:** thindnotary@gmail.com
- **Phone:** 1 604-500-9300
- **Services:** Letter of Invitation, Powers of Attorney, Witness of Signature, Statutory Declaration, Affidavit, Proof of Identity

---

## 🛠️ Technologies Used

### Frontend Languages
| Language | Usage |
|----------|-------|
| **HTML5** | Structure and content markup |
| **CSS3** | Styling, animations, responsive design |
| **JavaScript** | Interactive features, animations, form handling |

### External Libraries & Frameworks
| Library | Purpose |
|---------|---------|
| **Tailwind CSS** | Utility-first CSS framework for rapid styling |
| **Font Awesome** | Icons and iconography |
| **Google Fonts** | Typography (Playfair Display, Open Sans) |
| **Firebase** | Database, authentication, and hosting |
| **PHP** | Server-side form processing |

### Key Features
- ✅ Responsive design (mobile-first approach)
- ✅ Multi-page website (Home, About, Services, Contact, Blog)
- ✅ Admin panel with login authentication
- ✅ Firebase integration for blog and testimonials
- ✅ PHP contact form with email functionality
- ✅ Smooth scroll animations
- ✅ Interactive testimonial carousel
- ✅ Mobile hamburger menu
- ✅ Animated service cards with hover effects
- ✅ Contact form with appointment date field
- ✅ Hero section with background animations

---

## 📁 Project Structure

```
sheran-notric-public/
├── index.html              # Main landing page (root)
├── admin.html              # Admin panel (root, login: admin/admin123)
├── contact-form.php        # PHP form handler
├── assets/
│   ├── css/
│   │   └── style.css       # Custom CSS styles
│   ├── js/
│   │   ├── script.js       # Main JavaScript
│   │   ├── admin.js        # Admin panel JS
│   │   ├── env.js          # Environment config
│   │   └── firebase-config.js    # Firebase config
│   ├── images/             # Website images
│   │   ├── logo.jpg
│   │   ├── hero-*.jpg
│   │   ├── about-img.jpg
│   │   └── ...
│   └── pages/              # HTML pages (organized)
│       ├── about.html      # About Us page
│       ├── services.html   # Services page
│       ├── contact.html    # Contact page with form
│       ├── blog.html       # Blog listing page
│       └── blog-detail.html # Individual blog post page
├── .git/                   # Git repository
└── README.md               # This file
```

---

## 🎨 Design System

### Color Palette
| Color | Hex Code | Usage |
|-------|----------|-------|
| **Primary** | `#1e3a5f` | Headers, buttons, icons |
| **Secondary** | `#2c5282` | Hover states, accents |
| **Dark** | `#0f172a` | Dark sections, footer |
| **White** | `#FFFFFF` | Backgrounds, text on dark |
| **Light Gray** | `#F5F5F5` | Section backgrounds |
| **Accent** | `#3b82f6` | Links, interactive elements |

### Typography
- **Headings:** Playfair Display (serif) - Elegant, professional look
- **Body Text:** Open Sans (sans-serif) - Clean, readable

### Animation Library
- Custom CSS animations
- Scroll-triggered animations (Intersection Observer API)
- Smooth transitions and hover effects

---

## 📱 Website Sections

### 1. Navigation Bar
- Fixed top navigation with contact bar
- Mobile-responsive hamburger menu
- Smooth scrolling to sections
- Book Appointment CTA button

### 2. Hero Section
- Full-screen hero with background image
- Animated background zoom effect
- Trust badge and certification display
- Call-to-action buttons
- Scroll indicator animation

### 3. About Section
- Two-column layout (text + image)
- Animated feature list
- "Learn More" button
- Scroll-triggered animations

### 4. Services Section
- 6 service cards in responsive grid (3 columns desktop, 2 tablet, 1 mobile)
- Animated hover effects (bottom-to-top fill)
- Icon transitions on hover
- Service descriptions

**Services Offered:**
1. Real Estate Documents
2. Letter of Invitation
3. Powers of Attorney
4. Witness of Signature
5. Statutory Declaration
6. Affidavit
7. Proof of Identity
8. Travel Consent Letters
9. Document Notarization
10. Mobile Notary Services

### 5. Testimonials Section
- Carousel with 6 client testimonials
- 5-star rating display
- Client photos and names
- Smooth carousel transitions
- Auto-play functionality

### 6. FAQ Section (if applicable)
- Accordion-style questions
- Smooth expand/collapse animations

### 7. Blog Section
- Dynamic blog posts from Firebase
- Individual blog detail pages
- Admin panel for blog management
- Create, edit, delete blog posts

### 8. Admin Panel
- Secure login authentication (username: `admin`, password: `admin123`)
- Blog management (CRUD operations)
- Testimonial management
- Session-based authentication
- Responsive admin dashboard

### 9. Contact Section
- Contact information display
- Contact form with validation
- Appointment date selection
- Google Maps integration
- Social media links
- PHP email functionality

### 10. Footer
- Quick links
- Contact information
- Social media icons
- Copyright notice

---

## 🚀 How to Run the Project

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/sheran-notric-public.git
   ```

2. Navigate to project folder:
   ```bash
   cd sheran-notric-public
   ```

3. Open `index.html` in browser:
   ```bash
   # Option 1: Direct open
   open index.html
   
   # Option 2: Using Live Server (VS Code extension)
   # Right-click on index.html → "Open with Live Server"
   
   # Option 3: Python simple server
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

---

## ⚙️ Key Features Implementation

### 1. Responsive Design
```css
/* Mobile-first breakpoints */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
```

### 2. Scroll Animations
- Custom `IntersectionObserver` implementation
- Fade-in-up animations on scroll
- Slide-in animations for FAQ sections

### 3. Service Card Hover Effects
```css
/* Bottom-to-top fill animation */
.service-card .absolute {
    height: 0;
    transition: height 0.5s ease;
}
.service-card:hover .absolute {
    height: 100%;
}
```

### 4. Testimonial Carousel
- Pure JavaScript implementation
- Smooth CSS transitions
- Auto-play with manual controls
- Responsive slide count (3 on desktop, 1 on mobile)

### 5. Mobile Menu
- Animated hamburger icon
- Smooth slide-down menu
- Click-outside-to-close functionality

---

## 📸 Assets Used

### Images
- **Logo:** Company branding logo (`logo.jpg`)
- **Hero Background:** Professional notary setting (`hero-6.jpg`)
- **About Image:** Professional notary photo (`about-img.jpg`)
- **Client Photos:** Unsplash placeholder images for testimonials

### Icons (Font Awesome)
- `fa-shield-alt` - Trust badge
- `fa-envelope` - Email
- `fa-phone` - Phone
- `fa-bars` / `fa-times` - Mobile menu
- `fa-star` - Rating stars
- `fa-check-circle` - Feature list
- `fa-arrow-right` - CTA arrows
- Service-specific icons for each service card

---

## 🔧 Customization Guide

### Changing Colors
Edit Tailwind config in `index.html`:
```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#1e3a5f',    // Change this
                secondary: '#2c5282',  // Change this
                // ...
            }
        }
    }
}
```

### Adding New Services
1. Copy existing service card HTML
2. Update icon class (Font Awesome)
3. Change title and description
4. Add to services grid in `index.html`

### Updating Testimonials
1. Edit testimonial cards in testimonials section
2. Update client photos (Unsplash URLs or local images)
3. Modify text and names

---

## 📞 Contact Information

**Sharan Thind Notary Public**
- 📧 Email: thindnotary@gmail.com
- 📱 Phone: 1 604-500-9300
- 📍 Address: Surrey, BC, Canada
- 🕐 Hours: Monday - Friday, 9:00 AM - 5:00 PM

---

## 📄 License

This project is proprietary and created for Sharan Thind Notary Public.
All rights reserved.

---

## 👨‍💻 Developer Notes

### Code Quality
- Semantic HTML5 markup
- BEM-like CSS class naming
- Modular JavaScript functions
- Cross-browser compatibility
- Accessibility considerations (ARIA labels, semantic tags)

### Performance Optimizations
- Optimized images
- Minified CSS (via Tailwind CDN)
- Efficient JavaScript event handling
- Lazy loading for scroll animations

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🔄 Version History

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | April 2026 | Initial release with all core features |
| v1.1 | April 2026 | Multi-page structure, Admin panel with auth, Contact form with PHP, Firebase integration |
| v1.2 | May 2026 | File reorganization - moved all HTML pages to assets/pages/ (except index.html and admin.html) |

---

## 🤝 Support

For technical support or feature requests, please contact the development team.

---

**© 2026 Sharan Thind Notary Public. All Rights Reserved.**
