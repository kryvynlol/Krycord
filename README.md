# Vyracord Web — publicação online

## Publicar usando GitHub + Render

1. Entre em https://github.com e crie um repositório chamado `vyracord`.
2. Deixe o repositório como **Public** (ou use um repositório privado se preferir).
3. Clique em **Add file → Upload files**.
4. Extraia este ZIP no computador e envie os arquivos que estão dentro da pasta `discord_web_novo` (não envie o ZIP fechado).
5. Clique em **Commit changes**.
6. Entre em https://render.com e crie uma conta ou entre com GitHub.
7. No painel do Render, escolha **New → Web Service** e conecte o repositório `vyracord`.
8. O Render deve reconhecer o `render.yaml`. Se pedir os comandos, use:
   - Build Command: `npm install`
   - Start Command: `npm start`
9. Clique em **Deploy Web Service**. Ao terminar, o Render mostrará um endereço `https://...onrender.com`.

## Testar localmente (opcional)
Instale Node.js LTS, abra o terminal nesta pasta e rode `npm install` e depois `npm start`. Acesse http://localhost:3000.

## Recursos incluídos
- Canais de texto e mensagens em tempo real.
- Entrar/sair da sala de voz.
- Microfone, câmera e compartilhamento de tela.
- Tela cheia.
- Lista de participantes e nome de perfil.

## Limitações importantes da versão inicial
- O plano gratuito do Render pode suspender o serviço após inatividade; o primeiro acesso depois disso pode demorar.
- Esta versão ainda não possui cadastro/login real, banco de dados, histórico persistente, criação de servidores/canais pelo usuário ou moderação.
- Para chamadas confiáveis entre redes diferentes, pode ser necessário configurar um servidor TURN. O STUN público incluído não garante conexão em todas as redes.
- Para uso público, mantenha HTTPS (o Render fornece HTTPS no endereço publicado).
- Não coloque senhas, tokens ou chaves privadas no repositório.
