import {ArrowRight} from 'lucide-react';
import {Link} from 'react-router-dom';
import {FeatureStrip} from '../components/FeatureStrip';
import {ProductCard} from '../components/ProductCard';
import {SectionHeading} from '../components/SectionHeading';
import {TrustStrip} from '../components/TrustStrip';
import {products} from '../data/products';

export default function Home() {
  const bestSellers = products.filter((product) => product.bestSeller).slice(0, 6);

  return (
    <>
      <section className="home-hero">
        <div className="home-hero__media" aria-hidden="true">
          <img src="/assets/images/hero/mir-hero-reference.jpg" alt="" />
        </div>
        <div className="home-hero__shade" />
        <div className="container home-hero__inner">
          <div className="home-hero__copy reveal">
            <div className="hero-eyebrow"><span /> TIMELESS ELEGANCE, FOREVER YOURS <span /></div>
            <h1>A Signature of<br />Luxury &amp; <em>Elegance</em></h1>
            <p>Discover the art of fine jewellery, crafted for those who appreciate timeless beauty, exceptional quality, and meaningful moments.</p>
            <div className="hero-actions">
              <Link className="button button--gold" to="/jewellery">SHOP JEWELLERY <ArrowRight size={15} /></Link>
              <Link className="button button--outline" to="/collections">EXPLORE COLLECTIONS <ArrowRight size={15} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container home-feature-wrap"><FeatureStrip /></section>

      <section className="section section--best-sellers">
        <div className="container">
          <SectionHeading eyebrow="BEST SELLERS" title="Our Best Sellers" />
          <div className="best-seller-layout">
            <div className="best-seller-products">
              {bestSellers.map((product) => <ProductCard product={product} key={product.id} />)}
            </div>
            <aside className="mir-promise">
              <span className="mir-promise__line" />
              <h3>The <em>MIR</em> Promise</h3>
              <p>At MIR, we believe in the perfect blend of luxury, elegance and tradition. Our fine jewellery is crafted to celebrate your unique story — with timeless designs and exceptional quality, for every moment that matters.</p>
              <div className="mir-signature">MIR Team</div>
            </aside>
          </div>
          <div className="home-shop-all"><Link className="text-link" to="/jewellery">EXPLORE ALL JEWELLERY →</Link></div>
        </div>
      </section>

      <section className="container trust-wrap"><TrustStrip /></section>

      <section className="editorial-band">
        <div className="editorial-band__image"><img src="/assets/images/hero/collection-necklaces.jpg" alt="Fine jewellery by MIR" /></div>
        <div className="editorial-band__copy">
          <span>THE HOUSE OF MIR</span>
          <h2>Jewellery that becomes part of your story.</h2>
          <p>From intimate gifts to unforgettable celebrations, every MIR piece is selected to feel considered, elegant and enduring.</p>
          <Link to="/about" className="text-link">DISCOVER OUR STORY →</Link>
        </div>
      </section>
    </>
  );
}
