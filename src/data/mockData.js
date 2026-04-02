// High-Fidelity Institutional Data Source
// Expanded Dataset for Advanced Analytics & UI Demonstrations

export const MOCK_STUDENTS = [
    {
        id: 1, name: 'Ibrahim Khalil', email: 'ibrahim.khalil@ashoka.edu.in', batch: '2025', major: 'Economics', minor: 'Computer Science',
        gender: 'He/Him', applied_to: ['Orators', 'Ministry of Tech'], accepted_at: ['Music Soc'], rejected_by: ['Jazbaa'], joined: [4],
        leadership_roles: ['Tech Lead, Music Soc'], applications: 3, rejections_count: 1, acceptance_rate: 33, status: 'Active',
        participation_score: 85, grievances_filed: 1, days_since_last_activity: 2
    },
    {
        id: 2, name: 'Anshika C.', email: 'anshika.c@ashoka.edu.in', batch: '2024', major: 'Psychology', minor: 'Philosophy',
        gender: 'She/Her', applied_to: ['Jazbaa', 'Orators'], accepted_at: ['Jazbaa', 'Orators'], rejected_by: [], joined: [1, 2],
        leadership_roles: ['President, Jazbaa', 'Secretary, Orators'], applications: 2, rejections_count: 0, acceptance_rate: 100, status: 'High Engagement',
        participation_score: 98, grievances_filed: 0, days_since_last_activity: 1
    },
    {
        id: 3, name: 'Rahul Sharma', email: 'rahul.sharma@ashoka.edu.in', batch: '2023', major: 'History', minor: 'Sociology',
        gender: 'He/Him', applied_to: ['Ministry of Tech'], accepted_at: [], rejected_by: ['Ministry of Tech'], joined: [],
        leadership_roles: [], applications: 1, rejections_count: 1, acceptance_rate: 0, status: 'Isolation Risk',
        participation_score: 12, grievances_filed: 0, days_since_last_activity: 45
    },
    {
        id: 4, name: 'Priya K.', email: 'priya.k@ashoka.edu.in', batch: '2025', major: 'Computer Science', minor: 'Mathematics',
        gender: 'She/Her', applied_to: ['Ministry of Tech', 'Orators'], accepted_at: ['Ministry of Tech'], rejected_by: ['Orators'], joined: [3],
        leadership_roles: ['Core Member, Ministry of Tech'], applications: 2, rejections_count: 1, acceptance_rate: 50, status: 'Active',
        participation_score: 72, grievances_filed: 1, days_since_last_activity: 5
    },
    {
        id: 5, name: 'Aman V.', email: 'aman.v@ashoka.edu.in', batch: '2023', major: 'Economics', minor: 'Business',
        gender: 'He/Him', applied_to: ['Music Soc'], accepted_at: ['Music Soc', 'Jazbaa', 'Orators'], rejected_by: [], joined: [4, 2, 1],
        leadership_roles: ['CFO, Music Soc', 'Core, Jazbaa', 'Member, Orators'], applications: 3, rejections_count: 0, acceptance_rate: 100, status: 'Overloaded',
        participation_score: 89, grievances_filed: 0, days_since_last_activity: 2
    },
    {
        id: 6, name: 'Sumant S.', email: 'sumant.s@ashoka.edu.in', batch: '2026', major: 'Biology', minor: 'Chemistry',
        gender: 'He/Him', applied_to: ['Ministry of Tech', 'Orators', 'Jazbaa'], accepted_at: [], rejected_by: ['Ministry of Tech', 'Orators', 'Jazbaa'], joined: [],
        leadership_roles: [], applications: 3, rejections_count: 3, acceptance_rate: 0, status: 'Isolation Risk',
        participation_score: 0, grievances_filed: 0, days_since_last_activity: 30
    },
    {
        id: 7, name: 'Sanya R.', email: 'sanya.r@ashoka.edu.in', batch: '2025', major: 'English', minor: 'Creative Writing',
        gender: 'She/Her', applied_to: ['Orators', 'Jazbaa'], accepted_at: ['Orators', 'Jazbaa'], rejected_by: [], joined: [1, 2],
        leadership_roles: ['Lead, Orators', 'Treasurer, Jazbaa'], applications: 2, rejections_count: 0, acceptance_rate: 100, status: 'Healthy',
        participation_score: 88, grievances_filed: 0, days_since_last_activity: 3
    },
    {
        id: 8, name: 'Karan Mehra', email: 'karan.mehra@ashoka.edu.in', batch: '2024', major: 'Sociology', minor: 'Visual Arts',
        gender: 'He/Him', applied_to: ['Jazbaa'], accepted_at: ['Jazbaa'], rejected_by: [], joined: [2],
        leadership_roles: ['Logistics Lead, Jazbaa'], applications: 1, rejections_count: 0, acceptance_rate: 100, status: 'Active',
        participation_score: 78, grievances_filed: 0, days_since_last_activity: 7
    },
    {
        id: 9, name: 'Mehak L.', email: 'mehak.l@ashoka.edu.in', batch: '2025', major: 'Politics', minor: 'IR',
        gender: 'She/Her', applied_to: ['Orators'], accepted_at: ['Orators'], rejected_by: [], joined: [1],
        leadership_roles: [], applications: 1, rejections_count: 0, acceptance_rate: 100, status: 'Active',
        participation_score: 65, grievances_filed: 0, days_since_last_activity: 12
    },
    {
        id: 10, name: 'Vikram Seth', email: 'vikram.seth@ashoka.edu.in', batch: '2023', major: 'Physics', minor: 'Mathematics',
        gender: 'He/Him', applied_to: ['Ministry of Tech'], accepted_at: ['Ministry of Tech'], rejected_by: [], joined: [3],
        leadership_roles: ['President, Ministry of Tech'], applications: 1, rejections_count: 0, acceptance_rate: 100, status: 'High Engagement',
        participation_score: 95, grievances_filed: 0, days_since_last_activity: 1
    },
    {
        id: 11, name: 'Arjun V.', email: 'arjun.v@ashoka.edu.in', batch: '2026', major: 'Economics', minor: 'None',
        gender: 'He/Him', applied_to: ['DebSoc', 'Ministry of Finance'], accepted_at: ['Ministry of Finance'], rejected_by: ['DebSoc'], joined: [6],
        leadership_roles: [], applications: 2, rejections_count: 1, acceptance_rate: 50, status: 'Active',
        participation_score: 45, grievances_filed: 0, days_since_last_activity: 4
    },
    {
        id: 12, name: 'Riya M.', email: 'riya.m@ashoka.edu.in', batch: '2025', major: 'Interdisciplinary', minor: 'Arts',
        gender: 'She/Her', applied_to: ['Art Soc', 'Music Soc'], accepted_at: ['Art Soc', 'Music Soc'], rejected_by: [], joined: [7, 4],
        leadership_roles: ['Lead, Art Soc'], applications: 2, rejections_count: 0, acceptance_rate: 100, status: 'Active',
        participation_score: 82, grievances_filed: 0, days_since_last_activity: 6
    },
    {
        id: 13, name: 'Kabir B.', email: 'kabir.b@ashoka.edu.in', batch: '2024', major: 'History', minor: 'IR',
        gender: 'He/Him', applied_to: ['Environment Soc'], accepted_at: ['Environment Soc'], rejected_by: [], joined: [5],
        leadership_roles: ['Secretary, Environment Soc'], applications: 1, rejections_count: 0, acceptance_rate: 100, status: 'Active',
        participation_score: 74, grievances_filed: 0, days_since_last_activity: 8
    },
    {
        id: 14, name: 'Zoya S.', email: 'zoya.s@ashoka.edu.in', batch: '2025', major: 'Biology', minor: 'Chemistry',
        gender: 'She/Her', applied_to: ['Science Soc', 'Ministry of Tech'], accepted_at: ['Science Soc'], rejected_by: ['Ministry of Tech'], joined: [8],
        leadership_roles: [], applications: 2, rejections_count: 1, acceptance_rate: 50, status: 'Active',
        participation_score: 58, grievances_filed: 0, days_since_last_activity: 10
    },
    {
        id: 15, name: 'Tanmay G.', email: 'tanmay.g@ashoka.edu.in', batch: '2026', major: 'Economics', minor: 'Business',
        gender: 'He/Him', applied_to: ['Ministry of Finance', 'DebSoc'], accepted_at: [], rejected_by: ['Ministry of Finance', 'DebSoc'], joined: [],
        leadership_roles: [], applications: 2, rejections_count: 2, acceptance_rate: 0, status: 'Isolation Risk',
        participation_score: 5, grievances_filed: 0, days_since_last_activity: 25
    },
    {
        id: 16, name: 'Isha P.', email: 'isha.p@ashoka.edu.in', batch: '2024', major: 'Philosophy', minor: 'Politics',
        gender: 'She/Her', applied_to: ['DebSoc'], accepted_at: ['DebSoc'], rejected_by: [], joined: [1],
        leadership_roles: ['Core, Orators'], applications: 1, rejections_count: 0, acceptance_rate: 100, status: 'Active',
        participation_score: 91, grievances_filed: 0, days_since_last_activity: 2
    },
    {
        id: 17, name: 'Rohan K.', email: 'rohan.k@ashoka.edu.in', batch: '2025', major: 'Computer Science', minor: 'None',
        gender: 'He/Him', applied_to: ['Ministry of Tech'], accepted_at: ['Ministry of Tech'], rejected_by: [], joined: [3],
        leadership_roles: [], applications: 1, rejections_count: 0, acceptance_rate: 100, status: 'Active',
        participation_score: 61, grievances_filed: 0, days_since_last_activity: 15
    },
    {
        id: 18, name: 'Myra L.', email: 'myra.l@ashoka.edu.in', batch: '2026', major: 'Psychology', minor: 'None',
        gender: 'She/Her', applied_to: ['Music Soc'], accepted_at: ['Music Soc'], rejected_by: [], joined: [4],
        leadership_roles: [], applications: 1, rejections_count: 0, acceptance_rate: 100, status: 'Active',
        participation_score: 52, grievances_filed: 0, days_since_last_activity: 20
    }
];

