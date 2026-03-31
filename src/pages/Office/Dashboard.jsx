import React, { useState, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Search, AlertTriangle, Activity, Info } from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip as RechartsTooltip, ResponsiveContainer
} from 'recharts';
import { MOCK_STUDENTS, MOCK_CLUBS } from '../../data/mockData';
import MetricTooltip from '../../components/Shared/MetricTooltip';

// ── Derived metrics ──────────────────────────────────────────────────────────
function useDerivedMetrics() {
    return useMemo(() => {
        const totalStudents = MOCK_STUDENTS.length;
        const engaged = MOCK_STUDENTS.filter(s => s.joined.length > 0).length;
        const inclusivityIndex = Math.round((engaged / totalStudents) * 100);

        const allLeadershipIds = MOCK_CLUBS.flatMap(c => c.leadership_ids);
        const uniqueLeaders = new Set(allLeadershipIds).size;
        const totalPositions = allLeadershipIds.length;
        const powerConc = (uniqueLeaders / totalPositions).toFixed(2);

        const budgetVelocities = MOCK_CLUBS.map(c => ({
            name: c.name,
            pct: Math.round((c.budget_used / c.budget_total) * 100),
            daily: Math.round(c.budget_used / c.budget_days_elapsed),
            days: c.budget_days_elapsed,
            used: c.budget_used,
            total: c.budget_total,
        })).sort((a, b) => b.pct - a.pct);

        const isolationRisk = MOCK_STUDENTS.filter(s => s.status === 'Isolation Risk');
        const overloaded = MOCK_STUDENTS.filter(s => s.leadership_roles.length >= 3);
        const topStudents = [...MOCK_STUDENTS].sort((a, b) => b.participation_score - a.participation_score).slice(0, 5);

        // Polar tables
        const totalRejects = MOCK_STUDENTS.filter(s => s.acceptance_rate === 0 && s.applications >= 3);
        const perfectRecord = MOCK_STUDENTS.filter(s => s.acceptance_rate === 100 && s.applications >= 1);

        return { inclusivityIndex, uniqueLeaders, totalPositions, powerConc, budgetVelocities, isolationRisk, overloaded, topStudents, totalStudents, totalRejects, perfectRecord };
    }, []);
}

// ── AI Feed ──────────────────────────────────────────────────────────────────
function generateInsights(metrics) {
    const { budgetVelocities, isolationRisk, overloaded } = metrics;
    const fastest = budgetVelocities[0];
    const all = [
        { severity: 'critical', text: `${fastest.name} has burned through ${fastest.pct}% of its ₹${fastest.total.toLocaleString()} budget in just ${fastest.days} days (₹${fastest.daily}/day). At this rate, funds will run out before the semester ends.` },
        ...isolationRisk.map(s => ({ severity: 'critical', text: `${s.name} (Batch ${s.batch}, ${s.major}) applied to ${s.applications} clubs and was rejected from all ${s.rejections_count}. No active memberships. Inactive for ${s.days_since_last_activity} days. Immediate outreach recommended.` })),
        { severity: 'critical', text: `Priya K. has a 90% rejection rate across 10 applications. She has filed 1 grievance citing "unstated prerequisites" in Tech Soc — 83% of Tech Soc members come from Engineering/CS.` },
        { severity: 'warning', text: `Orators and Jazbaa share 3 of their 4 named core leaders (Rahul S., Aman V., Sanya R.). A 75% leadership overlap is the highest concentration signal on campus this cycle.` },
        { severity: 'warning', text: `Rahul S. (UG23, Economics) holds leadership roles in 4 clubs simultaneously: Orators, Tech Soc, Jazbaa, and Music Soc. A role-cap policy review is recommended.` },
        { severity: 'warning', text: `Ibrahim Khalil filed a grievance specifically against Orators' selection process referencing "friends of existing core members" — corroborated by the 75% Orators/Jazbaa leadership overlap.` },
        { severity: 'observation', text: `Jazbaa burned ₹10,800 of its ₹15,000 budget in 18 days — 72% utilization. Tech Soc filed reimbursements of ₹12,400 within the same window. Both exceed the 60% burn-rate threshold.` },
        { severity: 'observation', text: `UG25 batch shows the lowest engagement rate (62% active vs 85% for UG23). 3 of 4 isolation-risk students are from the 2025 cohort.` },
        { severity: 'positive', text: `Aman V. (UG23) maintains a 100% acceptance rate across 2 applications and holds 3 leadership roles. No grievances filed. High institutional trust signal.` },
    ];
    return {
        critical: all.filter(i => i.severity === 'critical'),
        warning: all.filter(i => i.severity === 'warning'),
        observation: all.filter(i => i.severity === 'observation'),
        positive: all.filter(i => i.severity === 'positive'),
    };
}

