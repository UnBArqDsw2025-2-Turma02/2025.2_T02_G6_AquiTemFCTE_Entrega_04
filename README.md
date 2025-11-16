# AquiTemFCTE 🛍️- Node.js (versão 18 ou superior)

- Python 3.8+

Sistema de marketplace para estudantes da UnB - Campus FCTE- npm ou pnpm



## 🚀 Como Rodar o Projeto### 1. Instalar dependências do Frontend (Next.js)



### Pré-requisitos```bash

- Node.js 18+ # Na pasta raiz do projeto

- Python 3.10+npm install

- PostgreSQL (via Supabase Local)# ou

pnpm install

### 1. Configurar Backend (Django)```



```bash### 2. Configurar Backend (Django)

# Ativar ambiente virtual

source .venv/bin/activate```bash

# Entre na pasta backend

# Instalar dependênciascd backend

cd backend

pip install -r requirements.txt# Ative o ambiente virtual

source venv/bin/activate

# Fazer migrações

python manage.py migrate# Instale as dependências (se necessário)

pip install -r requirements.txt

# Rodar servidor Django```

python manage.py runserver

```### 3. Executar o projeto



### 2. Configurar Frontend (Next.js)**Terminal 1 - Django Backend:**

```bash

```bashcd backend

# Instalar dependênciassource venv/bin/activate

npm installpython manage.py runserver 127.0.0.1:8004

```

# Rodar servidor Next.js

npm run dev**Terminal 2 - Next.js Frontend:**

``````bash

# Na pasta raiz

### 3. Configurar Banco de Dados (Supabase Local)npm run dev

```

```bash- **Frontend**: http://localhost:3000

# Iniciar Supabase Local- **Backend API**: http://127.0.0.1:8004/api/

supabase start

*Projeto desenvolvido com Next.js 16.0.0 e Django 5.2.8*
# Verificar status
supabase status
```

## 🔗 URLs de Acesso

- **Frontend**: http://localhost:3000
- **Backend API**: http://127.0.0.1:8000/api/
- **Admin Django**: http://127.0.0.1:8000/admin/
- **Supabase Studio**: http://127.0.0.1:54323

## 📱 Funcionalidades

- ✅ Cadastro e login de usuários
- ✅ Marketplace de produtos
- ✅ Upload de imagens (Supabase Storage)
- ✅ Dashboard do usuário
- ✅ Sistema de mensagens
- ✅ Avaliações e ratings

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 16** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Shadcn/ui** - Componentes UI

### Backend
- **Django 5.2.8** - Framework web
- **Django REST Framework** - API REST
- **PostgreSQL** - Banco de dados (via Supabase)
- **Pillow** - Processamento de imagens

### Infraestrutura
- **Supabase Local** - Banco de dados e storage
- **Docker** - Containerização (Supabase)

## 📦 Estrutura do Projeto

```
/
├── app/                    # Páginas Next.js
├── components/             # Componentes React
├── hooks/                  # Custom hooks
├── lib/                    # Utilitários e configurações
├── public/                 # Arquivos estáticos
├── backend/                # Django API
│   ├── products/           # App de produtos
│   ├── users/              # App de usuários
│   └── chat/               # App de mensagens
└── supabase/               # Configurações Supabase
```

## 🔧 Desenvolvimento

### Comandos Úteis

```bash
# Instalar nova dependência Frontend
npm install <pacote>

# Instalar nova dependência Backend
pip install <pacote>
pip freeze > backend/requirements.txt

# Reset do banco de dados
supabase db reset

# Criar nova migração Django
python manage.py makemigrations
python manage.py migrate
```

### APIs Principais

- `GET /api/products/` - Listar produtos
- `POST /api/products/` - Criar produto
- `POST /api/auth/register/` - Cadastro
- `POST /api/auth/login/` - Login

## 📄 Licença

Projeto acadêmico - UnB FCTE 2025