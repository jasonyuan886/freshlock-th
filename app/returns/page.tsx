import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Returns & Refund Policy — 60-Day Money-Back Guarantee',
  description:
    'FreshLock offers a 60-day satisfaction guarantee. Return any unused item within 60 days for a refund or exchange. 2-year warranty on the sealer unit.',
};

export default function ReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <h1 className="section-title">Returns &amp; Refund Policy</h1>
        <p className="section-subtitle">60-day satisfaction guarantee — backed by our 2-year warranty.</p>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-white rounded-xl p-8 shadow-sm space-y-6">
          <section>
            <div className="bg-accent/10 border-l-4 border-accent p-4 rounded">
              <p className="text-gray-900 font-semibold">
                🎉 60-Day Satisfaction Guarantee — If you&apos;re not completely happy with your FreshLock purchase within 60 days of delivery, we&apos;ll make it right.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">1. Return Window (Change of Mind)</h2>
            <p className="text-gray-600 leading-relaxed">
              You may return most new, unused items within <strong>60 days of delivery</strong> for a full refund or exchange, no questions asked. Items must be in their original packaging, undamaged, and in resalable condition, with all accessories and documentation included.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">2. Eligibility</h2>
            <p className="text-gray-600 leading-relaxed mb-3">To be eligible for a change-of-mind return:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Return request must be initiated within 60 days of delivery.</li>
              <li>The item must be unused, undamaged, and in its original packaging.</li>
              <li>All accessories (charging cable, user manual, included bags, etc.) must be included.</li>
              <li>Proof of purchase (order number) is required.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              <strong>Non-returnable items:</strong> Vacuum seal bags that have been opened or used (for hygiene reasons), items marked as final sale, and products damaged by misuse, accident, or unauthorized modification.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">3. How to Initiate a Return</h2>
            <ol className="list-decimal pl-6 space-y-3 text-gray-600">
              <li><strong>Email us</strong> at <a href="mailto:support@freshlocksealer.com" className="text-accent hover:underline">support@freshlocksealer.com</a> with your order number, the item(s) you wish to return, and the reason.</li>
              <li><strong>Receive approval:</strong> We will review your request and reply within 1–2 business days with a Return Merchandise Authorization (RMA) number and a US-based return address. Returns sent without an RMA may be delayed or refused.</li>
              <li><strong>Ship the item back:</strong> Pack the item securely in its original packaging and send it to the address we provide. We recommend using a trackable shipping service.</li>
              <li><strong>Inspection &amp; refund:</strong> Once we receive and inspect the returned item (typically within 5 business days), we will process your refund or exchange.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">4. Return Shipping Costs</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li><strong>Change-of-mind returns:</strong> You are responsible for the cost of return shipping. Original outbound shipping costs are non-refundable unless the return is due to our error.</li>
              <li><strong>Faulty, damaged, or incorrect items:</strong> If the item arrives defective, damaged, or is not what you ordered, we will cover all return shipping costs and provide a prepaid USPS return label — just contact us within 14 days of delivery with photos of the issue.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">5. Refund Timing</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Once your return is approved and inspected, refunds are issued to your original payment method. Typical processing times:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li><strong>Credit/Debit Cards:</strong> 5–10 business days to appear on your statement (depending on your card issuer).</li>
              <li><strong>PayPal:</strong> 3–5 business days.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">6. Exchanges</h2>
            <p className="text-gray-600 leading-relaxed">
              If you would like to exchange an item for a different product, colour, or bundle, please mention this in your email. Exchanges are subject to stock availability. If the replacement item is more expensive, you will be asked to pay the difference; if it is less expensive, we will refund the difference.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">7. Defective, Damaged or Incorrect Items</h2>
            <p className="text-gray-600 leading-relaxed">
              If you receive a defective, damaged, or incorrect item, please contact us within <strong>14 days of delivery</strong> at <a href="mailto:support@freshlocksealer.com" className="text-accent hover:underline">support@freshlocksealer.com</a> with your order number and clear photos of the issue. We will arrange a replacement, repair, or full refund at no additional cost to you, including return shipping.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">8. Warranty Claims</h2>
            <p className="text-gray-600 leading-relaxed">
              The FreshLock Pro handheld vacuum sealer is backed by a <strong>2-year warranty on the main unit</strong> and <strong>6-month warranty on accessories</strong> (USB-C cable, starter bags) against defects in materials and workmanship. Warranty claims outside the 60-day return window are handled separately — simply email us with your order number, a description of the issue, and photos or video if possible, and we will arrange repair or replacement under warranty.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">9. Your Statutory Rights</h2>
            <p className="text-gray-600 leading-relaxed">
              Our returns policy does not exclude, restrict, or modify any non-excludable statutory rights or remedies you may have under applicable consumer protection laws, including your right to a repair, replacement, or refund for a major failure and compensation for any other reasonably foreseeable loss or damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3">10. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">To start a return or ask a question about our policy:</p>
            <p className="text-gray-600 leading-relaxed mt-3">
              <strong>Email:</strong> <a href="mailto:support@freshlocksealer.com" className="text-accent hover:underline">support@freshlocksealer.com</a><br />
              <strong>Response time:</strong> Within 24 hours on business days (Mon–Fri, 9am–5pm ET)
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
