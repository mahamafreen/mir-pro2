# Shopify Integration Plan

The storefront is intentionally separated into presentation, normalized product data, commerce services and cart state. Shopify can be introduced without redesigning the UI.

## 1. Catalogue

Current boundary:

```text
pages/components -> catalogService -> local product data
```

Future boundary:

```text
pages/components -> catalogService -> Shopify Storefront API
```

Map Shopify fields into `src/types/product.ts` rather than passing raw Shopify nodes through the interface. This keeps the visual layer independent from Storefront API schema changes.

Suggested Shopify mapping:

- `Product.id` <- Shopify product ID
- `Product.handle` <- handle
- `Product.title` <- title
- `Product.description` <- description
- `Product.price` <- selected price amount converted to number
- `Product.compareAtPrice` <- compare-at amount
- `Product.image` <- first image
- `Product.images` <- product images array
- `Product.category` <- product type or taxonomy metafield
- `Product.collection` <- primary collection/metafield
- `Product.material` / `finish` <- metafields
- `Product.available` <- availability
- `Product.variants` <- Shopify variants / options

## 2. Cart

Keep `useCart()` as the component-facing contract. Replace only the internals of `CartContext.tsx` with Shopify Cart API calls:

- create cart
- add merchandise lines
- update line quantity
- remove lines
- read cost totals
- store cart ID / buyer identity

The header, product cards, product page and cart page can continue calling the same actions.

## 3. Checkout

Replace the current checkout placeholder with Shopify's returned `checkoutUrl`. Payment processing remains entirely inside Shopify checkout.

## 4. Hydrogen option

If the storefront is moved to Hydrogen/Remix, retain the present components and design tokens while moving catalogue and cart access into Hydrogen loaders/actions. The normalized `Product` model can remain as an adapter layer if desired.

## 5. Collections and filtering

Current collection/category filters run locally. With Shopify, query collection handles and product filters server-side while preserving URL query parameters such as:

```text
/jewellery?category=Necklaces
/jewellery?collection=heritage
/jewellery?q=ring
```

## 6. Content still needed before launch

- official Shopify catalogue and variants
- final product photography
- exact material / care claims
- official social links
- customer-service channels
- shipping rules and return exclusions
- legal policies
- analytics / consent configuration
