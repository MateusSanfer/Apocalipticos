import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarSala } from "../firebase/rooms";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { GAME_MODES } from "../constants/constants";
import {
  parseBirthDate,
  calculateAge,
  validateMinimumAge,
} from "../utils/ageUtils";
import MainButton from "../components/buttons/MainButton";
import CreateRoomModal from "../components/modals/CreateRoomModal";
import JoinRoomModal from "../components/modals/JoinRoomModal";
import AgeVerificationModal from "../components/modals/AgeVerificationModal";
import { useAuth } from "../context/AuthContext";
import { useSounds } from "../hooks/useSounds";
import { Zap, Flame, Skull } from "lucide-react";

export default function Home() {
  const { currentUser, logout, loading } = useAuth();
  const [modals, setModals] = useState({
    create: false,
    join: false,
    ageRestricted: false,
  });
  const [ageError, setAgeError] = useState(null);
  const navigate = useNavigate();
  const { playComecar } = useSounds();

  const handleCreateRoom = async (roomData) => {
    try {
      if (!currentUser) {
        alert("Você precisa estar logado para criar uma sala");
        return;
      }

      if ([GAME_MODES.ADULTO, GAME_MODES.DIFICIL].includes(roomData.modo)) {
        if (!validateMinimumAge(roomData.dataNascimento, 18)) {
          setAgeError(`Modo ${roomData.modo} requer 18+ anos`);
          setModals({ ...modals, ageRestricted: true });
          return;
        }
      }

      const codigo = await criarSala(currentUser.uid, {
        ...roomData,
        categorias: roomData.categorias || [],
        criador: currentUser.displayName || currentUser.email,
      });
      playComecar();
      navigate(`/lobby/${codigo}`);
    } catch (err) {
      console.error("Erro ao criar sala:", err);
      alert("Falha ao criar sala. Tente novamente.");
    }
  };

  const handleJoinRoom = async (joinData) => {
    try {
      if (!currentUser) {
        alert("Você precisa estar logado para entrar em uma sala");
        return;
      }

      const salaRef = doc(db, "salas", joinData.chave);
      const salaSnap = await getDoc(salaRef);

      if (salaSnap.exists()) {
        const sala = salaSnap.data();

        if ([GAME_MODES.ADULTO, GAME_MODES.DIFICIL].includes(sala.modo)) {
          if (!validateMinimumAge(joinData.dataNascimento, 18)) {
            setAgeError("Esta sala é restrita para maiores de 18 anos");
            setModals({ ...modals, ageRestricted: true });
            return;
          }
        }

        playComecar();
        const nascimentoDate = parseBirthDate(joinData.dataNascimento);
        const nascimentoFormatado = nascimentoDate
          .toISOString()
          .split("T")[0];

        const jogador = {
          nome: joinData.nome,
          avatar: joinData.avatar || "👤",
          idade: calculateAge(nascimentoFormatado),
          uid: currentUser.uid,
          email: currentUser.email,
          timestamp: serverTimestamp(),
        };

        await setDoc(
          doc(db, "salas", joinData.chave, "jogadores", currentUser.uid),
          jogador
        );
        localStorage.setItem("playerData", JSON.stringify(jogador));
        navigate(`/lobby/${joinData.chave}`);
      } else {
        alert("Sala não encontrada!");
      }
    } catch (err) {
      console.error("Erro ao entrar na sala:", err);
      alert("Sala não encontrada ou código inválido.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white flex flex-col items-center justify-center px-4"
      style={{ backgroundImage: "url('/bg-apocalipticos.jpg')" }}
    >
      {/* LOGO E TÍTULO */}
      <header className="text-center mb-8">
        <img
          src="/logo-apocalipticos.svg"
          alt="Logo Apocalípticos"
          className="mx-auto mb-4 max-w-[250px]"
        />
        <h1 className="text-4xl font-bold tracking-wider">Apocalípticos 🧟</h1>
        <p className="text-gray-300 mt-2">
          Sobreviva aos desafios mais absurdos com seus amigos
        </p>
      </header>

      {/* BOTÕES */}
      {currentUser ? (
        <>
          <div className="flex gap-4 mb-10">
            <button
              onClick={() => setModals({ ...modals, create: true })}
              className="bg-orange-600 hover:bg-orange-500 px-6 py-2 rounded-xl font-semibold text-lg flex items-center gap-2 shadow-md transform transition-all duration-200 ease-in-out motion-safe:transform-gpu hover:-translate-y-1 hover:scale-102 hover:shadow-lg"
            >
              🔥 Criar Sala
            </button>

            <button
              onClick={() => setModals({ ...modals, join: true })}
              className="bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded-xl font-semibold text-lg flex items-center gap-2 shadow-md transform transition-all duration-200 ease-in-out motion-safe:transform-gpu hover:-translate-y-1 hover:scale-102 hover:shadow-lg"
            >
              👥 Entrar na Sala
            </button>
          </div>
        </>
      ) : (
        <div className="bg-black/50 p-6 rounded-lg text-center">
          <h2 className="text-2xl mb-2 font-semibold">
            Faça login para jogar
          </h2>
          <p className="text-gray-300">
            Você precisa estar logado para criar ou entrar em salas
          </p>
        </div>
      )}

      {/* CARDS DE INFORMAÇÃO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-4xl w-full px-4">
        <div className="bg-black/40 backdrop-blur-md p-6 rounded-xl text-center border border-orange-500/20 transform transition-all duration-300 ease-in-out motion-safe:transform-gpu hover:-translate-y-1 hover:scale-104 hover:shadow-lg">
          <Zap className="mx-auto text-orange-400 w-8 h-8 mb-2" />
          <h3 className="font-semibold text-xl">Multijogador</h3>
          <p className="text-gray-300 text-sm">Jogue com amigos em tempo real</p>
        </div>

        <div className="bg-black/40 backdrop-blur-md p-6 rounded-xl text-center border border-orange-500/20 transform transition-all duration-300 ease-in-out motion-safe:transform-gpu hover:-translate-y-1 hover:scale-104 hover:shadow-lg">
          <Flame className="mx-auto text-orange-400 w-8 h-8 mb-2" />
          <h3 className="font-semibold text-xl">3 Modos</h3>
          <p className="text-gray-300 text-sm">Normal, +18 e Difícil</p>
        </div>

        <div className="bg-black/40 backdrop-blur-md p-6 rounded-xl text-center border border-orange-500/20 transform transition-all duration-300 ease-in-out motion-safe:transform-gpu hover:-translate-y-1 hover:scale-104 hover:shadow-lg">
          <Skull className="mx-auto text-orange-400 w-8 h-8 mb-2" />
          <h3 className="font-semibold text-xl">Jogo de bebida</h3>
          <p className="text-gray-300 text-sm">Desafios e punições épicas</p>
        </div>
      </div>

      {/* MODAIS */}
      <CreateRoomModal
        isOpen={modals.create}
        onClose={() => setModals({ ...modals, create: false })}
        onCreate={handleCreateRoom}
      />
      <JoinRoomModal
        isOpen={modals.join}
        onClose={() => setModals({ ...modals, join: false })}
        onJoin={handleJoinRoom}
      />
      <AgeVerificationModal
        isOpen={modals.ageRestricted}
        onClose={() => setModals({ ...modals, ageRestricted: false })}
        message={ageError}
      />
    </div>
  );
}