export const MOCK_CLUBS = [
    {
        id: 1, name: 'Orators', category: 'Debating', lead: 'Sanya R.', established: '2016',
        budget_total: 15000, budget_used: 12000, grievances_count: 1,
        recruitment_status: 'Ongoing',
        members_count: 45, applicants_count: 120, acceptance_rate: 37,
        leadership_ids: [7, 2, 5, 16], member_ids: [7, 2, 5, 16, 9, 22, 25, 28, 30],
        avg_engagement: 8.4, diversity_score: 92, governance_rating: 4.5,
        spending_trend: [2000, 4500, 8000, 12000], ai_insight: 'Burn rate exceeds 80% with 40 days remaining. Budget reallocation suggested for inter-college event.'
    },
    {
        id: 2, name: 'Jazbaa', category: 'Theatre', lead: 'Anshika C.', established: '2018',
        budget_total: 15000, budget_used: 11000, grievances_count: 0,
        recruitment_status: 'Ongoing',
        members_count: 32, applicants_count: 85, acceptance_rate: 38,
        leadership_ids: [2, 5, 7, 8], member_ids: [2, 5, 7, 8, 35, 36, 37, 38],
        avg_engagement: 9.6, diversity_score: 88, governance_rating: 3.2,
        spending_trend: [1000, 3000, 7000, 11000], ai_insight: 'Heavy set-design expenditure detected in early cycle. Recruitment efficiency is above 95%.'
    },
    {
        id: 3, name: 'Ministry of Tech', category: 'Technology', lead: 'Vikram Seth', established: '2020',
        budget_total: 35000, budget_used: 15000, grievances_count: 1,
        recruitment_status: 'On-Hold',
        members_count: 85, applicants_count: 450, acceptance_rate: 19,
        leadership_ids: [10, 4, 17], member_ids: [10, 4, 17, 1, 45, 46, 47, 48, 49, 50],
        avg_engagement: 7.2, diversity_score: 75, governance_rating: 4.8,
        spending_trend: [2000, 5000, 10000, 15000], ai_insight: 'Strategic hardware investment completed. Operational liquidity is stable for upcoming Hackathon.'
    },
    {
        id: 4, name: 'Music Soc', category: 'Arts', lead: 'Ibrahim Khalil', established: '2015',
        budget_total: 15000, budget_used: 5000, grievances_count: 0,
        recruitment_status: 'Open',
        members_count: 28, applicants_count: 65, acceptance_rate: 43,
        leadership_ids: [1, 5, 12], member_ids: [1, 5, 12, 18, 60, 61, 62],
        avg_engagement: 8.1, diversity_score: 95, governance_rating: 4.9,
        spending_trend: [500, 1500, 3000, 5000], ai_insight: 'Low utilization indicates postponed procurement. Recruitment is currently selective.'
    },
    {
        id: 5, name: 'Environment Soc', category: 'Environment', lead: 'Kabir B.', established: '2021',
        budget_total: 15000, budget_used: 8000, grievances_count: 0,
        recruitment_status: 'Open',
        members_count: 22, applicants_count: 40, acceptance_rate: 55,
        leadership_ids: [13], member_ids: [13, 70, 71, 72, 73],
        avg_engagement: 7.8, diversity_score: 98, governance_rating: 4.7,
        spending_trend: [1000, 3000, 5000, 8000], ai_insight: 'Steady spending aligned with sustainability drives. Governance remains high.'
    },
    {
        id: 6, name: 'Ministry of Finance', category: 'Economics', lead: 'Arjun V.', established: '2022',
        budget_total: 28000, budget_used: 8000, grievances_count: 0,
        recruitment_status: 'Closed',
        members_count: 35, applicants_count: 140, acceptance_rate: 25,
        leadership_ids: [11], member_ids: [11, 80, 81, 82, 83],
        avg_engagement: 8.9, diversity_score: 82, governance_rating: 4.6,
        spending_trend: [2000, 4000, 6000, 8000], ai_insight: 'High selectivity and concentrated membership. Financial oversight is optimal.'
    },
    {
        id: 7, name: 'Art Soc', category: 'Arts', lead: 'Riya M.', established: '2019',
        budget_total: 15000, budget_used: 12000, grievances_count: 0,
        recruitment_status: 'Ongoing',
        members_count: 18, applicants_count: 55, acceptance_rate: 32,
        leadership_ids: [12], member_ids: [12, 90, 91, 92],
        avg_engagement: 8.5, diversity_score: 90, governance_rating: 4.2,
        spending_trend: [3000, 6000, 9500, 12000], ai_insight: 'Exhausted 80% budget in early workshops. Reallocation or sponsorship intervention needed.'
    },
    {
        id: 8, name: 'Science Soc', category: 'Technology', lead: 'Zoya S.', established: '2023',
        budget_total: 15000, budget_used: 3000, grievances_count: 0,
        recruitment_status: 'Open',
        members_count: 25, applicants_count: 45, acceptance_rate: 55,
        leadership_ids: [14], member_ids: [14, 100, 101, 102],
        avg_engagement: 7.5, diversity_score: 85, governance_rating: 4.4,
        spending_trend: [500, 1200, 2000, 3000], ai_insight: 'New entity with conservative spending. Rapid growth detected in interest metrics.'
    }
];

