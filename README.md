# Quixort — Dean's Intelligence Portal

A high-density, institutional oversight platform for Student Affairs offices. Built with **React + Vite**, it provides deep-drill analytics across students, clubs & societies, events, expenses, and grievances — all through a unified query engine and interactive data views.

---

## Project Structure

```
src/
├── App.jsx                          # Router entry point (~100 lines)
├── index.css                        # Global design system & tokens
│
├── data/
│   ├── constants.js                 # App-wide constants (VIEWS, OPERATORS)
│   ├── mockData.js                  # All mock data (students, clubs, events…)
│   └── schemas.js                   # Table/query schemas for DataTable
│
├── components/
│   ├── Layout/
│   │   └── DashboardLayout.jsx      # Sidebar + Topbar + view switcher
│   └── Shared/
│       ├── DataTable.jsx            # Reusable sortable, configurable table
│       ├── QueryConstructor.jsx     # Multi-segment AND/OR query builder
│       └── QueryExplorer.jsx        # Full query engine wrapper with results
│
└── pages/
    ├── Office/                      # Dean/Admin view
    │   ├── Dashboard.jsx            # KPI hub, AI narrative, isolation alerts
    │   ├── Reimbursements.jsx       # Expense approval desk
    │   ├── OrganizationalCollective.jsx  # Clubs & Socs Intel query view
    │   ├── StudentIntelHub.jsx      # Student Intel query view
    │   ├── EventBoard.jsx           # Calendar & conflict resolution board
    │   ├── Grievances.jsx           # Feedback signals + ticket detail
    │   └── Profiles.jsx             # Student & Club deep-drill profiles
    │
    ├── Student/                     # Student-facing view
    │   ├── Dashboard.jsx            # Recommendations, mentorship, stats
    │   └── OfficeTeam.jsx           # Office team cards + booking
    │
    └── Clubs/                       # Club/Soc management view
        └── ClubDashboard.jsx        # Club control hub + task queue
```

---

## Views

The portal has three role-based view modes, switchable from the top bar:

| View | Description |
|------|-------------|
| **Office View** | Dean-level institutional oversight — KPIs, student/club analytics, grievances, events, expenses |
| **Clubs/Socs View** | Club management — members, inductions, event booking, financial ledger |
| **Student View** | Student portal — profile, society discovery, mentorship booking, office team |

---

## Key Features

### 🔍 Advanced Query Engine
- Multi-segment query builder with **AND/OR** logic between segments
- Per-segment **MATCH ALL / MATCH ANY** condition toggle
- Operators: `EQUALS`, `NOT_EQUALS`, `CONTAINS`, `GREATER_THAN`, `LESS_THAN`
- Suggested administrative segments (one-click preset queries)
- Configurable column display + sortable headers in results table

### 📊 Deep-Drill Profiles
- Click any student row → **Student Profile** (application journey, risk signals, systemic notes)
- Click any club row → **Club Profile** (selectivity metrics, leadership core, induction trends)

### 🏥 Institutional Intelligence Dashboard
- **Isolation Risk Alerts** — students with 0 accepted applications
- **AI Grievance Narrative** — pattern-detected friction analysis
- **Engagement Velocity** bar chart by cohort
- **Institutional Balance** score with diversity/resource/mobility sub-scores

### 📅 Event Intent Board
- Visual September calendar with event markers
- Conflict detection overlay (flagged dates)
- Pending booking request approval queue

### 🧾 Expense Management (Reimbursements)
- Review, approve, reject, or request resubmission of club funding claims
- Budget utilization + audit time KPIs

### 👥 The Office Team
- Staff cards with availability, contact email, and office-hours booking

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| Routing | React Router DOM v6 |
| Charts | Recharts |
| Icons | Lucide React |
| Styling | Vanilla CSS (custom design system) |
| Data | Mock data (JSON-style JS objects) |

---

## Design System

All design tokens are defined as CSS custom properties in `src/index.css`:

```css
--bg-main           /* Page background */
--card-bg           /* Card surface */
--accent-color      /* Primary orange accent */
--success-color     /* Green for healthy states */
--danger-color      /* Red for risk/critical */
--warning-color     /* Amber for review/pending */
--border-color      /* Subtle borders */
--text-main         /* Primary text */
--text-muted        /* Secondary/label text */
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## Routing Map

| Path | Page |
|------|------|
| `/` | Office Dashboard |
| `/office/reimbursements` | Expense Desk |
| `/office/collective` | Clubs & Socs Intel |
| `/office/collective/:id` | Club Profile |
| `/office/involvement` | Student Intel Hub |
| `/office/students/:id` | Student Profile |
| `/office/events` | Event Intent Board |
| `/office/feedback` | Grievances/Feedback |
| `/office/feedback/:id` | Grievance Detail |
| `/bias` | Bias Graph (System Analytics) |
| `/club-management` | Club Control Hub |
| `/club-management/members` | Personnel Directory |
| `/club-management/induction` | Induction Governance |
| `/club-management/events` | Event Booking |
| `/club-management/reimbursement` | Fund Ledger |
| `/student-profile` | Student Dashboard |
| `/student/discover` | Discover Socs |
| `/student/events` | My Events |
| `/student/feedback` | Support Desk |
| `/student/team` | The Office Team |
