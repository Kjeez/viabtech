'use client';

import { useEffect } from 'react';
import { preloadRecaptcha } from '@/lib/recaptcha';

/**
 * Put inside every protected <form>:
 * - a hidden "website_url" field (honeypot) that only bots fill in
 * - the reCAPTCHA notice Google requires when its badge is hidden
 * It also starts loading reCAPTCHA as soon as the form appears.
 */
export default function FormProtection({ dark = false }: { dark?: boolean }) {
  useEffect(() => {
    preloadRecaptcha();
  }, []);

  const showNotice = !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const linkClass = dark ? 'underline hover:text-white' : 'underline hover:text-primary';

  return (
    <>
      <div aria-hidden="true" style={{ display: 'none' }}>
        <label>
          Leave this field empty
          <input type="text" name="website_url" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      {showNotice && (
        <p className={`text-[11px] leading-snug mt-3 text-center ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
          Protected by reCAPTCHA. Google{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className={linkClass}>Privacy Policy</a>{' '}
          and{' '}
          <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className={linkClass}>Terms</a>{' '}
          apply.
        </p>
      )}
    </>
  );
}
