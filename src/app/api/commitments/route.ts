import { NextRequest } from "next/server";
import { checkRateLimit } from "@/lib/backend/rateLimit";
import { withApiHandler } from "@/lib/backend/withApiHandler";
import { ok, fail } from "@/lib/backend/apiResponse";
import { TooManyRequestsError } from "@/lib/backend/errors";
import { getUserCommitmentsFromChain } from "@/lib/contracts";

export const GET = withApiHandler(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const ownerAddress = searchParams.get("ownerAddress");
  const page = Number(searchParams.get("page") ?? 1);
  const pageSize = Number(searchParams.get("pageSize") ?? 10);

  if (!ownerAddress) {
    return fail("Missing ownerAddress", "BAD_REQUEST", 400);
  }

  if (page < 1 || pageSize < 1 || pageSize > 100) {
    return fail("Invalid pagination params", "BAD_REQUEST", 400);
  }

  const ip = req.ip ?? req.headers.get("x-forwarded-for") ?? "anonymous";

  const isAllowed = await checkRateLimit(ip, "api/commitments");
  if (!isAllowed) {
    throw new TooManyRequestsError();
  }

  const commitments = await getUserCommitmentsFromChain(ownerAddress);

  const mapped = commitments.map((c) => ({
    commitmentId: String(c.id),
    type: c.type,
    amount: typeof c.amount === "bigint" ? c.amount.toString() : c.amount,
    durationDays: c.durationDays,
    status: c.status,
    currentValue:
      typeof c.currentValue === "bigint"
        ? c.currentValue.toString()
        : c.currentValue,
    maxLossPercent: c.maxLossPercent,
    createdAt: c.createdAt,
    expiresAt: c.expiresAt,
  }));

  const start = (page - 1) * pageSize;
  const items = mapped.slice(start, start + pageSize);

  return ok({
    items,
    page,
    pageSize,
    total: mapped.length, // TODO: optimize if chain indexing improves
  });
});

export const POST = withApiHandler(async (req: NextRequest) => {
  const ip = req.ip ?? req.headers.get("x-forwarded-for") ?? "anonymous";

  const isAllowed = await checkRateLimit(ip, "api/commitments");
  if (!isAllowed) {
    throw new TooManyRequestsError();
  }

  // TODO: validate request body, interact with Soroban smart contract,
  //       store commitment record in database, mint NFT, etc.

  return ok({ message: "Commitment created successfully." }, 201);
});
