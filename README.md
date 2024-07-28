# Project Name

## Descrição

Este é um projeto que utiliza React, Axios, e React Query para gerenciar e exibir posts e comentários. A aplicação consome a API JSONPlaceholder, que simula operações de CRUD. A API não altera dados reais, portanto, as operações de exclusão (`DELETE`) e atualização (`PUT`) apenas simulam essas ações sem modificar dados no servidor.

O projeto inclui funcionalidades básicas de CRUD para posts e exibe uma lista de comentários associados a cada post.

## Tecnologias Utilizadas

-   **Vite**: Ferramenta de build e desenvolvimento rápido.
-   **React**: Biblioteca para construção da interface de usuário.
-   **Axios**: Biblioteca para fazer requisições HTTP.
-   **TanStack React Query**: Biblioteca para gerenciamento de estado e cache de dados.
-   **Shadcn**: Biblioteca de componentes UI para estilização e construção de interfaces.

## Funcionalidades

-   **Exibição de Posts**: Lista os posts com a capacidade de selecionar um post para ver detalhes adicionais.

-   **Detalhes do Post**: Exibe detalhes do post selecionado, com opções para atualizar o título do post e deletar o post.

-   **Paginação**: A aplicação implementa a paginação para exibir dez posts por página. Utiliza o estado local para controlar a página atual e o post selecionado. Para melhorar a performance e a experiência do usuário, a pré-busca de dados da próxima página é realizada usando o método `prefetchQuery` do `queryClient`.

-   **Gerenciamento de Estado e Mutations**:

    -   **Update**: Permite a atualização do título do post usando `react-query` e a API simulada.
    -   **Delete**: Permite a exclusão de posts, também simulada pela API.

-   **Handling de Erros e Loading**: Exibe mensagens de carregamento e erro conforme o estado das requisições.

-   **Separador e Botões**: Utiliza componentes de UI personalizados para botões e separadores.

## Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/DiogoLuxa/blog-ipsum.git
    ```

2. Navegue até o diretório do projeto:

    ```bash
    cd blog-ipsum
    ```

3. Instale as dependências:
    ```bash
    npm install
    ```

## Execução

Para iniciar o servidor de desenvolvimento e visualizar a aplicação localmente, execute:

```bash
npm run dev
```

## Scripts

-   **`npm run dev`**: Inicia o servidor de desenvolvimento.
-   **`npm run build`**: Cria uma versão otimizada para produção.
-   **`npm run lint`**: Executa o linting do código.
-   **`npm test`**: Executa os testes automatizados.

## Estrutura do Projeto

Aqui está a estrutura de arquivos do projeto:

```
src
├─ api
│  ├─ dataFetch.js
│  └─ queries.js
├─ components
│  ├─ PostDetail
│  │  └─ PostDetail.jsx
│  ├─ Posts
│  │  └─ Posts.jsx
│  └─ ui
│     ├─ button.jsx
│     └─ separator.jsx
├─ lib
│  └─ utils.js
├─ App.jsx
├─ index.css
└─ main.jsx
```

## Contato

-   **Nome**: Diogo Luxa
-   **Email**: diogoluxa@outlook.com
-   **LinkedIn**: [Diogo Luxa](https://www.linkedin.com/in/diogo-tadeu)
