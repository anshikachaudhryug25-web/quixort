import React, { useState } from 'react';
import { XCircle, Save, Sparkles, Plus, X } from 'lucide-react';
import { OPERATORS } from '../../data/constants';

export default function QueryConstructor({
    schema,
    onQueryChange,
    queryGroups,
    setQueryGroups,
    globalLogic,
    setGlobalLogic,
    onSaveQuery,
    onOpenSuggestions,
    activeFilterLabel
}) {
    const [saveName, setSaveName] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        if (saveName.trim()) {
            onSaveQuery(saveName);
            setSaveName('');
            setIsSaving(false);
        }
    };

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
                nextFilters[index] = { ...nextFilters[index], [key]: val };
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
        <div className="card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--accent-color)', padding: '2rem' }}>
            <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div className="card-title" style={{ margin: 0, fontSize: '1rem' }}>Advanced Query Builder</div>
                    {activeFilterLabel && (
                        <div style={{ background: 'var(--accent-light)', color: 'var(--accent-color)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 800, border: '1px solid var(--accent-color)', letterSpacing: '0.05rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-color)' }} />
                            Quick Filter: {activeFilterLabel}
                        </div>
                    )}
                    <button className="btn btn-outline" style={{ fontSize: '0.7rem', height: '30px', padding: '0 0.75rem', borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }} onClick={onOpenSuggestions}>
                        <Sparkles size={14} style={{ marginRight: '0.4rem' }} /> Quick Filters
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    {isSaving ? (
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: 'var(--bg-color)', padding: '0.25rem 0.5rem', borderRadius: '0.5rem', border: '1px solid var(--accent-color)' }}>
                            <input
                                type="text"
                                className="filter-input"
                                placeholder="Filter name..."
                                value={saveName}
                                onChange={e => setSaveName(e.target.value)}
                                style={{ width: '150px', height: '28px', fontSize: '0.75rem' }}
                                autoFocus
                            />
                            <button className="btn btn-primary" style={{ padding: '0.25rem 0.6rem', fontSize: '0.7rem' }} onClick={handleSave}>Save</button>
                            <button className="btn btn-outline" style={{ padding: '0.25rem 0.6rem', fontSize: '0.7rem' }} onClick={() => setIsSaving(false)}>Cancel</button>
                        </div>
                    ) : (
                        <button className="btn btn-outline" style={{ fontSize: '0.7rem', height: '32px' }} onClick={() => setIsSaving(true)}>
                            <Save size={14} style={{ marginRight: '0.4rem' }} /> Save Query
                        </button>
                    )}
                    <button className="btn btn-primary" style={{ fontSize: '0.7rem', height: '32px' }} onClick={addSegment}>
                        <Plus size={14} style={{ marginRight: '0.4rem' }} /> New Segment
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {queryGroups.map((group, groupIdx) => (
                    <React.Fragment key={group.id}>
                        {groupIdx > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'center', margin: '0.5rem 0', position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'var(--border-color)', zIndex: 0 }} />
                                <select
                                    className="filter-input"
                                    style={{ width: '80px', textAlign: 'center', background: 'var(--accent-light)', border: '1px solid var(--accent-color)', borderRadius: '4px', color: 'var(--accent-color)', fontWeight: 800, cursor: 'pointer', zIndex: 1, position: 'relative', fontSize: '0.7rem' }}
                                    value={globalLogic}
                                    onChange={(e) => updateGlobalLogic(e.target.value)}
                                >
                                    <option value="AND">AND</option>
                                    <option value="OR">OR</option>
                                </select>
                            </div>
                        )}
                        <div className="glass-list-item" style={{ padding: '1.25rem', border: '1px solid var(--border-color)', position: 'relative', cursor: 'default', background: 'rgba(255,255,255,0.015)' }}>
                            <div className="flex-between" style={{ marginBottom: '1.25rem' }}>
                                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Group {groupIdx + 1}</span>
                                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                                        <span className="micro-copy" style={{ fontSize: '0.65rem' }}>Logic:</span>
                                        <select className="filter-input" style={{ width: '60px', padding: '0', height: '20px', fontSize: '0.7rem', border: 'none', background: 'none' }} value={group.logic} onChange={(e) => updateLogic(group.id, e.target.value)}>
                                            <option value="AND">ALL</option>
                                            <option value="OR">ANY</option>
                                        </select>
                                    </div>
                                </div>
                                <button className="btn btn-outline" style={{ fontSize: '0.65rem', padding: '0.3rem 0.6rem', height: 'auto' }} onClick={() => addCondition(group.id)}>+ Add Condition</button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {group.filters.map((f, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                        <div style={{ width: '40px', textAlign: 'right', fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent-color)' }}>
                                            {i === 0 ? 'IF' : group.logic}
                                        </div>
                                        <select className="filter-input" value={f.field} onChange={(e) => updateFilter(group.id, i, 'field', e.target.value)} style={{ flex: 1, height: '32px', fontSize: '0.8rem' }}>
                                            {schema.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                                        </select>
                                        <select className="filter-input" value={f.operator} onChange={(e) => updateFilter(group.id, i, 'operator', e.target.value)} style={{ width: '120px', height: '32px', fontSize: '0.8rem' }}>
                                            {Object.keys(OPERATORS).map(op => <option key={op} value={op}>{op.replace('_', ' ')}</option>)}
                                        </select>
                                        <input
                                            type="text"
                                            className="filter-input"
                                            placeholder="Value..."
                                            value={f.value}
                                            onChange={(e) => updateFilter(group.id, i, 'value', e.target.value)}
                                            style={{ flex: 1.5, height: '32px', fontSize: '0.8rem' }}
                                        />
                                        <button
                                            onClick={() => {
                                                let next;
                                                if (group.filters.length > 1) {
                                                    next = queryGroups.map(g => g.id === group.id ? { ...g, filters: g.filters.filter((_, idx) => idx !== i) } : g);
                                                } else {
                                                    // Last one: clear it
                                                    next = queryGroups.map(g => g.id === group.id ? { ...g, filters: [{ field: schema[0].key, operator: 'EQUALS', value: '' }] } : g);
                                                }
                                                setQueryGroups(next);
                                                onQueryChange(next, globalLogic);
                                            }}
                                            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                                        >
                                            <XCircle size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {queryGroups.length > 1 && (
                                <button
                                    onClick={() => {
                                        const next = queryGroups.filter(g => g.id !== group.id);
                                        setQueryGroups(next);
                                        onQueryChange(next, globalLogic);
                                    }}
                                    style={{
                                        position: 'absolute',
                                        top: '-10px',
                                        right: '-10px',
                                        background: 'var(--danger-color)',
                                        border: 'none',
                                        color: 'white',
                                        borderRadius: '50%',
                                        width: '24px',
                                        height: '24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        fontSize: '12px',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                                    }}
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
