import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Activity } from 'lucide-react';
import { MOCK_GRIEVANCES } from '../../data/mockData';

export function FeedbackSignals() {
    const navigate = useNavigate();
    return (
        <>
            <div className="page-header flex-between">
                <div>
                    <h1 className="page-title">Institutional Feedback Signals</h1>
                    <p>Strategic oversight of systemic friction points and student wellness trends.</p>
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
                                    <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => navigate(`/office/feedback/${g.id}`)}>Review Ticket</button>
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

    return (
        <>
            <div className="page-header">
                <button className="btn btn-outline" style={{ marginBottom: '1rem' }} onClick={() => navigate('/office/feedback')}>← Back to Registry</button>
                <h1 className="page-title">Signal Review: #FS-00{grievance.id}</h1>
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
                            <div className="micro-copy" style={{ color: 'var(--text-main)', fontSize: '0.85rem' }}>{grievance.aiAnalysis}</div>
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
                        <button className="btn btn-outline" style={{ width: '100%', marginTop: '0.5rem' }} onClick={() => navigate(`/office/students/${grievance.studentId}`)}>View Student Portfolio</button>
                    </div>
                </div>
            </div>
        </>
    );
}
