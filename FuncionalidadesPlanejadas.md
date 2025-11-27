# Visão Geral
Apocalípticos é um jogo de desafios e interações em grupo, onde os jogadores enfrentam cartas com perguntas, desafios e situações absurdas em um ambiente temático pós-apocalíptico. O jogo pode ser jogado online ou presencialmente, com diferentes níveis de dificuldade e categorias para adaptar-se ao público.

## 📱 Tela Inicial (Home)
### Design e Funcionalidades
- ✅ Logotipo "Apocalípticos" (estilo neon/grunge).
- ✅ Botões Principais: "Criar Sala", "Entrar na Sala".

### Fluxo de Criação de Sala (Modal)
- ✅ Nome do Administrador (obrigatório).
- ✅ Data de Nascimento (para verificação de idade).
- ✅ Nome da Sala (opcional).
- ✅ Nível do Jogo (Fácil, Normal, +18, Difícil).
- ✅ Validação de Idade (Bloqueio para menores em modos +18).
- ✅ Geração de código único (ex: ZUMBI).

### Fluxo de Entrar na Sala (Modal)
- ✅ Nome do Jogador.
- ✅ Data de Nascimento.
- ✅ Chave de Acesso.
- ✅ Validação de Idade para sala +18.

## 🛋️ Lobby (Sala de Espera)
### Funcionalidades
- ✅ Lista de Jogadores Conectados (com avatares).
- ⏳ Chat Simples (opcional).
- ✅ Botão "Iniciar Jogo" (apenas ADM).
- ✅ Contagem de Jogadores.

## 🎮 Tela de Jogo
### Fluxo Principal
- ✅ **Sorteio do Jogador da Vez**: Exibe nome e avatar.
- ✅ **Sorteio da Carta**: Baseado no modo e categorias.
- ✅ **Resolução da Carta**: 
    - ✅ Timer de 30s.
    - ✅ Botões "Cumprir" e "Recusar" (penalidade).
    - ✅ Primeiro - O Usuario administrador deve confirmar se o usuario da vez compriu o desafio, isso vale para ele também caso seja sua vez. 
    - ✅ Segundo - Deve ser contabilizado os pontos de ter comprido o desafio ou responder a pergunta. Caso contrario paga a penalidade e perde pontos.
    - ✅ Terceiro - Ao final do tempo, e o jogador da vez não tiver feito nenhuma ação, automaticamente sua vez é passada para outro e ele penalizado ou bebe.
    - ✅ Oservação: caso a pontuação seja 0, e ele perder pontos, não deve ter um valor negativo, continua com a pontuação zerada.
- **Atualização do Placar**: Pontuação e estatísticas. (🔄 Em Desenvolvimento)
- **Ranking em Tempo Real**: Lista ordenada. (🔄 Em Desenvolvimento)

### Tipos de Jogos e Lógicas 
| Tipo de Jogo | Fluxo | Status |
| :--- | :--- | :--- |
| **Verdade ou Desafio** | 1. ADM escolhe "Verdade" ou "Desafio". <br> 2. Sistema sorteia carta da categoria. | 🔄 Parcial (Botões prontos, lógica de escolha pendente) |
| **Decisões de Merda** | 1. Situação absurda + castigo. <br> 2. Apenas jogador da vez executa. | ✅ Implementado (Cartas genéricas) |
| **Amigos de Merda** | 1. Pergunta exibida. <br> 2. Todos votam. <br> 3. Mais votado bebe. | 🔄 Pendente (Sistema de votação) |
| **Eu Nunca** | 1. Afirmação exibida. <br> 2. Quem já fez, bebe. | ✅ Implementado (Ação simples) |


# Sugestões de Melhorias para o Apocalípticos

Aqui estão algumas ideias para elevar o nível do seu projeto, focando em engajamento e polimento visual.

## 1. Experiência do Usuário (UX) e Visual
- **Animações de Cartas**: Use `Framer Motion` para fazer a carta "virar" (flip effect) ao ser sorteada, ou deslizar da tela. Isso dá uma sensação tátil muito boa.
- **Feedback Visual de Dano/Cura**: Quando alguém perde pontos, a tela poderia piscar levemente em vermelho (vignette). Quando ganha, em verde ou dourado.
- **Temas Dinâmicos**: O fundo da tela poderia mudar sutilmente dependendo do modo de jogo (ex: mais sombrio no modo "Difícil", mais neon no "+18").

## 2. Mecânicas de Jogo
- **Poderes Especiais (Power-ups)**:
    - *Escudo*: O jogador pode pular uma vez sem penalidade.
    - *Vingança*: Se beber, pode escolher alguém para beber junto.
    - *Troca*: Trocar de carta uma vez por jogo.
- **Rodadas Especiais**: A cada 5 rodadas, uma "Rodada do Caos" onde todos jogam ou as regras mudam (ex: vale o dobro de pontos).
- **Fim de Jogo Épico**: Uma tela de pódio mostrando não só o vencedor, mas estatísticas engraçadas como "O Maior Bêbado" (quem mais recusou), "O Covarde" (quem mais pulou), etc.

## 3. Engajamento Social
- **Compartilhamento**: Botão para gerar uma imagem do resultado final para postar no Instagram/WhatsApp.
- **Reações Rápidas**: Permitir que os outros jogadores mandem emojis (🔥, 🍻, 😱) que flutuam na tela durante a vez do outro.

## 4. Técnico
- **Cloud Functions**: Mover a lógica crítica (sorteio, pontuação, passar vez) para o backend (Firebase Functions) para evitar que usuários mal-intencionados manipulem o jogo pelo console do navegador.
- **Presença Online**: Melhorar o sistema de "Online/Offline" para remover jogadores que fecharam a aba mais rapidamente.

## 🔜 Próximos Passos
- ⏳ Implementar lógica de votação para "Amigos de Merda".
- ⏳ Refinar fluxo de "Verdade ou Desafio" (escolha prévia).
- ⏳ Adicionar efeitos sonoros e animações avançadas.
- ⏳ Tela de Fim de Jogo.


