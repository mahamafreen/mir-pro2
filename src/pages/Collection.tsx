import {ArrowRight} from 'lucide-react';
import {Link, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {PageHero} from '../components/PageHero';
import {ProductCard} from '../components/ProductCard';
import {shopifyCatalogService} from '../services/catalogService';
import type {Collection as CollectionData} from '../types/product';

export default function CollectionPage() {
  const {handle = ''} = useParams();
  const [collection, setCollection] = useState<CollectionData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    setCollection(undefined);
    shopifyCatalogService.getCollection(handle)
      .then((item) => { if (active) setCollection(item); })
      .catch(() => { if (active) setError(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [handle]);

  if (loading) {
    return <section className="section"><div className="container empty-state"><h1>Loading collection...</h1><p>Bringing this MIR edit into view.</p></div></section>;
  }

  if (error || !collection) {
    return <section className="section"><div className="container empty-state"><h1>{error ? 'Collection unavailable.' : 'Collection not found.'}</h1><p>We could not find that MIR collection.</p><Link className="button button--outline" to="/collections">VIEW COLLECTIONS <ArrowRight size={15} /></Link></div></section>;
  }

  const products = collection.products ?? [];

  return (
    <>
      <PageHero eyebrow={collection.eyebrow} title={collection.title} description={collection.description} />
      {collection.image && <div className="collection-detail-banner"><img src={collection.image} alt={collection.title} /></div>}
      <section className="section collection-section">
        <div className="container">
          <div className="collection-feature-head">
            <div><span>THE COLLECTION</span><h2>{products.length ? `${products.length} pieces to discover.` : 'A considered edit.'}</h2></div>
            <Link to="/collections" className="text-link">ALL COLLECTIONS <ArrowRight size={15} /></Link>
          </div>
          {products.length ? <div className="product-grid product-grid--four">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state"><h2>This collection is being prepared.</h2><p>There are no products in this collection yet.</p></div>}
        </div>
      </section>
    </>
  );
}