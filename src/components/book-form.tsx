'use client'
import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { GENRES } from '@/lib/genres'
import type { Book, ReadingStatus } from '@/lib/types'
import { fallbackCover } from '@/lib/utils'

export type BookFormValues = Omit<Book, 'id'>

const statuses: { value: ReadingStatus; label: string }[] = [
  { value: 'QUERO_LER', label: 'Quero ler' },
  { value: 'LENDO', label: 'Lendo' },
  { value: 'LIDO', label: 'Lido' },
  { value: 'PAUSADO', label: 'Pausado' },
  { value: 'ABANDONADO', label: 'Abandonado' },
]

export default function BookForm({
  initial,
  onSubmit,
  cta = 'Salvar'
}: {
  initial?: BookFormValues
  onSubmit: (values: BookFormValues) => void
  cta?: string
}) {
  const [values, setValues] = useState<BookFormValues>(initial || { title: '', author: '' })
  const [errors, setErrors] = useState<Record<string, string | undefined>>({})

  const completion = useMemo(() => {
    const required = ['title', 'author']
    const filled = required.filter(k => (values as any)[k]?.toString().trim().length)
    const opt = ['pages', 'currentPage', 'status', 'isbn', 'cover', 'genre', 'rating', 'synopsis', 'notes', 'year']
    const optFilled = opt.filter(k => (values as any)[k] !== undefined && (values as any)[k] !== '')
    const total = required.length + opt.length
    return Math.round(((filled.length + optFilled.length) / total) * 100)
  }, [values])

  useEffect(() => {
    const e: Record<string, string | undefined> = {}
    if (!values.title?.trim()) e.title = 'Título é obrigatório'
    if (!values.author?.trim()) e.author = 'Autor é obrigatório'
    if (values.rating && (values.rating < 1 || values.rating > 5)) e.rating = 'Avaliação deve ser 1-5'
    if (values.pages && values.pages < 0) e.pages = 'Valor inválido'
    if (values.currentPage && values.pages && values.currentPage > values.pages) e.currentPage = 'Acima do total de páginas'
    setErrors(e)
  }, [values])

  return (
    <form
      className="grid gap-4 lg:grid-cols-2"
      onSubmit={(e) => { e.preventDefault(); if (Object.values(errors).some(Boolean)) return; onSubmit(values) }}
    >
      <div className="space-y-3">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">Título*</label>
          <input id="title" value={values.title || ''} onChange={(e) => setValues(v => ({ ...v, title: e.target.value }))} aria-invalid={!!errors.title} className="mt-1 w-full rounded-md border px-3 py-2" />
          {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium">Autor*</label>
          <input id="author" value={values.author || ''} onChange={(e) => setValues(v => ({ ...v, author: e.target.value }))} aria-invalid={!!errors.author} className="mt-1 w-full rounded-md border px-3 py-2" />
          {errors.author && <p className="text-sm text-red-600">{errors.author}</p>}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="year" className="block text-sm font-medium">Ano</label>
            <input id="year" type="number" value={values.year ?? ''} onChange={(e) => setValues(v => ({ ...v, year: Number(e.target.value) || undefined }))} className="mt-1 w-full rounded-md border px-3 py-2" />
          </div>
          <div>
            <label htmlFor="isbn" className="block text-sm font-medium">ISBN</label>
            <input id="isbn" value={values.isbn ?? ''} onChange={(e) => setValues(v => ({ ...v, isbn: e.target.value }))} className="mt-1 w-full rounded-md border px-3 py-2" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="pages" className="block text-sm font-medium">Total de páginas</label>
            <input id="pages" type="number" value={values.pages ?? ''} onChange={(e) => setValues(v => ({ ...v, pages: Number(e.target.value) || undefined }))} className="mt-1 w-full rounded-md border px-3 py-2" />
            {errors.pages && <p className="text-sm text-red-600">{errors.pages}</p>}
          </div>
          <div>
            <label htmlFor="currentPage" className="block text-sm font-medium">Página atual</label>
            <input id="currentPage" type="number" value={values.currentPage ?? ''} onChange={(e) => setValues(v => ({ ...v, currentPage: Number(e.target.value) || undefined }))} className="mt-1 w-full rounded-md border px-3 py-2" />
            {errors.currentPage && <p className="text-sm text-red-600">{errors.currentPage}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium">Gênero</label>
            <select value={values.genre || ''} onChange={(e) => setValues(v => ({ ...v, genre: e.target.value || undefined }))} className="mt-1 w-full rounded-md border px-3 py-2">
              <option value="">Não definido</option>
              {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Status de leitura</label>
            <select value={values.status || ''} onChange={(e) => setValues(v => ({ ...v, status: (e.target.value || undefined) as any }))} className="mt-1 w-full rounded-md border px-3 py-2">
              <option value="">Não definido</option>
              {statuses.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="rating" className="block text-sm font-medium">Avaliação (1-5)</label>
            <input id="rating" type="number" value={values.rating ?? ''} onChange={(e) => setValues(v => ({ ...v, rating: Number(e.target.value) || undefined }))} className="mt-1 w-full rounded-md border px-3 py-2" />
            {errors.rating && <p className="text-sm text-red-600">{errors.rating}</p>}
          </div>
          <div>
            <label htmlFor="cover" className="block text-sm font-medium">URL da capa</label>
            <input id="cover" value={values.cover ?? ''} onChange={(e) => setValues(v => ({ ...v, cover: e.target.value }))} className="mt-1 w-full rounded-md border px-3 py-2" />
          </div>
        </div>
        <div>
          <label htmlFor="synopsis" className="block text-sm font-medium">Sinopse</label>
          <textarea id="synopsis" rows={4} value={values.synopsis ?? ''} onChange={(e) => setValues(v => ({ ...v, synopsis: e.target.value }))} className="mt-1 w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium">Notas pessoais</label>
          <textarea id="notes" rows={3} value={values.notes ?? ''} onChange={(e) => setValues(v => ({ ...v, notes: e.target.value }))} className="mt-1 w-full rounded-md border px-3 py-2" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border p-3">
          <p className="mb-2 text-sm text-zinc-500">Preview da capa</p>
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-zinc-100">
            <Image src={values.cover || fallbackCover} alt="Preview capa" fill className="object-cover" />
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm text-zinc-500">Progresso do formulário</p>
          <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200">
            <div className="h-full bg-zinc-800 transition-all" style={{ width: `${completion}%` }} />
          </div>
          <p className="mt-1 text-xs text-zinc-500">{completion}%</p>
        </div>
        <div className="sticky bottom-0 flex gap-3">
          <button type="submit" disabled={Object.values(errors).some(Boolean)} className="w-full rounded-md bg-zinc-900 px-4 py-2 text-white disabled:opacity-60">{cta}</button>
        </div>
      </div>
    </form>
  )
}
