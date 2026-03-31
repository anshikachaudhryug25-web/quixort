import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Plus, UserPlus } from 'lucide-react';

// Layout
import DashboardLayout from './components/Layout/DashboardLayout';

// Data
import { VIEWS } from './data/constants';

// Office pages
import OfficeDashboard from './pages/Office/Dashboard';
import OfficeReimbursements from './pages/Office/Reimbursements';
import OrganizationalCollective from './pages/Office/OrganizationalCollective';
import StudentInvolvementHub from './pages/Office/StudentIntelHub';
import EventIntentBoard from './pages/Office/EventBoard';
import { FeedbackSignals, FeedbackSignalDetail } from './pages/Office/Grievances';
import { StudentProfile, ClubProfile } from './pages/Office/Profiles';

// Student pages
import StudentDashboard from './pages/Student/Dashboard';
import ProfilePage from './pages/Student/Profile';
import OfficeTeam from './pages/Student/OfficeTeam';

// Clubs pages
import ClubDashboard from './pages/Clubs/ClubDashboard';

export default function App() {
  const [view, setView] = useState(VIEWS.OFFICE);

  return (
    <BrowserRouter>
      <DashboardLayout currentView={view} setView={setView}>
        <Routes>
          {/* Office */}
          <Route path="/" element={<OfficeDashboard />} />
          <Route path="/office/reimbursements" element={<OfficeReimbursements />} />
          <Route path="/office/collective" element={<OrganizationalCollective />} />
          <Route path="/office/collective/:id" element={<ClubProfile />} />
          <Route path="/office/involvement" element={<StudentInvolvementHub />} />
          <Route path="/office/students/:id" element={<StudentProfile />} />
          <Route path="/office/events" element={<EventIntentBoard />} />
          <Route path="/office/feedback" element={<FeedbackSignals />} />
          <Route path="/office/feedback/:id" element={<FeedbackSignalDetail />} />

          {/* Clubs */}
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
                  <thead><tr><th>Name</th><th>Role</th><th>Department</th><th>Onboarded</th><th>Status</th></tr></thead>
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
                  <thead><tr><th>Cycle ID</th><th>Status</th><th>Applicants</th><th>Reviews Pending</th><th>Action</th></tr></thead>
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
                  <thead><tr><th>Ref ID</th><th>Category</th><th>Description</th><th>Amount</th><th>Status</th></tr></thead>
                  <tbody>
                    <tr><td>#EXP-84</td><td>Logistics</td><td>Sound system for mixer</td><td>₹4,500</td><td><span className="badge success">Paid</span></td></tr>
                    <tr><td>#EXP-92</td><td>Travel</td><td>Bus transport for street play</td><td>₹1,200</td><td><span className="badge warning">Pending</span></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          } />

          {/* Student */}
          <Route path="/student-profile" element={<StudentDashboard />} />
          <Route path="/student/profile" element={<ProfilePage />} />
          <Route path="/student/discover" element={<div className="card"><h1>Explore Clubs/Socs</h1><p>Browse through all registered clubs and societies.</p></div>} />
          <Route path="/student/events" element={<div className="card"><h1>Events</h1><p>Manage your registrations and RSVPs.</p></div>} />
          <Route path="/student/feedback" element={<div className="card"><h1>Grievance/Feedback</h1><p>Direct channel to student office.</p></div>} />
          <Route path="/student/team" element={<OfficeTeam />} />

          <Route path="*" element={<OfficeDashboard />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}
