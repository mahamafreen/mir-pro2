import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {products} from '../data/products';
import type {Product} from '../types/product';

const STORAGE_KEY = 'mir-cart-v1';

interface StoredCartLine {
  productId: string;
  quantity: number;
  variantId?: string;
}

export interface CartLine extends StoredCartLine {
  product: Product;
}

interface CartContextValue {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  addItem: (productId: string, quantity?: number, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  removeItem: (productId: string, variantId?: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const readStoredCart = (): StoredCartLine[] => {
  if (typeof window === 'undefined') return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export function CartProvider({children}: {children: ReactNode}) {
  const [storedLines, setStoredLines] = useState<StoredCartLine[]>(readStoredCart);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storedLines));
  }, [storedLines]);

  const addItem = useCallback((productId: string, quantity = 1, variantId?: string) => {
    setStoredLines((current) => {
      const index = current.findIndex(
        (line) => line.productId === productId && line.variantId === variantId,
      );
      if (index === -1) return [...current, {productId, quantity, variantId}];
      return current.map((line, lineIndex) =>
        lineIndex === index ? {...line, quantity: line.quantity + quantity} : line,
      );
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      setStoredLines((current) =>
        current.filter((line) => !(line.productId === productId && line.variantId === variantId)),
      );
      return;
    }
    setStoredLines((current) =>
      current.map((line) =>
        line.productId === productId && line.variantId === variantId ? {...line, quantity} : line,
      ),
    );
  }, []);

  const removeItem = useCallback((productId: string, variantId?: string) => {
    setStoredLines((current) =>
      current.filter((line) => !(line.productId === productId && line.variantId === variantId)),
    );
  }, []);

  const clearCart = useCallback(() => setStoredLines([]), []);

  const lines = useMemo<CartLine[]>(
    () =>
      storedLines.flatMap((line) => {
        const product = products.find((item) => item.id === line.productId);
        return product ? [{...line, product}] : [];
      }),
    [storedLines],
  );

  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);

  const value = useMemo(
    () => ({lines, itemCount, subtotal, addItem, updateQuantity, removeItem, clearCart}),
    [lines, itemCount, subtotal, addItem, updateQuantity, removeItem, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error('useCart must be used inside CartProvider');
  return value;
}
