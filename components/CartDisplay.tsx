"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { useCart } from "./CartContext"
import type { JSX } from "react/jsx-runtime" // Declare JSX variable

export default function CartDisplay(): JSX.Element {
  const { cartItems, cartItemCount, totalPrice, removeFromCart, clearCart, updateQuantity } = useCart()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const handleQuantityChange = useCallback(
    (productId: string, newQuantity: number) => {
      updateQuantity(productId, newQuantity)
    },
    [updateQuantity],
  )

  const handleRemoveItem = useCallback(
    (productId: string) => {
      removeFromCart(productId)
    },
    [removeFromCart],
  )

  const handleClearCart = useCallback(() => {
    clearCart()
    setIsOpen(false)
  }, [clearCart])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleCart}
        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label={`Shopping cart with ${cartItemCount} items`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 7M7 13h10m0 0l1.5 7M7 13v8a2 2 0 002 2h8a2 2 0 002-2v-8"
          />
        </svg>
        <span>Cart ({cartItemCount})</span>
        {totalPrice > 0 && (
          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm font-medium">
            ${totalPrice.toFixed(2)}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Shopping Cart</h3>
              <button
                onClick={closeCart}
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded"
                aria-label="Close cart"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3 flex-1">
                        <img
                          src={item.imageUrl || "/placeholder.svg"}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                          <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded text-xs font-medium"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded text-xs font-medium"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className="text-sm font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700 p-1 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-gray-900">Total: ${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="space-y-2">
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                      Checkout
                    </button>
                    <button
                      onClick={handleClearCart}
                      className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
