import React, { useState } from 'react';
import { XCircle } from 'lucide-react';
import { OPERATORS } from '../../data/constants';

export default function QueryConstructor({ schema, onQueryChange }) {
    const [queryGroups, setQueryGroups] = useState([
        { id: 1, logic: 'AND', filters: [{ field: schema[0].key, operator: 'EQUALS', value: '' }] }
    ]);
    const [globalLogic, setGlobalLogic] = useState('OR');

    const addSegment = () => {
        const next = [...queryGroups, { id: Date.now(), logic: 'AND', filters: [{ field: schema[0].key, operator: 'EQUALS', value: '' }] }];
        setQueryGroups(next);
        onQueryChange(next, globalLogic);
    };

    const addCondition = (groupId) => {
        const next = queryGroups.map(g => g.id === groupId ? { ...g, filters: [...g.filters, { field: schema[0].key, operator: 'EQUALS', value: '' }] } : g);
        setQueryGroups(next);
        onQueryChange(next, globalLogic);
    };

    const updateFilter = (groupId, index, key, val) => {
        const nextGroup = queryGroups.map(g => {
            if (g.id === groupId) {
                const nextFilters = [...g.filters];
                nextFilters[index][key] = val;
                return { ...g, filters: nextFilters };
            }
            return g;
        });
        setQueryGroups(nextGroup);
        onQueryChange(nextGroup, globalLogic);
    };

    const updateLogic = (groupId, val) => {
        const nextSet = queryGroups.map(g => g.id === groupId ? { ...g, logic: val } : g);
        setQueryGroups(nextSet);
        onQueryChange(nextSet, globalLogic);
    };

    const updateGlobalLogic = (val) => {
        setGlobalLogic(val);
        onQueryChange(queryGroups, val);
    };

    return (
        <div className="card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--accent-color)' }}>
            <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                <div className="card-title" style={{ margin: 0 }}>Advanced Intelligence Query</div>
                <button className="btn btn-primary" style={{ fontSize: '0.7rem' }} onClick={addSegment}>+ Add New Segment</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {queryGroups.map((group, groupIdx) => (
                    <React.Fragment key={group.id}>
                        {groupIdx > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'center', margin: '0.5rem 0' }}>
                                <select
                                    className="filter-input"
                                    style={{ width: '80px', textAlign: 'center', background: 'var(--accent-light)', borderColor: 'var(--accent-color)', fontWeight: 800, cursor: 'pointer' }}
                                    value={globalLogic}
                                    onChange={(e) => updateGlobalLogic(e.target.value)}
                                >
                                    <option value="AND">AND</option>
                                    <option value="OR">OR</option>
                                </select>
                            </div>
                        )}
                        <div className="glass-list-item" style={{ padding: '1.25rem', border: '1px solid var(--border-color)', position: 'relative', cursor: 'default' }}>
                            <div className="flex-between" style={{ marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <span className="badge accent" style={{ fontSize: '0.6rem', padding: '0.2rem 0.6rem' }}>Segment #{groupIdx + 1}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                        <span className="micro-copy font-bold" style={{ color: 'var(--text-main)', fontSize: '0.7rem' }}>MATCH ALL/ANY:</span>
                                        <select className="filter-input" style={{ width: '70px', padding: '0.15rem', fontSize: '0.75rem' }} value={group.logic} onChange={(e) => updateLogic(group.id, e.target.value)}>
                                            <option value="AND">ALL</option>
                                            <option value="OR">ANY</option>
                                        </select>
                                    </div>
                                    <button className="btn btn-outline" style={{ fontSize: '0.65rem', padding: '0.25rem 0.5rem' }} onClick={() => addCondition(group.id)}>+ Add Condition</button>
                                </div>
                            </div>
                            {group.filters.map((f, i) => (
                                <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <span className="micro-copy" style={{ width: '40px', fontWeight: 700 }}>{i === 0 ? 'IF' : group.logic}</span>
                                    <select className="filter-input" value={f.field} onChange={(e) => updateFilter(group.id, i, 'field', e.target.value)} style={{ flex: 1, height: '32px' }}>
                                        {schema.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                                    </select>
                                    <select className="filter-input" value={f.operator} onChange={(e) => updateFilter(group.id, i, 'operator', e.target.value)} style={{ width: '100px', height: '32px' }}>
                                        {Object.keys(OPERATORS).map(op => <option key={op} value={op}>{op.replace('_', ' ')}</option>)}
                                    </select>
                                    <input
                                        type="text"
                                        className="filter-input"
                                        placeholder="Value..."
                                        value={f.value}
                                        onChange={(e) => updateFilter(group.id, i, 'value', e.target.value)}
                                        style={{ flex: 1.5, height: '32px' }}
                                    />
                                    {group.filters.length > 1 && (
                                        <button onClick={() => {
                                            const next = queryGroups.map(g => g.id === group.id ? { ...g, filters: g.filters.filter((_, idx) => idx !== i) } : g);
                                            setQueryGroups(next);
                                            onQueryChange(next, globalLogic);
                                        }} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><XCircle size={14} /></button>
                                    )}
                                </div>
                            ))}
                            {queryGroups.length > 1 && (
                                <button onClick={() => {
                                    const next = queryGroups.filter(g => g.id !== group.id);
                                    setQueryGroups(next);
                                    onQueryChange(next, globalLogic);
                                }} style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'var(--danger-color)', border: 'none', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '10px' }}>×</button>
                            )}
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
