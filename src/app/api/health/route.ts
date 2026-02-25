import { NextResponse } from 'next/server';
import { attachSecurityHeaders } from '@/utils/response';
import { logger } from '@/lib/backend';

export async function GET() {
  logger.info('Health check requested');
  const response = NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() });
  return attachSecurityHeaders(response);
}
