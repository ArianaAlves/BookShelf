'use client'
import Link from 'next/link'
import Image from 'next/image'
import RatingStars from './rating-stars'
import type { Book } from '@/lib/types'
import { fallbackCover } from '@/lib/utils'

export default function BookCard({ book, onDelete }: { book: Book; onDelete?: () => void }) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="relative aspect-[3/4] w-full">
        <Image
          src={book.cover || fallbackCover}
          alt={book.title}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 33vw"
        />
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="line-clamp-1 font-medium">{book.title}</h3>
            <p className="text-sm text-zinc-500">{book.author} {book.year ? `• ${book.year}` : ''}</p>
          </div>
          {book.genre && <span className="rounded-full border px-2 py-0.5 text-xs">{book.genre}</span>}
        </div>
        <RatingStars value={book.rating} />
      </div>
      <div className="flex gap-2 p-4 pt-0">
        <Link href={`/books/${book.id}`} className="rounded-md border px-3 py-1.5 text-sm hover:bg-zinc-50">Ver</Link>
        <Link href={`/books/${book.id}/edit`} className="rounded-md border px-3 py-1.5 text-sm hover:bg-zinc-50">Editar</Link>
        <button onClick={onDelete} className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50">Excluir</button>
      </div>
    </div>
  )
}
