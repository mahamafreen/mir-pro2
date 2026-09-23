import {ArrowRight} from 'lucide-react';
import {Link} from 'react-router-dom';
import {PageHero} from '../components/PageHero';
import {ProductCard} from '../components/ProductCard';
import {collections} from '../data/products';
import {shopifyCatalogService} from '../services/catalogService';
import type {Product} from '../types/product';
import {useEffect, useState} from 'react';

export default function Collections() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    shopifyCatalogService.getProducts()
      .then(setProducts)
      .catch(() => { setError(true); })
      .finally(() => setLoading(false));
  }, []);

  let productContent;
  if (loading) productContent = <div className="empty-state"><h2>Loading jewellery...</h2></div>;
  else if (error) productContent = <div className="empty-state"><h2>Jewellery is temporarily unavailable.</h2></div>;
  else if (!products.length) productContent = <div className="empty-state"><h2>No jewellery available yet.</h2></div>;
  else productContent = products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />);

  return (
    <>
      <PageHero eyebrow="CURATED BY MIR" title="Collections" description="Distinct expressions of the MIR aesthetic, from timeless heritage forms to modern evening jewellery." />
      <section className="section">
        <div className="container collections-grid">
          {collections.map((collection, index) => (
            <Link className={`collection-tile collection-tile--${(index % 2) + 1}`} to={`/jewellery?collection=${collection.id}`} key={collection.id}>
              <img src={collection.image} alt="" />
              <div className="collection-tile__shade" />
              <div className="collection-tile__copy">
                <span>{collection.eyebrow}</span>
                <h2>{collection.title}</h2>
                <p>{collection.description}</p>
                <b>EXPLORE COLLECTION <ArrowRight size={15} /></b>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="section section--surface">
        <div className="container">
          <div className="collection-feature-head">
            <div><span>THE EDIT</span><h2>Selected for the season.</h2></div>
            <Link to="/jewellery" className="text-link">VIEW ALL →</Link>
          </div>
          <div className="product-grid product-grid--four">
            {productContent}
          </div>
        </div>
      </section>
    </>
  );
}