export const MOCK_REIMBURSEMENTS = [
    { id: 1, club: 'Jazbaa', category: 'Production', amount: 15000, description: 'Set design for annual play', date: 'Sept 12', days_pending: 4, status: 'Review' },
    { id: 2, club: 'Orators', category: 'Travel', amount: 4500, description: 'Bus for inter-college debate', date: 'Sept 14', days_pending: 2, status: 'Pending' },
    { id: 3, club: 'Ministry of Tech', category: 'Hardware', amount: 25000, description: 'Server maintenance for hackathon', date: 'Sept 10', days_pending: 6, status: 'Review' },
    { id: 4, club: 'Music Soc', category: 'Equipment', amount: 2200, description: 'New guitar strings', date: 'Sept 15', days_pending: 1, status: 'Approved' },
    { id: 5, club: 'Environment Soc', category: 'Logistics', amount: 3500, description: 'Planting drive supplies', date: 'Sept 18', days_pending: 1, status: 'Pending' },
    { id: 6, club: 'Ministry of Finance', category: 'Marketing', amount: 1200, description: 'LinkedIn workshop flyers', date: 'Sept 20', days_pending: 0, status: 'Approved' },
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
        date: 'Sept 8', targetClub: 'Ministry of Tech',
        text: 'I applied to Ministry of Tech twice. Both times rejected without any feedback. I come from a non-engineering background and feel there is an unstated prerequisite.',
        aiAnalysis: '83% of Ministry of Tech accepts are Engineering/CS students. Non-STEM acceptance rate is 4%. Structural bias detected.',
        status: 'Intervention Recommended'
    },
];

