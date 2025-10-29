import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Crear el contexto del carrito
const CartContext = createContext();

// Acciones para el reducer del carrito
const cartActions = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
};

// Reducer para manejar el estado del carrito
const cartReducer = (state, action) => {
  switch (action.type) {
    case cartActions.ADD_ITEM: {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        // Si el producto ya existe, actualizar cantidad
        return {
          ...state,
          items: state.items.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        };
      } else {
        // Si es un producto nuevo, agregarlo al carrito
        return {
          ...state,
          items: [...state.items, { ...product, quantity }]
        };
      }
    }

    case cartActions.REMOVE_ITEM: {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.productId)
      };
    }

    case cartActions.UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Si la cantidad es 0 o menor, remover el item
        return {
          ...state,
          items: state.items.filter(item => item.id !== productId)
        };
      }

      return {
        ...state,
        items: state.items.map(item =>
          item.id === productId
            ? { ...item, quantity }
            : item
        )
      };
    }

    case cartActions.CLEAR_CART: {
      return {
        ...state,
        items: []
      };
    }

    case cartActions.LOAD_CART: {
      return {
        ...state,
        items: action.payload.items || []
      };
    }

    default:
      return state;
  }
};

// Estado inicial del carrito
const initialCartState = {
  items: [],
  isOpen: false
};

// Provider del carrito
export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);
  const [cartStorage, setCartStorage] = useLocalStorage('padelmania-cart', []);

  // Cargar carrito desde localStorage al inicializar
  useEffect(() => {
    if (cartStorage && cartStorage.length > 0) {
      dispatch({
        type: cartActions.LOAD_CART,
        payload: { items: cartStorage }
      });
    }
  }, []);

  // Sincronizar con localStorage cuando cambie el carrito
  useEffect(() => {
    setCartStorage(cartState.items);
  }, [cartState.items, setCartStorage]);

  // Funciones del carrito
  const addToCart = (product, quantity = 1) => {
    dispatch({
      type: cartActions.ADD_ITEM,
      payload: { product, quantity }
    });
  };

  const removeFromCart = (productId) => {
    dispatch({
      type: cartActions.REMOVE_ITEM,
      payload: { productId }
    });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({
      type: cartActions.UPDATE_QUANTITY,
      payload: { productId, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: cartActions.CLEAR_CART });
  };

  // Funciones de cálculo
  const getCartTotal = () => {
    return cartState.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cartState.items.reduce((count, item) => count + item.quantity, 0);
  };

  const getCartSubtotal = () => {
    return getCartTotal();
  };

  // Calcular cuotas sin interés (simulado)
  const getInstallmentInfo = (installments = 6) => {
    const total = getCartTotal();
    const installmentAmount = Math.ceil(total / installments);
    return {
      installments,
      installmentAmount,
      total: installmentAmount * installments,
      description: `${installments} cuotas sin interés de $${installmentAmount.toLocaleString()}`
    };
  };

  // Verificar si un producto está en el carrito
  const isInCart = (productId) => {
    return cartState.items.some(item => item.id === productId);
  };

  // Obtener cantidad de un producto en el carrito
  const getProductQuantity = (productId) => {
    const item = cartState.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Valor del contexto
  const contextValue = {
    // Estado
    items: cartState.items,
    itemCount: getCartItemCount(),
    total: getCartTotal(),
    subtotal: getCartSubtotal(),
    
    // Acciones
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    
    // Utilidades
    getInstallmentInfo,
    isInCart,
    getProductQuantity
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el carrito
export const useCart = () => {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  
  return context;
};

export default CartProvider;