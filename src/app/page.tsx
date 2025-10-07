import StatsCards from '@/components/stats-cards'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <StatsCards />
      <div className="flex flex-wrap gap-3">
        <Link href="/books" className="rounded-md border px-4 py-2 hover:bg-zinc-50">Ir para Biblioteca</Link>
        <Link href="/books/new" className="rounded-md border px-4 py-2 hover:bg-zinc-50">Adicionar Livro</Link>
      </div>
    </div>
  )
}
