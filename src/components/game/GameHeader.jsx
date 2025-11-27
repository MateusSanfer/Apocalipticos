// GameHeader.jsx
import React from "react"; // Adicione esta linha
import { GAME_MODES } from "../../constants/constants";

export const GameHeader = ({ codigo, modo, currentPlayer, isCurrentPlayer, jogadores }) => {
  const getModeLabel = (m) => {
    switch(m) {
      case GAME_MODES.NORMAL: return "Normal";
      case GAME_MODES.ADULTO: return "+18";
      case GAME_MODES.DIFICIL: return "Difícil";
      default: return m;
    }
  };

  const getModeColor = (m) => {
    switch(m) {
      case GAME_MODES.NORMAL: return "bg-blue-500";
      case GAME_MODES.ADULTO: return "bg-red-500";
      case GAME_MODES.DIFICIL: return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  const nomeJogadorAtual = jogadores?.find(j => j.uid === currentPlayer)?.nome || "Desconhecido";

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-4 shadow-md">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white">Sala: {codigo}</h2>
          <div className={`inline-block px-2 py-1 rounded text-xs font-bold mt-1 ${getModeColor(modo)} text-white`}>
            {getModeLabel(modo)}
          </div>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-sm">Vez de:</p>
          <p className={`font-bold ${isCurrentPlayer ? "text-green-400" : "text-white"}`}>
            {isCurrentPlayer ? "VOCÊ" : nomeJogadorAtual}
          </p>
        </div>
      </header>
    </div>
  );
};