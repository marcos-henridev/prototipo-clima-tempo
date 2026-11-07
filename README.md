# Clima Tempo

[![CI](https://github.com/marcos-henridev/prototipo-clima-tempo/actions/workflows/ci.yml/badge.svg)](https://github.com/marcos-henridev/prototipo-clima-tempo/actions/workflows/ci.yml)

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

| Comando           | O que faz                   |
| ----------------- | --------------------------- |
| `pnpm dev`        | Servidor de desenvolvimento |
| `pnpm build`      | Build de produção           |
| `pnpm start`      | Roda o build de produção    |
| `pnpm lint`       | ESLint                      |
| `pnpm test`       | Roda os testes              |
| `pnpm test:watch` | Testes em modo watch        |

## Estrutura

```
public/
├── sw.js                 # Service worker (cache offline)
└── IconsManifest/        # Ícones do app (SVG e PNG 192x192) e screenshots
src/
├── app/
│   ├── layout.tsx        # Layout raiz (registra o service worker)
│   ├── manifest.ts       # Web App Manifest (PWA)
│   └── page.tsx          # Página inicial
├── componentes/
│   ├── app.js            # RegisterSw: registra o /sw.js no navegador
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

## PWA (instalar no celular)

O app pode ser instalado na tela inicial do celular ou do computador.

- **Manifest:** [`src/app/manifest.ts`](src/app/manifest.ts) gera o `/manifest.webmanifest` com nome, cores e ícones (PNG 192x192 para Android e SVG).
- **Service worker:** [`public/sw.js`](public/sw.js) guarda a página inicial e os ícones em cache, e responde do cache primeiro (cache-first), usando a rede quando o arquivo não está salvo.
- **Registro:** o componente `RegisterSw` ([`src/componentes/app.js`](src/componentes/app.js)) registra o `/sw.js` quando a página carrega.

O service worker só funciona em `localhost` ou em HTTPS. Para conferir, abra o DevTools → **Application** → **Service Workers**.

> Ao publicar uma mudança importante, aumente a versão em `CACHE_NAME` no `sw.js` (ex.: `clima-tempo-cache-v2`). Assim o cache antigo é apagado e os usuários recebem a versão nova.

## Testes

Cada arquivo de teste (`*.test.ts(x)`) fica ao lado do arquivo que ele testa. Nos testes do hook, o `fetch` é simulado, então nenhum teste chama a API de verdade.

```bash
pnpm test
```

## CI

O workflow [`.github/workflows/ci.yml`](.github/workflows/ci.yml) roda a cada push na `main` e em cada pull request. Ele faz lint, checagem de tipos, testes e build.

# Link do site no ar

## [https://clima-tempo.vercel.app/](https://clima-tempo.vercel.app/)
