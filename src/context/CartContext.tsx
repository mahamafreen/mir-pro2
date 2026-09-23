import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  addShopifyCartLine,
  createShopifyCart,
  getShopifyCart,
  removeShopifyCartLines,
  updateShopifyCartLine,
  type ShopifyCartLineItem,
} from '../services/shopifyStorefrontClient';
import type {Product} from '../types/product';

const CART_ID_STORAGE_KEY = 'mir-shopify-cart-id';

export interface CartLine {
  id: string;
  productId: string;
  quantity: number;
  variantId: string;
  product: Product;
  lineTotal: number;
}

interface CartContextValue {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  total: number;
  checkoutUrl?: string;
  loading: boolean;
  error?: string;
  addItem: (productId: string, quantity?: number, variantId?: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => Promise<void>;
  removeItem: (productId: string, variantId?: string) => Promise<void>;
  clearCart: () => Promise<void>;
  checkout: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const readStoredCartId = () => {
  if (typeof window === 'undefined') return undefined;
  window.localStorage.removeItem('mir-cart-v1');
  return window.localStorage.getItem(CART_ID_STORAGE_KEY) ?? undefined;
};

const storeCartId = (cartId: string | undefined) => {
  if (typeof window === 'undefined') return;
  if (cartId) window.localStorage.setItem(CART_ID_STORAGE_KEY, cartId);
  else window.localStorage.removeItem(CART_ID_STORAGE_KEY);
};

const toCartLine = (line: ShopifyCartLineItem): CartLine => line;

export function CartProvider({children}: Readonly<{children: ReactNode}>) {
  const [cartId, setCartId] = useState<string | undefined>(readStoredCartId);
  const [lines, setLines] = useState<CartLine[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [checkoutUrl, setCheckoutUrl] = useState<string>();
  const [loading, setLoading] = useState(Boolean(cartId));
  const [error, setError] = useState<string>();

  const applyCart = useCallback((cart: Awaited<ReturnType<typeof getShopifyCart>>) => {
    if (!cart) {
      setCartId(undefined);
      storeCartId(undefined);
      setLines([]);
      setItemCount(0);
      setSubtotal(0);
      setTotal(0);
      setCheckoutUrl(undefined);
      return;
    }
    setCartId(cart.id);
    storeCartId(cart.id);
    setLines(cart.lines.map(toCartLine));
    setItemCount(cart.totalQuantity);
    setSubtotal(cart.subtotal);
    setTotal(cart.total);
    setCheckoutUrl(cart.checkoutUrl);
  }, []);

  useEffect(() => {
    if (!cartId) return;
    let active = true;
    setLoading(true);
    getShopifyCart(cartId)
      .then((cart) => { if (active) applyCart(cart); })
      .catch(() => {
        if (!active) return;
        setError('Unable to restore your saved cart. Please try again.');
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [applyCart, cartId]);

  const runMutation = useCallback(async (mutation: () => Promise<Awaited<ReturnType<typeof createShopifyCart>>>) => {
    setLoading(true);
    setError(undefined);
    try {
      const cart = await mutation();
      applyCart(cart);
    } catch (mutationError) {
      const message = mutationError instanceof Error ? mutationError.message : 'Unable to update your cart.';
      setError(message);
      throw mutationError;
    } finally {
      setLoading(false);
    }
  }, [applyCart]);

  const addItem = useCallback(async (productId: string, quantity = 1, variantId?: string) => {
    if (!variantId) {
      const invalidVariantError = new Error('Please select an available product variant.');
      setError(invalidVariantError.message);
      throw invalidVariantError;
    }
    await runMutation(() => cartId
      ? addShopifyCartLine(cartId, variantId, quantity)
      : createShopifyCart(variantId, quantity));
  }, [cartId, runMutation]);

  const updateQuantity = useCallback(async (productId: string, quantity: number, variantId?: string) => {
    const line = lines.find((item) => item.productId === productId && item.variantId === variantId);
    if (!line || !cartId) return;
    if (quantity <= 0) {
      await runMutation(() => removeShopifyCartLines(cartId, [line.id]));
      return;
    }
    await runMutation(() => updateShopifyCartLine(cartId, line.id, quantity));
  }, [cartId, lines, runMutation]);

  const removeItem = useCallback(async (productId: string, variantId?: string) => {
    const line = lines.find((item) => item.productId === productId && item.variantId === variantId);
    if (!line || !cartId) return;
    await runMutation(() => removeShopifyCartLines(cartId, [line.id]));
  }, [cartId, lines, runMutation]);

  const clearCart = useCallback(async () => {
    if (!cartId || !lines.length) return;
    await runMutation(() => removeShopifyCartLines(cartId, lines.map((line) => line.id)));
  }, [cartId, lines, runMutation]);

  const checkout = useCallback(async () => {
    if (!cartId || !lines.length) {
      const emptyCartError = new Error('Your cart is empty.');
      setError(emptyCartError.message);
      throw emptyCartError;
    }
    setLoading(true);
    setError(undefined);
    try {
      const cart = await getShopifyCart(cartId);
      if (!cart?.lines.length || !cart.checkoutUrl) {
        applyCart(cart);
        throw new Error('Your cart is empty or checkout is unavailable.');
      }
      window.location.assign(cart.checkoutUrl);
    } catch (checkoutError) {
      const message = checkoutError instanceof Error ? checkoutError.message : 'Unable to start checkout.';
      setError(message);
      throw checkoutError;
    } finally {
      setLoading(false);
    }
  }, [applyCart, cartId, lines.length]);

  const value = useMemo(
    () => ({lines, itemCount, subtotal, total, checkoutUrl, loading, error, addItem, updateQuantity, removeItem, clearCart, checkout}),
    [lines, itemCount, subtotal, total, checkoutUrl, loading, error, addItem, updateQuantity, removeItem, clearCart, checkout],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error('useCart must be used inside CartProvider');
  return value;
}
