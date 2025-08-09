"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Product } from "@/lib/api";

interface CartItem {
  product: Product;
  quantity: number;
}

interface AppState {
  cart: CartItem[];
  favorites: Product[];
  language: "en" | "pt";
  theme: "light" | "dark";
}

type AppAction =
  | { type: "ADD_TO_CART"; product: Product }
  | { type: "REMOVE_FROM_CART"; productId: string }
  | { type: "TOGGLE_FAVORITE"; product: Product }
  | { type: "SET_LANGUAGE"; language: "en" | "pt" }
  | { type: "TOGGLE_THEME" }
  | { type: "LOAD_STATE"; state: AppState };

const initialState: AppState = {
  cart: [],
  favorites: [],
  language: "en",
  theme: "light",
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.cart.find(
        (item) => item.product.id === action.product.id
      );
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.product, quantity: 1 }],
      };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== action.productId),
      };
    case "TOGGLE_FAVORITE": {
      const isFavorite = state.favorites.some(
        (fav) => fav.id === action.product.id
      );
      return {
        ...state,
        favorites: isFavorite
          ? state.favorites.filter((fav) => fav.id !== action.product.id)
          : [...state.favorites, action.product],
      };
    }
    case "SET_LANGUAGE":
      return { ...state, language: action.language };
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    case "LOAD_STATE":
      return action.state;
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const savedState = localStorage.getItem("urbanThreadsState");
    if (savedState) {
      dispatch({ type: "LOAD_STATE", state: JSON.parse(savedState) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("urbanThreadsState", JSON.stringify(state));
    document.documentElement.classList.toggle("dark", state.theme === "dark");
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
