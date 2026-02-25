import { NextResponse } from 'next/server';
import { attachSecurityHeaders } from '@/utils/response';

export async function POST() {
  const response = NextResponse.json({ 
    success: true, 
    message: 'Login successful (mock)' 
  });
  
  // Example with custom CSP: Allow 'unsafe-inline' for scripts (just as an example of override)
  return attachSecurityHeaders(response, "default-src 'self'; script-src 'self' 'unsafe-inline'");
}
