export const MOCK_CLUBS = [
    {
        id: 1, name: 'Orators', type: 'Society', category: 'Debating', founded: 2012,
        members_count: 120, leadership_count: 12,
        applications_2024: 150, rejections_2024: 120, acceptance_rate: 20,
        budget_total: 15000, budget_used: 4200, budget_days_elapsed: 28, status: 'Active',
        description: 'Premier debaters and public speaking society on campus.',
        leadership_ids: [2, 3, 5, 7],
        member_ids: [2, 3, 5, 7],
        member_majors: { Humanities: 45, Sciences: 25, Engineering: 15, Arts: 15 },
    },
    {
        id: 2, name: 'Jazbaa', type: 'Society', category: 'Theatre', founded: 2010,
        members_count: 85, leadership_count: 8,
        applications_2024: 180, rejections_2024: 150, acceptance_rate: 16,
        budget_total: 15000, budget_used: 10800, budget_days_elapsed: 18, status: 'Active',
        description: 'The street play and dramatics society focusing on social issues.',
        leadership_ids: [3, 5, 7],
        member_ids: [3, 7],
        member_majors: { Arts: 55, Humanities: 30, Sciences: 15 },
    },
    {
        id: 3, name: 'Tech Soc', type: 'Club', category: 'Technology', founded: 2021,
        members_count: 210, leadership_count: 15,
        applications_2024: 300, rejections_2024: 250, acceptance_rate: 17,
        budget_total: 15000, budget_used: 10800, budget_days_elapsed: 18, status: 'Active',
        description: 'Coding, robotics, and innovation hub.',
        leadership_ids: [2, 3, 8],
        member_ids: [2, 3, 8],
        member_majors: { Engineering: 60, Sciences: 25, Mathematics: 15 },
    },
    {
        id: 4, name: 'Music Soc', type: 'Club', category: 'Arts', founded: 2015,
        members_count: 60, leadership_count: 6,
        applications_2024: 120, rejections_2024: 90, acceptance_rate: 25,
        budget_total: 12000, budget_used: 3600, budget_days_elapsed: 30, status: 'Pending',
        leadership_ids: [3, 4],
        member_ids: [3, 4],
        member_majors: { Arts: 70, Humanities: 20, Sciences: 10 },
    },
    {
        id: 5, name: 'Photography', type: 'Club', category: 'Arts', founded: 2018,
        members_count: 150, leadership_count: 10,
        applications_2024: 200, rejections_2024: 160, acceptance_rate: 20,
        budget_total: 10000, budget_used: 2500, budget_days_elapsed: 30, status: 'Active',
        leadership_ids: [5, 7],
        member_ids: [5, 7],
        member_majors: { Arts: 40, Design: 35, Humanities: 25 },
    },
    {
        id: 6, name: 'Eco Club', type: 'Group', category: 'Environment', founded: 2019,
        members_count: 45, leadership_count: 4,
        applications_2024: 80, rejections_2024: 50, acceptance_rate: 37,
        budget_total: 8000, budget_used: 1200, budget_days_elapsed: 30, status: 'Active',
        leadership_ids: [4],
        member_ids: [4],
        member_majors: { Sciences: 45, Environment: 35, Humanities: 20 },
    },
];

export const MOCK_REIMBURSEMENTS = [
    { id: 1, club: 'Tech Soc', amount: 12400, category: 'Logistics', date: 'Sept 15', status: 'Approved', description: 'Components for Hackathon 24', days_pending: 0 },
    { id: 2, club: 'Jazbaa', amount: 3500, category: 'Production', date: 'Sept 18', status: 'Review', description: 'Costumes for street play', days_pending: 5 },
    { id: 3, club: 'Photography', amount: 1200, category: 'Travel', date: 'Sept 20', status: 'Pending', description: 'Local travel for photo-walk', days_pending: 3 },
];

