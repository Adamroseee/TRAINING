import React, { useState, useMemo } from 'react';
import { TUITION_DATA } from './data/tuitionData';

export default function App() {
  // State: Filter for Subject Catalog
  const [selectedLevel, setSelectedLevel] = useState('all');

  // State: Fee Calculator Selected Subjects
  const [calcSelectedSubjectIds, setCalcSelectedSubjectIds] = useState(['math-f45', 'addmath-f45']);

  // State: Timetable Selected Day
  const [selectedDay, setSelectedDay] = useState('All Days');

  // State: FAQ Active Index
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);

  // State: Trial Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [bookingForm, setBookingForm] = useState({
    parentName: '',
    phone: '',
    studentName: '',
    grade: 'Form 5 (SPM)',
    subjectId: 'math-f45',
    timeSlot: ''
  });

  // Filtered Subjects
  const filteredSubjects = useMemo(() => {
    if (selectedLevel === 'all') return TUITION_DATA.subjects;
    return TUITION_DATA.subjects.filter(s => s.levelId === selectedLevel);
  }, [selectedLevel]);

  // Fee Calculator Computations
  const calcResults = useMemo(() => {
    const selected = TUITION_DATA.subjects.filter(s => calcSelectedSubjectIds.includes(s.id));
    const count = selected.length;
    const subtotal = selected.reduce((sum, s) => sum + s.monthlyFee, 0);

    let discountRate = 0;
    if (count === 2) discountRate = 0.10;
    else if (count === 3) discountRate = 0.15;
    else if (count >= 4) discountRate = 0.20;

    const discountAmount = Math.round(subtotal * discountRate);
    const total = subtotal - discountAmount;

    return { count, subtotal, discountRate, discountAmount, total };
  }, [calcSelectedSubjectIds]);

  // Timetable Filtered Rows
  const timetableRows = useMemo(() => {
    const rows = [];
    TUITION_DATA.subjects.forEach(subject => {
      subject.schedule.forEach(slot => {
        let matches = false;
        if (selectedDay === 'All Days') matches = true;
        else if (selectedDay === 'Weekdays (Mon-Fri)') {
          matches = !['Saturday', 'Sunday'].includes(slot.day);
        } else {
          matches = slot.day.toLowerCase() === selectedDay.toLowerCase();
        }

        if (matches) {
          rows.push({
            subjectName: subject.name,
            grade: subject.grade,
            day: slot.day,
            time: slot.time,
            seatsLeft: slot.seatsLeft,
            subjectId: subject.id,
            tutor: subject.tutor
          });
        }
      });
    });
    return rows;
  }, [selectedDay]);

  // Modal Handlers
  const handleOpenModal = (preselectedSubjectId = '', preselectedSlot = '') => {
    const initialSubject = preselectedSubjectId || TUITION_DATA.subjects[0].id;
    const subjObj = TUITION_DATA.subjects.find(s => s.id === initialSubject);
    const initialSlot = preselectedSlot || (subjObj ? `${subjObj.schedule[0].day} ${subjObj.schedule[0].time}` : '');

    setBookingForm(prev => ({
      ...prev,
      subjectId: initialSubject,
      timeSlot: initialSlot
    }));
    setModalStep(1);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleToggleCalcSubject = (id) => {
    setCalcSelectedSubjectIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (!bookingForm.parentName.trim() || !bookingForm.phone.trim() || !bookingForm.studentName.trim()) {
      alert('Please fill in your name, WhatsApp phone number, and student name.');
      return;
    }
    setModalStep(2);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.subjectId || !bookingForm.timeSlot) {
      alert('Please select both a subject and an available time slot.');
      return;
    }
    setModalStep(3);
  };

  const selectedSubjectObj = useMemo(() => {
    return TUITION_DATA.subjects.find(s => s.id === bookingForm.subjectId) || TUITION_DATA.subjects[0];
  }, [bookingForm.subjectId]);

  const whatsappUrl = useMemo(() => {
    const msg = encodeURIComponent(
      `Hello Unipact Academy! I would like to confirm my Free Trial class booking.\n\n` +
      `👤 Student: ${bookingForm.studentName}\n` +
      `📚 Level: ${bookingForm.grade}\n` +
      `📖 Subject: ${selectedSubjectObj.name}\n` +
      `⏰ Preferred Slot: ${bookingForm.timeSlot}\n` +
      `📞 Parent: ${bookingForm.parentName} (${bookingForm.phone})\n\n` +
      `Please confirm the seat availability.`
    );
    return `https://wa.me/${TUITION_DATA.centre.whatsappNumber}?text=${msg}`;
  }, [bookingForm, selectedSubjectObj]);

  const getInitials = (name) => {
    return name.replace(/^(Teacher|Dr\.|Mr\.|Ms\.|Madam)\s+/i, '')
      .split(' ')
      .map(p => p[0])
      .slice(0, 2)
      .join('');
  };

  return (
    <div className="tuition-app">
      {/* Top Announcement Bar */}
      <div className="announcement-bar" id="announcement-bar">
        <span>✨ <strong>Term Intake Open:</strong> Limited to 10 students per class. Book your complimentary 60-minute diagnostic trial!</span>
        <button 
          type="button" 
          onClick={() => handleOpenModal()} 
          style={{ background: 'none', border: 'none', color: 'var(--accent-gold-light)', textDecoration: 'underline', fontWeight: 600, cursor: 'pointer', marginLeft: '0.5rem' }}
        >
          Book Free Trial &rarr;
        </button>
      </div>

      {/* Sticky Header */}
      <header className="site-header" id="site-header">
        <div className="container nav-wrapper">
          <a href="#" className="brand-logo" id="brand-logo" aria-label="Unipact Academy Home">
            <div className="logo-badge">U</div>
            <span>Unipact Academy</span>
          </a>

          <nav aria-label="Main Navigation">
            <ul className="nav-links" id="main-nav-links">
              <li><a href="#subjects-section">Subjects</a></li>
              <li><a href="#calculator-section">Fee Calculator</a></li>
              <li><a href="#schedule-section">Timetable</a></li>
              <li><a href="#facility-section">Why Us</a></li>
              <li><a href="#faq-section">Parent FAQs</a></li>
            </ul>
          </nav>

          <div className="nav-cta-group">
            <a 
              href={`https://wa.me/${TUITION_DATA.centre.whatsappNumber}?text=${encodeURIComponent('Hi Unipact Academy, I would like to inquire about class times and fees.')}`}
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-whatsapp btn-sm" 
              id="btn-header-whatsapp"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 2.08.835 3.22.835h.005c3.179 0 5.765-2.586 5.766-5.766 0-3.18-2.587-5.766-5.77-5.766zm9.969 5.766c0 5.514-4.486 10-10 10-1.741 0-3.38-.449-4.814-1.235l-5.186 1.357 1.385-5.056c-.876-1.488-1.385-3.226-1.385-5.066 0-5.514 4.486-10 10-10s10 4.486 10 10z"/>
              </svg>
              <span>WhatsApp Us</span>
            </a>
            <button 
              type="button" 
              className="btn btn-primary" 
              onClick={() => handleOpenModal()} 
              id="btn-header-trial"
            >
              Book Free Trial
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section" id="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span>🎓 Academic Excellence Without The Stress</span>
            </div>
            <h1 className="hero-title">
              Stop Guessing Fees & Schedules.<br />
              <span className="highlight">See Everything Upfront.</span>
            </h1>
            <p className="hero-description">
              Tired of endless WhatsApp messages just to get a timetable? Browse our subjects, view transparent monthly fees with materials included, and book a free 60-minute trial class with our master tutors.
            </p>

            <div className="hero-actions">
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={() => handleOpenModal()} 
                id="btn-hero-book-trial"
              >
                <span>Book 60-Min Free Trial</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
              <a href="#calculator-section" className="btn btn-secondary" id="btn-hero-calc">
                Calculate Tuition Fees
              </a>
            </div>

            <div className="hero-trust-metrics">
              <div className="metric-item">
                <span className="metric-number">Max {TUITION_DATA.centre.maxClassSize}</span>
                <span className="metric-label">Students / Class</span>
              </div>
              <div className="metric-item">
                <span className="metric-number">RM 0</span>
                <span className="metric-label">Hidden Deposits or Fees</span>
              </div>
              <div className="metric-item">
                <span className="metric-number">{TUITION_DATA.centre.rating} / 5.0</span>
                <span className="metric-label">Parent Rating ({TUITION_DATA.centre.totalReviews} Reviews)</span>
              </div>
            </div>
          </div>

          <div className="hero-media-card">
            <div className="hero-image-frame">
              <img 
                src="assets/images/hero-classroom.jpg" 
                alt="Active small group study at Unipact Academy" 
                width="1200" 
                height="675" 
                id="hero-main-img" 
              />
            </div>
            <div className="floating-badge badge-trial">
              <div className="badge-icon">✓</div>
              <div>
                <div className="badge-text-title">100% Free Trial Class</div>
                <div className="badge-text-sub">Includes Diagnostic Evaluation Report</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subject Catalog Section */}
      <section className="section section-alt" id="subjects-section">
        <div className="container">
          <div className="section-header">
            <div className="section-pill">Syllabus & Offerings</div>
            <h2 className="section-title">Explore Our Subjects & Transparent Fees</h2>
            <p className="section-desc">Select your child's education level to see subjects, expert tutors, duration, and all-inclusive monthly pricing.</p>
          </div>

          {/* Level Filter Tabs */}
          <div className="filter-tabs-wrapper" id="subject-filter-tabs">
            {TUITION_DATA.levels.map(lvl => (
              <button
                key={lvl.id}
                type="button"
                className={`filter-tab ${selectedLevel === lvl.id ? 'active' : ''}`}
                onClick={() => setSelectedLevel(lvl.id)}
              >
                {lvl.name}
              </button>
            ))}
          </div>

          {/* Subjects Grid */}
          <div className="subjects-grid" id="subjects-grid">
            {filteredSubjects.map(subject => {
              const levelObj = TUITION_DATA.levels.find(l => l.id === subject.levelId);
              return (
                <article key={subject.id} className="subject-card" data-subject-id={subject.id}>
                  <div className="card-top">
                    <span className="subject-badge">{levelObj ? levelObj.badge : 'All'}</span>
                    {subject.badge && <span className="ribbon">{subject.badge}</span>}
                  </div>

                  <h3 className="subject-name">{subject.name}</h3>
                  <p className="subject-grade">{subject.grade} • {subject.duration} / session</p>

                  <div className="price-row">
                    <span className="price-currency">RM</span>
                    <span className="price-amount">{subject.monthlyFee}</span>
                    <span className="price-period">/ month</span>
                    <span className="price-all-inclusive">Notes Included</span>
                  </div>

                  <ul className="subject-features">
                    {subject.features.map((f, idx) => (
                      <li key={idx}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="tutor-snippet">
                    <div className="tutor-avatar-mini">{getInitials(subject.tutor)}</div>
                    <div className="tutor-info-mini">
                      <h4>{subject.tutor}</h4>
                      <p>{subject.tutorExp}</p>
                    </div>
                  </div>

                  <div className="card-actions">
                    <button 
                      type="button" 
                      className="btn btn-primary btn-book-trial"
                      onClick={() => handleOpenModal(subject.id)}
                    >
                      Book Free Trial Class
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fee Calculator Section */}
      <section className="section" id="calculator-section">
        <div className="container">
          <div className="section-header">
            <div className="section-pill">Transparent Pricing</div>
            <h2 className="section-title">Tuition Fee & Multi-Subject Calculator</h2>
            <p className="section-desc">Select the subjects you're interested in. Our automatic bundle discounts will calculate your exact monthly investment instantly.</p>
          </div>

          <div className="calc-card" id="fee-calculator-widget">
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Select Subject Combinations:</h3>
              <div className="calc-selector-list" id="calc-subjects-list">
                {TUITION_DATA.subjects.map(s => {
                  const isChecked = calcSelectedSubjectIds.includes(s.id);
                  return (
                    <label 
                      key={s.id} 
                      className={`calc-item-label ${isChecked ? 'selected' : ''}`}
                      htmlFor={`calc-check-${s.id}`}
                    >
                      <div className="calc-checkbox-group">
                        <input 
                          type="checkbox" 
                          id={`calc-check-${s.id}`} 
                          checked={isChecked}
                          onChange={() => handleToggleCalcSubject(s.id)}
                        />
                        <span className="calc-subject-title">
                          {s.name} <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: '0.85rem' }}>({s.grade})</span>
                        </span>
                      </div>
                      <span className="calc-subject-fee">RM {s.monthlyFee}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="calc-summary-box">
              <h3 className="calc-summary-title">Monthly Fee Summary</h3>

              <div className="calc-row">
                <span>Enrolled Subjects:</span>
                <span style={{ color: '#FFFFFF', fontWeight: 600 }}>{calcResults.count} Subject{calcResults.count === 1 ? '' : 's'}</span>
              </div>

              <div className="calc-row">
                <span>Standard Subtotal:</span>
                <span style={{ color: '#FFFFFF', fontWeight: 600 }}>RM {calcResults.subtotal}</span>
              </div>

              {calcResults.discountRate > 0 && (
                <div className="calc-row" style={{ color: 'var(--accent-gold-light)' }}>
                  <span>
                    Multi-Subject Savings
                    <span className="calc-discount-badge">{Math.round(calcResults.discountRate * 100)}% OFF</span>
                  </span>
                  <span style={{ fontWeight: 700 }}>- RM {calcResults.discountAmount}</span>
                </div>
              )}

              <div className="calc-row">
                <span>Materials & Topical Notes:</span>
                <span style={{ color: 'var(--accent-emerald-light)', fontWeight: 700 }}>FREE (Included)</span>
              </div>

              <div className="calc-total-row">
                <div>
                  <div className="calc-total-label">Total Monthly:</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>Billed monthly • No contract lock-in</div>
                </div>
                <div className="calc-total-val">RM {calcResults.total}</div>
              </div>

              <div style={{ marginTop: '1.75rem' }}>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  style={{ width: '100%' }}
                  onClick={() => handleOpenModal()}
                >
                  Book a Trial Before Enrolling
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Timetable Schedule Section */}
      <section className="section section-alt" id="schedule-section">
        <div className="container">
          <div className="section-header">
            <div className="section-pill">Weekly Slots</div>
            <h2 className="section-title">Class Times & Live Seat Availability</h2>
            <p className="section-desc">Convenient weekend morning/afternoon and weekday evening slots designed around busy family schedules.</p>
          </div>

          <div className="schedule-nav" id="schedule-days-nav">
            {['All Days', 'Saturday', 'Sunday', 'Weekdays (Mon-Fri)'].map(d => (
              <button
                key={d}
                type="button"
                className={`schedule-day-btn ${selectedDay === d ? 'active' : ''}`}
                onClick={() => setSelectedDay(d)}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="timetable-container">
            <div style={{ overflowX: 'auto' }}>
              <table className="timetable-table" id="timetable-table">
                <thead>
                  <tr>
                    <th>Subject & Grade</th>
                    <th>Day</th>
                    <th>Time Slot</th>
                    <th>Lead Tutor</th>
                    <th>Seat Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody id="timetable-body">
                  {timetableRows.map((r, idx) => (
                    <tr key={idx}>
                      <td>
                        <strong>{r.subjectName}</strong>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{r.grade}</div>
                      </td>
                      <td><strong>{r.day}</strong></td>
                      <td>{r.time}</td>
                      <td>{r.tutor}</td>
                      <td>
                        <span className={`seat-status-pill ${r.seatsLeft <= 2 ? 'seat-limited' : 'seat-open'}`}>
                          {r.seatsLeft <= 2 ? `Only ${r.seatsLeft} seats left!` : `${r.seatsLeft} slots open`}
                        </span>
                      </td>
                      <td>
                        <button 
                          type="button" 
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleOpenModal(r.subjectId, `${r.day} ${r.time}`)}
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Facility & Learning Environment */}
      <section className="section" id="facility-section">
        <div className="container facility-grid">
          <div className="facility-images-collage">
            <div className="facility-img-card">
              <img src="assets/images/stem-tutoring.jpg" alt="Dedicated STEM and Science tutoring at Unipact Academy" loading="lazy" />
            </div>
            <div className="facility-img-card">
              <img src="assets/images/study-facility.jpg" alt="Modern study facility and reception lounge at Unipact Academy" loading="lazy" />
            </div>
          </div>

          <div>
            <div className="section-pill">Why Parents Choose Us</div>
            <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>A Learning Environment Built For Confidence</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '2rem' }}>
              We believe high marks are a natural outcome when students genuinely understand the underlying principles instead of blindly memorizing answers.
            </p>

            <div className="facility-features-list">
              <div className="facility-item">
                <div className="facility-icon-circle">🎯</div>
                <div className="facility-content">
                  <h3>Strict 10-Student Cap</h3>
                  <p>No mega-lecture halls. Every student has a voice, receives individualized error reviews, and gets direct guidance every single lesson.</p>
                </div>
              </div>

              <div className="facility-item">
                <div className="facility-icon-circle">📚</div>
                <div className="facility-content">
                  <h3>Proprietary Exam Notes & KBAT Framework</h3>
                  <p>Topical exam-oriented notes, model answers, and systematic answering frameworks designed by former government examiners.</p>
                </div>
              </div>

              <div className="facility-item">
                <div className="facility-icon-circle">🔄</div>
                <div className="facility-content">
                  <h3>Flexible Replacement Classes</h3>
                  <p>School competition or fever? Attend an alternate slot within the week or review recorded hybrid lesson recaps with zero penalties.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parent Testimonials Section */}
      <section className="section section-alt" id="testimonials-section">
        <div className="container">
          <div className="section-header">
            <div className="section-pill">Parent Reviews</div>
            <h2 className="section-title">Real Results from Real Families</h2>
            <p className="section-desc">Over {TUITION_DATA.centre.totalReviews} parents trust Unipact Academy to transform their children's academic performance and study confidence.</p>
          </div>

          <div className="testimonials-grid">
            {TUITION_DATA.testimonials.map((t, idx) => (
              <article key={idx} className="testimonial-card">
                <div>
                  <div className="test-stars">★★★★★</div>
                  <p className="test-quote">"{t.quote}"</p>
                </div>
                <div className="test-author">
                  <div>
                    <div className="author-name">{t.parent}</div>
                    <div className="author-child">{t.student}</div>
                  </div>
                  <span className="test-badge">{t.verified}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="section" id="faq-section">
        <div className="container">
          <div className="section-header">
            <div className="section-pill">Got Questions?</div>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-desc">Quick answers to the most common questions parents ask our team.</p>
          </div>

          <div className="faq-container" id="faq-accordion">
            {TUITION_DATA.faqs.map((faq, idx) => {
              const isActive = activeFaqIndex === idx;
              return (
                <div key={idx} className={`faq-item ${isActive ? 'active' : ''}`}>
                  <button 
                    type="button" 
                    className="faq-question-btn" 
                    onClick={() => setActiveFaqIndex(isActive ? -1 : idx)}
                    aria-expanded={isActive}
                  >
                    <span>{faq.q}</span>
                    <span className="faq-toggle-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </button>
                  <div className="faq-answer-panel">
                    <p className="faq-answer-text">{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer" id="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h3>{TUITION_DATA.centre.name}</h3>
              <p>{TUITION_DATA.centre.tagline}</p>
              <p style={{ fontSize: '0.85rem', color: '#64748B' }}>📍 {TUITION_DATA.centre.address}</p>
            </div>

            <div className="footer-col">
              <h4>Navigation</h4>
              <ul className="footer-links">
                <li><a href="#subjects-section">Subject Catalog</a></li>
                <li><a href="#calculator-section">Fee Calculator</a></li>
                <li><a href="#schedule-section">Class Timetable</a></li>
                <li><a href="#faq-section">Parent FAQs</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Curricula Covered</h4>
              <ul className="footer-links">
                <li><a href="#subjects-section">Primary KSSR (Standard 4 - 6)</a></li>
                <li><a href="#subjects-section">Lower Secondary (UASA Form 1 - 3)</a></li>
                <li><a href="#subjects-section">Upper Secondary SPM (Form 4 & 5)</a></li>
                <li><a href="#subjects-section">Cambridge IGCSE Science & Math</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Direct Contacts</h4>
              <p style={{ fontSize: '0.88rem', marginBottom: '0.5rem' }}>📞 Phone: {TUITION_DATA.centre.displayPhone}</p>
              <p style={{ fontSize: '0.88rem', marginBottom: '0.5rem' }}>💬 WhatsApp: Available Daily 8am - 10pm</p>
              <p style={{ fontSize: '0.88rem', marginBottom: '1.25rem' }}>✉️ {TUITION_DATA.centre.email}</p>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => handleOpenModal()}>
                Book Free Trial Class
              </button>
            </div>
          </div>

          <div className="footer-bottom">
            <div>&copy; 2026 {TUITION_DATA.centre.name}. All rights reserved. Transparent education for every student.</div>
            <div>Built with React & Vite • Zero trackers</div>
          </div>
        </div>
      </footer>

      {/* Free Trial Modal */}
      {isModalOpen && (
        <div className="modal-overlay open" role="dialog" aria-modal="true" onClick={(e) => {
          if (e.target.classList.contains('modal-overlay')) handleCloseModal();
        }}>
          <div className="modal-card">
            <div className="modal-header">
              <div>
                <h2 className="modal-title">Book 60-Minute Free Trial</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Zero obligations • Includes diagnostic evaluation feedback</p>
              </div>
              <button type="button" className="modal-close-btn" onClick={handleCloseModal} aria-label="Close booking modal">&times;</button>
            </div>

            <div className="modal-steps-indicator">
              <div className={`step-indicator-item ${modalStep === 1 ? 'active' : 'completed'}`}>
                <span className="step-num">1</span>
                <span>Contact Details</span>
              </div>
              <div className={`step-indicator-item ${modalStep === 2 ? 'active' : (modalStep > 2 ? 'completed' : '')}`}>
                <span className="step-num">2</span>
                <span>Subject & Slot</span>
              </div>
              <div className={`step-indicator-item ${modalStep === 3 ? 'active completed' : ''}`}>
                <span className="step-num">3</span>
                <span>Confirmation</span>
              </div>
            </div>

            <div className="modal-body">
              {/* Step 1 */}
              {modalStep === 1 && (
                <form onSubmit={handleStep1Submit}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="input-parent-name">Parent / Guardian Full Name *</label>
                    <input 
                      type="text" 
                      id="input-parent-name" 
                      className="form-input" 
                      placeholder="e.g. Noraini binti Kamaruddin" 
                      value={bookingForm.parentName}
                      onChange={(e) => setBookingForm({ ...bookingForm, parentName: e.target.value })}
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="input-parent-phone">WhatsApp Mobile Number *</label>
                    <input 
                      type="tel" 
                      id="input-parent-phone" 
                      className="form-input" 
                      placeholder="e.g. 012-3456789" 
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      required 
                    />
                    <p className="form-help">We will message you on WhatsApp to confirm your trial seat.</p>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="input-student-name">Student's First Name *</label>
                      <input 
                        type="text" 
                        id="input-student-name" 
                        className="form-input" 
                        placeholder="e.g. Adam" 
                        value={bookingForm.studentName}
                        onChange={(e) => setBookingForm({ ...bookingForm, studentName: e.target.value })}
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="input-student-grade">Current Grade Level *</label>
                      <select 
                        id="input-student-grade" 
                        className="form-select"
                        value={bookingForm.grade}
                        onChange={(e) => setBookingForm({ ...bookingForm, grade: e.target.value })}
                      >
                        <option value="Standard 4">Standard 4</option>
                        <option value="Standard 5">Standard 5</option>
                        <option value="Standard 6">Standard 6</option>
                        <option value="Form 1">Form 1 (UASA)</option>
                        <option value="Form 2">Form 2 (UASA)</option>
                        <option value="Form 3">Form 3 (UASA)</option>
                        <option value="Form 4 (SPM)">Form 4 (SPM)</option>
                        <option value="Form 5 (SPM)">Form 5 (SPM)</option>
                        <option value="IGCSE Year 10-11">IGCSE Year 10 / 11</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" className="btn btn-primary">
                      <span>Next: Choose Subject & Slot</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </div>
                </form>
              )}

              {/* Step 2 */}
              {modalStep === 2 && (
                <form onSubmit={handleFinalSubmit}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="modal-select-subject">Select Subject for Trial *</label>
                    <select 
                      id="modal-select-subject" 
                      className="form-select"
                      value={bookingForm.subjectId}
                      onChange={(e) => {
                        const newSubId = e.target.value;
                        const subj = TUITION_DATA.subjects.find(s => s.id === newSubId);
                        const defaultSlot = subj ? `${subj.schedule[0].day} ${subj.schedule[0].time}` : '';
                        setBookingForm({ ...bookingForm, subjectId: newSubId, timeSlot: defaultSlot });
                      }}
                    >
                      {TUITION_DATA.subjects.map(s => (
                        <option key={s.id} value={s.id}>{s.name} ({s.grade})</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="modal-select-slot">Preferred Day & Time Slot *</label>
                    <select 
                      id="modal-select-slot" 
                      className="form-select"
                      value={bookingForm.timeSlot}
                      onChange={(e) => setBookingForm({ ...bookingForm, timeSlot: e.target.value })}
                    >
                      {selectedSubjectObj.schedule.map((slot, i) => (
                        <option key={i} value={`${slot.day} ${slot.time}`}>
                          {slot.day} {slot.time} ({slot.seatsLeft} seats left)
                        </option>
                      ))}
                    </select>
                    <p className="form-help">Classes are held at our physical centre or live interactive hybrid room.</p>
                  </div>

                  <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
                    <button type="button" className="btn btn-secondary" onClick={() => setModalStep(1)}>
                      &larr; Back
                    </button>
                    <button type="submit" className="btn btn-primary">
                      <span>Confirm & Generate WhatsApp</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </div>
                </form>
              )}

              {/* Step 3 */}
              {modalStep === 3 && (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-full)', background: 'var(--accent-emerald-soft)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', margin: '0 auto 1.25rem auto' }}>
                    ✓
                  </div>
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>Trial Reservation Prepared!</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                    Click below to send your pre-formatted WhatsApp message directly to our academic team to instantly secure your seat:
                  </p>

                  <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1.5rem', textAlign: 'left' }}>
                    <p><strong>Student:</strong> {bookingForm.studentName} ({bookingForm.grade})</p>
                    <p><strong>Subject:</strong> {selectedSubjectObj.name}</p>
                    <p><strong>Session Slot:</strong> {bookingForm.timeSlot}</p>
                    <p><strong>Parent Contact:</strong> {bookingForm.parentName} ({bookingForm.phone})</p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <a 
                      href={whatsappUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-whatsapp" 
                      style={{ fontSize: '1.05rem', padding: '0.9rem' }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 2.08.835 3.22.835h.005c3.179 0 5.765-2.586 5.766-5.766 0-3.18-2.587-5.766-5.77-5.766zm9.969 5.766c0 5.514-4.486 10-10 10-1.741 0-3.38-.449-4.814-1.235l-5.186 1.357 1.385-5.056c-.876-1.488-1.385-3.226-1.385-5.066 0-5.514 4.486-10 10-10s10 4.486 10 10z"/>
                      </svg>
                      <span>Send Confirmation on WhatsApp</span>
                    </a>
                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                      Close Window
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Quick Action */}
      <a 
        href={`https://wa.me/${TUITION_DATA.centre.whatsappNumber}?text=${encodeURIComponent('Hi Unipact Academy, I have an inquiry regarding subject fees and class schedule for my child.')}`}
        className="floating-whatsapp-btn" 
        id="floating-whatsapp" 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label="Chat with Tuition Centre on WhatsApp"
      >
        <span className="floating-badge-ping"></span>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 2.08.835 3.22.835h.005c3.179 0 5.765-2.586 5.766-5.766 0-3.18-2.587-5.766-5.77-5.766zm9.969 5.766c0 5.514-4.486 10-10 10-1.741 0-3.38-.449-4.814-1.235l-5.186 1.357 1.385-5.056c-.876-1.488-1.385-3.226-1.385-5.066 0-5.514 4.486-10 10-10s10 4.486 10 10z"/>
        </svg>
      </a>

      {/* Sticky Mobile Action Bar */}
      <div className="mobile-sticky-cta" id="mobile-sticky-bar">
        <a 
          href={`https://wa.me/${TUITION_DATA.centre.whatsappNumber}?text=${encodeURIComponent('Hi Unipact Academy, I would like to inquire about tuition classes.')}`}
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-whatsapp" 
          style={{ flex: 1 }}
        >
          💬 WhatsApp
        </a>
        <button 
          type="button" 
          className="btn btn-primary" 
          style={{ flex: 1.5 }}
          onClick={() => handleOpenModal()}
        >
          Book Free Trial
        </button>
      </div>
    </div>
  );
}
