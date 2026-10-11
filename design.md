# Design System & UI Specification: Tuition Centre Platform

## 1. Aesthetic Direction & Visual Identity
In accordance with modern craftsmanship guidelines (`frontend-design`, `web-design-guidelines`, `impeccable`):
- **Aesthetic POV:** Warm, trustworthy, premium academic excellence. It eschews generic corporate blue or cheap coupon-style tuition layouts in favor of an inviting, professional educational institution that looks modern and established.
- **Atmosphere:** Clean, well-spaced, reassuring to parents, highly scannable on mobile viewports.
- **Core Visual Contrast:** Deep Midnight Slate headers and cards contrasting against warm ivory/eggshell canvas surfaces, energized with Scholarly Amber and Emerald CTAs.

---

## 2. Design Tokens & Palette

### Color Palette
```css
:root {
  /* Surface & Canvas */
  --bg-primary: #FCFDFD;          /* Clean warm white canvas */
  --bg-secondary: #F8FAFC;        /* Subtle section contrast */
  --bg-tertiary: #F1F5F9;         /* Card background / input fill */
  --bg-card: #FFFFFF;             /* Elevated container surface */
  --border-subtle: #E2E8F0;       /* Fine structural dividers */
  --border-focus: #2563EB;        /* Accessible focus outline */

  /* Brand & Neutrals */
  --navy-950: #0B132B;            /* Deep obsidian navy (highest hierarchy text) */
  --navy-900: #1C2541;            /* Rich midnight navy (headings) */
  --navy-800: #3A506B;            /* Slate body text */
  --navy-500: #64748B;            /* Muted secondary labels */

  /* Accents & Signals */
  --accent-gold: #F59E0B;         /* Scholarly warm amber (highlights, stars, tags) */
  --accent-gold-soft: #FEF3C7;    /* Subtle amber pill background */
  --accent-emerald: #10B981;      /* Trust & conversion green (Book Trial CTA) */
  --accent-emerald-soft: #D1FAE5; /* Emerald tag background */
  --whatsapp-green: #25D366;      /* Recognized WhatsApp brand color */
  --whatsapp-green-hover: #20BD5A;
  
  /* Shadows & Depth */
  --shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04);
  --shadow-lg: 0 12px 24px -4px rgba(15, 23, 42, 0.10), 0 4px 6px -2px rgba(15, 23, 42, 0.05);
  --shadow-focus: 0 0 0 3px rgba(37, 99, 235, 0.25);
  
  /* Radii */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;
}
```

### Typography Scale
- **Display Font:** `Plus Jakarta Sans` or `Outfit` (600, 700, 800) for energetic, confident headlines.
- **Body Font:** `Inter` or modern system sans-serif (400, 500, 600) for high scannability.
- **Type Hierarchy:**
  - `Hero Heading (h1):` `clamp(2rem, 5vw, 3.25rem)` / Line-height: `1.15` / Weight: `800`
  - `Section Title (h2):` `clamp(1.5rem, 3.5vw, 2.25rem)` / Line-height: `1.25` / Weight: `700`
  - `Card Title (h3):` `1.25rem` / Line-height: `1.35` / Weight: `600`
  - `Body Copy:` `1rem (16px)` / Line-height: `1.6` / Weight: `400`
  - `Microcopy & Tags:` `0.8125rem (13px)` / Line-height: `1.4` / Weight: `600`

---

## 3. Page Structure & Information Architecture

```
+--------------------------------------------------------------------------+
| Top Alert Bar: "📅 Term 2 Intake Open • Free 60-min Trial Assessment"   |
+--------------------------------------------------------------------------+
| Header: Logo (Unipact Academy) | Subjects | Fees | Schedule | FAQ | [CTA] |
+--------------------------------------------------------------------------+
| HERO SECTION                                                             |
| - High-impact Headline: "Stop Stressing Over Syllabus & Timetables."     |
| - Sub-headline: Small group mastery classes, clear fees, flexible slots. |
| - Primary Action: [ Book a Free Trial Class ] + [ WhatsApp Us Direct ]   |
| - Trust Proof: "⭐ 4.9/5 from 350+ Parents • Max 10 Students/Class"      |
+--------------------------------------------------------------------------+
| SUBJECT & LEVEL EXPLORER                                                 |
| - Segmented Filter Pills: [ All Levels ] [ Primary 4-6 ] [ Form 1-3 ]... |
| - Grid of Subject Cards:                                                 |
|   - Subject Name & Level Badge                                           |
|   - Monthly Fee (Clear RM/month, no hidden materials charge)             |
|   - Available Days & Timeslots                                           |
|   - Class Size & Tutor Credentials                                       |
|   - Action: [ Book Free Trial for This Subject ]                         |
+--------------------------------------------------------------------------+
| TRANSPARENT FEE CALCULATOR & BUNDLE DISCOUNTS                            |
| - Interactive subject bundle selector (e.g. Pick 2 = 10% off, 3 = 15%)   |
| - Instant total monthly computation                                      |
+--------------------------------------------------------------------------+
| WEEKLY TIMETABLE SCHEDULE MATRIX                                         |
| - Filter by Day (Weekday Evenings vs Weekends)                           |
| - Live slot availability tags ("3 Seats Left", "Open")                   |
+--------------------------------------------------------------------------+
| FREE TRIAL CLASS BOOKING MODAL / EMBEDDED FORM                           |
| - Step 1: Parent & Student Info (Name, WhatsApp Phone)                  |
| - Step 2: Subject & Preferred Slot Selection                             |
| - Step 3: Instant WhatsApp Confirmation Dispatch                         |
+--------------------------------------------------------------------------+
| PARENT FAQ ACCORDION (Answers 90% of WhatsApp inquiries)                 |
| - What happens during the free trial?                                    |
| - How are fee payments made?                                             |
| - What if my child misses a class (replacement classes)?                 |
| - Are notes and revision books included?                                 |
+--------------------------------------------------------------------------+
| FOOTER: Centre Address, Operating Hours, Google Map Link, Direct Chat    |
+--------------------------------------------------------------------------+
| FLOATING QUICK-ACTION: Direct WhatsApp Button (Bottom-Right)             |
+--------------------------------------------------------------------------+
```

---

## 4. Mobile Ergonomics & Accessibility (WCAG AAA)
1. **Touch Targets:** Every interactive tab, pill, button, and input maintains a minimum touch boundary of **48px x 48px** for effortless one-handed thumb interaction.
2. **Contrast Ratios:** All body text meets at least **7:1 contrast ratio** against backgrounds. Secondary labels exceed **4.5:1**.
3. **Sticky Trial CTA on Mobile:** On smaller screens (< 640px), a floating bottom bar retains the `[ Book Free Trial ]` and `[ WhatsApp ]` buttons so parents never have to search for the action.
4. **Form Ergonomics:**
   - Phone input automatically pre-fills Malaysia country code (`+60`) with validation.
   - Dropdowns are replaced with intuitive radio pills where option count is <= 4.

---

## 5. Visual Asset Guidelines (Solving the Photos Gap)
- **Facility / Classroom:** Until high-res physical photographs are taken by the centre, cards use styled vector illustration badges depicting laboratory beakers, geometric geometry tools, literature books, and modern classroom badges.
- **Tutor Avatars:** Styled illustrated silhouettes with tutor name, verified credentials, and years of experience.
- **Specification for Future Photos:**
  - Hero image: `1200 x 600px` (16:9 or 2:1 ratio), bright warm natural lighting, students actively engaged in small group discussion.
  - Classroom tour: `600 x 400px` (3:2 ratio), clean air-conditioned study environment, whiteboard, and learning resources.
