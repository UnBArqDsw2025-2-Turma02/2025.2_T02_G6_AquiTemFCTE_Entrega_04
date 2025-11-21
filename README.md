# 2025.2 - AquiTemFCTE

![Capa AquiTemFCTE](./docs/assets/AquiTemFCTE.png)

<div align="center">

![GitHub repo size](https://img.shields.io/github/repo-size/UnBArqDsw2025-2-Turma02/2025.2_T02_G6_AquiTemFCTE_Entrega_04?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/UnBArqDsw2025-2-Turma02/2025.2_T02_G6_AquiTemFCTE_Entrega_04?style=for-the-badge)
![GitHub views](https://komarev.com/ghpvc/?username=UnBArqDsw2025-2-Turma02&repo=2025.2_T02_G6_AquiTemFCTE_Entrega_04&color=blueviolet&style=for-the-badge&label=Views)

</div>

## Sobre o Projeto

O AquiTemFCTE é uma plataforma digital que busca atender às necessidades da comunidade universitária da Universidade de Brasília (UnB) do Campus Faculdade de Ciências e Tecnologias em Engenharia (FCTE). Nosso principal objetivo é facilitar a compra, venda e troca de itens novos e usados exclusivamente entre os estudantes da universidade, criando um ambiente seguro e confiável para transações.

O projeto foi concebido no âmbito da disciplina de Arquitetura e Desenho de Software (UnB - 2025.2) e visa solucionar a dificuldade que muitos alunos têm em encontrar canais confiáveis para negociar produtos dentro do próprio campus. A plataforma centraliza essas atividades e otimiza a experiência do usuário, oferecendo recursos de pesquisa, categorização de produtos e perfis de usuário verificados.

## ⚙️ Configurando o Ambiente:

Para iniciar sua contribuição ao projeto, primeiro clone o repositório em sua máquina local com o comando abaixo:

```bash
git clone https://github.com/UnBArqDsw2025-2-Turma02/2025.2_T02_G6_AquiTemFCTE_Entrega_04.git
```

Após isso, instale as dependências de desenvolvimento com a utilização do `npm` com o comando abaixo:

```bash
npm install
```

Pronto! Agora o seu ambiente está configurado para dar início às contribuições. Para executar a projeto localmente, siga os passos do próximo tópico.

## 🚀 Executando o Projeto

Este projeto utiliza uma estrutura monorepo com [Turborepo](https://turbo.build/). A documentação é gerada usando o [Docsify](https://docsify.js.org/), a interface é baseada em [React.js](https://react.dev/) com [Vite](https://vitejs.dev/) e o backend construído com [FastAPI](https://fastapi.tiangolo.com/) e [PostgreSQL](https://www.postgresql.org/).

### Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** (geralmente vem com o Node.js)
- **Python 3.13**
- **Docker** e **Docker Compose**

### Passo 1: Configurar o Backend (API)

#### 1.1. Instalar pipx

```bash
pip install pipx
pipx ensurepath
```

> **Importante:** Feche e abra o terminal novamente para que as mudanças tenham efeito.

#### 1.2. Instalar e configurar o Poetry

```bash
pipx install poetry

# Adicionar plugin do shell
pipx inject poetry poetry-plugin-shell
```

#### 1.3. Configurar Python 3.13 ou 3.12

```bash
# Definir Python 3.13 como versão do projeto
poetry env use python3.13
```

Ou utilize este comando para a versão 3.12:

```bash
# Definir Python 3.13 como versão do projeto
poetry env use python3.12
```

#### 1.4. Instalar dependências Python

```bash
poetry install
```

#### 1.5. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto seguindo o padrão do arquivo `.env.example`:

```bash
cp .env.example .env
```

#### 1.6. Subir os serviços do banco de dados

```bash
docker-compose up --build
```

Este comando irá subir:

- **PostgreSQL** na porta `5432`
- **Redis** na porta `6379`

#### 1.7. Executar migrações do banco de dados

```bash
# Aplicar migrações
poetry run alembic upgrade head

# Caso precise criar uma nova migração:
poetry run alembic revision --autogenerate -m "Migration description"
```

### Passo 2: Executar o Ambiente de Desenvolvimento

Com o backend configurado, agora execute todo o ambiente (frontend + documentação + API):

```bash
npm run dev
```

Este comando irá iniciar simultaneamente:

- **API FastAPI** em `http://localhost:8000`
- **Frontend React** em `http://localhost:5173`
- **Documentação Docsify** em `http://localhost:3000`

### URLs de Acesso

- **Frontend (React)**: `http://localhost:5173`
- **Documentação**: `http://localhost:3000`
- **API**: `http://localhost:8000`
- **Documentação da API (Swagger)**: `http://localhost:8000/docs`

### Comandos Disponíveis

- **`npm run dev`**: Inicia todos os serviços de desenvolvimento
- **`npm run build`**: Realiza o build de todos os projetos
- **`npm run lint`**: Executa a verificação de lint em todos os projetos
- **`npm run format`**: Formata o código usando Prettier
- **`npm run check-types`**: Verifica os tipos TypeScript

### Estrutura do Projeto

```
├── api/                    # Backend FastAPI
│   ├── common/            # Utilitários e validadores comuns
│   ├── core/              # Configurações principais (auth, db)
│   ├── modules/           # Módulos da aplicação
│   │   └── auth/         # Módulo de autenticação
│   ├── services/          # Serviços externos (Redis, Storage)
│   └── main.py           # Arquivo principal da API
├── apps/
│   ├── docs/             # Documentação do projeto (Docsify)
│   └── web/              # Frontend React + Vite
│       ├── src/
│       │   ├── components/   # Componentes reutilizáveis
│       │   ├── pages/       # Páginas da aplicação
│       │   ├── services/    # Serviços para API
│       │   └── utils/       # Utilitários
│       └── package.json
├── packages/              # Pacotes compartilhados
│   ├── ui/               # Componentes de interface
│   ├── eslint-config/    # Configurações do ESLint
│   └── typescript-config/ # Configurações do TypeScript
├── migrations/           # Migrações do banco (Alembic)
├── docker-compose.yaml   # Configuração do Docker
├── pyproject.toml       # Configurações Python/Poetry
└── turbo.json           # Configuração do Turborepo
```

### Deploy Automático

O projeto possui um workflow automatizado no GitHub Actions que:

- Testa a build em Pull Requests
- Faz deploy automático para GitHub Pages quando há merge na branch `main`
- A documentação fica disponível em: `https://unbarqdsw2025-2-turma02.github.io/2025.2_T02_G6_AquiTemFCTE_Entrega_04/`

## 🧪 Construído com:

### Frontend

- [React](https://react.dev/) - Biblioteca para construção de interfaces de usuário
- [Vite](https://vitejs.dev/) - Build tool e servidor de desenvolvimento
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utility-first
- [React Router](https://reactrouter.com/) - Roteamento para aplicações React
- [React Icons](https://react-icons.github.io/react-icons/) - Biblioteca de ícones
- [React Toastify](https://fkhadra.github.io/react-toastify/) - Notificações toast

### Backend

- [FastAPI](https://fastapi.tiangolo.com/) - Framework web moderno e rápido para Python
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados relacional
- [Redis](https://redis.io/) - Banco de dados em memória para cache
- [SQLAlchemy](https://www.sqlalchemy.org/) - ORM para Python
- [Alembic](https://alembic.sqlalchemy.org/) - Gerenciamento de migrações de banco
- [Pydantic](https://pydantic-docs.helpmanual.io/) - Validação de dados
- [Poetry](https://python-poetry.org/) - Gerenciamento de dependências Python

### Infraestrutura e Ferramentas

- [Turborepo](https://turbo.build/) - Utilizado para gerenciamento do monorepo
- [Docker](https://www.docker.com/) - Containerização dos serviços
- [Docsify](https://docsify.js.org/) - Utilizado para a documentação do projeto
- [GitHub Actions](https://docs.github.com/en/actions) - Utilizado para CI/CD e deploy automático
- [GitHub Pages](https://pages.github.com/) - Utilizado para hospedagem da documentação
- [ESLint](https://eslint.org/) - Linting para JavaScript/TypeScript
- [Prettier](https://prettier.io/) - Formatação de código
- [TypeScript](https://www.typescriptlang.org/) - Superset tipado do JavaScript

### Padrões e Convenções

- [Contributor Covenant](https://www.contributor-covenant.org/) - Utilizado para o [Código de Conduta](./CODE_OF_CONDUCT.md)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) - Utilizado como Padrão de Commits no [Guia de Contribuição](./CONTRIBUTING.md)
- [GitHub Flow](https://docs.github.com/pt/get-started/using-github/github-flow) - Utilizado como Política de Branchs no [Guia de Contribuição](./CONTRIBUTING.md)

## 📃 Contribuição:

Leia o arquivo [CONTRIBUTING.md](./CONTRIBUTING.md) para mais detalhes e regras para o desenvolvimento, junto ao [Código de Conduta](./CODE_OF_CONDUCT.md) também disponível. Contribuições que fujam destas regras serão recusadas pelos mantenedores do projeto.

## 👩‍💻 Mantenedores:

<div align="center">
  
<table>
  <tr>
    <td align="center" width="120">
      <a href="https://github.com/Algusto-RC">
        <img src="https://github.com/Algusto-RC.png" width="80" style="border-radius: 50%;"/><br />
        <sub><b>Algusto Rodrigues</b></sub>
      </a>
    </td>
    <td align="center" width="120">
      <a href="https://github.com/caiomsabino">
        <img src="https://github.com/caiomsabino.png" width="80" style="border-radius: 50%;"/><br />
        <sub><b>Caio Lucas</b></sub>
      </a>
    </td>
    <td align="center" width="120">
      <a href="https://github.com/DanielRogs">
        <img src="https://github.com/DanielRogs.png" width="80" style="border-radius: 50%;"/><br />
        <sub><b>Daniel Rodrigues</b></sub>
      </a>
    </td>
    <td align="center" width="120">
      <a href="https://github.com/Davicamilo23">
        <img src="https://github.com/Davicamilo23.png" width="80" style="border-radius: 50%;"/><br />
        <sub><b>Davi Camilo</b></sub>
      </a>
    </td>
    <td align="center" width="120">
      <a href="https://github.com/rabelzx">
        <img src="https://github.com/rabelzx.png" width="80" style="border-radius: 50%;"/><br />
        <sub><b>Eric Rabelo</b></sub>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center" width="120">
      <a href="https://github.com/felipeacampelo">
        <img src="https://github.com/felipeacampelo.png" width="80" style="border-radius: 50%;"/><br />
        <sub><b>Felipe de Aquino</b></sub>
      </a>
    </td>
    <td align="center" width="120">
      <a href="https://github.com/IgorJustino">
        <img src="https://github.com/IgorJustino.png" width="80" style="border-radius: 50%;"/><br />
        <sub><b>Igor Justino</b></sub>
      </a>
    </td>
    <td align="center" width="120">
      <a href="https://github.com/isaqzin">
        <img src="https://github.com/isaqzin.png" width="80" style="border-radius: 50%;"/><br />
        <sub><b>Isaque Camargos</b></sub>
      </a>
    </td>
    <td align="center" width="120">
      <a href="https://github.com/lcsgborges">
        <img src="https://github.com/lcsgborges.png" width="80" style="border-radius: 50%;"/><br />
        <sub><b>Lucas Guimarães</b></sub>
      </a>
    </td>
    <td align="center" width="120">
      <a href="https://github.com/ludmilaaysha">
        <img src="https://github.com/ludmilaaysha.png" width="80" style="border-radius: 50%;"/><br />
        <sub><b>Ludmila Aysha</b></sub>
      </a>
    </td>
  </tr>
</table>

</div>
