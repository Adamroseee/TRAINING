import { TUITION_DATA } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  initSubjectsCatalog();
  initFeeCalculator();
  initTimetable();
  initFAQAccordion();
  initTrialModal();
  initWhatsAppFloating();
});

/* -------------------------------------------------------------------------
   1. Subject Catalog & Level Filter
   ------------------------------------------------------------------------- */
function initSubjectsCatalog() {
  const filterContainer = document.getElementById('subject-filter-tabs');
  const gridContainer = document.getElementById('subjects-grid');

  if (!filterContainer || !gridContainer) return;

  // Render filter tabs
  filterContainer.innerHTML = TUITION_DATA.levels.map((lvl, index) => `
    <button type="button" class="filter-tab ${index === 0 ? 'active' : ''}" data-level="${lvl.id}">
      ${lvl.name}
    </button>
  `).join('');

  // Initial render
  renderSubjects('all');

  // Event listener for filtering
  filterContainer.addEventListener('click', (e) => {
    const tab = e.target.closest('.filter-tab');
    if (!tab) return;

    filterContainer.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
    tab.classList.add('active');

    const levelId = tab.dataset.level;
    renderSubjects(levelId);
  });
}

function renderSubjects(levelId) {
  const gridContainer = document.getElementById('subjects-grid');
  if (!gridContainer) return;

  const filtered = levelId === 'all' 
    ? TUITION_DATA.subjects 
    : TUITION_DATA.subjects.filter(s => s.levelId === levelId);

  gridContainer.innerHTML = filtered.map(subject => {
    const levelObj = TUITION_DATA.levels.find(l => l.id === subject.levelId);
    return `
      <article class="subject-card" data-subject-id="${subject.id}">
        <div class="card-top">
          <span class="subject-badge">${levelObj ? levelObj.badge : 'All'}</span>
          ${subject.badge ? `<span class="ribbon">${subject.badge}</span>` : ''}
        </div>

        <h3 class="subject-name">${subject.name}</h3>
        <p class="subject-grade">${subject.grade} • ${subject.duration} / session</p>

        <div class="price-row">
          <span class="price-currency">RM</span>
          <span class="price-amount">${subject.monthlyFee}</span>
          <span class="price-period">/ month</span>
          <span class="price-all-inclusive">Notes Included</span>
        </div>

        <ul class="subject-features">
          ${subject.features.map(f => `
            <li>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>${f}</span>
            </li>
          `).join('')}
        </ul>

        <div class="tutor-snippet">
          <div class="tutor-avatar-mini">${getInitials(subject.tutor)}</div>
          <div class="tutor-info-mini">
            <h4>${subject.tutor}</h4>
            <p>${subject.tutorExp}</p>
          </div>
        </div>

        <div class="card-actions">
          <button type="button" class="btn btn-primary btn-book-trial" data-subject-id="${subject.id}">
            Book Free Trial Class
          </button>
        </div>
      </article>
    `;
  }).join('');

  // Attach booking buttons
  gridContainer.querySelectorAll('.btn-book-trial').forEach(btn => {
    btn.addEventListener('click', () => {
      const subId = btn.dataset.subjectId;
      openBookingModal(subId);
    });
  });
}

function getInitials(name) {
  return name.replace(/^(Teacher|Dr\.|Mr\.|Ms\.|Madam)\s+/i, '')
    .split(' ')
    .map(p => p[0])
    .slice(0, 2)
    .join('');
}

/* -------------------------------------------------------------------------
   2. Interactive Fee Calculator with Bundle Discounts
   ------------------------------------------------------------------------- */
