/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";

// Separate context creation so we only export components/hooks for fast-refresh friendliness
const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);

  const addToCart = useCallback((item, qty = 1, note = "") => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id && p.note === note);
      if (existing) {
        return prev.map((p) =>
          p === existing ? { ...p, qty: p.qty + qty } : p
        );
      }
      const priceNumber = Number(item.price.replace(/[^0-9]/g, ""));
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          priceNumber,
          priceDisplay: item.price,
          image: item.image,
          qty,
          note: note.trim(),
        },
      ];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id, note = "") => {
    setItems((prev) => prev.filter((p) => !(p.id === id && p.note === note)));
  }, []);

  const updateQty = useCallback((id, note = "", qty) => {
    setItems((prev) =>
      prev.map((p) =>
        p.id === id && p.note === note ? { ...p, qty: Math.max(1, qty) } : p
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.priceNumber * i.qty, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      total,
      isCartOpen,
      setCartOpen,
    }),
    [items, addToCart, removeFromCart, updateQty, clearCart, total, isCartOpen]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

// Exporting only React components & hooks
export default CartProvider;
