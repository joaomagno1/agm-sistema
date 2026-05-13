# Sistema AGM (Agro Gestão e Monitoramento)

Plataforma web full-stack para gestão de operações agropecuárias. Permite o cadastro e controle de setores, usuários, funcionários, gerentes, lotes de cultivo e insumos.

## Tecnologias

### Frontend (`agm_frontend`)
| Tecnologia | Versão |
|-----------|--------|
| React | 19 |
| Vite | 6 |
| TypeScript | 5 |
| React Router DOM | 7 |
| Axios | 1 |
| Tailwind CSS | 4 |
| Lucide React | (ícones) |

### Backend (`agm_backend`)
| Tecnologia | Versão |
|-----------|--------|
| NestJS | 11 |
| TypeScript | 5 |
| TypeORM | 0.3 |
| MySQL / MariaDB | - |
| JWT (Passport) | - |
| Bcryptjs | - |
| Nodemailer | - |

## Configuração do Ambiente

| Serviço | Porta | Descrição |
|---------|-------|-----------|
| MySQL | `8081` | Banco de dados |
| NestJS API | `8000` | Backend |
| React Vite | `5173` | Frontend |

### Backend `.env` (`agm_backend/.env`)
```env
PORT=8000
DATABASE_TYPE='mysql'
DATABASE_HOST='localhost'
DATABASE_PORT=8081
DATABASE_USERNAME='root'
DATABASE_PASSWORD=''
DATABASE_DATABASE='agm_db'
DATABASE_SYNCHRONIZE=false
JWT_SECRET=CHAVE_SECRETA_AGM_2026
JWT_EXPIRES_IN=2h
```

### Frontend `.env` (`agm_frontend/.env`)
```env
VITE_API_URL=http://localhost:8000
```

## Banco de Dados (8 tabelas)

### SETOR
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| ID_SETOR | INT PK | Identificador |
| COD_SETOR | VARCHAR(10) | Código (S01) |
| NOME_SETOR | VARCHAR(50) | Nome |
| CREATED_AT / UPDATED_AT | TIMESTAMP | Auditoria |

### USUARIO
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| ID_USUARIO | INT PK | Identificador |
| COD_USUARIO | VARCHAR(10) | Código único |
| NOME_USUARIO | VARCHAR(50) | Nome completo |
| EMAIL | VARCHAR(100) | E-mail |
| SENHA | VARCHAR(100) | bcrypt hash |
| FOTO | VARCHAR(200) | URL da foto |
| TIPO | INT | 1=Gerente, 2=Funcionário |
| STATUS_VALIDACAO | BOOLEAN | E-mail validado |
| RECOVERY_TOKEN | VARCHAR(255) | Token de recuperação |
| TOKEN_EXPIRES | DATETIME | Expiração do token |
| ID_SETOR | INT FK | Setor |

### GERENTE
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| ID_GERENTE | INT PK | Identificador |
| COD_GERENTE | VARCHAR(10) | Código único |
| NOME_GERENTE | VARCHAR(50) | Nome |
| ID_USUARIO | INT FK | Usuário vinculado |

### FUNCIONARIO
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| ID_FUNCIONARIO | INT PK | Identificador |
| COD_FUNCIONARIO | VARCHAR(10) | Código único |
| NOME_FUNCIONARIO | VARCHAR(50) | Nome |
| IDADE | INT | Idade |
| ID_USUARIO | INT FK | Usuário vinculado |

### LOTE_CULTIVO
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| ID_LOTE | INT PK | Identificador |
| PERIODO | INT | Ano da safra |
| NOME_LOTE | VARCHAR(50) | Nome do lote |
| ID_GERENTE | INT FK | Gerente responsável |

### ATRIBUICAO_LOTE
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| ID_ATRIBUICAO | INT PK | Identificador |
| LOTE_ID | INT FK | Lote |
| FUNCIONARIO_ID | INT FK | Funcionário |

### INSUMO
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| ID_INSUMO | INT PK | Identificador |
| DESCRICAO | VARCHAR(100) | Descrição |
| LOTE_ID | INT FK | Lote vinculado |

### APLICACAO_INSUMO
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| ID_APLICACAO | INT PK | Identificador |
| FUNCIONARIO_ID | INT FK | Funcionário |
| INSUMO_ID | INT FK | Insumo |
| QUANTIDADE | DECIMAL(10,2) | Quantidade aplicada |

## Endpoints da API

