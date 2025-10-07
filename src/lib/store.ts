'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Book } from './types'

export type Stats = {
  total: number
  reading: number
  finished: number
  totalPagesRead: number
}

function computeStats(books: Book[]): Stats {
  const total = books.length
  const reading = books.filter(b => b.status === 'LENDO').length
  const finished = books.filter(b => b.status === 'LIDO').length
  const totalPagesRead = books.reduce((acc, b) => acc + (b.currentPage || 0), 0)
  return { total, reading, finished, totalPagesRead }
}

export type Store = {
  books: Book[]
  stats: Stats
  add: (b: Omit<Book, 'id'>) => string
  update: (id: string, b: Partial<Book>) => void
  remove: (id: string) => void
  get: (id: string) => Book | undefined
}

const seed: Book[] = [
  {
    id: '1',
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    genre: 'Literatura Brasileira',
    year: 1899,
    pages: 288,
    rating: 5,
    synopsis: 'Clássico da literatura brasileira narrado por Bentinho...',
    cover: 'https://covers.openlibrary.org/b/id/10523305-L.jpg',
    status: 'LIDO',
    currentPage: 288
  },
  {
    id: '2',
    title: 'Duna',
    author: 'Frank Herbert',
    genre: 'Ficção Científica',
    year: 1965,
    pages: 688,
    rating: 5,
    synopsis: 'Intrigas políticas e ecológicas no planeta Arrakis.',
    cover: 'https://m.media-amazon.com/images/I/81t7m0Gm7XL._SY466_.jpg',
    status: 'LENDO',
    currentPage: 210
  },
  {
    id: '3',
    title: 'Cem Anos de Solidão',
    author: 'Gabriel García Márquez',
    genre: 'Realismo Mágico',
    year: 1967,
    pages: 432,
    rating: 4,
    synopsis: 'A saga da família Buendía em Macondo.',
    cover: 'https://m.media-amazon.com/images/I/81k-5b2hQ3L._SY466_.jpg',
    status: 'QUERO_LER',
    currentPage: 0
  },
  {
    id: '4',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    genre: 'Programação',
    year: 2008,
    pages: 464,
    rating: 5,
    synopsis: 'Práticas para escrever código limpo e sustentável.',
    cover: 'https://m.media-amazon.com/images/I/41SH-SvWPxL.jpg',
    status: 'LIDO',
    currentPage: 464
  },
  {
    id: '5',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    genre: 'História',
    year: 2011,
    pages: 512,
    rating: 4,
    synopsis: 'Uma breve história da humanidade.',
    cover: 'https://m.media-amazon.com/images/I/71tbalAHYCL.jpg',
    status: 'PAUSADO',
    currentPage: 120
  }
]

function nanoid(n:number=10){
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz'
  let s=''
  for(let i=0;i<n;i++) s += chars[Math.floor(Math.random()*chars.length)]
  return s
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      books: seed,
      stats: computeStats(seed),
      add: (b) => {
        const id = nanoid(10)
        const books = [...get().books, { ...b, id }]
        set({ books, stats: computeStats(books) })
        return id
      },
      update: (id, patch) => {
        const books = get().books.map(b => (b.id === id ? { ...b, ...patch } : b))
        set({ books, stats: computeStats(books) })
      },
      remove: (id) => {
        const books = get().books.filter(b => b.id !== id)
        set({ books, stats: computeStats(books) })
      },
      get: (id) => get().books.find(b => b.id === id),
    }),
    { name: 'bookshelf-store' }
  )
)
