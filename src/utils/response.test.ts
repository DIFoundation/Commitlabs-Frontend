
import { describe, it, expect } from 'vitest';
import { attachSecurityHeaders } from './response';

describe('attachSecurityHeaders', () => {
  it('should attach all security headers with default values', () => {
    const response = new Response('ok');
    const modifiedResponse = attachSecurityHeaders(response);

    const headers = modifiedResponse.headers;
    
    expect(headers.get('Content-Security-Policy')).toBe("default-src 'self'");
    expect(headers.get('X-Content-Type-Options')).toBe('nosniff');
    expect(headers.get('X-Frame-Options')).toBe('DENY');
    expect(headers.get('X-XSS-Protection')).toBe('1; mode=block');
    expect(headers.get('Strict-Transport-Security')).toBe('max-age=31536000; includeSubDomains');
    expect(headers.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
  });

  it('should allow overriding Content-Security-Policy', () => {
    const response = new Response('ok');
    const customCsp = "default-src 'none'; script-src 'self'";
    const modifiedResponse = attachSecurityHeaders(response, customCsp);

    expect(modifiedResponse.headers.get('Content-Security-Policy')).toBe(customCsp);
  });

  it('should omit Strict-Transport-Security when the response URL is plain HTTP', () => {
    const response = new Response('ok');
    
    // Mock the URL property to be http://example.com
    Object.defineProperty(response, 'url', {
      value: 'http://example.com',
      writable: false,
    });

    const modifiedResponse = attachSecurityHeaders(response);
    
    expect(modifiedResponse.headers.has('Strict-Transport-Security')).toBe(false);
    // Other headers should still be present
    expect(modifiedResponse.headers.get('X-Frame-Options')).toBe('DENY');
  });

  it('should include Strict-Transport-Security when the response URL is HTTPS', () => {
    const response = new Response('ok');
    
    // Mock the URL property to be https://example.com
    Object.defineProperty(response, 'url', {
      value: 'https://example.com',
      writable: false,
    });

    const modifiedResponse = attachSecurityHeaders(response);
    
    expect(modifiedResponse.headers.get('Strict-Transport-Security')).toBe('max-age=31536000; includeSubDomains');
  });
});
