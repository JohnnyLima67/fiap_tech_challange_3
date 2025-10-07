## 💻 FIAP Tech Challenge 3
Este projeto foi desenvolvido como parte do Tech Challenge da FIAP. Ele consiste em uma aplicação web com arquitetura dividida entre backend (API) e frontend (client), permitindo a comunicação entre ambos para entrega de funcionalidades completas.

## 📁 Estrutura do Projeto
O repositório está organizado em duas pastas principais:

### Code

```
fiap_tech_challange_3/
├── api/       # Backend em Node.js + TypeScript
└── client/    # Frontend em React
```
## 🔧 Backend (api/)
Desenvolvido com Node.js e TypeScript

Contém o arquivo principal index.ts, responsável por iniciar o servidor

Utiliza bibliotecas como express para rotas e middleware

Contêm rotas REST para manipulação de dados e comunicação com o frontend

### Como rodar a API:

cd api
node index.ts
Isso iniciará o servidor de back-end com a API, acessível em http://localhost:4000.

## 🎨 Frontend (client/)
Desenvolvido com React

Interface web que consome os dados da API

Utiliza componentes funcionais e hooks para gerenciamento de estado

### Como rodar o client:

cd client
npm install
npm start
Isso iniciará o servidor de desenvolvimento do React, acessível em http://localhost:3000.

### 🚀 Como funciona
API: Ao rodar node index.ts, o servidor backend é iniciado e começa a escutar requisições HTTP.

Client: O frontend é iniciado com npm start e se comunica com a API para buscar ou enviar dados.

Integração: O client faz chamadas para os endpoints da API, exibindo os dados na interface web.

### 📦 Requisitos
Node.js (versão recomendada: 18+)

npm (ou yarn)

Navegador moderno para acessar o client
