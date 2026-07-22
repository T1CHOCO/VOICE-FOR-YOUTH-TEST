/**
 * Voice for Youth - Child Rights & Protest Safety Portal JavaScript
 * Dynamic Interactive Features, Filter Systems, Chart Data Visualization, Complaint Draft Generator
 */

// ==========================================
// DATASETS
// ==========================================

const LEGAL_PROTECTIONS = [
    {
        id: "jj-sec75",
        title: "Section 75, Juvenile Justice Act 2015",
        category: "juvenile",
        categoryName: "Juvenile Justice Act",
        badgeClass: "badge-juvenile",
        description: "Strict criminal liability and penalty for anyone (including law enforcement personnel) who assaults, abandons, abuses, or causes unnecessary mental or physical suffering to a minor.",
        authority: "Parliament of India / Ministry of Women & Child Development"
    },
    {
        id: "const-art19",
        title: "Article 19(1)(b) - Freedom of Assembly",
        category: "constitutional",
        categoryName: "Constitutional Right",
        badgeClass: "badge-constitutional",
        description: "Guarantees all citizens, including youth and students, the fundamental right to assemble peacefully and without arms without illegal state restriction.",
        authority: "Constitution of India"
    },
    {
        id: "const-art21",
        title: "Article 21 - Protection of Life & Personal Liberty",
        category: "constitutional",
        categoryName: "Constitutional Right",
        badgeClass: "badge-constitutional",
        description: "Protects individuals against arbitrary state force, lathi-charge, or physical violence. Every youth has a non-negotiable right to bodily integrity.",
        authority: "Supreme Court of India Precedents"
    },
    {
        id: "nhrc-protest",
        title: "NHRC Guidelines on Crowd Control & Minors",
        category: "nhrc",
        categoryName: "NHRC Directives",
        badgeClass: "badge-nhrc",
        description: "Explicit prohibition of lathi-charge, tear gas, or lethal force on assemblies involving children and students. Police must deploy Special Juvenile Police Units (SJPU) in plain clothes.",
        authority: "National Human Rights Commission"
    },
    {
        id: "uncrc-art37",
        title: "UN Convention on Rights of the Child (Art. 37)",
        category: "uncrc",
        categoryName: "UN Convention",
        badgeClass: "badge-uncrc",
        description: "Ratified by India in 1992. Mandates that no child shall be subjected to torture, cruel, inhuman, or degrading treatment, or arbitrary arrest/detention.",
        authority: "United Nations (UNCRC)"
    },
    {
        id: "jj-sec107",
        title: "Section 107, JJ Act - Special Juvenile Units",
        category: "juvenile",
        categoryName: "Juvenile Justice Act",
        badgeClass: "badge-juvenile",
        description: "Requires every police station in India to designate a Child Welfare Police Officer (CWPO) to handle any situation involving individuals under 18 years of age.",
        authority: "JJ Rules 2016"
    }
];

