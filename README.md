# Projeto de Gerenciamento de Produtos e Fornecedores

## Descrição

Este projeto é uma aplicação web desenvolvida em React para gerenciar produtos e fornecedores. A aplicação permite adicionar, editar, buscar e excluir produtos e fornecedores, além de filtrar produtos por nome e fornecedor.

## Funcionalidades

### Gerenciamento de Produtos

- Adicionar um novo produto
- Editar um produto existente
- Excluir um produto
- Buscar produtos pelo nome
- Filtrar produtos por fornecedor

### Gerenciamento de Fornecedores

- Adicionar um novo fornecedor
- Editar um fornecedor existente
- Excluir um fornecedor
- Buscar fornecedores pela descrição

## Estrutura do Projeto

O projeto é organizado da seguinte forma:

src/
|-- components/
| |-- ProductForm.js
| |-- ProductList.js
| |-- ProductManagement.js
| |-- SupplierForm.js
| |-- SupplierList.js
| |-- SupplierManagement.js
|-- App.js
|-- index.js
|-- api/
| |-- axiosConfig.js


### Componentes

#### ProductForm.js

Formulário para adicionar novos produtos.

#### ProductList.js

Lista de produtos com funcionalidades para editar e excluir.

#### ProductManagement.js

Componente principal para o gerenciamento de produtos, incluindo a busca e filtro.

#### SupplierForm.js

Formulário para adicionar novos fornecedores.

#### SupplierList.js

Lista de fornecedores com funcionalidades para editar e excluir.

#### SupplierManagement.js

Componente principal para o gerenciamento de fornecedores, incluindo a busca.

## Configuração e Execução

### Pré-requisitos

- Node.js
- npm ou yarn

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git

Navegue até o diretório do projeto:
cd nome-do-repositorio

Instale as dependências:
npm install
ou
yarn install

Execução
Para iniciar o servidor de desenvolvimento, execute:
npm start
ou
yarn start
A aplicação estará disponível em http://localhost:3000.

Endpoints da API
Produtos
GET /products: Retorna a lista de produtos
POST /products: Adiciona um novo produto
PUT /products/:id: Atualiza um produto existente
DELETE /products/:id: Exclui um produto
Fornecedores
GET /suppliers: Retorna a lista de fornecedores
POST /suppliers: Adiciona um novo fornecedor
PUT /suppliers/:id: Atualiza um fornecedor existente
DELETE /suppliers/:id: Exclui um fornecedor
Tecnologias Utilizadas
React
Axios
Material-UI.
