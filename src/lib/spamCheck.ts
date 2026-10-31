import { NextRequest, NextResponse } from 'next/server';

/**
 * Server-side spam checks for the form API routes:
 * 1. Honeypot: a hidden "website_url" field real people never see. Bots fill it -> silently dropped.
 * 2. Google reCAPTCHA v3: verifies the token and its score (needs RECAPTCHA_SECRET_KEY).
 *
 * If reCAPTCHA isn't configured or Google can't be reached, the form is let through:
 * losing a real customer enquiry is worse than letting one spam message in.
 */

type Result = { blocked: false } | { blocked: true; response: NextResponse };

export async function checkSpam(
  body: Record<string, unknown>,
  expectedAction: string,
  request: NextRequest,
): Promise<Result> {
  // 1. Honeypot — pretend it worked so the bot doesn't learn anything.
  if (typeof body.website_url === 'string' && body.website_url.trim() !== '') {
    console.warn(`[spam] honeypot filled on ${expectedAction}`);
    return { blocked: true, response: NextResponse.json({ success: true }) };
  }

  // 2. reCAPTCHA v3
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return { blocked: false };

  const token = body.recaptchaToken;
  const reject = (reason: string) => {
    console.warn(`[spam] reCAPTCHA rejected ${expectedAction}: ${reason}`);
    return {
      blocked: true as const,
      response: NextResponse.json(
        {
          error:
            "We couldn't verify your request. Please try again, or WhatsApp us on +255 745 700 500.",
        },
        { status: 400 },
      ),
    };
  };

  if (typeof token !== 'string' || token === '') return reject('missing token');

  try {
    const params = new URLSearchParams({ secret, response: token });
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
    if (ip) params.set('remoteip', ip);

    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      body: params,
      signal: AbortSignal.timeout(5000),
    });
    const data: { success: boolean; score?: number; action?: string; 'error-codes'?: string[] } =
      await res.json();

    if (!data.success) return reject((data['error-codes'] || []).join(',') || 'invalid token');
    if (data.action && data.action !== expectedAction) return reject(`action ${data.action}`);

    const minScore = Number(process.env.RECAPTCHA_MIN_SCORE ?? '0.5');
    if (typeof data.score === 'number' && data.score < minScore) return reject(`score ${data.score}`);

    return { blocked: false };
  } catch (err) {
    console.error('[spam] reCAPTCHA verification unavailable, allowing submission', err);
    return { blocked: false };
  }
}
