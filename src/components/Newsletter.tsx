import {ArrowRight} from 'lucide-react';

export function Newsletter() {
  return (
    <div className="newsletter">
      <h4>NEWSLETTER</h4>
      <p>Newsletter signup will be enabled after the client connects an approved Shopify-supported email channel.</p>
      <div className="newsletter__placeholder" role="status">
        <span>Signup pending configuration</span>
        <ArrowRight size={18} aria-hidden="true" />
      </div>
      <div className="payment-logos" aria-label="Accepted payments">
        <img src="/assets/payments/visa.svg" alt="Visa" />
        <img src="/assets/payments/mastercard.svg" alt="Mastercard" />
        <img src="/assets/payments/jazzcash.svg" alt="JazzCash" />
        <img src="/assets/payments/easypaisa.svg" alt="easypaisa" />
      </div>
    </div>
  );
}
