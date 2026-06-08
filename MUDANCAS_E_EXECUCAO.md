# Documentacao Completa das Alteracoes do Projeto

## 1. Objetivo desta documentacao

Este documento registra todas as alteracoes aplicadas no projeto de adocao de animais, explica a arquitetura final (frontend + backend + banco), descreve o funcionamento do codigo e mostra o passo a passo para execucao local.

---

## 2. Resumo executivo

O projeto saiu de um frontend estatico e foi transformado em uma aplicacao full stack com:

- Frontend consumindo dados reais da API
- Backend Node.js com Express
- Persistencia em MySQL (XAMPP) via Prisma ORM
- Regras de negocio de adocao no backend
- Conteudo da home, depoimentos e links sociais vindo do banco

---

## 3. Principais alteracoes realizadas

### 3.1 Reorganizacao de estrutura

Estrutura antiga: arquivos HTML e assets na raiz.

Estrutura final:

- frontend/: paginas e assets visuais
- backend/: API, Prisma, configuracoes e scripts

Isso separa responsabilidades e facilita manutencao.

### 3.2 Criacao do backend

Foi criado backend com:

- Express para API REST
- Prisma Client para acesso ao MySQL
- Servidor unico entregando API e frontend estatico

### 3.3 Isolamento da API em pasta dedicada

As rotas foram isoladas em backend/src/api:

- api/index.js: agregador de rotas
- api/animals.js: leitura de animais
- api/adoptions.js: leitura/criacao de adocoes
- api/site.js: conteudo dinamico da home
- api/helpers.js: utilitarios de mapeamento

### 3.4 Banco de dados e ORM

Foi modelado schema Prisma com:

- Animal
- AdoptionRequest
- SiteContent
- SocialLink
- Testimonial

Enums:

- AnimalStatus (DISPONIVEL, EM_PROCESSO, ADOTADO)
- SocialLocation (HOME, FOOTER)

### 3.5 Seed de dados

O seed agora popula:

- animais
- conteudo textual da home
- links sociais
- depoimentos

### 3.6 Frontend dinamico (sem hardcode de dados)

A pagina inicial e a pagina unica de adocao foram ajustadas para consumir API:

- Home: titulos, descricoes, botoes, depoimentos e redes sociais vindos de /api/site
- Animais: cards renderizados via /api/animais
- Pagina de detalhe unica: adocao.html?slug=... preenchida via /api/animais/:slug
- Botao de adocao reflete estado real do backend

### 3.9 Consolidacao das paginas HTML de adocao

As paginas duplicadas de adocao foram removidas.

Fluxo final:

- um unico HTML de detalhe: frontend/adocao.html
- cada card monta o link com slug (ex.: adocao.html?slug=mia)
- o frontend carrega os dados dinamicamente pela API

Arquivos removidos por obsolescencia:

- frontend/adocao_mia.html
- frontend/adocao_fred.html
- frontend/adocao_simba.html

### 3.7 Regras de negocio de adocao

Ao solicitar adocao:

1. valida slug
2. valida existencia do animal
3. valida se status e DISPONIVEL
4. cria solicitacao de adocao
5. altera status do animal para EM_PROCESSO

### 3.8 Correcoes de frontend

Foram corrigidos:

- botoes sem funcionalidade
- links vazios
- inconsistencias de alinhamento
- comportamento do botao Ver mais/Ver menos
- padronizacao visual sem alterar paleta

---

## 4. Arquitetura final

## 4.1 Backend

- backend/src/server.js
- backend/src/api/index.js
- backend/src/api/animals.js
- backend/src/api/adoptions.js
- backend/src/api/site.js
- backend/src/api/helpers.js
- backend/prisma/schema.prisma
- backend/prisma/seed.js

## 4.2 Frontend

