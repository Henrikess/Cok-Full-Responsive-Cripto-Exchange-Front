# Arquitetura — Dashboard MB

## Visão Geral

O Dashboard MB é um painel web pessoal para visualização de dados da conta no Mercado Bitcoin. A aplicação é construída como um monolito Next.js com App Router, onde o backend (rotas de API) e o frontend (componentes React) coexistem no mesmo projeto.

---

## Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 14 (App Router) |
| Linguagem | TypeScript 5 |
| Estilização | Tailwind CSS 3 |
| Gráficos | Recharts |
| Autenticação | JWT via `jose` |
| Cache | In-memory com TTL |
| Deploy | Heroku |

---

## Estrutura de Pastas

```
src/
├── app/                         # Rotas e páginas (Next.js App Router)
│   ├── (dashboard)/             # Grupo de rotas protegidas pelo middleware
│   │   ├── layout.tsx           # Layout com Sidebar e Header
│   │   ├── dashboard/page.tsx   # Página: visão geral
│   │   ├── assets/page.tsx      # Página: saldos por ativo
│   │   ├── orders/page.tsx      # Página: histórico de ordens
│   │   └── bot/page.tsx         # Página: status do bot
│   ├── login/page.tsx           # Página de autenticação (pública)
│   ├── api/                     # Rotas de API internas (server-side)
│   │   ├── auth/login/route.ts  # POST /api/auth/login
│   │   ├── auth/logout/route.ts # POST /api/auth/logout
│   │   ├── overview/route.ts    # GET  /api/overview
│   │   ├── assets/route.ts      # GET  /api/assets
│   │   └── orders/route.ts      # GET  /api/orders
│   ├── globals.css              # Estilos globais e variáveis CSS
│   ├── layout.tsx               # Layout raiz (html, body, dark mode)
│   └── page.tsx                 # Redirect para /dashboard
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx          # Navegação lateral
│   │   └── Header.tsx           # Cabeçalho com botão de atualização
│   └── ui/                      # Componentes reutilizáveis
│       ├── Badge.tsx            # Badge de status de ordens
│       ├── Button.tsx           # Botão genérico
│       ├── Card.tsx             # Container de card
│       ├── EmptyState.tsx       # Estado vazio
│       ├── ErrorState.tsx       # Estado de erro
│       └── LoadingState.tsx     # Estado de carregamento
│
├── lib/
│   ├── auth/session.ts          # Criação e validação de sessão JWT
│   ├── cache/memory-cache.ts    # Cache in-memory com TTL
│   ├── mb-api/client.ts         # Cliente HTTP para a API do Mercado Bitcoin
│   └── utils.ts                 # Funções utilitárias (formatação, cn)
│
├── middleware.ts                 # Proteção de rotas via JWT cookie
│
└── types/
    ├── contracts.ts             # Interfaces internas da aplicação
    └── mb-api.ts                # Tipos crus da API do Mercado Bitcoin
```

---

## Estratégia de Autenticação

A autenticação é simples e baseada em credenciais estáticas (usuário/senha) definidas via variáveis de ambiente. Não há banco de dados ou sistema de usuários.

**Fluxo:**

1. O usuário acessa `/login` e submete o formulário com usuário e senha.
2. O frontend envia `POST /api/auth/login` com as credenciais.
3. O backend valida as credenciais contra `AUTH_USERNAME` e `AUTH_PASSWORD`.
4. Em caso de sucesso, gera um JWT assinado com `AUTH_SECRET` (HS256, validade 8h) e o define como cookie HTTP-only (`mb_session`).
5. O middleware Next.js (`src/middleware.ts`) intercepta todas as requisições não públicas, valida o cookie JWT e redireciona para `/login` se inválido ou ausente.

**Segurança:**
- Cookie `httpOnly` impede acesso via JavaScript.
- Cookie `secure` é habilitado em produção.
- Cookie `sameSite: lax` mitiga CSRF básico.
- O JWT é assinado com uma chave secreta de pelo menos 32 caracteres.

---

## Estratégia de Cache

O cache é in-memory, implementado na classe `MemoryCache` em `src/lib/cache/memory-cache.ts`.

- Cada entrada possui um TTL em segundos configurável via variáveis de ambiente.
- O cache evita chamadas repetidas à API do Mercado Bitcoin (que tem limites de taxa).
- Entradas expiradas são removidas na próxima leitura (lazy expiration).
- O cache reside no processo Node.js — em caso de restart do servidor, o cache é zerado.

**TTLs padrão:**
- Saldos (`CACHE_BALANCES_TTL`): 30 segundos
- Ordens (`CACHE_ORDERS_TTL`): 20 segundos

---

## Estratégia de Deploy (Heroku)

A aplicação é implantada no Heroku utilizando o buildpack Node.js padrão.

1. O `Procfile` instrui o Heroku a executar `npm run start` (Next.js production server).
2. As variáveis de ambiente sensíveis são configuradas via `heroku config:set`.
3. O build é executado automaticamente pelo Heroku durante o `git push heroku main`.

---

## Fluxo de Dados

```
Usuário (Browser)
    │
    ▼
Next.js Middleware (verifica JWT cookie)
    │
    ├─► Não autenticado → Redirect /login
    │
    └─► Autenticado
            │
            ▼
    Página React (Client Component)
            │
            ▼
    fetch → /api/* (Route Handler — server-side)
            │
            ├─► Cache HIT → Retorna dados cacheados
            │
            └─► Cache MISS
                    │
                    ▼
            MB API Client (HMAC-SHA256 auth)
                    │
                    ▼
            api.mercadobitcoin.net/api/v4
                    │
                    ▼
            Transforma e normaliza dados
                    │
                    ▼
            Armazena no cache com TTL
                    │
                    ▼
            Retorna ApiResponse<T> ao frontend
```

---

## Endpoints de API Internos

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/api/auth/login` | Autentica usuário e cria sessão |
| `POST` | `/api/auth/logout` | Encerra sessão (remove cookie) |
| `GET` | `/api/overview` | Visão geral do portfólio |
| `GET` | `/api/assets` | Lista de saldos por ativo |
| `GET` | `/api/orders` | Histórico de ordens (com filtros) |

---

## Considerações de Segurança

- **Chaves da API MB nunca chegam ao frontend.** Todas as chamadas ao Mercado Bitcoin são feitas no backend (Route Handlers).
- **Variáveis de ambiente sem prefixo `NEXT_PUBLIC_`** não são expostas ao bundle do cliente.
- **Logs não expõem credenciais.** Erros capturados apenas expõem a mensagem de erro da API.
- **JWT assinado com HMAC-SHA256.** A chave secreta deve ter no mínimo 32 caracteres.
- **Dependências auditadas.** `next` fixado em `^14.2.29` para evitar CVE-2025-29927 (path traversal no middleware, corrigido na 14.2.25).