function initFeeCalculator() {
  const listContainer = document.getElementById('calc-subjects-list');
  const countEl = document.getElementById('calc-selected-count');
  const subtotalEl = document.getElementById('calc-subtotal-val');
  const discountRow = document.getElementById('calc-discount-row');
  const discountValEl = document.getElementById('calc-discount-val');
  const discountPercentBadge = document.getElementById('calc-discount-badge');
  const totalValEl = document.getElementById('calc-total-val');

  if (!listContainer) return;

  // Render subject checkboxes
  listContainer.innerHTML = TUITION_DATA.subjects.map(s => `
    <label class="calc-item-label" for="calc-check-${s.id}">
      <div class="calc-checkbox-group">
        <input type="checkbox" id="calc-check-${s.id}" value="${s.id}" data-fee="${s.monthlyFee}">
        <span class="calc-subject-title">${s.name} <span style="font-weight: 400; color: var(--text-muted); font-size: 0.85rem">(${s.grade})</span></span>
      </div>
      <span class="calc-subject-fee">RM ${s.monthlyFee}</span>
    </label>
  `).join('');

  // Initial check: select first 2 subjects for demonstration
  const initialChecks = listContainer.querySelectorAll('input[type="checkbox"]');
  if (initialChecks.length >= 2) {
    initialChecks[0].checked = true;
    initialChecks[1].checked = true;
    initialChecks[0].closest('.calc-item-label').classList.add('selected');
    initialChecks[1].closest('.calc-item-label').classList.add('selected');
  }

  function updateCalculator() {
    const checked = Array.from(listContainer.querySelectorAll('input[type="checkbox"]:checked'));
    const count = checked.length;
    let subtotal = 0;

    checked.forEach(chk => {
      subtotal += parseInt(chk.dataset.fee, 10);
    });

    // Compute bundle discount
    let discountRate = 0;
    if (count === 2) discountRate = 0.10;
    else if (count === 3) discountRate = 0.15;
    else if (count >= 4) discountRate = 0.20;

    const discountAmount = Math.round(subtotal * discountRate);
    const finalTotal = subtotal - discountAmount;

    countEl.textContent = `${count} Subject${count === 1 ? '' : 's'}`;
    subtotalEl.textContent = `RM ${subtotal}`;

    if (discountRate > 0) {
      discountRow.style.display = 'flex';
      discountPercentBadge.textContent = `${Math.round(discountRate * 100)}% OFF`;
      discountValEl.textContent = `- RM ${discountAmount}`;
    } else {
      discountRow.style.display = 'none';
    }

    totalValEl.textContent = `RM ${finalTotal}`;
  }

  listContainer.addEventListener('change', (e) => {
    const chk = e.target;
    if (chk && chk.type === 'checkbox') {
      const label = chk.closest('.calc-item-label');
      if (chk.checked) label.classList.add('selected');
      else label.classList.remove('selected');
      updateCalculator();
    }
  });

  updateCalculator();
}

/* -------------------------------------------------------------------------
   3. Timetable Schedule Matrix
   ------------------------------------------------------------------------- */
function initTimetable() {
  const daysContainer = document.getElementById('schedule-days-nav');
  const tableBody = document.getElementById('timetable-body');
  if (!daysContainer || !tableBody) return;

  const days = ['All Days', 'Saturday', 'Sunday', 'Weekdays (Mon-Fri)'];
  daysContainer.innerHTML = days.map((d, idx) => `
    <button type="button" class="schedule-day-btn ${idx === 0 ? 'active' : ''}" data-day="${d}">
      ${d}
    </button>
  `).join('');

  renderTimetable('All Days');

  daysContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.schedule-day-btn');
    if (!btn) return;
    daysContainer.querySelectorAll('.schedule-day-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTimetable(btn.dataset.day);
  });
}

function renderTimetable(selectedDay) {
  const tableBody = document.getElementById('timetable-body');
  if (!tableBody) return;

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

  tableBody.innerHTML = rows.map(r => `
    <tr>
      <td>
        <strong>${r.subjectName}</strong>
        <div style="font-size: 0.8rem; color: var(--text-muted);">${r.grade}</div>
      </td>
      <td><strong>${r.day}</strong></td>
      <td>${r.time}</td>
      <td>${r.tutor}</td>
      <td>
        <span class="seat-status-pill ${r.seatsLeft <= 2 ? 'seat-limited' : 'seat-open'}">
          ${r.seatsLeft <= 2 ? `Only ${r.seatsLeft} seats left!` : `${r.seatsLeft} slots open`}
        </span>
      </td>
      <td>
        <button type="button" class="btn btn-secondary btn-sm btn-book-slot" data-subject-id="${r.subjectId}" data-time="${r.day} ${r.time}">
          Select
        </button>
      </td>
    </tr>
  `).join('');

  tableBody.querySelectorAll('.btn-book-slot').forEach(btn => {
    btn.addEventListener('click', () => {
      openBookingModal(btn.dataset.subjectId, btn.dataset.time);
    });
  });
}

