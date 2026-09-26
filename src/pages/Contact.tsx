import {Phone} from 'lucide-react';
import {PageHero} from '../components/PageHero';
import {SocialLinks} from '../components/SocialLinks';

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
            <div className="contact-channels">
              <div>
                <Phone size={19} aria-hidden="true" />
                <span>
                  <b>Customer Care</b>
                  <small><a href="tel:03338228103">0333 8228103</a></small>
                </span>
              </div>
            </div>
            <h3 className="contact-social-heading">Follow MIR</h3>
            <SocialLinks className="footer-socials" />
          </div>
        </div>
      </section>
    </>
  );
}
