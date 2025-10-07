'use client'
import { useMemo, useState } from 'react'
import { useStore } from '@/lib/store'
import BookCard from '@/components/book-card'
import SearchFilter from '@/components/search-filter'

export default function BooksPage() {
  const { books, remove } = useStore()
  const [q, setQ] = useState('')
  const [genre, setGenre] = useState<string | undefined>()

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    return books.filter(b => {
      const matchQ = !query || b.title.toLowerCase().includes(query) || b.author.toLowerCase().includes(query)
      const matchG = !genre || b.genre === genre
      return matchQ && matchG
    })
  }, [books, q, genre])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Biblioteca</h1>
      </div>

      <SearchFilter q={q} genre={genre} onChange={({ q, genre }) => { setQ(q); setGenre(genre) }} />

      {filtered.length === 0 ? (
        <p className="text-sm text-zinc-500">Nenhum livro encontrado.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(b => (
            <BookCard key={b.id} book={b} onDelete={() => remove(b.id)} />
          ))}
        </div>
      )}
    </div>
  )
}
