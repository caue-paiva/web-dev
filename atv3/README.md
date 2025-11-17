# Especificação do Sistema "Poções e Soluções"

## Como Executar o Projeto

### Backend (Servidor)
```bash
cd server
npm install        # Instalar dependências (apenas na primeira vez)
npm run dev        # Iniciar o servidor
```

O backend roda na **porta 3000** (servidor Express com banco SQLite).

### Frontend (Cliente)
Abra um **novo terminal** e execute:
```bash
cd client
npm install        # Instalar dependências (apenas na primeira vez)
npm run dev        # Iniciar o servidor de desenvolvimento
```

O frontend roda na **porta 5173** (servidor de desenvolvimento Vite).

### Início Rápido (ambos ao mesmo tempo)
Você pode executar ambos em paralelo usando duas janelas de terminal:

**Terminal 1:**
```bash
cd server && npm run dev
```

**Terminal 2:**
```bash
cd client && npm run dev
```

Uma vez que ambos estiverem rodando:
- **Frontend (Loja/Admin)**: http://localhost:5173
- **Backend API**: http://localhost:3000/api/potions

O frontend irá consumir a API do backend para exibir e gerenciar as poções.

---

## 1. Visão geral

O sistema "Poções e Soluções" é composto por:

- Um Web Service em NodeJS que expõe poções armazenadas em um banco SQLite em memória, usando Sequelize.
- Um site em React (Vite) voltado para compradores, consumindo o Web Service.
- Uma página de administração para cadastro e remoção de poções.

---

## 2. Escopo

### 2.1. Incluído no escopo

- Cadastro de poções (via API e interface de admin).
- Listagem de poções.
- Remoção de poções.
- Exibição de uma página de loja com:
  - Descrição da loja.
  - Seção de histórico da loja com fotos.
  - Listagem de poções disponíveis com botão "Comprar".
  - Rodapé com informações de contato.
- Persistência em banco SQLite em memória via Sequelize.
- Estilo visual dark com fonte clássica e sóbria.

### 2.2. Fora do escopo

- Fluxo real de compra e pagamento.
- Autenticação de usuários.
- Persistência em disco ou em banco externo.
- Painéis analíticos, carrinho de compras, etc.

---

## 3. Requisitos funcionais

### 3.1. Web Service / API

**RF-API-01**  
O sistema deve prover um endpoint para listar todas as poções cadastradas.

**RF-API-02**  
O sistema deve prover um endpoint para buscar detalhes de uma poção específica por id.

**RF-API-03**  
O sistema deve prover um endpoint para cadastrar uma nova poção com os campos:
- nome
- descrição
- URL da imagem
- preço

**RF-API-04**  
O sistema deve prover um endpoint para remover uma poção existente por id.

**RF-API-05**  
O sistema deve validar os campos obrigatórios no cadastro de poções.

---

### 3.2. Administração

**RF-ADM-01**  
O sistema deve disponibilizar uma página de administração que permita cadastrar novas poções.

**RF-ADM-02**  
A página de administração deve exibir uma lista das poções cadastradas.

**RF-ADM-03**  
A página de administração deve permitir a remoção de poções através da interface.

**RF-ADM-04**  
A página de administração deve validar campos obrigatórios antes de enviar o cadastro ao backend.

---

### 3.3. Loja (site para comprador)

**RF-LOJA-01**  
A página principal deve exibir a descrição da loja "Poções e Soluções".

**RF-LOJA-02**  
A página principal deve exibir uma seção de histórico da loja, incluindo:
- Ano de fundação (1867)
- Texto sobre o histórico
- Uma ou mais fotos ilustrativas

**RF-LOJA-03**  
A página principal deve exibir uma seção de produtos que lista as poções cadastradas no banco, obtidas via Web Service.

**RF-LOJA-04**  
Cada poção exibida ao comprador deve conter:
- Nome
- Imagem
- Descrição
- Preço
- Botão "Comprar"

**RF-LOJA-05**  
O botão "Comprar" não precisa efetivar uma compra, mas deve ter uma ação visível ao usuário (por exemplo, um aviso de funcionalidade não implementada).

**RF-LOJA-06**  
A página principal deve ter um rodapé com:
- Informações de contato (email, telefone)
- Endereço fictício da loja

---

## 4. Requisitos não funcionais

**RNF-01**  
O front-end deve ser desenvolvido em React, usando Vite como bundler.

**RNF-02**  
O backend deve ser desenvolvido em NodeJS (Express) e usar Sequelize para acesso ao banco.

**RNF-03**  
O banco de dados deve ser SQLite em memória, usando storage ":memory:".

**RNF-04**  
A paleta de cores do site deve ser escura (tema dark).

**RNF-05**  
A fonte principal deve ser clássica e sóbria, por exemplo:
- "Gill Sans", com fontes de fallback adequadas.

**RNF-06**  
A comunicação entre front-end e backend deve ser feita via chamadas HTTP usando JavaScript (fetch ou equivalente).

---

## 5. Arquitetura da solução

### 5.1. Estrutura de pastas

```text
pocoes-e-solucoes/
  server/
    src/
      index.js        # entrada do servidor Express
      db.js           # conexão Sequelize com SQLite
      models/
        Potion.js
      routes/
        potions.js
      seed.js         # carga inicial de poções
  client/
    src/
      main.tsx ou main.jsx
      App.tsx
      router.tsx
      pages/
        StorePage.tsx
        AdminPage.tsx
      components/
        Layout/
          Layout.tsx
          Header.tsx
          Footer.tsx
        Store/
          HeroSection.tsx
          HistorySection.tsx
          ProductsSection.tsx
          PotionCard.tsx
        Admin/
          PotionForm.tsx
          PotionList.tsx
      styles/
        global.css
