export const STUDENT_SCHEMA = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Student Name' },
    { key: 'batch', label: 'Batch' },
    { key: 'major', label: 'Major' },
    { key: 'minor', label: 'Minor' },
    { key: 'gender', label: 'Gender' },
    { key: 'status', label: 'Status' },
    { key: 'participation_score', label: 'Involvement Score' },
    { key: 'applications', label: 'Total Apps' },
    { key: 'rejections_count', label: 'Rejections' },
    { key: 'acceptance_rate', label: 'Accept %' },
    { key: 'joined', label: 'Societies Joined' },
    { key: 'leadership_roles', label: 'Leadership Roles' },
    { key: 'grievances_filed', label: 'Grievances Filed' },
    { key: 'days_since_last_activity', label: 'Days Inactive' },
];

export const CLUB_SCHEMA = [
    { key: 'name', label: 'Organization' },
    { key: 'category', label: 'Category' },
    { key: 'lead', label: 'Lead' },
    { key: 'established', label: 'Est.' },
    { key: 'members_count', label: 'Members' },
    { key: 'applicants_count', label: 'Applicants' },
    { key: 'acceptance_rate', label: 'Accept %' },
    { key: 'budget_total', label: 'Budget (₹)' },
    { key: 'budget_used', label: 'Used (₹)' },
    { key: 'recruitment_status', label: 'Recruitment' },
    { key: 'grievances_count', label: 'Grievances' },
    {
        key: 'avg_engagement',
        label: 'Engagement Index',
        tooltip: 'Average frequency of attendance across all registered members (0-10 scale)'
    },
    {
        key: 'diversity_score',
        label: 'Diversity Index',
        tooltip: 'Weighted metric based on major, batch, and gender distribution'
    },
    { key: 'governance_rating', label: 'Governance' },
];
