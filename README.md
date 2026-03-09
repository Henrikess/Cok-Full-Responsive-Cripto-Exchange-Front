# Dashboard MB

Painel web pessoal para visualização de dados da conta no **Mercado Bitcoin**, construído em dark mode com foco em elegância e simplicidade.

## Tecnologias

- **Framework:** Next.js 14 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS 3
- **Gráficos:** Recharts
- **Autenticação:** JWT via `jose`
- **Deploy:** Heroku

## Funcionalidades (V1)

- 🔐 Autenticação simples com usuário e senha
- 📊 Visão geral do patrimônio
- 💰 Listagem de saldos por ativo
- 📋 Ordens recentes (abertas, executadas, canceladas)
- 🤖 Área reservada para integração futura com o bot
- 🌙 Interface dark mode inspirada no Mercado Bitcoin

## Estrutura do Projeto

```
src/
├── app/                    # Páginas e rotas da aplicação
│   ├── (dashboard)/        # Grupo de rotas protegidas
│   │   ├── dashboard/      # Página principal
│   │   ├── assets/         # Página de ativos
│   │   ├── orders/         # Página de ordens
│   │   └── bot/            # Página do bot
│   ├── login/              # Página de login
│   └── api/                # Rotas de API internas
│       ├── auth/           # Autenticação
│       ├── overview/       # Visão geral
│       ├── assets/         # Saldos
│       └── orders/         # Ordens
├── components/
│   ├── layout/             # Sidebar, Header
│   └── ui/                 # Componentes reutilizáveis
├── lib/
│   ├── auth/               # Sessão e JWT
│   ├── cache/              # Cache em memória
│   └── mb-api/             # Integração com MB API
└── types/                  # Contratos de dados e tipos
```

## Configuração Local

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env.local
```

Edite `.env.local` com suas credenciais:

```env
AUTH_USERNAME=admin
AUTH_PASSWORD=sua-senha-aqui
AUTH_SECRET=uma-string-aleatoria-com-pelo-menos-32-caracteres

MB_API_KEY=sua-chave-da-api-mb
MB_API_SECRET=seu-segredo-da-api-mb
```

### 3. Iniciar em modo de desenvolvimento

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## Deploy no Heroku

### 1. Criar aplicação

```bash
heroku create nome-do-seu-app
```

### 2. Configurar variáveis de ambiente

```bash
heroku config:set AUTH_USERNAME=admin
heroku config:set AUTH_PASSWORD=sua-senha-segura
heroku config:set AUTH_SECRET=string-aleatoria-de-32-chars
heroku config:set MB_API_KEY=sua-chave
heroku config:set MB_API_SECRET=seu-segredo
```

### 3. Deploy

```bash
git push heroku main
```

## Segurança

- As chaves da API do Mercado Bitcoin existem **apenas no backend**
- Nunca são expostas ao frontend
- Sessão gerenciada por cookie HTTP-only com JWT
- Logs não expõem credenciais

## Arquitetura

Consulte [`docs/architecture.md`](docs/architecture.md) para detalhes da arquitetura.

## Contratos de API

Consulte [`docs/api-contracts.md`](docs/api-contracts.md) para os contratos internos.

## Licença

Uso pessoal.