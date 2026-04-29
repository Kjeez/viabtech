'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f8fbff' }}>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }}>
          <div style={{ textAlign: 'center', maxWidth: '420px' }}>
            <div style={{
              width: '80px', height: '80px', margin: '0 auto 24px',
              borderRadius: '50%', background: '#FEF2F2',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', marginBottom: '12px' }}>
              Something went wrong
            </h2>
            <p style={{ color: '#6B7280', marginBottom: '32px', lineHeight: 1.6 }}>
              We&apos;re sorry — the page encountered an unexpected error. Please try reloading.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={reset}
                style={{
                  padding: '12px 24px', borderRadius: '12px',
                  background: '#0057B8', color: 'white',
                  fontWeight: 600, fontSize: '14px', border: 'none', cursor: 'pointer',
                }}
              >
                Try Again
              </button>
              <a
                href="/"
                style={{
                  padding: '12px 24px', borderRadius: '12px',
                  background: '#F3F4F6', color: '#374151',
                  fontWeight: 600, fontSize: '14px', textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center',
                }}
              >
                Go Home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
