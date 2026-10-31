# Clima Tempo

App web para consultar o clima atual de uma cidade. Você digita o nome da cidade e ele mostra a temperatura e as condições do tempo naquele momento.

> 🚧 **Em desenvolvimento.** A interface e o hook de busca (`useClima`) estão prontos e testados, mas ainda não foram ligados um ao outro na tela.

## Tecnologias

- [Next.js 16](https://nextjs.org) (App Router) + [React 19](https://react.dev) + TypeScript
- CSS Modules
- [Open-Meteo](https://open-meteo.com): API de clima e geocoding gratuita, **sem chave de API**
- [Jest](https://jestjs.io) + [Testing Library](https://testing-library.com)
- [pnpm](https://pnpm.io)

## Como rodar

Pré-requisitos: Node.js 20+ e pnpm.

```bash
pnpm install
pnpm dev
```

Depois, abra [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | O que faz |
|---|---|
| `pnpm dev` | Servidor de desenvolvimento |
| `pnpm build` | Build de produção |
| `pnpm start` | Roda o build de produção |
| `pnpm lint` | ESLint |
| `pnpm test` | Roda os testes |
| `pnpm test:watch` | Testes em modo watch |

## Estrutura

```
src/
├── app/                  # Rotas do Next (layout e página inicial)
├── componentes/
│   ├── home/             # Tela principal
│   └── ui/               # Componentes reaproveitáveis: Button, Input, Card, Text
└── data/
    └── hookcustumer.ts   # Hook useClima: busca a cidade e o clima na Open-Meteo
```

Os componentes de `ui` podem ser importados todos de um lugar só:

```tsx
import { Button, Card, Input, Text } from "@/componentes/ui";
```

## Como a busca funciona

O `useClima(cidade)` faz duas chamadas à Open-Meteo:

1. **Geocoding:** converte o nome da cidade em latitude e longitude.
2. **Forecast:** busca a temperatura, o código do tempo (`weather_code`) e se é dia ou noite.

O hook devolve `{ dados, carregando, erro }`. Quando a cidade muda, a busca anterior é cancelada.

## Testes

Cada arquivo de teste (`*.test.ts(x)`) fica ao lado do arquivo que ele testa. Nos testes do hook, o `fetch` é simulado, então nenhum teste chama a API de verdade.

```bash
pnpm test
```