const SEV = {
    critical: { color: 'var(--danger-color)', bg: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.25)', label: 'Critical' },
    warning: { color: 'var(--warning-color)', bg: 'rgba(245,158,11,0.06)', border: 'rgba(245,158,11,0.25)', label: 'Watchlist' },
    observation: { color: 'var(--accent-color)', bg: 'rgba(99,102,241,0.05)', border: 'rgba(99,102,241,0.2)', label: 'Observation' },
    positive: { color: 'var(--success-color)', bg: 'rgba(34,197,94,0.05)', border: 'rgba(34,197,94,0.2)', label: 'Positive Signal' },
};

function InsightFeed({ insights }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {['critical', 'warning', 'observation', 'positive'].flatMap(sev =>
                insights[sev].map((ins, i) => {
                    const s = SEV[sev];
                    return (
                        <div key={`${sev}-${i}`} style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', background: s.bg, border: `1px solid ${s.border}`, display: 'flex', gap: '0.75rem' }}>
                            <span style={{ flexShrink: 0, fontWeight: 800, fontSize: '0.58rem', color: s.color, background: s.border, padding: '0.15rem 0.45rem', borderRadius: '3px', letterSpacing: '0.05em', marginTop: '0.15rem', height: 'fit-content' }}>
                                {s.label.toUpperCase()}
                            </span>
                            <span style={{ fontSize: '0.81rem', lineHeight: 1.55, color: 'var(--text-main)' }}>{ins.text}</span>
                        </div>
                    );
                })
            )}
        </div>
    );
}

