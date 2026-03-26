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
