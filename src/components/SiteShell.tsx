import {Outlet} from 'react-router-dom';
import {AnnouncementBar} from './AnnouncementBar';
import {Footer} from './Footer';
import {Header} from './Header';
import {ScrollToTop} from './ScrollToTop';

export function SiteShell() {
  return (
    <>
      <ScrollToTop />
      <AnnouncementBar />
      <Header />
      <main><Outlet /></main>
      <Footer />
    </>
  );
}
