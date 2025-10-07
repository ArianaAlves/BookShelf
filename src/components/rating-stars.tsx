'use client'
import { Star } from 'lucide-react'

export default function RatingStars({ value = 0 }: { value?: number }) {
  return (
    <div className="inline-flex items-center">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Star
          key={idx}
          size={16}
          className={idx < (value || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-zinc-300'}
        />
      ))}
    </div>
  )
}
