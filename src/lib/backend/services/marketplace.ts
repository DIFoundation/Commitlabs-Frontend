export type MarketplaceCommitmentType = 'Safe' | 'Balanced' | 'Aggressive';

export interface MarketplaceListing {
    listingId: string;
    commitmentId: string;
    type: MarketplaceCommitmentType;
    amount: number;
    remainingDays: number;
    maxLoss: number;
    currentYield: number;
    complianceScore: number;
    price: number;
}

export interface MarketplaceListingsQuery {
    type?: MarketplaceCommitmentType;
    minCompliance?: number;
    maxLoss?: number;
    minAmount?: number;
    maxAmount?: number;
    sortBy?: string;
}

const MOCK_LISTINGS: MarketplaceListing[] = [
    {
        listingId: 'LST-001',
        commitmentId: 'CMT-001',
        type: 'Safe',
        amount: 50000,
        remainingDays: 25,
        maxLoss: 2,
        currentYield: 5.2,
        complianceScore: 95,
        price: 52000,
    },
    {
        listingId: 'LST-002',
        commitmentId: 'CMT-002',
        type: 'Balanced',
        amount: 100000,
        remainingDays: 45,
        maxLoss: 8,
        currentYield: 12.5,
        complianceScore: 88,
        price: 105000,
    },
    {
        listingId: 'LST-003',
        commitmentId: 'CMT-003',
        type: 'Aggressive',
        amount: 250000,
        remainingDays: 80,
        maxLoss: 100,
        currentYield: 18.7,
        complianceScore: 76,
        price: 262000,
    },
    {
        listingId: 'LST-004',
        commitmentId: 'CMT-004',
        type: 'Safe',
        amount: 75000,
        remainingDays: 15,
        maxLoss: 2,
        currentYield: 4.8,
        complianceScore: 92,
        price: 76500,
    },
    {
        listingId: 'LST-005',
        commitmentId: 'CMT-005',
        type: 'Balanced',
        amount: 150000,
        remainingDays: 55,
        maxLoss: 8,
        currentYield: 11.3,
        complianceScore: 85,
        price: 155000,
    },
    {
        listingId: 'LST-006',
        commitmentId: 'CMT-006',
        type: 'Aggressive',
        amount: 500000,
        remainingDays: 85,
        maxLoss: 100,
        currentYield: 22.1,
        complianceScore: 72,
        price: 525000,
    },
];

const SORT_CONFIG = {
    price: { key: 'price', order: 'desc' },
    amount: { key: 'amount', order: 'desc' },
    complianceScore: { key: 'complianceScore', order: 'desc' },
    remainingDays: { key: 'remainingDays', order: 'asc' },
    maxLoss: { key: 'maxLoss', order: 'asc' },
    currentYield: { key: 'currentYield', order: 'desc' },
} as const satisfies Record<string, { key: keyof MarketplaceListing; order: 'asc' | 'desc' }>;

export type MarketplaceSortBy = keyof typeof SORT_CONFIG;

function sortListings(listings: MarketplaceListing[], sortBy: MarketplaceSortBy): MarketplaceListing[] {
    const { key, order } = SORT_CONFIG[sortBy];

    return [...listings].sort((a, b) => {
        const lhs = a[key] as number;
        const rhs = b[key] as number;
        return order === 'asc' ? lhs - rhs : rhs - lhs;
    });
}

export function isMarketplaceSortBy(value: string): value is MarketplaceSortBy {
    return value in SORT_CONFIG;
}

export function getMarketplaceSortKeys(): MarketplaceSortBy[] {
    return Object.keys(SORT_CONFIG) as MarketplaceSortBy[];
}

export async function listMarketplaceListings(query: MarketplaceListingsQuery): Promise<MarketplaceListing[]> {
    let results = MOCK_LISTINGS;

    if (query.type) {
        results = results.filter((listing) => listing.type === query.type);
    }
    if (query.minCompliance !== undefined) {
        const minCompliance = query.minCompliance;
        results = results.filter((listing) => listing.complianceScore >= minCompliance);
    }
    if (query.maxLoss !== undefined) {
        const maxLoss = query.maxLoss;
        results = results.filter((listing) => listing.maxLoss <= maxLoss);
    }
    if (query.minAmount !== undefined) {
        const minAmount = query.minAmount;
        results = results.filter((listing) => listing.amount >= minAmount);
    }
    if (query.maxAmount !== undefined) {
        const maxAmount = query.maxAmount;
        results = results.filter((listing) => listing.amount <= maxAmount);
    }

    const sortBy = query.sortBy && isMarketplaceSortBy(query.sortBy) ? query.sortBy : 'price';

    // TODO(on-chain): Replace mock listings with marketplace contract reads.
    // TODO(attestation): Merge latest attestation engine score per commitment when available.
    return sortListings(results, sortBy);
}