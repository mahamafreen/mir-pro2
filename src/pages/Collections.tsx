import {ArrowRight} from 'lucide-react';
import {Link} from 'react-router-dom';
import {PageHero} from '../components/PageHero';
import {ProductCard} from '../components/ProductCard';
import {shopifyCatalogService} from '../services/catalogService';
import type {Collection, Product} from '../types/product';
import {useEffect, useState} from 'react';

export default function Collections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [collectionsLoading, setCollectionsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [collectionsError, setCollectionsError] = useState(false);

  useEffect(() => {
    shopifyCatalogService.getProducts()
      .then(setProducts)
      .catch(() => { setError(true); })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    shopifyCatalogService.getCollections()
      .then(setCollections)
      .catch(() => setCollectionsError(true))
      .finally(() => setCollectionsLoading(false));
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
          {collectionsLoading && <div className="empty-state collections-empty"><h2>Loading collections...</h2><p>Bringing the latest MIR edits into view.</p></div>}
          {!collectionsLoading && (collectionsError || !collections.length) && <div className="empty-state collections-empty"><h2>{collectionsError ? 'Collections are temporarily unavailable.' : 'No collections available yet.'}</h2><p>Check back soon for the latest MIR edits.</p></div>}
          {!collectionsLoading && !collectionsError && collections.map((collection, index) => {
            const handle = collection.handle ?? collection.id;
            return (
              <Link className={`collection-tile collection-tile--${(index % 2) + 1}${collection.image ? '' : ' collection-tile--empty'}`} to={`/collections/${handle}`} key={collection.id}>
                {collection.image && <img src={collection.image} alt={collection.title} />}
                <div className="collection-tile__shade" />
                <div className="collection-tile__copy">
                  <span>{collection.eyebrow}</span>
                  <h2>{collection.title}</h2>
                  <p>{collection.description}</p>
                  <b>EXPLORE COLLECTION <ArrowRight size={15} /></b>
                </div>
              </Link>
            );
          })}
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
