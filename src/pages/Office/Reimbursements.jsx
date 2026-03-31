import React, { useState } from 'react';
import {
    CheckCircle
} from 'lucide-react';
import { MOCK_REIMBURSEMENTS } from '../../data/mockData';

export default function OfficeReimbursements() {
    const [reimbursements, setReimbursements] = useState(MOCK_REIMBURSEMENTS);

    const updateStatus = (id, newStatus) => {
        setReimbursements(reimbursements.map(r => r.id === id ? { ...r, status: newStatus } : r));
    };

    return (
        <>
            <div className="page-header flex-between">
                <div>
                    <h1 className="page-title">Institutional Reimbursement Desk</h1>
                    <p>Managed disbursement of club allocations and asset procurement audits.</p>
                </div>
                <div className="badge outline" style={{ padding: '0.5rem 1rem' }}>Active Cycle: Q3 2024</div>
            </div>

            <div className="grid-cols-4" style={{ marginBottom: '2rem' }}>
                <div className="card" style={{ padding: '1.25rem' }}>
                    <div className="micro-copy" style={{ fontWeight: 700 }}>Total Pending</div>
                    <div className="stat-value" style={{ fontSize: '1.5rem' }}>₹17,100</div>
                    <p className="micro-copy">Across 3 active requests</p>
                </div>
                <div className="card" style={{ padding: '1.25rem' }}>
                    <div className="micro-copy" style={{ fontWeight: 700 }}>Avg Audit Time</div>
                    <div className="stat-value" style={{ fontSize: '1.5rem' }}>14 hrs</div>
                    <p className="micro-copy">Selection to Approval</p>
                </div>
                <div className="card" style={{ padding: '1.25rem' }}>
                    <div className="micro-copy" style={{ fontWeight: 700 }}>Budget Utilization</div>
                    <div className="stat-value" style={{ fontSize: '1.5rem', color: 'var(--success-color)' }}>62%</div>
                    <p className="micro-copy">Total FY24-25 Allocation</p>
                </div>
                <div className="card" style={{ padding: '1.25rem' }}>
                    <div className="micro-copy" style={{ fontWeight: 700 }}>Resubmission Rate</div>
                    <div className="stat-value" style={{ fontSize: '1.5rem', color: 'var(--warning-color)' }}>12%</div>
                    <p className="micro-copy">Documentation gaps detected</p>
                </div>
            </div>

            <div className="card">
                <div className="card-title">Pending & Recent Submissions</div>
                <div className="data-table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Club Registry</th>
                                <th>Category</th>
                                <th>Amount</th>
                                <th>Description</th>
                                <th>Submission Date</th>
                                <th>Status</th>
                                <th>Administrative Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reimbursements.map((r) => (
                                <tr key={r.id}>
                                    <td style={{ fontWeight: 700 }}>{r.club}</td>
                                    <td><span className="badge outline" style={{ fontSize: '0.6rem' }}>{r.category}</span></td>
                                    <td style={{ fontWeight: 800, color: 'var(--text-main)' }}>{r.amount}</td>
                                    <td style={{ maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={r.description}>
                                        {r.description}
                                    </td>
                                    <td>{r.date}</td>
                                    <td>
                                        <span className={`badge ${r.status === 'Approved' ? 'success' : r.status === 'Reject' ? 'danger' : r.status === 'Review' ? 'warning' : 'accent'}`}>
                                            {r.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            {r.status !== 'Approved' && (
                                                <>
                                                    <button className="btn btn-primary" style={{ padding: '0.25rem 0.6rem', fontSize: '0.7rem' }} onClick={() => updateStatus(r.id, 'Approved')}>Approve</button>
                                                    <button className="btn btn-outline" style={{ padding: '0.25rem 0.6rem', fontSize: '0.7rem' }} onClick={() => updateStatus(r.id, 'Review')}>Resubmit</button>
                                                    <button className="btn btn-outline" style={{ padding: '0.25rem 0.6rem', fontSize: '0.7rem', borderColor: 'var(--danger-color)', color: 'var(--danger-color)' }} onClick={() => updateStatus(r.id, 'Reject')}>Reject</button>
                                                </>
                                            )}
                                            {r.status === 'Approved' && (
                                                <div className="micro-copy" style={{ color: 'var(--success-color)', display: 'flex', alignItems: 'center' }}>
                                                    <CheckCircle size={14} style={{ marginRight: '0.3rem' }} /> Transaction Closed
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
