'use client'
import { useState } from 'react'

export default function ConfirmDialog({
  title,
  description,
  onConfirm,
  children,
}: {
  title: string
  description?: string
  onConfirm: () => void
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <span onClick={() => setOpen(true)} className="inline-block">{children}</span>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-lg bg-white p-4 shadow-lg">
            <h3 className="text-lg font-semibold">{title}</h3>
            {description && <p className="mt-1 text-sm text-zinc-600">{description}</p>}
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="rounded-md border px-3 py-1.5">Cancelar</button>
              <button onClick={() => { onConfirm(); setOpen(false) }} className="rounded-md bg-red-600 px-3 py-1.5 text-white">Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
