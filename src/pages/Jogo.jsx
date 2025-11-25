import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import {
  doc,
  onSnapshot,
  updateDoc,
  increment,
  serverTimestamp,
  collection,
} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { sortearCarta } from "../firebase/game";
import { GameHeader } from "../components/game/GameHeader";
import CardDisplay from "../components/game/CardDisplay";
import PlayerActions from "../components/game/PlayerActions";
import Timer from "../components/game/Timer";
import RankingJogadores from "../components/ranking/RankingJogadores";
import { atualizarPontuacao } from "../firebase/jogadores";
import PageLayout from "../components/PageLayout";

export default function Jogo() {
  const { codigo } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [sala, setSala] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [actionTaken, setActionTaken] = useState(false);
  const [jogadores, setJogadores] = useState([]);
  const [meuUid, setMeuUid] = useState(null);
  const [showRanking, setShowRanking] = useState(false);
   const somarPonto = () => {
    if (!meuUid) {
      console.warn("UID do jogador não encontrado");
      return;
    }
    atualizarPontuacao(codigo, meuUid, 10); // +10 pontos
  };
  // Monitorar estado do jogo
  useEffect(() => {
    const salaRef = doc(db, "salas", codigo);
    const unsubscribe = onSnapshot(salaRef, (docSnap) => {
      if (!docSnap.exists()) {
        navigate("/");
        return;
      }

      const data = docSnap.data();
      setSala(data);
      setCurrentPlayer(data.jogadorAtual);

      if (data.estado === "finalizado") {
        navigate(`/resultado/${codigo}`);
      }
    });

    return unsubscribe;
  }, [codigo, navigate]);

  // Temporizador da rodada
  useEffect(() => {
    if (!sala?.cartaAtual || actionTaken) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          handlePenalidade(); // ao chegar em 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [sala, actionTaken]);

  const isCurrentPlayer = currentPlayer && currentPlayer === user?.uid;
  const showActions = isCurrentPlayer && sala?.cartaAtual && !actionTaken;

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("playerData"));
    setMeuUid(localData?.uid);

    const unsubscribe = onSnapshot(
      collection(db, "salas", codigo, "jogadores"),
      (snapshot) => {
        const lista = snapshot.docs.map((doc) => ({
          ...doc.data(),
          uid: doc.id,
        }));

        // Ordenar por pontuação decrescente
        lista.sort((a, b) => (b.pontuacao || 0) - (a.pontuacao || 0));

        setJogadores(lista);
      }
    );

    return () => unsubscribe();
  }, [codigo]);

  const handleSortearCarta = async () => {
    if (!isCurrentPlayer || !sala) return;

    try {
      const carta = await sortearCarta(sala.modo, sala.categorias);
      await updateDoc(doc(db, "salas", codigo), {
        cartaAtual: carta,
        jogadorAtual: user.uid,
        timeLeft: 30,
      });
      setTimeLeft(30);
      setActionTaken(false);
    } catch (error) {
      console.error("Erro ao sortear carta:", error);
    }
  };

  const handleComplete = async () => {
    await updatePlayerStats("completou");
    setActionTaken(true);
  };

  const handlePenalidade = async () => {
    await updatePlayerStats("recusou");
    setActionTaken(true);
  };

  const updatePlayerStats = async (action) => {
    if (!user) return;
    try {
      const playerRef = doc(db, "salas", codigo, "jogadores", user.uid);
      await updateDoc(playerRef, {
        [`stats.${action}`]: increment(1),
        ultimaAcao: serverTimestamp(),
      });
    } catch (error) {
      console.error("Erro ao atualizar stats do jogador:", error);
    }
  };

  if (!sala) {
    return <div className="text-white text-center p-8">Carregando jogo...</div>;
  }

  return (
     <PageLayout>
    <div className="min-h-screen text-white p-4 flex justify-center">
      <div className="w-full max-w-2xl mx-auto relative">
        
        {/* ÁREA DO JOGO */}
        <div className="w-full">
          <GameHeader
            codigo={codigo}
            modo={sala.modo}
            currentPlayer={currentPlayer}
            isCurrentPlayer={isCurrentPlayer}
          />

          {sala.cartaAtual ? (
            <>
              <CardDisplay carta={sala.cartaAtual} timeLeft={timeLeft} />

              {showActions && (
                <PlayerActions
                  onComplete={handleComplete}
                  onPenalidade={handlePenalidade}
                  cardType={sala.cartaAtual.tipo}
                />
              )}

              <Timer timeLeft={timeLeft} totalTime={30} />
            </>
          ) : (
            <div className="text-center py-12">
              {isCurrentPlayer ? (
                <button
                  onClick={handleSortearCarta}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-lg font-bold"
                >
                  Sortear Carta
                </button>
              ) : (
                <p>Aguardando carta...</p>
              )}
            </div>
          )}
        </div>

        {/* RANKING DESKTOP (SIDEBAR FIXA) - VISÍVEL APENAS >= 1340px */}
        <div className="hidden min-[1340px]:block fixed top-2 right-2 w-[250px] 2xl:w-[320px] transition-all duration-300">
          <h1 className="text-xl font-bold mb-2 text-center text-purple-300 drop-shadow-md !p-[3%]">Ranking</h1>
          <RankingJogadores jogadores={jogadores} meuUid={meuUid} />
          
          {/* Botão de teste */}
          <div className="text-center mt-4">
            <button
              onClick={somarPonto}
              className="px-4 py-2 bg-green-600/80 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              +10 Pontos (Teste)
            </button>
          </div>
        </div>

      </div>

      {/* BOTÃO FLUTUANTE RANKING MOBILE (VISÍVEL APENAS < 1340px) */}
      <button 
        onClick={() => setShowRanking(!showRanking)}
        className="min-[1340px]:hidden fixed bottom-4 right-4 z-50 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </button>

      {/* RANKING MOBILE MODAL */}
      {showRanking && (
        <div className="min-[1340px]:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm relative">
            <button 
              onClick={() => setShowRanking(false)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 z-50 shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-xl font-bold mb-4 text-center text-white">Ranking</h2>
            <RankingJogadores jogadores={jogadores} meuUid={meuUid} />
          </div>
        </div>
      )}
    </div>
    </PageLayout>
  );
}
