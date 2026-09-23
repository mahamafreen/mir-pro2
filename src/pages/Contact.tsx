import {Clock3, Mail, MessageCircle} from 'lucide-react';
import {PageHero} from '../components/PageHero';

export default function Contact() {
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
            <span className="contact-form-wrap__eyebrow">CUSTOMER CARE</span>
            <h2>How may we assist you?</h2>
            <p>Approved email, phone, address and social details will be displayed here once supplied by the client.</p>
            <div className="contact-placeholder" role="status">Contact channels pending client information.</div>
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
