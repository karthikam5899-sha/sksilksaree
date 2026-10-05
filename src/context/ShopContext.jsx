import { createContext, useContext, useEffect, useState } from "react";

const ShopContext = createContext(null);

function readStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage("sk-silk-sarees-cart"));
  const [orders, setOrders] = useState(() => readStorage("sk-silk-sarees-orders"));

  useEffect(() => {
    localStorage.setItem("sk-silk-sarees-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("sk-silk-sarees-orders", JSON.stringify(orders));
  }, [orders]);

  function addToCart(saree) {
    setCart(current => {
      const existing = current.find(item => item.id === saree.id);
      if (existing) {
        return current.map(item => item.id === saree.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...current, { ...saree, quantity: 1 }];
    });
  }

  function setQuantity(id, quantity) {
    if (quantity < 1) return;
    setCart(current => current.map(item => item.id === id ? { ...item, quantity } : item));
  }

  function removeFromCart(id) {
    setCart(current => current.filter(item => item.id !== id));
  }

  function placeOrder(customer) {
    if (!cart.length) return null;
    const order = {
      id: `SK-${Date.now().toString().slice(-8)}`,
      createdAt: new Date().toISOString(),
      customer,
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: "Preparing"
    };
    setOrders(current => [order, ...current]);
    setCart([]);
    return order;
  }

  return (
    <ShopContext.Provider value={{ cart, orders, addToCart, setQuantity, removeFromCart, placeOrder }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used within ShopProvider");
  return context;
}
