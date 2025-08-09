"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Search, Sun, Moon, Globe } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { useTranslations } from "@/lib/translations";

export default function Header() {
  const { state, dispatch } = useApp();
  const t = useTranslations(state.language);
  const [searchQuery, setSearchQuery] = useState("");

  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const favoritesCount = state.favorites.length;

  const handleLanguageToggle = () => {
    dispatch({
      type: "SET_LANGUAGE",
      language: state.language === "en" ? "pt" : "en",
    });
  };

  const handleThemeToggle = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="font-serif text-2xl font-light tracking-wide text-foreground hover:text-primary transition-colors"
          >
            {t.brandName}
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLanguageToggle}
              className="p-2 gap-1 rounded-full flex flex-col justify-center items-center hover:bg-accent transition-colors duration-200"
              title="Toggle Language"
            >
              <Globe className="w-5 h-5" />
              <span className="text-xs font-medium">
                {state.language.toUpperCase()}
              </span>
            </button>

            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-full hover:bg-accent transition-colors duration-200"
              title="Toggle Theme"
            >
              {state.theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            <Link
              href="/favorites"
              className="relative p-2 rounded-full hover:bg-accent transition-colors duration-200"
            >
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium">
                  {favoritesCount}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="relative p-2 rounded-full hover:bg-accent transition-colors duration-200"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-full border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
