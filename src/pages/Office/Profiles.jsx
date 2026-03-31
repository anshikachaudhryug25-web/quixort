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

    return (
        <>
            <div className="page-header flex-between">
                <div>
                    <button className="btn btn-outline" style={{ marginBottom: '1rem' }} onClick={() => navigate(-1)}>← Back</button>
                    <h1 className="page-title">{club.name} Organizational Profile</h1>
                    <p>{club.type} • Est. {club.founded}</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-outline">Audit Ledger</button>
                    <button className="btn btn-primary">Policy Check</button>
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
                    <p className="micro-copy">Highly Selective</p>
                </div>
                <div className="card">
                    <div className="micro-copy font-bold">Budget Utilization</div>
                    <div className="stat-value">62%</div>
                    <p className="micro-copy">FY24 Allocation</p>
                </div>
                <div className="card">
                    <div className="micro-copy font-bold">Resource Status</div>
                    <div className="stat-value"><span className="badge success">{club.status}</span></div>
                    <p className="micro-copy">Healthy Ops</p>
                </div>
            </div>

            <div className="grid-cols-3" style={{ gap: '2rem' }}>
                <div className="card" style={{ gridColumn: 'span 2' }}>
                    <div className="card-title">Recent Induction Trends (Sept 2024)</div>
                    <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '1rem', padding: '1rem' }}>
                        {[40, 70, 90, 60, 80].map((h, i) => (
                            <div key={i} style={{ flex: 1, background: 'var(--accent-color)', height: `${h}%`, borderRadius: '4px 4px 0 0' }}></div>
                        ))}
                    </div>
                    <div className="flex-between micro-copy" style={{ padding: '0 1rem' }}>
                        <span>Cycle P1</span><span>Cycle P2</span><span>Cycle P3</span><span>Cycle P4</span><span>Cycle P5</span>
                    </div>
                </div>
                <div className="card">
                    <div className="card-title">Leadership Core</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {['Rahul Sharma', 'Anshika C.', 'Aman V.'].map(name => (
                            <div key={name} className="flex-between glass-list-item">
                                <span style={{ fontWeight: 600 }}>{name}</span>
                                <span className="micro-copy">Core Member</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
