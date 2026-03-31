import React from 'react';
import { Mail, Clock } from 'lucide-react';

export default function OfficeTeam() {
    const team = [
        { name: 'Dr. Anita Joshi', role: 'Dean of Students', email: 'dean.office@campus.edu', img: 'AJ', available: 'Mon/Wed/Fri' },
        { name: 'Prof. Vikram Seth', role: 'Strategic Advisor', email: 'v.seth@campus.edu', img: 'VS', available: 'Tue/Thu' },
        { name: 'Karan Mehra', role: 'Student Wellness Lead', email: 'k.mehra@campus.edu', img: 'KM', available: 'Mon–Fri' },
        { name: 'Sanya Gupta', role: 'Organizational Liaison', email: 's.gupta@campus.edu', img: 'SG', available: 'Tue/Thu' },
    ];

    return (
        <>
            <div className="page-header">
                <h1 className="page-title">The Student Office Team</h1>
                <p>Strategic partners in your academic and organizational journey. Book office hours or reach out directly.</p>
            </div>

            <div className="grid-cols-4">
                {team.map(m => (
                    <div key={m.name} className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
                        <div className="avatar" style={{ width: '5rem', height: '5rem', fontSize: '1.5rem', margin: '0 auto 1.5rem' }}>{m.img}</div>
                        <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>{m.name}</h3>
                        <p className="micro-copy font-bold" style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>{m.role}</p>
                        <div style={{ margin: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <Mail size={14} color="var(--text-muted)" />
                                <span className="micro-copy">{m.email}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <Clock size={14} color="var(--success-color)" />
                                <span className="micro-copy" style={{ color: 'var(--success-color)' }}>Available: {m.available}</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <button className="btn btn-primary" style={{ width: '100%', fontSize: '0.8rem' }}>Book Office Hours</button>
                            <button className="btn btn-outline" style={{ width: '100%', fontSize: '0.8rem' }}>Direct Message</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