const INCIDENT_ARCHIVE = [
    {
        id: "inc-01",
        title: "Jamia & AMU Student Assembly Inquiries (2019-2020)",
        location: "Delhi / Uttar Pradesh",
        year: 2019,
        region: "Delhi",
        status: "NHRC Order Issued",
        statusClass: "status-nhrc",
        summary: "Inquiries launched by NHRC and High Court directives following excessive force and tear gas usage inside university premises during student assemblies.",
        details: "Multiple student petitions filed in Delhi High Court led to directives requiring strict police compliance with crowd control norms, medical treatment access, and guidelines prohibiting force inside educational campuses."
    },
    {
        id: "inc-02",
        title: "Agnipath Youth & Student Demonstrations (2022)",
        location: "Bihar / UP / Telangana",
        year: 2022,
        region: "Bihar",
        status: "Pending Accountability",
        statusClass: "status-pending",
        summary: "Reports of mass detentions of youth job aspirants across railway stations and public spaces, triggering NCPCR advisories on juvenile detention procedures.",
        details: "State Child Rights Commissions issued notices emphasizing that minors detained during youth protests must not be kept in adult lockups and must be produced before Child Welfare Committees (CWC) within 24 hours."
    },
    {
        id: "inc-03",
        title: "Farmers' Protest Student Movement (2020-2021)",
        location: "Punjab / Haryana / Delhi Border",
        year: 2021,
        region: "Punjab",
        status: "High Court Intervention",
        statusClass: "status-court",
        summary: "High Court notices issued regarding the welfare and safety of young family members and students participating in long-term peaceful border demonstrations.",
        details: "The Punjab & Haryana High Court emphasized state responsibility to ensure basic child rights, safety, sanitation, and immunity from arbitrary intimidation for young demonstrators."
    },
    {
        id: "inc-04",
        title: "West Bengal Student Union Demonstration (2023)",
        location: "Kolkata, West Bengal",
        year: 2023,
        region: "West Bengal",
        status: "NHRC Order Issued",
        statusClass: "status-nhrc",
        summary: "State Human Rights Commission (WBHRC) took suo motu cognizance of lathi-charge reports near state education department headquarters.",
        details: "WBHRC directed police authorities to submit a detailed report on why women officers and Child Welfare Police Officers were not deployed during the student assembly."
    }
];

// ==========================================
// DOM ELEMENTS & INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    renderLegalCards(LEGAL_PROTECTIONS);
    renderIncidents(INCIDENT_ARCHIVE);
    initFiltersAndSearch();
    initCharts();
    initComplaintGenerator();
    initModal();
});

// ==========================================
// THEME TOGGLER
// ==========================================

function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// ==========================================
// RENDER LEGAL CARDS
// ==========================================

function renderLegalCards(data) {
    const container = document.getElementById('legal-cards-container');
    if (!container) return;

    if (data.length === 0) {
        container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">No legal protections match your query. Try searching for "lathi-charge", "detention", or "JJ Act".</div>`;
        return;
    }

    container.innerHTML = data.map(item => `
        <div class="legal-card" data-category="${item.category}">
            <div>
                <span class="card-category-badge ${item.badgeClass}">${item.categoryName}</span>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
            <div class="card-footer">
                <span><i class="fa-solid fa-scale-balanced"></i> Source: ${item.authority}</span>
            </div>
        </div>
    `).join('');
}

// ==========================================
// RENDER INCIDENT ARCHIVE
// ==========================================

function renderIncidents(data) {
    const container = document.getElementById('incidents-container');
    if (!container) return;

    if (data.length === 0) {
        container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">No incidents found matching your filter criteria.</div>`;
        return;
    }

    container.innerHTML = data.map(item => `
        <div class="incident-card">
            <div>
                <div class="incident-header">
                    <span class="incident-location"><i class="fa-solid fa-location-dot"></i> ${item.location}</span>
                    <span class="incident-date"><i class="fa-regular fa-calendar"></i> ${item.year}</span>
                </div>
                <h3>${item.title}</h3>
                <p class="incident-summary">${item.summary}</p>
            </div>
            <div>
                <div style="margin-bottom: 1rem;">
                    <span class="incident-status-tag ${item.statusClass}">
                        <i class="fa-solid fa-circle-info"></i> ${item.status}
                    </span>
                </div>
                <button class="btn btn-outline btn-sm btn-block view-case-btn" onclick="openCaseModal('${item.id}')">
                    <i class="fa-solid fa-file-lines"></i> View Detailed Inspection
                </button>
            </div>
        </div>
    `).join('');
}

// ==========================================
// FILTERS & SEARCH LOGIC
// ==========================================