/* -------------------------------------------------------------------------
   4. Parent FAQ Accordion
   ------------------------------------------------------------------------- */
function initFAQAccordion() {
  const container = document.getElementById('faq-accordion');
  if (!container) return;

  container.innerHTML = TUITION_DATA.faqs.map((faq, index) => `
    <div class="faq-item ${index === 0 ? 'active' : ''}" data-index="${index}">
      <button type="button" class="faq-question-btn" aria-expanded="${index === 0 ? 'true' : 'false'}">
        <span>${faq.q}</span>
        <span class="faq-toggle-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </button>
      <div class="faq-answer-panel">
        <p class="faq-answer-text">${faq.a}</p>
      </div>
    </div>
  `).join('');

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.faq-question-btn');
    if (!btn) return;
    const item = btn.closest('.faq-item');
    const wasActive = item.classList.contains('active');

    // Close others
    container.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('active');
      i.querySelector('.faq-question-btn').setAttribute('aria-expanded', 'false');
    });

    if (!wasActive) {
      item.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
}

/* -------------------------------------------------------------------------
   5. Free Trial Booking Modal Flow with WhatsApp Dispatch
   ------------------------------------------------------------------------- */
let currentBookingState = {
  step: 1,
  parentName: '',
  phone: '',
  studentName: '',
  grade: 'Form 4 & 5 (SPM)',
  subjectId: '',
  timeSlot: ''
};

function initTrialModal() {
  const overlay = document.getElementById('booking-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const openButtons = document.querySelectorAll('.trigger-trial-modal');

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => openBookingModal());
  });

  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', () => closeBookingModal());
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeBookingModal();
    });
  }

  // Populate modal select elements
  const subjectSelect = document.getElementById('modal-select-subject');
  if (subjectSelect) {
    subjectSelect.innerHTML = `<option value="">-- Choose a Subject --</option>` + 
      TUITION_DATA.subjects.map(s => `<option value="${s.id}">${s.name} (${s.grade})</option>`).join('');

    subjectSelect.addEventListener('change', updateModalSlotOptions);
  }

  // Handle Step Buttons
  const nextBtn = document.getElementById('modal-btn-step1');
  if (nextBtn) {
    nextBtn.addEventListener('click', handleStep1Submit);
  }

  const prevBtn = document.getElementById('modal-btn-prev');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => setModalStep(1));
  }

  const finalSubmitBtn = document.getElementById('modal-btn-submit');
  if (finalSubmitBtn) {
    finalSubmitBtn.addEventListener('click', handleFinalBookingSubmit);
  }
}

