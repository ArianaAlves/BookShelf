'use client'
import BookForm, { type BookFormValues } from '@/components/book-form'
import { useStore } from '@/lib/store'
import { useRouter } from 'next/navigation'

export default function NewBookPage() {
  const { add } = useStore()
  const router = useRouter()
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Adicionar novo livro</h1>
      <BookForm onSubmit={(values: BookFormValues) => {
        const id = add(values)
        router.push(`/books/${id}`)
      }} />
    </div>
  )
}
