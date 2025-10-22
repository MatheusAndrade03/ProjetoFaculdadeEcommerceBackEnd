# 🛒 EcommerceProjeto1

Projeto de sistema simples de **e-commerce** desenvolvido em **Node.js puro**, utilizando o **MongoDB** como banco de dados e o **Winston** para registro de logs.  
O sistema segue o padrão de **classes separadas por entidade** e um **menu interativo** no terminal para facilitar os testes.

---

## 🚀 Funcionalidades

O projeto permite gerenciar três entidades principais:

### 👤 Usuários
- Criar um novo usuário  
- Listar todos os usuários  
- Atualizar usuário existente  
- Excluir usuário  

### 📦 Produtos
- Criar um novo produto  
- Listar todos os produtos  
- Atualizar produto existente  
- Excluir produto  

### 🧾 Pedidos
- Criar um pedido (associado a um usuário e produtos)  
- Listar todos os pedidos  
- Excluir pedido  




## ⚙️ Tecnologias Utilizadas

| Tecnologia | Descrição |
|-------------|------------|
| **Node.js** | Ambiente de execução JavaScript no servidor |
| **MongoDB** | Banco de dados NoSQL usado para armazenar dados das entidades |
| **Mongoose** | ODM (Object Data Modeling) para interação com o MongoDB |
| **Winston** | Biblioteca para geração e controle de logs |
| **Readline-sync** | Biblioteca para interação via terminal (menu interativo) |

---

## 🛠️ Instalação e Execução

### 1️⃣ Pré-requisitos
- Node.js instalado  
- MongoDB em execução localmente (`mongodb://localhost:27017`)

---

### 2️⃣ Instalar dependências
No terminal, dentro da pasta do projeto:

```bash
npm install
```

---

### 3️⃣ Executar o sistema
```bash
npm start
```
ou
```bash
node app.js
```

---

## 🧮 Funcionamento dos Logs

O sistema gera automaticamente um arquivo `logs/app.log`, onde são registrados todos os eventos importantes, como:

- Criação de usuários, produtos e pedidos  
- Erros e falhas de conexão  
- Exclusões e atualizações  

Exemplo de log:

```
2025-10-21 19:45:33 [INFO]: Produto criado com sucesso - ID: 68cb611578e4262779f8337b
2025-10-21 19:46:10 [ERROR]: Erro ao criar pedido - Usuário não encontrado
```


Este projeto foi ajustado para:
- **Não utilizar Express**
- **Não usar padrão MVC**
- **Ter apenas classes e scripts organizados por entidade**

## 🧑‍💻 Autor
**Matheus Henrique de Andrade Pellegrini**  
Projeto desenvolvido para fins acadêmicos — disciplina de Programação Back-End com Node.js.

