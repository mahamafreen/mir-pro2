import {Facebook, Instagram, Truck} from 'lucide-react';

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="social-svg">
      <path d="M14.8 4.4c.7 1.7 1.8 2.8 3.8 3.1v2.7c-1.5-.1-2.8-.6-3.8-1.4v5.5c0 3.4-2.4 5.7-5.6 5.7-3.1 0-5.5-2.3-5.5-5.3 0-3.2 2.6-5.5 6-5.3V12c-1.8-.1-3.2.9-3.2 2.6 0 1.5 1.2 2.6 2.7 2.6 1.7 0 2.8-1.1 2.8-3.2V4.4h2.8Z" fill="currentColor" />
    </svg>
  );
}

export function AnnouncementBar() {
  return (
    <div className="announcement">
      <div className="container announcement__inner">
        <span className="announcement__welcome">
          <span className="announcement__diamond">◇</span>
          Welcome to MIR Private Limited
        </span>
        <span className="announcement__delivery">
          <Truck size={16} strokeWidth={1.5} />
          Free Delivery: On Orders Above PKR 5000
        </span>
        <div className="announcement__socials" aria-label="Social links">
          <a href="#" aria-label="Facebook"><Facebook size={15} /></a>
          <a href="#" aria-label="Instagram"><Instagram size={15} /></a>
          <a href="#" aria-label="TikTok"><TikTokIcon /></a>
        </div>
      </div>
    </div>
  );
}
