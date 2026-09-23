import {useEffect, useRef, useState} from 'react';
import {ChevronDown, Menu, MessageCircle, Search, ShoppingBag, X} from 'lucide-react';
import {Link, NavLink, useLocation, useNavigate} from 'react-router-dom';
import {useCart} from '../context/CartContext';
import {formatPKR} from '../utils/currency';
import {shopifyCatalogService} from '../services/catalogService';
import type {Collection} from '../types/product';
import {BrandMark} from './BrandMark';

type NavItem = {
  label: string;
  to: string;
  children?: {label: string; to: string; note?: string}[];
};

const navItems: NavItem[] = [
  {label: 'HOME', to: '/'},
  {
    label: 'JEWELLERY',
    to: '/jewellery',
    children: [
      {label: 'All Jewellery', to: '/jewellery', note: 'Discover the full MIR selection'},
      {label: 'Necklaces', to: '/jewellery?category=Necklaces'},
      {label: 'Earrings', to: '/jewellery?category=Earrings'},
      {label: 'Rings', to: '/jewellery?category=Rings'},
      {label: 'Bracelets', to: '/jewellery?category=Bracelets'},
      {label: 'Pendants', to: '/jewellery?category=Pendants'},
    ],
  },
  {
    label: 'COLLECTIONS',
    to: '/collections',
    children: [{label: 'View Collections', to: '/collections'}],
  },
  {label: 'ABOUT US', to: '/about'},
  {label: 'CONTACT', to: '/contact'},
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [collections, setCollections] = useState<Collection[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const {itemCount, subtotal} = useCart();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) window.setTimeout(() => inputRef.current?.focus(), 20);
  }, [searchOpen]);

  useEffect(() => {
    shopifyCatalogService.getCollections().then(setCollections).catch(() => setCollections([]));
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    navigate(trimmed ? `/jewellery?q=${encodeURIComponent(trimmed)}` : '/jewellery');
    setSearchOpen(false);
  };

  const navigationItems = navItems.map((item) => item.label !== 'COLLECTIONS' ? item : {
    ...item,
    children: [
      ...collections.slice(0, 5).map((collection): {label: string; to: string; note?: string} => ({
        label: collection.title,
        to: `/collections/${collection.handle ?? collection.id}`,
      })),
      {label: 'View Collections', to: '/collections'},
    ],
  });

  return (
    <>
      <header className="site-header">
        <div className="container site-header__inner">
          <BrandMark />
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigationItems.map((item) => (
              <div className="desktop-nav__item" key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({isActive}) => `desktop-nav__link${isActive ? ' desktop-nav__link--active' : ''}`}
                >
                  {item.label}
                  {item.children && <ChevronDown size={13} strokeWidth={1.5} />}
                </NavLink>
                {item.children && (
                  <div className="desktop-nav__dropdown">
                    <div className="desktop-nav__dropdown-line" />
                    {item.children.map((child) => (
                      <Link key={`${item.label}-${child.label}`} to={child.to}>
                        <span>{child.label}</span>
                        {child.note && <small>{child.note}</small>}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="header-actions">
            <button className="icon-button" aria-label="Search" onClick={() => setSearchOpen(true)}>
              <Search size={21} strokeWidth={1.5} />
            </button>
            <Link className="icon-button desktop-account" to="/contact" aria-label="Customer care">
              <MessageCircle size={20} strokeWidth={1.5} />
            </Link>
            <Link className="cart-pill" to="/cart" aria-label={`Cart with ${itemCount} items`}>
              <ShoppingBag size={17} strokeWidth={1.6} />
              <span>{itemCount > 0 ? formatPKR(subtotal) : 'PKR 0'}</span>
              {itemCount > 0 && <b>{itemCount}</b>}
            </Link>
            <button
              className="mobile-menu-button"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((value) => !value)}
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        <div className={`mobile-nav${mobileOpen ? ' mobile-nav--open' : ''}`}>
          <div className="container mobile-nav__inner">
            {navigationItems.map((item) => (
              <div className="mobile-nav__group" key={item.to}>
                <NavLink to={item.to} end={item.to === '/'}>
                  <span>{item.label}</span>
                  {item.children && <ChevronDown size={16} />}
                </NavLink>
                {item.children && (
                  <div className="mobile-nav__children">
                    {item.children.slice(0, item.label === 'JEWELLERY' ? 6 : 5).map((child) => (
                      <Link key={child.label} to={child.to}>{child.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className={`search-overlay${searchOpen ? ' search-overlay--open' : ''}`} aria-hidden={!searchOpen}>
        <button className="search-overlay__backdrop" aria-label="Close search" onClick={() => setSearchOpen(false)} />
        <div className="search-overlay__panel">
          <div className="container">
            <div className="search-overlay__top">
              <span>SEARCH MIR</span>
              <button className="icon-button" onClick={() => setSearchOpen(false)} aria-label="Close search"><X /></button>
            </div>
            <form className="search-form" onSubmit={submitSearch}>
              <Search size={26} strokeWidth={1.3} />
              <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search necklaces, earrings, rings..." aria-label="Search jewellery" />
              <button type="submit" className="text-link">SEARCH →</button>
            </form>
            <p className="search-hint">Try “necklace”, “bridal”, “ring” or “Heritage”.</p>
          </div>
        </div>
      </div>
    </>
  );
}
