import { MOCK_STUDENTS, MOCK_CLUBS } from './mockData';
import { STUDENT_SCHEMA, CLUB_SCHEMA } from './schemas';

export const STUDENT_QUICK_FILTERS = [
    {
        label: "Isolation Risk",
        description: "Apps > 3 and Accept % < 10",
        filters: [
            { field: 'applications', operator: 'GREATER_THAN', value: '3' },
            { field: 'acceptance_rate', operator: 'LESS_THAN', value: '10' }
        ],
        schema: STUDENT_SCHEMA,
        data: MOCK_STUDENTS
    },
    {
        label: "Leadership Bottleneck",
        description: "Students with 3+ core roles",
        filters: [{ field: 'leadership_roles', operator: 'GREATER_THAN', value: '2' }],
        schema: STUDENT_SCHEMA,
        data: MOCK_STUDENTS
    },
    {
        label: "High Potential Passives",
        description: "High score but 0 memberships",
        filters: [
            { field: 'participation_score', operator: 'GREATER_THAN', value: '70' },
            { field: 'joined', operator: 'EQUALS', value: '0' }
        ],
        schema: STUDENT_SCHEMA,
        data: MOCK_STUDENTS
    },
    {
        label: "UG25 Freshman Signal",
        description: "Incoming batch engagement",
        filters: [{ field: 'batch', operator: 'EQUALS', value: '2025' }],
        schema: STUDENT_SCHEMA,
        data: MOCK_STUDENTS
    },
    {
        label: "Grievance Watchlist",
        description: "Students who filed complaints",
        filters: [{ field: 'grievances_filed', operator: 'GREATER_THAN', value: '0' }],
        schema: STUDENT_SCHEMA,
        data: MOCK_STUDENTS
    },
    {
        label: "Elite Clusters",
        description: "100% acceptance across 2+ apps",
        filters: [
            { field: 'acceptance_rate', operator: 'EQUALS', value: '100' },
            { field: 'applications', operator: 'GREATER_THAN', value: '1' }
        ],
        schema: STUDENT_SCHEMA,
        data: MOCK_STUDENTS
    },
];

export const CLUB_QUICK_FILTERS = [
    {
        label: "Highly Selective Legacy",
        description: "Accept % < 20 and Est. < 2015",
        filters: [
            { field: 'acceptance_rate', operator: 'LESS_THAN', value: '20' },
            { field: 'founded', operator: 'LESS_THAN', value: '2015' }
        ],
        schema: CLUB_SCHEMA,
        data: MOCK_CLUBS
    },
    {
        label: "Resource Intensive",
        description: "Clubs with ₹12k+ budget",
        filters: [{ field: 'budget_total', operator: 'GREATER_THAN', value: '12000' }],
        schema: CLUB_SCHEMA,
        data: MOCK_CLUBS
    },
    {
        label: "Tech Hubs",
        description: "Technology & Engineering",
        filters: [{ field: 'category', operator: 'CONTAINS', value: 'Tech' }],
        schema: CLUB_SCHEMA,
        data: MOCK_CLUBS
    },
    {
        label: "High Diversity Alert",
        description: "Clubs with 150+ members",
        filters: [{ field: 'members_count', operator: 'GREATER_THAN', value: '150' }],
        schema: CLUB_SCHEMA,
        data: MOCK_CLUBS
    },
    {
        label: "Budget Watchlist",
        description: "Spent over ₹10k already",
        filters: [{ field: 'budget_used', operator: 'GREATER_THAN', value: '10000' }],
        schema: CLUB_SCHEMA,
        data: MOCK_CLUBS
    },
    {
        label: "Society Status",
        description: "Socs awaiting review",
        filters: [{ field: 'status', operator: 'EQUALS', value: 'Pending' }],
        schema: CLUB_SCHEMA,
        data: MOCK_CLUBS
    },
];

export const ALL_QUICK_FILTERS = [...STUDENT_QUICK_FILTERS, ...CLUB_QUICK_FILTERS];
