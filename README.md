# MIR Private Limited Storefront

A premium React + TypeScript storefront for **MIR Private Limited**, designed around a black-and-gold luxury jewellery system and structured for a later Shopify Storefront API / Hydrogen connection.

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Routes

- `/` — Home
- `/jewellery` — Fine Jewellery catalogue with category filters, search and sorting
- `/collections` — Curated collections
- `/product/:id` — Product detail with multi-image gallery, variants and related products
- `/cart` — Persistent cart with quantities, totals and delivery threshold
- `/about` — Brand story, principles, jewellery care and policies
- `/contact` — Customer enquiry experience

## Architecture

```text
src/
├── components/      Reusable storefront UI
├── context/         Cart state and local persistence
├── data/            Local catalogue source
├── pages/           Route-level screens
├── services/        Catalogue / commerce abstraction
├── styles/          MIR design system and responsive styles
├── types/           Commerce-facing TypeScript models
└── utils/           Formatting helpers

public/assets/
├── images/          Local product and editorial photography
├── logo/            MIR brand asset
└── payments/        Local payment marks

reference/
└── mir-jewellery-reference.png
```

## Commerce readiness

The UI does not depend on individual hard-coded product cards. Product views receive normalized `Product` objects. `catalogService.ts` represents the catalogue boundary, while `commerceAdapter.ts` documents the normalized shape expected from a future commerce backend.

When Shopify is connected, the main migration is:

1. Query Storefront API / Hydrogen data.
2. Map Shopify product nodes to the existing `Product` interface.
3. Replace `localCatalogService` with the Shopify-backed service.
4. Replace the local cart provider's mutations with Shopify Cart API mutations while keeping the same component-facing cart contract.
5. Route the checkout button to Shopify checkout.

This lets the approved UI, route structure, cards, galleries, collection views and responsive system remain intact.

## Product imagery

Every catalogue item contains four local image paths and the product detail gallery supports switching and enlarged viewing. The current asset library is organized by product handle so final MIR photography can be swapped file-for-file without changing component code.

Recommended final photography per SKU:

- front / hero angle
- three-quarter angle
- detail / stone-setting close-up
- scale or styled-wear image

Keep lighting, backdrop, color temperature and retouching consistent across all four images for each product.

## Notes

- Currency is PKR.
- Complimentary delivery threshold is PKR 5,000.
- Cart persists in `localStorage` under `mir-cart-v1`.
- Checkout intentionally stops before payment until the commerce connection is activated.
- Social destinations and customer-service contact details should be connected once MIR's official handles and channels are supplied.


## Typography

MIR uses **Italiana** for editorial display typography, **Manrope** for navigation, controls, and body copy, and **Italianno** sparingly for signature-style accents such as the hero emphasis and MIR Team signature. The family is loaded through Google Fonts in `index.html`.
