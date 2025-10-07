'use client'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useStore } from '@/lib/store'
import RatingStars from '@/components/rating-stars'
import { fallbackCover } from '@/lib/utils'
import Link from 'next/link'
import ConfirmDialog from '@/components/confirm-dialog'

export default function BookDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const { get, remove } = useStore()
  const router = useRouter()
  const book = get(id)

  if (!book) return <p className="text-sm text-zinc-500">Livro não encontrado.</p>

  return (
    <div className="grid gap-6 md:grid-cols-[300px,1fr]">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
        <Image src={book.cover || fallbackCover} alt={book.title} fill className="object-cover" />
      </div>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold">{book.title}</h1>
          <p className="text-zinc-600">{book.author} {book.year ? `• ${book.year}` : ''}</p>
          <div className="mt-2 flex items-center gap-2">
            {book.genre && <span className="rounded-full border px-2 py-0.5 text-xs">{book.genre}</span>}
            <RatingStars value={book.rating} />
          </div>
        </div>
        {book.synopsis && (
          <section>
            <h2 className="mb-1 text-sm font-medium uppercase tracking-wide text-zinc-500">Sinopse</h2>
            <p className="leading-relaxed text-zinc-800">{book.synopsis}</p>
          </section>
        )}
        <dl className="grid grid-cols-2 gap-3 rounded-lg border p-3 text-sm">
          <div>
            <dt className="text-zinc-500">Páginas</dt>
            <dd className="font-medium">{book.pages ?? '-'}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Página atual</dt>
            <dd className="font-medium">{book.currentPage ?? '-'}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Status</dt>
            <dd className="font-medium">{book.status ?? '-'}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">ISBN</dt>
            <dd className="font-medium">{book.isbn ?? '-'}</dd>
          </div>
        </dl>

        <div className="flex flex-wrap gap-3">
          <Link href={`/books/${book.id}/edit`} className="rounded-md border px-4 py-2 hover:bg-zinc-50">Editar</Link>
          <ConfirmDialog
            title="Excluir livro"
            description="Tem certeza que deseja excluir este livro? Essa ação não pode ser desfeita."
            onConfirm={() => { remove(book.id); router.push('/books') }}
          >
            <button className="rounded-md border border-red-300 px-4 py-2 text-red-600 hover:bg-red-50">Excluir</button>
          </ConfirmDialog>
        </div>
      </div>
    </div>
  )
}
