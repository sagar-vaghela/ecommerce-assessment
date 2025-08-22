"use client";

import { useCart } from "./CartContext";
import type { Product } from "../lib/graphql";
import { useState } from "react";

interface MonolithicProductPageProps {
  products: Product[];
}

type SortOrder = "name" | "price";

export default function MonolithicProductPage({
  products,
}: MonolithicProductPageProps) {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("name");
  const [filterPrice, setFilterPrice] = useState<number>(1000);

  const filteredProducts: Product[] =
    products
      ?.filter(
        (product: Product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          product.price <= filterPrice
      )
      .sort((a: Product, b: Product) => {
        if (sortOrder === "name") return a.name.localeCompare(b.name);
        if (sortOrder === "price") return a.price - b.price;
        return 0;
      }) || [];

  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Product Catalog
        </h1>

        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            placeholder="Search products..."
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <select
            value={sortOrder}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSortOrder(e.target.value as SortOrder)
            }
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
          </select>

          <div className="flex items-center gap-2">
            <label
              htmlFor="price-filter"
              className="text-sm font-medium text-gray-700"
            >
              Max Price: ${filterPrice}
            </label>
            <input
              id="price-filter"
              type="range"
              min="0"
              max="500"
              value={filterPrice}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFilterPrice(Number(e.target.value))
              }
              className="w-48"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product: Product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={product.imageUrl || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-green-600">
                  ${product.price.toFixed(2)}
                </span>

                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No products found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
