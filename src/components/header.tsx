'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { BookOpen, Library, PlusCircle } from 'lucide-react'

export default function Header() {
  const pathname = usePathname()
  const links = [
    { href: '/', label: 'Dashboard', icon: BookOpen },
    { href: '/books', label: 'Biblioteca', icon: Library },
    { href: '/books/new', label: 'Adicionar', icon: PlusCircle },
  ]
  return (
    <header className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
      <div className="container-responsive flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold">BookShelf</Link>
        <nav className="flex gap-1">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-zinc-100',
                pathname === href && 'bg-zinc-100 font-medium'
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
