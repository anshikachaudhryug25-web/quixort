export const MOCK_CLUBS = [
    {
        id: 1, name: 'Orators', type: 'Society', category: 'Debating', founded: 2012, members_count: 120, leadership_count: 12,
        applications_2024: 150, rejections_2024: 120, acceptance_rate: 20, funding: '₹15,000', status: 'Active',
        description: 'Premier debaters and public speaking society on campus.',
    },
    {
        id: 2, name: 'Jazbaa', type: 'Society', category: 'Theatre', founded: 2010, members_count: 85, leadership_count: 8,
        applications_2024: 180, rejections_2024: 150, acceptance_rate: 16, funding: '₹15,000', status: 'Active',
        description: 'The street play and dramatics society focusing on social issues.',
    },
    {
        id: 3, name: 'Tech Soc', type: 'Club', category: 'Technology', founded: 2021, members_count: 210, leadership_count: 15,
        applications_2024: 300, rejections_2024: 250, acceptance_rate: 17, funding: '₹15,000', status: 'Active',
        description: 'Coding, robotics, and innovation hub.',
    },
    {
        id: 4, name: 'Music Soc', type: 'Club', category: 'Arts', founded: 2015, members_count: 60, leadership_count: 6,
        applications_2024: 120, rejections_2024: 90, acceptance_rate: 25, funding: '₹12,000', status: 'Pending'
    },
    {
        id: 5, name: 'Photography', type: 'Club', category: 'Arts', founded: 2018, members_count: 150, leadership_count: 10,
        applications_2024: 200, rejections_2024: 160, acceptance_rate: 20, funding: '₹10,000', status: 'Active'
    },
    {
        id: 6, name: 'Eco Club', type: 'Group', category: 'Environment', founded: 2019, members_count: 45, leadership_count: 4,
        applications_2024: 80, rejections_2024: 50, acceptance_rate: 37, funding: '₹8,000', status: 'Active'
    },
];

export const MOCK_REIMBURSEMENTS = [
    { id: 1, club: 'Tech Soc', amount: '₹12,400', category: 'Logistics', date: 'Sept 15', status: 'Approved', description: 'Components for Hackathon 24' },
    { id: 2, club: 'Jazbaa', amount: '₹3,500', category: 'Production', date: 'Sept 18', status: 'Review', description: 'Costumes for street play' },
    { id: 3, club: 'Photography', amount: '₹1,200', category: 'Travel', date: 'Sept 20', status: 'Pending', description: 'Local travel for photo-walk' },
];

