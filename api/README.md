# API AquiTemFCTE

## Configurando o ambiente

### 1. Instalar pipx

```bash
pip install pipx
pipx ensurepath
```

> Feche e abra o terminal novamente para que as mudanças tenham efeito.

### 2. Instalar e configurar o Poetry

```bash
pipx install poetry

# Adicionar plugin do shell
pipx inject poetry poetry-plugin-shell
```

### 3. Configurar Python 3.13

```bash
# Definir Python 3.13 como versão do projeto
poetry env use python3.13
```

### 4. Instalar dependências

```bash
poetry install
```

### 5. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto as variáveis corretas e no padrão do arquivo `.env.example`

### 6. Iniciar a aplicação com Docker

```bash
docker-compose up --build
```

### 7. Executar migrações do banco de dados

> Verifique se o banco de dados está rodando

```bash
# Criar uma nova migração (se necessário)
poetry run alembic revision --autogenerate -m "Migration description"

# Aplicar migrações
poetry run alembic upgrade head
```

A API estará disponível em `http://localhost:8000`

A documentação da API estará disponível em `http://localhost:8000/docs`
