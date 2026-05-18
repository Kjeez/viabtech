import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Viabtech terms of service — the terms governing your use of our website and services.',
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f0f7fa] via-white to-[#f8fbff]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            Legal
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[var(--font-heading)] text-text-primary leading-tight">
            Terms of Service
          </h1>
          <p className="text-text-secondary mt-4 text-base sm:text-lg">
            Last updated: 18 May 2026
          </p>
        </div>

        {/* Content */}
        <article className="prose prose-lg max-w-none text-text-secondary prose-headings:text-text-primary prose-headings:font-[var(--font-heading)] prose-a:text-primary prose-strong:text-text-primary">
          <section className="bg-white rounded-2xl shadow-sm border border-border/50 p-6 sm:p-10 mb-8">
            <h2 className="text-xl font-bold mt-0">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Viab Tech Ltd (&quot;Viabtech&quot;) website at <strong>viabtech.co.tz</strong>, you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree, please do not use our website or services.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-border/50 p-6 sm:p-10 mb-8">
            <h2 className="text-xl font-bold mt-0">2. About Viabtech</h2>
            <p>
              Viab Tech Ltd is an authorised dealer and service provider for Canon and Epson products in Tanzania. We provide product sales, repair, warranty registration, and managed print services. Our registered office is located in Dar es Salaam, Tanzania.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-border/50 p-6 sm:p-10 mb-8">
            <h2 className="text-xl font-bold mt-0">3. Use of the Website</h2>
            <p>You agree to use our website only for lawful purposes. You may not:</p>
            <ul>
              <li>Use the website in a way that violates any applicable local, national, or international law</li>
              <li>Attempt to gain unauthorised access to any part of the website, its servers, or any connected systems</li>
              <li>Transmit any malicious code, virus, or harmful data</li>
              <li>Reproduce, duplicate, or resell any part of the website without our express written permission</li>
              <li>Scrape or harvest data from the website using automated tools</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-border/50 p-6 sm:p-10 mb-8">
            <h2 className="text-xl font-bold mt-0">4. Products and Services</h2>
            <h3>4.1 Product Information</h3>
            <p>
              We make every effort to display our products accurately on the website. However, product images, descriptions, specifications, and pricing are subject to change without notice. Colours displayed may vary depending on your monitor or screen settings.
            </p>
            <h3>4.2 Pricing</h3>
            <p>
              All prices are quoted in Tanzanian Shillings (TZS) or US Dollars (USD) unless otherwise stated. Prices are subject to change and may vary based on quantity, configuration, and market conditions. For accurate pricing, please request a quote.
            </p>
            <h3>4.3 Availability</h3>
            <p>
              Product availability is not guaranteed. We reserve the right to limit quantities and to discontinue any product at any time.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-border/50 p-6 sm:p-10 mb-8">
            <h2 className="text-xl font-bold mt-0">5. Warranty and Service</h2>
            <p>
              Products sold by Viabtech are covered by the manufacturer&apos;s standard warranty. Warranty terms, duration, and conditions vary by product and brand. Warranty services are subject to separate terms and conditions provided at the time of purchase or registration.
            </p>
            <p>
              Extended warranty and service plans are available for selected products and are subject to their own terms and conditions.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-border/50 p-6 sm:p-10 mb-8">
            <h2 className="text-xl font-bold mt-0">6. Intellectual Property</h2>
            <p>
              All content on this website — including text, graphics, logos, images, videos, and software — is the property of Viab Tech Ltd or its licensors and is protected by intellectual property laws. Canon and Epson logos and trademarks are the property of their respective owners.
            </p>
            <p>
              You may not reproduce, distribute, or create derivative works from any content on this website without our prior written consent.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-border/50 p-6 sm:p-10 mb-8">
            <h2 className="text-xl font-bold mt-0">7. Privacy and Data Protection</h2>
            <p>
              Your use of our website is also governed by our <a href="/privacy">Privacy Policy</a>, which details how we collect, use, and protect your personal data in compliance with the <strong>Tanzania Personal Data Protection Act (PDPA) 2022</strong>.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-border/50 p-6 sm:p-10 mb-8">
            <h2 className="text-xl font-bold mt-0">8. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the content, privacy practices, or availability of those sites. Accessing third-party links is at your own risk.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-border/50 p-6 sm:p-10 mb-8">
            <h2 className="text-xl font-bold mt-0">9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Viab Tech Ltd shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use our website or services. This includes, but is not limited to, loss of data, profits, or business opportunities.
            </p>
            <p>
              The website and its content are provided &quot;as is&quot; without warranties of any kind, either express or implied.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-border/50 p-6 sm:p-10 mb-8">
            <h2 className="text-xl font-bold mt-0">10. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Viab Tech Ltd, its directors, employees, and agents from any claims, damages, losses, or expenses (including legal fees) arising from your violation of these Terms or your use of the website.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-border/50 p-6 sm:p-10 mb-8">
            <h2 className="text-xl font-bold mt-0">11. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of the <strong>United Republic of Tanzania</strong>. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Tanzania.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-border/50 p-6 sm:p-10 mb-8">
            <h2 className="text-xl font-bold mt-0">12. Changes to These Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated &quot;Last updated&quot; date. Continued use of the website after changes constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-border/50 p-6 sm:p-10">
            <h2 className="text-xl font-bold mt-0">13. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us:</p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:info@viabtech.co.tz">info@viabtech.co.tz</a></li>
              <li><strong>Phone:</strong> +255 745 700 500</li>
              <li><strong>Address:</strong> P.O.Box 105047, Ground Floor, Uhuru Heights, Bibi Titi Mohamed Rd, Dar es Salaam, Tanzania</li>
            </ul>
          </section>
        </article>
      </div>
    </main>
  );
}
