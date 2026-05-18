import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Viabtech privacy policy — how we collect, use, and protect your personal data in compliance with the Tanzania Personal Data Protection Act (PDPA) 2022.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f0f7fa] via-white to-[#f8fbff]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            Legal
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[var(--font-heading)] text-text-primary leading-tight">
            Privacy Policy
          </h1>
          <p className="text-text-secondary mt-4 text-base sm:text-lg">
            Last updated: 18 May 2026
          </p>
        </div>

        {/* Content */}
        <article className="prose prose-lg max-w-none text-text-secondary prose-headings:text-text-primary prose-headings:font-[var(--font-heading)] prose-a:text-primary prose-strong:text-text-primary">
          <section className="bg-white rounded-2xl shadow-sm border border-border/50 p-6 sm:p-10 mb-8">
            <h2 className="text-xl font-bold mt-0">1. Introduction</h2>
            <p>
              Viab Tech Ltd (&quot;Viabtech,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your personal data in accordance with the <strong>United Republic of Tanzania Personal Data Protection Act No. 11 of 2022 (PDPA)</strong>, which came into force on 1 May 2023, and the regulations issued by the <strong>Personal Data Protection Commission (PDPC)</strong>.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, store, share, and protect personal data when you visit our website (<strong>viabtech.co.tz</strong>), use our services, or interact with us in any way.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-border/50 p-6 sm:p-10 mb-8">
            <h2 className="text-xl font-bold mt-0">2. Data Controller</h2>
            <p>The data controller responsible for your personal data is:</p>
            <ul>
              <li><strong>Company:</strong> Viab Tech Ltd</li>
              <li><strong>Address:</strong> P.O.Box 105047, Ground Floor, Uhuru Heights, Bibi Titi Mohamed Rd, Dar es Salaam, Tanzania</li>
              <li><strong>Email:</strong> <a href="mailto:info@viabtech.co.tz">info@viabtech.co.tz</a></li>
              <li><strong>Phone:</strong> +255 745 700 500</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-border/50 p-6 sm:p-10 mb-8">
            <h2 className="text-xl font-bold mt-0">3. Personal Data We Collect</h2>
            <p>We may collect the following categories of personal data:</p>
            <h3>3.1 Data You Provide Directly</h3>
            <ul>
              <li><strong>Contact information:</strong> Name, email address, phone number, company name</li>
              <li><strong>Service requests:</strong> Product inquiries, warranty registration details, repair service requests</li>
              <li><strong>Quote requests:</strong> Business requirements and product preferences</li>
              <li><strong>Canon product registration:</strong> Device model, serial number, purchase date, and dealer information</li>
            </ul>
            <h3>3.2 Data Collected Automatically</h3>
            <ul>
              <li><strong>Usage data:</strong> Pages visited, time spent on pages, referring URLs</li>
              <li><strong>Device data:</strong> Browser type, operating system, screen resolution</li>
              <li><strong>Location data:</strong> General geographic location based on IP address (city/country level only)</li>
            </ul>
            <h3>3.3 Cookies and Tracking Technologies</h3>
            <p>
              We use cookies and similar technologies in accordance with Section 4(2) of the PDPA. Please refer to our <strong>Cookie Policy</strong> (Section 10 below) for full details on the cookies we use and how to manage your preferences.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-border/50 p-6 sm:p-10 mb-8">
            <h2 className="text-xl font-bold mt-0">4. Lawful Basis for Processing</h2>
            <p>Under the PDPA, we process your personal data based on one or more of the following lawful grounds:</p>
            <ul>
              <li><strong>Consent:</strong> Where you have given clear, informed, and freely given consent (e.g., subscribing to our newsletter or accepting cookies).</li>
              <li><strong>Contractual necessity:</strong> Where processing is necessary to fulfil a contract with you (e.g., processing a product order or warranty registration).</li>
              <li><strong>Legitimate interests:</strong> Where processing is necessary for our legitimate business interests (e.g., improving our website, fraud prevention), provided these do not override your fundamental rights.</li>
              <li><strong>Legal obligation:</strong> Where processing is required to comply with applicable law.</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-border/50 p-6 sm:p-10 mb-8">
            <h2 className="text-xl font-bold mt-0">5. How We Use Your Data</h2>
            <p>We use your personal data for the following purposes:</p>
            <ul>
              <li>Responding to your inquiries and providing customer support</li>
              <li>Processing product orders, warranty registrations, and service requests</li>
              <li>Sending you information about our products and services (with your consent)</li>
              <li>Improving our website, products, and services</li>
              <li>Analysing website usage patterns to enhance user experience</li>
              <li>Complying with legal and regulatory requirements</li>
              <li>Protecting against fraud and ensuring website security</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-border/50 p-6 sm:p-10 mb-8">
            <h2 className="text-xl font-bold mt-0">6. Data Sharing and Disclosure</h2>
            <p>We do <strong>not</strong> sell your personal data. We may share your data with:</p>
            <ul>
              <li><strong>Brand partners</strong> (Canon, Epson) — for warranty and product registration purposes only</li>
              <li><strong>Service providers</strong> — trusted third parties who assist in website hosting, analytics, and email communications, under strict data processing agreements</li>
              <li><strong>Legal authorities</strong> — when required by law, court order, or regulation</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-border/50 p-6 sm:p-10 mb-8">
            <h2 className="text-xl font-bold mt-0">7. Cross-Border Data Transfers</h2>
            <p>
              Where your personal data is transferred outside of Tanzania (e.g., to cloud service providers or brand partners headquartered abroad), we ensure that adequate safeguards are in place as required under <strong>Part VII of the PDPA</strong>, including ensuring that the receiving country provides an adequate level of data protection or that appropriate contractual clauses are in place.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-border/50 p-6 sm:p-10 mb-8">
            <h2 className="text-xl font-bold mt-0">8. Data Retention</h2>
            <p>We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected:</p>
            <ul>
              <li><strong>Contact and inquiry data:</strong> Up to 2 years after your last interaction</li>
              <li><strong>Warranty and registration data:</strong> For the duration of the product warranty period plus 1 year</li>
              <li><strong>Website analytics data:</strong> Up to 14 months</li>
              <li><strong>Cookie consent records:</strong> Up to 12 months</li>
            </ul>
            <p>After the retention period, data is securely deleted or anonymised.</p>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-border/50 p-6 sm:p-10 mb-8">
            <h2 className="text-xl font-bold mt-0">9. Your Rights Under the PDPA</h2>
            <p>As a data subject, you have the following rights under the PDPA:</p>
            <ul>
              <li><strong>Right of access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong>Right to rectification:</strong> Request correction of inaccurate or incomplete data</li>
              <li><strong>Right to erasure:</strong> Request deletion of your personal data where there is no legitimate reason for continued processing</li>
              <li><strong>Right to restrict processing:</strong> Request that we limit how we use your data</li>
              <li><strong>Right to data portability:</strong> Receive your data in a structured, machine-readable format</li>
              <li><strong>Right to object:</strong> Object to processing based on legitimate interests or for direct marketing purposes</li>
              <li><strong>Right to withdraw consent:</strong> Withdraw consent at any time without affecting the lawfulness of processing based on consent before its withdrawal</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at <a href="mailto:info@viabtech.co.tz">info@viabtech.co.tz</a>. We will respond within <strong>30 days</strong> as required by the PDPA.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-border/50 p-6 sm:p-10 mb-8">
            <h2 className="text-xl font-bold mt-0">10. Cookie Policy</h2>
            <h3>10.1 What Are Cookies?</h3>
            <p>Cookies are small text files stored on your device when you visit our website. They help us provide a better experience by remembering your preferences and understanding how you use our site.</p>
            <h3>10.2 Types of Cookies We Use</h3>
            <ul>
              <li><strong>Strictly Necessary Cookies:</strong> Essential for the website to function. These do not require consent. Examples: session management, security tokens.</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use the website. We use these to improve site performance. These require your consent before activation.</li>
              <li><strong>Preference Cookies:</strong> Remember your settings such as language preference (English/Swahili). These require your consent.</li>
            </ul>
            <h3>10.3 Managing Cookies</h3>
            <p>
              When you first visit our website, you will see a cookie consent banner. You may accept or decline non-essential cookies. You can change your cookie preferences at any time through your browser settings or by contacting us.
            </p>
            <h3>10.4 Third-Party Cookies</h3>
            <p>
              We may use third-party services (e.g., Google Fonts) that set their own cookies. We do not control these cookies. Please refer to the respective third-party privacy policies for more information.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-border/50 p-6 sm:p-10 mb-8">
            <h2 className="text-xl font-bold mt-0">11. Data Security</h2>
            <p>
              We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, destruction, or alteration. These measures include:
            </p>
            <ul>
              <li>SSL/TLS encryption for all data transmitted via our website</li>
              <li>Access controls and authentication for internal systems</li>
              <li>Regular security reviews and updates</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-border/50 p-6 sm:p-10 mb-8">
            <h2 className="text-xl font-bold mt-0">12. Children&apos;s Privacy</h2>
            <p>
              Our website and services are not directed at individuals under the age of 18. We do not knowingly collect personal data from children. If you believe we have inadvertently collected data from a child, please contact us immediately and we will take steps to delete it.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-border/50 p-6 sm:p-10 mb-8">
            <h2 className="text-xl font-bold mt-0">13. Complaints</h2>
            <p>
              If you believe your data protection rights have been violated, you have the right to lodge a complaint with:
            </p>
            <ul>
              <li><strong>Viab Tech Ltd</strong> — <a href="mailto:info@viabtech.co.tz">info@viabtech.co.tz</a></li>
              <li><strong>Personal Data Protection Commission (PDPC)</strong> — <a href="https://www.pdpc.go.tz" target="_blank" rel="noopener noreferrer">www.pdpc.go.tz</a></li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-border/50 p-6 sm:p-10">
            <h2 className="text-xl font-bold mt-0">14. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated &quot;Last updated&quot; date. We encourage you to review this policy periodically.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
