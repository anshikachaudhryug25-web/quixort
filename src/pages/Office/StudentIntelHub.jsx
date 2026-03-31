import React from 'react';
import QueryExplorer from '../../components/Shared/QueryExplorer';
import { MOCK_STUDENTS } from '../../data/mockData';
import { STUDENT_SCHEMA } from '../../data/schemas';
import MetricTooltip from '../../components/Shared/MetricTooltip';

export default function StudentInvolvementHub() {
    const examples = [
        {
            label: "Isolation Risk",
            description: "Apps > 3 and Accept % < 10",
            filters: [
                { field: 'applications', operator: 'GREATER_THAN', value: '3' },
                { field: 'acceptance_rate', operator: 'LESS_THAN', value: '10' }
            ]
        },
        {
            label: "Leadership Bottleneck",
            description: "Students with 3+ core roles",
            filters: [{ field: 'leadership_roles', operator: 'GREATER_THAN', value: '2' }]
        },
        {
            label: "High Potential Passives",
            description: "High score but 0 memberships",
            filters: [
                { field: 'participation_score', operator: 'GREATER_THAN', value: '70' },
                { field: 'joined', operator: 'EQUALS', value: '0' }
            ]
        },
        {
            label: "UG25 Freshman Signal",
            description: "Incoming batch engagement",
            filters: [{ field: 'batch', operator: 'EQUALS', value: '2025' }]
        },
        {
            label: "Grievance Watchlist",
            description: "Students who filed complaints",
            filters: [{ field: 'grievances_filed', operator: 'GREATER_THAN', value: '0' }]
        },
        {
            label: "Elite Clusters",
            description: "100% acceptance across 2+ apps",
            filters: [
                { field: 'acceptance_rate', operator: 'EQUALS', value: '100' },
                { field: 'applications', operator: 'GREATER_THAN', value: '1' }
            ]
        },
    ];

    return (
        <div style={{ width: '100%' }}>
            <QueryExplorer data={MOCK_STUDENTS} schema={STUDENT_SCHEMA} title="Student Intel Hub" examples={examples} targetPath="/office/students">
                <div className="grid-cols-4" style={{ marginBottom: '2rem' }}>
                    <div className="card" style={{ padding: '1rem' }}>
                        <div className="micro-copy font-bold text-muted flex-between">
                            Gender Distribution
                            <MetricTooltip formula={"Self-identified student gender pronouns\nAggregate of current student population database."} />
                        </div>
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
                        <div className="micro-copy font-bold text-muted flex-between">
                            Inclusivity Index
                            <MetricTooltip formula={"Students with ≥1 club membership ÷ Total students\nGoal: >80% for healthy campus ecosystem."} />
                        </div>
                        <div style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>82% Diversified</div>
                        <div style={{ height: '4px', background: 'var(--border-color)', borderRadius: '2px' }}><div style={{ width: '82%', height: '100%', background: 'var(--success-color)', borderRadius: '2px' }}></div></div>
                    </div>
                    <div className="card" style={{ padding: '1rem' }}>
                        <div className="micro-copy font-bold text-muted flex-between">
                            Engagement Gap
                            <MetricTooltip formula={"Students with 0 active memberships AND\n0 pending applications.\nIndicates potential isolation risk."} />
                        </div>
                        <div style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>14% Passive</div>
                        <div style={{ height: '4px', background: 'var(--border-color)', borderRadius: '2px' }}><div style={{ width: '14%', height: '100%', background: 'var(--warning-color)', borderRadius: '2px' }}></div></div>
                    </div>
                    <div className="card" style={{ padding: '1rem' }}>
                        <div className="micro-copy font-bold text-muted flex-between">
                            Active Leaders
                            <MetricTooltip formula={"Unique students holding 'Executive' or\n'Lead' roles across all registered organizations."} />
                        </div>
                        <div style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>28 Students</div>
                        <div style={{ height: '4px', background: 'var(--border-color)', borderRadius: '2px' }}><div style={{ width: '35%', height: '100%', background: 'var(--accent-color)', borderRadius: '2px' }}></div></div>
                    </div>
                </div>
            </QueryExplorer>
        </div>
    );
}
