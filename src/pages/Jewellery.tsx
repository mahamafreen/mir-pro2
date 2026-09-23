import {useEffect, useState} from 'react';
import {SlidersHorizontal} from 'lucide-react';
import {useSearchParams} from 'react-router-dom';
import {PageHero} from '../components/PageHero';
import {ProductCard} from '../components/ProductCard';
import {shopifyCatalogService} from '../services/catalogService';
import type {Product} from '../types/product';

const categories = ['All', 'Necklaces', 'Earrings', 'Rings', 'Bracelets', 'Pendants'] as const;

const sorts = [
  ['featured', 'Featured'],
  ['newest', 'Newest'],
  ['price-low', 'Price: Low to High'],
  ['price-high', 'Price: High to Low'],
  ['rating', 'Highest Rated'],
];

export default function Jewellery() {
  const [params, setParams] = useSearchParams();
  const category = params.get('category') || 'All';
  const collection = params.get('collection') || '';
  const sort = params.get('sort') || 'featured';
  const query = params.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    shopifyCatalogService.getProducts({category, collection, search: query})
      .then((items) => { if (active) setProducts(items); })
      .catch(() => { if (active) setError(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [category, collection, query]);

  const filtered = [...products].sort((a, b) => {
    if (sort === 'price-low') return a.price - b.price;
    if (sort === 'price-high') return b.price - a.price;
    if (sort === 'rating') return b.rating - a.rating;
    if (sort === 'newest') return Number(b.newArrival) - Number(a.newArrival);
    return Number(b.bestSeller) - Number(a.bestSeller);
  });

  let productContent;
  if (loading) {
    productContent = <div className="empty-state"><h2>Loading jewellery...</h2><p>Bringing the latest MIR pieces into view.</p></div>;
  } else if (error) {
    productContent = <div className="empty-state"><h2>We could not load the jewellery.</h2><p>Please try again in a moment.</p><button className="button button--outline" onClick={() => window.location.reload()}>TRY AGAIN</button></div>;
  } else if (filtered.length) {
    productContent = <div className="product-grid">{filtered.map((product) => <ProductCard product={product} key={product.id} />)}</div>;
  } else {
    productContent = <div className="empty-state"><h2>No pieces found.</h2><p>Try another category or clear the current filters.</p><button className="button button--outline" onClick={() => setParams({})}>VIEW ALL JEWELLERY</button></div>;
  }

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if ((key === 'category' && value === 'All') || (key === 'sort' && value === 'featured')) next.delete(key);
    else next.set(key, value);
    setParams(next);
  };

  const clearContext = () => {
    const next = new URLSearchParams(params);
    next.delete('q');
    next.delete('collection');
    setParams(next);
  };

  return (
    <>
      <PageHero
        eyebrow="MIR FINE JEWELLERY"
        title={collection ? `${collection[0].toUpperCase()}${collection.slice(1)} Collection` : 'Fine Jewellery'}
        description="Discover timeless necklaces, earrings, rings, bracelets and pendants designed for celebrations, gifting and elegant everyday wear."
      />

      <section className="section collection-section">
        <div className="container">
          {(query || collection) && (
            <div className="search-results-note">
              <span>{query ? 'Search results for' : 'Viewing collection'}</span>
              <strong>“{query || collection}”</strong>
              <button onClick={clearContext}>CLEAR</button>
            </div>
          )}

          <div className="filter-bar">
            <div className="category-tabs" aria-label="Product categories">
              {categories.map((item) => (
                <button key={item} className={category === item ? 'is-active' : ''} onClick={() => setParam('category', item)}>{item}</button>
              ))}
            </div>
            <label className="sort-select">
              <SlidersHorizontal size={15} />
              <span>SORT</span>
              <select value={sort} onChange={(event) => setParam('sort', event.target.value)}>
                {sorts.map(([value, label]) => <option value={value} key={value}>{label}</option>)}
              </select>
            </label>
          </div>

          <div className="collection-meta"><span>{filtered.length} PIECES</span><span>Complimentary delivery over PKR 5,000</span></div>

          {productContent}
        </div>
      </section>
    </>
  );
}
