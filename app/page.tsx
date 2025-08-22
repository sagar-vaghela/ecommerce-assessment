"use client";

import type React from "react";
import type { JSX } from "react/jsx-runtime";

import { useState, useEffect, useMemo } from "react";
import { fetchProducts, type Product } from "../lib/graphql";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchProducts();
        setProducts(response.data.products);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load products"
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter((product: Product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a: Product, b: Product) => a.name.localeCompare(b.name));
  }, [products, searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen"
        role="status"
        aria-live="polite"
      >
        <LoadingSpinner size="lg" className="mb-4" />
        <p className="text-lg text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        role="alert"
        aria-live="assertive"
      >
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Error Loading Products
          </h1>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
      >
        Skip to main content
      </a>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12" aria-labelledby="hero-heading">
          <h1
            id="hero-heading"
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Welcome to StyleStore
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our curated collection of premium products, carefully
            selected for style and quality.
          </p>
        </section>

        {/* Products Section */}
        <main id="main-content">
          <section className="mb-8" aria-labelledby="products-heading">
            <h2
              id="products-heading"
              className="text-2xl font-semibold text-gray-900 mb-6"
            >
              Featured Products
            </h2>

            <div className="mb-6">
              <label htmlFor="product-search" className="sr-only">
                Search products
              </label>
              <div className="relative">
                <input
                  id="product-search"
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  aria-describedby="search-description"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
              <p id="search-description" className="sr-only">
                Search through our collection of {products.length} products
              </p>
            </div>

            <div aria-live="polite" aria-atomic="true" className="sr-only">
              {searchTerm &&
                `Found ${filteredAndSortedProducts.length} products matching "${searchTerm}"`}
            </div>

            {filteredAndSortedProducts.length === 0 && searchTerm ? (
              <div className="text-center py-12" role="status">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  No products match your search for "{searchTerm}". Try a
                  different search term.
                </p>
              </div>
            ) : (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                role="grid"
                aria-label="Product grid"
              >
                {filteredAndSortedProducts.map((product: Product) => (
                  <div key={product.id} role="gridcell">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>

        {/* Features Section */}
        <section
          className="mt-16 py-12 bg-white rounded-xl shadow-sm"
          aria-labelledby="features-heading"
        >
          <div className="max-w-4xl mx-auto px-6">
            <h2
              id="features-heading"
              className="text-2xl font-bold text-gray-900 text-center mb-8"
            >
              Why Choose StyleStore?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div
                  className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  aria-hidden="true"
                >
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Free Shipping
                </h3>
                <p className="text-gray-600">
                  Free shipping on all orders over $50
                </p>
              </div>
              <div className="text-center">
                <div
                  className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  aria-hidden="true"
                >
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Quality Guaranteed
                </h3>
                <p className="text-gray-600">30-day money-back guarantee</p>
              </div>
              <div className="text-center">
                <div
                  className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  aria-hidden="true"
                >
                  <svg
                    className="w-8 h-8 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  24/7 Support
                </h3>
                <p className="text-gray-600">
                  Round-the-clock customer support
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
