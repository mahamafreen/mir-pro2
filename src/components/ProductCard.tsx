import {useState} from 'react';
import {Check, ShoppingBag} from 'lucide-react';
import {Link} from 'react-router-dom';
import {useCart} from '../context/CartContext';
import type {Product} from '../types/product';
import {formatPKR} from '../utils/currency';
import {Rating} from './Rating';

export function ProductCard({product}: {product: Product}) {
  const {addItem} = useCart();
  const [added, setAdded] = useState(false);

  const addToCart = () => {
    addItem(product.id, 1, product.variants[0]?.id);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="product-card">
      <Link to={`/product/${product.handle}`} className="product-card__link" aria-label={`View ${product.title}`}>
        <div className="product-card__image-wrap">
          <img className="product-card__image" src={product.image} alt={product.title} loading="lazy" />
          <div className="product-card__badges">
            {product.newArrival && <span>NEW</span>}
            {product.compareAtPrice && <span>LIMITED</span>}
          </div>
          <span className="product-card__view">VIEW PIECE</span>
        </div>
      </Link>
      <div className="product-card__body">
        <div className="product-card__copy">
          <Link to={`/product/${product.handle}`}><h3>{product.title}</h3></Link>
          <p>{product.material}</p>
          <Rating value={product.rating} compact />
          <div className="product-card__price-row">
            <strong>{formatPKR(product.price)}</strong>
            {product.compareAtPrice && <del>{formatPKR(product.compareAtPrice)}</del>}
          </div>
        </div>
        <button className={`product-card__cart${added ? ' product-card__cart--added' : ''}`} onClick={addToCart} aria-label={`Add ${product.title} to cart`}>
          {added ? <Check size={15} /> : <ShoppingBag size={15} />}
        </button>
      </div>
    </article>
  );
}
