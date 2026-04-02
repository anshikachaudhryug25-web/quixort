import React from 'react';
import { Mail, Clock, MapPin } from 'lucide-react';

// Team Images
import anand from '../../assets/images/anand.jpeg';
import dheeraj from '../../assets/images/dheeraj.jpeg';
import minha from '../../assets/images/minha.jpeg';
import pooja from '../../assets/images/pooja.jpeg';

export default function OfficeTeam() {
    const team = [
        {
            name: 'Pooja',
            role: 'Director, Student Affairs',
            email: 'pooja@ashoka.edu.in',
            img: pooja,
            available: 'Tue/Thu (14:00 - 16:00)',
            location: 'Admin Block, Room 205'
        },
        {
            name: 'Dheeraj',
            role: 'Dean of Student Affairs',
            email: 'dheeraj@ashoka.edu.in',
            img: dheeraj,
            available: 'Mon–Fri (09:00 - 17:00)',
            location: 'Common Room, Office A'
        },
        {
            name: 'Anand',
            role: 'Team Member',
            email: 'anand@ashoka.edu.in',
            img: anand,
            available: 'Mon/Wed/Fri (10:00 - 12:00)',
            location: 'Admin Block, Room 204'
        },
        {
            name: 'Minha',
            role: 'Team Member',
            email: 'minha@ashoka.edu.in',
            img: minha,
            available: 'Tue/Wed/Fri (11:00 - 13:00)',
            location: 'Student Hub, Desk 4'
        },
    ];

    return (
        <>
            <div className="page-header" style={{ marginBottom: '3rem' }}>
                <h1 className="page-title">The Student Office Team</h1>
                <p className="micro-copy" style={{ fontSize: '1rem', maxWidth: '600px' }}>
                    Institutional leadership and strategic partners dedicated to your growth.
                </p>
            </div>

            <div className="grid-cols-4" style={{ gap: '2rem' }}>
                {team.map(m => (
                    <div key={m.name} className="card" style={{ padding: '0', overflow: 'hidden' }}>
                        <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                            <img
                                src={m.img}
                                alt={m.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>

                        <div style={{ padding: '1.5rem' }}>
                            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--header-text)' }}>{m.name}</h3>
                            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-color)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>{m.role}</p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ background: 'var(--accent-light)', padding: '0.4rem', borderRadius: '0.5rem' }}>
                                        <Mail size={14} color="var(--accent-color)" />
                                    </div>
                                    <span className="micro-copy" style={{ fontWeight: 600 }}>{m.email}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.4rem', borderRadius: '0.5rem' }}>
                                        <Clock size={14} color="var(--success-color)" />
                                    </div>
                                    <span className="micro-copy" style={{ fontSize: '0.7rem', color: 'var(--text-main)' }}>{m.available}</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button className="btn btn-primary" style={{ flex: 1, fontSize: '0.75rem' }}>Office Hours</button>
                                <button className="btn btn-outline" style={{ padding: '0.6rem' }}><Mail size={16} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Fixed Visibility Card */}
            <div className="card" style={{
                marginTop: '4rem',
                background: 'linear-gradient(135deg, var(--accent-color) 0%, #a855f7 100%)',
                padding: '4rem 3rem',
                textAlign: 'center',
                boxShadow: '0 20px 40px rgba(79, 70, 229, 0.2)'
            }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.25rem', color: '#ffffff' }}>Need Institutional Support?</h2>
                <p style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '650px', margin: '0 auto 2.5rem', fontSize: '1rem', lineHeight: 1.7 }}>
                    If you are facing governance challenges or require resource allocation for your society,
                    the Student Office is here to mediate and support your initiatives.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                    <button className="btn" style={{ background: '#ffffff', color: 'var(--accent-color)', fontWeight: 800, padding: '0.8rem 2rem' }}>Formal Grievance Entry</button>
                    <button className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#ffffff', background: 'transparent' }}>Resource Handbook</button>
                </div>
            </div>
        </>
    );
}
