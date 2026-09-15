import {useState} from 'react';
import {Clock3, Mail, MessageCircle, Send} from 'lucide-react';
import {PageHero} from '../components/PageHero';

export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero eyebrow="MIR CONCIERGE" title="Contact Us" description="Our team is here to assist with product selection, gifting, sizing, delivery and order enquiries." />
      <section className="section contact-section">
        <div className="container contact-grid">
          <div className="contact-image">
            <img src="/assets/images/hero/contact-showroom.jpg" alt="MIR fine jewellery" />
            <div className="contact-image__caption"><span>A PERSONAL SERVICE</span><h2>For the moments that deserve a little more attention.</h2></div>
          </div>
          <div className="contact-form-wrap">
            <span className="contact-form-wrap__eyebrow">SEND AN ENQUIRY</span>
            <h2>How may we assist you?</h2>
            <p>Share a few details and the MIR team can guide you toward the right piece or help with an existing order.</p>
            <form className="contact-form" onSubmit={(event) => {event.preventDefault(); setSent(true); event.currentTarget.reset();}}>
              <div className="form-row"><label>FIRST NAME<input required name="firstName" /></label><label>LAST NAME<input required name="lastName" /></label></div>
              <label>EMAIL ADDRESS<input required type="email" name="email" /></label>
              <label>PHONE NUMBER<input type="tel" name="phone" placeholder="+92" /></label>
              <label>ENQUIRY TYPE<select name="type" defaultValue="Product enquiry"><option>Product enquiry</option><option>Order support</option><option>Gifting</option><option>Returns & delivery</option><option>Other</option></select></label>
              <label>MESSAGE<textarea required rows={5} name="message" /></label>
              <button className="button button--gold button--full" type="submit">SEND ENQUIRY <Send size={15} /></button>
              {sent && <div className="form-success">Thank you. Your enquiry has been received.</div>}
            </form>
            <div className="contact-channels">
              <div><Mail size={19} /><span><b>Email Concierge</b><small>Use the enquiry form for product and order assistance.</small></span></div>
              <div><MessageCircle size={19} /><span><b>Customer Care</b><small>Support details can be connected to your preferred channel.</small></span></div>
              <div><Clock3 size={19} /><span><b>Response Time</b><small>Enquiries are handled by the MIR customer care team.</small></span></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