// ── Budget Burn Chart ────────────────────────────────────────────────────────
function BudgetBurnChart({ velocities }) {
    return (
        <div className="card">
            <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                <div className="card-title" style={{ margin: 0 }}>Budget Burn Rate</div>
                <MetricTooltip formula={"₹ Used ÷ ₹ Allocated per club\nRanked by % consumed\nRedline threshold: >60%"} />
            </div>
            <p className="micro-copy" style={{ marginBottom: '1rem' }}>% of total budget consumed so far this cycle.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {velocities.map(v => (
                    <div key={v.name}>
                        <div className="flex-between micro-copy" style={{ marginBottom: '0.2rem' }}>
                            <span style={{ fontWeight: 600 }}>{v.name}</span>
                            <span>
                                <span style={{ fontWeight: 700, color: v.pct > 60 ? 'var(--danger-color)' : v.pct > 40 ? 'var(--warning-color)' : 'var(--success-color)' }}>{v.pct}%</span>
                                <span style={{ color: 'var(--text-muted)' }}> · ₹{v.daily}/day · {v.days}d</span>
                            </span>
                        </div>
                        <div style={{ height: '5px', background: 'var(--border-color)', borderRadius: '3px' }}>
                            <div style={{ width: `${v.pct}%`, height: '100%', borderRadius: '3px', background: v.pct > 60 ? 'var(--danger-color)' : v.pct > 40 ? 'var(--warning-color)' : 'var(--success-color)', transition: 'width 0.5s ease' }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


// ── Club Cluster Network Graph ───────────────────────────────────────────────
function computeForceLayout(nodes, edges, iterations = 300) {
    const W = 640, H = 340;
    const cx = W / 2, cy = H / 2;

    // Start in a circle
    const pos = nodes.map((_, i) => ({
        x: cx + 160 * Math.cos((2 * Math.PI * i) / nodes.length),
        y: cy + 120 * Math.sin((2 * Math.PI * i) / nodes.length),
        vx: 0, vy: 0,
    }));

    const REPULSION = 6000;
    const SPRING_LEN = 140;
    const GRAVITY = 0.04;
    const DAMPING = 0.78;

    for (let iter = 0; iter < iterations; iter++) {
        const fx = new Array(nodes.length).fill(0);
        const fy = new Array(nodes.length).fill(0);

        // Repulsion
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = pos[j].x - pos[i].x || 0.01;
                const dy = pos[j].y - pos[i].y || 0.01;
                const dist2 = dx * dx + dy * dy;
                const dist = Math.sqrt(dist2);
                const f = REPULSION / dist2;
                fx[i] -= f * dx / dist; fy[i] -= f * dy / dist;
                fx[j] += f * dx / dist; fy[j] += f * dy / dist;
            }
        }

        // Spring attraction along weighted edges
        edges.forEach(({ source, target, weight }) => {
            const dx = pos[target].x - pos[source].x;
            const dy = pos[target].y - pos[source].y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const naturalLen = SPRING_LEN / Math.max(1, weight * 0.5);
            const f = (dist - naturalLen) * 0.06 * weight;
            fx[source] += f * dx / dist; fy[source] += f * dy / dist;
            fx[target] -= f * dx / dist; fy[target] -= f * dy / dist;
        });

        // Gravity toward center
        for (let i = 0; i < nodes.length; i++) {
            fx[i] += (cx - pos[i].x) * GRAVITY;
            fy[i] += (cy - pos[i].y) * GRAVITY;
        }

        // Integrate
        for (let i = 0; i < nodes.length; i++) {
            pos[i].vx = (pos[i].vx + fx[i]) * DAMPING;
            pos[i].vy = (pos[i].vy + fy[i]) * DAMPING;
            pos[i].x = Math.max(55, Math.min(W - 55, pos[i].x + pos[i].vx));
            pos[i].y = Math.max(35, Math.min(H - 35, pos[i].y + pos[i].vy));
        }
    }
    return pos;
}

const CATEGORY_COLORS = {
    Debating: '#6366f1',
    Theatre: '#f59e0b',
    Technology: '#22c55e',
    Arts: '#ec4899',
    Environment: '#14b8a6',
};

function ClubNetworkGraph() {
    // Build nodes and edges from shared members
    const { nodes, edges, positions } = useMemo(() => {
        const nodes = MOCK_CLUBS.map(c => ({ id: c.id, name: c.name, category: c.category, members: c.members_count }));
        const edges = [];

        for (let i = 0; i < MOCK_CLUBS.length; i++) {
            for (let j = i + 1; j < MOCK_CLUBS.length; j++) {
                const a = MOCK_CLUBS[i], b = MOCK_CLUBS[j];
                const shared = a.member_ids.filter(id => b.member_ids.includes(id)).length;
                const leaderShared = a.leadership_ids.filter(id => b.leadership_ids.includes(id)).length;
                const weight = shared + leaderShared; // leadership overlap counts double effectively
                if (weight > 0) edges.push({ source: i, target: j, weight, shared, leaderShared });
            }
        }

        const positions = computeForceLayout(nodes, edges);
        return { nodes, edges, positions };
    }, []);

    const [hovered, setHovered] = useState(null);
    const maxWeight = Math.max(...edges.map(e => e.weight), 1);

    return (
        <div className="card" style={{ marginBottom: '0', padding: '1.5rem' }}>
            <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
                <div>
                    <div className="card-title" style={{ margin: 0 }}>Club Membership Cluster Graph</div>
                    <p className="micro-copy" style={{ marginTop: '0.25rem' }}>
                        Clubs connected by shared members. Thicker lines = more overlap. Closer = more interconnected.
                    </p>
                </div>
                <MetricTooltip formula={"Nodes = Clubs/Socs\nEdges = shared member IDs between clubs\nEdge thickness ∝ number of shared students\n+ leadership overlap weight\n\nForce-directed: shared members\ndraw clubs closer together."} />
            </div>

            <svg width="100%" viewBox="0 0 640 340" style={{ display: 'block', overflow: 'visible' }}>
                <defs>
                    {edges.map((e, i) => (
                        <marker key={i} id={`arrow-${i}`} viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill={`rgba(99,102,241,${0.3 + 0.5 * (e.weight / maxWeight)})`} />
                        </marker>
                    ))}
                </defs>

                {/* Edges */}
                {edges.map((e, i) => {
                    const src = positions[e.source], tgt = positions[e.target];
                    const opacity = 0.2 + 0.6 * (e.weight / maxWeight);
                    const strokeW = 1 + 4 * (e.weight / maxWeight);
                    const isHov = hovered === e.source || hovered === e.target;
                    return (
                        <line
                            key={i}
                            x1={src.x} y1={src.y} x2={tgt.x} y2={tgt.y}
                            stroke={isHov ? 'var(--accent-color)' : 'rgba(99,102,241,0.5)'}
                            strokeWidth={isHov ? strokeW + 1 : strokeW}
                            strokeOpacity={isHov ? 1 : opacity}
                            strokeDasharray={e.leaderShared > 0 ? 'none' : '4 3'}
                        />
                    );
                })}

                {/* Edge weight labels on hover */}
                {edges.filter(e => hovered === e.source || hovered === e.target).map((e, i) => {
                    const mx = (positions[e.source].x + positions[e.target].x) / 2;
                    const my = (positions[e.source].y + positions[e.target].y) / 2;
                    return (
                        <g key={i}>
                            <rect x={mx - 18} y={my - 9} width={36} height={16} rx={4} fill="var(--card-bg)" stroke="var(--accent-color)" strokeWidth={0.8} />
                            <text x={mx} y={my + 4} textAnchor="middle" fontSize={9} fill="var(--accent-color)" fontWeight={700}>
                                {e.shared}s {e.leaderShared > 0 ? `+${e.leaderShared}L` : ''}
                            </text>
                        </g>
                    );
                })}

                {/* Nodes */}
                {nodes.map((node, i) => {
                    const { x, y } = positions[i];
                    const r = 14 + Math.min(18, node.members / 15);
                    const color = CATEGORY_COLORS[node.category] || '#6366f1';
                    const isHov = hovered === i;
                    return (
                        <g key={node.id} style={{ cursor: 'pointer' }}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            <circle cx={x} cy={y} r={isHov ? r + 4 : r} fill={color} fillOpacity={isHov ? 0.95 : 0.75}
                                stroke={isHov ? 'white' : color} strokeWidth={isHov ? 2.5 : 1.5}
                                style={{ transition: 'all 0.15s ease', filter: isHov ? `drop-shadow(0 0 8px ${color})` : 'none' }}
                            />
                            <text x={x} y={y + 4} textAnchor="middle" fontSize={isHov ? 9.5 : 8.5}
                                fontWeight={700} fill="white" style={{ pointerEvents: 'none', userSelect: 'none' }}>
                                {node.name.slice(0, 4)}
                            </text>
                            <text x={x} y={y + r + 13} textAnchor="middle" fontSize={9}
                                fill="var(--text-muted)" style={{ pointerEvents: 'none', userSelect: 'none' }}>
                                {node.name}
                            </text>
                        </g>
                    );
                })}
            </svg>

            {/* Legend */}
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
                    <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
                        <span className="micro-copy">{cat}</span>
                    </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginLeft: 'auto' }}>
                    <svg width={30} height={10}><line x1={0} y1={5} x2={30} y2={5} stroke="rgba(99,102,241,0.6)" strokeWidth={2} /></svg>
                    <span className="micro-copy">Member overlap</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <svg width={30} height={10}><line x1={0} y1={5} x2={30} y2={5} stroke="rgba(99,102,241,0.9)" strokeWidth={3} /></svg>
                    <span className="micro-copy">+ Leadership overlap (solid)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span className="micro-copy">Node size ∝ member count</span>
                </div>
            </div>
        </div>
    );
}

// ── Club Overlap Calculator ──────────────────────────────────────────────────
function computeOverlap(clubA, clubB) {
    const leaderUnion = new Set([...clubA.leadership_ids, ...clubB.leadership_ids]);
    const leaderIntersect = clubA.leadership_ids.filter(id => clubB.leadership_ids.includes(id));
    const leadershipPct = leaderUnion.size ? Math.round((leaderIntersect.length / leaderUnion.size) * 100) : 0;

    const memberUnion = new Set([...clubA.member_ids, ...clubB.member_ids]);
    const memberIntersect = clubA.member_ids.filter(id => clubB.member_ids.includes(id));
    const memberPct = memberUnion.size ? Math.round((memberIntersect.length / memberUnion.size) * 100) : 0;

    const leaderStudents = MOCK_STUDENTS.filter(s => leaderIntersect.includes(s.id));
    const memberStudents = MOCK_STUDENTS.filter(s => memberIntersect.includes(s.id));

    return { leadershipPct, memberPct, leaderStudents, memberStudents };
}

function OverlapStudentTable({ students, label, accentColor }) {
    const [filter, setFilter] = useState('');
    const visible = filter
        ? students.filter(s => `${s.name} ${s.major} ${s.minor || ''} ${s.batch}`.toLowerCase().includes(filter.toLowerCase()))
        : students;

    if (students.length === 0) return null;

    return (
        <div style={{ marginTop: '1.5rem' }}>
            <div className="flex-between" style={{ marginBottom: '0.6rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.82rem', color: accentColor }}>
                    {label} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({students.length})</span>
                </div>
                <input
                    className="filter-input"
                    placeholder="Filter students…"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    style={{ width: '180px', padding: '0.25rem 0.6rem', fontSize: '0.72rem' }}
                />
            </div>
            <div className="data-table-container" style={{ margin: '0 -1.5rem', width: 'calc(100% + 3rem)' }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Name</th><th>Batch</th><th>Major</th><th>Minor</th>
                            <th>Apps</th><th>Accept %</th><th>Clubs</th><th>Leadership</th><th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visible.length === 0 ? (
                            <tr><td colSpan={9} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '1rem' }}>No match</td></tr>
                        ) : visible.map(s => (
                            <tr key={s.id}>
                                <td style={{ fontWeight: 700 }}>{s.name}</td>
                                <td>{s.batch}</td>
                                <td>{s.major}</td>
                                <td>{s.minor || <span style={{ color: 'var(--text-muted)' }}>—</span>}</td>
                                <td>{s.applications}</td>
                                <td>
                                    <span style={{ fontWeight: 700, color: s.acceptance_rate === 100 ? 'var(--success-color)' : s.acceptance_rate === 0 ? 'var(--danger-color)' : 'inherit' }}>
                                        {s.acceptance_rate}%
                                    </span>
                                </td>
                                <td><span style={{ fontWeight: 700 }}>{s.joined.length}</span></td>
                                <td>
                                    {s.leadership_roles.length > 0
                                        ? <span className="badge warning" style={{ fontSize: '0.6rem' }}>{s.leadership_roles.length} roles</span>
                                        : <span style={{ color: 'var(--text-muted)' }}>—</span>}
                                </td>
                                <td><span className={`badge ${s.status === 'Isolation Risk' ? 'danger' : s.status === 'Overloaded' ? 'warning' : s.status === 'Healthy' || s.status === 'Balanced' ? 'success' : 'outline'}`} style={{ fontSize: '0.6rem' }}>{s.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function ClubOverlapCalculator() {
    const [selected, setSelected] = useState([]);
    const [result, setResult] = useState(null);

    const toggle = (clubId) => {
        setSelected(prev => prev.includes(clubId) ? prev.filter(id => id !== clubId) : [...prev, clubId]);
        setResult(null);
    };

    const calculate = () => {
        if (selected.length < 2) return;
        const [a, b] = selected.map(id => MOCK_CLUBS.find(c => c.id === id));
        setResult({ clubA: a, clubB: b, ...computeOverlap(a, b) });
    };

    return (
        <div className="card" style={{ marginTop: '1.5rem' }}>
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
                <div>
                    <div className="card-title" style={{ margin: 0 }}>Club Overlap Analyser</div>
                    <p className="micro-copy" style={{ marginTop: '0.25rem' }}>Select 2 clubs to analyse leadership and membership intersections.</p>
                </div>
                <button className="btn btn-primary" disabled={selected.length < 2} onClick={calculate} style={{ opacity: selected.length < 2 ? 0.5 : 1 }}>
                    Calculate Overlap
                </button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                {MOCK_CLUBS.map(club => {
                    const isSel = selected.includes(club.id);
                    return (
                        <button key={club.id} onClick={() => toggle(club.id)} style={{
                            padding: '0.35rem 0.85rem', borderRadius: '99px', fontSize: '0.76rem', fontWeight: isSel ? 700 : 500, cursor: 'pointer',
                            background: isSel ? 'var(--accent-color)' : 'transparent', color: isSel ? 'white' : 'var(--text-muted)',
                            border: `1.5px solid ${isSel ? 'var(--accent-color)' : 'var(--border-color)'}`, transition: 'all 0.15s ease',
                        }}>
                            {isSel && '✓ '}{club.name}
                        </button>
                    );
                })}
            </div>

            {result && (
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                    <div style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.9rem' }}>
                        <span style={{ color: 'var(--accent-color)' }}>{result.clubA.name}</span>
                        <span style={{ color: 'var(--text-muted)', margin: '0 0.5rem' }}>vs</span>
                        <span style={{ color: 'var(--accent-color)' }}>{result.clubB.name}</span>
                    </div>

                    {/* 3 KPI cards — no dept overlap */}
                    <div className="grid-cols-3" style={{ marginBottom: '0.5rem' }}>
                        <div className="card" style={{ padding: '1rem', borderBottom: `3px solid ${result.leadershipPct > 50 ? 'var(--danger-color)' : result.leadershipPct > 25 ? 'var(--warning-color)' : 'var(--success-color)'}` }}>
                            <div className="micro-copy font-bold text-muted" style={{ display: 'flex', alignItems: 'center' }}>
                                Leadership Overlap
                                <MetricTooltip formula={"Shared leaders ÷ All unique leaders\nacross both clubs × 100\n\n>50% = Institutional Capture risk"} />
                            </div>
                            <div className="stat-value" style={{ fontSize: '1.75rem', color: result.leadershipPct > 50 ? 'var(--danger-color)' : result.leadershipPct > 25 ? 'var(--warning-color)' : 'var(--success-color)' }}>
                                {result.leadershipPct}%
                            </div>
                            <div className="micro-copy">{result.leaderStudents.length} shared leader{result.leaderStudents.length !== 1 ? 's' : ''}</div>
                        </div>

                        <div className="card" style={{ padding: '1rem', borderBottom: `3px solid ${result.memberPct > 30 ? 'var(--warning-color)' : 'var(--success-color)'}` }}>
                            <div className="micro-copy font-bold text-muted" style={{ display: 'flex', alignItems: 'center' }}>
                                Member Overlap
                                <MetricTooltip formula={"Students in both clubs ÷\nAll unique students across both × 100"} />
                            </div>
                            <div className="stat-value" style={{ fontSize: '1.75rem' }}>{result.memberPct}%</div>
                            <div className="micro-copy">{result.memberStudents.length} shared member{result.memberStudents.length !== 1 ? 's' : ''}</div>
                        </div>

                        <div className="card" style={{ padding: '1rem', borderBottom: `3px solid ${result.leadershipPct > 50 ? 'var(--danger-color)' : 'var(--success-color)'}` }}>
                            <div className="micro-copy font-bold text-muted">Overall Risk</div>
                            <div style={{ fontWeight: 800, fontSize: '0.95rem', marginTop: '0.5rem' }}>
                                {result.leadershipPct > 50
                                    ? <span style={{ color: 'var(--danger-color)' }}>🔴 Institutional Capture</span>
                                    : result.leadershipPct > 25
                                        ? <span style={{ color: 'var(--warning-color)' }}>🟡 Leadership Overlap</span>
                                        : <span style={{ color: 'var(--success-color)' }}>🟢 Healthy</span>}
                            </div>
                            <div className="micro-copy">Based on leadership signal</div>
                        </div>
                    </div>

                    <OverlapStudentTable students={result.leaderStudents} label="Shared Leadership" accentColor="var(--danger-color)" />
                    <OverlapStudentTable students={result.memberStudents} label="Shared Members" accentColor="var(--accent-color)" />
                </div>
            )}
        </div>
    );
}

// ── Main Dashboard ───────────────────────────────────────────────────────────
export default function OfficeDashboard() {
    const metrics = useDerivedMetrics();
    const { inclusivityIndex, uniqueLeaders, totalPositions, powerConc, budgetVelocities, isolationRisk, overloaded, topStudents, totalStudents, totalRejects, perfectRecord } = metrics;
    const insights = generateInsights(metrics);

    const cohortData = [
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

            {/* KPI Row */}
            <div className="grid-cols-4" style={{ marginBottom: '2rem' }}>
                <div className="card" style={{ padding: '1.25rem', borderBottom: '3px solid var(--success-color)' }}>
                    <div className="micro-copy font-bold text-muted" style={{ display: 'flex', alignItems: 'center' }}>
                        Inclusivity Index
                        <MetricTooltip formula={`Students with ≥1 club membership ÷ Total students\n= ${MOCK_STUDENTS.filter(s => s.joined.length > 0).length} ÷ ${totalStudents} = ${inclusivityIndex}%`} />
                    </div>
                    <div className="stat-value" style={{ fontSize: '1.75rem', color: 'var(--success-color)' }}>{inclusivityIndex}%</div>
                    <p className="micro-copy">Unique student participation rate</p>
                </div>
                <div className="card" style={{ padding: '1.25rem', borderBottom: '3px solid var(--danger-color)' }}>
                    <div className="micro-copy font-bold text-muted" style={{ display: 'flex', alignItems: 'center' }}>
                        Power Concentration
                        <MetricTooltip formula={`Unique leaders ÷ Total leadership positions filled\n= ${uniqueLeaders} unique ÷ ${totalPositions} positions = ${powerConc}\n\nLower value = fewer people hold more power.\nIdeal: >0.6`} />
                    </div>
                    <div className="stat-value" style={{ fontSize: '1.75rem', color: 'var(--danger-color)' }}>{powerConc}</div>
                    <p className="micro-copy">{uniqueLeaders} unique leaders / {totalPositions} positions</p>
                </div>
                <div className="card" style={{ padding: '1.25rem', borderBottom: '3px solid var(--warning-color)' }}>
                    <div className="micro-copy font-bold text-muted" style={{ display: 'flex', alignItems: 'center' }}>
                        Isolation Risk
                        <MetricTooltip formula={`Students where:\n  acceptance_rate = 0%\n  AND applications ≥ 1\n\nCurrently: ${isolationRisk.length} students`} />
                    </div>
                    <div className="stat-value" style={{ fontSize: '1.75rem', color: 'var(--danger-color)' }}>{isolationRisk.length}</div>
                    <p className="micro-copy">Students with 0 accepted memberships</p>
                </div>
                <div className="card" style={{ padding: '1.25rem', borderBottom: '3px solid var(--accent-color)' }}>
                    <div className="micro-copy font-bold text-muted" style={{ display: 'flex', alignItems: 'center' }}>
                        Role Overloading
                        <MetricTooltip formula={`Students holding leadership in ≥3 clubs\nat the same time.\n\nCurrently: ${overloaded.length} students flagged`} />
                    </div>
                    <div className="stat-value" style={{ fontSize: '1.75rem', color: 'var(--warning-color)' }}>{overloaded.length}</div>
                    <p className="micro-copy">Students with ≥3 leadership roles</p>
                </div>
            </div>

            {/* AI Feed + Budget + Cohort Chart */}
            <div className="grid-cols-2" style={{ gap: '2rem', marginBottom: '2rem' }}>
                <div className="card" style={{ borderLeft: '4px solid var(--accent-color)', display: 'flex', flexDirection: 'column', maxHeight: '520px' }}>
                    <div className="flex-between" style={{ marginBottom: '1rem', flexShrink: 0 }}>
                        <div>
                            <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                                <Activity size={18} color="var(--accent-color)" /> AI Intelligence Feed
                            </div>
                            <p className="micro-copy" style={{ marginTop: '0.25rem' }}>
                                {insights.critical.length} Critical · {insights.warning.length} Watchlist · {insights.observation.length} Observations
                            </p>
                        </div>
                        <span className="badge accent" style={{ fontSize: '0.6rem' }}>Live</span>
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem', margin: '0 -0.5rem 0 0' }}>
                        <InsightFeed insights={insights} />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <BudgetBurnChart velocities={budgetVelocities} />
                    <div className="card">
                        <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                            <div className="card-title" style={{ margin: 0 }}>Engagement by Cohort</div>
                            <MetricTooltip formula={"% Active = students with ≥1 club membership\nper batch year"} />
                        </div>
                        <div style={{ height: '155px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={cohortData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                                    <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                                    <RechartsTooltip contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', fontSize: '0.75rem' }} />
                                    <Bar dataKey="active" stackId="a" name="Active %" fill="var(--accent-color)" />
                                    <Bar dataKey="passive" stackId="a" name="Passive %" fill="var(--danger-color)" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

            {/* Deep-Dive Analytics: Risk & Concentration */}
            <div className="grid-cols-2" style={{ gap: '2rem', marginBottom: '2rem' }}>
                {/* RISK HUB: Isolation & Rejection */}
                <div className="card" style={{ borderTop: '4px solid var(--danger-color)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <section>
                        <div className="flex-between mb-4">
                            <h3 className="section-title" style={{ fontSize: '0.9rem' }}>Immediate Isolation Risk</h3>
                            <AlertTriangle size={16} color="var(--danger-color)" />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {isolationRisk.slice(0, 2).map(s => (
                                <div key={s.id} className="glass-list-item" style={{ padding: '0.75rem 1rem', background: 'rgba(239,68,68,0.05)' }}>
                                    <div className="flex-between" style={{ marginBottom: '0.4rem' }}>
                                        <div><div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{s.name}</div><div className="micro-copy">{s.batch} · {s.major}{s.minor ? ` · Minor: ${s.minor}` : ''}</div></div>
                                        <div style={{ textAlign: 'right' }}>
                                            <span className="badge danger" style={{ fontSize: '0.6rem' }}>{s.rejections_count} Rejects</span>
                                            <div className="micro-copy" style={{ marginTop: '0.25rem' }}>{s.days_since_last_activity}d inactive</div>
                                        </div>
                                    </div>
                                    <div className="micro-copy" style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Applied: {s.applied_to.slice(0, 3).join(', ')}{s.applied_to.length > 3 ? ` +${s.applied_to.length - 3}` : ''}</div>
                                    <button className="btn btn-outline" style={{ width: '100%', fontSize: '0.68rem', padding: '0.25rem' }}>Initiate Outreach</button>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div style={{ height: '1px', background: 'var(--border-color)', margin: '0.5rem 0' }} />

                    <section>
                        <div className="flex-between" style={{ marginBottom: '1rem' }}>
                            <div>
                                <div className="card-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                                    <span style={{ color: 'var(--danger-color)' }}>⚠</span> Total Rejection Pool
                                </div>
                                <p className="micro-copy">0% acceptance · 3+ applications</p>
                            </div>
                            <MetricTooltip formula={"Students where:\nacceptance_rate = 0%\nAND applications ≥ 3\n\nThese students applied repeatedly\nand were never accepted anywhere."} />
                        </div>
                        <div className="data-table-container" style={{ margin: '0 -1.5rem', width: 'calc(100% + 3rem)' }}>
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Student</th><th>Batch</th><th>Major</th><th>Apps</th><th>Rejects</th><th>Days Inactive</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {totalRejects.length === 0 ? (
                                        <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '1.5rem' }}>No students in this category</td></tr>
                                    ) : totalRejects.map(s => (
                                        <tr key={s.id}>
                                            <td style={{ fontWeight: 700 }}>{s.name}</td>
                                            <td>{s.batch}</td>
                                            <td>{s.major}</td>
                                            <td><span style={{ color: 'var(--text-muted)' }}>{s.applications}</span></td>
                                            <td><span style={{ fontWeight: 700, color: 'var(--danger-color)' }}>{s.rejections_count}</span></td>
                                            <td><span style={{ color: s.days_since_last_activity > 20 ? 'var(--danger-color)' : 'var(--warning-color)', fontWeight: 600 }}>{s.days_since_last_activity}d</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>

                {/* CONCENTRATION HUB: Elite Access & Access Capture */}
                <div className="card" style={{ borderTop: '4px solid var(--warning-color)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <section>
                        <div className="flex-between mb-4">
                            <h3 className="section-title" style={{ fontSize: '0.9rem' }}>Top Concentration</h3>
                            <div className="badge warning" style={{ fontSize: '0.55rem' }}>Alert</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div className="glass-list-item warning" style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', borderLeft: '3px solid var(--warning-color)' }}>
                                <strong style={{ fontSize: '0.82rem' }}>Student X</strong>
                                <span style={{ fontWeight: 800, color: 'var(--warning-color)', fontSize: '0.82rem' }}>13 Roles</span>
                            </div>
                            <div className="glass-list-item warning" style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', borderLeft: '3px solid var(--warning-color)' }}>
                                <strong style={{ fontSize: '0.82rem' }}>Student Y</strong>
                                <span style={{ fontWeight: 800, color: 'var(--warning-color)', fontSize: '0.82rem' }}>9 Roles</span>
                            </div>
                            <div className="glass-list-item warning" style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem', borderLeft: '3px solid var(--warning-color)' }}>
                                <strong style={{ fontSize: '0.82rem' }}>Student Z</strong>
                                <span style={{ fontWeight: 800, color: 'var(--warning-color)', fontSize: '0.82rem' }}>8 Roles</span>
                            </div>
                            <p className="micro-copy" style={{ marginTop: '0.5rem', lineHeight: '1.5', padding: '0.5rem', background: 'rgba(245,158,11,0.03)', borderRadius: '4px', border: '1px dashed rgba(245,158,11,0.2)' }}>
                                <span style={{ color: 'var(--warning-color)', fontWeight: 800 }}>SYSTEM ALERT:</span> Leadership "bottlenecking" detected. <span style={{ color: 'white' }}>5%</span> of students currently hold <span style={{ color: 'white' }}>45%</span> of all leadership positions across the council.
                            </p>
                        </div>
                    </section>

                    <div style={{ height: '1px', background: 'var(--border-color)', margin: '0.5rem 0' }} />

                    <section>
                        <div className="flex-between" style={{ marginBottom: '1rem' }}>
                            <div>
                                <div className="card-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                                    <span style={{ color: 'var(--success-color)' }}>✓</span> Perfect Record
                                </div>
                                <p className="micro-copy">100% acceptance across all applications</p>
                            </div>
                            <MetricTooltip formula={"Students where:\nacceptance_rate = 100%\nAND applications ≥ 1\n\nEvery application resulted\nin acceptance. May indicate\npool familiarity or social ties."} />
                        </div>
                        <div className="data-table-container" style={{ margin: '0 -1.5rem', width: 'calc(100% + 3rem)' }}>
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Student</th><th>Batch</th><th>Major</th><th>Apps</th><th>Joined</th><th>Leadership</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {perfectRecord.length === 0 ? (
                                        <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '1.5rem' }}>No students in this category</td></tr>
                                    ) : perfectRecord.map(s => (
                                        <tr key={s.id}>
                                            <td style={{ fontWeight: 700 }}>{s.name}</td>
                                            <td>{s.batch}</td>
                                            <td>{s.major}</td>
                                            <td>{s.applications}</td>
                                            <td><span style={{ fontWeight: 700, color: 'var(--success-color)' }}>{s.joined.length}</span></td>
                                            <td>
                                                {s.leadership_roles.length > 0
                                                    ? <span className="badge warning" style={{ fontSize: '0.6rem' }}>{s.leadership_roles.length} roles</span>
                                                    : <span className="micro-copy">—</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>

            {/* Network graph */}
            <ClubNetworkGraph />

            {/* Overlap Calculator */}
            <ClubOverlapCalculator />
        </>
    );
}
