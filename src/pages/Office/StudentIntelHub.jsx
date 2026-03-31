import React from 'react';
import QueryExplorer from '../../components/Shared/QueryExplorer';
import { MOCK_STUDENTS } from '../../data/mockData';
import { STUDENT_SCHEMA } from '../../data/schemas';

export default function StudentInvolvementHub() {
    const examples = [
        { label: "Isolation Risk", description: "1st Years with 0 acceptances", filters: [{ field: 'status', operator: 'CONTAINS', value: 'Risk' }] },
        { label: "Bottleneck Targets", description: "Students rejected from 3+ clubs", filters: [{ field: 'rejections_count', operator: 'GREATER_THAN', value: '2' }] },
        { label: "Elite Clusters", description: "Students with 100% acceptance", filters: [{ field: 'acceptance_rate', operator: 'EQUALS', value: '100' }] },
    ];

    return (
        <div style={{ width: '100%' }}>
            <QueryExplorer data={MOCK_STUDENTS} schema={STUDENT_SCHEMA} title="Student Intel Hub" examples={examples} targetPath="/office/students">
                <div className="grid-cols-4" style={{ marginBottom: '2rem' }}>
                    <div className="card" style={{ padding: '1rem' }}>
                        <div className="micro-copy font-bold text-muted">Gender Distribution</div>
                        <div style={{ height: '80px', display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                                <div style={{ flex: 1, textAlign: 'center' }}>
                                    <div className="stat-value" style={{ fontSize: '1rem' }}>45%</div>
                                    <div className="micro-copy">He/Him</div>
                                </div>
                                <div style={{ flex: 1, textAlign: 'center' }}>
                                    <div className="stat-value" style={{ fontSize: '1rem' }}>48%</div>
                                    <div className="micro-copy">She/Her</div>
                                </div>
                                <div style={{ flex: 1, textAlign: 'center' }}>
                                    <div className="stat-value" style={{ fontSize: '1rem' }}>7%</div>
                                    <div className="micro-copy">Non-binary</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card" style={{ padding: '1rem' }}>
                        <div className="micro-copy font-bold text-muted">Inclusivity Index</div>
                        <div style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>82% Diversified</div>
                        <div style={{ height: '4px', background: 'var(--border-color)', borderRadius: '2px' }}><div style={{ width: '82%', height: '100%', background: 'var(--success-color)', borderRadius: '2px' }}></div></div>
                    </div>
                    <div className="card" style={{ padding: '1rem' }}>
                        <div className="micro-copy font-bold text-muted">Engagement Gap</div>
                        <div style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>14% Passive</div>
                        <div style={{ height: '4px', background: 'var(--border-color)', borderRadius: '2px' }}><div style={{ width: '14%', height: '100%', background: 'var(--warning-color)', borderRadius: '2px' }}></div></div>
                    </div>
                    <div className="card" style={{ padding: '1rem' }}>
                        <div className="micro-copy font-bold text-muted">Active Leaders</div>
                        <div style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>28 Students</div>
                        <div style={{ height: '4px', background: 'var(--border-color)', borderRadius: '2px' }}><div style={{ width: '35%', height: '100%', background: 'var(--accent-color)', borderRadius: '2px' }}></div></div>
                    </div>
                </div>
            </QueryExplorer>
        </div>
    );
}
