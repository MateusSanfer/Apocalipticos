import { useMemo } from "react";

export function useSounds() {
  // useMemo garante que os objetos Audio não sejam recriados a cada render
  const sons = useMemo(() => ({
    remover: new Audio("/sounds/vai-carnica.mp3"),
    marcarPronto: new Audio("/sounds/tem-certeza.mp3"),
    desmarcarPronto: new Audio("/sounds/huh-desmarcar.mp3"),
    erro: new Audio("/sounds/erro.mp3"),
    entrar: new Audio("/sounds/entrar.mp3"),
    sair: new Audio("/sounds/sair.mp3"),
  }), []);

  const play = (tipo) => {
    const som = sons[tipo];
    if (som) {
      som.currentTime = 0; // reseta se estiver no meio
      som.play().catch((err) => {
        console.warn(`Erro ao reproduzir som '${tipo}':`, err);
      });
    }
  };

  return {
    playMarcarPronto: () => play("marcarPronto"),
    playDesmarcarPronto: () => play("desmarcarPronto"),
    playRemover: () => play("remover"),
    playErro: () => play("erro"),
    playEntrar: () => play("entrar"),
    playSair: () => play("sair"),
  };
}
