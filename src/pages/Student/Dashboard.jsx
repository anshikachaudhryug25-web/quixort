import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Compass, FileText, Users, Activity, ShieldAlert } from 'lucide-react';

export default function StudentDashboard() {
    const navigate = useNavigate();
    const [showMentorshipModal, setShowMentorshipModal] = useState(false);

    const recommendedClubs = [
        { name: 'Debating Society', reason: 'High match with your "Public Speaking" interest', type: 'Intellectual' },
        { name: 'Developer Student Club', reason: 'Matches your "Python" and "Backend" skills', type: 'Tech' },
        { name: 'Fine Arts Society', reason: 'Complementary to your design portfolio', type: 'Aesthetics' }
    ];

    const mentorshipSlots = [
        { type: 'Application Review', duration: '20 mins', icon: <FileText size={16} /> },
        { type: 'SLAB Mentorship (Student Life Activities Board)', duration: '30 mins', icon: <Users size={16} /> }
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
                    <div className="card">
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
                <div className="card">
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
                    <div className="card shadow-2xl" style={{ width: '400px', background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                        <div className="card-title">Mentorship Scheduling</div>
                        <p className="micro-copy mb-4">Select an available slot for your 'Now' intervention session.</p>
                        <div style={{ border: '1px solid var(--border-color)', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1.5rem' }}>
                            <div className="flex-between mb-2">
                                <span className="micro-copy">Available Today:</span>
                                <span className="badge success">4 Slots</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                {['4:00 PM', '4:30 PM', '5:00 PM', '5:45 PM'].map(t => (
                                    <button key={t} className="btn btn-outline" style={{ fontSize: '0.75rem' }}>{t}</button>
                                ))}
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
