"use client";

import ProductCard from "@/components/ProductCard";
import { useApp } from "@/contexts/AppContext";
import { useTranslations } from "@/lib/translations";
import Link from "next/link";

export default function Favorites() {
  const { state } = useApp();
  const t = useTranslations(state.language);

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
          {t.favorites}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Your curated selection of favorite pieces
        </p>
      </div>

      {state.favorites.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground mb-6">{t.noFavorites}</p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all duration-200 font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {state.favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
