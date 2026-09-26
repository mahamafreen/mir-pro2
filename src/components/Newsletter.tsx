import {ArrowRight} from 'lucide-react';
import {getShopifyNewsletterSignupUrl} from '../services/shopifyStorefrontClient';

export function Newsletter() {
  const signupUrl = getShopifyNewsletterSignupUrl();

  return (
    <div className="newsletter">
      <h4>NEWSLETTER</h4>
      {signupUrl ? (
        <>
          <p>Sign up through Shopify's hosted newsletter form.</p>
          <a className="newsletter__placeholder newsletter__signup-link" href={signupUrl}>
            <span>OPEN SHOPIFY SIGNUP</span>
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </>
      ) : (
        <>
          <p>Newsletter signup is unavailable until the Shopify store is configured.</p>
          <output className="newsletter__placeholder">
            <span>Signup pending configuration</span>
            <ArrowRight size={18} aria-hidden="true" />
          </output>
        </>
      )}
      <div className="payment-logos" aria-label="Accepted payments">
        <img src="/assets/payments/visa.svg" alt="Visa" />
        <img src="/assets/payments/mastercard.svg" alt="Mastercard" />
        <img src="/assets/payments/jazzcash.svg" alt="JazzCash" />
        <img src="/assets/payments/easypaisa.svg" alt="easypaisa" />
      </div>
    </div>
  );
}
