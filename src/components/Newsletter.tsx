import {useState} from 'react';
import {ArrowRight} from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSent(true);
    setEmail('');
  };

  return (
    <div className="newsletter">
      <h4>NEWSLETTER</h4>
      <p>Subscribe for exclusive offers, new arrivals and more.</p>
      <form onSubmit={submit}>
        <input type="email" value={email} onChange={(event) => {setEmail(event.target.value); setSent(false);}} placeholder="Enter your email address" aria-label="Email address" required />
        <button aria-label="Subscribe" type="submit"><ArrowRight size={18} /></button>
      </form>
      {sent && <span className="newsletter__success">Thank you. You are on the MIR list.</span>}
      <div className="payment-logos" aria-label="Accepted payments">
        <img src="/assets/payments/visa.svg" alt="Visa" />
        <img src="/assets/payments/mastercard.svg" alt="Mastercard" />
        <img src="/assets/payments/jazzcash.svg" alt="JazzCash" />
        <img src="/assets/payments/easypaisa.svg" alt="easypaisa" />
      </div>
    </div>
  );
}
