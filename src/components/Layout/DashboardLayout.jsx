import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, CreditCard, Users, Activity, Calendar,
    MessageSquare, FileText, Plus, User, Compass, ShieldAlert,
    Search, Bell
} from 'lucide-react';
import { VIEWS } from '../../data/constants';

function Sidebar({ currentView }) {
    const getNavItems = () => {
        switch (currentView) {
            case VIEWS.OFFICE:
                return [
                    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
                    { to: '/office/reimbursements', icon: CreditCard, label: 'Expenses' },
                    { to: '/office/collective', icon: Users, label: 'Clubs & Socs Intel' },
                    { to: '/office/involvement', icon: Activity, label: 'Student Intel' },
                    { to: '/office/events', icon: Calendar, label: 'Events Dashboard' },
                    { to: '/office/feedback', icon: MessageSquare, label: 'Grievances/Feedback' },
                ];
            case VIEWS.CLUBS:
                return [
                    { to: '/club-management', icon: LayoutDashboard, label: 'Dashboard' },
                    { to: '/club-management/members', icon: Users, label: 'Members' },
                    { to: '/club-management/induction', icon: FileText, label: 'Inductions' },
                    { to: '/club-management/events', icon: Plus, label: 'Events' },
                    { to: '/club-management/reimbursement', icon: CreditCard, label: 'Finances' },
                ];
            case VIEWS.STUDENT:
                return [
                    { to: '/student-profile', icon: LayoutDashboard, label: 'Dashboard' },
                    { to: '/student/profile', icon: User, label: 'Profile' },
                    { to: '/student/discover', icon: Compass, label: 'Explore clubs/socs' },
                    { to: '/student/events', icon: Calendar, label: 'Events' },
                    { to: '/student/feedback', icon: MessageSquare, label: 'Grievance/Feedback' },
                    { to: '/student/team', icon: Users, label: 'Office Team' },
                ];
            default:
                return [];
        }
    };

    return (
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
                    {/* System Analytics moved to Dashboard */}
                </div>
            </nav>
        </aside>
    );
}

function Topbar({ currentView, handleViewChange }) {
    return (
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
    );
}

export default function DashboardLayout({ children, currentView, setView }) {
    const navigate = useNavigate();

    const handleViewChange = (e) => {
        const newView = e.target.value;
        setView(newView);
        if (newView === VIEWS.OFFICE) navigate('/');
        else if (newView === VIEWS.CLUBS) navigate('/club-management');
        else if (newView === VIEWS.STUDENT) navigate('/student-profile');
    };

    return (
        <div className="app-container">
            <Sidebar currentView={currentView} />
            <main className="main-content">
                <Topbar currentView={currentView} handleViewChange={handleViewChange} />
                <div className="page-container flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
}
