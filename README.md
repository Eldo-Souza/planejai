# 💰 Planej.ai — Educador Financeiro Inteligente

O **Planej.ai** é uma aplicação web de planejamento financeiro pessoal desenvolvida com **React, TypeScript e Inteligência Artificial Generativa**.

A aplicação permite que a pessoa usuária informe sua renda, gastos, dívidas e uma meta financeira. A partir desses dados, o Planej.ai utiliza a API do **Google Gemini** para gerar um diagnóstico financeiro personalizado, apresentando sugestões práticas, possibilidades de renda extra, sugestões de investimento e uma mensagem motivacional.

Além disso, o projeto foi evoluído com recursos de **histórico de simulações** e **conversa com o Educador Financeiro**, permitindo que a pessoa usuária faça perguntas sobre sua situação financeira e mantenha o histórico dessas conversas.

---

## 🎯 Objetivo do projeto

O projeto foi desenvolvido como parte do desafio **"Desenvolvendo Seu Educador Financeiro Inteligente Com React e IA Generativa"**.

O principal objetivo foi praticar o desenvolvimento Front-End utilizando React e TypeScript e aprender como integrar uma aplicação web com uma API de Inteligência Artificial Generativa.

---

## ✨ Funcionalidades

- Formulário de simulação financeira em etapas
- Cadastro de renda mensal
- Cadastro de custos fixos
- Cadastro de dívidas e parcelas
- Definição de uma meta financeira
- Definição do valor e prazo da meta
- Cálculo da economia mensal necessária
- Geração de diagnóstico financeiro utilizando IA
- Análise da viabilidade da meta
- Sugestões práticas para organização financeira
- Ideias para geração de renda extra
- Sugestões de investimento
- Mensagem motivacional personalizada
- Tema claro e escuro
- Persistência dos dados utilizando `localStorage`
- Histórico das simulações realizadas
- Exclusão de simulações
- Acesso aos detalhes das simulações
- Conversa com o Educador Financeiro
- Histórico das perguntas e respostas
- Persistência da conversa no `localStorage`
- Indicadores de carregamento
- Tratamento de erros
- Rolagem automática da conversa

---

## 🚀 Melhorias implementadas

Além da aplicação base apresentada durante o curso, foram implementadas duas melhorias principais.

### 📋 Histórico de simulações

Foi criada uma página de histórico que permite visualizar as simulações realizadas anteriormente.

Cada simulação apresenta:

- Nome da meta
- Data da simulação
- Custo da meta
- Prazo desejado
- Economia mensal necessária
- Botão para visualizar os detalhes
- Opção para excluir a simulação

Os dados são armazenados no `localStorage`.

### 💬 Conversa com o Educador Financeiro

Foi implementado um sistema de conversa diretamente na página de resultados.

A pessoa usuária pode fazer perguntas relacionadas à sua simulação e receber respostas personalizadas da Inteligência Artificial.

A conversa considera:

- Dados da simulação
- Diagnóstico financeiro
- Histórico das perguntas
- Histórico das respostas

As conversas também são armazenadas no `localStorage`.

---

## 🛠️ Tecnologias utilizadas

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **React Router**
- **Lucide React**
- **Google Gemini API**
- **localStorage**
- **ESLint**
- **Prettier**

---

## 📁 Estrutura principal do projeto

```text
src/
├── assets/
├── components/
│   ├── features/
│   ├── layout/
│   └── shared/
├── context/
│   └── theme/
├── data/
├── hooks/
├── pages/
├── services/
├── styles/
├── utils/
├── App.tsx
├── index.css
├── main.tsx
└── router.tsx
```

### Organização

- `components/` — componentes reutilizáveis da aplicação
- `context/` — gerenciamento do tema da aplicação
- `data/` — dados e configurações utilizados pelo projeto
- `hooks/` — lógica reutilizável, incluindo armazenamento, diagnóstico e chat
- `pages/` — páginas principais da aplicação
- `services/` — comunicação com a API do Gemini
- `styles/` — estilos e variáveis dos temas
- `utils/` — funções auxiliares
- `router.tsx` — configuração das rotas da aplicação

