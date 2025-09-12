# 🥤 Máquina de Refrigerante

![Máquina de Refrigerante](white_monster.jpg)

**Disciplina:** SCC0219 - Introdução ao Desenvolvimento Web  
**Instituição:** Universidade de São Paulo — ICMC  
**Semestre:** 2º/2025

## 📋 Sobre o Projeto

Este projeto simula uma **máquina de refrigerante** interativa desenvolvida em HTML, CSS e JavaScript vanilla. O usuário pode selecionar produtos, inserir moedas via drag & drop e receber o produto com troco quando necessário.

## ✨ Funcionalidades

- 🛒 **Seleção de produtos** - Lista carregada via API
- 💰 **Sistema de pagamento** - Aceita moedas de R$ 0,25, R$ 0,50 e R$ 1,00
- 🖱️ **Drag & Drop** - Arraste moedas para a máquina
- 📺 **Visor interativo** - Mostra status em tempo real
- 💸 **Cálculo de troco** - Retorna diferença automaticamente
- 🎉 **Animações** - Feedback visual para liberação do produto

## 🚀 Como Rodar

### Opção 1: Com Makefile (Recomendado)
```bash
# Inicia servidor e abre navegador automaticamente
make dev

# Ou apenas inicia o servidor
make start

# Para parar
make stop
```

### Opção 2: Python (Manual)
```bash
# Navegue até a pasta do projeto
cd atv1

# Inicie um servidor HTTP
python3 -m http.server 8000

# Acesse no navegador
# http://localhost:8000
```

### Opção 3: Live Server (VSCode)
1. Instale a extensão "Live Server"
2. Clique com botão direito no `index.html`
3. Selecione "Open with Live Server"

## 🔧 Estrutura do Projeto

```
atv1/
├── index.html          # Página principal
├── app.js              # Lógica da aplicação
├── types.js            # Classes e tipos
├── styles.css          # Estilos visuais
├── monster.jpg         # Imagem da máquina
├── monster_logo.jpg    # Logo do produto
├── Makefile           # Scripts para rodar o projeto
└── README.md          # Este arquivo
```

## 🎮 Como Usar

1. **Selecione um refrigerante** - Clique em qualquer produto da lista
2. **Insira moedas** - Arraste as moedas para a área da máquina
3. **Aguarde** - O visor mostra o valor inserido e restante
4. **Libere o produto** - Quando o valor for suficiente, clique em "Liberar"
5. **Receba o troco** - Se houver, será exibido na tela

## 📡 API

O projeto consome dados de refrigerantes de:
```
https://api.jsonbin.io/v3/b/68b9f743d0ea881f4071dd7f
```

## 🛠️ Tecnologias

- **HTML5** - Estrutura da página
- **CSS3** - Estilos e animações
- **JavaScript ES6+** - Lógica e interatividade
- **Drag & Drop API** - Interação com moedas
- **Fetch API** - Consumo de dados

## 📝 Requisitos Atendidos

- ✅ Lista de produtos via Web Service
- ✅ Seleção por botões
- ✅ Inserção de moedas via drag & drop
- ✅ Moedas aceitas: R$ 0,25, R$ 0,50, R$ 1,00
- ✅ Valor necessário: R$ 2,50
- ✅ Cálculo de troco
- ✅ Mensagens sem `alert()`
- ✅ Visor atualizado em tempo real

## 🎨 Interface

- **Design responsivo** - Funciona em desktop e mobile
- **Feedback visual** - Animações e cores indicativas
- **UX intuitiva** - Interface limpa e fácil de usar
- **Acessibilidade** - Labels e estrutura semântica

💡 **Dica:** Use `make help` para ver todos os comandos disponíveis!
