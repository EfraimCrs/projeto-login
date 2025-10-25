Sistema de Login Desacoplado (API RESTful + JS Vanilla)
Este é um projeto de estudo focado em criar um sistema de autenticação de login completo, utilizando uma arquitetura desacoplada. O objetivo foi praticar os fundamentos da comunicação cliente-servidor, autenticação segura com JWT e uma estrutura de API RESTful profissional (MVC/Service).

🖼️ Screenshot
Aqui está uma prévia da tela de login:

(Dica: Adicione uma das screenshots que você me enviou aqui! Suba o arquivo image_ff2b0b.png para o seu repositório e mude o caminho abaixo)

✨ Features (Funcionalidades)
Arquitetura Desacoplada: Frontend (cliente) e Backend (servidor) são projetos completamente separados.

API RESTful: Backend construído em Node.js e Express, seguindo os padrões REST.

Autenticação JWT: Geração de JSON Web Token no login para autenticação segura.

Rotas Protegidas: Uso de Middleware no backend para proteger rotas que exigem autenticação.

Criptografia de Senhas: As senhas dos usuários são "hasheadas" com bcrypt.js antes de serem salvas no banco.

Banco de Dados SQLite: Um banco de dados leve e baseado em arquivo, ideal para desenvolvimento e pequenos projetos.

Frontend Interativo: Feedback visual para o usuário (loading, mensagens de erro e sucesso) usando JavaScript puro (Vanilla JS).

Variáveis de Ambiente: Uso de .env para gerenciar chaves secretas e configurações de ambiente (DEBUG, PORT).

💻 Tech Stack (Tecnologias Usadas)
Backend (Servidor),Frontend (Cliente)
Node.js,HTML5
Express,CSS3 (com Variáveis CSS)
SQLite3,JavaScript (ES6+)
jsonwebtoken (JWT),Bootstrap 5
bcrypt.js,Axios (para chamadas de API)
cors,Live-Server (dev)
dotenv,
nodemon (dev),

🚀 Como ExecutarPara rodar este projeto localmente, você precisará do Node.js (v16 ou superior) e do npm instalados.1. Backend (Servidor)Primeiro, clone o repositório e inicie o servidor:Bash# Clone este repositório
git clone 

# Navegue até a pasta do backend
cd seu-repositorio/backend

# Instale as dependências
npm install

# Crie um arquivo .env na raiz do /backend
# e adicione o conteúdo abaixo:
backend/.envSnippet de código# Porta do servidor
PORT=3001

# Modo de debug (true ou false)
DEBUG=true

# Chave secreta para o JWT (mude para algo seguro)
JWT_SECRET=minha-senha-super-secreta-mude-depois
Bash# Inicie o servidor em modo de desenvolvimento
npm run dev

# O backend estará rodando em http://localhost:3001
2. Frontend (Cliente)Em um novo terminal, inicie o cliente:Bash# Navegue até a pasta do frontend (a partir da raiz do projeto)
cd seu-repositorio/frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento (live-server)
npm run dev

# O seu navegador será aberto automaticamente em http://localhost:5500
Credenciais de TestePara testar o login, você pode primeiro registrar um usuário usando uma ferramenta de API (como Insomnia ou Postman) ou usar o usuário de teste criado na 
Fase 3 do nosso estudo:Email: teste@email.comSenha: 123📖 Endpoints da API (Backend)MétodoEndpointProtegida?DescriçãoPOST/api/registerNãoRegistra um novo usuário.POST/api/loginNãoAutentica 
um usuário e retorna um JWT.GET/api/healthNãoVerifica se a API está no ar.GET/api/profileSimRetorna os dados do usuário (requer Bearer Token).
