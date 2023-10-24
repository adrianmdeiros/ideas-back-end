# Documentação da API

## Categorias [/categories]

### Criar uma Categoria [POST]

- Cria uma nova categoria.
- Parâmetros:
  - `name` (string) - O nome da categoria.
- Respostas:
  - 201 - Categoria criada com sucesso.
  - 409 - Categoria já existe.

### Listar Categorias [GET]

- Lista todas as categorias disponíveis.
- Respostas:
  - 200 - Lista de categorias.
  - 404 - Nenhuma categoria encontrada.

## Projetos [/projects]

### Criar um Projeto [POST]

- Cria um novo projeto.
- Parâmetros:
  - `title` (string) - Título do projeto.
  - `description` (string) - Descrição do projeto.
  - `studentsRequired` (number) - Número de estudantes necessários.
  - `userId` (number) - ID do usuário associado ao projeto.
  - `categoryId` (number) - ID da categoria associada ao projeto.
- Respostas:
  - 201 - Projeto criado com sucesso.
  - 400 - Requisição inválida (userId e categoryId são necessários).
  - 409 - Projeto já existe.

### Listar Projetos [GET]

- Lista todos os projetos disponíveis.
- Parâmetros:
  - `userId` (string) - ID do usuário para listar projetos específicos.
  - `categoryId` (string) - ID da categoria para listar projetos específicos.
- Respostas:
  - 200 - Lista de projetos.
  - 404 - Nenhum projeto encontrado.

### Atualizar um Projeto [PUT /projects/{id}]

- Atualiza um projeto existente.
- Parâmetros:
  - `title` (string) - Título do projeto.
  - `description` (string) - Descrição do projeto.
- Respostas:
  - 200 - Projeto atualizado com sucesso.
  - 400 - Requisição inválida.

### Excluir um Projeto [DELETE /projects/{id}]

- Exclui um projeto existente.
- Respostas:
  - 200 - Projeto excluído com sucesso.
  - 400 - Requisição inválida.

## Usuários [/users]

### Criar um Usuário [POST]

- Cria um novo usuário.
- Parâmetros:
  - `id` (number) - ID do usuário.
  - `name` (string) - Nome do usuário.
  - `email` (string) - Email do usuário.
  - `phone` (string) - Número de telefone do usuário.
  - `avatarURL` (string) - URL do avatar do usuário.
  - `bond` (string) - Vínculo do usuário.
  - `bio` (string) - Biografia do usuário.
- Respostas:
  - 201 - Usuário criado com sucesso.
  - 409 - Usuário já existe.

### Listar Usuários [GET]

- Lista todos os usuários disponíveis.
- Respostas:
  - 200 - Lista de usuários.
  - 404 - Nenhum usuário encontrado.

### Listar Contatos de um Usuário [GET /users/{id}/contacts]

- Lista os contatos de um usuário.
- Parâmetros:
  - `id` (number) - ID do usuário.
- Respostas:
  - 200 - Lista de contatos.
  - 404 - Nenhum contato encontrado.

### Atualizar um Usuário [PUT /users/{id}]

- Atualiza um usuário existente.
- Parâmetros:
  - `email` (string) - Email do usuário.
  - `phone` (string) - Número de telefone do usuário.
- Respostas:
  - 200 - Usuário atualizado com sucesso.
  - 400 - Requisição inválida.