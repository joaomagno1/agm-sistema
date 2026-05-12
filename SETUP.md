# Sistema AGM - Guia de Configuração

Este documento contém o passo a passo para configurar o Sistema AGM desde o zero.

## Pré-requisitos
- [Node.js](https://nodejs.org/) (v20 ou superior)
- [Git](https://git-scm.com/)
- [MySQL](https://www.mysql.com/) via [DBeaver](https://dbeaver.io/) ou XAMPP

## Banco de Dados

1. Abra o DBeaver e conecte ao MySQL local (porta `3306`, `3307` ou `8081`).
2. Crie uma base de dados chamada `agm_db`.
3. Execute o script `agm_db/criacao_banco.sql` (Alt+X no DBeaver).

## Backend (NestJS)

```bash
cd agm_backend
npm install
```

Configure o arquivo `agm_backend/.env`:
```env
PORT=8000
DATABASE_TYPE='mysql'
DATABASE_HOST='localhost'
DATABASE_PORT=8081
DATABASE_USERNAME='root'
DATABASE_PASSWORD=''
DATABASE_DATABASE='agm_db'
DATABASE_SYNCHRONIZE=false
```

Execute:
```bash
npm run start:dev
```

A API estará disponível em http://localhost:8000.

## Frontend (React + Vite)

```bash
cd agm_frontend
npm install
npm run dev
```

A interface estará disponível em http://localhost:5173.

## Estrutura Final do Projeto

```
agm-sistema/
  agm_backend/          # API NestJS
  agm_frontend/         # Interface React
  agm_db/               # Scripts SQL
  readme.md             # Documentação geral
  SETUP.md              # Guia de configuração
```

## Credenciais de Teste
- **Gerente:** carlos@agm.com / 123456
- **Funcionário:** ana@agm.com / 123456
