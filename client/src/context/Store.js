import React, { createContext, useContext, useReducer, useEffect } from 'react';

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    localStorage.removeItem(key);
    return fallback;
  }
};

const initialState = {
  cart: readStorage('amazonCloneCart', []),
  user: readStorage('amazonCloneUser', null),
};

const StoreContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.cart.find((item) => item._id === action.payload._id);
      const nextCart = existing
        ? state.cart.map((item) =>
            item._id === existing._id
              ? {
                  ...item,
                  qty: Math.min(item.countInStock || 99, item.qty + action.payload.qty),
                }
              : item
          )
        : [...state.cart, action.payload];
      return { ...state, cart: nextCart };
    }
    case 'REMOVE_FROM_CART': {
      return { ...state, cart: state.cart.filter((item) => item._id !== action.payload) };
    }
    case 'CLEAR_CART': {
      return { ...state, cart: [] };
    }
    case 'SET_USER': {
      return { ...state, user: action.payload };
    }
    case 'LOGOUT': {
      return { ...state, user: null, cart: [] };
    }
    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('amazonCloneCart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem('amazonCloneUser', JSON.stringify(state.user));
  }, [state.user]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
