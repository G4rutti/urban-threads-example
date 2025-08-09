"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { useTranslations } from "@/lib/translations";
import { Product } from "@/lib/api";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { state, dispatch } = useApp();
  const t = useTranslations(state.language);
  const [isHovered, setIsHovered] = useState(false);

  const isFavorite = state.favorites.some((fav) => fav.id === product.id);
  const productName =
    state.language === "en" ? product.name_en : product.name_pt;
  const productCategory =
    state.language === "en" ? product.category_en : product.category_pt;

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", product });
  };

  const handleToggleFavorite = () => {
    dispatch({ type: "TOGGLE_FAVORITE", product });
  };

  return (
    <div
      className="group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={isHovered ? product.image_alt : product.image}
          alt={productName}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

        <button
          onClick={handleToggleFavorite}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white transition-all duration-200 shadow-sm"
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-200 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
            {productCategory.toUpperCase()}
          </p>
          <h3 className="text-base font-medium text-foreground mt-1 line-clamp-2">
            {productName.toUpperCase()}
          </h3>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-lg font-semibold text-foreground">
            ${product.price.toFixed(2)}
          </p>

          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all duration-200 text-sm font-medium"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">{t.addToCart}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
