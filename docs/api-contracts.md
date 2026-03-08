# Contratos de API — Dashboard MB

Todos os endpoints são internos (BFF — Backend for Frontend). O cliente nunca acessa a API do Mercado Bitcoin diretamente.

---

## Envelope de Resposta

Todas as respostas de sucesso seguem o formato:

```json
{
  "data": <T>,
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

Todas as respostas de erro seguem o formato:

```json
{
  "error": "ERROR_CODE",
  "message": "Descrição legível do erro",
  "status": 400
}
```

---

## Autenticação

### `POST /api/auth/login`

Autentica o usuário e cria uma sessão via cookie JWT.

**Request Body:**
```json
{
  "username": "admin",
  "password": "sua-senha"
}
```

**Response 200:**
```json
{
  "ok": true
}
```
Cookie `mb_session` é definido (httpOnly, secure em produção, sameSite: lax, maxAge: 8h).

**Response 400:**
```json
{
  "error": "BAD_REQUEST",
  "message": "Usuário e senha são obrigatórios"
}
```

**Response 401:**
```json
{
  "error": "UNAUTHORIZED",
  "message": "Credenciais inválidas"
}
```

**Response 500:**
```json
{
  "error": "INTERNAL_ERROR",
  "message": "Erro interno do servidor"
}
```

---

### `POST /api/auth/logout`

Encerra a sessão do usuário removendo o cookie.

**Request Body:** vazio

**Response 200:**
```json
{
  "ok": true
}
```

---

## Overview

### `GET /api/overview`

Retorna a visão geral do portfólio consolidado.

**Query Params:** nenhum

**Response 200:**
```json
{
  "data": {
    "totalEstimatedValueBRL": "152340.50",
    "totalAssets": 3,
    "assets": [
      {
        "symbol": "BTC",
        "name": "Bitcoin",
        "totalBalance": "0.52341000",
        "availableBalance": "0.52341000",
        "lockedBalance": "0.00000000",
        "estimatedValueBRL": "140000.00",
        "percentageOfPortfolio": 91.9
      }
    ],
    "lastUpdatedAt": "2024-01-15T10:30:00.000Z"
  },
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Cache:** 30 segundos (configurável via `CACHE_BALANCES_TTL`)

---

## Assets (Saldos)

### `GET /api/assets`

Retorna a lista de saldos por ativo.

**Query Params:** nenhum

**Response 200:**
```json
{
  "data": [
    {
      "symbol": "BTC",
      "name": "Bitcoin",
      "totalBalance": "0.52341000",
      "availableBalance": "0.52341000",
      "lockedBalance": "0.00000000",
      "estimatedValueBRL": "140000.00",
      "percentageOfPortfolio": 91.9
    },
    {
      "symbol": "ETH",
      "name": "Ethereum",
      "totalBalance": "5.00000000",
      "availableBalance": "4.50000000",
      "lockedBalance": "0.50000000",
      "estimatedValueBRL": "12340.50",
      "percentageOfPortfolio": 8.1
    }
  ],
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Cache:** 30 segundos (configurável via `CACHE_BALANCES_TTL`)

---

## Orders (Ordens)

### `GET /api/orders`

Retorna o histórico de ordens com suporte a filtros e paginação.

**Query Params:**

| Parâmetro | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `page` | `number` | não (padrão: 1) | Página atual |
| `pageSize` | `number` | não (padrão: 20) | Itens por página |
| `symbol` | `string` | não | Filtrar por par (ex: `BTC-BRL`) |
| `status` | `string` | não | Filtrar por status: `open`, `executed`, `cancelled`, `partially_filled` |
| `startDate` | `string` | não | Data inicial (ISO 8601) |
| `endDate` | `string` | não | Data final (ISO 8601) |

**Response 200:**
```json
{
  "data": {
    "orders": [
      {
        "id": "12345678",
        "symbol": "BTC-BRL",
        "side": "buy",
        "type": "limit",
        "status": "executed",
        "quantity": "0.01000000",
        "price": "280000.00",
        "executedQuantity": "0.01000000",
        "executedPrice": "279850.00",
        "totalValue": "2798.50",
        "profitLoss": null,
        "profitLossPercent": null,
        "createdAt": "2024-01-15T09:00:00.000Z",
        "updatedAt": "2024-01-15T09:05:00.000Z"
      }
    ],
    "total": 1,
    "page": 1,
    "pageSize": 20
  },
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Cache:** 20 segundos por combinação de filtros (configurável via `CACHE_ORDERS_TTL`)

---

## Tipos de Status de Ordem

| Valor | Descrição |
|---|---|
| `open` | Ordem em aberto (ativa) |
| `executed` | Ordem totalmente executada |
| `cancelled` | Ordem cancelada |
| `partially_filled` | Ordem parcialmente executada |

## Tipos de Lado (Side)

| Valor | Descrição |
|---|---|
| `buy` | Compra |
| `sell` | Venda |

## Tipos de Ordem (Type)

| Valor | Descrição |
|---|---|
| `market` | Ordem a mercado |
| `limit` | Ordem limitada |
