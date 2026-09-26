import {useEffect, useState} from 'react';
import {ChevronDown, Heart, PackageCheck, ShieldCheck, Truck} from 'lucide-react';
import {useNavigate, useParams} from 'react-router-dom';
import {Breadcrumbs} from '../components/Breadcrumbs';
import {ProductCard} from '../components/ProductCard';
import {ProductGallery} from '../components/ProductGallery';
import {QuantitySelector} from '../components/QuantitySelector';
import {Rating} from '../components/Rating';
import {useCart} from '../context/CartContext';
import {shopifyCatalogService} from '../services/catalogService';
import type {Product} from '../types/product';
import {formatPKR} from '../utils/currency';

export default function ProductPage() {
  const {id} = useParams();
  const [product, setProduct] = useState<Product>();
  const [related, setRelated] = useState<Product[]>([]);
  const [productLoading, setProductLoading] = useState(true);
  const [error, setError] = useState(false);
  const {addItem, loading, error: cartError} = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [variantId, setVariantId] = useState(product?.variants[0]?.id ?? '');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let active = true;
    setProductLoading(true);
    setError(false);
    setQuantity(1);
    shopifyCatalogService.getProduct(id ?? '')
      .then(async (item) => {
        if (!active) return;
        setProduct(item);
        setVariantId(item?.variants[0]?.id ?? '');
        if (item) {
          const relatedProducts = await shopifyCatalogService.getProducts({category: item.category});
          if (active) setRelated(relatedProducts.filter((relatedItem) => relatedItem.id !== item.id).slice(0, 4));
        } else {
          setRelated([]);
        }
      })
      .catch(() => { if (active) setError(true); })
      .finally(() => { if (active) setProductLoading(false); });
    return () => { active = false; };
  }, [id]);

  if (productLoading) {
    return <section className="section"><div className="container empty-state"><h1>Loading piece...</h1><p>Bringing the MIR details into view.</p></div></section>;
  }

  if (error) {
    return <section className="section"><div className="container empty-state"><h1>We could not load this piece.</h1><p>Please try again in a moment.</p><button className="button button--gold" onClick={() => window.location.reload()}>TRY AGAIN</button></div></section>;
  }

  if (!product) {
    return (
      <section className="section">
        <div className="container empty-state">
          <h1>Piece not found.</h1>
          <button className="button button--gold" onClick={() => navigate('/jewellery')}>VIEW JEWELLERY</button>
        </div>
      </section>
    );
  }

  const add = async () => {
    try {
      await addItem(product.id, quantity, variantId);
      setAdded(true);
      window.setTimeout(() => setAdded(false), 1500);
    } catch { return; }
  };

  const buyNow = async () => {
    try {
      await addItem(product.id, quantity, variantId);
      navigate('/cart');
    } catch { return; }
  };

  const variantGroups = product.variants.reduce<Record<string, typeof product.variants>>((acc, variant) => {
    acc[variant.name] ||= [];
    acc[variant.name].push(variant);
    return acc;
  }, {});

  return (
    <>
      <section className="product-page">
        <div className="container">
          <Breadcrumbs items={[
            {label: 'Home', to: '/'},
            {label: 'Jewellery', to: '/jewellery'},
            {label: product.category, to: `/jewellery?category=${product.category}`},
            {label: product.title},
          ]} />

          <div className="product-detail-grid">
            <ProductGallery images={product.images} title={product.title} />

            <div className="product-info">
              <span className="product-info__collection">{product.collection.toUpperCase()} COLLECTION</span>
              <h1>{product.title}</h1>
              <Rating value={product.rating} count={product.reviewCount} />
              <div className="product-info__price">
                <strong>{formatPKR(product.price)}</strong>
                {product.compareAtPrice && <del>{formatPKR(product.compareAtPrice)}</del>}
              </div>
              <p className="product-info__intro">{product.shortDescription}</p>

              <div className="product-info__meta">
                <div><span>MATERIAL</span><b>{product.material}</b></div>
                <div><span>FINISH</span><b>{product.finish}</b></div>
              </div>

              {Object.entries(variantGroups).map(([name, variants]) => (
                <div className="variant-group" key={name}>
                  <div className="variant-group__head">
                    <span>{name.toUpperCase()}</span>
                    {name === 'Size' && <button type="button">SIZE GUIDE</button>}
                  </div>
                  <div className="variant-options">
                    {variants.map((variant) => (
                      <button key={variant.id} disabled={!variant.available} onClick={() => setVariantId(variant.id)} className={variantId === variant.id ? 'is-active' : ''}>
                        {variant.value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="purchase-row">
                <QuantitySelector value={quantity} onChange={setQuantity} />
                <button className="button button--gold button--grow" onClick={add} disabled={loading || !product.available || !variantId}>{added ? 'ADDED TO CART ✓' : 'ADD TO CART'}</button>
                <button className="wish-button" aria-label="Add to wishlist"><Heart size={20} strokeWidth={1.4} /></button>
              </div>
              <button className="button button--outline button--full" onClick={buyNow} disabled={loading || !product.available || !variantId}>BUY NOW</button>
              {cartError && <p className="form-success" role="alert">{cartError}</p>}

              <div className="product-assurances">
                <div><Truck size={19} /><span><b>Complimentary delivery</b> on orders above PKR 5,000</span></div>
                <div><PackageCheck size={19} /><span><b>7 day returns</b> for eligible unworn pieces</span></div>
                <div><ShieldCheck size={19} /><span><b>Secure payment</b> through trusted payment methods</span></div>
              </div>

              <div className="product-accordions">
                <details open>
                  <summary>DESCRIPTION <ChevronDown size={16} /></summary>
                  <p>{product.description}</p>
                </details>
                <details>
                  <summary>PRODUCT DETAILS <ChevronDown size={16} /></summary>
                  <ul>{product.details.map((item) => <li key={item}>{item}</li>)}</ul>
                </details>
                <details>
                  <summary>JEWELLERY CARE <ChevronDown size={16} /></summary>
                  <ul>{product.care.map((item) => <li key={item}>{item}</li>)}</ul>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--related">
          <div className="container">
            <div className="related-heading"><span>YOU MAY ALSO LIKE</span><h2>Complete the story.</h2></div>
            <div className="product-grid product-grid--four">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
