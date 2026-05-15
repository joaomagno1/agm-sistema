# Sistema AGM - Guia de Configuração

Passo a passo para configurar o Sistema AGM desde o zero.

## Pré-requisitos

- [Node.js](https://nodejs.org/) v20 ou superior
- [Git](https://git-scm.com/)
- [MySQL](https://www.mysql.com/) via DBeaver, XAMPP ou MySQL Workbench

---

## 1. Banco de Dados

1. Conecte ao MySQL local (porta `3306` ou a configurada).
2. Crie a base de dados:
   ```sql
   CREATE DATABASE agm_db;
   ```
3. Execute o script `agm_db/criacao_banco.sql` para criar as 8 tabelas e popular com dados de teste.

> O script já inclui INSERTs com 10 setores, 12 usuários, gerentes, funcionários, lotes, insumos e aplicações.

---

## 2. Backend (NestJS)

```bash
cd agm_backend
npm install
```

Crie o arquivo `agm_backend/.env`:

```env
PORT=8000
DATABASE_TYPE='mysql'
DATABASE_HOST='localhost'
DATABASE_PORT=3306
DATABASE_USERNAME='root'
DATABASE_PASSWORD=''
DATABASE_DATABASE='agm_db'
DATABASE_SYNCHRONIZE=false
JWT_SECRET=CHAVE_SECRETA_AGM_2026
JWT_EXPIRES_IN=2h
```

Execute:
```bash
npm run start:dev
```

A API estará em http://localhost:8000.

---

## 3. Frontend (React + Vite + Tailwind)

```bash
cd agm_frontend
npm install
```

Crie o arquivo `agm_frontend/.env`:

```env
VITE_API_URL=http://localhost:8000
```

Execute:
```bash
npm run dev
```

A interface estará em http://localhost:5173.

---

## 4. Acessar o Sistema

1. Abra http://localhost:5173 no navegador.
2. Faça login com as credenciais de teste:

| Perfil | E-mail | Senha |
|--------|--------|-------|
| Gerente | joao27012006@gmail.com | 123456 |
| Funcionário | ana@agm.com | 123456 |

---

## Estrutura do Projeto

```
agm-sistema/
  agm_backend/           # API NestJS (10 módulos)
    src/
      setor/             # CRUD setores
      usuario/           # CRUD + validação e-mail
      auth/              # Login JWT
      funcionario/       # CRUD funcionários
      gerente/           # CRUD gerentes
      lote-cultivo/      # CRUD lotes de cultivo
      insumo/            # CRUD insumos
      atribuicao-lote/   # CRUD atribuições lote-funcionário
      aplicacao-insumo/  # CRUD aplicações de insumo
      mail/              # Serviço de e-mail (Nodemailer)
      app.module.ts      # Módulo raiz (importa todos)

  agm_frontend/          # Interface React (Tailwind + Lucide)
    src/
      pages/             # 9 páginas (CRUDs + auth)
      contexts/          # AuthContext (JWT)
      services/          # Axios c/ interceptor
      App.tsx            # Layout c/ sidebar + rotas protegidas

  agm_db/                # Scripts SQL
    criacao_banco.sql    # DDL + inserts de teste

  readme.md              # Documentação geral
  SETUP.md               # Este guia
```

---

## Portas

| Serviço | Porta |
|---------|-------|
| MySQL | 3306 |
| Backend API | 8000 |
| Frontend | 5173 |
