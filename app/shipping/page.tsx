import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Policy — Delivery Times, Costs & Tracking',
  description:
    'FreshLock shipping policy: free US/CA/UK/JP shipping on orders over $89 (AU/NZ over $69), Starter Kits ship free worldwide, $5.99 flat rate under threshold, 5–8 day DHL Express delivery with tracking.',
};

export default function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="section-title">Shipping Policy</h1>
        <p className="section-subtitle">
          Transparent rates, real tracking, and 1–2 business day processing.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2>Processing Time</h2>
        <p>
          All orders are processed within <strong>1–2 business days</strong> (Monday–Friday, excluding major holidays). Orders placed after 2 PM ET on business days will begin processing the next business day. You will receive an order confirmation immediately, and a shipping confirmation with tracking number once your package leaves our fulfilment centre.
        </p>

        <h2>Shipping Rates (United States & Canada)</h2>
        <ul>
          <li><strong>Free standard shipping</strong> on all US & CA orders over <strong>$89 USD</strong> (discount applied automatically at checkout).</li>
          <li>US & CA orders under $89 ship for a <strong>flat rate of $5.99</strong>.</li>
          <li>All <strong>Starter Kits ship free</strong> within US/CA/UK/JP regardless of subtotal.</li>
          <li>Delivered via USPS First Class / Priority Mail or equivalent tracked postal service.</li>
          <li><strong>Transit time:</strong> 5–8 business days via DHL Express after dispatch (continental US; Alaska, Hawaii, and US territories may take 7–14 days).</li>
        </ul>

        <h2>UK, EU & Japan</h2>
        <p>
          Free standard shipping on UK & JP orders over <strong>$89</strong>. EU and other international orders under the threshold pay live rates calculated at checkout based on destination and package weight. Typical transit time is 7–18 business days depending on destination and customs clearance.
        </p>

        <h2>Australia & New Zealand</h2>
        <p>
          Free standard shipping on AU & NZ orders over <strong>$69</strong>. Orders under the threshold ship at live rates calculated at checkout.
        </p>

        <h2>Other Destinations</h2>
        <p>
          We also ship to the EU and most other countries worldwide. Shipping rates for international destinations are calculated live at checkout based on destination and package weight. Typical transit times are 7–18 business days depending on destination and customs clearance.
        </p>
        <p>
          Japanese customers: please visit <a href="https://jp.freshlocksealer.com/shipping" className="text-accent hover:underline">FreshLock Japan</a> for JPY pricing and local Japanese support.
        </p>

        <h2>Customs, Duties & Taxes</h2>
        <p>
          International orders may be subject to import duties, taxes, or customs fees levied by the destination country. These charges are the responsibility of the customer and are not included in our shipping charges. Please check with your local customs office for estimates before ordering.
        </p>

        <h2>Tracking</h2>
        <p>
          Every order ships with a <strong>tracking number</strong>. You will receive an email with tracking information as soon as your order is dispatched. If you do not receive a tracking email within 3 business days of ordering, please contact us at <a href="mailto:support@freshlocksealer.com" className="text-accent hover:underline">support@freshlocksealer.com</a>.
        </p>

        <h2>Lost or Damaged Packages</h2>
        <p>
          If your package arrives damaged or appears to be lost in transit, please contact us within 7 days of the estimated delivery date at <a href="mailto:support@freshlocksealer.com" className="text-accent hover:underline">support@freshlocksealer.com</a>. We will work with the carrier to resolve the issue and, where applicable, ship a replacement at no extra cost.
        </p>

        <h2>PO Boxes & APO/FPO</h2>
        <p>
          We ship to PO boxes and APO/FPO addresses via USPS. Delivery to APO/FPO addresses may take longer due to military postal routing.
        </p>

        <h2>Contact Us</h2>
        <p>
          For shipping questions, email <a href="mailto:support@freshlocksealer.com" className="text-accent hover:underline">support@freshlocksealer.com</a>. We respond within 24 hours on business days.
        </p>
      </div>
    </div>
  );
}