function initFiltersAndSearch() {
    // Legal search
    const legalSearch = document.getElementById('legal-search');
    const filterPills = document.querySelectorAll('.filter-pill');
    let currentCategory = 'all';

    function filterLegal() {
        const query = legalSearch.value.toLowerCase().trim();
        const filtered = LEGAL_PROTECTIONS.filter(item => {
            const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
            const matchesQuery = item.title.toLowerCase().includes(query) || 
                                 item.description.toLowerCase().includes(query) ||
                                 item.categoryName.toLowerCase().includes(query);
            return matchesCategory && matchesQuery;
        });
        renderLegalCards(filtered);
    }

    if (legalSearch) {
        legalSearch.addEventListener('input', filterLegal);
    }

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentCategory = pill.getAttribute('data-category');
            filterLegal();
        });
    });

    // Incident Search & Selects
    const incidentSearch = document.getElementById('incident-search');
    const regionSelect = document.getElementById('region-select');
    const statusSelect = document.getElementById('status-select');

    function filterIncidents() {
        const query = incidentSearch ? incidentSearch.value.toLowerCase().trim() : '';
        const region = regionSelect ? regionSelect.value : 'all';
        const status = statusSelect ? statusSelect.value : 'all';

        const filtered = INCIDENT_ARCHIVE.filter(item => {
            const matchesQuery = item.title.toLowerCase().includes(query) || 
                                 item.summary.toLowerCase().includes(query) ||
                                 item.location.toLowerCase().includes(query);
            const matchesRegion = region === 'all' || item.region === region;
            const matchesStatus = status === 'all' || item.status === status;
            return matchesQuery && matchesRegion && matchesStatus;
        });

        renderIncidents(filtered);
    }

    if (incidentSearch) incidentSearch.addEventListener('input', filterIncidents);
    if (regionSelect) regionSelect.addEventListener('change', filterIncidents);
    if (statusSelect) statusSelect.addEventListener('change', filterIncidents);
}

// ==========================================
// DATA CHARTS (Chart.js)
// ==========================================

