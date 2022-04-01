import { createContext, useContext } from 'react';
import { useLocalStorage } from '../../hooks';

const initialState = {
  total: 0,
  items: {},
};

export const CartContext = createContext(initialState);

CartContext.displayName = 'CartContext';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useLocalStorage('super-app:shopping-cart', initialState);

  const addNewItem = (product) => {
    setCart((prev) => {
      let newItem;
      if (prev.items[product.id]) {
        const cartProduct = prev.items[product.id];
        newItem = {
          ...cartProduct,
          qty: cartProduct.qty + 1,
        };
      } else {
        newItem = {
          price: product.price,
          name: product.name,
          qty: 1,
        };
      }

      return {
        ...prev,
        total: prev.total + product.price,
        items: {
          ...prev.items,
          [product.id]: newItem,
        },
      };
    });
  };

  const removeItem = (product) => {
    setCart((prev) => {
      let newItem = { ...prev.items };
      let total = prev.total;
      if (prev.items[product.id]) {
        const cartProduct = prev.items[product.id];
        if (cartProduct.qty > 1) {
          newItem = {
            ...prev.items,
            [product.id]: {
              ...cartProduct,
              qty: cartProduct.qty - 1,
            },
          };
          total -= product.price;
        } else {
          total -= product.price;
          delete newItem[product.id];
        }
      }

      return {
        ...prev,
        total,
        items: newItem,
      };
    });
  };

  const resetBacket = () => {
    setCart(initialState);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addNewItem,
        removeItem,
        resetBacket,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const cart = useContext(CartContext);
  if (!cart) {
    throw SyntaxError('CartProvider is not defined');
  }
  return cart;
};
