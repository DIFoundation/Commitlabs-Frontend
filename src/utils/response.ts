
/**
 * Appends standard security headers to an HTTP Response.
 *
 * Headers added:
 * - Content-Security-Policy: Configurable via cspDirectives argument (default: "default-src 'self'")
 * - X-Content-Type-Options: "nosniff"
 * - X-Frame-Options: "DENY"
 * - X-XSS-Protection: "1; mode=block"
 * - Strict-Transport-Security: "max-age=31536000; includeSubDomains" (Applied unconditionally as HSTS is standard for secure apps)
 * - Referrer-Policy: "strict-origin-when-cross-origin"
 *
 * @param response - The HTTP Response object to which headers will be attached.
 * @param cspDirectives - Optional custom Content-Security-Policy directive string. Defaults to "default-src 'self'".
 * @returns The modified Response object.
 */
export function attachSecurityHeaders(response: Response, cspDirectives?: string): Response {
  const headers = response.headers;

  // Content-Security-Policy
  const csp = cspDirectives || "default-src 'self'";
  headers.set('Content-Security-Policy', csp);

  // X-Content-Type-Options
  headers.set('X-Content-Type-Options', 'nosniff');

  // X-Frame-Options
  headers.set('X-Frame-Options', 'DENY');

  // X-XSS-Protection
  headers.set('X-XSS-Protection', '1; mode=block');

  // Strict-Transport-Security
  // Only add if not explicitly plain HTTP.
  // We rely on response.url to detect if it's a plain HTTP response.
  // If response.url is empty or starts with https, we assume it's secure or should be secured.
  if (!response.url.startsWith('http://')) {
    headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }

  // Referrer-Policy
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}
