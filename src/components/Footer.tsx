import {Link} from 'react-router-dom';
import {BrandMark} from './BrandMark';
import {Newsletter} from './Newsletter';

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
      ['Customer Care', '/contact'],
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
          <div className="footer-socials">Social links pending client URLs.</div>
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
