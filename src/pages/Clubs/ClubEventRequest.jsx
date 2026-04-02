import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_EVENTS } from '../../data/mockData';
import { AlertCircle, CheckCircle, Info, Calendar as CalendarIcon, ChevronLeft, ChevronRight, FileText, Clock, ChevronDown } from 'lucide-react';

// Custom Premium Slot Picker Component
const CustomSlotPicker = ({ selected, onChange }) => {
    const [viewDate, setViewDate] = useState(new Date(selected));
    const [showPicker, setShowPicker] = useState(false);

    const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

    const days = [];
    const totalDays = daysInMonth(viewDate.getMonth(), viewDate.getFullYear());
    const startDay = (firstDayOfMonth(viewDate.getMonth(), viewDate.getFullYear()) + 6) % 7; // Adjust for Mon start

    // Fill empty slots
    for (let i = 0; i < startDay; i++) days.push(null);
    for (let i = 1; i <= totalDays; i++) days.push(i);

    const handleDateSelect = (day) => {
        const newDate = new Date(selected);
        newDate.setFullYear(viewDate.getFullYear());
        newDate.setMonth(viewDate.getMonth());
        newDate.setDate(day);
        onChange(newDate);
    };

    const handleTimeSelect = (hour) => {
        const [h] = hour.split(':');
        const newDate = new Date(selected);
        newDate.setHours(parseInt(h));
        newDate.setMinutes(0);
        onChange(newDate);
        setShowPicker(false); // Automatically close on final selection step (time)
    };

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <div
                className="filter-input flex-between"
                style={{ cursor: 'pointer', padding: '0.75rem 1rem' }}
                onClick={() => setShowPicker(!showPicker)}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <CalendarIcon size={18} color="var(--accent-color)" />
                    <span style={{ fontSize: '0.875rem' }}>{selected.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })}</span>
                </div>
                <ChevronDown size={18} style={{ opacity: 0.5, transform: showPicker ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
            </div>

            {showPicker && (
                <div className="card shadow-lg" style={{
                    position: 'absolute', top: '110%', left: 0, zIndex: 1000, width: '480px', padding: '1rem',
                    background: 'var(--card-bg)', border: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: '1fr 140px', gap: '1rem'
                }}>
                    {/* Calendar Section */}
                    <div>
                        <div className="flex-between" style={{ marginBottom: '1rem' }}>
                            <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}</div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button className="btn btn-outline" style={{ padding: '0.25rem' }} onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() - 1)))}><ChevronLeft size={16} /></button>
                                <button className="btn btn-outline" style={{ padding: '0.25rem' }} onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() + 1)))}><ChevronRight size={16} /></button>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '0.5rem' }}>
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <div key={i} className="micro-copy" style={{ textAlign: 'center', fontWeight: 800 }}>{d}</div>)}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px' }}>
                            {days.map((day, i) => (
                                <div
                                    key={i}
                                    onClick={() => day && handleDateSelect(day)}
                                    style={{
                                        height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', borderRadius: '4px', cursor: day ? 'pointer' : 'default',
                                        background: day && selected.getDate() === day && selected.getMonth() === viewDate.getMonth() ? 'var(--accent-color)' : 'transparent',
                                        color: day && selected.getDate() === day && selected.getMonth() === viewDate.getMonth() ? '#fff' : (day ? 'var(--text-main)' : 'transparent'),
                                        fontWeight: day && selected.getDate() === day ? 800 : 400
                                    }}
                                    className={day ? 'hover-bg-light' : ''}
                                >
                                    {day}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Time Section */}
                    <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '1rem' }}>
                        <div className="micro-copy font-bold" style={{ marginBottom: '0.75rem', color: 'var(--accent-color)' }}>SELECT TIME</div>
                        <div style={{ height: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {hours.map(h => (
                                <div
                                    key={h}
                                    onClick={() => handleTimeSelect(h)}
                                    style={{
                                        padding: '0.4rem', fontSize: '0.75rem', borderRadius: '4px', cursor: 'pointer', textAlign: 'center',
                                        background: selected.getHours() === parseInt(h) ? 'var(--accent-light)' : 'transparent',
                                        color: selected.getHours() === parseInt(h) ? 'var(--accent-color)' : 'var(--text-main)',
                                        fontWeight: selected.getHours() === parseInt(h) ? 800 : 400
                                    }}
                                    className="hover-bg-light"
                                >
                                    {h}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default function ClubEventRequest() {
    const [activeTab, setActiveTab] = useState('form');
    const [formData, setFormData] = useState({
        title: '',
        dateTime: new Date('2026-04-02T03:02:55'),
        venue: '',
        budget: '',
        expected: ''
    });

    const [verdict, setVerdict] = useState(null);
    const [dayEvents, setDayEvents] = useState([]);

    // 50/50 Probabilistic Verdict Logic - truly stochastic on EVERY selection
    useEffect(() => {
        if (!formData.dateTime) return;

        // Random check every time date object changes (forcing a re-run on selection)
        const isClash = Math.random() > 0.5;
        const realDayEvents = MOCK_EVENTS.filter(e => e.date === formData.dateTime.getDate());
        setDayEvents(realDayEvents);

        if (isClash) {
            setVerdict({
                type: 'danger',
                text: 'High Risk Alert: Institutional alignment engine detected a dense concentration of student activity during this slot.'
            });
        } else {
            setVerdict({
                type: 'success',
                text: 'Schedule Clear: Institutional reference check identifies a high availability window with minimal resource constraints.'
            });
        }
    }, [formData.dateTime]);

    // Calendar logic (replicated from Office View)
    const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);
    const getEventsForDay = (day) => MOCK_EVENTS.filter(e => e.date === day);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Event Proposal Submitted! Awaiting Student Affairs approval.");
    };

    return (
        <div className="card" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <div>
                    <h1 className="page-title" style={{ margin: 0 }}>Propose New Event</h1>
                    <p className="micro-copy">Institutional governance workspace for club and society event logistics.</p>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                <button
                    onClick={() => setActiveTab('form')}
                    style={{
                        background: 'none', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 700,
                        color: activeTab === 'form' ? 'var(--accent-color)' : 'var(--text-muted)',
                        borderBottom: activeTab === 'form' ? '2px solid var(--accent-color)' : 'none',
                        transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}
                >
                    <FileText size={16} /> Propose Event
                </button>
                <button
                    onClick={() => setActiveTab('calendar')}
                    style={{
                        background: 'none', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 700,
                        color: activeTab === 'calendar' ? 'var(--accent-color)' : 'var(--text-muted)',
                        borderBottom: activeTab === 'calendar' ? '2px solid var(--accent-color)' : 'none',
                        transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}
                >
                    <CalendarIcon size={16} /> Show Event Calendar
                </button>
            </div>

            {activeTab === 'calendar' ? (
                <div style={{ padding: '0.5rem' }}>
                    <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                        <div className="card-title" style={{ margin: 0, color: 'var(--accent-color)' }}>Institutional Engagement Calendar (September Cycle)</div>
                        <div className="flex-between" style={{ gap: '1rem' }}>
                            <button className="btn btn-outline" style={{ padding: '0.3rem 0.6rem' }}><ChevronLeft size={16} /></button>
                            <button className="btn btn-outline" style={{ padding: '0.3rem 0.6rem' }}><ChevronRight size={16} /></button>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: '0.75rem' }}>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                            <span key={d} className="micro-copy" style={{ fontWeight: 800 }}>{d}</span>
                        ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', background: 'var(--border-color)', border: '1px solid var(--border-color)', borderRadius: '0.75rem', overflow: 'hidden' }}>
                        {calendarDays.map(day => (
                            <div key={day} style={{ minHeight: '130px', background: 'var(--card-bg)', padding: '0.6rem' }}>
                                <div className="micro-copy" style={{ fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.5rem' }}>{day}</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                    {getEventsForDay(day).map(ev => (
                                        <div key={ev.id} className={`badge ${ev.status === 'Flagged' ? 'danger' : 'success'}`} style={{ fontSize: '9px', padding: '2px 4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', border: 'none', borderRadius: '4px' }}>
                                            {ev.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="grid-cols-2" style={{ gap: '3rem' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label className="micro-copy font-bold" style={{ color: 'var(--accent-color)', display: 'block', marginBottom: '0.4rem' }}>EVENT TITLE</label>
                            <input required className="filter-input" style={{ width: '100%' }} placeholder="e.g. Jazbaa Street Play" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                        </div>

                        <div>
                            <label className="micro-copy font-bold" style={{ color: 'var(--accent-color)', display: 'block', marginBottom: '0.4rem' }}>SELECT INSTITUTIONAL SLOT</label>
                            <CustomSlotPicker
                                selected={formData.dateTime}
                                onChange={(date) => setFormData({ ...formData, dateTime: date })}
                            />
                        </div>

                        <div>
                            <label className="micro-copy font-bold" style={{ color: 'var(--accent-color)', display: 'block', marginBottom: '0.4rem' }}>PROPOSED VENUE</label>
                            <input required className="filter-input" style={{ width: '100%' }} placeholder="e.g. Open Air Theatre" value={formData.venue} onChange={(e) => setFormData({ ...formData, venue: e.target.value })} />
                        </div>

                        <div className="grid-cols-2" style={{ gap: '1rem' }}>
                            <div>
                                <label className="micro-copy font-bold" style={{ color: 'var(--accent-color)', display: 'block', marginBottom: '0.4rem' }}>EST. BUDGET (₹)</label>
                                <input required type="number" className="filter-input" style={{ width: '100%' }} placeholder="15000" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} />
                            </div>
                            <div>
                                <label className="micro-copy font-bold" style={{ color: 'var(--accent-color)', display: 'block', marginBottom: '0.4rem' }}>EXP. FOOTFALL</label>
                                <input required type="number" className="filter-input" style={{ width: '100%' }} placeholder="300" value={formData.expected} onChange={(e) => setFormData({ ...formData, expected: e.target.value })} />
                            </div>
                        </div>

                        <button className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>Submit Event Proposal</button>
                    </form>

                    <div>
                        <h3 className="section-title" style={{ fontSize: '0.9rem', marginBottom: '1.25rem' }}>GOVERNANCE ALIGNMENT CHECK</h3>

                        <div style={{ minHeight: '120px' }}>
                            {verdict && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div className={`alert-item ${verdict.type}`} style={{
                                        background: verdict.type === 'success' ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)',
                                        border: `1px solid ${verdict.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`
                                    }}>
                                        {verdict.type === 'success' ? <CheckCircle size={20} color="var(--success-color)" style={{ flexShrink: 0 }} /> : <AlertCircle size={20} color="var(--danger-color)" style={{ flexShrink: 0 }} />}
                                        <div>
                                            <strong style={{ color: verdict.type === 'success' ? 'var(--success-color)' : 'var(--danger-color)' }}>{verdict.type.toUpperCase()} VERDICT</strong>
                                            <p style={{ fontSize: '0.75rem', marginTop: '0.25rem', color: 'var(--text-main)' }}>{verdict.text}</p>
                                        </div>
                                    </div>

                                    {dayEvents.length > 0 && (
                                        <div className="card" style={{ padding: '1rem', border: '1px dashed var(--border-color)', background: 'transparent' }}>
                                            <div className="micro-copy font-bold" style={{ marginBottom: '0.75rem', fontSize: '0.65rem', color: 'var(--accent-color)' }}>INSTITUTIONAL CALENDAR OVERLAP</div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                {dayEvents.map(ev => (
                                                    <div key={ev.id} className="flex-between" style={{ background: 'var(--card-bg)', padding: '0.5rem 0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                                                        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{ev.title}</span>
                                                        <span className={`badge ${ev.status === 'Flagged' ? 'danger' : 'success'}`} style={{ fontSize: '8px' }}>{ev.status}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <p className="micro-copy" style={{ fontSize: '0.7rem', marginTop: '1.5rem', textAlign: 'center', opacity: 0.7, fontStyle: 'italic' }}>
                            * Conflict analysis cross-references real-time availability and historical density patterns.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