export const MOCK_EVENTS = [
    { id: 1, title: 'Freshman Welcome Mixer', date: 12, cat: 'Social', status: 'Confirmed', rating: 4.8, expected_attendance: 200, dateObj: new Date('2026-09-12') },
    { id: 2, title: 'Debate Championship', date: 15, cat: 'Academic', status: 'Confirmed', rating: 3.2, expected_attendance: 80, dateObj: new Date('2026-09-15') },
    { id: 3, title: 'Innovation Hackathon', date: 20, cat: 'Technology', status: 'Confirmed', rating: 4.9, expected_attendance: 150, dateObj: new Date('2026-09-20') },
    { id: 4, title: 'Society Induction', date: 15, cat: 'Administrative', status: 'Flagged', rating: 0, expected_attendance: 300, dateObj: new Date('2026-09-15') },
    { id: 5, title: 'Sustainability Workshop', date: 22, cat: 'Environment', status: 'Confirmed', rating: 4.5, expected_attendance: 50, dateObj: new Date('2026-09-22') },
    { id: 6, title: 'Stock Market Talk', date: 25, cat: 'Economics', status: 'Pending', rating: 0, expected_attendance: 120, dateObj: new Date('2026-09-25') },
];

export const OVERLAP_DATA = [
    { pair: ['Orators', 'Jazbaa'], leadership_overlap: 75, member_overlap: 18, status: 'Flagged', risk: 'Institutional Capture' },
    { pair: ['Ministry of Tech', 'Orators'], leadership_overlap: 33, member_overlap: 14, status: 'Review', risk: 'Leadership Overlap' },
    { pair: ['Music Soc', 'Jazbaa'], leadership_overlap: 12, member_overlap: 5, status: 'Safe', risk: 'Minimal Concentration' },
];
