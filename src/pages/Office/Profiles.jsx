import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MOCK_STUDENTS, MOCK_CLUBS } from '../../data/mockData';

export function StudentProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const student = MOCK_STUDENTS.find(s => s.id === parseInt(id) || s.name === id) || MOCK_STUDENTS[0];

    const apps = [
        { name: 'Tech Soc', status: 'Accepted', date: 'Sept 12' },
        { name: 'DebSoc', status: 'Rejected', date: 'Sept 14' },
        { name: 'Jazbaa', status: 'Rejected', date: 'Sept 15' },
        { name: 'Music Soc', status: 'Accepted', date: 'Sept 18' },
    ];

    return (
        <>
            <div className="page-header flex-between">
                <div>
                    <button className="btn btn-outline" style={{ marginBottom: '1rem' }} onClick={() => navigate(-1)}>← Back</button>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <div className="avatar" style={{ width: '4rem', height: '4rem', fontSize: '1.5rem' }}>{student.name.substring(0, 2)}</div>
                        <div>
                            <h1 className="page-title" style={{ margin: 0 }}>{student.name}</h1>
                            <p>{student.batch} • {student.major} • #{student.id}</p>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-outline">Generate Portfolio</button>
                    <button className="btn btn-primary">Intervene</button>
                </div>
            </div>

            <div className="grid-cols-4" style={{ marginBottom: '2rem' }}>
                <div className="card">
                    <div className="micro-copy font-bold">Involvement Score</div>
                    <div className="stat-value" style={{ color: 'var(--success-color)' }}>{student.participation_score}</div>
                    <p className="micro-copy">92nd percentile</p>
                </div>
                <div className="card">
                    <div className="micro-copy font-bold">Total Applications</div>
                    <div className="stat-value">{student.applications}</div>
                    <p className="micro-copy">Active this cycle</p>
                </div>
                <div className="card">
                    <div className="micro-copy font-bold">Rejections</div>
                    <div className="stat-value" style={{ color: 'var(--danger-color)' }}>{student.rejections_count}</div>
                    <p className="micro-copy">Concentrated in 'Drama'</p>
                </div>
                <div className="card">
                    <div className="micro-copy font-bold">Isolation Risk</div>
                    <div className="stat-value">{student.status === 'Isolation Risk' ? 'Critical' : 'Safe'}</div>
                    <p className="micro-copy">Sentiment IQ basis</p>
                </div>
            </div>

            <div className="grid-cols-2" style={{ gap: '2rem' }}>
                <div className="card">
                    <div className="card-title">Application Journey</div>
                    <div className="data-table-container">
                        <table className="data-table">
                            <thead><tr><th>Organization</th><th>Status</th><th>Date</th></tr></thead>
                            <tbody>
                                {apps.map((a, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: 700 }}>{a.name}</td>
                                        <td><span className={`badge ${a.status === 'Accepted' ? 'success' : 'danger'}`}>{a.status}</span></td>
                                        <td>{a.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card">
                    <div className="card-title">Systemic Notes</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="glass-list-item">
                            <strong>Risk Signal:</strong> Student has been rejected from 2/3 core cultural societies. High potential for social exhaustion.
                        </div>
                        <div className="glass-list-item">
                            <strong>Leadership Potential:</strong> Participation score exceeds cohort average by 25%. Recommend for upcoming Core Team bridge.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export function ClubProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const club = MOCK_CLUBS.find(c => c.name === id) || MOCK_CLUBS[0];
    const [showAudit, setShowAudit] = React.useState(false);

    if (!club) return <div>Organization not found</div>;

    const budgetPercent = Math.round((club.budget_used / club.budget_total) * 100);

    return (
        <>
            <div className="page-header flex-between">
                <div>
                    <button className="btn btn-outline" style={{ marginBottom: '1rem' }} onClick={() => navigate(-1)}>← Back</button>
                    <h1 className="page-title">{club.name} Organizational Profile</h1>
                    <p>{club.category} • Est. {club.established}</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-outline" onClick={() => setShowAudit(true)}>Audit Ledger</button>
                </div>
            </div>

            <div className="grid-cols-4" style={{ marginBottom: '2rem' }}>
                <div className="card">
                    <div className="micro-copy font-bold">Member Density</div>
                    <div className="stat-value">{club.members_count}</div>
                    <p className="micro-copy">Active Registrations</p>
                </div>
                <div className="card">
                    <div className="micro-copy font-bold">Acceptance Rate</div>
                    <div className="stat-value" style={{ color: club.acceptance_rate < 20 ? 'var(--danger-color)' : 'inherit' }}>{club.acceptance_rate}%</div>
                    <p className="micro-copy">Selection Selectivity</p>
                </div>
                <div className="card">
                    <div className="micro-copy font-bold">Budget Utilization</div>
                    <div className="stat-value" style={{ color: budgetPercent > 80 ? 'var(--danger-color)' : 'inherit' }}>{budgetPercent}%</div>
                    <p className="micro-copy">₹{club.budget_used.toLocaleString()} / ₹{club.budget_total.toLocaleString()}</p>
                </div>
                <div className="card">
                    <div className="micro-copy font-bold">Grievance Signal</div>
                    <div className="stat-value" style={{ color: club.grievances_count > 0 ? 'var(--warning-color)' : 'inherit' }}>{club.grievances_count}</div>
                    <p className="micro-copy">Direct Office Appeals</p>
                </div>
            </div>

            <div className="grid-cols-3" style={{ gap: '2rem' }}>
                <div className="card" style={{ gridColumn: 'span 2' }}>
                    <div className="card-title">Recent Induction Trends (Sept 2024)</div>
                    <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '1rem', padding: '1rem' }}>
                        {[40, 70, 90, 60, 80].map((h, i) => (
                            <div key={i} style={{ flex: 1, background: 'var(--accent-color)', height: `${h}%`, borderRadius: '4px 4px 0 0', opacity: 0.8 + (i * 0.05) }}></div>
                        ))}
                    </div>
                    <div className="flex-between micro-copy" style={{ padding: '0.5rem 1rem' }}>
                        <span>Cycle P1</span><span>Cycle P2</span><span>Cycle P3</span><span>Cycle P4</span><span>Cycle P5</span>
                    </div>
                </div>
                <div className="card">
                    <div className="card-title">Governance Metrics</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div>
                            <div className="flex-between micro-copy mb-1"><span>Engagement</span><span>{club.avg_engagement}/10</span></div>
                            <div style={{ height: '6px', background: 'var(--border-color)', borderRadius: '3px' }}><div style={{ width: `${club.avg_engagement * 10}%`, height: '100%', background: 'var(--success-color)', borderRadius: '3px' }}></div></div>
                        </div>
                        <div>
                            <div className="flex-between micro-copy mb-1"><span>Diversity Score</span><span>{club.diversity_score}%</span></div>
                            <div style={{ height: '6px', background: 'var(--border-color)', borderRadius: '3px' }}><div style={{ width: `${club.diversity_score}%`, height: '100%', background: 'var(--accent-color)', borderRadius: '3px' }}></div></div>
                        </div>
                        <div className="glass-list-item" style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>
                            <strong>Lead:</strong> {club.lead}
                        </div>
                    </div>
                </div>
            </div>

            {showAudit && (
                <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
                    <div className="card" style={{ width: '600px', background: 'var(--card-bg)', border: '1px solid var(--border-color)', padding: '2.5rem' }}>
                        <div className="flex-between mb-6">
                            <div>
                                <div className="card-title" style={{ margin: 0, fontSize: '1.25rem' }}>Audit Ledger: {club.name}</div>
                                <p className="micro-copy">Fiscal velocity & spending forensics</p>
                            </div>
                            <button className="btn btn-outline" style={{ borderRadius: '50%', width: '32px', height: '32px', padding: 0 }} onClick={() => setShowAudit(false)}>×</button>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <div className="micro-copy font-bold mb-4" style={{ color: 'var(--accent-color)', letterSpacing: '0.05em' }}>BUDGET EXHAUSTION TREND (MTD)</div>
                            <div style={{ height: '180px', display: 'flex', alignItems: 'flex-end', gap: '0.75rem', position: 'relative', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                                {club.spending_trend.map((val, i) => (
                                    <div key={i} style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>₹{val}</div>
                                        <div style={{
                                            width: '100%',
                                            height: `${(val / club.budget_total) * 150}px`,
                                            background: 'linear-gradient(to top, var(--accent-light), var(--accent-color))',
                                            borderRadius: '6px 6px 0 0',
                                            boxShadow: 'var(--glow-accent)'
                                        }}></div>
                                        <div className="micro-copy">Wk {i + 1}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-list-item" style={{ borderLeft: '4px solid var(--accent-color)', padding: '1.25rem' }}>
                            <div className="flex-between mb-2">
                                <span style={{ fontWeight: 800, fontSize: '0.75rem', color: 'var(--accent-color)' }}>AI RISK ANALYSIS</span>
                                <span className={`badge ${budgetPercent > 70 ? 'danger' : 'success'}`} style={{ fontSize: '0.6rem' }}>{budgetPercent}% Exhausted</span>
                            </div>
                            <p style={{ fontSize: '0.8125rem', color: 'var(--text-main)', lineHeight: 1.6 }}>{club.ai_insight}</p>
                        </div>

                        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                            <button className="btn btn-primary" style={{ flex: 1 }}>Download Ledger</button>
                            <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowAudit(false)}>Close Monitor</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