function initCharts() {
    // Region Chart
    const regionCtx = document.getElementById('regionChart');
    if (regionCtx) {
        new Chart(regionCtx, {
            type: 'bar',
            data: {
                labels: ['Delhi NCR', 'Uttar Pradesh', 'Bihar', 'Punjab & HR', 'West Bengal', 'Others'],
                datasets: [{
                    label: 'Documented Force / Detentions Involving Minors',
                    data: [42, 38, 29, 21, 18, 15],
                    backgroundColor: ['#ff4757', '#ff7f50', '#3b82f6', '#10b981', '#a855f7', '#64748b'],
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                    x: { ticks: { color: '#94a3b8' }, grid: { display: false } }
                }
            }
        });
    }

    // Status Doughnut Chart
    const statusCtx = document.getElementById('statusChart');
    if (statusCtx) {
        new Chart(statusCtx, {
            type: 'doughnut',
            data: {
                labels: ['NHRC Inquiry Directives', 'High Court Interventions', 'Pending Accountability', 'Closed / Resolved'],
                datasets: [{
                    data: [35, 25, 30, 10],
                    backgroundColor: ['#10b981', '#3b82f6', '#ff4757', '#64748b'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans' } } }
                }
            }
        });
    }

    // Trend Line Chart
    const trendCtx = document.getElementById('trendChart');
    if (trendCtx) {
        new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
                datasets: [
                    {
                        label: 'Child Rights Reports Filed',
                        data: [15, 28, 45, 38, 52, 60, 68],
                        borderColor: '#ff4757',
                        backgroundColor: 'rgba(255, 71, 87, 0.1)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Special Juvenile Unit Compliance (%)',
                        data: [30, 38, 42, 55, 62, 70, 78],
                        borderColor: '#3b82f6',
                        backgroundColor: 'transparent',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#94a3b8' } }
                },
                scales: {
                    y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                    x: { ticks: { color: '#94a3b8' }, grid: { display: false } }
                }
            }
        });
    }
}

// ==========================================
// LEGAL COMPLAINT GENERATOR
// ==========================================

function initComplaintGenerator() {
    const form = document.getElementById('complaint-form');
    const draftOutput = document.getElementById('draft-output');
    const copyBtn = document.getElementById('copy-draft-btn');
    const downloadBtn = document.getElementById('download-draft-btn');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('complainant-name').value;
        const age = document.getElementById('victim-age').value;
        const date = document.getElementById('incident-date').value;
        const location = document.getElementById('incident-location').value;
        const authority = document.getElementById('authority-involved').value;
        const violation = document.getElementById('violation-type').value;
        const summary = document.getElementById('incident-summary').value;

        const draft = `MEMORANDUM & FORMAL COMPLAINT UNDER THE JUVENILE JUSTICE ACT, 2015

TO:
The Chairperson,
National Commission for Protection of Child Rights (NCPCR) / National Human Rights Commission (NHRC)
New Delhi, India.

DATE OF SUBMISSION: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}

SUBJECT: URGENT COMPLAINT REGARDING ${violation.toUpperCase()} AGAINST MINORS/STUDENTS AT ${location.toUpperCase()}

1. DETAILS OF COMPLAINANT / ADVOCATE:
   Name: ${name}
   Category of Minors Affected: ${age}

2. INCIDENT SPECIFICS:
   Date & Time: ${date}
   Location / Jurisdiction: ${location}
   Law Enforcement Agency Involved: ${authority}

3. GROUNDS & VIOLATIONS OF LAW:
   a. Violation of Section 75 of the Juvenile Justice (Care and Protection of Children) Act, 2015 regarding cruelty to juveniles.
   b. Non-compliance with NHRC Crowd Control Directives prohibiting lathi-charge or physical force against youth assemblies.
   c. Violation of Article 21 & Article 19(1)(b) of the Constitution of India.

4. STATEMENT OF FACTS:
   "${summary}"

5. RELIEF & DEMANDS REQUESTED:
   i. Immediate call for official reports from the concerned District Magistrate and Commissioner of Police.
   ii. Initiation of inquiry into whether Child Welfare Police Officers (CWPO) were present as mandated by Section 107 of the JJ Act.
   iii. Directives for medical care, legal counsel access, and immediate relief to affected minors.

RESPECTFULLY SUBMITTED,
${name}
(Voice for Youth Public Advocacy Draft)`;

        draftOutput.textContent = draft;
    });

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const text = draftOutput.textContent;
            navigator.clipboard.writeText(text).then(() => {
                alert('Complaint draft copied to clipboard!');
            }).catch(err => {
                alert('Failed to copy text: ' + err);
            });
        });
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const text = draftOutput.textContent;
            const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `NCPCR_Complaint_Draft_${Date.now()}.txt`;
            a.click();
            URL.revokeObjectURL(url);
        });
    }
}

// ==========================================
// MODAL VIEW LOGIC
// ==========================================

function initModal() {
    const modal = document.getElementById('case-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const closeFooter = document.getElementById('modal-close-footer');

    function closeModal() {
        if (modal) modal.classList.remove('active');
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (closeFooter) closeFooter.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
}

function openCaseModal(caseId) {
    const modal = document.getElementById('case-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    const caseItem = INCIDENT_ARCHIVE.find(i => i.id === caseId);
    if (!caseItem || !modal) return;

    modalTitle.textContent = caseItem.title;
    modalBody.innerHTML = `
        <div style="margin-bottom: 1.25rem;">
            <span class="incident-status-tag ${caseItem.statusClass}">${caseItem.status}</span>
        </div>
        <p><strong>Location & Region:</strong> ${caseItem.location} (${caseItem.region})</p>
        <p><strong>Year of Incident:</strong> ${caseItem.year}</p>
        <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 1rem 0;">
        <h4 style="margin-bottom: 0.5rem; color: var(--accent-blue);">Executive Case Summary:</h4>
        <p style="margin-bottom: 1rem;">${caseItem.summary}</p>
        <h4 style="margin-bottom: 0.5rem; color: var(--accent-blue);">Court / Commission Interventions:</h4>
        <p>${caseItem.details}</p>
    `;

    modal.classList.add('active');
}