export const MOCK_STUDENTS = [
    {
        id: 1, name: 'Ibrahim Khalil', email: 'ibrahim@campus.edu', batch: '2025', major: 'Philosophy', minor: 'Sociology',
        gender: 'He/Him',
        applied_to: ['Orators', 'Tech Soc', 'Jazbaa', 'Music Soc', 'Photography', 'Eco Club', 'Debate Club', 'Drama Soc'],
        accepted_at: [], rejected_by: ['Orators', 'Tech Soc', 'Jazbaa', 'Music Soc', 'Photography', 'Eco Club', 'Debate Club', 'Drama Soc'],
        joined: [], leadership_roles: [],
        applications: 8, rejections_count: 8, acceptance_rate: 0, status: 'Isolation Risk', participation_score: 12,
        grievances_filed: 1, days_since_last_activity: 32
    },
    {
        id: 2, name: 'Anshika C.', email: 'anshika@campus.edu', batch: '2025', major: 'Computer Science', minor: null,
        gender: 'She/Her',
        applied_to: ['Orators', 'Tech Soc'],
        accepted_at: ['Orators', 'Tech Soc'], rejected_by: [], joined: ['Orators', 'Tech Soc'],
        leadership_roles: ['Orators', 'Tech Soc'],
        applications: 4, rejections_count: 2, acceptance_rate: 50, status: 'Balanced', participation_score: 85,
        grievances_filed: 0, days_since_last_activity: 2
    },
    {
        id: 3, name: 'Rahul S.', email: 'rahul@campus.edu', batch: '2023', major: 'Economics', minor: 'Political Science',
        gender: 'He/Him',
        applied_to: ['Music Soc', 'Tech Soc', 'Orators'],
        accepted_at: ['Music Soc', 'Tech Soc', 'Orators'], rejected_by: [], joined: ['Music Soc', 'Tech Soc', 'Orators'],
        leadership_roles: ['Orators', 'Tech Soc', 'Jazbaa', 'Music Soc'],
        applications: 7, rejections_count: 0, acceptance_rate: 100, status: 'Overloaded', participation_score: 98,
        grievances_filed: 0, days_since_last_activity: 1
    },
    {
        id: 4, name: 'Priya K.', email: 'priya@campus.edu', batch: '2024', major: 'Psychology', minor: 'Creative Writing',
        gender: 'She/Her',
        applied_to: ['Eco Club', 'Orators', 'Jazbaa', 'Music Soc', 'Photography', 'Tech Soc', 'Drama Soc', 'Debate Club', 'Art Soc', 'Film Soc'],
        accepted_at: ['Eco Club'], rejected_by: ['Orators', 'Jazbaa', 'Music Soc', 'Photography', 'Tech Soc', 'Drama Soc', 'Debate Club', 'Art Soc', 'Film Soc'],
        joined: ['Eco Club'], leadership_roles: [],
        applications: 10, rejections_count: 9, acceptance_rate: 10, status: 'At Risk', participation_score: 45,
        grievances_filed: 1, days_since_last_activity: 14
    },
    {
        id: 5, name: 'Aman V.', email: 'aman@campus.edu', batch: '2023', major: 'Political Science', minor: null,
        gender: 'They/Them',
        applied_to: ['Orators', 'Photography'],
        accepted_at: ['Orators', 'Photography'], rejected_by: [], joined: ['Orators', 'Photography'],
        leadership_roles: ['Orators', 'Jazbaa', 'Photography'],
        applications: 3, rejections_count: 0, acceptance_rate: 100, status: 'Healthy', participation_score: 92,
        grievances_filed: 0, days_since_last_activity: 3
    },
    {
        id: 6, name: 'Arjun P.', email: 'arjun@campus.edu', batch: '2025', major: 'Engineering', minor: 'Data Science',
        gender: 'He/Him',
        applied_to: ['Tech Soc'],
        accepted_at: [], rejected_by: ['Tech Soc'], joined: [],
        leadership_roles: [],
        applications: 2, rejections_count: 2, acceptance_rate: 0, status: 'Isolation Risk', participation_score: 5,
        grievances_filed: 0, days_since_last_activity: 20
    },
    {
        id: 7, name: 'Sanya R.', email: 'sanya@campus.edu', batch: '2024', major: 'Sociology', minor: 'Gender Studies',
        gender: 'She/They',
        applied_to: ['Jazbaa', 'Photography'],
        accepted_at: ['Jazbaa', 'Photography'], rejected_by: [], joined: ['Jazbaa', 'Photography'],
        leadership_roles: ['Orators', 'Jazbaa', 'Photography'],
        applications: 3, rejections_count: 1, acceptance_rate: 66, status: 'Healthy', participation_score: 74,
        grievances_filed: 0, days_since_last_activity: 5
    },
    {
        id: 8, name: 'Kabir D.', email: 'kabir@campus.edu', batch: '2025', major: 'Design', minor: null,
        gender: 'He/Him',
        applied_to: ['Art Society'],
        accepted_at: ['Art Society'], rejected_by: [], joined: ['Art Society'],
        leadership_roles: ['Tech Soc'],
        applications: 3, rejections_count: 2, acceptance_rate: 33, status: 'Balanced', participation_score: 58,
        grievances_filed: 0, days_since_last_activity: 8
    },
];

export const MOCK_GRIEVANCES = [
    {
        id: 1, studentId: 1, studentName: 'Ibrahim Khalil', type: 'High Priority', category: 'Selection Governance',
        date: 'Sept 5', targetClub: 'Orators',
        text: 'I applied to Orators three times. Each time, the shortlisted candidates were close friends of existing core members. The criteria was never shared publicly.',
        aiAnalysis: '65% overlap between Orators and Jazbaa leadership confirms a closed selection network. Pattern matches 3 prior cycles.',
        status: 'Formal Review Triggered'
    },
    {
        id: 2, studentId: 4, studentName: 'Priya K.', type: 'Medium Priority', category: 'Student Engagement',
        date: 'Sept 8', targetClub: 'Tech Soc',
        text: 'I applied to Tech Soc twice. Both times rejected without any feedback. I come from a non-engineering background and feel there is an unstated prerequisite.',
        aiAnalysis: '83% of Tech Soc accepts are Engineering/CS students. Non-STEM acceptance rate is 4%. Structural bias detected.',
        status: 'Intervention Recommended'
    },
];

export const MOCK_EVENTS = [
    { id: 1, title: 'Freshman Welcome Mixer', date: 12, cat: 'Social', status: 'Confirmed', rating: 4.8, expected_attendance: 200 },
    { id: 2, title: 'Debate Championship', date: 15, cat: 'Academic', status: 'Confirmed', rating: 3.2, expected_attendance: 80 },
    { id: 3, title: 'Innovation Hackathon', date: 20, cat: 'Technology', status: 'Confirmed', rating: 4.9, expected_attendance: 150 },
    { id: 4, title: 'Society Induction', date: 15, cat: 'Administrative', status: 'Flagged', rating: 0, expected_attendance: 300 },
];

export const OVERLAP_DATA = [
    { pair: ['Orators', 'Jazbaa'], leadership_overlap: 75, member_overlap: 18, status: 'Flagged', risk: 'Institutional Capture' },
    { pair: ['Tech Soc', 'Orators'], leadership_overlap: 33, member_overlap: 14, status: 'Review', risk: 'Leadership Overlap' },
    { pair: ['Music Soc', 'Jazbaa'], leadership_overlap: 12, member_overlap: 5, status: 'Safe', risk: 'Minimal Concentration' },
];
