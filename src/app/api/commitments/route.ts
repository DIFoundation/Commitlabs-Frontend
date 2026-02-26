import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/backend/rateLimit';
import { createCommitmentOnChain } from '@/lib/backend/services/contracts';
import {
    normalizeBackendError,
    toBackendErrorResponse
} from '@/lib/backend/errors';

import { withApiHandler } from '@/lib/backend/withApiHandler';
import { ok } from '@/lib/backend/apiResponse';
import { TooManyRequestsError } from '@/lib/backend/errors';
import { getMockData } from '@/lib/backend/mockDb';

export const GET = withApiHandler(async (req: NextRequest) => {
    const ip = req.ip ?? req.headers.get('x-forwarded-for') ?? 'anonymous';

    const isAllowed = await checkRateLimit(ip, 'api/commitments');
    if (!isAllowed) {
        throw new TooManyRequestsError();
    }

    const { commitments } = await getMockData();

    return ok({ commitments }, 200);
});

interface CreateCommitmentRequestBody {
    ownerAddress: string;
    asset: string;
    amount: string;
    durationDays: number;
    maxLossBps: number;
    metadata?: Record<string, unknown>;
}

export const POST = withApiHandler(async (req: NextRequest) => {
    const ip = req.ip ?? req.headers.get('x-forwarded-for') ?? 'anonymous';

    const isAllowed = await checkRateLimit(ip, 'api/commitments');
    if (!isAllowed) {
        throw new TooManyRequestsError();
    }

    try {
        const body = (await req.json()) as CreateCommitmentRequestBody;
        const result = await createCommitmentOnChain({
            ownerAddress: body.ownerAddress,
            asset: body.asset,
            amount: body.amount,
            durationDays: body.durationDays,
            maxLossBps: body.maxLossBps,
            metadata: body.metadata
        });
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        const normalized = normalizeBackendError(error, {
            code: 'INTERNAL_ERROR',
            message: 'Failed to create commitment.',
            status: 500
        });
        return NextResponse.json(toBackendErrorResponse(normalized), {
            status: normalized.status
        });
    }
});
