import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { MOCK_EVENTS } from '../../data/mockData';

export default function EventIntentBoard() {
    const [activeTab, setActiveTab] = React.useState('calendar');
    const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);
    const getEventsForDay = (day) => MOCK_EVENTS.filter(e => e.date === day);

    const PROPOSALS = [
        { id: 1, title: 'Annual Tech Symposium', proposedBy: 'Technology Society', date: 'Oct 15, 2024', time: '10:00 AM', venue: 'Main Auditorium', estExpenses: '₹25,000', status: 'Pending Review' },
        { id: 2, title: 'Inter-College Debate Cup', proposedBy: 'Debating Society', date: 'Oct 20, 2024', time: '02:00 PM', venue: 'Seminar Hall B', estExpenses: '₹12,000', status: 'Conflict Flagged' },
        { id: 3, title: 'Cultural Night 2024', proposedBy: 'Cultural Committee', date: 'Nov 05, 2024', time: '06:00 PM', venue: 'Open Air Theatre', estExpenses: '₹85,000', status: 'Awaiting Quote' },
        { id: 4, title: 'Charity Marathon', proposedBy: 'Social Service Group', date: 'Nov 12, 2024', time: '06:00 AM', venue: 'University Grounds', estExpenses: '₹15,000', status: 'Initial Stage' },
    ];

    return (
        <>
            <div className="page-header flex-between">
                <div>
                    <h1 className="page-title">Event Intent Board</h1>
                    <p>Strategic scheduling to optimize student engagement and minimize organizational conflict.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <div className="alert-item warning" style={{ margin: 0, padding: '0.5rem 1.25rem', borderRadius: '99px' }}>
                        <ShieldAlert size={18} /> <div><strong>Conflict Mitigation:</strong> Sept 15 has been flagged for peak density.</div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                <button
                    onClick={() => setActiveTab('calendar')}
                    style={{
                        background: 'none', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 700,
                        color: activeTab === 'calendar' ? 'var(--accent-color)' : 'var(--text-muted)',
                        borderBottom: activeTab === 'calendar' ? '2px solid var(--accent-color)' : 'none',
                        transition: 'all 0.2s'
                    }}
                >
                    Calendar View
                </button>
                <button
                    onClick={() => setActiveTab('proposals')}
                    style={{
                        background: 'none', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 700,
                        color: activeTab === 'proposals' ? 'var(--accent-color)' : 'var(--text-muted)',
                        borderBottom: activeTab === 'proposals' ? '2px solid var(--accent-color)' : 'none',
                        transition: 'all 0.2s'
                    }}
                >
                    Proposals
                </button>
            </div>

            {activeTab === 'calendar' ? (
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
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: '0.75rem' }}>
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                                    <span key={d} className="micro-copy" style={{ fontWeight: 800, color: 'var(--text-muted)' }}>{d}</span>
                                ))}
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', background: 'var(--border-color)', border: '1px solid var(--border-color)', borderRadius: '0.75rem', overflow: 'hidden' }}>
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
            ) : (
                <div className="card">
                    <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                        <div>
                            <div className="card-title" style={{ margin: 0 }}>Active Event Proposals</div>
                            <p className="micro-copy" style={{ marginTop: '0.25rem' }}>Detailed breakdown of upcoming club and society event requested budgets and slots.</p>
                        </div>
                        <button className="btn btn-outline" style={{ fontSize: '0.75rem' }}>Export PDF Audit</button>
                    </div>
                    <div className="data-table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Event Title</th>
                                    <th>Proposed By</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Venue</th>
                                    <th>Est. Expenses</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PROPOSALS.map(p => (
                                    <tr key={p.id}>
                                        <td style={{ fontWeight: 700 }}>{p.title}</td>
                                        <td>{p.proposedBy}</td>
                                        <td>{p.date}</td>
                                        <td>{p.time}</td>
                                        <td>{p.venue}</td>
                                        <td style={{ fontWeight: 700, color: 'var(--accent-color)' }}>{p.estExpenses}</td>
                                        <td>
                                            <span className={`badge ${p.status === 'Conflict Flagged' ? 'danger' : p.status === 'Pending Review' ? 'warning' : 'outline'}`} style={{ fontSize: '0.6rem' }}>
                                                {p.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}
