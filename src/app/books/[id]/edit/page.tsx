'use client'
import { useParams, useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import BookForm, { type BookFormValues } from '@/components/book-form'

export default function EditBookPage() {
  const { id } = useParams<{ id: string }>()
  const { get, update } = useStore()
  const router = useRouter()
  const book = get(id)

  if (!book) return <p className="text-sm text-zinc-500">Livro não encontrado.</p>

  const initial: BookFormValues = { ...book }
  delete (initial as any).id

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Editar livro</h1>
      <BookForm
        initial={initial}
        cta="Salvar alterações"
        onSubmit={(values) => {
          update(book.id, values)
          router.push(`/books/${book.id}`)
        }}
      />
    </div>
  )
}
