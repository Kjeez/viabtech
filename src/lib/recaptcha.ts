/**
 * Google reCAPTCHA v3 (invisible) — client side.
 * Needs NEXT_PUBLIC_RECAPTCHA_SITE_KEY. Without it every helper is a no-op,
 * so the forms keep working before the keys are added in Vercel.
 */

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

interface Grecaptcha {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, opts: { action: string }) => Promise<string>;
}

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

let loader: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (loader) return loader;
  loader = new Promise<void>((resolve, reject) => {
    if (window.grecaptcha) return resolve();
    const s = document.createElement('script');
    s.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => {
      loader = null;
      reject(new Error('reCAPTCHA failed to load'));
    };
    document.head.appendChild(s);
  });
  return loader;
}

/** Load the reCAPTCHA script early (e.g. when a form is shown) so submitting is instant. */
export function preloadRecaptcha() {
  if (SITE_KEY && typeof window !== 'undefined') loadScript().catch(() => {});
}

/** Get a one-time token for this submission. Returns undefined if reCAPTCHA is not configured or unavailable. */
export async function getRecaptchaToken(action: string): Promise<string | undefined> {
  if (!SITE_KEY || typeof window === 'undefined') return undefined;
  try {
    await loadScript();
    const g = window.grecaptcha;
    if (!g) return undefined;
    return await new Promise<string>((resolve, reject) => {
      g.ready(() => {
        g.execute(SITE_KEY, { action }).then(resolve, reject);
      });
    });
  } catch {
    return undefined;
  }
}

/** Fields every protected form sends: the reCAPTCHA token and the hidden honeypot value. */
export async function getSpamFields(form: HTMLFormElement | null, action: string) {
  const honeypot = form ? String(new FormData(form).get('website_url') ?? '') : '';
  const recaptchaToken = await getRecaptchaToken(action);
  return { recaptchaToken, website_url: honeypot };
}
