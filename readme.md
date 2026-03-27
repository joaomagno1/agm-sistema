# 🚜 Sistema AGM (Agro Gestão e Monitoramento)

## 📖 Visão Geral do Projeto
O Sistema AGM é uma plataforma web full-stack desenvolvida para a gestão eficiente de operações agropecuárias. O sistema permite o mapeamento e controle de entidades fundamentais da fazenda, garantindo uma administração centralizada e em tempo real.

Atualmente, o sistema suporta o módulo de **Gestão de Setores** (CRUD completo), com arquitetura preparada para escalabilidade e inclusão de novos módulos, como Funcionários e Máquinas.



---

## 🛠️ Arquitetura e Tecnologias

O projeto adota uma arquitetura cliente-servidor, separando claramente as responsabilidades da interface (Frontend) e da regra de negócio (Backend).

### Frontend (`agm_frontend`)
* **Framework:** React 18 (construído via Vite)
* **Linguagem:** TypeScript
* **Roteamento:** React Router DOM v6
* **Comunicação HTTP:** Axios
* **Estilização:** Inline Styles & CSS puro (arquitetura componentizada)

### Backend (`agm_backend`)
* **Framework:** NestJS
* **Linguagem:** TypeScript
* **ORM:** TypeORM
* **Banco de Dados:** MySQL

---

## ⚙️ Configuração do Ambiente (Variáveis e Portas)

Para evitar conflitos de rede, o ecossistema AGM está configurado com o seguinte mapeamento de portas locais:

| Serviço | Porta Local | Descrição |
| :--- | :--- | :--- |
| **MySQL (XAMPP/DBeaver)** | `8081` | Cofre de dados central |
| **NestJS API** | `8000` | Servidor backend e rotas HTTP |
| **React Vite** | `5173` | Interface do utilizador no navegador |

### `.env` do Backend (`agm_backend/.env`)
```env
PORT=8080
DATABASE_HOST=localhost
DATABASE_PORT=8000
DATABASE_USER=root
DATABASE_PASSWORD=sua_senha_aqui
DATABASE_NAME=agm_db
```

## 🗄️ Entidades e Banco de Dados

### 1. Setor (setor) 
#### Entidade responsável por mapear as áreas físicas da fazenda.

| Coluna | Tipo | Descrição |
| :--- | :--- | :--- |
| **id** | `INT (PK)` | Identificador único (Auto-incremento) |
| **codSetor** | `VARCHAR` | Código alfanumérico de identificação (ex: S03) |
| **nomeSetor** | `VARCHAR` | Nome descritivo da área (ex: Setor Leste) |

## 🔌 Documentação da API (Endpoints)
### Base URL: http://localhost:8080
#### (CORS habilitado para aceitar requisições do frontend)

Módulo: Setores (/setor)
GET /setor

Retorna: Um array (lista) de todos os setores registados.

POST /setor

Corpo (JSON): { "codSetor": "S01", "nomeSetor": "Setor Norte" }

Ação: Cria um novo setor na base de dados.

PATCH /setor/:id

Parâmetro: ID do setor na URL.

Corpo (JSON): Dados a serem atualizados.

Ação: Atualiza as informações de um setor existente.

DELETE /setor/:id

Parâmetro: ID do setor na URL.

Ação: Remove o setor permanentemente da base de dados.

## 🧩 Estrutura do Frontend
### O frontend foi componentizado para facilitar a manutenção e a navegação através de rotas dinâmicas (Single Page Application).

```
agm_frontend/src/
 ├── App.tsx             # Layout principal (Sidebar, Navegação e Roteador)
 ├── main.tsx            # Ponto de entrada do React
 │
 ├── pages/              # Módulos de Tela (Views)
 │    ├── Setores.tsx      # CRUD completo da entidade Setor
 │    └── Funcionarios.tsx # View provisória (Próxima implementação)
 │
 └── services/           # Regras de Comunicação Externa
      └── api.ts         # Instância global do Axios configurada com a Base URL
```

## 🚀 Como Executar o Projeto Localmente

### 1.Inicie o Banco de Dados: Garanta que o serviço MySQL está ativo na porta 8000 (via XAMPP ou outro gerenciador).

### 2.Inicie o Backend:
```
cd agm_backend
npm install
npm run start:dev
```

### 3. Inicie o Frontend:
```
cd agm_frontend
npm install
npm run dev
```

### 4. Acesse: Abra http://localhost:5173 no seu navegador.