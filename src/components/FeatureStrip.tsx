import {Diamond, Gift, LockKeyhole, ShieldCheck} from 'lucide-react';

const features = [
  {icon: LockKeyhole, title: 'Luxury Craftsmanship', copy: 'Premium quality, long lasting beauty'},
  {icon: Diamond, title: 'Fine Jewellery', copy: 'Elegant designs for every special moment'},
  {icon: ShieldCheck, title: 'Premium Quality', copy: 'Crafted with perfection and care'},
  {icon: Gift, title: 'Elegant Packaging', copy: 'Beautifully packed for a royal experience'},
];

export function FeatureStrip() {
  return (
    <div className="feature-strip">
      {features.map(({icon: Icon, title, copy}) => (
        <div className="feature-item" key={title}>
          <div className="feature-item__icon"><Icon size={25} strokeWidth={1.35} /></div>
          <div><strong>{title}</strong><p>{copy}</p></div>
        </div>
      ))}
    </div>
  );
}
