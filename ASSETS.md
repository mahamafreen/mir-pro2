# Asset Map

All visual assets used by the storefront are stored locally under `public/assets`.

## Brand

`public/assets/logo/mir-logo.png`

The MIR logo was preserved from the supplied client reference rather than recreated as a new wordmark.

## Product photography

Each product has its own directory:

```text
public/assets/images/products/<product-handle>/
├── 1.jpg
├── 2.jpg
├── 3.jpg
└── 4.jpg
```

Product data points to these files through `src/data/products.ts`.

## Editorial photography

`public/assets/images/hero/`

Contains hero and collection/editorial imagery used across Home, Collections, About and Contact.

## Payment marks

`public/assets/payments/`

Contains local SVG assets for Visa, Mastercard, JazzCash and easypaisa.

## Replacement workflow

To replace photography later, keep the existing folder names and filenames or update only the image paths in `src/data/products.ts`. No product-card or product-gallery component changes are required.
