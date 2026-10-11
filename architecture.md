# System Architecture: Tuition Centre Web Platform

## 1. Architecture Overview & Design Principles
The platform is designed as an ultra-fast, lightweight, mobile-first single-page web application. It requires **zero external node packages or heavy build pipelines**, adhering to strict budget constraints and client rules while ensuring lightning-fast load times on 4G/5G mobile networks.

```
+-------------------------------------------------------------------+
|                        Client Browser (Mobile / Desktop)          |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|                     Presentation Layer (Vanilla Web)              |
|   index.html  (Semantic HTML5 Structure)                          |
|   index.css   (Modern CSS3, CSS Custom Properties & Grid/Flexbox)  |
|   app.js      (Modular Vanilla ES6+ Logic & Event Handling)       |
+-------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|                     Data & Logic Layer (Local & Decoupled)        |
|   - Subject & Level Catalog Store (`js/data.js`)                  |
|   - Schedule & Fee Computation Engine                             |
|   - Trial Booking Validation & WhatsApp Dispatch Generator        |
+-------------------------------------------------------------------+
                                  |
                  +---------------+---------------+
                  |                               |
                  v                               v
+-----------------------------------+   +---------------------------+
|  Direct WhatsApp Lead Handoff     |   | Optional Zero-Cost API    |
|  (Instant pre-filled admin chat)  |   | (Google Sheets / Webhook) |
+-----------------------------------+   +---------------------------+
```

---

## 2. Technology Stack & Framework

> **Framework Decision:** Migrated to **React** with **Vite** per client requirement, using vanilla CSS design tokens for maximum craftsmanship and performance.

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Framework** | React 19 | Declarative UI, reactive state management (Fee Calculator, dynamic level filtering, 3-step modal). |
| **Build Tool** | Vite 6 | Instant HMR, blazing-fast production bundling. |
| **Styling** | Vanilla CSS3 (Modern Tokens) | Custom CSS properties for consistent theming, Flexbox & CSS Grid layouts, zero CSS utility bloat. |
| **Typography** | Plus Jakarta Sans & Inter | Clean, legible sans-serif typefaces via standard web fonts. |
| **Assets** | Optimized High-Res Photography & SVG | Crisp icons and authentic small-group learning photography. |

---

## 3. Directory & File Structure
```
Training Unipact/
├── index.html              # Vite React entry template
├── vite.config.js          # Vite build configuration
├── package.json            # React & Vite dependencies
├── src/
│   ├── main.jsx            # React root mount
│   ├── App.jsx             # Core application with interactive state
│   ├── index.css           # Design tokens, typography, component styling
│   └── data/
│       └── tuitionData.js  # Declarative subject catalog, schedules, fee tiers, and FAQs
│   ├── app.js              # Application entry, navigation, filtering & UI binding
│   └── booking.js          # Free trial booking validation & WhatsApp URL synthesis
├── assets/
│   ├── icons/              # Lightweight SVG icons (schedule, clock, check, book, etc.)
│   └── images/             # Visual photography & banners
├── brief.md                # Project brief & requirements
├── architecture.md         # System architecture specification
└── design.md               # Visual design system & UX specifications
```

---

## 4. Data Architecture (`js/data.js`)
To allow centre staff to update fees, subjects, or timings without modifying HTML structure, the platform uses a decoupled data model:

```javascript
// Example Data Schema in js/data.js
export const TUITION_DATA = {
  centreInfo: {
    name: "Unipact Academy",
    whatsappNumber: "60123456789",
    location: "Level 2, Education Hub, Bandar Utama",
    tagline: "Inspiring Academic Excellence & Confident Learners"
  },
  levels: [
    { id: "primary", name: "Primary (Standard 4 - 6)" },
    { id: "lower-sec", name: "Lower Secondary (Form 1 - 3)" },
    { id: "upper-sec", name: "Upper Secondary (Form 4 - 5 / SPM / IGCSE)" }
  ],
  subjects: [
    {
      id: "math-f4",
      levelId: "upper-sec",
      name: "Modern Mathematics",
      grade: "Form 4 & 5",
      monthlyFee: 110,
      sessionsPerWeek: 1,
      duration: "1.5 hours",
      schedule: ["Saturday 10:00 AM - 11:30 AM", "Tuesday 7:30 PM - 9:00 PM"],
      seatsAvailable: 4,
      tutor: "Teacher Sarah (10+ Yrs Exp)"
    }
    // Additional subjects...
  ],
  bundleDiscounts: [
    { count: 2, discountPercent: 10, label: "2 Subjects (10% Off)" },
    { count: 3, discountPercent: 15, label: "3+ Subjects (15% Off)" }
  ],
  faqs: [
    {
      q: "Are physical or online classes provided?",
      a: "We offer both interactive in-person small group sessions (max 10 students) and live hybrid online sessions."
    }
  ]
};
```

---

## 5. Free Trial Booking & WhatsApp Integration Flow
1. **Parent selects Subject & Level** on the page or in the Free Trial modal.
2. **Form collects**: Parent Name, WhatsApp Phone Number, Student Name, Student Level, Desired Subject, and Preferred Trial Time Slot.
3. **Client-Side Validation**: Ensures valid phone format and required fields.
4. **Handoff Generation**:
   - The system encodes a pre-formatted WhatsApp direct message:
   ```
   https://wa.me/60123456789?text=Hello%20Unipact%20Academy!%20I%20would%20like%20to%20book%20a%20Free%20Trial%20class.%0A%0A*Student:*%20Adam%0A*Level:*%20Form%204%0A*Subject:*%20Modern%20Mathematics%0A*Preferred%20Slot:*%20Saturday%2010:00%20AM%0A*Parent%20Contact:*%20012-3456789
   ```
   - Opens WhatsApp directly on mobile or WhatsApp Web on desktop with 1 tap.
   - Shows on-screen visual confirmation badge with booking reference.

---

## 6. Hosting, Security & Performance Strategy
- **Hosting:** 100% static hosting (e.g. GitHub Pages, Vercel, or Cloudflare Pages) with zero server maintenance costs.
- **Performance:** Sub-100ms render time, zero blocking render scripts, CSS minified/optimized, image assets lazy-loaded.
- **Privacy & Security:** No cookies or intrusive tracking pixels required; parent data is only transmitted via explicit parent-initiated WhatsApp message or direct submission.
