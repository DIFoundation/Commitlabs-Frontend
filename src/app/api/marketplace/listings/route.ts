import { NextRequest } from 'next/server';
import { withApiHandler } from '@/lib/backend/withApiHandler';
import { ok } from '@/lib/backend/apiResponse';
import { ValidationError } from '@/lib/backend/errors';
import { marketplaceService } from '@/lib/backend/services/marketplace';
import type { CreateListingRequest, CreateListingResponse } from '@/types/marketplace';

/**
 * POST /api/marketplace/listings
 *
 * Create a new marketplace listing for a Commitment NFT
 *
 * Request body:
 * {
 *   commitmentId: string;
 *   price: string;
 *   currencyAsset: string;
 *   sellerAddress: string;
 * }
 */
export const POST = withApiHandler(async (req: NextRequest) => {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    throw new ValidationError('Invalid JSON in request body');
  }

  // Validate body structure
  if (!body || typeof body !== 'object') {
    throw new ValidationError('Request body must be an object');
  }

  const request = body as CreateListingRequest;

  // Create listing via service
  const listing = await marketplaceService.createListing(request);

  const response: CreateListingResponse = {
    listing,
  };

  return ok(response, 201);
});
