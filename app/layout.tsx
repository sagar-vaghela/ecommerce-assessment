import type React from "react";
// app/layout.tsx

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../components/CartContext";
import CartDisplay from "../components/CartDisplay";
import ErrorBoundary from "../components/ErrorBoundary";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StyleStore - Premium Fashion & Lifestyle",
  description:
    "Discover our curated collection of premium products, carefully selected for style and quality.",
  keywords:
    "fashion, lifestyle, premium products, online shopping, clothing, accessories",
  authors: [{ name: "StyleStore Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <CartProvider>
            <header
              className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40"
              role="banner"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div
                      className="bg-blue-600 text-white p-2 rounded-lg"
                      aria-hidden="true"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      <Link
                        href="/"
                        className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                      >
                        StyleStore
                      </Link>
                    </h1>
                  </div>

                  <nav
                    className="hidden md:flex items-center space-x-6"
                    role="navigation"
                    aria-label="Main navigation"
                  >
                    <Link
                      href="/"
                      className="text-gray-700 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                      aria-current="page"
                    >
                      Home
                    </Link>
                    <Link
                      href="/products"
                      className="text-gray-700 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                    >
                      Products
                    </Link>
                    <Link
                      href="/about"
                      className="text-gray-700 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                    >
                      About
                    </Link>
                    <Link
                      href="/contact"
                      className="text-gray-700 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                    >
                      Contact
                    </Link>
                  </nav>

                  <CartDisplay />
                </div>
              </div>
            </header>

            {children}

            <footer
              className="bg-gray-900 text-white py-8 mt-16"
              role="contentinfo"
            >
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <h2 className="text-lg font-semibold mb-4">StyleStore</h2>
                    <p className="text-gray-400">
                      Your destination for premium fashion and lifestyle
                      products.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-3 text-gray-300">
                      SHOP
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>
                        <Link
                          href="/products"
                          className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded"
                        >
                          All Products
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/new-arrivals"
                          className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded"
                        >
                          New Arrivals
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/sale"
                          className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded"
                        >
                          Sale
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-3 text-gray-300">
                      SUPPORT
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>
                        <Link
                          href="/contact"
                          className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded"
                        >
                          Contact Us
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/shipping"
                          className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded"
                        >
                          Shipping Info
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/returns"
                          className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded"
                        >
                          Returns
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-3 text-gray-300">
                      CONNECT
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>
                        <Link
                          href="/newsletter"
                          className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded"
                        >
                          Newsletter
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/social"
                          className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded"
                        >
                          Social Media
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
                  <p>&copy; 2024 StyleStore. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </CartProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
