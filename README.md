# BookShelf

Projeto Next.js 15 + React 19 + TypeScript + Tailwind para gerenciar uma biblioteca pessoal.

## Rodando

```bash
pnpm install
pnpm dev
```

> Opcional: se quiser usar **shadcn/ui**, rode os comandos abaixo e troque os botões/inputs simples pelos componentes do shadcn:
```bash
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button card input textarea select label badge dialog dropdown-menu toast
```

## Estrutura
- Dashboard com estatísticas
- Biblioteca com busca/filtro
- Criar/Editar/Detalhes de livro
- Persistência local com Zustand
