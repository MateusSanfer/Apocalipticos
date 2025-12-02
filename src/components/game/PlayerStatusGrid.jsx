import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PlayerStatusGrid({ jogadores, acoes }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
      {jogadores.map((jogador) => {
        const acao = acoes[jogador.uid];
        const isEuJa = acao?.action === "EU_JA";
        const isEuNunca = acao?.action === "EU_NUNCA";

        return (
          <div
            key={jogador.uid}
            className={`relative bg-gray-800/50 rounded-xl p-4 flex flex-col items-center border-2 transition-colors ${
              isEuJa
                ? "border-yellow-500 bg-yellow-900/20"
                : isEuNunca
                ? "border-green-500 bg-green-900/20"
                : "border-gray-700"
            }`}
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-2xl overflow-hidden ring-2 ring-gray-600 mb-2">
                {jogador.avatar.startsWith("http") ? (
                  <img
                    src={jogador.avatar}
                    alt={jogador.nome}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="leading-none">{jogador.avatar}</span>
                )}
              </div>
              
              <AnimatePresence>
                {isEuJa && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-2 -right-2 bg-yellow-500 text-white p-1 rounded-full shadow-lg"
                  >
                    🍺
                  </motion.div>
                )}
                {isEuNunca && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-2 -right-2 bg-green-500 text-white p-1 rounded-full shadow-lg"
                  >
                    😇
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <span className="font-bold text-white text-sm text-center truncate w-full">
              {jogador.nome}
            </span>

            <div className="h-6 mt-1">
              <AnimatePresence mode="wait">
                {isEuJa && (
                  <motion.span
                    key="ja"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    className="text-yellow-400 font-bold text-xs uppercase tracking-wider"
                  >
                    BEBEU!
                  </motion.span>
                )}
                {isEuNunca && (
                  <motion.span
                    key="nunca"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    className="text-green-400 font-bold text-xs uppercase tracking-wider"
                  >
                    SALVO
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}
