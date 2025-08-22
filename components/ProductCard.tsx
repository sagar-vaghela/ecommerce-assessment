"use client";

import type React from "react";
import { useState, useCallback, useMemo } from "react";
import type { Product } from "../lib/graphql";
import { useCart } from "./CartContext";
import type { JSX } from "react/jsx-runtime"; // Import JSX to fix the undeclared variable error

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps): JSX.Element {
  const { addToCart } = useCart();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  const discountPercentage = useMemo(() => {
    if (product.price > 100) return 15;
    if (product.price > 50) return 10;
    if (product.price > 25) return 5;
    return 0;
  }, [product.price]);

  const handleAddToCart = useCallback(
    () => addToCart(product),
    [addToCart, product]
  );
  const handleImageLoad = useCallback(() => setImageLoaded(true), []);
  const handleImageError = useCallback(() => setImageError(true), []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleAddToCart();
      }
    },
    [handleAddToCart]
  );

  return (
    <article
      className="product-card shadow-lg flex flex-col h-full transition-transform duration-200 hover:scale-102 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 rounded-lg overflow-hidden"
      aria-labelledby={`product-name-${product.id}`}
    >
      <div className="relative overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="w-full h-48 bg-gray-200 animate-pulse flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {imageError ? (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <svg
                className="w-12 h-12 text-gray-400 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm text-gray-500">Image unavailable</p>
            </div>
          </div>
        ) : (
          <img
            src={product.imageUrl || "/placeholder.svg"}
            alt={`${product.name} - ${product.description}`}
            className={`product-image w-full h-48 object-cover transition-transform duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        )}

        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <span
            className="text-lg font-bold text-green-600"
            aria-label={`Price: $${product.price.toFixed(2)}`}
          >
            ${product.price.toFixed(2)}
          </span>
          {discountPercentage > 0 && (
            <div
              className="text-xs text-red-500 mt-1"
              aria-label={`${discountPercentage}% discount`}
            >
              {discountPercentage}% off
            </div>
          )}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3
          id={`product-name-${product.id}`}
          className="text-xl font-semibold text-gray-900 mb-2"
        >
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm flex-grow mb-4 leading-relaxed">
          {product.description}
        </p>

        <div className="mt-auto">
          <button
            onClick={handleAddToCart}
            onKeyDown={handleKeyDown}
            className="add-to-cart-btn w-full bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={`Add ${
              product.name
            } to cart for $${product.price.toFixed(2)}`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
