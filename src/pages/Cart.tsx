import {ArrowLeft, LockKeyhole, Trash2} from 'lucide-react';
import {Link} from 'react-router-dom';
import {Breadcrumbs} from '../components/Breadcrumbs';
import {QuantitySelector} from '../components/QuantitySelector';
import {TrustStrip} from '../components/TrustStrip';
import {useCart} from '../context/CartContext';
import {formatPKR} from '../utils/currency';

const FREE_SHIPPING = 5000;

export default function Cart() {
  const {lines, subtotal, updateQuantity, removeItem, clearCart} = useCart();
  const shipping = subtotal > 0 && subtotal < FREE_SHIPPING ? 450 : 0;
  const total = subtotal + shipping;
  const progress = Math.min(100, (subtotal / FREE_SHIPPING) * 100);

  return (
    <>
      <section className="cart-page">
        <div className="container">
          <Breadcrumbs items={[{label: 'Home', to: '/'}, {label: 'Shopping Bag'}]} />
          <div className="cart-title">
            <div><span>YOUR SELECTION</span><h1>Shopping Bag</h1></div>
            {lines.length > 0 && <button onClick={clearCart}>CLEAR BAG</button>}
          </div>

          {lines.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty__monogram">MIR</div>
              <h2>Your shopping bag is waiting.</h2>
              <p>Discover jewellery selected for timeless moments and thoughtful gifting.</p>
              <Link className="button button--gold" to="/jewellery">EXPLORE JEWELLERY</Link>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-lines">
                <div className="shipping-progress">
                  <div className="shipping-progress__copy">
                    {subtotal >= FREE_SHIPPING ? <strong>Complimentary delivery unlocked.</strong> : <span>Add <b>{formatPKR(FREE_SHIPPING - subtotal)}</b> more for complimentary delivery.</span>}
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div><i style={{width: `${progress}%`}} /></div>
                </div>

                {lines.map((line) => {
                  const variant = line.product.variants.find((item) => item.id === line.variantId);
                  return (
                    <article className="cart-line" key={`${line.productId}-${line.variantId}`}>
                      <Link to={`/product/${line.product.handle}`} className="cart-line__image"><img src={line.product.image} alt={line.product.title} /></Link>
                      <div className="cart-line__info">
                        <span>{line.product.collection.toUpperCase()}</span>
                        <Link to={`/product/${line.product.handle}`}><h3>{line.product.title}</h3></Link>
                        <p>{line.product.material}</p>
                        {variant && <p>{variant.name}: {variant.value}</p>}
                        <div className="cart-line__mobile-price">{formatPKR(line.product.price)}</div>
                      </div>
                      <div className="cart-line__quantity">
                        <QuantitySelector compact value={line.quantity} onChange={(next) => updateQuantity(line.productId, next, line.variantId)} />
                      </div>
                      <strong className="cart-line__price">{formatPKR(line.product.price * line.quantity)}</strong>
                      <button className="cart-line__remove" onClick={() => removeItem(line.productId, line.variantId)} aria-label={`Remove ${line.product.title}`}><Trash2 size={17} /></button>
                    </article>
                  );
                })}
                <Link className="continue-shopping" to="/jewellery"><ArrowLeft size={15} /> CONTINUE SHOPPING</Link>
              </div>

              <aside className="order-summary">
                <span className="order-summary__eyebrow">ORDER SUMMARY</span>
                <h2>Your Total</h2>
                <div className="summary-line"><span>Subtotal</span><b>{formatPKR(subtotal)}</b></div>
                <div className="summary-line"><span>Shipping</span><b>{shipping ? formatPKR(shipping) : 'COMPLIMENTARY'}</b></div>
                <div className="summary-total"><span>Total</span><strong>{formatPKR(total)}</strong></div>
                <button className="button button--gold button--full" onClick={() => window.alert('Secure Shopify checkout will be enabled when the commerce connection is activated.')}>PROCEED TO CHECKOUT →</button>
                <p className="secure-note"><LockKeyhole size={14} /> Secure encrypted checkout</p>
                <div className="summary-payments">
                  <img src="/assets/payments/visa.svg" alt="Visa" />
                  <img src="/assets/payments/mastercard.svg" alt="Mastercard" />
                  <img src="/assets/payments/jazzcash.svg" alt="JazzCash" />
                  <img src="/assets/payments/easypaisa.svg" alt="easypaisa" />
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
      <section className="container trust-wrap trust-wrap--cart"><TrustStrip /></section>
    </>
  );
}
