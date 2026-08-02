export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="section-title mb-8">Privacy Policy</h1>

      <div className="prose prose-lg max-w-none">
        <div className="bg-white rounded-xl p-8 shadow-sm space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              FreshLock (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates the website www.freshlocksealer.com and is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website, make a purchase, or interact with our services.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              We comply with applicable data protection laws for our customers worldwide, including the General Data Protection Regulation (GDPR) for customers in the European Economic Area and other regional privacy requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">2. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed mb-3">We may collect the following categories of information:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li><strong>Personal Information:</strong> Name, email address, phone number, shipping address, and billing address provided when you place an order, create an account, or contact us.</li>
              <li><strong>Payment Information:</strong> PayPal account information and any card details entered during checkout. Payment is processed securely by PayPal; we do not store full card numbers on our servers.</li>
              <li><strong>Order Information:</strong> Purchase history, order details, product preferences, and correspondence related to your orders.</li>
              <li><strong>Technical Information:</strong> IP address, browser type and version, device type and operating system, referring URLs, pages visited, time spent on pages, and other diagnostic data collected automatically when you use the site.</li>
              <li><strong>Communication Data:</strong> Emails, form submissions, chat messages, or other correspondence with our support team.</li>
              <li><strong>Marketing Preferences:</strong> Whether you have opted in to receive marketing emails, and your interaction with those emails.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">3. How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed mb-3">We use your personal information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>To process, fulfil, and track your orders, including sending order confirmations and shipping notifications.</li>
              <li>To provide customer support and respond to your enquiries.</li>
              <li>To send marketing communications about our products, offers, and updates — <strong>only if you have opted in</strong>. You can unsubscribe at any time.</li>
              <li>To improve our website, products, and user experience based on usage patterns and feedback.</li>
              <li>To prevent fraud, enforce our Terms of Service, and comply with legal obligations.</li>
              <li>To conduct analytics and measure site performance.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">4. Cookies and Similar Technologies</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Our website uses cookies and similar tracking technologies to enhance your browsing experience. Cookies are small text files stored on your device that help us:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li><strong>Essential cookies:</strong> Required for core functionality such as the shopping cart, checkout process, and remembering your preferences.</li>
              <li><strong>Analytics cookies:</strong> Google Analytics (and similar tools) collect anonymised data about how visitors use the site, which helps us improve performance and content.</li>
              <li><strong>Marketing/advertising cookies:</strong> Used (with your consent) to deliver relevant ads and measure campaign effectiveness on platforms such as Google Ads, Meta, and TikTok.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              You can control or disable cookies through your browser settings. Please note that disabling essential cookies may affect the functionality of our shop (for example, you may not be able to add items to your cart or complete checkout).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">5. Third-Party Services We Use</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              We share limited information with trusted third-party service providers who help us operate our website and serve you:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li><strong>Vercel:</strong> Hosting and content delivery platform that serves our website. Processes IP address and technical data for security and performance.</li>
              <li><strong>Google Analytics:</strong> Website traffic and usage analysis. Data is anonymised where possible. You can opt out via Google&rsquo;s browser add-on.</li>
              <li><strong>PayPal:</strong> Payment processing provider that handles payment card data securely.</li>
              <li><strong>Shipping carriers and fulfilment partners:</strong> To deliver your orders; they receive your name, shipping address, and contact details for delivery purposes only.</li>
              <li><strong>Email service providers:</strong> To send transactional emails (order confirmations, shipping updates) and marketing emails (if you have subscribed).</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              We do <strong>not</strong> sell your personal information to any third party.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">6. Data Sharing and Disclosure</h2>
            <p className="text-gray-600 leading-relaxed mb-3">In addition to the service providers listed above, we may disclose your information:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>When required by law, court order, or government request.</li>
              <li>To protect our rights, property, or safety, or those of our customers or the public.</li>
              <li>In connection with a merger, acquisition, financing, or sale of business assets, in which case customer information would be transferred subject to appropriate confidentiality protections.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">7. Data Retention</h2>
            <p className="text-gray-600 leading-relaxed">
              We retain personal information only for as long as necessary to fulfil the purposes for which it was collected, including order fulfilment, warranty support, legal and accounting requirements, and fraud prevention. Order records are generally retained for up to 7 years for tax and legal compliance. Marketing list data is retained until you unsubscribe.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">8. Data Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We implement industry-standard security measures including SSL/TLS encryption for all website traffic, secure payment processing through PCI-DSS compliant providers, restricted access to personal data, and regular security monitoring. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">9. International Data Transfers</h2>
            <p className="text-gray-600 leading-relaxed">
              Some of our third-party service providers (such as cloud hosting, payment processing and analytics platforms) may process data in different jurisdictions, including the United States and other countries. We take steps to ensure such transfers comply with applicable law and that your information receives an adequate level of protection.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">10. Your Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-3">Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Access the personal information we hold about you.</li>
              <li>Request correction of inaccurate or incomplete information.</li>
              <li>Request deletion of your personal data (subject to legal retention obligations).</li>
              <li>Object to or restrict certain types of processing.</li>
              <li>Opt out of marketing communications at any time (use the &ldquo;unsubscribe&rdquo; link in any marketing email).</li>
              <li>Lodge a complaint with your local data protection authority.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              To exercise any of these rights, please contact us using the details below. We will respond within a reasonable timeframe, generally within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">11. Children&rsquo;s Privacy</h2>
            <p className="text-gray-600 leading-relaxed">
              Our website is not directed to children under the age of 18, and we do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us so we can remove it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">12. Changes to This Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or service providers. Any changes will be posted on this page with an updated effective date. Your continued use of the site after changes take effect constitutes acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">13. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              For privacy-related enquiries, to exercise your rights, or to raise a concern, please contact us at:
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              <strong>Email:</strong> <a href="mailto:support@freshlocksealer.com" className="text-accent hover:underline">support@freshlocksealer.com</a><br />
              <strong>Response time:</strong> Within 24 hours on business days
            </p>
          </section>

          <p className="text-sm text-gray-500 mt-8 pt-6 border-t">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  );
}
