import React from 'react';
import {
    Search, Activity, ChevronRight, AlertTriangle
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer
} from 'recharts';
import { MOCK_STUDENTS } from '../../data/mockData';

export default function OfficeDashboard() {
    const topStudents = [...MOCK_STUDENTS].sort((a, b) => b.participation_score - a.participation_score).slice(0, 5);
    const isolationAtRisk = MOCK_STUDENTS.filter(s => s.status === 'Isolation Risk');

    const chartData = [
        { name: 'UG23', active: 85, passive: 15 },
        { name: 'UG24', active: 78, passive: 22 },
        { name: 'UG25', active: 62, passive: 38 },
    ];

    return (
        <>
            <div className="page-header flex-between">
                <div>
                    <h1 className="page-title">Institutional Intelligence Hub</h1>
                    <p>Strategic oversight of campus engagement, social health, and fiscal distribution.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="btn btn-outline"><Search size={16} /> Audit Logs</button>
                    <button className="btn btn-primary">Generate Proposal</button>
                </div>
            </div>

            <div className="grid-cols-4" style={{ marginBottom: '2rem' }}>
                <div className="card" style={{ padding: '1.25rem', borderBottom: '3px solid var(--success-color)' }}>
                    <div className="micro-copy font-bold text-muted">Inclusivity Index</div>
                    <div className="stat-value" style={{ fontSize: '1.75rem', color: 'var(--success-color)' }}>82.4%</div>
                    <p className="micro-copy">Unique student participation rate</p>
                </div>
                <div className="card" style={{ padding: '1.25rem', borderBottom: '3px solid var(--danger-color)' }}>
                    <div className="micro-copy font-bold text-muted">Power Concentration</div>
                    <div className="stat-value" style={{ fontSize: '1.75rem', color: 'var(--danger-color)' }}>0.14</div>
                    <p className="micro-copy">Unique leaders / Total positions</p>
                </div>
                <div className="card" style={{ padding: '1.25rem', borderBottom: '3px solid var(--accent-color)' }}>
                    <div className="micro-copy font-bold text-muted">Feedback Response</div>
                    <div className="stat-value" style={{ fontSize: '1.75rem' }}>4.2 hrs</div>
                    <p className="micro-copy">Avg. time to signal resolution</p>
                </div>
                <div className="card" style={{ padding: '1.25rem', borderBottom: '3px solid var(--warning-color)' }}>
                    <div className="micro-copy font-bold text-muted">Resource Velocity</div>
                    <div className="stat-value" style={{ fontSize: '1.75rem', color: 'var(--warning-color)' }}>62%</div>
                    <p className="micro-copy">Budget utilization rate</p>
                </div>
            </div>

            <div className="grid-cols-2" style={{ gap: '2rem' }}>
                <div className="card" style={{ background: 'linear-gradient(135deg, var(--card-bg) 0%, rgba(99, 102, 241, 0.05) 100%)', border: '1px solid var(--accent-light)' }}>
                    <div className="flex-between mb-4">
                        <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Activity size={18} color="var(--accent-color)" /> AI Grievance Narrative
                        </h3>
                        <span className="badge accent">Beta Analysis</span>
                    </div>
                    <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-main)' }}>
                        "Current campus sentiment indicates a rising friction in <strong>Inter-Society Gatekeeping</strong>. AI analysis of 45 signals suggests that students who are rejected from more than 2 technical clubs are 40% more likely to file grievances regarding 'Systemic Bias'. Recommend opening additional <em>Open Participation</em> tiers in Tech Soc and Jazbaa to alleviate selection pressure."
                    </p>
                    <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 1, padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0.5rem' }}>
                            <div className="micro-copy">Sentiment Score</div>
                            <div style={{ fontWeight: 700, color: 'var(--warning-color)' }}>Neutral-Low (42)</div>
                        </div>
                        <div style={{ flex: 1, padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0.5rem' }}>
                            <div className="micro-copy">Top Friction Point</div>
                            <div style={{ fontWeight: 700 }}>Selection Overlap</div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-title">Engagement Velocity by Cohort</div>
                    <div style={{ height: '220px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                                <RechartsTooltip contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }} />
                                <Bar dataKey="active" stackId="a" fill="var(--accent-color)" radius={[0, 0, 0, 0]} />
                                <Bar dataKey="passive" stackId="a" fill="var(--danger-color)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="grid-cols-3" style={{ gap: '2rem', marginTop: '2rem' }}>
                <div className="card">
                    <div className="flex-between mb-4">
                        <h3 className="section-title" style={{ fontSize: '0.9rem' }}>Top Enthusiasts (Score)</h3>
                        <ChevronRight size={16} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {topStudents.map((s, i) => (
                            <div key={s.id} className="glass-list-item" style={{ padding: '0.6rem 0.8rem' }}>
                                <div className="flex-between">
                                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                        <div className="avatar" style={{ width: '1.5rem', height: '1.5rem', fontSize: '0.6rem' }}>{s.name.substring(0, 2)}</div>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{s.name}</div>
                                            <div className="micro-copy">{s.major}</div>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontWeight: 900, color: 'var(--success-color)', fontSize: '0.9rem' }}>{s.participation_score}</div>
                                        <div className="micro-copy">Live Score</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card" style={{ borderTop: '4px solid var(--danger-color)' }}>
                    <div className="flex-between mb-4">
                        <h3 className="section-title" style={{ fontSize: '0.9rem' }}>Immediate Isolation Risk</h3>
                        <AlertTriangle size={16} color="var(--danger-color)" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {isolationAtRisk.map(s => (
                            <div key={s.id} className="glass-list-item" style={{ padding: '0.6rem 0.8rem', background: 'rgba(239, 68, 68, 0.05)' }}>
                                <div className="flex-between">
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{s.name}</div>
                                        <div className="micro-copy">{s.batch} • {s.major}</div>
                                    </div>
                                    <span className="badge danger" style={{ fontSize: '0.6rem' }}>{s.rejections_count} Rejects</span>
                                </div>
                                <button className="btn btn-outline" style={{ width: '100%', marginTop: '0.5rem', fontSize: '0.65rem', padding: '0.2rem' }}>Initiate Outreach</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card">
                    <div className="card-title">Institutional Balance</div>
                    <div style={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem', border: '1px dashed var(--border-color)', marginBottom: '1rem' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent-color)' }}>74</div>
                            <div className="micro-copy">Threshold: 70+</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div className="flex-between">
                            <span className="micro-copy">Diversity Index</span>
                            <span className="badge success">92%</span>
                        </div>
                        <div className="flex-between">
                            <span className="micro-copy">Resource Equality</span>
                            <span className="badge warning">68%</span>
                        </div>
                        <div className="flex-between">
                            <span className="micro-copy">Social Mobility</span>
                            <span className="badge success">Active</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
