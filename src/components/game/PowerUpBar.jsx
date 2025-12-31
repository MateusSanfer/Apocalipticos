import React from 'react';
import PropTypes from 'prop-types'; // Boa prática: Validação de tipos em Runtime
import { Shield, RefreshCw, Zap } from 'lucide-react';

/**
 * Componente PowerUpBar
 * ---------------------
 * Responsável por exibir e gerenciar a interação com os poderes especiais do jogador.
 * 
 * Este é um componente "Presentational" (Apresentação), ou seja:
 * 1. Não gerencia estado interno complexo.
 * 2. Recebe dados via 'props'.
 * 3. Comunica ações para o componente pai via callbacks (onUse).
 * 
 * @param {Object} props
 * @param {Object} props.powerups - Objeto contendo a quantidade de cada power-up (ex: { shield: 1, swap: 0 ... })
 * @param {Function} props.onUse - Função de callback chamada quando um power-up é ativado. Recebe o 'type' como argumento.
 * @param {boolean} props.disabled - Flag global para desativar interações (ex: durante votações ou animações).
 */
export default function PowerUpBar({ powerups, onUse, disabled }) {
  // Se não houver dados de powerups (ex: carregando ou erro), não renderiza nada para evitar quebras.
  // Pattern: "Guard Clause" ou "Short-circuit evaluation"
  if (!powerups) return null;

  return (
    <div className="flex justify-center gap-4 mt-2 mb-4">
      
      {/* 
        Botão ESCUDO (Shield)
        ---------------------
        Lógica de Renderização Condicional de Classes (Tailwind):
        - Se tem saldo (> 0) E não está travado (!disabled):
          - Exibe cor Azul vibrante, Sombra e Efeito de Hover.
        - Caso contrário:
          - Exibe Cinza opaco e cursor de bloqueio.
      */}
      <div className="relative group">
        <button
            onClick={() => onUse('shield')}
            disabled={disabled || powerups.shield <= 0}
            className={`p-3 rounded-full border-2 transition-all relative ${
                powerups.shield > 0 && !disabled
                ? 'bg-blue-900/40 border-blue-500 text-blue-400 hover:bg-blue-800 hover:scale-105 shadow-[0_0_10px_rgba(59,130,246,0.5)]' 
                : 'bg-gray-800/50 border-gray-700 text-gray-600 cursor-not-allowed opacity-50'
            }`}
             aria-label="Ativar Escudo" // Acessibilidade: Leitores de tela saberão o que é
            title="Escudo: Pular vez sem beber"
        >
            <Shield size={24} />
            
            {/* Badge de Contagem */}
            <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs font-bold w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center">
                {powerups.shield}
            </span>
        </button>
        
        {/* Tooltip Customizado (Aparece no Hover via CSS 'group-hover') */}
        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2 py-1 rounded whitespace-nowrap z-50 pointer-events-none">
            Escudo (Pular)
        </span>
      </div>

      {/* REVENGE (Vingança) */}
      <div className="relative group">
        <button
            onClick={() => onUse('revenge')}
            disabled={disabled || powerups.revenge <= 0}
            className={`p-3 rounded-full border-2 transition-all relative ${
                powerups.revenge > 0 && !disabled
                ? 'bg-red-900/40 border-red-500 text-red-500 hover:bg-red-800 hover:scale-105 shadow-[0_0_10px_rgba(239,68,68,0.5)]' 
                : 'bg-gray-800/50 border-gray-700 text-gray-600 cursor-not-allowed opacity-50'
            }`}
            aria-label="Ativar Vingança"
            title="Vingança: Escolher alguém para beber"
        >
            <Zap size={24} />
            <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs font-bold w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center">
                {powerups.revenge}
            </span>
        </button>
        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-red-300 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2 py-1 rounded whitespace-nowrap z-50 pointer-events-none">
            Vingança (Atacar)
        </span>
      </div>

      {/* SWAP (Troca) */}
      <div className="relative group">
        <button
            onClick={() => onUse('swap')}
            disabled={disabled || powerups.swap <= 0}
            className={`p-3 rounded-full border-2 transition-all relative ${
                powerups.swap > 0 && !disabled
                ? 'bg-green-900/40 border-green-500 text-green-400 hover:bg-green-800 hover:scale-105 shadow-[0_0_10px_rgba(34,197,94,0.5)]' 
                : 'bg-gray-800/50 border-gray-700 text-gray-600 cursor-not-allowed opacity-50'
            }`}
             aria-label="Ativar Troca"
             title="Troca: Mudar carta"
        >
            <RefreshCw size={24} />
             <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs font-bold w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center">
                {powerups.swap}
            </span>
        </button>
        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-green-300 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2 py-1 rounded whitespace-nowrap z-50 pointer-events-none">
            Troca (Resortear)
        </span>
      </div>
    </div>
  );
}

// Boa Prática: Definir PropTypes para validação (alternativa ao TypeScript)
PowerUpBar.propTypes = {
    powerups: PropTypes.shape({
        shield: PropTypes.number,
        revenge: PropTypes.number,
        swap: PropTypes.number
    }),
    onUse: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};
