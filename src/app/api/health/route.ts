import { NextResponse, NextRequest } from 'next/server';
import { attachSecurityHeaders } from '@/utils/response';
import { logInfo } from '@/lib/backend/logger';

export async function GET(req: NextRequest) {
  logInfo(req, 'Healthcheck requested');
  const response = NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() });
  return attachSecurityHeaders(response);
}
