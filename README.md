# BackEnd Carteira Digital com Categorias e Gestão de Usuários

##### Descrição
Projeto criado para a avaliação de conhecimento técnico da TecnoSpeed para a vaga de Node.js (mas também ligada a front).

**Deploy do BackEnd feito na Heroku, e acessível no link abaixo:**

**Link:** [Acessar API Backend](https://tecnospeeddigitalwallet.herokuapp.com/)

**Deploy do FrontEnd feito no Netlify, e acessível no link abaixo:**

**Link:** [Acessar FrontEnd](https://frontend-digital-wallet.netlify.app/)


Credênciais de acesso:

**Admin:**
Email: admin@email.com
Senha: senha123

**Usuário:**
Email: user@email.com
Senha: senha123

------------

## Setup Inicial do Projeto: Dentro da pasta do projeto (após clonar o repositório)

**Instale as Dependencias do projeto:**
###### `yarn install`

**Crie as configurações do ambiente (preencher apropriadamente as variáveis no .env de acordo com as configurações locais):**
###### `cp .env_example .env`

**Rode as migrations para preparar o Banco de Dados:**
###### `yarn typeorm migration:run`

**Conete-se ao banco e crie o primeiro administrador:**
###### `INSERT INTO public.admins (avatar,name,email,"password") VALUES ('464bd0970bc3ee960572-admin.jpeg','Primeiro Administrador','admin@email.com','$2a$08$lFeq6mTq9Z.3MMF0ybYwBu1LkyRZfJovCwoUN14GMLRN0BK6KluJS');` Query para criar o primeiro administrador **Email: admin@email.com || Senha: senha123**

**Levante o servidor de Desenvolvimento: (Após esse comando o backend já estará funcionando, mas caso queira o ambiente de produção os passos estarão abaixo**
###### `yarn dev:server`

**Para levantar o ambiente de produção é necessário reconfigurar TYPEORM_ENTITIES e TYPEORM_MIGRATIONS no .env de "src" para "dist" e a extensão dos arquivos de ".ts" para ".js"**

**Faça o Build da Aplicação:**
###### `yarn build`

**Levante o servidor de Produção:**
###### `yarn start`


---------

### Pontos Relevantes do Backend:
- Autenticação com JWT token;
- Modelagem da pasta **Models**;
- Arquivos de Configuração de Token e Upload de arquivos na pasta **Config**;
- Rotas na pasta **Routes**;
- Usada a estrutura de Services para Organização, e os serviços desenvolvidos estão na pasta **Services**;
- Tem Services criados que não estão sendo utilizados pois limitei algumas funcionalides no front pois não era essensiais e não estavam devidamente testadas;

### Funcionalidades Integradas ao Front:
 - **Cadastro de Usuários** com upload de Avatar; 
 - **Moderação de Usuários** pelo Administrador (Cadastro de Administrador apenas pela API ou diretamente pelo banco **Query para criação de admin no "Setup Inicial do Projeto"** ); [Ver Tela](https://github.com/gspalmeida/frontend_digital_wallet_tecnospeed/blob/main/screenshots/HomeAdmin.png?raw=true)
 - Login de Usuários e Administradores pela mesma tela;
 - **Criação de Categorias** para as movimentações financeiras da carteira; [Ver Tela](https://github.com/gspalmeida/frontend_digital_wallet_tecnospeed/blob/main/screenshots/Cria%C3%A7%C3%A3oDeCategorias.png?raw=true)
 - Modal para **Edição de Categorias**;[Ver Tela](https://github.com/gspalmeida/frontend_digital_wallet_tecnospeed/blob/main/screenshots/ModalEdi%C3%A7%C3%A3oCategorias.png?raw=true)
 - **Criação de Movimentações Financeiras** da Carteira;  [Ver Tela](https://github.com/gspalmeida/frontend_digital_wallet_tecnospeed/blob/main/screenshots/Cria%C3%A7%C3%A3oDeMovimenta%C3%A7%C3%B5esFinanceiras.png?raw=true)
 - Criação Rápida de Categorias através da tela de Movimentações Financeiras (**Input com pesquisa e criação de novas categorias**); [Ver Tela](https://github.com/gspalmeida/frontend_digital_wallet_tecnospeed/blob/main/screenshots/Adi%C3%A7%C3%A3oRapida%20de%20Categorias.png?raw=true)
 - Exibição do **Saldo da Carteira**;
 - **Filtro por data** das Movimentações Financeiras;
 - **Exportação dos dados para CSV**: A respeito dessa funcionalidade, fiz ela por ultimo e correndo pois o prazo estava acabando, fiquei bem insatisfeito como como está essa parte do código (mas talvez eu consiga arrumar isso antes de vcs verem hehe)



