import React, { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route, NavLink, useNavigate, useLocation, useParams } from 'react-router-dom';
import {
  Search, Bell, AlertTriangle, Users, Calendar,
  BarChart2, Activity, LayoutDashboard, ChevronRight,
  TrendingDown, CheckCircle, XCircle, UserX, UserPlus,
  ShieldAlert, Settings, BookOpen, Filter, Plus,
  ExternalLink, CreditCard, FileText, UserCheck, MessageSquare,
  Compass, Heart, LogOut, MoreHorizontal, User,
  ChevronDown
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';

// --- HELPERS --- //
const Briefcase = ({ size }) => <BookOpen size={size} />;

// --- TYPES / CONSTANTS --- //
const VIEWS = {
  OFFICE: 'office',
  CLUBS: 'clubs',
  STUDENT: 'student'
};

// --- MOCK DATA --- //
const MOCK_CLUBS = [
  {
    id: 1, name: 'Orators', category: 'Debating', members: 120, leaders: 5, funding: '₹15,000', status: 'Active',
    description: 'Premier debaters and public speaking society on campus.',
    departments: [
      { name: 'Debate Core', lead: 'Rahul S.', students: ['Rahul S.', 'Aman V.', 'Anshika C.'] },
      { name: 'Logistics', lead: 'Priya K.', students: ['Priya K.', 'Vikram R.'] }
    ]
  },
  {
    id: 2, name: 'Jazbaa', category: 'Theatre', members: 85, leaders: 4, funding: '₹15,000', status: 'Active',
    description: 'The street play and dramatics society focusing on social issues.',
    departments: [
      { name: 'Street Play', lead: 'Rahul S.', students: ['Rahul S.', 'Kritika B.', 'Sanya M.'] },
      { name: 'Production', lead: 'Megha L.', students: ['Megha L.', 'Aman V.'] }
    ]
  },
  {
    id: 3, name: 'Tech Soc', category: 'Technology', members: 210, leaders: 8, funding: '₹15,000', status: 'Active',
    description: 'Coding, robotics, and innovation hub.',
    departments: [
      { name: 'Software Dev', lead: 'Anshika C.', students: ['Anshika C.', 'Rahul S.'] },
      { name: 'Hardware', lead: 'Vikram R.', students: ['Vikram R.'] }
    ]
  },
  { id: 4, name: 'Music Soc', category: 'Arts', members: 60, leaders: 3, funding: '₹12,000', status: 'Pending' },
];

const MOCK_STUDENTS = [
  {
    id: 1, name: 'Ibrahim Khalil', batch: 'UG25', clubs: [], leadershipPositions: 0, applied: 8, accepted: 0, rejected: 8,
    acceptanceRate: 0, rejectionRate: 100, year: 1,
    journey: 'Isolation alert: 8/8 Rejections. Critical intervention case.'
  },
  { id: 2, name: 'Anshika C.', batch: 'UG25', clubs: ['Orators', 'Tech Soc'], leadershipPositions: 1, applied: 4, accepted: 2, rejected: 2, acceptanceRate: 50, rejectionRate: 50, year: 1 },
  { id: 3, name: 'Rahul S.', batch: 'UG23', clubs: ['Music Soc', 'Tech Soc', 'Orators', 'Jazbaa'], leadershipPositions: 13, applied: 2, accepted: 2, rejected: 0, acceptanceRate: 100, rejectionRate: 0, year: 3 },
  { id: 4, name: 'Priya K.', batch: 'UG24', clubs: ['Eco Club'], leadershipPositions: 0, applied: 10, accepted: 1, rejected: 9, acceptanceRate: 10, rejectionRate: 90, year: 2 },
  { id: 5, name: 'Aman V.', batch: 'UG23', clubs: ['Orators', 'Photography', 'Music Soc'], leadershipPositions: 3, applied: 5, accepted: 5, rejected: 0, acceptanceRate: 100, rejectionRate: 0, year: 3 },
  { id: 6, name: 'Sanya M.', batch: 'UG25', clubs: ['Theatre Soc'], leadershipPositions: 2, applied: 3, accepted: 1, rejected: 2, acceptanceRate: 33, rejectionRate: 67, year: 1 },
  { id: 7, name: 'Vikram R.', batch: 'UG24', clubs: ['Tech Soc'], leadershipPositions: 0, applied: 6, accepted: 1, rejected: 5, acceptanceRate: 16, rejectionRate: 84, year: 2 },
  { id: 8, name: 'Kritika B.', batch: 'UG23', clubs: ['Jazbaa', 'Music Soc', 'Orators', 'Debate Soc', 'Literary Soc'], leadershipPositions: 5, applied: 6, accepted: 5, rejected: 1, acceptanceRate: 83, rejectionRate: 17, year: 3 },
  { id: 9, name: 'Arjun P.', batch: 'UG25', clubs: [], leadershipPositions: 0, applied: 4, accepted: 0, rejected: 4, acceptanceRate: 0, rejectionRate: 100, year: 1 },
  { id: 10, name: 'Dhiya T.', batch: 'UG24', clubs: ['Orators'], leadershipPositions: 2, applied: 2, accepted: 1, rejected: 1, acceptanceRate: 50, rejectionRate: 50, year: 2 },
  { id: 11, name: 'Varun S.', batch: 'UG25', clubs: [], leadershipPositions: 0, applied: 5, accepted: 0, rejected: 5, acceptanceRate: 0, rejectionRate: 100, year: 1 },
  { id: 12, name: 'Megha L.', batch: 'UG23', clubs: ['Eco Club', 'Art Society'], leadershipPositions: 1, applied: 3, accepted: 2, rejected: 1, acceptanceRate: 66, rejectionRate: 33, year: 3 },
];

const OVERLAP_DATA = [
  { pair: ['Orators', 'Jazbaa'], overlap: 65, status: 'Flagged', risk: 'Institutional Capture' },
  { pair: ['Tech Soc', 'Orators'], overlap: 42, status: 'Review', risk: 'Leadership Overlap' },
  { pair: ['Music Soc', 'Jazbaa'], overlap: 20, status: 'Safe', risk: 'Minimal Concentration' },
];

const MOCK_GRIEVANCES = [
  {
    id: 1, studentId: 1, studentName: 'Ibrahim Khalil', type: 'High Priority', category: 'Selection Governance',
    date: 'Sept 5', text: 'I feel the selection process for Orators and Tech Soc was non-transparent. High overlap with existing Jazbaa core members detected.',
    aiAnalysis: 'Pattern validation: 60% overlap in selection outcome with Jazbaa leadership.',
    status: 'Formal Review Triggered'
  },
  {
    id: 2, studentId: 9, studentName: 'Arjun P.', type: 'Medium Priority', category: 'Student Engagement',
    date: 'Sept 8', text: 'Barriers to entry for freshmen are increasing. Repeated rejections from multiple societies.',
    aiAnalysis: 'System detected increasing social isolation metrics in freshman cohort.',
    status: 'Intervention Recommended'
  }
];

const MOCK_EVENTS = [
  { id: 1, title: 'Freshman Welcome Mixer', date: 12, cat: 'Social', status: 'Confirmed', rating: 4.8 },
  { id: 2, title: 'Debate Championship', date: 15, cat: 'Academic', status: 'Confirmed', rating: 3.2 },
  { id: 3, title: 'Innovation Hackathon', date: 20, cat: 'Technology', status: 'Confirmed', rating: 4.9 },
  { id: 4, title: 'Society Induction', date: 15, cat: 'Administrative', status: 'Flagged', rating: 0 },
];

const MOCK_REIMBURSEMENTS = [
  { id: 1, club: 'Tech Soc', amount: '₹12,400', description: 'Innovation Hackathon 24 Venue & Food', date: 'Sept 22', status: 'Pending', category: 'Events' },
  { id: 2, club: 'Music Soc', amount: '₹3,500', description: 'Guitar Strings & Amp Maintenance', date: 'Sept 24', status: 'Review', category: 'Maintenance' },
  { id: 3, club: 'Orators', amount: '₹1,200', description: 'Printing Debate Briefs (Cycle 1)', date: 'Sept 25', status: 'Pending', category: 'Adm' },
  { id: 4, club: 'Jazbaa', amount: '₹8,900', description: 'Stage Props: "The Final Act"', date: 'Sept 18', status: 'Approved', category: 'Production' },
];

function OfficeReimbursements() {
  const [reimbursements, setReimbursements] = useState(MOCK_REIMBURSEMENTS);

  const updateStatus = (id, newStatus) => {
    setReimbursements(reimbursements.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  return (
    <>
      <div className="page-header flex-between">
        <div>
          <h1 className="page-title">Institutional Reimbursement Desk</h1>
          <p>Managed disbursement of club allocations and asset procurement audits.</p>
        </div>
        <div className="badge outline" style={{ padding: '0.5rem 1rem' }}>Active Cycle: Q3 2024</div>
      </div>

      <div className="grid-cols-4" style={{ marginBottom: '2rem' }}>
        <div className="card" style={{ padding: '1.25rem' }}>
          <div className="micro-copy" style={{ fontWeight: 700 }}>Total Pending</div>
          <div className="stat-value" style={{ fontSize: '1.5rem' }}>₹17,100</div>
          <p className="micro-copy">Across 3 active requests</p>
        </div>
        <div className="card" style={{ padding: '1.25rem' }}>
          <div className="micro-copy" style={{ fontWeight: 700 }}>Avg Audit Time</div>
          <div className="stat-value" style={{ fontSize: '1.5rem' }}>14 hrs</div>
          <p className="micro-copy">Selection to Approval</p>
        </div>
        <div className="card" style={{ padding: '1.25rem' }}>
          <div className="micro-copy" style={{ fontWeight: 700 }}>Budget Utilization</div>
          <div className="stat-value" style={{ fontSize: '1.5rem', color: 'var(--success-color)' }}>62%</div>
          <p className="micro-copy">Total FY24-25 Allocation</p>
        </div>
        <div className="card" style={{ padding: '1.25rem' }}>
          <div className="micro-copy" style={{ fontWeight: 700 }}>Resubmission Rate</div>
          <div className="stat-value" style={{ fontSize: '1.5rem', color: 'var(--warning-color)' }}>12%</div>
          <p className="micro-copy">Documentation gaps detected</p>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Pending & Recent Submissions</div>
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Club Registry</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Submission Date</th>
                <th>Status</th>
                <th>Administrative Actions</th>
              </tr>
            </thead>
            <tbody>
              {reimbursements.map((r) => (
                <tr key={r.id}>
                  <td style={{ fontWeight: 700 }}>{r.club}</td>
                  <td><span className="badge outline" style={{ fontSize: '0.6rem' }}>{r.category}</span></td>
                  <td style={{ fontWeight: 800, color: 'var(--text-main)' }}>{r.amount}</td>
                  <td style={{ maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={r.description}>
                    {r.description}
                  </td>
                  <td>{r.date}</td>
                  <td>
                    <span className={`badge ${r.status === 'Approved' ? 'success' : r.status === 'Reject' ? 'danger' : r.status === 'Review' ? 'warning' : 'accent'}`}>
                      {r.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {r.status !== 'Approved' && (
                        <>
                          <button className="btn btn-primary" style={{ padding: '0.25rem 0.6rem', fontSize: '0.7rem' }} onClick={() => updateStatus(r.id, 'Approved')}>Approve</button>
                          <button className="btn btn-outline" style={{ padding: '0.25rem 0.6rem', fontSize: '0.7rem' }} onClick={() => updateStatus(r.id, 'Review')}>Resubmit</button>
                          <button className="btn btn-outline" style={{ padding: '0.25rem 0.6rem', fontSize: '0.7rem', borderColor: 'var(--danger-color)', color: 'var(--danger-color)' }} onClick={() => updateStatus(r.id, 'Reject')}>Reject</button>
                        </>
                      )}
                      {r.status === 'Approved' && (
                        <div className="micro-copy" style={{ color: 'var(--success-color)', display: 'flex', alignItems: 'center' }}>
                          <CheckCircle size={14} style={{ marginRight: '0.3rem' }} /> Transaction Closed
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// --- MAIN LAYOUT COMPONENT --- //
function DashboardLayout({ children, currentView, setView }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleViewChange = (e) => {
    const newView = e.target.value;
    setView(newView);
    // Redirect to the default path for that view
    if (newView === VIEWS.OFFICE) navigate('/');
    else if (newView === VIEWS.CLUBS) navigate('/club-management');
    else if (newView === VIEWS.STUDENT) navigate('/student-profile');
  };

  const getNavItems = () => {
    switch (currentView) {
      case VIEWS.OFFICE:
        return [
          { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
          { to: '/office/reimbursements', icon: CreditCard, label: 'Reimbursements' },
          { to: '/office/clubs', icon: Briefcase, label: 'Org Catalog' },
          { to: '/office/students', icon: Users, label: 'Students' },
          { to: '/office/events', icon: Calendar, label: 'Events' },
          { to: '/office/grievances', icon: MessageSquare, label: 'Grievances' },
        ];
      case VIEWS.CLUBS:
        return [
          { to: '/club-management', icon: LayoutDashboard, label: 'Club Hub' },
          { to: '/club-management/members', icon: Users, label: 'Members' },
          { to: '/club-management/induction', icon: FileText, label: 'Inductions' },
          { to: '/club-management/events', icon: Plus, label: 'Event Request' },
          { to: '/club-management/reimbursement', icon: CreditCard, label: 'Funding' },
        ];
      case VIEWS.STUDENT:
        return [
          { to: '/student-profile', icon: User, label: 'My Profile' },
          { to: '/student/discover', icon: Compass, label: 'Discover' },
          { to: '/student/events', icon: Calendar, label: 'Events' },
          { to: '/student/feedback', icon: MessageSquare, label: 'Feedback' },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>QUIXORT</span>
        </div>
        <nav className="sidebar-nav">
          {getNavItems().map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/' || item.to === '/club-management' || item.to === '/student-profile'}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}

          <div style={{ marginTop: 'auto', padding: '1rem 0' }}>
            {currentView === VIEWS.OFFICE && (
              <NavLink to="/bias" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                <ShieldAlert size={20} />
                System Analytics
              </NavLink>
            )}
          </div>
        </nav>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <select className="view-switcher" value={currentView} onChange={handleViewChange}>
              <option value={VIEWS.OFFICE}>Office View</option>
              <option value={VIEWS.CLUBS}>Clubs/Socs View</option>
              <option value={VIEWS.STUDENT}>Student View</option>
            </select>
            <div className="search-bar">
              <Search size={18} color="var(--text-muted)" />
              <input type="text" placeholder="Global search..." />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button className="btn btn-outline" style={{ border: 'none', padding: '0.5rem' }}>
              <Bell size={20} />
            </button>
            <div className="avatar" style={{ width: '2.25rem', height: '2.25rem', fontSize: '0.875rem' }}>
              AJ
            </div>
          </div>
        </header>
        <div className="page-container flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}

// --- OFFICE VIEW SCREENS --- //

function OfficeDashboard() {
  const navigate = useNavigate();
  const actionItems = [
    { id: 1, type: 'Grievance', label: '8 Grievances Pending Review', detail: 'Includes 1 high-priority ticket from Music Soc', priority: 'Critical' },
    { id: 2, type: 'Engagement', label: '12 Students at Isolation Risk', detail: 'UG25 cohort members with 100% rejection rate', priority: 'High' },
    { id: 3, type: 'Overlap', label: 'Conflict Registry: Orators ↔ Jazbaa', detail: 'Current personnel overlap at 65% (Flagged)', priority: 'Review' },
    { id: 4, type: 'Budget', label: '1 Pending Funding Request', detail: 'Tech Soc: ₹12,400 reimbursement audit', priority: 'Medium' },
  ];

  const highRiskStudents = MOCK_STUDENTS.filter(s => s.rejectionRate > 80);

  return (
    <>
      <div className="page-header flex-between">
        <div>
          <h1 className="page-title">Institutional Intelligence Dashboard</h1>
          <p>Real-time visibility into organizational health, behavioral patterns, and student registry.</p>
        </div>
        <div className="badge outline" style={{ padding: '0.5rem 1rem' }}>Snapshot: {new Date().toLocaleDateString('en-IN')}</div>
      </div>

      <div className="grid-cols-4" style={{ marginBottom: '2rem' }}>
        <div className="card" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0) 100%)' }}>
          <div className="micro-copy" style={{ fontWeight: 700 }}>Social Isolation Profile</div>
          <div className="stat-value" style={{ fontSize: '2rem' }}>12</div>
          <p className="micro-copy">Students with zero societal ties</p>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--warning-color)' }}>
          <div className="micro-copy" style={{ fontWeight: 700 }}>Power Concentration Score</div>
          <div className="stat-value" style={{ fontSize: '2rem', color: 'var(--warning-color)' }}>0.42 Ratio</div>
          <p className="micro-copy">Unique Students / Total Positions (Higher is Better)</p>
        </div>
        <div className="card">
          <div className="micro-copy" style={{ fontWeight: 700 }}>Active Grievances</div>
          <div className="stat-value" style={{ fontSize: '2rem' }}>08</div>
          <p className="micro-copy">Total pending review</p>
        </div>
        <div className="card">
          <div className="micro-copy" style={{ fontWeight: 700 }}>Org Registry Count</div>
          <div className="stat-value" style={{ fontSize: '2rem' }}>42</div>
          <p className="micro-copy">Registered Clubs & Societies</p>
        </div>
      </div>

      <div className="grid-cols-3" style={{ gridTemplateColumns: '400px 1fr 340px' }}>
        {/* ADMINISTRATIVE ACTION ITEMS */}
        <div className="card">
          <div className="card-title">Administrative Action Items</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {actionItems.map(item => (
              <div key={item.id} className="glass-list-item" style={{ borderLeft: `4px solid var(--${item.priority === 'Critical' ? 'danger' : item.priority === 'High' ? 'warning' : 'accent'}-color)` }}>
                <div className="flex-between">
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{item.label}</span>
                  <span className={`badge ${item.priority.toLowerCase()}`} style={{ fontSize: '0.65rem' }}>{item.priority}</span>
                </div>
                <div className="micro-copy" style={{ marginTop: '0.25rem' }}>{item.detail}</div>
                <button className="btn btn-outline" style={{ marginTop: '0.75rem', width: '100%', fontSize: '0.75rem', padding: '0.3rem' }}>Action on item</button>
              </div>
            ))}
          </div>
        </div>

        {/* STUDENT ENGAGEMENT RISK SPOTLIGHT */}
        <div className="card">
          <div className="card-title">Engagement Isolation Registry</div>
          <p className="micro-copy mb-4">Point-in-time listing of students with 100% rejection across all applications.</p>
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr><th>Student</th><th>Batch</th><th>Metric</th><th>Status</th></tr>
              </thead>
              <tbody>
                {highRiskStudents.map(s => (
                  <tr key={s.id} onClick={() => navigate(`/office/students/${s.id}`)} style={{ cursor: 'pointer' }}>
                    <td style={{ fontWeight: 700 }}>{s.name}</td>
                    <td>{s.batch}</td>
                    <td><span className="badge danger" style={{ fontSize: '0.65rem' }}>{s.rejectionRate}% Reject</span></td>
                    <td><UserX size={14} color="var(--danger-color)" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="btn btn-outline" style={{ width: '100%', marginTop: '1rem' }} onClick={() => navigate('/office/students')}>Open full risk directory</button>
        </div>

        {/* AI FEEDBACK SUMMARY */}
        <div className="card">
          <div className="card-title">Current System Insights (AI)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="glass-list-item" style={{ borderLeft: '3px solid var(--danger-color)', padding: '0.75rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--danger-color)' }}>Institutional Capture Pattern</div>
              <p className="micro-copy">Personnel overlap between 'Orators' and 'Jazbaa' core teams is exactly 65%. High potential for selection bias.</p>
            </div>
            <div className="glass-list-item" style={{ borderLeft: '3px solid var(--warning-color)', padding: '0.75rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--warning-color)' }}>Social Exhaustion Markers</div>
              <p className="micro-copy">Current grievance data contains 5 direct mentions of "Selection Exhaustion" in the UG25 cohort.</p>
            </div>
          </div>
          <button className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }} onClick={() => navigate('/office/grievances')}>Open Central Registry</button>
        </div>
      </div>

      <div className="grid-cols-2" style={{ marginTop: '2rem' }}>
        <div className="card">
          <div className="card-title">Top Campus Leaders (Concentration)</div>
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr><th>Student</th><th>Roles</th><th>Impact Score</th></tr>
              </thead>
              <tbody>
                <tr><td>Rahul Sharma</td><td><span className="badge warning">13 Clubs</span></td><td>9.8/10</td></tr>
                <tr><td>Kritika B.</td><td><span className="badge warning">5 Clubs</span></td><td>8.2/10</td></tr>
                <tr><td>Aman V.</td><td>3 Clubs</td><td>7.5/10</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Cohort Isolation Profile</div>
          <p className="micro-copy mb-4">Total students per batch with zero societal affiliations.</p>
          <div style={{ height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { batch: 'UG23', isolated: 2 },
                { batch: 'UG24', isolated: 4 },
                { batch: 'UG25', isolated: 12 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="batch" stroke="var(--text-muted)" fontSize={12} axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} stroke="var(--text-muted)" fontSize={10} />
                <RechartsTooltip contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }} />
                <Bar dataKey="isolated" fill="var(--danger-color)" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}

function OfficeClubs() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('table');

  // Intelligence calculations
  const totalOrgs = MOCK_CLUBS.length;
  const totalPersonnelPositions = MOCK_CLUBS.reduce((sum, c) => sum + parseInt(c.members), 0);

  // Simulated unique headcount (deduplicating based on overlapping averages)
  const uniqueHeadcount = Math.floor(totalPersonnelPositions * 0.72);
  const totalCampusStudents = 4500; // Point-in-time total enrollment
  const penetrationRate = ((uniqueHeadcount / totalCampusStudents) * 100).toFixed(1);

  const categoryStats = MOCK_CLUBS.reduce((acc, club) => {
    acc[club.category] = (acc[club.category] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(categoryStats).map(([name, value]) => ({ name, value }));
  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <>
      <div className="page-header flex-between">
        <div>
          <h1 className="page-title">Institutional Org Catalog</h1>
          <p>System-wide directory of registered organizations and departmental structures.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="flex-between" style={{ background: 'var(--card-bg)', padding: '0.25rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
            <button className={`btn ${viewMode === 'table' ? 'btn-primary' : ''}`} style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }} onClick={() => setViewMode('table')}>Table</button>
            <button className={`btn ${viewMode === 'grid' ? 'btn-primary' : ''}`} style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }} onClick={() => setViewMode('grid')}>Cards</button>
          </div>
          <button className="btn btn-primary">
            <Plus size={18} style={{ marginRight: '0.5rem' }} /> Register Organization
          </button>
        </div>
      </div>

      <div className="grid-cols-4" style={{ marginBottom: '2rem' }}>
        <div className="card" style={{ padding: '1rem' }}>
          <div className="micro-copy" style={{ fontWeight: 700 }}>Total Organizations</div>
          <div className="stat-value" style={{ fontSize: '1.5rem' }}>{totalOrgs}</div>
          <p className="micro-copy">Active registries</p>
        </div>
        <div className="card" style={{ padding: '1rem' }}>
          <div className="micro-copy" style={{ fontWeight: 700 }}>Personnel Capacity</div>
          <div className="stat-value" style={{ fontSize: '1.5rem' }}>{totalPersonnelPositions}</div>
          <p className="micro-copy">Cumulative club roles</p>
        </div>
        <div className="card" style={{ padding: '1rem' }}>
          <div className="micro-copy" style={{ fontWeight: 700 }}>Unique Headcount</div>
          <div className="stat-value" style={{ fontSize: '1.5rem' }}>{uniqueHeadcount}</div>
          <p className="micro-copy">Distinct students participating</p>
        </div>
        <div className="card" style={{ padding: '1rem' }}>
          <div className="micro-copy" style={{ fontWeight: 700 }}>Campus Penetration</div>
          <div className="stat-value" style={{ fontSize: '1.5rem', color: 'var(--accent-color)' }}>{penetrationRate}%</div>
          <p className="micro-copy">Participation/Enrollment ratio</p>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <div className="card">
          <div className="card-title">Classification Distribution</div>
          <div className="grid-cols-2" style={{ alignItems: 'center' }}>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value">
                    {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <RechartsTooltip contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {pieData.map((entry, index) => (
                <div key={index} className="glass-list-item" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: COLORS[index % COLORS.length] }}></div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{entry.name}</span>
                    <span className="micro-copy" style={{ fontSize: '0.75rem' }}>{entry.value} Registered Orgs</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {viewMode === 'table' ? (
        <div className="card">
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Organization Name</th>
                  <th>Classification</th>
                  <th>Total Personnel</th>
                  <th>Leadership</th>
                  <th>Fiscal Allocation</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_CLUBS.map(club => (
                  <tr key={club.id}>
                    <td style={{ fontWeight: 700 }}>{club.name}</td>
                    <td><span className="badge outline">{club.category}</span></td>
                    <td>{club.members} students</td>
                    <td>{club.leaders} positions</td>
                    <td style={{ color: 'var(--success-color)', fontWeight: 600 }}>{club.funding}</td>
                    <td><span className={`badge ${club.status === 'Active' ? 'success' : 'warning'}`}>{club.status}</span></td>
                    <td>
                      <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => navigate(`/office/clubs/${club.id}`)}>Audit Profile</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid-cols-2" style={{ gap: '2rem' }}>
          {MOCK_CLUBS.map(club => (
            <div key={club.id} className="card" onClick={() => navigate(`/office/clubs/${club.id}`)} style={{ cursor: 'pointer' }}>
              <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{club.name}</h3>
                  <span className="micro-copy">{club.category}</span>
                </div>
                <span className={`badge ${club.status === 'Active' ? 'success' : 'warning'}`}>{club.status}</span>
              </div>
              <div className="grid-cols-2" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '0.75rem' }}>
                  <div className="micro-copy">Total Membership</div>
                  <div style={{ fontWeight: 800, fontSize: '1.25rem' }}>{club.members}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '0.75rem' }}>
                  <div className="micro-copy">Core Leaders</div>
                  <div style={{ fontWeight: 800, fontSize: '1.25rem' }}>{club.leaders}</div>
                </div>
              </div>
              <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <div className="flex-between">
                  <span className="micro-copy">Allocated Funding (Annual)</span>
                  <span style={{ fontWeight: 600, color: 'var(--success-color)' }}>{club.funding}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function OfficeClubDetail() {
  const navigate = useNavigate();
  return (
    <>
      <div className="page-header">
        <button className="btn btn-outline" style={{ marginBottom: '1rem' }} onClick={() => navigate('/office/clubs')}>← Back to Clubs</button>
        <h1 className="page-title">Tech Soc Profile</h1>
        <p>Managed by the Office of Student Affairs since 2021.</p>
      </div>

      <div className="grid-cols-3">
        <div className="card">
          <div className="card-title">Description</div>
          <p className="micro-copy" style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>
            The Tech Soc is dedicated to fostering innovation and technical skills among students. They organize annual hackathons, workshops, and weekly coding sessions.
          </p>
        </div>
        <div className="card">
          <div className="card-title">Leadership Structure</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="alert-item warning" style={{ background: 'var(--bg-color)', border: '1px solid var(--border-color)', margin: 0 }}>
              <UserCheck size={16} /> <div><strong>Rahul Sharma</strong><br /><span className="micro-copy">Lead Strategist</span></div>
            </div>
            <div className="alert-item" style={{ background: 'var(--bg-color)', border: '1px solid var(--border-color)', margin: 0 }}>
              <UserCheck size={16} /> <div><strong>Anshika Singh</strong><br /><span className="micro-copy">Operations Lead</span></div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-title">Engagement Health</div>
          <div className="stat-value" style={{ color: 'var(--success-color)' }}>High</div>
          <p className="micro-copy">95% consistent participation in last 3 events</p>
          <div className="progress-bar-container"><div className="progress-bar-fill" style={{ width: '95%' }}></div></div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <div className="card-title">All Members (210)</div>
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr><th>Name</th><th>Role</th><th>Status</th><th>Engagement</th></tr>
            </thead>
            <tbody>
              <tr><td>Ibrahim Khalil</td><td>Core Member</td><td><span className="badge success">Active</span></td><td>High (12/12)</td></tr>
              <tr><td>Priya Kaur</td><td>Member</td><td><span className="badge success">Active</span></td><td>Mid (8/12)</td></tr>
              <tr><td>Aman Verma</td><td>Member</td><td><span className="badge warning">Low</span></td><td>Low (2/12)</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function OfficeStudents() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    batch: '',
    club: '',
    minAcceptance: '',
    maxRejection: '',
    minLeadership: 0
  });
  const [sortConfig, setSortConfig] = useState({ key: 'leadershipPositions', direction: 'desc' });

  // Calculate Insights
  const batchAnalytics = ['UG23', 'UG24', 'UG25'].map(batch => {
    const studentsInBatch = MOCK_STUDENTS.filter(s => s.batch === batch);
    const isolated = studentsInBatch.filter(s => s.clubs.length === 0).length;
    const active = studentsInBatch.length - isolated;
    return {
      batch,
      data: [
        { name: 'Active (1+ Clubs)', value: active },
        { name: 'None (Isolation Risk)', value: isolated }
      ]
    };
  });

  const zeroMembershipFirstYears = MOCK_STUDENTS.filter(s => s.year === 1 && s.clubs.length === 0).length;
  const totalLeadershipRoles = MOCK_STUDENTS.reduce((acc, s) => acc + s.leadershipPositions, 0);
  const studentsSortedByLeadership = [...MOCK_STUDENTS].sort((a, b) => b.leadershipPositions - a.leadershipPositions);
  const top5PercentCount = Math.max(1, Math.ceil(MOCK_STUDENTS.length * 0.05));
  const top5PercentLeadership = studentsSortedByLeadership.slice(0, top5PercentCount).reduce((acc, s) => acc + s.leadershipPositions, 0);
  const leadershipConcentration = ((top5PercentLeadership / totalLeadershipRoles) * 100).toFixed(0);

  const COLORS = ['#6366f1', '#ef4444'];

  const filteredStudents = useMemo(() => {
    let result = MOCK_STUDENTS.filter(s => {
      let match = true;
      if (filter.batch && s.batch !== filter.batch) match = false;
      if (filter.club && !s.clubs.includes(filter.club)) match = false;
      if (filter.minAcceptance && s.acceptanceRate < parseInt(filter.minAcceptance)) match = false;
      if (filter.maxRejection && s.rejectionRate > parseInt(filter.maxRejection)) match = false;
      if (filter.minLeadership && s.leadershipPositions < parseInt(filter.minLeadership)) match = false;
      return match;
    });

    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [filter, sortConfig]);

  const requestSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Student Intelligence Directory</h1>
        <p>Advanced metrics & behavioral analytics for full-campus visibility.</p>
      </div>

      <div className="grid-cols-3" style={{ marginBottom: '2rem' }}>
        {batchAnalytics.map(batch => (
          <div key={batch.batch} className="card" style={{ padding: '1rem' }}>
            <div className="card-title" style={{ fontSize: '0.8rem', textAlign: 'center' }}>{batch.batch} Isolation Profile</div>
            <div style={{ height: 160 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={batch.data} cx="50%" cy="50%" innerRadius={40} outerRadius={55} paddingAngle={4} dataKey="value">
                    {batch.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <RechartsTooltip contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: COLORS[0] }}></div>
                <span className="micro-copy" style={{ fontSize: '0.65rem' }}>Active</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: COLORS[1] }}></div>
                <span className="micro-copy" style={{ fontSize: '0.65rem' }}>Isolated</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Insights Bar */}
      <div className="grid-cols-3" style={{ marginBottom: '2rem' }}>
        <div className="card" style={{ borderLeft: '4px solid var(--danger-color)', padding: '1.25rem' }}>
          <div className="card-title" style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>Engagement Risk</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{zeroMembershipFirstYears} Freshmen</div>
          <p className="micro-copy">Zero club memberships detected. High isolation risk.</p>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--warning-color)', padding: '1.25rem' }}>
          <div className="card-title" style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>Power Concentration Score</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--warning-color)' }}>0.42 Ratio</div>
          <p className="micro-copy">Unique Leaders / Total Roles (Higher is Better)</p>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--accent-color)', padding: '1.25rem' }}>
          <div className="card-title" style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>Avg Acceptance</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>38% Overall</div>
          <p className="micro-copy">Across all competitive club induction cycles.</p>
        </div>
      </div>

      <div className="filter-bar card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Filter size={18} color="var(--text-muted)" />
          <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Strategic Selection:</span>

          <select className="filter-input" value={filter.batch} onChange={(e) => setFilter({ ...filter, batch: e.target.value })}>
            <option value="">Year/Batch (All)</option>
            <option value="UG23">UG23</option>
            <option value="UG24">UG24</option>
            <option value="UG25">UG25</option>
          </select>

          <select className="filter-input" value={filter.club} onChange={(e) => setFilter({ ...filter, club: e.target.value })}>
            <option value="">Club Registry</option>
            <option value="Orators">Orators</option>
            <option value="Tech Soc">Tech Soc</option>
            <option value="Jazbaa">Jazbaa</option>
          </select>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className={`btn ${filter.maxRejection === 80 ? 'btn-primary' : 'btn-outline'}`} style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem' }} onClick={() => setFilter({ ...filter, maxRejection: 80, minLeadership: 0 })}>Isolation Risk</button>
            <button className={`btn ${filter.minLeadership === 3 ? 'btn-primary' : 'btn-outline'}`} style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem' }} onClick={() => setFilter({ ...filter, minLeadership: 3, maxRejection: '' })}>Power Concentration</button>
            <button className="btn btn-outline" style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem' }} onClick={() => setFilter({ batch: '', club: '', minAcceptance: '', maxRejection: '', minLeadership: 0 })}>Reset</button>
          </div>
        </div>
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th onClick={() => requestSort('name')} style={{ cursor: 'pointer' }}>Student Name {sortConfig.key === 'name' && (sortConfig.direction === 'desc' ? '↓' : '↑')}</th>
              <th onClick={() => requestSort('batch')} style={{ cursor: 'pointer' }}>Batch</th>
              <th>Clubs</th>
              <th onClick={() => requestSort('leadershipPositions')} style={{ cursor: 'pointer', color: 'var(--accent-color)' }}>Leadership {sortConfig.key === 'leadershipPositions' && (sortConfig.direction === 'desc' ? '↓' : '↑')}</th>
              <th onClick={() => requestSort('acceptanceRate')} style={{ cursor: 'pointer' }}>Accept %</th>
              <th onClick={() => requestSort('rejectionRate')} style={{ cursor: 'pointer' }}>Reject %</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student.id}>
                <td style={{ fontWeight: 600 }}>{student.name}</td>
                <td><span className="badge outline" style={{ border: '1px solid var(--border-color)', background: 'transparent' }}>{student.batch}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                    {student.clubs.slice(0, 2).map(c => <span key={c} className="badge" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem', background: 'var(--accent-light)' }}>{c}</span>)}
                    {student.clubs.length > 2 && <span className="micro-copy">+{student.clubs.length - 2}</span>}
                  </div>
                </td>
                <td style={{ fontWeight: 700, color: student.leadershipPositions > 2 ? 'var(--warning-color)' : 'inherit' }}>
                  {student.leadershipPositions} positions
                </td>
                <td style={{ color: student.acceptanceRate > 50 ? 'var(--success-color)' : 'inherit' }}>{student.acceptanceRate}%</td>
                <td style={{ color: student.rejectionRate > 70 ? 'var(--danger-color)' : 'inherit' }}>{student.rejectionRate}%</td>
                <td>
                  {student.rejectionRate === 100 ? <span className="badge danger">Frustrated</span> : student.leadershipPositions > 3 ? <span className="badge warning">Overloaded</span> : <span className="badge success">Balanced</span>}
                </td>
                <td>
                  <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => navigate(`/office/students/${student.id}`)}>View Profile</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function OfficeStudentDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const student = MOCK_STUDENTS.find(s => s.id === parseInt(id)) || MOCK_STUDENTS[0];
  const grievance = MOCK_GRIEVANCES.find(g => g.studentId === student.id);

  return (
    <>
      <div className="page-header flex-between">
        <div>
          <button className="btn btn-outline" style={{ marginBottom: '1rem' }} onClick={() => navigate('/office/students')}>← Back to Students</button>
          <h1 className="page-title">{student.name}</h1>
          <p>{student.batch} • Student ID: AS202400{student.id} • {student.year > 1 ? 'Returning Student' : 'Freshman'}</p>
        </div>
        <div className="flex-between" style={{ gap: '1rem' }}>
          <button className="btn btn-primary" style={{ background: 'var(--success-color)' }}><UserPlus size={18} style={{ marginRight: '0.5rem' }} /> Assign to Office Project</button>
        </div>
      </div>

      <div className="grid-cols-3">
        <div className="card">
          <div className="card-title">Engagement Statistics</div>
          <div className="grid-cols-2" style={{ gap: '1rem' }}>
            <div><div className="micro-copy">Applied</div><div className="stat-value" style={{ fontSize: '1.5rem' }}>{student.applied}</div></div>
            <div><div className="micro-copy">Accepted</div><div className="stat-value" style={{ fontSize: '1.5rem', color: student.accepted > 0 ? 'var(--success-color)' : 'var(--danger-color)' }}>{student.accepted}</div></div>
            <div><div className="micro-copy">Memberships</div><div className="stat-value" style={{ fontSize: '1.5rem' }}>{student.clubs.length}</div></div>
            <div><div className="micro-copy">Leadership</div><div className="stat-value" style={{ fontSize: '1.5rem' }}>{student.leadershipPositions}</div></div>
          </div>
          <div className="alert-item danger" style={{ marginTop: '1.5rem' }}>
            <strong>System Flag:</strong> Isolation Risk (Threshold exceeded)
          </div>
        </div>

        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div className="card-title">Intervention Story: Case #00{student.id}</div>
          <div className="glass-list-item" style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Grievance Filed: {grievance?.category || 'No active grievance'}</div>
            <p className="micro-copy" style={{ color: 'var(--text-main)', fontStyle: 'italic' }}>
              "{grievance?.text || 'No grievance text available.'}"
            </p>
          </div>
          <div className="grid-cols-2" style={{ gap: '1.5rem' }}>
            <div>
              <div className="micro-copy mb-2" style={{ fontWeight: 700 }}>AI Investigation Result</div>
              <div className="alert-item danger" style={{ padding: '0.75rem', margin: 0 }}>
                <Activity size={16} />
                <div className="micro-copy" style={{ color: 'var(--text-main)' }}>{grievance?.aiAnalysis || 'System analyzing patterns...'}</div>
              </div>
            </div>
            <div>
              <div className="micro-copy mb-2" style={{ fontWeight: 700 }}>Proposed Resolution</div>
              <p className="micro-copy" style={{ color: 'var(--text-main)' }}>
                Offer placement in <strong>Office Projects (Logistics/Operations)</strong> to bypass club-level bias and ensure campus retention.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <div className="card-title">Full Application History</div>
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr><th>Cycle</th><th>Organization</th><th>Stage Reached</th><th>Decision</th><th>Notes</th></tr>
            </thead>
            <tbody>
              <tr><td>Sept 2024</td><td>Orators</td><td>Interview</td><td><span className="badge danger">Rejected</span></td><td>Cited "cultural fit"</td></tr>
              <tr><td>Sept 2024</td><td>Tech Soc</td><td>Selection Task</td><td><span className="badge danger">Rejected</span></td><td>Pattern: Overlap with Jazbaa detected</td></tr>
              <tr><td>Aug 2024</td><td>Debate Soc</td><td>Round 1</td><td><span className="badge danger">Rejected</span></td><td>-</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// --- CLUBS/SOCS VIEW SCREENS --- //

function ClubDashboard() {
  return (
    <>
      <div className="page-header flex-between">
        <div>
          <h1 className="page-title">Management: Tech Soc</h1>
          <p>Real-time control over your club's logistics & team.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline"><MoreHorizontal size={18} /></button>
          <button className="btn btn-primary">
            <Plus size={18} style={{ marginRight: '0.5rem' }} /> New Request
          </button>
        </div>
      </div>

      <div className="grid-cols-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
        <div className="card">
          <div className="card-title">Total Members</div>
          <div className="stat-value">210</div>
          <p className="micro-copy">+15 new this month</p>
        </div>
        <div className="card">
          <div className="card-title">Leaders/Core</div>
          <div className="stat-value">8</div>
          <p className="micro-copy">3 active roles open</p>
        </div>
        <div className="card">
          <div className="card-title">Budget Allocation</div>
          <div className="stat-value">₹15,000</div>
          <p className="micro-copy">72% utilized</p>
        </div>
        <div className="card">
          <div className="card-title">Induction Success</div>
          <div className="stat-value">22%</div>
          <p className="micro-copy">120 applicants</p>
        </div>
      </div>

      <div style={{ marginTop: '2.5rem' }}>
        <div className="card">
          <div className="card-title">Governance Task Queue</div>
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr><th>Due Date</th><th>Task Description</th><th>Resource Impact</th><th>Status</th><th>Action</th></tr>
              </thead>
              <tbody>
                <tr><td>Sept 25</td><td>Submit Reimbursement: 'Hackathon 24'</td><td>₹12,400</td><td><span className="badge danger">Urgent</span></td><td><button className="btn btn-primary" style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}>Upload Receipts</button></td></tr>
                <tr><td>Sept 28</td><td>Review Induction Forms (Cycle #2)</td><td>120 Applicants</td><td><span className="badge warning">Pending</span></td><td><button className="btn btn-outline" style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}>Open Review</button></td></tr>
                <tr><td>Oct 02</td><td>Inventory Audit: Production Assets</td><td>Hardware Soc</td><td><span className="badge outline">Upcoming</span></td><td><button className="btn btn-outline" style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}>Checklist</button></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

// --- STUDENT VIEW SCREENS --- //

function StudentDashboard() {
  const navigate = useNavigate();
  const [showMentorshipModal, setShowMentorshipModal] = useState(false);

  const recommendedClubs = [
    { name: 'Debating Society', reason: 'High match with your "Public Speaking" interest', type: 'Intellectual' },
    { name: 'Developer Student Club', reason: 'Matches your "Python" and "Backend" skills', type: 'Tech' },
    { name: 'Fine Arts Society', reason: 'Complementary to your design portfolio', type: 'Aesthetics' }
  ];

  const mentorshipSlots = [
    { type: 'Application Review', duration: '20 mins', icon: <FileText size={16} /> },
    { type: 'Mock Interview Prep', duration: '30 mins', icon: <Users size={16} /> },
    { type: 'Skill Alignment IQ', duration: '15 mins', icon: <Activity size={16} /> }
  ];

  return (
    <>
      <div className="page-header flex-between">
        <div>
          <h1 className="page-title">Ibrahim's Student HQ</h1>
          <p>Personnel alignment, institutional mentorship, and organizational discovery.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-outline" onClick={() => navigate('/office/students/1')}>
            <User size={18} style={{ marginRight: '0.5rem' }} /> Detailed Portfolio
          </button>
        </div>
      </div>

      <div className="grid-cols-3" style={{ gridTemplateColumns: 'minmax(0, 1fr) 350px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', gridColumn: 'span 2' }}>

          {/* AI MATCHING RECOMMENDATIONS */}
          <div className="card" style={{ borderLeft: '4px solid var(--accent-color)' }}>
            <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
              <div>
                <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Compass size={20} color="var(--accent-color)" /> AI Personnel Alignment (Suggested)
                </div>
                <p className="micro-copy">Clubs matching your identified behavioral traits and technical interests.</p>
              </div>
            </div>
            <div className="grid-cols-3" style={{ gap: '1rem' }}>
              {recommendedClubs.map((club, i) => (
                <div key={i} className="glass-list-item" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>{club.name}</div>
                    <div className="badge outline" style={{ fontSize: '0.6rem', marginBottom: '0.75rem' }}>{club.type}</div>
                    <p className="micro-copy" style={{ fontSize: '0.75rem', lineHeight: 1.3 }}>{club.reason}</p>
                  </div>
                  <button className="btn btn-outline" style={{ marginTop: '1rem', width: '100%', fontSize: '0.7rem', padding: '0.3rem' }}>Review Induction Policy</button>
                </div>
              ))}
            </div>
          </div>
          <div className="grid-cols-2" style={{ gap: '1rem' }}>
            <div className="card" style={{ padding: '1.25rem', background: 'rgba(255, 255, 255, 0.03)' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                <div className="avatar" style={{ width: '2.5rem', height: '2.5rem' }}>DS</div>
                <div><div style={{ fontWeight: 700 }}>Design Society</div><div className="micro-copy">50 Members</div></div>
              </div>
              <p className="micro-copy mb-4" style={{ fontSize: '0.8rem' }}>Create visual experiences. Learning tools like Figma & Canva.</p>
              <button className="btn btn-primary" style={{ width: '100%', padding: '0.4rem' }}>Apply Now</button>
            </div>
            <div className="card" style={{ padding: '1.25rem', background: 'rgba(255, 255, 255, 0.03)' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                <div className="avatar" style={{ width: '2.5rem', height: '2.5rem', background: 'var(--success-color)' }}>PH</div>
                <div><div style={{ fontWeight: 700 }}>Photography Club</div><div className="micro-copy">150 Members</div></div>
              </div>
              <p className="micro-copy mb-4" style={{ fontSize: '0.8rem' }}>Capture moments. Weekly photo walks and workshops.</p>
              <button className="btn btn-outline" style={{ width: '100%', padding: '0.4rem' }}>Apply Now</button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Upcoming for you</div>
          <div className="calendar-list">
            <div className="event-card">
              <div className="event-date-box"><span>12</span><span>Sept</span></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>Networking Mixer for Freshers</div>
                <div className="micro-copy">Organized by Student Affairs • Multi-Purpose Hall</div>
              </div>
              <button className="btn btn-primary" style={{ padding: '0.4rem 1rem' }}>RSVP</button>
            </div>
          </div>
        </div>

      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* INSTITUTIONAL MENTORSHIP BOARD */}
        <div className="card" style={{ borderTop: '4px solid var(--warning-color)' }}>
          <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldAlert size={18} color="var(--warning-color)" /> Office Mentorship (OH)
          </div>
          <p className="micro-copy mb-4">Official guidance from Student Affairs to optimize your application success and alignment.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {mentorshipSlots.map((slot, i) => (
              <div key={i} className="glass-list-item flex-between" style={{ padding: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ color: 'var(--text-muted)' }}>{slot.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.8rem' }}>{slot.type}</div>
                    <div className="micro-copy">{slot.duration} Session</div>
                  </div>
                </div>
                <button className="btn btn-outline" style={{ fontSize: '0.65rem', padding: '0.2rem 0.5rem' }} onClick={() => setShowMentorshipModal(true)}>Book Slot</button>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Engagement Statistics</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div><div className="micro-copy">Active Submissions</div><div className="stat-value" style={{ fontSize: '1.75rem' }}>08</div></div>
            <div><div className="micro-copy">Accepted Offers</div><div className="stat-value" style={{ fontSize: '1.75rem', color: 'var(--danger-color)' }}>00</div></div>
            <div className="alert-item warning" style={{ fontSize: '0.75rem' }}>
              <strong>System Insight:</strong> High rejection concentration in UG25 batch. Contact mentorship office for application optimization.
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Direct Feedback Channel</div>
          <p className="micro-copy mb-4">Report procedural inconsistencies or seek general administrative support.</p>
          <textarea className="filter-input" placeholder="Start typing statement of concern..." style={{ width: '100%', minHeight: '80px', marginBottom: '0.75rem', padding: '0.75rem' }}></textarea>
          <button className="btn btn-outline" style={{ width: '100%' }}>Submit to Office</button>
        </div>
      </div>

      {showMentorshipModal && (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <div className="card shadow-2xl" style={{ width: '400px', background: 'var(--card-bg)', border: '1px solid var(--border-color)', top: 0 }}>
            <div className="card-title">Mentorship Scheduling</div>
            <p className="micro-copy mb-4">Select an available slot for your 'Now' intervention session.</p>

            <div style={{ border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1.5rem' }}>
              <div className="flex-between mb-2">
                <span className="micro-copy">Available Today:</span>
                <span className="badge success">4 Slots</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <button className="btn btn-outline" style={{ fontSize: '0.75rem' }}>4:00 PM</button>
                <button className="btn btn-outline" style={{ fontSize: '0.75rem' }}>4:30 PM</button>
                <button className="btn btn-outline" style={{ fontSize: '0.75rem' }}>5:00 PM</button>
                <button className="btn btn-outline" style={{ fontSize: '0.75rem' }}>5:45 PM</button>
              </div>
            </div>

            <div className="flex-between" style={{ gap: '1rem' }}>
              <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowMentorshipModal(false)}>Cancel</button>
              <button className="btn btn-primary" style={{ flex: 2 }} onClick={() => setShowMentorshipModal(false)}>Confirm Booking</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// --- SHARED COMPONENTS --- //

function SmarterEventPlanning() {
  const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);

  const getEventsForDay = (day) => {
    return MOCK_EVENTS.filter(e => e.date === day);
  };

  return (
    <>
      <div className="page-header flex-between">
        <div>
          <h1 className="page-title">Institutional Event Calendar</h1>
          <p>Strategic scheduling to optimize student engagement and minimize organizational conflict.</p>
        </div>
        <div className="alert-item warning" style={{ margin: 0, padding: '0.5rem 1.25rem', borderRadius: '99px' }}>
          <ShieldAlert size={18} /> <div><strong>Conflict Mitigation:</strong> Sept 15 has been flagged for peak density.</div>
        </div>
      </div>

      <div className="grid-cols-3" style={{ gridTemplateColumns: '1fr 340px', gap: '2rem' }}>
        <div className="card" style={{ gridColumn: 'span 1', padding: '1.5rem' }}>
          <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
            <div className="card-title" style={{ margin: 0 }}>September 2024 Cycle</div>
            <div className="flex-between" style={{ gap: '1rem' }}>
              <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem' }}>&larr; Prev</button>
              <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem' }}>Next &rarr;</button>
            </div>
          </div>

          <div className="calendar-grid">
            <div className="grid-cols-7" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: '0.75rem' }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                <span key={d} className="micro-copy" style={{ fontWeight: 800, color: 'var(--text-muted)' }}>{d}</span>
              ))}
            </div>
            <div className="calendar-body" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', background: 'var(--border-color)', border: '1px solid var(--border-color)', borderRadius: '0.75rem', overflow: 'hidden' }}>
              {calendarDays.map(day => (
                <div key={day} style={{ minHeight: '100px', background: 'var(--card-bg)', padding: '0.5rem' }}>
                  <div className="micro-copy" style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{day}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {getEventsForDay(day).map(ev => (
                      <div key={ev.id} className={`badge ${ev.status === 'Flagged' ? 'danger' : 'success'}`} style={{ fontSize: '10px', padding: '2px 4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', border: 'none', borderRadius: '4px' }}>
                        {ev.title}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '2rem', background: 'rgba(99, 102, 241, 0.03)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
            <h4 style={{ color: 'var(--accent-color)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Strategic Resource Allocation Policy</h4>
            <p className="micro-copy" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>
              In accordance with institutional objectives, event approvals are contingent upon a <strong>density-first policy</strong>. High-impact societal inductions are strategically spaced to ensure maximum student participation and capacity.
            </p>
          </div>
        </div>

        <div className="card" style={{ height: 'fit-content' }}>
          <div className="card-title">Pending Booking Requests</div>
          <p className="micro-copy mb-4">Requests awaiting administrative conflict resolution.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="glass-list-item" style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Debate Championship (Sept 15)</div>
              <div className="micro-copy" style={{ color: 'var(--danger-color)', marginTop: '0.25rem' }}><strong>Operational Clash Detected:</strong> Concurrent with 'Society Induction'. Overlaps detected in student interest cluster G4.</div>
              <button className="btn btn-outline" style={{ width: '100%', marginTop: '1rem', borderColor: 'var(--danger-color)', color: 'var(--danger-color)', fontSize: '0.75rem' }}>Propose Alternate Schedule</button>
            </div>
            <div className="glass-list-item" style={{ border: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Innovation Hackathon (Sept 18)</div>
              <div className="micro-copy">Requested by Technology Society. Density status: Low. No conflicts identified.</div>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', fontSize: '0.75rem' }}>Approve Booking</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function OfficeGrievances() {
  const navigate = useNavigate();
  return (
    <>
      <div className="page-header flex-between">
        <div>
          <h1 className="page-title">Grievance Governance & Registry</h1>
          <p>Centralized monitoring of student concerns and systemic friction points.</p>
        </div>
        <div className="badge warning" style={{ padding: '0.5rem 1rem' }}>4 Pending Critical Reviews</div>
      </div>

      <div className="card" style={{ marginBottom: '2rem', borderLeft: '4px solid var(--accent-color)' }}>
        <div className="card-title">AI Governance Summary</div>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-main)' }}>
          "Overall campus sentiment indicates a <strong>15% increase in selection-related friction</strong>. AI analysis of grievance data suggests a recurring pattern of 'Inter-Society Gatekeeping' specifically affecting the UG25 cohort. Key terms identified: <em>Favoritism, Non-transparent, and Social Exhaustion</em>. Direct intervention recommended for students flagged with 100% rejection metrics."
        </p>
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr><th>Ticket ID</th><th>Student</th><th>Category</th><th>Submission Date</th><th>Priority</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {MOCK_GRIEVANCES.map(g => (
              <tr key={g.id}>
                <td style={{ fontWeight: 700 }}>#GR-00{g.id}</td>
                <td>{g.studentName}</td>
                <td>{g.category}</td>
                <td>{g.date}</td>
                <td><span className={`badge ${g.type === 'High Priority' ? 'danger' : 'warning'}`}>{g.type}</span></td>
                <td><span className="badge outline">{g.status}</span></td>
                <td>
                  <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => navigate(`/office/grievances/${g.id}`)}>Review Ticket</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function OfficeGrievanceDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const grievance = MOCK_GRIEVANCES.find(g => g.id === parseInt(id)) || MOCK_GRIEVANCES[0];

  return (
    <>
      <div className="page-header">
        <button className="btn btn-outline" style={{ marginBottom: '1rem' }} onClick={() => navigate('/office/grievances')}>← Back to Registry</button>
        <h1 className="page-title">Ticket Review: #GR-00{grievance.id}</h1>
        <p>Submitted by {grievance.studentName} on {grievance.date}</p>
      </div>

      <div className="grid-cols-3">
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div className="card-title">Statement of Concern</div>
          <div className="glass-list-item" style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '1rem' }}>
            <p style={{ color: 'var(--text-main)', fontSize: '1rem', lineHeight: 1.6, fontStyle: 'italic' }}>
              "{grievance.text}"
            </p>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <div className="card-title" style={{ fontSize: '0.8rem' }}>AI Pattern Validation</div>
            <div className="alert-item warning">
              <Activity size={18} />
              <div className="micro-copy" style={{ color: 'var(--text-main)', fontSize: '0.85rem' }}>
                {grievance.aiAnalysis}
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ height: 'fit-content' }}>
          <div className="card-title">Administrative Actions</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button className="btn btn-primary" style={{ width: '100%', background: 'var(--success-color)' }}>Approve Intervention</button>
            <button className="btn btn-outline" style={{ width: '100%' }}>Initiate Formal Query</button>
            <button className="btn btn-outline" style={{ width: '100%', borderColor: 'var(--danger-color)', color: 'var(--danger-color)' }}>Dismiss Ticket</button>
          </div>
          <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            <div className="micro-copy">Related Student Portfolio:</div>
            <button className="btn btn-outline" style={{ width: '100%', marginTop: '0.5rem' }} onClick={() => navigate(`/office/students/${grievance.studentId}`)}>View Ibrahim Khalil Portfolio</button>
          </div>
        </div>
      </div>
    </>
  );
}

function UncoveringHiddenBias() {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Privacy-Preserving Bias Graph</h1>
        <p>Mapping systemic concentration of campus leadership.</p>
      </div>
      <div className="grid-cols-3" style={{ gridTemplateColumns: 'minmax(0, 1fr) 300px' }}>
        <div className="card" style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
          <div style={{ position: 'relative', width: '300px', height: '300px' }}>
            <svg viewBox="0 0 100 100" style={{ position: 'absolute', width: '100%', height: '100%' }}>
              <circle cx="30" cy="40" r="15" fill="var(--accent-color)" fillOpacity="0.4" stroke="var(--accent-color)" strokeWidth="1" />
              <circle cx="70" cy="60" r="18" fill="var(--danger-color)" fillOpacity="0.3" stroke="var(--danger-color)" strokeWidth="1" />
              <circle cx="50" cy="50" r="8" fill="var(--warning-color)" fillOpacity="0.1" stroke="var(--warning-color)" strokeWidth="1" />
            </svg>
            <div style={{ position: 'absolute', top: '35%', left: '20%', fontSize: '0.75rem', color: 'white', fontWeight: 700 }}>Group A</div>
            <div style={{ position: 'absolute', top: '55%', left: '60%', fontSize: '0.75rem', color: 'white', fontWeight: 700 }}>Group B</div>
            <div style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', width: '100%' }}>
              <p className="micro-copy">65% Overlap Detected Between A & B</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Top Concentration</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="alert-item warning" style={{ margin: 0 }}><strong>Student X</strong>: 13 Roles</div>
            <div className="alert-item warning" style={{ margin: 0 }}><strong>Student Y</strong>: 9 Roles</div>
            <div className="alert-item warning" style={{ margin: 0 }}><strong>Student Z</strong>: 8 Roles</div>
            <p className="micro-copy" style={{ marginTop: '1rem' }}>System detects leadership "bottlenecking". 5% of students hold 45% of leadership positions.</p>
          </div>
        </div>
      </div>
    </>
  );
}

// --- APP ENTRY POINT --- //
export default function App() {
  const [view, setView] = useState(VIEWS.OFFICE);

  return (
    <BrowserRouter>
      <DashboardLayout currentView={view} setView={setView}>
        <Routes>
          {/* Office Routes */}
          <Route path="/" element={<OfficeDashboard />} />
          <Route path="/office/reimbursements" element={<OfficeReimbursements />} />
          <Route path="/office/clubs" element={<OfficeClubs />} />
          <Route path="/office/clubs/:id" element={<OfficeClubDetail />} />
          <Route path="/office/students" element={<OfficeStudents />} />
          <Route path="/office/students/:id" element={<OfficeStudentDetail />} />
          <Route path="/office/events" element={<SmarterEventPlanning />} />
          <Route path="/office/grievances" element={<OfficeGrievances />} />
          <Route path="/office/grievances/:id" element={<OfficeGrievanceDetail />} />
          <Route path="/bias" element={<UncoveringHiddenBias />} />

          {/* Clubs Routes */}
          <Route path="/club-management" element={<ClubDashboard />} />
          <Route path="/club-management/members" element={
            <div className="card">
              <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                <h1 className="page-title" style={{ margin: 0 }}>Personnel Directory</h1>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <input type="text" className="filter-input" placeholder="Search team member..." style={{ width: '250px' }} />
                  <button className="btn btn-primary"><UserPlus size={16} style={{ marginRight: '0.4rem' }} /> Add Member</button>
                </div>
              </div>
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr><th>Name</th><th>Role</th><th>Department</th><th>Onboarded</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Rahul Sharma</td><td>Lead Strategist</td><td>Executive</td><td>Aug 2023</td><td><span className="badge success">Active</span></td></tr>
                    <tr><td>Anshika C.</td><td>Operations Lead</td><td>Logistics</td><td>Sept 2024</td><td><span className="badge success">Active</span></td></tr>
                    <tr><td>Aman V.</td><td>Member</td><td>Tech</td><td>Sept 2024</td><td><span className="badge warning">Low Activity</span></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          } />
          <Route path="/club-management/induction" element={
            <div className="card">
              <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                <h1 className="page-title" style={{ margin: 0 }}>Induction Governance</h1>
                <button className="btn btn-primary"><Plus size={16} style={{ marginRight: '0.4rem' }} /> Create Cycle</button>
              </div>
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr><th>Cycle ID</th><th>Status</th><th>Applicants</th><th>Reviews Pending</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>#IND-2024-SEPT</td><td><span className="badge warning">Ongoing</span></td><td>120</td><td>45</td><td><button className="btn btn-outline" style={{ fontSize: '0.75rem' }}>Review Panel</button></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          } />
          <Route path="/club-management/events" element={<div className="card"><h1>New Event Request</h1><p>Submit request for venue and resources.</p></div>} />
          <Route path="/club-management/reimbursement" element={
            <div className="card">
              <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                <h1 className="page-title" style={{ margin: 0 }}>Financial Ledger</h1>
                <button className="btn btn-primary"><Plus size={16} style={{ marginRight: '0.4rem' }} /> New Payout Request</button>
              </div>
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr><th>Ref ID</th><th>Category</th><th>Description</th><th>Amount</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>#EXP-84</td><td>Logistics</td><td>Sound system for mixer</td><td>₹4,500</td><td><span className="badge success">Paid</span></td></tr>
                    <tr><td>#EXP-92</td><td>Travel</td><td>Bus transport for street play</td><td>₹1,200</td><td><span className="badge warning">Pending</span></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          } />

          {/* Student Routes */}
          <Route path="/student-profile" element={<StudentDashboard />} />
          <Route path="/student/discover" element={<div className="card"><h1>Discover Clubs</h1><p>Browse through all registered clubs and societies.</p></div>} />
          <Route path="/student/events" element={<div className="card"><h1>Your Events</h1><p>Manage your registrations and RSVPs.</p></div>} />
          <Route path="/student/feedback" element={<div className="card"><h1>Support & Feedback</h1><p>Direct channel to student office.</p></div>} />

          <Route path="*" element={<OfficeDashboard />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}
