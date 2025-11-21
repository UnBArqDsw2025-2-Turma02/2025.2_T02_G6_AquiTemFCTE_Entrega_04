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

## Estrutura do Projeto

```
api/
 ├── common/          # Utilidades, validadores e erros
 │   ├── errors/
 │   └── validators/
 ├── core/            # Configurações principais
 ├── modules/         # Módulos da aplicação (ex.: auth)
 │   └── auth/
 ├── services/        # Conexões externas (Redis, Storage)
 ├── utils/           # Funções auxiliares
 │   └── emails/      # Validação do email
 └── main.py          # Entry point
```

## Fluxo de Autenticação

A autenticação utiliza:

- JWT (access + refresh)
- Validação de e-mail com código de verificação
- Redis para sessões e caches
- Hash seguro de senha com Passlib

## Validações

- E-mail
- Nome completo
- Força da senha
- Matrícula
- Imagem de perfil
- Código de verificação