# Sistema AGM (Agro Gestão e Monitoramento)

## Visão Geral
O Sistema AGM é uma plataforma web full-stack para gestão de operações agropecuárias. Permite o cadastro e controle de setores, usuários, funcionários, lotes de cultivo e insumos.

## Arquitetura e Tecnologias

### Frontend (`agm_frontend`)
- **Framework:** React 19 (construído via Vite)
- **Linguagem:** TypeScript
- **Roteamento:** React Router DOM v7
- **Comunicação HTTP:** Axios
- **Estilização:** Inline Styles & CSS puro

### Backend (`agm_backend`)
- **Framework:** NestJS 11
- **Linguagem:** TypeScript
- **ORM:** TypeORM
- **Banco de Dados:** MySQL
- **Autenticação:** JWT (Passport)
- **E-mail:** Nodemailer (Mailtrap)

## Configuração do Ambiente

| Serviço | Porta Local | Descrição |
| :--- | :--- | :--- |
| **MySQL** | `8081` | Banco de dados |
| **NestJS API** | `8000` | Servidor backend |
| **React Vite** | `5173` | Interface do usuário |

### `.env` do Backend (`agm_backend/.env`)
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

### `.env` do Frontend (`agm_frontend/.env`)
```env
VITE_API_URL=http://localhost:8000
```

## Entidades e Banco de Dados

### 1. Setor (SETOR)
| Coluna | Tipo | Descrição |
| :--- | :--- | :--- |
| **ID_SETOR** | `INT (PK)` | Identificador único |
| **COD_SETOR** | `VARCHAR(10)` | Código alfanumérico (ex: S01) |
| **NOME_SETOR** | `VARCHAR(50)` | Nome descritivo |
| **CREATED_AT** | `TIMESTAMP` | Data de criação |
| **UPDATED_AT** | `TIMESTAMP` | Data de atualização |

### 2. Usuário (USUARIO)
| Coluna | Tipo | Descrição |
| :--- | :--- | :--- |
| **ID_USUARIO** | `INT (PK)` | Identificador único |
| **COD_USUARIO** | `VARCHAR(10)` | Código único |
| **NOME_USUARIO** | `VARCHAR(50)` | Nome completo |
| **EMAIL** | `VARCHAR(100)` | E-mail |
| **SENHA** | `VARCHAR(100)` | Senha (bcrypt) |
| **FOTO** | `VARCHAR(200)` | URL da foto |
| **TIPO** | `INT` | 1=Gerente, 2=Funcionário |
| **STATUS_VALIDACAO** | `BOOLEAN` | E-mail validado |
| **ID_SETOR** | `INT (FK)` | Referência ao setor |

### 3. Gerente (GERENTE)
| Coluna | Tipo | Descrição |
| :--- | :--- | :--- |
| **ID_GERENTE** | `INT (PK)` | Identificador único |
| **COD_GERENTE** | `VARCHAR(10)` | Código único |
| **NOME_GERENTE** | `VARCHAR(50)` | Nome do gerente |
| **ID_USUARIO** | `INT (FK)` | Referência ao usuário |

### 4. Funcionário (FUNCIONARIO)
| Coluna | Tipo | Descrição |
| :--- | :--- | :--- |
| **ID_FUNCIONARIO** | `INT (PK)` | Identificador único |
| **COD_FUNCIONARIO** | `VARCHAR(10)` | Código único |
| **NOME_FUNCIONARIO** | `VARCHAR(50)` | Nome do funcionário |
| **IDADE** | `INT` | Idade |
| **ID_USUARIO** | `INT (FK)` | Referência ao usuário |

### 5. Lote de Cultivo (LOTE_CULTIVO)
| Coluna | Tipo | Descrição |
| :--- | :--- | :--- |
| **ID_LOTE** | `INT (PK)` | Identificador único |
| **PERIODO** | `INT` | Ano da safra |
| **NOME_LOTE** | `VARCHAR(50)` | Nome do lote |
| **ID_GERENTE** | `INT (FK)` | Referência ao gerente |

## Endpoints da API

### Base URL: `http://localhost:8000`

### Setores (`/setor`)
| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/setor?page=1&limit=10` | Lista setores (paginado) |
| `GET` | `/setor/:id` | Busca setor por ID |
| `POST` | `/setor` | Cria setor |
| `PATCH` | `/setor/:id` | Atualiza setor |
| `DELETE` | `/setor/:id` | Remove setor |

**POST/PATCH body:** `{ "codSetor": "S01", "nomeSetor": "Setor Norte" }`

### Usuários (`/usuario`)
| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/usuario` | Cadastra novo usuário |
| `GET` | `/usuario` | Lista usuários (requer JWT) |
| `GET` | `/usuario/validar/:token` | Valida e-mail |

**POST body:** `{ "codUsuario": "U013", "nomeUsuario": "João", "email": "joao@email.com", "senha": "Senha1234" }`

### Autenticação (`/auth`)
| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/auth/login` | Login (retorna JWT) |

**POST body:** `{ "email": "carlos@agm.com", "password": "123456" }`

## Estrutura do Frontend

```
agm_frontend/src/
  ├── App.tsx              # Layout principal (Sidebar + Router)
  ├── main.tsx             # Entry point
  ├── index.css            # Estilos globais
  ├── contexts/
  │   └── AuthContext.tsx   # Contexto de autenticação
  ├── pages/
  │   ├── Setores.tsx       # CRUD de setores
  │   ├── Funcionarios.tsx  # Placeholder
  │   ├── Usuario.tsx       # Listagem de usuários
  │   ├── Login.tsx         # Tela de login
  │   ├── CadastroUsuario.tsx # Cadastro de usuário
  │   └── ValidarEmail.tsx  # Validação de e-mail
  └── services/
      └── api.ts           # Instância Axios
```

## Como Executar

### 1. Banco de Dados
Garanta MySQL ativo (porta 8081) e execute o script em `agm_db/criacao_banco.sql`.

### 2. Backend
```bash
cd agm_backend
npm install
npm run start:dev
```

### 3. Frontend
```bash
cd agm_frontend
npm install
npm run dev
```

### 4. Acesse
Abra http://localhost:5173 no navegador.

## Credenciais de Teste
- **Gerente:** carlos@agm.com / 123456
- **Funcionário:** ana@agm.com / 123456
