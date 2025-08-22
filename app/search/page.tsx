"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import type { JSX } from "react/jsx-runtime" // Import JSX to fix the undeclared variable error

interface Comment {
  id: string
  content: string
  timestamp: Date
}

export default function SearchPage(): JSX.Element {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [userInput, setUserInput] = useState("")
  const [comments, setComments] = useState<Comment[]>([])
  const [error, setError] = useState<string | null>(null)

  const sanitizeInput = (input: string): string => {
    return input
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;")
  }

  const validateInput = (input: string): boolean => {
    if (input.length > 500) {
      setError("Comment must be less than 500 characters")
      return false
    }
    if (input.trim().length === 0) {
      setError("Comment cannot be empty")
      return false
    }
    return true
  }

  const handleCommentSubmit = () => {
    setError(null)

    if (!validateInput(userInput)) {
      return
    }

    const sanitizedComment = sanitizeInput(userInput.trim())
    const newComment: Comment = {
      id: Date.now().toString(),
      content: sanitizedComment,
      timestamp: new Date(),
    }

    setComments((prev) => [...prev, newComment])
    setUserInput("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleCommentSubmit()
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Search Results</h1>

      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <p className="text-gray-700">
          You searched for: <strong className="text-gray-900">{sanitizeInput(query)}</strong>
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Leave a Comment</h2>

        {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

        <div className="space-y-4">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="Enter your comment... (Ctrl+Enter to submit)"
            maxLength={500}
          />

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{userInput.length}/500 characters</span>
            <button
              onClick={handleCommentSubmit}
              disabled={userInput.trim().length === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Submit Comment
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Comments ({comments.length})</h3>
          {comments.length === 0 ? (
            <p className="text-gray-500 italic">No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <p className="text-gray-800 whitespace-pre-wrap">{comment.content}</p>
                <div className="mt-2 text-xs text-gray-500">{comment.timestamp.toLocaleString()}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
