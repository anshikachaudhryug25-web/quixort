import React from 'react';
import QueryExplorer from '../../components/Shared/QueryExplorer';
import { MOCK_CLUBS } from '../../data/mockData';
import { CLUB_SCHEMA } from '../../data/schemas';
import MetricTooltip from '../../components/Shared/MetricTooltip';

export default function OrganizationalCollective() {
    const examples = [
        {
            label: "Highly Selective Legacy",
            description: "Accept % < 20 and Est. < 2015",
            filters: [
                { field: 'acceptance_rate', operator: 'LESS_THAN', value: '20' },
                { field: 'founded', operator: 'LESS_THAN', value: '2015' }
            ]
        },
        {
            label: "Resource Intensive",
            description: "Clubs with ₹12k+ budget",
            filters: [{ field: 'budget_total', operator: 'GREATER_THAN', value: '12000' }]
        },
        {
            label: "Tech Hubs",
            description: "Technology & Engineering",
            filters: [{ field: 'category', operator: 'CONTAINS', value: 'Tech' }]
        },
        {
            label: "High Diversity Alert",
            description: "Clubs with 150+ members",
            filters: [{ field: 'members_count', operator: 'GREATER_THAN', value: '150' }]
        },
        {
            label: "Budget Watchlist",
            description: "Spent over ₹10k already",
            filters: [{ field: 'budget_used', operator: 'GREATER_THAN', value: '10000' }]
        },
        {
            label: "Society Status",
            description: "Socs awaiting review",
            filters: [{ field: 'status', operator: 'EQUALS', value: 'Pending' }]
        },
    ];

    return (
        <div style={{ width: '100%' }}>
            <QueryExplorer data={MOCK_CLUBS} schema={CLUB_SCHEMA} title="Clubs & Socs Intel" examples={examples} targetPath="/office/collective">
                <div className="grid-cols-4" style={{ marginBottom: '2rem' }}>
                    <div className="card" style={{ padding: '1rem' }}>
                        <div className="micro-copy font-bold text-muted flex-between">
                            Total Organizations
                            <MetricTooltip formula={"Total count of registered clubs, societies,\nand student groups across campus."} />
                        </div>
                        <div style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>{MOCK_CLUBS.length} Socs/Clubs</div>
                        <div className="micro-copy">Actively functioning units</div>
                    </div>
                    <div className="card" style={{ padding: '1rem' }}>
                        <div className="micro-copy font-bold text-muted flex-between">
                            Avg Accept Rate
                            <MetricTooltip formula={"Mean acceptance percentage across all\nrecruitment cycles this semester."} />
                        </div>
                        <div style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>21.4% Selective</div>
                        <div style={{ height: '4px', background: 'var(--border-color)', borderRadius: '2px' }}><div style={{ width: '21%', height: '100%', background: 'var(--warning-color)', borderRadius: '2px' }}></div></div>
                    </div>
                    <div className="card" style={{ padding: '1rem' }}>
                        <div className="micro-copy font-bold text-muted flex-between">
                            Budget Utilization
                            <MetricTooltip formula={"Total ₹ spent ÷ Total ₹ allocated\nacross all organizations."} />
                        </div>
                        <div style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>₹42,300 Used</div>
                        <div style={{ height: '4px', background: 'var(--border-color)', borderRadius: '2px' }}><div style={{ width: '56%', height: '100%', background: 'var(--accent-color)', borderRadius: '2px' }}></div></div>
                    </div>
                    <div className="card" style={{ padding: '1rem' }}>
                        <div className="micro-copy font-bold text-muted flex-between">
                            Highly Selective
                            <MetricTooltip formula={"Organizations with <15% acceptance rate\nOften flagged for elitism or high bias."} />
                        </div>
                        <div style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.5rem' }}>3 Societies</div>
                        <div style={{ height: '4px', background: 'var(--border-color)', borderRadius: '2px' }}><div style={{ width: '15%', height: '100%', background: 'var(--danger-color)', borderRadius: '2px' }}></div></div>
                    </div>
                </div>
            </QueryExplorer>
        </div>
    );
}
