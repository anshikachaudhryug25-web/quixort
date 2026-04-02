import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Info } from 'lucide-react';

export default function MetricTooltip({ formula }) {
    const [pos, setPos] = useState(null);
    const ref = useRef(null);

    const handleEnter = () => {
        if (ref.current) {
            const r = ref.current.getBoundingClientRect();
            // Clamp so it doesn't overflow right edge
            const left = Math.min(r.left - 90, window.innerWidth - 320);
            setPos({ top: r.bottom + 8, left: Math.max(8, left) });
        }
    };

    const tooltip = pos ? ReactDOM.createPortal(
        <div style={{
            position: 'fixed',
            top: pos.top,
            left: pos.left,
            background: 'var(--sidebar-bg)',
            backdropFilter: 'blur(16px)',
            border: '1px solid var(--accent-light)',
            borderRadius: '0.75rem',
            padding: '0.85rem 1.15rem',
            fontSize: '0.71rem',
            color: 'var(--text-main)',
            whiteSpace: 'pre-line',
            zIndex: 2147483647,
            lineHeight: 1.65,
            minWidth: '220px',
            maxWidth: '300px',
            boxShadow: 'var(--shadow-lg)',
            pointerEvents: 'none',
        }}>
            <div style={{ fontWeight: 800, color: 'var(--accent-color)', marginBottom: '0.35rem', fontSize: '0.65rem', letterSpacing: '0.08em' }}>HOW IT'S CALCULATED</div>
            {formula}
        </div>,
        document.body
    ) : null;

    return (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span
                ref={ref}
                onMouseEnter={handleEnter}
                onMouseLeave={() => setPos(null)}
                style={{ cursor: 'help', marginLeft: '0.4rem', color: 'var(--text-muted)', lineHeight: 1, display: 'inline-flex' }}
            >
                <Info size={12} />
            </span>
            {tooltip}
        </span>
    );
}
