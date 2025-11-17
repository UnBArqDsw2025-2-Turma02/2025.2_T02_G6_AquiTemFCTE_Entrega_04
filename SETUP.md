# Guia de Execução do Projeto

## Pré-requisitos

- Node.js >= 18
- Python 3.12
- Supabase CLI
- npm >= 11

## Estrutura do Projeto

O projeto é um monorepo com os seguintes apps:

- `apps/frontend` - Frontend Next.js (App Router + Tailwind)
- `apps/web` - Frontend Vite (React Router + Styled Components)
- `apps/api` - Backend Django REST API
- `apps/docs` - Documentação com Docsify

## Instalação

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar Supabase

```bash
supabase start
```

Anote as credenciais exibidas:
- API URL: `http://127.0.0.1:54321`
- DB Port: `54322`
- Anon Key: (será exibido no terminal)

### 3. Configurar variáveis de ambiente

#### Frontend Next.js (apps/frontend)

Crie `apps/frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<sua-anon-key>
```

#### Backend Django (apps/api)

As variáveis são passadas via linha de comando (ver seção de execução).

### 4. Configurar ambiente Python

```bash
cd apps/api
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 5. Executar migrações

```bash
# Com o ambiente virtual ativado e variáveis de ambiente
export POSTGRES_DB=postgres
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=postgres
export POSTGRES_HOST=127.0.0.1
export POSTGRES_PORT=54322

python manage.py migrate
```

## Executando o Projeto

### Opção 1: Executar tudo junto

```bash
# Terminal 1: Supabase
supabase start

# Terminal 2: Backend Django
cd apps/api
source venv/bin/activate
export POSTGRES_DB=postgres POSTGRES_USER=postgres POSTGRES_PASSWORD=postgres POSTGRES_HOST=127.0.0.1 POSTGRES_PORT=54322
python manage.py runserver 0.0.0.0:8000

# Terminal 3: Frontends
npm run dev
```

Acesse:
- Next.js: http://localhost:3001
- Vite: http://localhost:5173
- Django API: http://localhost:8000
- Docs: http://localhost:43077

### Opção 2: Executar apps individuais

#### Apenas Frontend Next.js

```bash
npm run dev:frontend
```

Acesse: http://localhost:3001

#### Apenas Frontend Vite

```bash
npm run dev:web
```

Acesse: http://localhost:5173

#### Apenas Backend Django

```bash
cd apps/api
source venv/bin/activate
export POSTGRES_DB=postgres POSTGRES_USER=postgres POSTGRES_PASSWORD=postgres POSTGRES_HOST=127.0.0.1 POSTGRES_PORT=54322
python manage.py runserver 0.0.0.0:8000
```

Acesse: http://localhost:8000

## Portas Padrão

| Serviço | Porta |
|---------|-------|
| Supabase API | 54321 |
| Supabase DB | 54322 |
| Supabase Studio | 54323 |
| Django API | 8000 |
| Next.js Frontend | 3001 |
| Vite Frontend | 5173 |
| Docsify Docs | 43077 |

## Resolução de Problemas

### Erro: Port already in use

```bash
# Matar processos nas portas
lsof -ti:3000,3001,8000 | xargs kill -9
```

### Erro: Next.js lock file

```bash
rm -rf apps/frontend/.next/dev/lock
```

### Erro: Django database connection

Verifique se o Supabase está rodando:

```bash
supabase status
```

### Erro: Failed to fetch (Frontend)

Certifique-se de que o Django está rodando na porta 8000 e que a variável `NEXT_PUBLIC_API_URL` está configurada.

### Erro: relation "auth_user" does not exist

Este erro ocorre quando você executa `supabase db reset` sem rodar as migrações do Django novamente. Para corrigir:

```bash
cd apps/api
source venv/bin/activate
export POSTGRES_DB=postgres POSTGRES_USER=postgres POSTGRES_PASSWORD=postgres POSTGRES_HOST=127.0.0.1 POSTGRES_PORT=54322
python manage.py migrate
```

## Scripts Disponíveis

```bash
npm run dev              # Executa todos os apps
npm run dev:web          # Executa apenas Vite
npm run dev:frontend     # Executa apenas Next.js
npm run build            # Build de todos os apps
npm run build:web        # Build apenas Vite
npm run build:frontend   # Build apenas Next.js
npm run lint             # Lint de todos os apps
npm run check-types      # Verificação de tipos TypeScript
```

## Notas Importantes

1. O Supabase deve estar rodando antes de iniciar o Django
2. O Django deve estar rodando antes de acessar os frontends (para funcionalidades de API)
3. Os dois frontends (Next.js e Vite) rodam simultaneamente em portas diferentes
4. As credenciais do Supabase local são resetadas quando você executa `supabase stop`
5. **IMPORTANTE**: Sempre que executar `supabase db reset`, você deve rodar `python manage.py migrate` novamente para recriar as tabelas do Django
