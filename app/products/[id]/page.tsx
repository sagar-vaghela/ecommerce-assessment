"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import type { Product } from "../../../lib/graphql";
import { JSX } from "react";

export default function ProductDetailPage(): JSX.Element {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        // Validate productId to prevent injection attacks
        if (
          !productId ||
          typeof productId !== "string" ||
          !/^[a-zA-Z0-9-_]+$/.test(productId)
        ) {
          throw new Error("Invalid product ID");
        }

        // Simulate secure database query (in real app, use parameterized queries)
        // const query = 'SELECT * FROM products WHERE id = $1';
        // const result = await db.query(query, [productId]);

        // Mock secure product fetch
        const mockProduct: Product = {
          id: productId,
          name: `Product ${productId}`,
          price: 99.99,
          description: "Sample product description",
          imageUrl: "/diverse-products-still-life.png",
        };

        setProduct(mockProduct);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading product...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Product not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={product.imageUrl || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="text-2xl font-bold text-green-600 mb-6">
              ${product.price.toFixed(2)}
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
