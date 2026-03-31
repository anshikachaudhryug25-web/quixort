import React from 'react';
import QueryExplorer from '../../components/Shared/QueryExplorer';
import { MOCK_CLUBS } from '../../data/mockData';
import { CLUB_SCHEMA } from '../../data/schemas';

export default function OrganizationalCollective() {
    const examples = [
        { label: "Highly Selective", description: "Acceptance Rate < 25%", filters: [{ field: 'acceptance_rate', operator: 'LESS_THAN', value: '25' }] },
        { label: "Tech Hubs", description: "All Technology category clubs", filters: [{ field: 'category', operator: 'CONTAINS', value: 'Tech' }] },
        { label: "Institutional Capture", description: "Clubs with 150+ members", filters: [{ field: 'members_count', operator: 'GREATER_THAN', value: '150' }] },
    ];

    return (
        <div style={{ width: '100%' }}>
            <QueryExplorer data={MOCK_CLUBS} schema={CLUB_SCHEMA} title="Clubs & Socs Intel" examples={examples} targetPath="/office/collective" />
        </div>
    );
}