Base: `http://localhost:8000`

### Autenticação
| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | `/auth/login` | Login | Não |

**Body:** `{ "email": "carlos@agm.com", "password": "123456" }`

### Setores (`/setor`)
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/setor?page=&limit=` | Lista paginada |
| GET | `/setor/:id` | Busca por ID |
| POST | `/setor` | Criar |
| PATCH | `/setor/:id` | Atualizar |
| DELETE | `/setor/:id` | Remover |

### Usuários (`/usuario`)
| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | `/usuario` | Cadastrar | Não |
| GET | `/usuario` | Listar | JWT |
| GET | `/usuario/:id` | Buscar | JWT |
| PATCH | `/usuario/:id` | Atualizar | JWT |
| DELETE | `/usuario/:id` | Remover | JWT |
| GET | `/usuario/validar/:token` | Validar e-mail | Não |

### Funcionários (`/funcionario`) — todas requerem JWT
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/funcionario` | Listar |
| GET | `/funcionario/:id` | Buscar |
| POST | `/funcionario` | Criar |
| PATCH | `/funcionario/:id` | Atualizar |
| DELETE | `/funcionario/:id` | Remover |

### Gerentes (`/gerente`) — todas requerem JWT
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/gerente` | Listar |
| GET | `/gerente/:id` | Buscar |
| POST | `/gerente` | Criar |
| PATCH | `/gerente/:id` | Atualizar |
| DELETE | `/gerente/:id` | Remover |

### Lotes de Cultivo (`/lote-cultivo`) — todas requerem JWT
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/lote-cultivo` | Listar |
| GET | `/lote-cultivo/:id` | Buscar |
| POST | `/lote-cultivo` | Criar |
| PATCH | `/lote-cultivo/:id` | Atualizar |
| DELETE | `/lote-cultivo/:id` | Remover |

### Insumos (`/insumo`) — todas requerem JWT
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/insumo` | Listar |
| GET | `/insumo/:id` | Buscar |
| POST | `/insumo` | Criar |
| PATCH | `/insumo/:id` | Atualizar |
| DELETE | `/insumo/:id` | Remover |

### Atribuição Lote (`/atribuicao-lote`) — todas requerem JWT
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/atribuicao-lote` | Listar |
| GET | `/atribuicao-lote/:id` | Buscar |
| POST | `/atribuicao-lote` | Criar |
| PATCH | `/atribuicao-lote/:id` | Atualizar |
| DELETE | `/atribuicao-lote/:id` | Remover |

### Aplicação Insumo (`/aplicacao-insumo`) — todas requerem JWT
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/aplicacao-insumo` | Listar |
| GET | `/aplicacao-insumo/:id` | Buscar |
| POST | `/aplicacao-insumo` | Criar |
| PATCH | `/aplicacao-insumo/:id` | Atualizar |
| DELETE | `/aplicacao-insumo/:id` | Remover |

## Estrutura do Frontend

```
agm_frontend/src/
  ├── App.tsx                  # Layout (sidebar + router + proteção de rotas)
  ├── main.tsx                 # Entry point
  ├── index.css                # Tailwind + tema personalizado
  ├── contexts/
  │   └── AuthContext.tsx       # Contexto de autenticação (JWT)
  ├── pages/
  │   ├── Login.tsx             # Tela de login
  │   ├── CadastroUsuario.tsx   # Cadastro c/ seleção de setor
  │   ├── ValidarEmail.tsx      # Validação de e-mail
  │   ├── Setores.tsx           # CRUD setores (paginado)
  │   ├── Funcionarios.tsx      # CRUD funcionários
  │   ├── Gerentes.tsx          # CRUD gerentes
  │   ├── Lotes.tsx             # CRUD lotes de cultivo
  │   ├── Insumos.tsx           # CRUD insumos
  │   └── Usuario.tsx           # Listagem de usuários
  └── services/
      └── api.ts               # Axios c/ interceptor JWT
```

## Como Executar

### 1. Banco de Dados
Garanta MySQL ativo (porta 8081) e execute o script SQL:
```bash
mysql -u root -P 8081 -h 127.0.0.1 < agm_db/criacao_banco.sql
```

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
Abra **http://localhost:5173** no navegador.

## Credenciais de Teste
| Perfil | E-mail | Senha |
|--------|--------|-------|
| Gerente | carlos@agm.com | 123456 |
| Funcionário | ana@agm.com | 123456 |