export const MOCK_STUDENTS = [
    {
        id: 1, name: 'Ibrahim Khalil', email: 'ibrahim@campus.edu', batch: '2025', major: 'Philosophy',
        gender: 'He/Him', applied_to: ['Orators', 'Tech Soc', 'Jazbaa'],
        accepted_at: [], rejected_by: ['Orators', 'Tech Soc', 'Jazbaa'], joined: [],
        applications: 8, rejections_count: 8, acceptance_rate: 0, status: 'Isolation Risk', participation_score: 12
    },
    {
        id: 2, name: 'Anshika C.', email: 'anshika@campus.edu', batch: '2025', major: 'Computer Science',
        gender: 'She/Her', applied_to: ['Orators', 'Tech Soc'],
        accepted_at: ['Orators', 'Tech Soc'], rejected_by: [], joined: ['Orators', 'Tech Soc'],
        applications: 4, rejections_count: 2, acceptance_rate: 50, status: 'Balanced', participation_score: 85
    },
    {
        id: 3, name: 'Rahul S.', email: 'rahul@campus.edu', batch: '2023', major: 'Economics',
        gender: 'He/Him', applied_to: ['Music Soc', 'Tech Soc', 'Orators'],
        accepted_at: ['Music Soc', 'Tech Soc', 'Orators'], rejected_by: [], joined: ['Music Soc', 'Tech Soc', 'Orators'],
        applications: 7, rejections_count: 0, acceptance_rate: 100, status: 'Overloaded', participation_score: 98
    },
    {
        id: 4, name: 'Priya K.', email: 'priya@campus.edu', batch: '2024', major: 'Psychology',
        gender: 'She/Her', applied_to: ['Eco Club', 'Orators'],
        accepted_at: ['Eco Club'], rejected_by: ['Orators'], joined: ['Eco Club'],
        applications: 10, rejections_count: 9, acceptance_rate: 10, status: 'At Risk', participation_score: 45
    },
    {
        id: 5, name: 'Aman V.', email: 'aman@campus.edu', batch: '2023', major: 'Political Science',
        gender: 'They/Them', applied_to: ['Orators', 'Photography'],
        accepted_at: ['Orators', 'Photography'], rejected_by: [], joined: ['Orators', 'Photography'],
        applications: 3, rejections_count: 0, acceptance_rate: 100, status: 'Healthy', participation_score: 92
    },
    {
        id: 6, name: 'Arjun P.', email: 'arjun@campus.edu', batch: '2025', major: 'Engineering',
        gender: 'He/Him', applied_to: ['Tech Soc'],
        accepted_at: [], rejected_by: ['Tech Soc'], joined: [],
        applications: 2, rejections_count: 2, acceptance_rate: 0, status: 'Isolation Risk', participation_score: 5
    },
    {
        id: 7, name: 'Sanya R.', email: 'sanya@campus.edu', batch: '2024', major: 'Sociology',
        gender: 'She/They', applied_to: ['Jazbaa', 'Photography'],
        accepted_at: ['Jazbaa', 'Photography'], rejected_by: [], joined: ['Jazbaa', 'Photography'],
        applications: 3, rejections_count: 1, acceptance_rate: 66, status: 'Healthy', participation_score: 74
    },
    {
        id: 8, name: 'Kabir D.', email: 'kabir@campus.edu', batch: '2025', major: 'Design',
        gender: 'He/Him', applied_to: ['Art Society'],
        accepted_at: ['Art Society'], rejected_by: [], joined: ['Art Society'],
        applications: 3, rejections_count: 2, acceptance_rate: 33, status: 'Balanced', participation_score: 58
    }
];

export const MOCK_GRIEVANCES = [
    {
        id: 1, studentId: 1, studentName: 'Ibrahim Khalil', type: 'High Priority', category: 'Selection Governance',
        date: 'Sept 5', text: 'I feel the selection process for Orators and Tech Soc was non-transparent. High overlap with existing Jazbaa core members detected.',
        aiAnalysis: 'Pattern validation: 60% overlap in selection outcome with Jazbaa leadership.',
        status: 'Formal Review Triggered'
    },
    {
        id: 2, studentId: 9, studentName: 'Arjun P.', type: 'Medium Priority', category: 'Student Engagement',
        date: 'Sept 8', text: 'Barriers to entry for freshmen are increasing. Repeated rejections from multiple societies.',
        aiAnalysis: 'System detected increasing social isolation metrics in freshman cohort.',
        status: 'Intervention Recommended'
    }
];

export const MOCK_EVENTS = [
    { id: 1, title: 'Freshman Welcome Mixer', date: 12, cat: 'Social', status: 'Confirmed', rating: 4.8 },
    { id: 2, title: 'Debate Championship', date: 15, cat: 'Academic', status: 'Confirmed', rating: 3.2 },
    { id: 3, title: 'Innovation Hackathon', date: 20, cat: 'Technology', status: 'Confirmed', rating: 4.9 },
    { id: 4, title: 'Society Induction', date: 15, cat: 'Administrative', status: 'Flagged', rating: 0 },
];

export const OVERLAP_DATA = [
    { pair: ['Orators', 'Jazbaa'], overlap: 65, status: 'Flagged', risk: 'Institutional Capture' },
    { pair: ['Tech Soc', 'Orators'], overlap: 42, status: 'Review', risk: 'Leadership Overlap' },
    { pair: ['Music Soc', 'Jazbaa'], overlap: 20, status: 'Safe', risk: 'Minimal Concentration' },
];
