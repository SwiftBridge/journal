'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import { CONTRACT_ADDRESS, JOURNAL_ABI } from '../contracts/Journal'
import { formatDistanceToNow } from 'date-fns'

const MOODS = [
  { value: 'happy', emoji: '😊', label: 'Happy' },
  { value: 'excited', emoji: '🤩', label: 'Excited' },
  { value: 'grateful', emoji: '🙏', label: 'Grateful' },
  { value: 'calm', emoji: '😌', label: 'Calm' },
  { value: 'neutral', emoji: '😐', label: 'Neutral' },
  { value: 'sad', emoji: '😢', label: 'Sad' },
  { value: 'anxious', emoji: '😰', label: 'Anxious' },
  { value: 'angry', emoji: '😠', label: 'Angry' },
]

export default function EntriesSection({ entries, entryFee, refetch }) {
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [mood, setMood] = useState('neutral')
  const [isPrivate, setIsPrivate] = useState(false)
  const { address } = useAccount()

  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const handleSubmit = async (e) => {
    e.preventDefault()

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: JOURNAL_ABI,
      functionName: 'addEntry',
      args: [title, content, mood, isPrivate],
      value: entryFee,
    })
  }

  const handleTogglePrivacy = (entryId) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: JOURNAL_ABI,
      functionName: 'togglePrivacy',
      args: [entryId],
    })
  }

  if (isSuccess) {
    setTimeout(() => {
      setTitle('')
      setContent('')
      setMood('neutral')
      setIsPrivate(false)
      setShowForm(false)
      refetch()
    }, 2000)
  }

  const getMoodEmoji = (moodValue) => {
    return MOODS.find(m => m.value === moodValue)?.emoji || '😐'
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">📔</span>
          <h2 className="text-2xl font-bold text-white">Journal Entries</h2>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
        >
          {showForm ? 'Cancel' : '+ New Entry'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 bg-gray-900 p-6 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="How was your day?"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Entry *</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              placeholder="Write your thoughts..."
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-primary-500 focus:outline-none resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Mood</label>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {MOODS.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => setMood(m.value)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    mood === m.value
                      ? 'border-primary-500 bg-primary-900/30 scale-110'
                      : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  }`}
                >
                  <div className="text-2xl">{m.emoji}</div>
                  <div className="text-xs text-gray-400 mt-1">{m.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPrivate"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="isPrivate" className="text-gray-300">
              🔒 Make this entry private (only you can view)
            </label>
          </div>

          <div className="flex items-center justify-between pt-4">
            <p className="text-sm text-gray-400">
              Fee: <span className="text-primary-500 font-bold">{entryFee ? `${Number(entryFee) / 1e18} ETH` : '...'}</span>
            </p>
            <button
              type="submit"
              disabled={isPending || isConfirming}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              {isPending && 'Sending...'}
              {isConfirming && 'Confirming...'}
              {!isPending && !isConfirming && 'Save Entry'}
            </button>
          </div>

          {isSuccess && (
            <div className="bg-green-900/30 border border-green-700 text-green-400 px-4 py-3 rounded-lg">
              Entry saved successfully!
            </div>
          )}
        </form>
      )}

      {/* Display entries */}
      {!entries || entries.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-3">📔</div>
          <p className="text-gray-400">No journal entries yet</p>
          <p className="text-gray-500 text-sm mt-2">Click "+ New Entry" to start journaling</p>
        </div>
      ) : (
        <div className="space-y-4">
          {[...entries].reverse().map((entry) => {
            const isOwner = address && entry.owner.toLowerCase() === address.toLowerCase()

            return (
              <div
                key={entry.id.toString()}
                className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-primary-600 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{getMoodEmoji(entry.mood)}</span>
                    <h3 className="text-xl font-bold text-white">{entry.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {entry.isPrivate && (
                      <span className="bg-gray-800 border border-gray-600 text-gray-400 px-3 py-1 rounded-full text-xs">
                        🔒 Private
                      </span>
                    )}
                    {isOwner && (
                      <button
                        onClick={() => handleTogglePrivacy(entry.id)}
                        disabled={isPending || isConfirming}
                        className="text-gray-400 hover:text-primary-500 text-sm transition-colors"
                      >
                        {entry.isPrivate ? '🔓' : '🔒'}
                      </button>
                    )}
                  </div>
                </div>

                <div className="text-gray-300 mb-4 whitespace-pre-wrap break-words">
                  {entry.content}
                </div>

                <div className="text-xs text-gray-400">
                  {new Date(Number(entry.timestamp) * 1000).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  {' • '}
                  {formatDistanceToNow(new Date(Number(entry.timestamp) * 1000), { addSuffix: true })}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
