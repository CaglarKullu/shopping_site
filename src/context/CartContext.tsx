import { createContext, useState, useContext, ReactNode } from "react";

interface CartProduct {
    id: number;
    title: string;
    price: number;
    images: string[];
    quantity: number;
  }

interface CartContext {
    cart: CartProduct[];
    addToCart: (product: CartProduct) => void;
    removeFromCart: (productId: number) => void;
    reduceQuantity: (productId: number) => void;
  }

const CartContext = createContext<CartContext | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartProduct[]>([]);

    const addToCart = (product: CartProduct) => {
        const existingProduct = cart.find((item) => item.id === product.id);
        if (existingProduct) {
          setCart(
            cart.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            )
          );
          return;
        }
        setCart([...cart, product]);
      };
    
      const reduceQuantity = (productId: number) => {
        setCart((prevCart) => {
          return prevCart
            .map((item) => 
              item.id === productId 
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0);
        });
        return;
      }
      
      const removeFromCart = (productId: number) => {
        setCart(cart.filter((item) => item.id !== productId));
      };
    
      return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, reduceQuantity }}>
          {children}
        </CartContext.Provider>
      );
    }

    export function useCart() {
        const context = useContext(CartContext);
        if (!context) {
          throw new Error("useCart must be used within a CartProvider");
        }
        return context;
    }