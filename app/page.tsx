"use client";

import { useState, useEffect, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import { Product } from "@/lib/api";
import { useApp } from "@/contexts/AppContext";
import { useTranslations } from "@/lib/translations";
import products from "@/data/products.json";

export default function Home() {
  const { state } = useApp();
  const t = useTranslations(state.language);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    setAllProducts(products as Product[]);
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      allProducts.map((product) =>
        state.language === "en" ? product.category_en : product.category_pt
      )
    );
    return Array.from(uniqueCategories);
  }, [allProducts, state.language]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const productName =
        state.language === "en" ? product.name_en : product.name_pt;
      const productCategory =
        state.language === "en" ? product.category_en : product.category_pt;

      const matchesSearch = productName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        !categoryFilter || productCategory === categoryFilter;

      let matchesPrice = true;
      if (priceFilter === "under50") matchesPrice = product.price < 50;
      else if (priceFilter === "50-100")
        matchesPrice = product.price >= 50 && product.price <= 100;
      else if (priceFilter === "over100") matchesPrice = product.price > 100;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [allProducts, searchQuery, categoryFilter, priceFilter, state.language]);

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
          {t.brandName}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {t.descBrandName}
        </p>
      </div>

      <ProductFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        categories={categories}
      />

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">{t.noProducts}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
