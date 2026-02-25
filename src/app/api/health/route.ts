import { NextResponse } from 'next/server';
import { attachSecurityHeaders } from '@/utils/response';

export async function GET() {
  const response = NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() });
  return attachSecurityHeaders(response);
}
