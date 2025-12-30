import React from "react";
import { motion } from "framer-motion";
import { Trophy, Beer, ShieldAlert, BadgeCheck } from "lucide-react";

export default function Podium({ jogadores, onBackToLobby, onRestart }) {
  // 1. Ordenar por pontos (Vencedores)
  const ranking = [...jogadores].sort((a, b) => (b.pontos || 0) - (a.pontos || 0));
  
  // 2. Calcular Estatísticas para Prêmios
  const getWinner = (statKey) => {
    let maxVal = -1;
    let winners = [];
    jogadores.forEach(j => {
      const val = j.stats?.[statKey] || 0;
      if (val > maxVal && val > 0) {
        maxVal = val;
        winners = [j];
      } else if (val === maxVal && val > 0) {
        winners.push(j);
      }
    });
    return winners;
  };

  const cachaceiros = getWinner('bebidas'); // Quem mais bebeu
  const arregoes = getWinner('recusou');    // Quem mais recusou (arregou)
  const santos = getWinner('euNunca');      // Quem mais disse "Eu Nunca" (opcional, ou quem fez tudo)

  // Top 3
  const top3 = ranking.slice(0, 3);
  const others = ranking.slice(3);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center animate-fade-in relative overflow-hidden">
      {/* Background Particles/Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent animate-spin-slow"></div>
      </div>

      <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-8 z-10 drop-shadow-lg text-center">
        FIM DE JOGO!
      </h1>

      {/* PODIUM AREA */}
      <div className="flex flex-col md:flex-row items-end justify-center gap-4 mb-12 w-full max-w-4xl z-10 px-4 mt-8 md:mt-16">
        {/* 2nd Place */}
        {top3[1] && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center order-2 md:order-1"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-gray-400 overflow-hidden shadow-lg mb-2 relative">
                {top3[1].avatar?.startsWith("http") ? (
                    <img src={top3[1].avatar} alt={top3[1].nome} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center text-2xl">{top3[1].avatar}</div>
                )}
                <div className="absolute -bottom-1 -right-1 bg-gray-400 text-gray-900 font-bold w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center border-2 border-white">2</div>
            </div>
            <span className="font-bold text-gray-300 md:text-xl">{top3[1].nome}</span>
            <span className="text-sm text-gray-400">{top3[1].pontos || 0} pts</span>
          </motion.div>
        )}

        {/* 1st Place (Winner) */}
        {top3[0] && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: 50 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="flex flex-col items-center order-1 md:order-2 mb-8 md:mb-0 relative"
          >
            <div className="absolute -top-12 md:-top-16 text-yellow-400 animate-bounce">
                <Trophy size={48} className="md:w-16 md:h-16" />
            </div>
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-yellow-400 overflow-hidden shadow-[0_0_30px_rgba(250,204,21,0.5)] mb-2 relative z-10 bg-gray-800">
                {top3[0].avatar?.startsWith("http") ? (
                    <img src={top3[0].avatar} alt={top3[0].nome} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center text-4xl">{top3[0].avatar}</div>
                )}
                 <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 font-bold w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-4 border-white text-xl">1</div>
            </div>
            <span className="font-black text-2xl md:text-4xl text-yellow-400 drop-shadow-md">{top3[0].nome}</span>
            <span className="text-lg md:text-2xl text-yellow-200 font-bold">{top3[0].pontos || 0} pts</span>
            <span className="text-xs md:text-sm text-yellow-500/80 uppercase tracking-widest mt-1">O Apocalíptico</span>
          </motion.div>
        )}

        {/* 3rd Place */}
        {top3[2] && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.7 }}
            className="flex flex-col items-center order-3 md:order-3"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-orange-700 overflow-hidden shadow-lg mb-2 relative">
                {top3[2].avatar?.startsWith("http") ? (
                    <img src={top3[2].avatar} alt={top3[2].nome} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center text-2xl">{top3[2].avatar}</div>
                )}
                <div className="absolute -bottom-1 -right-1 bg-orange-700 text-orange-100 font-bold w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center border-2 border-white">3</div>
            </div>
            <span className="font-bold text-orange-300 md:text-xl">{top3[2].nome}</span>
            <span className="text-sm text-orange-400/80">{top3[2].pontos || 0} pts</span>
          </motion.div>
        )}
      </div>

      {/* AWARDS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl z-10 px-4">
        
        {/* Cachaceiro */}
        {cachaceiros.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}
            className="bg-gray-800/80 backdrop-blur border border-purple-500/30 p-4 rounded-xl flex items-center gap-4 shadow-lg"
          >
            <div className="p-3 bg-purple-900/50 rounded-lg">
                <Beer className="text-purple-400 w-8 h-8" />
            </div>
            <div>
                <h3 className="font-bold text-purple-300 uppercase text-sm">O Cachaceiro 🍺</h3>
                <p className="font-black text-xl text-white">
                  {cachaceiros.map(c => c.nome).join(", ")}
                </p>
                <p className="text-xs text-gray-400">Bebeu {cachaceiros[0].stats?.bebidas || 0} vezes</p>
            </div>
          </motion.div>
        )}

        {/* Arregão */}
        {arregoes.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}
              className="bg-gray-800/80 backdrop-blur border border-red-500/30 p-4 rounded-xl flex items-center gap-4 shadow-lg"
            >
              <div className="p-3 bg-red-900/50 rounded-lg">
                  <ShieldAlert className="text-red-400 w-8 h-8" />
              </div>
              <div>
                  <h3 className="font-bold text-red-300 uppercase text-sm">O Arregão 💩</h3>
                  <p className="font-black text-xl text-white">
                    {arregoes.map(c => c.nome).join(", ")}
                  </p>
                  <p className="text-xs text-gray-400">Recusou {arregoes[0].stats?.recusou || 0} desafios</p>
              </div>
            </motion.div>
        )}
      </div>

      {/* OTHER PLAYERS LIST */}
      {others.length > 0 && (
        <div className="w-full max-w-2xl mt-8 z-10 px-4">
            <h3 className="text-center font-bold text-gray-500 mb-4 uppercase tracking-widest text-xs">Menções Honrosas</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {others.map((p, idx) => (
                    <div key={p.uid} className="bg-gray-800/50 p-2 rounded flex items-center gap-2">
                        <span className="font-bold text-gray-500 text-sm">#{idx + 4}</span>
                        <span className="truncate text-sm font-medium">{p.nome}</span>
                        <span className="ml-auto text-xs text-gray-400">{p.pontos || 0} pts</span>
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* FOOTER ACTIONS */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 }}
        className="mt-12 z-10 flex flex-col md:flex-row gap-4"
      >
        <button 
            onClick={onRestart}
            className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-yellow-900 font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(234,179,8,0.4)] flex items-center gap-2"
        >
            <Trophy size={20} />
            NOVO JOGO
            <span className="text-xs font-normal opacity-70 ml-1">(Reiniciar)</span>
        </button>

        <button 
            onClick={onBackToLobby}
            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full hover:scale-105 active:scale-95 transition-all border border-white/20 flex items-center gap-2"
        >
            <BadgeCheck size={20} />
            VOLTAR AO LOBBY
            <span className="text-xs font-normal opacity-70 ml-1">(Zerar Tudo)</span>
        </button>
      </motion.div>

    </div>
  );
}
