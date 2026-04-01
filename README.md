# Quixort — Institutional Intelligence & Alignment

> **ROBOTS & AGENTS**: For a full technical blueprint designed for AI agents to rebuild or extend this portal, please refer to [APP_SPECIFICATION.md](./APP_SPECIFICATION.md).

Quixort is a high-density, tri-modal administrative platform for Student Affairs offices. It provides Dean-level institutional oversight through a unified query architecture and integrated risk/concentration dashboards.

---

## 🏛️ Project Architecture

```
src/
├── App.jsx                          # Router & View Orchestration
├── index.css                        # "Glass-Industrial" Design System
│
├── data/                            # Persistent State & Schemas
│   ├── mockData.js                  # Central dataset
│   └── schemas.js                   # Display & Query logic
│
├── components/                      # UI Components
│   ├── Layout/                      # Sidebar & Topbar
│   └── Shared/                      # Query Engine, DataTable, Tooltips
│
└── pages/                           # Stakeholder Views
    ├── Office/                      # Strategic Analytics
    ├── Student/                     # Personal Identity & Mentorship
    └── Clubs/                       # Organizational Operations
```

---

## 🚀 Core Features

### 📉 Integrated Analytical Hubs
The main dashboard consolidates critical metrics into high-density "Hubs" to expose systemic issues:
- **Risk Hub**: Immediate Isolation Risk + Total Rejection Pool.
- **Elite Hub**: Leadership Bottleneck + Concentrated Success.

### 🔍 Shared Intelligence Engine
- **Boolean Querying**: Advanced multi-segment query builder with AND/OR logic.
- **Data-Drilling**: Instant filtering across all Student/Club fields (Major, Batch, Budget, etc.).

### 👤 Student Identity & Alignment
- **My Profile**: Identity management (Major, Minor, Batch).
- **Interests Vector**: Interactive tag-based interests that drive AI recommendations.

---

## 🛠️ Getting Started

```bash
# Install & Run
npm install
npm run dev
```

For more details on the visual design, component library, and data models, see the [Full Specification](./APP_SPECIFICATION.md).
