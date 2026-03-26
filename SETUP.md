# 🌾 Sistema AGM - Gestão Agropecuária (Guia de Construção do Zero)

Este documento contém o passo a passo oficial para construir e configurar o Sistema AGM desde o zero absoluto, englobando a base de dados MySQL, a API em NestJS e a interface em React.

## 📌 Pré-requisitos
Certifique-se de que a sua máquina possui:
* [Node.js](https://nodejs.org/) (Versão 20 ou superior)
* [Git](https://git-scm.com/)
* [MySQL](https://www.mysql.com/) gerido através do [DBeaver](https://dbeaver.io/)

---

## 🛠️ Passo 0: A Base de Dados (DBeaver)
Antes de escrevermos qualquer código, o terreno de dados precisa de estar preparado.

1. Abra o **DBeaver** e ligue-se ao seu MySQL local (geralmente no porto `3306` ou `3307`).
2. Clique com o botão direito sobre a ligação e selecione **Criar -> Base de Dados** (Create -> Database).
3. Nomeie a base de dados como `agm_db` e clique em OK.
4. Selecione a base de dados `agm_db` e pressione **F3** para abrir um novo Editor SQL.
5. Copie o script completo de criação das tabelas (que espelha a estrutura `SETOR`, `USUARIO`, `LOTE_CULTIVO`, etc.) e cole no editor.
6. Pressione **Alt + X** para executar todo o script e construir as tabelas.

---

## 📂 Passo 1: O Cofre no GitHub
1. Aceda ao [GitHub](https://github.com/) e crie um **Novo Repositório**.
2. Dê o nome de `agm-sistema`.
3. **MUITO IMPORTANTE:** Deixe as opções "Add a README file" e "Add .gitignore" **desmarcadas**. O repositório tem de nascer 100% vazio.
4. Clique em **Create repository** e guarde o link gerado (terminado em `.git`).

---

## 💻 Passo 2: A Estrutura Local
Abra o terminal na sua máquina (na Área de Trabalho ou pasta da sua preferência) e crie a pasta principal:

```bash
mkdir agm-sistema
cd agm-sistema
```

## ⚙️ Passo 3: Forjando o Backend (NestJS)
Ainda no terminal, dentro da pasta agm-sistema, vamos gerar a API do servidor:

```Bash

npx @nestjs/cli new agm_backend
(Escolha npm quando o terminal perguntar qual o gestor de pacotes a utilizar).
```
Entre na pasta do backend e instale as ferramentas necessárias para ligar à base de dados:

```Bash

cd agm_backend
npm install @nestjs/typeorm typeorm mysql2 dotenv @nestjs/config
```
Crie um ficheiro chamado .env na raiz da pasta agm_backend com as seguintes credenciais:

```Plaintext

PORT=8000
DATABASE_TYPE='mysql'
DATABASE_HOST='localhost'
DATABASE_PORT=3307
DATABASE_USERNAME='root'
DATABASE_PASSWORD=''
DATABASE_DATABASE='agm_db'
DATABASE_SYNCHRONIZE=false
```
(Altere a porta e a palavra-passe conforme a configuração do seu MySQL).

## 🎨 Passo 4: Forjando o Frontend (React)
Volte à pasta principal para criar a interface visual utilizando Vite e TypeScript:

```Bash

cd ..
npm create vite@latest agm_frontend -- --template react-ts
```
Entre na pasta do frontend e instale as dependências básicas:

```Bash

cd agm_frontend
npm install
npm install axios react-router-dom
```

## 🚀 Passo 5: O Elo de Ligação (Git e GitHub)
Com as pastas do frontend e backend prontas, vamos transformar a pasta principal num repositório e enviar tudo para a nuvem.

Volte para a pasta raiz (agm-sistema):

```Bash

cd ..
Execute os comandos abaixo pela exata ordem para inicializar o Git e enviar os ficheiros:

Bash

git init
git add .
git commit -m "Setup inicial: Backend NestJS e Frontend React do sistema AGM"
git branch -M main
```

Agora, adicione o link do repositório vazio que criou no Passo 1 e empurre o código (substitua pelo seu link):

```Bash

git remote add origin [https://github.com/SEU_USUARIO/agm-sistema.git](https://github.com/SEU_USUARIO/agm-sistema.git)
git push -u origin main
```

## ✅ Como Executar o Projeto no Dia a Dia
Para ligar o Servidor (Backend):

```Bash

cd agm_backend
npm run start:dev
```

O terminal indicará que a API está a correr na porta 8000.

Para ligar a Interface (Frontend):
Abra um novo terminal e execute:

```Bash

cd agm_frontend
npm run dev
```
O terminal fornecerá o link (geralmente http://localhost:5173) para aceder ao sistema.


