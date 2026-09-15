import {Diamond, Gift, ShieldCheck, Sparkles} from 'lucide-react';
import {Link} from 'react-router-dom';
import {PageHero} from '../components/PageHero';

const values = [
  {icon: Diamond, title: 'Considered Craft', text: 'A refined approach to proportion, detail, finish and wearability.'},
  {icon: Sparkles, title: 'Timeless Beauty', text: 'Pieces selected to feel relevant beyond a single season or celebration.'},
  {icon: ShieldCheck, title: 'Care & Confidence', text: 'Thoughtful presentation, clear care guidance and attentive service.'},
  {icon: Gift, title: 'Meaningful Moments', text: 'Jewellery made to accompany gifting, milestones and family celebrations.'},
];

export default function About() {
  return (
    <>
      <PageHero eyebrow="THE HOUSE OF MIR" title="Our Story" description="A contemporary jewellery house shaped by timeless elegance, Pakistani celebration and an appreciation for detail." />
      <section className="section about-story" id="story">
        <div className="container about-story__grid">
          <div className="about-story__image"><img src="/assets/images/hero/about-craft.jpg" alt="MIR jewellery craftsmanship" /></div>
          <div className="about-story__copy">
            <span>TIMELESS, BY DESIGN</span>
            <h2>Jewellery should feel personal before it feels precious.</h2>
            <p>MIR Private Limited brings together a love of elegant occasion jewellery, refined presentation and a modern sense of luxury. The collection is designed around pieces that feel memorable without becoming excessive — jewellery with presence, proportion and a lasting point of view.</p>
            <p>From bridal celebrations to intimate gifts, we approach every piece as part of a larger story: how it is worn, how it is remembered and how beautifully it is presented.</p>
            <Link className="text-link" to="/collections">EXPLORE THE COLLECTIONS →</Link>
          </div>
        </div>
      </section>
      <section className="section section--surface">
        <div className="container">
          <div className="values-intro"><span>OUR PRINCIPLES</span><h2>Luxury, with intention.</h2></div>
          <div className="values-grid">
            {values.map(({icon: Icon, title, text}) => (
              <article key={title}><div><Icon size={24} strokeWidth={1.35} /></div><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </div>
      </section>
      <section className="about-care" id="care">
        <div className="container about-care__grid">
          <div><span>JEWELLERY CARE</span><h2>Preserve the beauty.</h2></div>
          <div>
            <p>Apply perfume, hair products and lotions before putting on your jewellery.</p>
            <p>Keep pieces dry and gently wipe them with a soft cloth after wear.</p>
            <p>Store jewellery separately to help prevent scratches, tangling and unnecessary friction.</p>
          </div>
        </div>
      </section>
      <section className="section" id="shipping">
        <div className="container policy-grid">
          <article id="faq"><span>DELIVERY & RETURNS</span><h3>Made to arrive beautifully.</h3><p>Orders above PKR 5,000 qualify for complimentary delivery. Eligible unworn pieces may be returned within 7 days, subject to the store return conditions.</p></article>
          <article id="terms"><span>CARE & AUTHENTICITY</span><h3>Confidence in every detail.</h3><p>Product materials, finish and care guidance are clearly presented on each product page so customers can make informed selections.</p></article>
        </div>
      </section>
    </>
  );
}
