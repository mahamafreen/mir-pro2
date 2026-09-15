import {useEffect, useState} from 'react';
import {Expand, X} from 'lucide-react';

export function ProductGallery({images, title}: {images: string[]; title: string}) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  useEffect(() => setActive(0), [title]);

  return (
    <>
      <div className="product-gallery">
        <div className="product-gallery__thumbs" aria-label={`${title} gallery`}>
          {images.map((image, index) => (
            <button key={`${image}-${index}`} className={active === index ? 'is-active' : ''} onClick={() => setActive(index)} aria-label={`View image ${index + 1}`}>
              <img src={image} alt="" />
            </button>
          ))}
        </div>
        <button className="product-gallery__main" onClick={() => setZoomed(true)} aria-label="Open enlarged product image">
          <img src={images[active]} alt={`${title} view ${active + 1}`} />
          <span><Expand size={17} /> ENLARGE</span>
        </button>
      </div>
      {zoomed && (
        <div className="image-lightbox" role="dialog" aria-modal="true" aria-label={`${title} enlarged image`}>
          <button className="image-lightbox__close" onClick={() => setZoomed(false)} aria-label="Close image"><X /></button>
          <img src={images[active]} alt={`${title} enlarged view`} />
        </div>
      )}
    </>
  );
}
