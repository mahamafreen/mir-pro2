import {Facebook, Instagram} from 'lucide-react';
import {Link} from 'react-router-dom';
import {BrandMark} from './BrandMark';
import {Newsletter} from './Newsletter';

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="social-svg">
      <path d="M14.8 4.4c.7 1.7 1.8 2.8 3.8 3.1v2.7c-1.5-.1-2.8-.6-3.8-1.4v5.5c0 3.4-2.4 5.7-5.6 5.7-3.1 0-5.5-2.3-5.5-5.3 0-3.2 2.6-5.5 6-5.3V12c-1.8-.1-3.2.9-3.2 2.6 0 1.5 1.2 2.6 2.7 2.6 1.7 0 2.8-1.1 2.8-3.2V4.4h2.8Z" fill="currentColor" />
    </svg>
  );
}

const columns = [
  {
    title: 'SHOP',
    links: [
      ['Necklaces', '/jewellery?category=Necklaces'],
      ['Earrings', '/jewellery?category=Earrings'],
      ['Rings', '/jewellery?category=Rings'],
      ['Bracelets', '/jewellery?category=Bracelets'],
      ['Collections', '/collections'],
      ['Best Sellers', '/jewellery?sort=featured'],
    ],
  },
  {
    title: 'CUSTOMER CARE',
    links: [
      ['My Account', '/contact'],
      ['Order Tracking', '/contact'],
      ['Shipping & Returns', '/about#shipping'],
      ['Payment Methods', '/cart'],
      ['FAQs', '/about#faq'],
    ],
  },
  {
    title: 'INFORMATION',
    links: [
      ['About Us', '/about'],
      ['Our Story', '/about#story'],
      ['Jewellery Care', '/about#care'],
      ['Terms & Conditions', '/about#terms'],
      ['Contact Us', '/contact'],
    ],
  },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <BrandMark compact />
          <p>Timeless jewellery for a more beautiful tomorrow.</p>
          <div className="footer-socials">
            <a href="#" aria-label="Facebook"><Facebook size={17} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={17} /></a>
            <a href="#" aria-label="TikTok"><TikTokIcon /></a>
          </div>
        </div>
        {columns.map((column) => (
          <div className="footer-column" key={column.title}>
            <h4>{column.title}</h4>
            {column.links.map(([label, to]) => <Link key={label} to={to}>{label}</Link>)}
          </div>
        ))}
        <Newsletter />
      </div>
      <div className="container footer-bottom">
        <span>© 2025 MIR Private Limited. All Rights Reserved.</span>
        <span>Crafted for timeless moments.</span>
      </div>
    </footer>
  );
}
