import React from 'react';
import { MoreHorizontal, Plus } from 'lucide-react';

export default function ClubDashboard() {
    return (
        <>
            <div className="page-header flex-between">
                <div>
                    <h1 className="page-title">Management: Tech Soc</h1>
                    <p>Real-time control over your club's logistics & team.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-outline"><MoreHorizontal size={18} /></button>
                    <button className="btn btn-primary">
                        <Plus size={18} style={{ marginRight: '0.5rem' }} /> New Request
                    </button>
                </div>
            </div>

            <div className="grid-cols-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                <div className="card"><div className="card-title">Total Members</div><div className="stat-value">210</div><p className="micro-copy">+15 new this month</p></div>
                <div className="card"><div className="card-title">Leaders/Core</div><div className="stat-value">8</div><p className="micro-copy">3 active roles open</p></div>
                <div className="card"><div className="card-title">Budget Allocation</div><div className="stat-value">₹15,000</div><p className="micro-copy">72% utilized</p></div>
                <div className="card"><div className="card-title">Induction Success</div><div className="stat-value">22%</div><p className="micro-copy">120 applicants</p></div>
            </div>

            <div style={{ marginTop: '2.5rem' }}>
                <div className="card">
                    <div className="card-title">Governance Task Queue</div>
                    <div className="data-table-container">
                        <table className="data-table">
                            <thead>
                                <tr><th>Due Date</th><th>Task Description</th><th>Resource Impact</th><th>Status</th><th>Action</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>Sept 25</td><td>Submit Reimbursement: 'Hackathon 24'</td><td>₹12,400</td><td><span className="badge danger">Urgent</span></td><td><button className="btn btn-primary" style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}>Upload Receipts</button></td></tr>
                                <tr><td>Sept 28</td><td>Review Induction Forms (Cycle #2)</td><td>120 Applicants</td><td><span className="badge warning">Pending</span></td><td><button className="btn btn-outline" style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}>Open Review</button></td></tr>
                                <tr><td>Oct 02</td><td>Inventory Audit: Production Assets</td><td>Hardware Soc</td><td><span className="badge outline">Upcoming</span></td><td><button className="btn btn-outline" style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}>Checklist</button></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