---

## ⚙️ Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Eldo-Souza/planejai.git
```

### 2. Acesse a pasta

```bash
cd planejai
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure a API do Gemini

Crie um arquivo chamado `.env.local` na raiz do projeto.

Adicione sua chave da API:

```env
VITE_GEMINI_API_KEY=sua_chave_aqui
```

> Nunca compartilhe sua chave da API publicamente e não a envie para o GitHub.

### 5. Execute o projeto

```bash
npm run dev
```

Depois, acesse no navegador o endereço informado pelo Vite.

---

## 🧪 Como testar

### Fluxo principal

1. Acesse a aplicação
2. Preencha sua renda mensal
3. Informe seus custos fixos
4. Informe suas dívidas e parcelas
5. Informe o nome da sua meta
6. Informe o custo da meta
7. Informe o prazo desejado
8. Clique em **Gerar simulação**
9. Aguarde a análise da IA
10. Confira o diagnóstico financeiro

### Histórico

1. Realize uma simulação
2. Acesse **Histórico**
3. Confira a simulação
4. Clique em **Ver detalhes**
5. Volte ao histórico
6. Teste a exclusão
7. Crie outra simulação e confirme que ela aparece no histórico

### Educador Financeiro

1. Abra uma simulação
2. Aguarde o diagnóstico
3. Digite uma pergunta
4. Envie a pergunta
5. Confira a resposta da IA
6. Faça novas perguntas
7. Volte ao histórico
8. Abra novamente a simulação
9. Verifique se a conversa foi preservada

---

## 🤖 Integração com Inteligência Artificial

O Planej.ai utiliza a **API do Google Gemini** para gerar os diagnósticos financeiros e responder às perguntas realizadas durante a conversa.

A aplicação envia informações da simulação para a IA, incluindo:

- Renda
- Custos fixos
- Dívidas
- Meta financeira
- Valor da meta
- Prazo
- Economia mensal necessária

A partir dessas informações, a IA gera uma análise estruturada e personalizada.

---

## 🎨 Interface

A aplicação possui:

- Tema claro
- Tema escuro
- Layout responsivo
- Componentes reutilizáveis
- Feedback visual durante carregamentos
- Tratamento de erros
- Interface adaptada para diferentes tamanhos de tela

---

## 🤖 Uso de Inteligência Artificial no desenvolvimento

Durante o desenvolvimento deste projeto, utilizei ferramentas de Inteligência Artificial como apoio ao aprendizado, à compreensão de conceitos, à identificação e correção de erros e à implementação de algumas funcionalidades.

A utilização da IA fez parte do processo de estudo e desenvolvimento, sendo o projeto revisado, testado e executado por mim.

## 📚 O que aprendi

Durante o desenvolvimento deste projeto, pratiquei conhecimentos em:

- React
- TypeScript
- Componentização
- Props e interfaces
- Hooks
- Context API
- React Router
- Formulários em etapas
- `localStorage`
- Integração com APIs
- API do Google Gemini
- Construção de prompts para IA
- Tratamento de erros
- Estados de carregamento
- Persistência de dados
- Organização de projetos Front-End
- Tailwind CSS
- Desenvolvimento responsivo
- Git e GitHub

Um dos principais aprendizados foi entender como uma aplicação Front-End pode utilizar Inteligência Artificial Generativa para transformar dados fornecidos pelo usuário em informações personalizadas.

---

## 📌 Projeto desenvolvido para portfólio

Este projeto representa minha evolução prática no desenvolvimento Front-End e minha experiência trabalhando com uma aplicação React integrada a uma API de Inteligência Artificial Generativa.

A aplicação foi construída a partir do projeto base disponibilizado no desafio e posteriormente evoluída com funcionalidades próprias, incluindo o histórico de simulações e a conversa com o Educador Financeiro.

---

## 👨‍💻 Autor

**Eldo de Souza**

Projeto desenvolvido para estudos e evolução profissional em desenvolvimento Front-End.

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e de portfólio.
