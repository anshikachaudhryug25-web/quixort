import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Sparkles, X, ChevronRight, Inbox } from 'lucide-react';
import QueryConstructor from './QueryConstructor';
import DataTable from './DataTable';

export default function QueryExplorer({ data, schema, title, examples = [], targetPath, children }) {
    const storageKey = `user_filters_${title.replace(/\s+/g, '_').toLowerCase()}`;

    const initialQuery = [
        { id: 1, logic: 'AND', filters: [{ field: schema[0].key, operator: 'EQUALS', value: '' }] }
    ];

    const [queryGroups, setQueryGroups] = useState(initialQuery);
    const [globalLogic, setGlobalLogic] = useState('OR');
    const [filteredData, setFilteredData] = useState(data);
    const [userFilters, setUserFilters] = useState([]);
    const [showDrawer, setShowDrawer] = useState(false);

    const navigate = useNavigate();

    // Load user filters on mount
    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved) setUserFilters(JSON.parse(saved));
    }, [storageKey]);

    const handleQuery = (groups, logic) => {
        const results = data.filter(row => {
            if (logic === 'AND') {
                return groups.every(group => evaluateGroup(row, group));
            } else {
                return groups.some(group => evaluateGroup(row, group));
            }
        });
        setFilteredData(results);
    };

    const handleSaveQuery = (name) => {
        if (!name.trim()) return;
        const newFilter = {
            label: name,
            description: "Custom user-defined filter",
            fullQuery: { groups: JSON.parse(JSON.stringify(queryGroups)), logic: globalLogic },
            isUser: true,
            id: Date.now()
        };
        const updated = [...userFilters, newFilter];
        setUserFilters(updated);
        localStorage.setItem(storageKey, JSON.stringify(updated));
    };

    const deleteFilter = (id, e) => {
        e.stopPropagation();
        const updated = userFilters.filter(f => f.id !== id);
        setUserFilters(updated);
        localStorage.setItem(storageKey, JSON.stringify(updated));
    };

    const isActive = (ex) => {
        if (ex.fullQuery) {
            return JSON.stringify(ex.fullQuery.groups.map(g => ({ ...g, id: null }))) ===
                JSON.stringify(queryGroups.map(g => ({ ...g, id: null }))) &&
                ex.fullQuery.logic === globalLogic;
        }
        if (queryGroups.length !== 1) return false;
        return JSON.stringify(ex.filters) === JSON.stringify(queryGroups[0].filters);
    };

    const applyExample = (ex) => {
        if (isActive(ex)) {
            // Unselect: Reset to initial
            setQueryGroups(initialQuery);
            setGlobalLogic('OR');
            handleQuery(initialQuery, 'OR');
        } else {
            if (ex.fullQuery) {
                setQueryGroups(ex.fullQuery.groups);
                setGlobalLogic(ex.fullQuery.logic);
                handleQuery(ex.fullQuery.groups, ex.fullQuery.logic);
            } else {
                const nextGroups = [{ id: Date.now(), logic: 'AND', filters: ex.filters }];
                setQueryGroups(nextGroups);
                setGlobalLogic('OR');
                handleQuery(nextGroups, 'OR');
            }
        }
        setShowDrawer(false);
    };

    const evaluateGroup = (row, group) => {
        if (group.logic === 'AND') {
            return group.filters.every(f => applyFilter(row, f));
        } else {
            return group.filters.some(f => applyFilter(row, f));
        }
    };

    const applyFilter = (row, f) => {
        if (f.value === undefined || f.value === '') return true;

        let val = row[f.field];
        if (Array.isArray(val)) {
            val = val.length.toString();
        } else {
            val = val?.toString().toLowerCase() || '';
        }

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

    const allExamples = [...examples, ...userFilters];
    const activeFilter = allExamples.find(ex => isActive(ex));

    return (
        <div style={{ position: 'relative' }}>
            <div className="page-header flex-between">
                <div>
                    <h1 className="page-title">{title}</h1>
                    <p>Interactive query interface for data-led institutional intelligence.</p>
                </div>
            </div>

            {children}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
                <div style={{ width: '100%' }}>
                    <QueryConstructor
                        schema={schema}
                        onQueryChange={handleQuery}
                        queryGroups={queryGroups}
                        setQueryGroups={setQueryGroups}
                        globalLogic={globalLogic}
                        setGlobalLogic={setGlobalLogic}
                        onSaveQuery={handleSaveQuery}
                        onOpenSuggestions={() => setShowDrawer(true)}
                        activeFilterLabel={activeFilter?.label}
                    />
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

            {/* Sidedrawer for Quick Filters */}
            {showDrawer && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', justifyContent: 'flex-end' }}>
                    <div
                        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
                        onClick={() => setShowDrawer(false)}
                    />
                    <div style={{
                        position: 'relative',
                        width: '420px',
                        height: '100%',
                        background: 'var(--bg-color)',
                        borderLeft: '1px solid var(--border-color)',
                        boxShadow: '-10px 0 50px rgba(0,0,0,0.8)',
                        display: 'flex',
                        flexDirection: 'column',
                        animation: 'drawerSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}>
                        <div style={{ padding: '2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h1 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', color: 'var(--header-text)' }}>Quick Filters</h1>
                                <p className="micro-copy">Jump to curated administrative slices</p>
                            </div>
                            <button className="btn btn-outline" style={{ padding: '0.5rem', borderRadius: '50%', width: '40px', height: '40px' }} onClick={() => setShowDrawer(false)}>
                                <X size={20} />
                            </button>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {allExamples.length > 0 ? (
                                allExamples.map((ex, i) => {
                                    const active = isActive(ex);
                                    return (
                                        <div
                                            key={i}
                                            className="glass-list-item"
                                            style={{
                                                cursor: 'pointer',
                                                border: active ? '2px solid var(--accent-color)' : '1px solid var(--border-color)',
                                                background: active ? 'var(--accent-light)' : ex.isUser ? 'rgba(99, 102, 241, 0.05)' : 'rgba(255, 255, 255, 0.03)',
                                                padding: '1rem 1.25rem',
                                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                borderRadius: '0.75rem',
                                                minHeight: '90px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center'
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!active) e.currentTarget.style.borderColor = 'var(--accent-color)';
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!active) e.currentTarget.style.borderColor = 'var(--border-color)';
                                            }}
                                            onClick={() => applyExample(ex)}
                                        >
                                            <div className="flex-between" style={{ marginBottom: '0.4rem' }}>
                                                <div style={{
                                                    fontWeight: 800,
                                                    fontSize: '0.8rem',
                                                    color: active ? 'var(--accent-color)' : ex.isUser ? 'var(--warning-color)' : 'var(--accent-color)',
                                                    letterSpacing: '0.04rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem'
                                                }}>
                                                    {ex.label.toUpperCase()}
                                                    {active && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--header-text)' }} />}
                                                </div>
                                                {ex.isUser && (
                                                    <Trash2
                                                        size={14}
                                                        style={{ color: 'var(--danger-color)', opacity: 0.6 }}
                                                        onClick={(e) => deleteFilter(ex.id, e)}
                                                    />
                                                )}
                                            </div>
                                            <p style={{ fontSize: '0.72rem', lineHeight: '1.4', color: active ? 'rgba(255,255,255,0.9)' : 'var(--text-muted)', margin: 0 }}>
                                                {ex.description}
                                            </p>
                                        </div>
                                    );
                                })
                            ) : (
                                <div style={{ textAlign: 'center', padding: '4rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--accent-color)' }}>
                                        <Inbox size={32} />
                                    </div>
                                    <h3 style={{ fontSize: '1rem', color: 'var(--header-text)', marginBottom: '0.5rem' }}>No Quick Filters Saved</h3>
                                    <p className="micro-copy">Start building a query and save it to see it appear here as a reusable shortcut.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes drawerSlideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
            `}</style>
        </div>
    );
}
