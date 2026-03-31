import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QueryConstructor from './QueryConstructor';
import DataTable from './DataTable';

export default function QueryExplorer({ data, schema, title, examples = [], targetPath, children }) {
    const [filteredData, setFilteredData] = useState(data);
    const navigate = useNavigate();

    const handleQuery = (queryGroups, globalLogic = 'OR') => {
        const results = data.filter(row => {
            if (globalLogic === 'AND') {
                return queryGroups.every(group => evaluateGroup(row, group));
            } else {
                return queryGroups.some(group => evaluateGroup(row, group));
            }
        });
        setFilteredData(results);
    };

    const evaluateGroup = (row, group) => {
        if (group.logic === 'AND') {
            return group.filters.every(f => applyFilter(row, f));
        } else {
            return group.filters.some(f => applyFilter(row, f));
        }
    };

    const applyFilter = (row, f) => {
        if (!f.value) return true;
        const val = row[f.field]?.toString().toLowerCase() || '';
        const target = f.value.toLowerCase();

        switch (f.operator) {
            case 'EQUALS': return val == target;
            case 'NOT_EQUALS': return val != target;
            case 'CONTAINS': return val.includes(target);
            case 'GREATER_THAN': return parseFloat(val) > parseFloat(target);
            case 'LESS_THAN': return parseFloat(val) < parseFloat(target);
            default: return true;
        }
    };

    return (
        <>
            <div className="page-header">
                <h1 className="page-title">{title}</h1>
                <p>Interactive query interface for data-led institutional intelligence.</p>
            </div>

            <div className="card" style={{ marginBottom: '1.5rem' }}>
                <div className="card-title" style={{ fontSize: '0.8rem' }}>Suggested Administrative Segments</div>
                <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                    {examples.map((ex, i) => (
                        <div
                            key={i}
                            className="glass-list-item"
                            style={{ cursor: 'pointer', border: '1px solid var(--border-color)', minWidth: '240px', flexShrink: 0, marginBottom: 0 }}
                            onClick={() => handleQuery([{ logic: 'AND', filters: ex.filters }])}
                        >
                            <div style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--accent-color)' }}>{ex.label}</div>
                            <div className="micro-copy" style={{ fontSize: '0.7rem' }}>{ex.description}</div>
                        </div>
                    ))}
                </div>
            </div>

            {children}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
                <div style={{ width: '100%' }}>
                    <QueryConstructor schema={schema} onQueryChange={handleQuery} />
                </div>
                <div style={{ width: '100%' }}>
                    <DataTable
                        data={filteredData}
                        schema={schema}
                        title="Query Results"
                        onRowClick={(row) => navigate(`${targetPath}/${row.id || row.name}`)}
                    />
                </div>
            </div>
        </>
    );
}
