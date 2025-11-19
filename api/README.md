# API AquiTemFCTE

Esta é a API do projeto AquiTemFCTE, construída com FastAPI e PostgreSQL.

## Documentação

Para instruções detalhadas de instalação e execução, consulte o [README principal do projeto](../README.md).

## Endpoints Principais

- **Documentação da API (Swagger)**: `http://localhost:8000/docs`
- **Documentação Redoc**: `http://localhost:8000/redoc`

## Módulos

- **auth**: Sistema de autenticação e registro de usuários
- **core**: Configurações principais (banco de dados, autenticação)
- **common**: Utilitários, validadores e tratamento de erros
- **services**: Integração com serviços externos (Redis, Storage)

## Tecnologias

- **FastAPI**: Framework web moderno para Python
- **PostgreSQL**: Banco de dados relacional
- **SQLAlchemy**: ORM para Python
- **Alembic**: Gerenciamento de migrações
- **Redis**: Cache e sessions
- **Pydantic**: Validação de dados
