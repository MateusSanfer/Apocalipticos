# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

## [Não Lançado] - 2025-11-27

### Adicionado
- **Confirmação do Admin**: O Host da sala agora precisa confirmar se o jogador cumpriu o desafio antes de os pontos serem atribuídos.
- **Sistema de Pontuação**:
    - Sucesso (Confirmado pelo Admin): +10 pontos.
    - Falha/Recusa: -5 pontos.
    - Pontuação mínima fixada em 0 (não fica negativa).
- **Penalidade por Tempo**: Se o tempo (30s) esgotar sem ação, o jogador recebe penalidade (-5 pontos) e a vez passa automaticamente.
- **Feedback Visual**: Toast notifications para ganho/perda de pontos.

### Corrigido
- **Display do Jogador Atual**: Corrigido bug onde o UID era exibido no lugar do nome do jogador no cabeçalho.
- **Mensagem de Espera**: A mensagem "Aguardando carta..." agora mostra explicitamente o nome do jogador que deve jogar.
- **AuthContext**: Corrigido erro onde `user` era `undefined` no `Jogo.jsx`, impedindo o reconhecimento do jogador atual.
- **React Warnings**:
    - Removido prop `timeLeft` inválida de elemento DOM.
    - Corrigido `ReferenceError: React is not defined` em alguns componentes.
    - **Inicialização de Sala**: Corrigido bug onde novos jogos não sorteavam o primeiro jogador, travando o início.
    - **Ranking**: Corrigido bug onde a pontuação aparecia como 0 (erro de nome de propriedade `pontuacao` vs `pontos`).
    - **Contador de Bebidas**: Agora incrementa corretamente quando o jogador recusa ou recebe penalidade.
    - **Fluxo de Recusa**: Adicionada etapa de confirmação do Admin quando um jogador decide "Recusar" (beber).