- frontend/index.html
- frontend/adocao.html
- frontend/src/styles/api.js
- frontend/src/styles/script.js
- CSS da interface em frontend/src/styles/*.css

---

## 5. Explicacao do codigo (por modulo)

## 5.1 server.js

Responsabilidades:

- carregar variaveis de ambiente
- criar instancias Express e PrismaClient
- montar middleware JSON
- montar roteador /api
- servir frontend estatico

## 5.2 api/index.js

Responsavel por compor a API:

- GET /api/health
- /api/site
- /api/animais
- /api/adocoes

Recebe prisma por parametro para injetar dependencias nas rotas filhas.

## 5.3 api/animals.js

- GET /api/animais: lista animais ordenados
- GET /api/animais/:slug: detalhe de um animal

Usa helper mapAnimal para padronizar payload.

## 5.4 api/adoptions.js

- GET /api/adocoes: lista solicitacoes
- POST /api/adocoes: cria solicitacao e atualiza status para EM_PROCESSO

Regra principal do negocio de adocao esta neste arquivo.

## 5.5 api/site.js

Centraliza conteudo dinamico do frontend:

- home (titulo, descricao, CTA, telefone)
- secao pets (titulo/subtitulo)
- secao depoimentos (titulo/subtitulo/itens)
- footer (copyright)
- links sociais (home e footer)

## 5.6 frontend/src/styles/api.js

Orquestra comunicacao frontend-backend:

- loadSiteContent() -> /api/site
- loadAnimalsList() -> /api/animais
- loadAnimalDetails() -> /api/animais/:slug
- POST /api/adocoes ao clicar em Adotar
- renderizacao por status (DISPONIVEL/EM_PROCESSO/ADOTADO)

## 5.7 frontend/src/styles/script.js

Interacoes de UI:

- menu mobile
- destaque de secao ativa no scroll
- favoritos visuais (coracao)
- animacoes de entrada (ScrollReveal)

---

## 6. Endpoints da API

- GET /api/health
- GET /api/site
- GET /api/animais
- GET /api/animais/:slug
- GET /api/adocoes
- POST /api/adocoes

Body de POST /api/adocoes:

{
  "animalSlug": "simba",
  "observacao": "opcional"
}

---

## 7. Como rodar o projeto (passo a passo)

## 7.1 Pre-requisitos

- Node.js instalado
- XAMPP com MySQL ativo
- Banco MySQL acessivel em localhost:3306

## 7.2 Configuracao de ambiente

No backend, criar/ajustar .env:

DATABASE_URL="mysql://root:@localhost:3306/adocao_animais"
PORT=3000

## 7.3 Instalar dependencias

Na raiz do projeto:

npm --prefix backend install

## 7.4 Aplicar banco e seed

npx --prefix backend prisma db push
npm --prefix backend run prisma:seed

Para recriar o banco do zero sem gerar migration nova:

npx --prefix backend prisma db push --force-reset
npm --prefix backend run prisma:seed

## 7.5 Subir aplicacao

npm --prefix backend run dev

## 7.6 Acessar

- Aplicacao: http://localhost:3000
- API health: http://localhost:3000/api/health

---

## 8. Troubleshooting

## 8.1 Exit code 1 ao subir backend

Possiveis causas:

1. PORT ausente no .env
2. Porta ja em uso
3. Erro de conexao com banco

Acoes:

- confirme PORT=3000 no backend/.env
- altere temporariamente porta (ex.: PORT=3001)
- confirme MySQL ativo no XAMPP

## 8.2 Erro P1001 Prisma (nao conecta no banco)

- Inicie MySQL no XAMPP
- Verifique DATABASE_URL
- Confira usuario/senha/porta

## 8.3 Erro EADDRINUSE

Significa que a porta ja esta ocupada.

- encerre processo que usa a porta
- ou troque a porta no .env

## 8.4 Erro EPERM no Prisma em Windows

Pode ocorrer lock temporario de arquivo da engine.

- normalmente migrate aplica mesmo assim
- tente fechar processos Node/VS Code que estejam usando prisma client
- rode novamente prisma generate se necessario

---

## 9. Fluxo funcional principal (adoção)

1. Frontend carrega animais via GET /api/animais
2. Usuario entra na pagina de detalhe
3. Frontend carrega detalhes via GET /api/animais/:slug
4. Botao de adocao e habilitado apenas se status for DISPONIVEL
5. Clique em Adotar envia POST /api/adocoes
6. Backend cria solicitacao e muda status para EM_PROCESSO
7. Frontend atualiza visual para refletir indisponibilidade

---

## 10. Estado atual do projeto

- Frontend orientado a API para dados de dominio e conteudo principal
- Backend isolado por modulos de API
- Banco com modelos para animais, adocoes e conteudo da interface
- Seed pronto para subir ambiente rapidamente

---

## 11. Proximas melhorias sugeridas

1. Endpoint administrativo para alterar status para ADOTADO
2. Painel admin para editar conteudo de SiteContent, SocialLink e Testimonial
3. Validacoes de input mais robustas (ex.: Zod/Joi)
4. Logs estruturados e monitoramento
5. Testes automatizados (API + frontend)
