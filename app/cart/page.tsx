"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { useTranslations } from "@/lib/translations";

export default function Cart() {
  const { state, dispatch } = useApp();
  const t = useTranslations(state.language);

  const total = state.cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      dispatch({ type: "REMOVE_FROM_CART", productId });
    } else {
      const product = state.cart.find(
        (item) => item.product.id === productId
      )?.product;
      if (product) {
        dispatch({ type: "REMOVE_FROM_CART", productId });
        for (let i = 0; i < newQuantity; i++) {
          dispatch({ type: "ADD_TO_CART", product });
        }
      }
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
          {t.cart}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Review your selected items
        </p>
      </div>

      {state.cart.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground mb-6">{t.emptyCart}</p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all duration-200 font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 mb-8">
            {state.cart.map((item) => {
              const productName =
                state.language === "en"
                  ? item.product.name_en
                  : item.product.name_pt;
              const productCategory =
                state.language === "en"
                  ? item.product.category_en
                  : item.product.category_pt;

              return (
                <div
                  key={item.product.id}
                  className="bg-card p-6 rounded-lg shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="relative w-full sm:w-32 h-32 rounded-lg overflow-hidden">
                      <Image
                        src={item.product.image}
                        alt={productName}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                            {productCategory}
                          </p>
                          <h3 className="text-lg font-medium text-foreground">
                            {productName}
                          </h3>
                          <p className="text-lg font-semibold text-foreground">
                            ${item.product.price.toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              productId: item.product.id,
                            })
                          }
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors duration-200"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors duration-200"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors duration-200"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-lg font-semibold text-foreground">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-card p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-semibold text-foreground">
                {t.total}
              </span>
              <span className="text-2xl font-bold text-foreground">
                ${total.toFixed(2)}
              </span>
            </div>
            <Link
              href="/checkout"
              className="w-full block text-center px-8 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all duration-200 font-medium"
            >
              {t.proceedToCheckout}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
