# Project Brief: Tuition Centre Web Platform

## 1. Executive Summary & Problem Statement
- **Client Quote:** *"Parents keep WhatsApp-ing us about fees and class times. Can you make a site where they see our subjects and book a free trial?"*
- **Core Challenge:** The tuition centre currently spends hours answering repetitive administrative inquiries via WhatsApp regarding subject availability, grade levels, timetable slots, and fee structures. Furthermore, trial class signups require back-and-forth messaging, causing high drop-off rates and delayed conversions.
- **Solution:** A clean, mobile-first web platform that acts as a 24/7 digital front desk. Parents can instantly browse syllabus offerings, filter schedules and transparent fees, and book a free trial class with automated confirmation and pre-filled WhatsApp handoff.

---

## 2. Target Audience & Personas
1. **Busy Working Parents (Primary User)**
   - *Needs:* Immediate answers on class timings that fit family schedules, clear tuition fee breakdowns without hidden charges, and a seamless booking process that takes under 2 minutes.
   - *Behavior:* Browsing primarily on mobile phones via WhatsApp links, social media, or word-of-mouth recommendations.
2. **Students (Secondary User)**
   - *Needs:* Understanding teacher approach, syllabus alignment (e.g., IGCSE, SPM, Primary/Secondary curriculum), and trial expectations.
3. **Tuition Centre Administrator / Tutors (Internal User)**
   - *Needs:* Qualified trial bookings with student level and subject pre-selected, reducing repetitive messaging and administrative workload.

---

## 3. Addressing the Identified Gaps

| Identified Gap | Analysis & Strategy | Proposed Resolution |
| :--- | :--- | :--- |
| **Deadline** | Unspecified target launch date. Need quick time-to-value to immediately relieve WhatsApp congestion. | **Phased Delivery Strategy:**<br>• **Phase 1 (Sprint 1 - 3 to 5 Days):** Core single-page responsive platform with Subject Explorer, Fee & Schedule Viewer, and WhatsApp-integrated Trial Booking.<br>• **Phase 2 (Post-Launch):** Student review showcase, automated Google Calendar / Sheets booking sync, and tutor introduction profiles. |
| **Budget** | Zero or minimal ongoing operational budget established. | **Zero-License, Ultra-Low-Overhead Architecture:**<br>• Built with pure Vanilla web technologies (HTML5, modern CSS, ES6 JavaScript) — **0 paid subscriptions or library bloat**.<br>• Free hosting on platforms like Cloudflare Pages, Vercel, or Netlify.<br>• Free database/lead capture via direct WhatsApp deep-links or Google Sheets webhook. |
| **Photos** | No official centre photography or facility pictures provided yet. | **Two-Tier Visual Asset Strategy:**<br>• **Immediate:** High-fidelity, customized educational visuals, modern SVG badges, and realistic photography prompts via image generation.<br>• **Production Transition:** Pre-defined image slots (Hero classroom banner, facility tour, small group tutor sessions) with recommended dimension guidelines for centre staff to drop in their own photos later. |

---

## 4. Key Functional Requirements
1. **Interactive Subject & Syllabus Catalog:**
   - Filter by Education Level (e.g., Primary 1-6, Lower Secondary, Upper Secondary / Exam Prep).
   - Display subjects (e.g., Mathematics, Additional Math, Science, Physics, Chemistry, Biology, English, Bahasa Melayu).
   - Detail syllabus highlights, learning outcomes, and class duration.
2. **Transparent Fee & Schedule Matrix:**
   - Real-time fee viewer per subject, package discounts (e.g., 3-subject bundles).
   - Weekly timetable schedule with weekday evenings and weekend morning/afternoon slots.
   - Class status indicator (e.g., "Available", "Few seats left", "Weekend slot").
3. **Free Trial Class Booking Flow:**
   - Stepped, mobile-friendly trial form: Student Name, Parent WhatsApp Number, Grade Level, Subject Preference, Preferred Time Slot.
   - Instant confirmation with dual routing:
     - Pre-filled WhatsApp message generator (one-tap send to centre admin).
     - Local lead state retention / webhook submission.
4. **FAQ & Instant WhatsApp Assist:**
   - Accordion answering top WhatsApp questions (Class sizes, replacement classes, materials provided, payment methods).
   - Persistent floating WhatsApp quick-action button with contextual inquiry message.

---

## 5. Success Metrics (KPIs)
- **70%+ Reduction** in basic "How much are fees?" and "What time is class?" administrative inquiries on WhatsApp.
- **2x Increase** in scheduled trial class conversions from website visitors.
- **100% Mobile Responsiveness** with sub-1.5s load time on mobile data connections.