export function openBookingModal(preselectedSubjectId = '', preselectedSlot = '') {
  const overlay = document.getElementById('booking-modal');
  if (!overlay) return;

  currentBookingState = {
    step: 1,
    parentName: '',
    phone: '',
    studentName: '',
    grade: 'Form 4 & 5 (SPM)',
    subjectId: preselectedSubjectId || TUITION_DATA.subjects[0].id,
    timeSlot: preselectedSlot || ''
  };

  const subjectSelect = document.getElementById('modal-select-subject');
  if (subjectSelect && currentBookingState.subjectId) {
    subjectSelect.value = currentBookingState.subjectId;
    updateModalSlotOptions();
  }

  setModalStep(1);
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
  const overlay = document.getElementById('booking-modal');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function updateModalSlotOptions() {
  const subjectSelect = document.getElementById('modal-select-subject');
  const slotSelect = document.getElementById('modal-select-slot');
  if (!subjectSelect || !slotSelect) return;

  const subject = TUITION_DATA.subjects.find(s => s.id === subjectSelect.value);
  if (!subject) {
    slotSelect.innerHTML = '<option value="">-- Select Subject First --</option>';
    return;
  }

  slotSelect.innerHTML = subject.schedule.map(slot => `
    <option value="${slot.day} ${slot.time}">
      ${slot.day} ${slot.time} (${slot.seatsLeft} seats left)
    </option>
  `).join('');

  if (currentBookingState.timeSlot) {
    slotSelect.value = currentBookingState.timeSlot;
  }
}

function setModalStep(step) {
  currentBookingState.step = step;
  const step1Pane = document.getElementById('modal-pane-step1');
  const step2Pane = document.getElementById('modal-pane-step2');
  const step3Pane = document.getElementById('modal-pane-step3');

  const step1Ind = document.getElementById('step-ind-1');
  const step2Ind = document.getElementById('step-ind-2');
  const step3Ind = document.getElementById('step-ind-3');

  if (step1Pane) step1Pane.style.display = step === 1 ? 'block' : 'none';
  if (step2Pane) step2Pane.style.display = step === 2 ? 'block' : 'none';
  if (step3Pane) step3Pane.style.display = step === 3 ? 'block' : 'none';

  if (step1Ind) {
    step1Ind.className = `step-indicator-item ${step === 1 ? 'active' : 'completed'}`;
  }
  if (step2Ind) {
    step2Ind.className = `step-indicator-item ${step === 2 ? 'active' : (step > 2 ? 'completed' : '')}`;
  }
  if (step3Ind) {
    step3Ind.className = `step-indicator-item ${step === 3 ? 'active completed' : ''}`;
  }
}

function handleStep1Submit() {
  const pName = document.getElementById('input-parent-name')?.value.trim();
  const phone = document.getElementById('input-parent-phone')?.value.trim();
  const sName = document.getElementById('input-student-name')?.value.trim();
  const grade = document.getElementById('input-student-grade')?.value;

  if (!pName || !phone || !sName) {
    alert('Please fill in your name, WhatsApp phone number, and student name.');
    return;
  }

  currentBookingState.parentName = pName;
  currentBookingState.phone = phone;
  currentBookingState.studentName = sName;
  currentBookingState.grade = grade;

  setModalStep(2);
  updateModalSlotOptions();
}

function handleFinalBookingSubmit() {
  const subjectSelect = document.getElementById('modal-select-subject');
  const slotSelect = document.getElementById('modal-select-slot');

  if (!subjectSelect?.value || !slotSelect?.value) {
    alert('Please select both a subject and an available time slot.');
    return;
  }

  const subject = TUITION_DATA.subjects.find(s => s.id === subjectSelect.value);
  currentBookingState.subjectId = subjectSelect.value;
  currentBookingState.timeSlot = slotSelect.value;

  // Prepare confirmation pane
  const confirmDetails = document.getElementById('confirm-booking-summary');
  const waLinkBtn = document.getElementById('btn-dispatch-whatsapp');

  const subjectName = subject ? subject.name : 'Selected Subject';

  if (confirmDetails) {
    confirmDetails.innerHTML = `
      <div style="background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem;">
        <p><strong>Student:</strong> ${currentBookingState.studentName} (${currentBookingState.grade})</p>
        <p><strong>Subject:</strong> ${subjectName}</p>
        <p><strong>Session Slot:</strong> ${currentBookingState.timeSlot}</p>
        <p><strong>Parent Contact:</strong> ${currentBookingState.parentName} (${currentBookingState.phone})</p>
      </div>
    `;
  }

  // Generate WhatsApp message
  const waText = encodeURIComponent(
    `Hello Unipact Academy! I would like to confirm my Free Trial class booking.\n\n` +
    `👤 Student: ${currentBookingState.studentName}\n` +
    `📚 Level: ${currentBookingState.grade}\n` +
    `📖 Subject: ${subjectName}\n` +
    `⏰ Preferred Slot: ${currentBookingState.timeSlot}\n` +
    `📞 Parent: ${currentBookingState.parentName} (${currentBookingState.phone})\n\n` +
    `Please confirm the seat availability.`
  );

  const waUrl = `https://wa.me/${TUITION_DATA.centre.whatsappNumber}?text=${waText}`;

  if (waLinkBtn) {
    waLinkBtn.href = waUrl;
    waLinkBtn.target = '_blank';
  }

  setModalStep(3);
}

/* -------------------------------------------------------------------------
   6. WhatsApp Floating Quick-Action
   ------------------------------------------------------------------------- */
function initWhatsAppFloating() {
  const floatingBtn = document.getElementById('floating-whatsapp');
  if (!floatingBtn) return;

  const defaultMsg = encodeURIComponent(
    `Hi Unipact Academy, I have an inquiry regarding subject fees and class schedule for my child.`
  );
  floatingBtn.href = `https://wa.me/${TUITION_DATA.centre.whatsappNumber}?text=${defaultMsg}`;
}
