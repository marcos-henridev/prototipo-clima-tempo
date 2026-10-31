# Clima Tempo

App Next.js 16 (App Router) + React 19 + TypeScript, CSS Modules, pnpm. API: Open-Meteo.

## Convenções

- **Todo componente novo ganha um teste.** Vale para componentes em `src/componentes/` (incluindo `ui/`) e para páginas/rotas em `src/app/`. O teste fica ao lado do arquivo: `nome.tsx` → `nome.test.tsx`. Hooks e funções em `src/data/` também.
- Testes com Jest + Testing Library (`pnpm test`). Prefira queries por papel/nome acessível (`getByRole`) e `userEvent` para interação. Nunca chame a API real: simule `fetch`.
- Componentes reaproveitáveis ficam em `src/componentes/ui/` (um diretório por componente, com `.module.css`) e são exportados em `src/componentes/ui/index.ts`. Reaproveite-os em vez de recriar estilos.
- Antes de concluir: `pnpm exec tsc --noEmit`, `pnpm lint` e `pnpm test` sem erros.
- Constantes (tabelas, valores fixos) ficam em `src/constants/`, exportadas de lá. Não declare constantes grandes dentro de `src/data/` ou de componentes.
- Layout responsivo: desktop é o padrão; ajustes de mobile ficam em `@media (max-width: 700px)`, no `.module.css` do próprio componente.
- Textos da interface e comentários em pt-BR.
