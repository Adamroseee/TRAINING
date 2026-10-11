/**
 * Unipact Tuition Academy - Declarative Data Store for React
 */

export const TUITION_DATA = {
  centre: {
    name: "Unipact Academy",
    shortName: "Unipact",
    tagline: "Small Groups • Master Tutors • Guaranteed Academic Confidence",
    subtagline: "Empowering Primary & Secondary students with structured learning and personalized attention.",
    whatsappNumber: "60123456789",
    displayPhone: "+60 12-345 6789",
    email: "admissions@unipact.edu.my",
    address: "Level 2, Wisma Unipact, Jalan Universiti, Bandar Utama, 47800 Petaling Jaya, Selangor",
    hours: "Monday - Friday: 2:00 PM - 9:30 PM | Saturday - Sunday: 8:30 AM - 6:30 PM",
    rating: "4.9",
    totalReviews: "380+",
    activeStudents: "450+",
    maxClassSize: 10
  },

  levels: [
    { id: "all", name: "All Levels", badge: "All" },
    { id: "primary", name: "Primary (Std 4 - 6)", badge: "Standard 4-6" },
    { id: "lower-sec", name: "Lower Secondary (Form 1 - 3)", badge: "Form 1-3" },
    { id: "upper-sec", name: "Upper Secondary (Form 4 - 5 / SPM)", badge: "SPM / IGCSE" }
  ],

  subjects: [
    {
      id: "math-f45",
      name: "Modern Mathematics",
      levelId: "upper-sec",
      grade: "Form 4 & 5 (SPM)",
      monthlyFee: 110,
      sessionsPerWeek: "1 session / week",
      duration: "1.5 hours",
      tutor: "Teacher Sarah Lim",
      tutorExp: "12 yrs experience • Ex-Examiner",
      features: ["Step-by-step KBAT technique mastery", "Past-year SPM question drilling", "Curated monthly topical notes"],
      schedule: [
        { day: "Saturday", time: "10:00 AM - 11:30 AM", seatsLeft: 3 },
        { day: "Tuesday", time: "7:30 PM - 9:00 PM", seatsLeft: 2 }
      ],
      badge: "Popular"
    },
    {
      id: "addmath-f45",
      name: "Additional Mathematics",
      levelId: "upper-sec",
      grade: "Form 4 & 5 (SPM)",
      monthlyFee: 125,
      sessionsPerWeek: "1 session / week",
      duration: "2 hours",
      tutor: "Dr. Kelvin Tan",
      tutorExp: "PhD in Applied Math • Olympiad Trainer",
      features: ["Formula breakdown from first principles", "Proven speed-solving shortcuts", "Small group 1-on-1 diagnostic checks"],
      schedule: [
        { day: "Sunday", time: "2:00 PM - 4:00 PM", seatsLeft: 4 },
        { day: "Thursday", time: "7:30 PM - 9:30 PM", seatsLeft: 1 }
      ],
      badge: "High Demand"
    },
    {
      id: "physics-f45",
      name: "Physics (SPM / IGCSE)",
      levelId: "upper-sec",
      grade: "Form 4 & 5",
      monthlyFee: 120,
      sessionsPerWeek: "1 session / week",
      duration: "1.5 hours",
      tutor: "Mr. Raymond Chong",
      tutorExp: "Former International School Physics Lead",
      features: ["Real-world visual demonstrations", "Paper 2 structured answering formulas", "High-frequency exam cheat-sheets"],
      schedule: [
        { day: "Saturday", time: "2:00 PM - 3:30 PM", seatsLeft: 5 },
        { day: "Wednesday", time: "7:30 PM - 9:00 PM", seatsLeft: 3 }
      ],
      badge: null
    },
    {
      id: "chemistry-f45",
      name: "Chemistry (SPM / IGCSE)",
      levelId: "upper-sec",
      grade: "Form 4 & 5",
      monthlyFee: 120,
      sessionsPerWeek: "1 session / week",
      duration: "1.5 hours",
      tutor: "Ms. Michelle Goh",
      tutorExp: "National Science Awardee • 9 yrs exp",
      features: ["Chemical equation simplification rules", "Practical paper & experimental tips", "Color-coded summary mindmaps"],
      schedule: [
        { day: "Sunday", time: "10:00 AM - 11:30 AM", seatsLeft: 2 },
        { day: "Friday", time: "7:30 PM - 9:00 PM", seatsLeft: 4 }
      ],
      badge: null
    },
    {
      id: "math-f13",
      name: "Mathematics Foundation",
      levelId: "lower-sec",
      grade: "Form 1 - 3 (UASA)",
      monthlyFee: 95,
      sessionsPerWeek: "1 session / week",
      duration: "1.5 hours",
      tutor: "Teacher Aina",
      tutorExp: "8 yrs experience • Fun engaging pacing",
      features: ["Algebraic bridge building", "Problem-solving word question breakdown", "Weekly mini-quizzes with instant feedback"],
      schedule: [
        { day: "Saturday", time: "11:45 AM - 1:15 PM", seatsLeft: 4 },
        { day: "Monday", time: "5:30 PM - 7:00 PM", seatsLeft: 6 }
      ],
      badge: null
    },
    {
      id: "science-f13",
      name: "Integrated Science",
      levelId: "lower-sec",
      grade: "Form 1 - 3 (UASA)",
      monthlyFee: 95,
      sessionsPerWeek: "1 session / week",
      duration: "1.5 hours",
      tutor: "Mr. Raymond Chong",
      tutorExp: "Hands-on conceptual coaching",
      features: ["Inquiry-based visual explanations", "Bilingual English/Malay keyword notes", "Exam answering framework"],
      schedule: [
        { day: "Sunday", time: "11:45 AM - 1:15 PM", seatsLeft: 3 },
        { day: "Wednesday", time: "5:30 PM - 7:00 PM", seatsLeft: 5 }
      ],
      badge: null
    },
    {
      id: "math-std46",
      name: "Primary Math Mastery",
      levelId: "primary",
      grade: "Standard 4 - 6",
      monthlyFee: 85,
      sessionsPerWeek: "1 session / week",
      duration: "1.25 hours",
      tutor: "Teacher Aina",
      tutorExp: "Certified Primary Math Specialist",
      features: ["Singapore Bar Model diagram technique", "Mental calculation confidence", "Homework guidance support"],
      schedule: [
        { day: "Saturday", time: "9:00 AM - 10:15 AM", seatsLeft: 2 },
        { day: "Tuesday", time: "5:30 PM - 6:45 PM", seatsLeft: 4 }
      ],
      badge: "Great for Foundations"
    },
    {
      id: "science-std46",
      name: "Primary Science & STEM",
      levelId: "primary",
      grade: "Standard 4 - 6",
      monthlyFee: 85,
      sessionsPerWeek: "1 session / week",
      duration: "1.25 hours",
      tutor: "Ms. Michelle Goh",
      tutorExp: "Active STEM learning advocate",
      features: ["Curiosity-sparking experiments", "Scientific method reasoning", "Bilingual vocabulary builder"],
      schedule: [
        { day: "Sunday", time: "9:00 AM - 10:15 AM", seatsLeft: 5 },
        { day: "Thursday", time: "5:30 PM - 6:45 PM", seatsLeft: 3 }
      ],
      badge: null
    },
    {
      id: "english-all",
      name: "English Academic Writing & CEFR",
      levelId: "lower-sec",
      grade: "Form 1 - 5",
      monthlyFee: 100,
      sessionsPerWeek: "1 session / week",
      duration: "1.5 hours",
      tutor: "Madam Catherine Ross",
      tutorExp: "Cambridge CELTA Certified • 15 yrs exp",
      features: ["Advanced essay structuring & vocabulary", "Reading comprehension speed reading", "Oral speaking confidence clinics"],
      schedule: [
        { day: "Saturday", time: "3:45 PM - 5:15 PM", seatsLeft: 3 },
        { day: "Friday", time: "5:30 PM - 7:00 PM", seatsLeft: 4 }
      ],
      badge: "CEFR Aligned"
    }
  ],

  bundleDiscounts: [
    { count: 1, discount: 0, label: "Single Subject (Normal Fee)" },
    { count: 2, discount: 0.10, label: "2 Subjects (Save 10%)" },
    { count: 3, discount: 0.15, label: "3 Subjects (Save 15%)" },
    { count: 4, discount: 0.20, label: "4+ Subjects (Save 20%)" }
  ],

  faqs: [
    {
      q: "What actually happens during the 60-Minute Free Trial Class?",
      a: "Your child joins an active class for their exact grade level. The tutor observes their current understanding, explains core topic concepts, and provides a complimentary 10-minute diagnostic feedback report to parents after the class."
    },
    {
      q: "Are tuition fees charged on a monthly or term basis? Any hidden deposits?",
      a: "All fees are strictly monthly with no hidden registrations, test charges, or term lock-ins! Printed physical revision notes, topical worksheets, and past-year practice sets are 100% included in the displayed fee."
    },
    {
      q: "What if my child falls sick or misses a class due to school activities?",
      a: "We offer flexible replacement classes! You can book an alternative slot within the same week or access the recorded hybrid session and tutor recap notes at no extra charge."
    },
    {
      q: "What is the maximum class size?",
      a: "We cap all physical classes strictly at 10 students maximum (averaging 6–8 students). This ensures the tutor can address every student's individual questions during every single class."
    },
    {
      q: "Do you cover both KSSR / KSSM (Government) and IGCSE syllabi?",
      a: "Yes! We run dedicated classes tailored specifically to Malaysian KSSR / KSSM curriculum (including latest UASA and SPM formats) as well as Cambridge IGCSE streams for Science and Mathematics."
    },
    {
      q: "How soon can we start after booking a trial?",
      a: "Trials are scheduled within 2 to 5 days depending on the next available class slot. Once you submit the trial booking, our academic coordinator will WhatsApp you within 2 business hours to confirm your seat."
    }
  ],

  testimonials: [
    {
      quote: "Before Unipact, Adam struggled with Add Math and scored 38%. Within 4 months of Teacher Sarah's small group coaching, he got an A in his SPM trials! The clear fees and easy trial booking made choosing them a no-brainer.",
      parent: "Puan Noraini K.",
      student: "Mother of Adam (Form 5 SPM)",
      verified: "Verified Parent"
    },
    {
      quote: "I used to spend so much time messaging centres on WhatsApp asking for timetables. Unipact's platform showed all weekend slots upfront. We booked a trial on Friday and started class that Saturday!",
      parent: "Mr. David Tan",
      student: "Father of Chloe (Standard 6)",
      verified: "Verified Parent"
    },
    {
      quote: "The 10-student cap makes a huge difference. In her previous big tuition centre with 40 kids, my daughter was too shy to ask questions. Here, the tutor checks on her work every 15 minutes.",
      parent: "Mrs. Shanthi Mohan",
      student: "Mother of Divya (Form 3)",
      verified: "Verified Parent"
    }
  ]
};
