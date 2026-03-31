import React, { useState, useMemo } from 'react';
import { Settings } from 'lucide-react';

export default function DataTable({ data, schema, title, onRowClick }) {
    const [visibleColumns, setVisibleColumns] = useState(schema.map(s => s.key));
    const [showConfig, setShowConfig] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const toggleColumn = (key) => {
        setVisibleColumns(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
    };

    const sortedData = useMemo(() => {
        if (!sortConfig.key) return data;
        return [...data].sort((a, b) => {
            let valA = a[sortConfig.key];
            let valB = b[sortConfig.key];
            if (typeof valA === 'string') valA = valA.toLowerCase();
            if (typeof valB === 'string') valB = valB.toLowerCase();
            if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
            if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [data, sortConfig]);

    const getStatusBadge = (status) => {
        const s = status?.toString().toLowerCase();
        if (s?.includes('risk') || s?.includes('overloaded')) return <span className="badge danger">{status}</span>;
        if (s?.includes('balanced') || s?.includes('healthy') || s?.includes('active')) return <span className="badge success">{status}</span>;
        if (s?.includes('review') || s?.includes('at risk')) return <span className="badge warning">{status}</span>;
        return <span className="badge outline">{status}</span>;
    };

    return (
        <div className="card" style={{ width: '100%' }}>
            <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                <div className="card-title" style={{ margin: 0 }}>{title} ({data.length})</div>
                <div style={{ position: 'relative' }}>
                    <button className="btn btn-outline" style={{ fontSize: '0.75rem' }} onClick={() => setShowConfig(!showConfig)}>
                        <Settings size={14} style={{ marginRight: '0.4rem' }} /> Configure Columns
                    </button>
                    {showConfig && (
                        <div className="column-config-dropdown">
                            <div className="micro-copy font-bold mb-4" style={{ color: 'var(--accent-color)' }}>Toggle Display Fields</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.25rem' }}>
                                {schema.map(s => (
                                    <label key={s.key} className="column-config-label">
                                        <input type="checkbox" checked={visibleColumns.includes(s.key)} onChange={() => toggleColumn(s.key)} />
                                        {s.label}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="data-table-container" style={{ margin: '0 -1.5rem', width: 'calc(100% + 3rem)' }}>
                <table className="data-table" style={{ width: '100%', tableLayout: 'auto' }}>
                    <thead>
                        <tr>
                            {schema.filter(s => visibleColumns.includes(s.key)).map(s => (
                                <th key={s.key} onClick={() => setSortConfig({ key: s.key, direction: sortConfig.key === s.key && sortConfig.direction === 'asc' ? 'desc' : 'asc' })} style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        {s.label}
                                        {sortConfig.key === s.key && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((row, i) => (
                            <tr key={i} onClick={() => onRowClick && onRowClick(row)} style={{ cursor: onRowClick ? 'pointer' : 'default' }}>
                                {schema.filter(s => visibleColumns.includes(s.key)).map(s => (
                                    <td key={s.key}>
                                        {s.key === 'status' ? getStatusBadge(row[s.key]) :
                                            s.key.includes('rate') || s.key.includes('%') ? <span style={{ fontWeight: 700, color: row[s.key] > 80 ? 'var(--success-color)' : row[s.key] < 20 ? 'var(--danger-color)' : 'inherit' }}>{row[s.key]}%</span> :
                                                Array.isArray(row[s.key]) ? <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>{row[s.key].slice(0, 3).map(v => <span className="badge outline" style={{ fontSize: '0.6rem' }} key={v}>{v}</span>)}{row[s.key].length > 3 && <span className="micro-copy">+{row[s.key].length - 3}</span>}</div> :
                                                    row[s.key]?.toString() || '-'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
