# Controle de Acervo Racnegê

Sistema web para organizar, consultar e administrar um acervo acadêmico e cultural. O projeto reúne uma interface React, uma API em Node.js com TypeScript e Fastify e persistência PostgreSQL com Prisma.

## Arquitetura

- **Frontend:** React, React Router, Axios e AG Grid.
- **Backend:** Node.js, TypeScript, Fastify, Zod e Swagger.
- **Dados:** PostgreSQL e Prisma Migrate.
- **Sessão:** autenticação com JWT e cookies; o frontend envia o access token no cabeçalho `Authorization`.
- **Administração:** AdminJS integrado ao backend.

## Funcionalidades

- Cadastro e consulta de livros e exemplares.
- Categorias e imagens de capa.
- Empréstimos, devoluções e lista de espera.
- Área de livros do usuário.
- Gestão de usuários e ações administrativas.
- Relatórios e documentação da API em Swagger.
- Envio de e-mails para fluxos da aplicação via Mailgun.

## Estrutura

- `Acervo/backend/`: API, regras de negócio, Prisma e migrações.
- `Acervo/frontend/`: aplicação React.
- `docs/`: documentação acadêmica e funcional do projeto.

## Configuração do backend

Requisitos: Node.js 18.20.4 ou superior, PostgreSQL e, caso os fluxos de e-mail sejam usados, uma conta Mailgun.

```sh
cd Acervo/backend
npm install
cp .env.example .env
npx prisma migrate dev
npx prisma generate
npm run dev
```

O backend usa a porta definida por `PORT` (8080 no exemplo). A documentação Swagger fica em `/swagger`.

## Configuração do frontend

```sh
cd Acervo/frontend
npm install
cp .env.example .env
npm start
```

A variável `REACT_APP_API_URL` deve apontar para a URL base da API, por exemplo `http://127.0.0.1:8081/api`. O valor é de desenvolvimento local; em produção, use a URL HTTPS da API.

## Segurança

- Não versione `.env`, senhas, chaves do Mailgun, tokens ou dumps do banco.
- O frontend não registra o access token no console.
- O access token fica no armazenamento do navegador nesta versão; uma evolução possível é adotar cookies HttpOnly e proteção CSRF.
- Antes de tornar o repositório público, revise a documentação em `docs/` e as imagens do acervo para confirmar que podem ser redistribuídas.

## Histórico

Projeto acadêmico e funcional desenvolvido para o Controle de Acervo Racnegê. O código e a documentação devem ser revisados conforme as regras de autoria, uso de marcas, imagens e publicação aplicáveis ao grupo.

## Licença

Nenhuma licença de distribuição foi declarada. Defina uma licença antes de aceitar contribuições externas ou reutilização do código.

## Observação da cópia pública

A cópia pública contém o código-fonte e os arquivos de configuração de exemplo. Documentos acadêmicos em formato binário e imagens carregadas pelo acervo não foram transferidos automaticamente pela integração; eles continuam disponíveis no repositório privado de origem. Revise direitos de uso antes de adicioná-los aqui.
