# Projeto Lista de Tarefas

- Ainda em desenvolvimento....

O objetivo deste projeto é criar uma lista de tarefas versátil, na qual você pode organizar suas tarefas em quadros. Cada quadro possui suas próprias tarefas, e as tarefas podem ter suas sub tarefas, que você pode marcar como concluídas ou não concluídas. Além disso, cada tarefa pode ser marcada como pendente, em andamento ou concluida. É importante destacar que cada quadro e tarefa são separados por usuário, garantindo uma experiência personalizada.

## Features

- [x] Login de usuario.
- [x] Cadastro de usuário com e-mail e senha.
- [x] Criação de quadros para organizar suas tarefas.
- [x] Possibilidade de adicionar tarefas e suas respectivas sub tarefas.
- [x] Marcar as Subtarefas como concluídas ou não concluídas.
- [x] Indicar o status das tarefas, se estão pendentes, em andamento ou concluida.
- [x] Personalização e separação das tarefas por usuário.
- [x] Deletar quadro
- [x] Deletar tarefa

## Tecnologias utilizadas

- [typescript](https://www.typescriptlang.org/)
- [Styled-component](https://styled-components.com/docs)
- [jest](https://jestjs.io/pt-BR/)
- [redux](https://redux-toolkit.js.org/)
- [react-icons](https://react-icons.github.io/react-icons/)
- [StoryBook](https://storybook.js.org/)
- [next](https://nextjs.org/)
- [next-auth](https://next-auth.js.org/)

## ARCHITECTURE

1. ## Component
   - Armazena todos os componentes do projeto, tanto os reutilizáveis quanto os não reutilizáveis.
2. ## Types
   - Eu guardo todas os types utilizadas nos componentes.
3. ## Pages
   - Guardas as Páginas do projeto.
4. ## Api
   - No Next voçê pode fazer um back-end local. Utilizei essa parte para adicionar o arquivo de autenticação da aplicação.
5. ## Template
   - Serve para combinar os componentes criados e transformá-los em um único elemento.
6. ## Styles
   - Armazena o CSS global da aplicação.
7. ## App
   - Contém todas as configurações do Redux.
8. ## Utils
   - Guarda funções reutilizáveis do projeto.

Essa organização visa facilitar o desenvolvimento e a manutenção do projeto, mantendo uma estrutura clara e modular.

## Project Setup

- Siga as instruções abaixo, por etapa, para rodar o projeto:

---

## OBS: Este Projeto contem variavel de ambiente adicione elas antes o usar o projeto

- antes de tudo de uma olhada no back-end do projeto = https://github.com/JoaoEduardo10/API-todoList

NEXT_PUBLIC_URL_API= seu back-end da aplicaçao
NEXT_AUTH_SECRET=fdvfvdfxv
NEXTAUTH_URL=http://localhost:3000/
NEXT_PUBLIC_HASH_JWT=vdfvzsfvd "tem que ser o mesmo que esta no back-end"
NEXT_PUBLIC_URL_SITE_LOGIN=http://localhost:3000/login

---

## Como rodar o projeto

```bash
# instale as dependencias
$ npm install ou yarn

# iniciar o projeto
npm run dev
ou
yarn dev

```

### caso queira buildar o projeto

```sh
npm run build ou yarn build
```

### caso queira rodar os test

```sh
npm run test ou yarn test
```

### caso queira rodar o storyBook

```sh
npm run sb ou yarn sb
```
