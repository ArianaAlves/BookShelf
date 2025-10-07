'use client'
import { useStore } from '@/lib/store'

export default function StatsCards() {
  const { stats } = useStore()
  const items = [
    { label: 'Total de livros', value: stats.total },
    { label: 'Lendo agora', value: stats.reading },
    { label: 'Finalizados', value: stats.finished },
    { label: 'Páginas lidas', value: stats.totalPagesRead },
  ]
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((i) => (
        <div key={i.label} className="rounded-lg border p-6">
          <p className="text-sm text-zinc-500">{i.label}</p>
          <p className="mt-2 text-3xl font-semibold">{i.value}</p>
        </div>
      ))}
    </section>
  )
}
