# Racnegê Collection Management
This project aims to develop an integrated system to efficiently organize and preserve the academic and cultural materials of the Racnegê Group. With a focus on diversity and inclusion, Racnegê seeks to maximize the impact of its research and activities, but faces challenges due to the lack of a functional solution to centralize and facilitate access to its content.
The main objective of this project is to transform Racnegê’s collection into an accessible, organized, and well-managed resource. Through the implementation of an innovative system, it will be possible to optimize collection management, ensuring greater cultural preservation, academic strengthening, and the expansion of inclusive dialogue with the public.

# Controle de Acervo Racnegê
Este projeto visa desenvolver um sistema integrado que organize e preserve de forma eficiente os materiais acadêmicos e culturais do Grupo Racnegê. Com foco na diversidade e inclusão, o Racnegê busca maximizar o impacto de suas pesquisas e atividades, mas enfrenta desafios devido à falta de uma solução funcional que centralize e facilite o acesso aos seus conteúdos.
O objetivo principal deste projeto é transformar o acervo do Racnegê em um recurso acessível, organizado e bem gerido. Por meio da implementação de um sistema inovador, será possível otimizar a gestão do acervo, garantindo maior preservação cultural, fortalecimento acadêmico e a ampliação do diálogo inclusivo com o público.

# Backend
## Instalação
### Requisitos
- [PostgreSQL](https://www.postgresql.org/)
- [NodeJS (versão 18.20.4)](https://nodejs.org/pt)
- [Mailgun](https://www.mailgun.com/)
### 1. Clonar o repositório e trocar de diretório.
```sh
git clone https://github.com/mmarques-ssz/tcc_racnege.git
cd .\Acervo\backend\
```
### 2. Instalar as dependências do projeto.
```sh
npm install
```

### 3. Criar o .env com as variáveis de ambiente.
```sh
# URL do seu banco de dados.
DATABASE_URL="postgresql://[nome do usuário]:[senha]@localhost:[porta]/[nome do banco]?schema=public"
# Token do JWT (min 32 caracteres).
FJWT_SECRET="abcdefghijklmnopqrstuvwxyz0123456789"
# Token dos cookies (min 32 caracteres).
COOKIES_SECRET="abcdefghijklmnopqrstuvwxyz0123456789"
# Chave da API do Mailgun (serviços de email).
EMAIL_API_KEY="email-api-key"
# Nome do domínio configurado no Mailgun (serviços de email).
EMAIL_DOMAIN="email-domain-name"
# Porta que o servidor vai utilizar.
PORT=8080
# Host que o servidor vai utilizar.
HOST="0.0.0.0"
```
Você pode gerar tokens em https://it-tools.tech/token-generator?length=32.

### 4. Configurar o banco de dados com o Prisma.
```sh
npx prisma migrate dev
npx prisma generate
```

### 5. Iniciar o servidor.
```sh
npm run dev
```

## API
Documentação do Swagger disponível em **[/docs](http://localhost:8080/swagger)**

## Observação da cópia pública

A cópia pública contém o código-fonte e os arquivos de configuração de exemplo. Documentos acadêmicos em formato binário e imagens carregadas pelo acervo não foram transferidos automaticamente pela integração; eles continuam disponíveis no repositório privado de origem. Revise direitos de uso antes de adicioná-los aqui.
