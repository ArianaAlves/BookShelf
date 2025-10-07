import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/header'

export const metadata: Metadata = {
  title: 'BookShelf',
  description: 'Gerencie sua biblioteca pessoal',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main className="container-responsive py-6">{children}</main>
        {/* Toaster do shadcn deve ser adicionado após rodar `shadcn add toast` */}
      </body>
    </html>
  )
}
