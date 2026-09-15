import {Box, Headphones, LockKeyhole, Truck} from 'lucide-react';

const items = [
  {icon: Truck, title: 'Free Delivery', copy: 'On all orders above PKR 5000'},
  {icon: Box, title: 'Easy Returns', copy: '7 day return policy'},
  {icon: LockKeyhole, title: 'Secure Payment', copy: '100% secure payment'},
  {icon: Headphones, title: '24/7 Support', copy: 'Dedicated support'},
];

export function TrustStrip() {
  return (
    <div className="trust-strip">
      {items.map(({icon: Icon, title, copy}) => (
        <div className="trust-item" key={title}>
          <Icon size={26} strokeWidth={1.35} />
          <div><strong>{title}</strong><span>{copy}</span></div>
        </div>
      ))}
    </div>
  );
}
