import React, { useState } from 'react';
import { User, Save, CheckCircle } from 'lucide-react';

export default function StudentProfile() {
    const [profile, setProfile] = useState({
        name: 'Ibrahim Khalil',
        batch: 'UG25',
        major: 'Computer Science',
        minor: 'Philosophy',
        gender: 'He/Him',
        interests: ['Public Speaking', 'System Design', 'Ethical AI', 'Debating'],
        bio: 'Passionate about the intersection of technology and human governance. Currently exploring institutional structures and collective intelligence.',
        email: 'ibrahim.khalil@university.edu'
    });

    const [saved, setSaved] = useState(false);
    const [newInterest, setNewInterest] = useState('');

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const addInterest = (e) => {
        if (e.key === 'Enter' && newInterest.trim()) {
            setProfile(prev => ({ ...prev, interests: [...new Set([...prev.interests, newInterest.trim()])] }));
            setNewInterest('');
        }
    };

    const removeInterest = (interest) => {
        setProfile(prev => ({ ...prev, interests: prev.interests.filter(i => i !== interest) }));
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="page-header flex-between">
                <div>
                    <h1 className="page-title">My Profile</h1>
                    <p>Update your personal and academic information.</p>
                </div>
                <button
                    className={`btn ${saved ? 'btn-success' : 'btn-primary'}`}
                    onClick={handleSave}
                    style={{ transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    {saved ? <CheckCircle size={18} /> : <Save size={18} />}
                    {saved ? 'Profile Saved' : 'Save Changes'}
                </button>
            </div>

            <div className="grid-cols-2" style={{ gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Basic Info */}
                    <div className="card">
                        <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                            <User size={18} color="var(--accent-color)" /> Personal Details
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div className="form-group">
                                <label className="micro-copy font-bold mb-2 block">Full Name</label>
                                <input
                                    className="filter-input"
                                    value={profile.name}
                                    onChange={e => setProfile({ ...profile, name: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem' }}
                                />
                            </div>

                            <div className="grid-cols-2" style={{ gap: '1rem' }}>
                                <div className="form-group">
                                    <label className="micro-copy font-bold mb-2 block">Batch</label>
                                    <select
                                        className="filter-input"
                                        value={profile.batch}
                                        onChange={e => setProfile({ ...profile, batch: e.target.value })}
                                        style={{ width: '100%', padding: '0.75rem' }}
                                    >
                                        <option>UG23</option>
                                        <option>UG24</option>
                                        <option>UG25</option>
                                        <option>ASP26</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="micro-copy font-bold mb-2 block">Gender/Pronouns</label>
                                    <select
                                        className="filter-input"
                                        value={profile.gender}
                                        onChange={e => setProfile({ ...profile, gender: e.target.value })}
                                        style={{ width: '100%', padding: '0.75rem' }}
                                    >
                                        <option>He/Him</option>
                                        <option>She/Her</option>
                                        <option>They/Them</option>
                                        <option>Prefer not to say</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="micro-copy font-bold mb-2 block">Email</label>
                                <input
                                    className="filter-input"
                                    value={profile.email}
                                    disabled
                                    style={{ width: '100%', padding: '0.75rem', opacity: 0.6, cursor: 'not-allowed' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Education */}
                    <div className="card">
                        <div className="card-title" style={{ marginBottom: '1.5rem' }}>Education</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div className="form-group">
                                <label className="micro-copy font-bold mb-2 block">Major</label>
                                <select
                                    className="filter-input"
                                    value={profile.major}
                                    onChange={e => setProfile({ ...profile, major: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem' }}
                                >
                                    <option>Computer Science</option>
                                    <option>Economics</option>
                                    <option>Philosophy</option>
                                    <option>Psychology</option>
                                    <option>Biology</option>
                                    <option>English Literature</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="micro-copy font-bold mb-2 block">Minor</label>
                                <input
                                    className="filter-input"
                                    value={profile.minor}
                                    onChange={e => setProfile({ ...profile, minor: e.target.value })}
                                    placeholder="e.g. Media Studies"
                                    style={{ width: '100%', padding: '0.75rem' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Interests & Bio */}
                    <div className="card" style={{ flex: 1 }}>
                        <div className="card-title" style={{ marginBottom: '1.5rem' }}>Interests</div>
                        <p className="micro-copy mb-4">Add tags that describe your interests and skills to help with club recommendations.</p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                            {profile.interests.map(interest => (
                                <div key={interest} className="badge accent" style={{
                                    padding: '0.4rem 0.75rem',
                                    fontSize: '0.75rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    borderRadius: '99px'
                                }}>
                                    {interest}
                                    <span
                                        style={{ cursor: 'pointer', fontWeight: 800, fontSize: '1rem', lineHeight: 1 }}
                                        onClick={() => removeInterest(interest)}
                                    >&times;</span>
                                </div>
                            ))}
                        </div>

                        <input
                            className="filter-input"
                            placeholder="Add interest tag + Enter..."
                            value={newInterest}
                            onChange={e => setNewInterest(e.target.value)}
                            onKeyDown={addInterest}
                            style={{ width: '100%', padding: '0.75rem', marginBottom: '2rem' }}
                        />

                        <div className="form-group">
                            <label className="micro-copy font-bold mb-2 block">About Me</label>
                            <textarea
                                className="filter-input"
                                value={profile.bio}
                                onChange={e => setProfile({ ...profile, bio: e.target.value })}
                                style={{ width: '100%', minHeight: '150px', padding: '0.75rem', lineHeight: '1.6' }}
                                placeholder="Tell us more about yourself..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
