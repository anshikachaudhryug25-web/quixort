import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Activity, AlertTriangle } from 'lucide-react';
import { MOCK_GRIEVANCES, MOCK_STUDENTS } from '../../data/mockData';

export function FeedbackSignals() {
    const navigate = useNavigate();
    return (
        <>
            <div className="page-header flex-between">
                <div>
                    <h1 className="page-title">Grievances & Feedback Signals</h1>
                    <p>Student-raised concerns, selection disputes, and systemic friction detection.</p>
                </div>
                <div className="badge warning" style={{ padding: '0.5rem 1rem' }}>
                    <AlertTriangle size={14} style={{ marginRight: '0.4rem' }} />
                    {MOCK_GRIEVANCES.filter(g => g.type === 'High Priority').length} High Priority Open
                </div>
            </div>

            <div className="card" style={{ marginBottom: '2rem', borderLeft: '4px solid var(--accent-color)', background: 'linear-gradient(135deg, var(--card-bg) 0%, rgba(99,102,241,0.04) 100%)' }}>
                <div className="flex-between" style={{ marginBottom: '1rem' }}>
                    <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                        <Activity size={16} color="var(--accent-color)" /> AI Governance Summary
                    </div>
                    <span className="badge accent" style={{ fontSize: '0.6rem' }}>Synthesised from {MOCK_GRIEVANCES.length} tickets</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {MOCK_GRIEVANCES.map(g => {
                        const student = MOCK_STUDENTS.find(s => s.id === g.studentId);
                        return (
                            <div key={g.id} style={{
                                padding: '0.85rem 1rem', borderRadius: '0.6rem',
                                background: g.type === 'High Priority' ? 'rgba(239,68,68,0.05)' : 'rgba(245,158,11,0.05)',
                                border: `1px solid ${g.type === 'High Priority' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)'}`,
                            }}>
                                <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'baseline', marginBottom: '0.3rem' }}>
                                    <span style={{
                                        fontSize: '0.6rem', fontWeight: 800, padding: '0.15rem 0.5rem',
                                        borderRadius: '4px', letterSpacing: '0.05em',
                                        color: g.type === 'High Priority' ? 'var(--danger-color)' : 'var(--warning-color)',
                                        background: g.type === 'High Priority' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)',
                                    }}>{g.type.toUpperCase()}</span>
                                    <span className="micro-copy" style={{ color: 'var(--text-muted)' }}>#{`GR-00${g.id}`} · {g.date} · {g.category}</span>
                                </div>
                                <p style={{ margin: 0, fontSize: '0.83rem', lineHeight: 1.55, color: 'var(--text-main)' }}>
                                    <strong>{g.studentName}</strong> raised a concern against <strong>{g.targetClub}</strong>: {g.text.split('.')[0]}. {g.aiAnalysis}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="data-table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Ticket ID</th>
                            <th>Student</th>
                            <th>Target Club</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_GRIEVANCES.map(g => (
                            <tr key={g.id}>
                                <td style={{ fontWeight: 700 }}>#GR-00{g.id}</td>
                                <td>{g.studentName}</td>
                                <td><span className="badge outline" style={{ fontSize: '0.65rem' }}>{g.targetClub}</span></td>
                                <td>{g.category}</td>
                                <td>{g.date}</td>
                                <td><span className={`badge ${g.type === 'High Priority' ? 'danger' : 'warning'}`}>{g.type}</span></td>
                                <td><span className="badge outline">{g.status}</span></td>
                                <td>
                                    <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => navigate(`/office/feedback/${g.id}`)}>
                                        Review Ticket
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export function FeedbackSignalDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const grievance = MOCK_GRIEVANCES.find(g => g.id === parseInt(id)) || MOCK_GRIEVANCES[0];
    const student = MOCK_STUDENTS.find(s => s.id === grievance.studentId);

    return (
        <>
            <div className="page-header">
                <button className="btn btn-outline" style={{ marginBottom: '1rem' }} onClick={() => navigate('/office/feedback')}>← Back to Registry</button>
                <h1 className="page-title">Signal Review: #GR-00{grievance.id}</h1>
                <p>Submitted by <strong>{grievance.studentName}</strong> on {grievance.date} · Target: <strong>{grievance.targetClub}</strong></p>
            </div>

            <div className="grid-cols-3">
                <div className="card" style={{ gridColumn: 'span 2' }}>
                    <div className="card-title">Statement of Concern</div>
                    <div className="glass-list-item" style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '1rem', marginBottom: '1.5rem' }}>
                        <p style={{ color: 'var(--text-main)', fontSize: '1rem', lineHeight: 1.6, fontStyle: 'italic', margin: 0 }}>
                            "{grievance.text}"
                        </p>
                    </div>

                    <div className="card-title" style={{ fontSize: '0.8rem' }}>AI Pattern Validation</div>
                    <div className="alert-item warning" style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                        <Activity size={18} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
                        <div style={{ fontSize: '0.85rem', lineHeight: 1.55, color: 'var(--text-main)' }}>
                            {grievance.aiAnalysis}
                        </div>
                    </div>

                    {student && (
                        <div style={{ marginTop: '1.5rem' }}>
                            <div className="card-title" style={{ fontSize: '0.8rem' }}>Student Context</div>
                            <div className="grid-cols-4" style={{ gap: '0.75rem' }}>
                                <div className="card" style={{ padding: '0.75rem' }}>
                                    <div className="micro-copy">Total Apps</div>
                                    <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{student.applications}</div>
                                </div>
                                <div className="card" style={{ padding: '0.75rem' }}>
                                    <div className="micro-copy">Rejections</div>
                                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--danger-color)' }}>{student.rejections_count}</div>
                                </div>
                                <div className="card" style={{ padding: '0.75rem' }}>
                                    <div className="micro-copy">Accept %</div>
                                    <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{student.acceptance_rate}%</div>
                                </div>
                                <div className="card" style={{ padding: '0.75rem' }}>
                                    <div className="micro-copy">Grievances</div>
                                    <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{student.grievances_filed}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="card" style={{ height: 'fit-content' }}>
                        <div className="card-title">Administrative Actions</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <button className="btn btn-primary" style={{ width: '100%', background: 'var(--success-color)' }}>Approve Intervention</button>
                            <button className="btn btn-outline" style={{ width: '100%' }}>Initiate Formal Query</button>
                            <button className="btn btn-outline" style={{ width: '100%', borderColor: 'var(--danger-color)', color: 'var(--danger-color)' }}>Dismiss Ticket</button>
                        </div>
                        <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                            <div className="micro-copy">Related Student Portfolio:</div>
                            <button
                                className="btn btn-outline"
                                style={{ width: '100%', marginTop: '0.5rem' }}
                                onClick={() => navigate(`/office/students/${grievance.studentId}`)}
                            >
                                View {grievance.studentName}'s Profile
                            </button>
                        </div>
                    </div>

                    <div className="card" style={{ height: 'fit-content' }}>
                        <div className="card-title">Current Status</div>
                        <span className="badge outline" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}>{grievance.status}</span>
                        <p className="micro-copy" style={{ marginTop: '1rem' }}>Priority: <strong>{grievance.type}</strong></p>
                    </div>
                </div>
            </div>
        </>
    );
}
