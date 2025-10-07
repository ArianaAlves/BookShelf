export type ReadingStatus =
  | 'QUERO_LER'
  | 'LENDO'
  | 'LIDO'
  | 'PAUSADO'
  | 'ABANDONADO'

export type Book = {
  id: string
  title: string
  author: string
  genre?: string
  year?: number
  pages?: number
  rating?: number // 1-5
  synopsis?: string
  cover?: string
  status?: ReadingStatus
  currentPage?: number
  isbn?: string
  notes?: string
}
