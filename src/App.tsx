import {Route, Routes} from 'react-router-dom';
import {SiteShell} from './components/SiteShell';
import About from './pages/About';
import Cart from './pages/Cart';
import Collections from './pages/Collections';
import CollectionPage from './pages/Collection';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Jewellery from './pages/Jewellery';
import NotFound from './pages/NotFound';
import ProductPage from './pages/Product';

export default function App() {
  return (
    <Routes>
      <Route element={<SiteShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/jewellery" element={<Jewellery />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/collections/:handle" element={<CollectionPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
