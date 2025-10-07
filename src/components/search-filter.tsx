'use client'
import { GENRES } from '@/lib/genres'

export default function SearchFilter({
  q,
  genre,
  onChange
}: {
  q: string
  genre?: string
  onChange: (next: { q: string; genre?: string }) => void
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <input
        placeholder="Buscar por título ou autor..."
        value={q}
        onChange={(e) => onChange({ q: e.target.value, genre })}
        aria-label="Buscar"
        className="w-full rounded-md border px-3 py-2"
      />
      <select
        value={genre || ''}
        onChange={(e) => onChange({ q, genre: e.target.value || undefined })}
        className="w-full rounded-md border px-3 py-2"
        aria-label="Filtrar por gênero"
      >
        <option value="">Todos os gêneros</option>
        {GENRES.map(g => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>
    </div>
  )
}
