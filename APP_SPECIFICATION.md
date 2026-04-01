# Quixort — Full Functional & Product Specification

> **For AI Agents**: This document is a complete, implementation-ready specification for the Quixort portal. Every page, component, data field, and piece of UI logic is documented here. Build or extend the system by following these specs precisely.

---

## TABLE OF CONTENTS
1. [System Architecture](#1-system-architecture)
2. [Core Shared Components](#2-core-shared-components)
   - [Advanced Query Builder (QueryConstructor + QueryExplorer)](#21-advanced-query-builder)
   - [MetricTooltip (Portal-based)](#22-metrictooltip)
   - [DataTable](#23-datatable)
3. [Data Schemas](#3-data-schemas)
4. [VIEW: Office (Dean / Admin)](#4-view-office)
   - [Dashboard (/)](#41-office-dashboard)
   - [Student Intel Hub (/office/involvement)](#42-student-intel-hub)
   - [Clubs & Socs Intel (/office/collective)](#43-clubs--socs-intel)
   - [Event Intent Board (/office/events)](#44-event-intent-board)
   - [Grievances & Feedback (/office/feedback)](#45-grievances--feedback)
   - [Expenses/Reimbursements (/office/reimbursements)](#46-expenses--reimbursements)
5. [VIEW: Student](#5-view-student)
   - [Dashboard (/student-profile)](#51-student-dashboard)
   - [My Profile (/student/profile)](#52-my-profile)
6. [VIEW: Clubs/Socs](#6-view-clubssocs)
   - [Dashboard (/club-management)](#61-club-dashboard)
   - [Members (/club-management/members)](#62-members)
   - [Inductions (/club-management/induction)](#63-inductions)
   - [Finances (/club-management/reimbursement)](#64-finances)
7. [Navigation & Routing](#7-navigation--routing)

---

## 1. System Architecture

Quixort is a **tri-modal institutional platform** built in React 18 + Vite with React Router v6. All three views (Office, Student, Clubs) live in one SPA. The view mode is controlled by a dropdown in the global topbar, which triggers `setView()` and navigates to the root of each view context.

**View Modes:**
- `VIEWS.OFFICE` → navigates to `/`
- `VIEWS.CLUBS` → navigates to `/club-management`
- `VIEWS.STUDENT` → navigates to `/student-profile`

**Key architectural conventions:**
- All data lives in `mockData.js` — a flat JS object file exporting `MOCK_STUDENTS`, `MOCK_CLUBS`, `MOCK_EVENTS`, `MOCK_GRIEVANCES`, `MOCK_REIMBURSEMENTS`.
- All filterable fields for each entity are defined in `schemas.js` as `STUDENT_SCHEMA` and `CLUB_SCHEMA`.
- `QueryExplorer` wraps `QueryConstructor` + `DataTable` to form a complete drilling interface — used identically in both Student and Club intel pages.
- Derived metrics are computed via `useDerivedMetrics()` hook (a `useMemo` returning all calculated values).

---

## 2. Core Shared Components

### 2.1 Advanced Query Builder

The most important technical system in the app. Built from two components that work together:

#### `QueryConstructor.jsx` — The UI
Renders the visual query builder card. Receives the current query state from its parent and calls `onQueryChange` on every change.

**UI Elements, top to bottom:**
1. **Header row**: Title "Advanced Query Builder" + active filter badge (e.g., `Quick Filter: Isolation Risk`) + "Quick Filters" button (opens sidedrawer) + "Save Query" button + "New Segment" button.
2. **Segment blocks**: One or more group cards, each containing:
   - `Group N` label + a `Logic: ALL | ANY` inline dropdown (controls whether conditions **within** this group use AND or OR).
   - One row per condition (see below).
   - `+ Add Condition` button.
   - A red × delete button (top-right corner) — only visible when there are 2+ segments.
3. **Between segments**: A centered `AND | OR` select dropdown rendered on the connecting line between segments. This is the **global join logic** — controls how segments relate to each other.

**Each condition row has 4 parts:**
- **Prefix label**: `IF` for the first condition in a segment; otherwise shows the group's logic (`AND` or `ANY`).
- **Field dropdown**: Populated dynamically from the schema (e.g., "Student Name", "Batch", "Total Apps", "Accept %").
- **Operator dropdown**: Options are `EQUALS`, `NOT_EQUALS`, `CONTAINS`, `GREATER_THAN`, `LESS_THAN`.
- **Value input**: Free text. User types the value to match against.
- **Remove button**: XCircle icon. If the group has >1 condition, removes this row. If it's the last condition, resets it to blank (does not delete the group).

**Save Query flow:**
- Clicking "Save Query" shows an inline input field + "Save" + "Cancel" buttons in place of the button.
- User types a name and hits Save → calls `onSaveQuery(name)`.
- The query is saved to `localStorage` under the key `user_filters_<page_title_lowercased>`.
- Saved queries appear in the Quick Filters sidedrawer tagged with a warning-color label (user-defined).

---

#### `QueryExplorer.jsx` — The Engine & Container

Wraps `QueryConstructor` and `DataTable`. Manages all state.

**State managed:**
- `queryGroups`: array of segment objects `{ id, logic: 'AND'|'OR', filters: [{field, operator, value}] }`
- `globalLogic`: `'AND'` or `'OR'`
- `filteredData`: the result array passed to `DataTable`
- `userFilters`: loaded from `localStorage` on mount
- `showDrawer`: boolean for sidedrawer visibility

**Filter evaluation logic (`applyFilter`):**
```
if value is empty → pass (no filter applied)
if field value is an Array → convert to array.length string before comparing
EQUALS       → val == target (loose equality, so "2025" == 2025)
NOT_EQUALS   → val != target
CONTAINS     → val.includes(target) (case-insensitive)
GREATER_THAN → parseFloat(val) > parseFloat(target)
LESS_THAN    → parseFloat(val) < parseFloat(target)
```

**Group evaluation (`evaluateGroup`):**
- If group logic is `AND` → ALL conditions in group must pass.
- If group logic is `OR` → ANY condition in group can pass.

**Global evaluation (`handleQuery`):**
- If globalLogic is `AND` → ALL groups must pass for a row to appear.
- If globalLogic is `OR` → ANY group passing qualifies the row.

**Row click**: Navigates to `${targetPath}/${row.id || row.name}` (for deep drill into student/club profiles).

---

#### Quick Filters Sidedrawer
- Opens from the right as a 420px-wide overlay panel with a blurred backdrop.
- Slide-in animation: `drawerSlideIn` CSS keyframe (translateX 100% → 0).
- Lists all "system" examples (passed as `examples` prop) + user-saved filters from localStorage.
- Clicking a filter card: applies it instantly to the query state. If already active, clicking again **resets** the query to initial state (toggle behavior).
- Active filter card: highlighted with accent border + filled background + white dot indicator.
- User-saved filters: show a red trash icon (Trash2) that deletes from localStorage.
- Empty state: Shows an Inbox icon with a hint to save a query.

---

### 2.2 MetricTooltip

**File**: `src/components/Shared/MetricTooltip.jsx`

A hover-triggered tooltip that renders via `ReactDOM.createPortal` directly into `document.body`, bypassing any container overflow constraints.

**Trigger**: Hovering the `Info` (i) icon.
**Behavior**:
- On hover, reads the bounding rect of the icon element.
- Calculates `top = rect.bottom + 8px`, `left = rect.left - 90px` (clamped to screen edges).
- Renders a fixed-position tooltip div through the portal.

**Tooltip contents**:
- Header: "HOW IT'S CALCULATED" in accent color.
- Body: the `formula` prop string (supports `\n` for line breaks via `white-space: pre-line`).

Used on every KPI stat card in every intel view.

---

### 2.3 DataTable

**File**: `src/components/Shared/DataTable.jsx`

A configurable, sortable institutional data table.

**Features:**
- **Column toggle**: A "Columns" button opens a checklist of all schema fields. User checks/unchecks which to show.
- **Sorting**: Clicking any column header toggles ascending/descending sort. Sort state is a `{key, dir}` object.
- **Row click**: Calls `onRowClick(row)` which navigates to the entity's detail page.
- **Badge rendering**: Automatically renders colored `<span class="badge">` elements for `status`, `batch`, `gender` fields.
- **Acceptance rate heat-mapping**: For `Accept %` / `acceptance_rate` fields, values ≤ 15 are colored red, values 100 are colored green.
- **Array fields**: Arrays (e.g., `joined`, `leadership_roles`) display as their `.length` count.

---

## 3. Data Schemas

All filterable and displayable fields — used identically by the Query Engine and DataTable column picker.

### `STUDENT_SCHEMA`
| Key | Label in UI | Notes |
|-----|-------------|-------|
| `id` | ID | Unique student ID |
| `name` | Student Name | Full name string |
| `batch` | Batch | e.g., `2025` |
| `major` | Major | Primary academic department |
| `minor` | Minor | Secondary academic focus |
| `gender` | Gender | Pronoun self-identification |
| `status` | Status | `Isolation Risk`, `Overloaded`, `Healthy`, `Balanced` |
| `participation_score` | Involvement Score | Weighted composite (0–100) |
| `applications` | Total Apps | Count of all club applications made |
| `rejections_count` | Rejections | Count of rejected applications |
| `acceptance_rate` | Accept % | `(accepted ÷ applications) × 100` |
| `joined` | Societies Joined | Array of club IDs joined |
| `leadership_roles` | Leadership Roles | Array of active leadership role IDs |
| `grievances_filed` | Grievances Filed | Integer count |
| `days_since_last_activity` | Days Inactive | Days since any platform interaction |

### `CLUB_SCHEMA`
| Key | Label in UI | Notes |
|-----|-------------|-------|
| `name` | Organization | Official club name |
| `type` | Type | `Club` or `Society` |
| `category` | Category | e.g., `Debating`, `Technology`, `Theatre` |
| `founded` | Est. | Year of founding |
| `members_count` | Members | Current total membership |
| `leadership_count` | Core Team | Number of named executive/core members |
| `applications_2024` | 2024 Apps | Applications received in current cycle |
| `rejections_2024` | 2024 Rejects | Applications rejected |
| `acceptance_rate` | Accept % | Selectivity index |
| `budget_total` | Budget (₹) | Total allocated budget |
| `budget_used` | Used (₹) | Amount spent so far |
| `budget_days_elapsed` | Days Elapsed | Days since budget period started |
| `status` | Status | `Active`, `Pending`, `Flagged` |

---

## 4. VIEW: Office

### 4.1 Office Dashboard

**Path**: `/`
**Purpose**: Strategic overview of campus social health, fiscal risk, and institutional equity signals.

---

#### KPI Row (4 stat cards)
Real-time derived metrics. Each card has a `MetricTooltip`:

| Card | Value | Formula |
|------|-------|---------|
| **Inclusivity Index** | e.g., `87%` | Students with ≥1 club membership ÷ Total students |
| **Power Concentration** | e.g., `0.43` | Unique leaders ÷ Total leadership positions. Lower = fewer people hold more power. Ideal >0.6 |
| **Isolation Risk** | e.g., `3` | Count of students where `acceptance_rate = 0` AND `applications ≥ 1` |
| **Role Overloading** | e.g., `2` | Count of students with `leadership_roles.length ≥ 3` |

---

#### AI Intelligence Feed
A fixed-height (`max-height: 520px`) scrollable, color-coded activity stream. Each entry has a severity label badge + narrative text.

**Severity tiers:**
- `CRITICAL` (red): Isolation risk, max rejection rates, systemic bias evidence.
- `WATCHLIST` (amber): Leadership duplication, budget burn alerts, grievance cross-referencing.
- `OBSERVATION` (indigo): Cohort patterns, batch engagement differentials.
- `POSITIVE SIGNAL` (green): 100% acceptance students, no grievance record, high institutional trust.

**Entries are narrative-style text**, e.g.:
> "Priya K. has a 90% rejection rate across 10 applications. She has filed 1 grievance citing 'unstated prerequisites' in Tech Soc — 83% of Tech Soc members come from Engineering/CS."

---

#### Budget Burn Rate Chart
A CSS-based horizontal bar gauge (not Recharts) — one row per club, ranked by % consumed.

- **Per club row**: Club name + `{pct}% · ₹{daily}/day · {days}d`
- **Bar color logic**: `>60%` spent → red; `>40%` → amber; otherwise green.
- **Tooltip**: "₹ Used ÷ ₹ Allocated per club. Redline threshold: >60%"
- **Derived from**: `budget_used / budget_total * 100` and `budget_used / budget_days_elapsed` per club.

---

#### Engagement by Cohort (Bar Chart — Recharts)
A **stacked `<BarChart>`** using Recharts.

- **Data**: 3 bars for `UG23`, `UG24`, `UG25`.
- **Stacks**: `active` (indigo/accent) + `passive` (red/danger). 
- **Values (hardcoded)**: UG23 → 85/15, UG24 → 78/22, UG25 → 62/38.
- **Tooltip**: "% Active = students with ≥1 club membership per batch year."

---

#### Risk Hub (Left half of 2-col grid)
Contains two sections, separated by a divider line. Bordered with red at top.

**Section 1 — Immediate Isolation Risk**
- Shows the top 2 students from the `isolationRisk` derived list (students where `status === 'Isolation Risk'`).
- Each student card shows: Name, Batch, Major, Minor, rejection badge count, days inactive, clubs applied to.
- CTA button: "Initiate Outreach" (non-functional currently).

**Section 2 — Total Rejection Pool**
- Formula: `acceptance_rate === 0 AND applications >= 3`.
- Rendered as a compact embedded data table with columns: Student, Batch, Major, Apps, Rejects, Days Inactive.
- Days Inactive colored red if >20 days, amber otherwise.

---

#### Concentration Hub (Right half of 2-col grid)
Contains two sections, separated by a divider line. Bordered with amber at top.

**Section 1 — Top Concentration**
- Hardcoded top 3 students with role counts (Student X: 13 roles, Student Y: 9 roles, Student Z: 8 roles).
- System alert banner: "5% of students hold 45% of all leadership positions."

**Section 2 — Perfect Record**
- Formula: `acceptance_rate === 100 AND applications >= 1`.
- Embedded table: Student, Batch, Major, Apps, Joined clubs (green), Leadership roles badge.
- Tooltip: "May indicate pool familiarity or social ties."

---

#### Club Membership Cluster Graph
A **custom SVG force-directed network graph** rendered in ~640×340px viewBox.

- **Nodes**: One circle per club. Size ∝ member count (min radius 14, max +18).
- **Node color**: Category-based — Debating (indigo), Theatre (amber), Technology (green), Arts (pink), Environment (teal).
- **Labels**: Abbreviated 4-char club name inside node, full name below.
- **Edges**: Lines between any two clubs that share ≥1 member.
  - Thickness ∝ shared member count.
  - **Solid line**: clubs with shared leadership overlap.
  - **Dashed line**: member-only overlap.
- **Hover interaction**: Hovering a node highlights all its edges and labels them with `{N}s +{L}L` (shared students + shared leaders).
- **Force layout**: Custom physics simulation (repulsion + spring attraction + gravity toward center, 300 iterations). Closer = more interconnected.
- **Formula tooltip**: Explains edge and node semantics.
- **Legend**: Category dots + line type guide.

---

#### Club Overlap Analyser
An interactive comparison tool below the network graph.

**Workflow:**
1. User clicks any combination of 2 club pills to select them (toggle behavior, checkmark prefix when selected).
2. "Calculate Overlap" button (disabled until exactly 2 selected) triggers computation.
3. Results section appears showing:

**Result — 3 KPI cards:**
| Card | Formula |
|------|---------|
| Leadership Overlap % | Shared leaders ÷ All unique leaders across both clubs × 100. >50% = Institutional Capture risk |
| Member Overlap % | Students in both clubs ÷ All unique students across both × 100 |
| Overall Risk | `🔴 Institutional Capture` if leadership >50%, `🟡 Leadership Overlap` if >25%, `🟢 Healthy` otherwise |

**Result — 2 expandable student tables:**
- **Shared Leadership table**: Full student records of the intersecting leaders.
- **Shared Members table**: Full student records of the intersecting regular members.
- Both tables are searchable via an inline filter input (searches name, major, minor, batch).
- Columns: Name, Batch, Major, Minor, Apps, Accept %, Clubs Joined count, Leadership badge, Status badge.

---

### 4.2 Student Intel Hub

**Path**: `/office/involvement`
**Wraps**: `QueryExplorer` with `MOCK_STUDENTS` + `STUDENT_SCHEMA`

#### Summary KPI Row (4 cards with MetricTooltip)
| Card | Value | Formula shown in tooltip |
|------|-------|--------------------------|
| Gender Distribution | 45% He/Him · 48% She/Her · 7% Non-binary | Self-identified pronoun aggregate from student db |
| Inclusivity Index | 82% Diversified | Students with ≥1 club membership ÷ Total. Goal >80% |
| Engagement Gap | 14% Passive | Students with 0 active memberships AND 0 pending apps |
| Active Leaders | 28 Students | Unique students holding Executive/Lead roles |

Each card includes a thin progress bar below the stat.

#### Quick Filters (pre-loaded examples)
| Label | Description | Filter Logic |
|-------|-------------|--------------|
| Isolation Risk | Apps > 3 and Accept % < 10 | `applications > 3 AND acceptance_rate < 10` |
| Leadership Bottleneck | Students with 3+ core roles | `leadership_roles > 2` (array length) |
| High Potential Passives | High score but 0 memberships | `participation_score > 70 AND joined == 0` |
| UG25 Freshman Signal | Incoming batch engagement | `batch == 2025` |
| Grievance Watchlist | Students who filed complaints | `grievances_filed > 0` |
| Elite Clusters | 100% acceptance across 2+ apps | `acceptance_rate == 100 AND applications > 1` |

---

### 4.3 Clubs & Socs Intel

**Path**: `/office/collective`
**Wraps**: `QueryExplorer` with `MOCK_CLUBS` + `CLUB_SCHEMA`

#### Summary KPI Row (4 cards with MetricTooltip)
| Card | Value | Formula shown in tooltip |
|------|-------|--------------------------|
| Total Organizations | `{MOCK_CLUBS.length}` Socs/Clubs | Total count of registered clubs and student groups |
| Avg Accept Rate | 21.4% Selective | Mean acceptance % across all recruitment cycles |
| Budget Utilization | ₹42,300 Used | Total ₹ spent ÷ Total ₹ allocated across all orgs |
| Highly Selective | 3 Societies | Organizations with <15% acceptance rate |

#### Quick Filters
| Label | Description | Filter Logic |
|-------|-------------|--------------|
| Highly Selective Legacy | Accept % < 20 and Est. < 2015 | `acceptance_rate < 20 AND founded < 2015` |
| Resource Intensive | Clubs with ₹12k+ budget | `budget_total > 12000` |
| Tech Hubs | Technology & Engineering | `category CONTAINS Tech` |
| High Diversity Alert | Clubs with 150+ members | `members_count > 150` |
| Budget Watchlist | Spent over ₹10k already | `budget_used > 10000` |
| Society Status | Socs awaiting review | `status == Pending` |

---

### 4.4 Event Intent Board

**Path**: `/office/events`

#### September 2024 Calendar
- Month-grid layout (7 columns × 5 rows) covering days 1–30.
- Each day cell: day number + event badges overlaid.
- **Event badge colors**: Red/danger for `Flagged` events, green/success for others.
- **Conflict flag** in page header: "Sept 15 has been flagged for peak density."
- Prev/Next month buttons (non-functional in current implementation).

#### Pending Booking Requests (right sidebar)
Static list of 2 pending requests:
1. **Debate Championship (Sept 15)** — marked as Flagged, clash detected with 'Society Induction'. CTA: "Propose Alternate Schedule."
2. **Innovation Hackathon (Sept 18)** — no conflicts, low density. CTA: "Approve Booking."

#### Strategic Resource Allocation Policy
Informational text box explaining the density-first policy for event approvals.

---

### 4.5 Grievances & Feedback

**Path**: `/office/feedback`

#### AI Governance Summary Card
Displays every grievance from `MOCK_GRIEVANCES` as a synthesized narrative item:
- Badge: `HIGH PRIORITY` (red) or `WATCHLIST` (amber).
- Text: `{studentName} raised a concern against {targetClub}: {first sentence of grievance}. {aiAnalysis}`.

#### Grievance Registry Table
Columns: Ticket ID (`#GR-00{id}`), Student, Target Club (badge), Category, Date, Priority (badge), Status (badge), Actions.
- "Review Ticket" CTA navigates to `/office/feedback/{id}`.

#### Grievance Detail Page (`/office/feedback/:id`)
Shows:
- Full "Statement of Concern" verbatim (italic quote block).
- **AI Pattern Validation**: The `aiAnalysis` field from the grievance — a cross-referencing insight.
- **Student Context mini-KPIs** (if student found): Total Apps, Rejections, Accept %, Grievances Filed.
- **Administrative Actions panel**: Approve Intervention / Initiate Formal Query / Dismiss Ticket.
- Links to full Student Profile.

---

### 4.6 Expenses & Reimbursements

**Path**: `/office/reimbursements`
Institutional expense approval desk for club funding claims.

**Table Columns**: Ref ID, Club, Amount, Category, Description, Date, Status (Pending, Approved, Rejected), Actions.
**Actions per row**: Approve, Reject, Request Resubmission buttons.
**Summary KPIs**: Total processed (₹), Pending approvals count, Audit time (days since last review).

---

## 5. VIEW: Student

### 5.1 Student Dashboard

**Path**: `/student-profile`

**AI Personnel Alignment card**: 3 recommended clubs with name, type badge, match reason, "Review Induction Policy" CTA. Based on interests & behavioral traits.

**2 featured club tiles**: Design Society (Apply Now — primary CTA) and Photography Club (Apply Now — secondary CTA) with member count and description.

**Upcoming Events sidebar**: Calendar list of upcoming events with RSVP button.

**Office Mentorship (OH)** card: 3 session types (Application Review, Mock Interview Prep, Skill Alignment IQ) with "Book Slot" CTA. Clicking opens a **modal dialog** with available time slots (4:00 PM, 4:30 PM, 5:00 PM, 5:45 PM). Confirm Booking closes the modal.

**Engagement Statistics sidebar**: Active Submissions count, Accepted Offers count, and a system insight alert if rejection concentration is high.

**Direct Feedback Channel**: Textarea (`Start typing statement of concern...`) + "Submit to Office" button.

---

### 5.2 My Profile

**Path**: `/student/profile`

A two-column form layout.

**Left column:**

**Personal Details card:**
- Full Name (text input)
- Batch (select: UG23, UG24, UG25, ASP26)
- Gender/Pronouns (select: He/Him, She/Her, They/Them, Prefer not to say)
- Email (disabled input — institutional, read-only)

**Education card:**
- Major (select: Computer Science, Economics, Philosophy, Psychology, Biology, English Literature)
- Minor (text input, placeholder "e.g. Media Studies")

**Right column:**

**Interests card:**
- Descriptive sub-label: "Add tags that describe your interests and skills to help with club recommendations."
- Tag cloud: Shows existing interest tags (e.g., "Public Speaking", "System Design", "Ethical AI"). Each tag has an ×  remove button.
- Add input: Text input listening for `Enter` key → adds tag (deduped via `Set`).

**About Me textarea**: 150px min-height free text bio.

**Save Changes button** (top-right): On click, shows `✓ Profile Saved` for 3 seconds then resets.

---

## 6. VIEW: Clubs/Socs

### 6.1 Club Dashboard

**Path**: `/club-management`

**KPI Row (4 cards):** Total Members (210, +15 new), Leaders/Core (8, 3 roles open), Budget Allocation (₹15,000, 72% utilized), Induction Success % (22%, 120 applicants).

**Governance Task Queue table**: Due Date, Task Description, Resource Impact, Status badge (Urgent/Pending/Upcoming), Action button.
- Sample rows: Hackathon reimbursement upload (Urgent, ₹12,400), Induction form review (Pending, 120 applicants), Inventory audit (Upcoming).

---

### 6.2 Members

**Path**: `/club-management/members`

Searchable personnel directory. Columns: Name, Role, Department, Onboarded date, Status badge (Active, Low Activity).

---

### 6.3 Inductions

**Path**: `/club-management/induction`

Induction governance table: Cycle ID, Status badge (Ongoing), Applicant count, Reviews Pending, "Review Panel" CTA.

---

### 6.4 Finances

**Path**: `/club-management/reimbursement`

Financial ledger table: Ref ID, Category, Description, Amount (₹), Status badge (Paid, Pending).
- "New Payout Request" button in header.

---

## 7. Navigation & Routing

### Full Route Map
| Path | Component | View |
|------|-----------|------|
| `/` | `OfficeDashboard` | Office |
| `/office/reimbursements` | `OfficeReimbursements` | Office |
| `/office/collective` | `OrganizationalCollective` | Office |
| `/office/collective/:id` | `ClubProfile` | Office |
| `/office/involvement` | `StudentInvolvementHub` | Office |
| `/office/students/:id` | `StudentProfile` | Office |
| `/office/events` | `EventIntentBoard` | Office |
| `/office/feedback` | `FeedbackSignals` | Office |
| `/office/feedback/:id` | `FeedbackSignalDetail` | Office |
| `/club-management` | `ClubDashboard` | Clubs |
| `/club-management/members` | Inline JSX | Clubs |
| `/club-management/induction` | Inline JSX | Clubs |
| `/club-management/events` | Inline JSX | Clubs |
| `/club-management/reimbursement` | Inline JSX | Clubs |
| `/student-profile` | `StudentDashboard` | Student |
| `/student/profile` | `ProfilePage` | Student |
| `/student/discover` | Inline stub | Student |
| `/student/events` | Inline stub | Student |
| `/student/feedback` | Inline stub | Student |
| `/student/team` | `OfficeTeam` | Student |

### Sidebar Nav Items by View
**Office View**: Dashboard · Expenses · Clubs & Socs Intel · Student Intel · Events Dashboard · Grievances/Feedback

**Clubs/Socs View**: Dashboard · Members · Inductions · Events · Finances

**Student View**: Dashboard · Profile · Explore clubs/socs · Events · Grievance/Feedback · Office Team
