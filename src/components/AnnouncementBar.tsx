import {Truck} from 'lucide-react';

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
        <span className="announcement__socials-note">Social links pending</span>
      </div>
    </div>
  );
}
