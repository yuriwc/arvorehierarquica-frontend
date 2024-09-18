# Projeto Frontend - JSON Tree Viewer

Este projeto é uma aplicação React/Next.js que permite carregar, visualizar e baixar árvores em formato JSON. Os usuários podem ver a estrutura hierárquica de um JSON em uma visualização interativa em árvore e baixar o JSON quando necessário.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Next.js**: Framework React para renderização do lado do servidor (SSR) e otimização de performance.
- **TypeScript**: Superset de JavaScript que adiciona tipos estáticos.
- **Tailwind CSS**: Framework de utilitários para estilização de interfaces.

## Funcionalidades
- Montar uma árvore hierárquica com palavras-chave manualmente.
- Exibir o JSON como uma árvore interativa.
- Download do JSON carregado como um arquivo.
- Carregar um arquivo JSON do armazenamento local (localStorage).

## Requisitos

Certifique-se de ter os seguintes softwares instalados antes de começar:

- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/yuriwc/arvorehierarquica-frontend
   ```

2.Navegue até o diretório do projeto:

   ```bash
   cd arvorehierarquica-frontend
   ```

3. Instale as dependências:

   ```bash
    npm install
    ```
    ou
    ```bash
    yarn install
    ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```
    ou
    ```bash
    yarn dev
    ```

5. Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

## Estrutura de Arquivos
código-fonte do projeto está organizado da seguinte forma:

```
arvorehierarquica-frontend/
├── components/
│   ├── breadcrumbs
│   ├── icons
│   ├── navbar
│   ├── tree-form
│   └── tree-node
├── app/
│   ├── page
│   ├── add/page

├── public/
├── styles/
├── types/
```
