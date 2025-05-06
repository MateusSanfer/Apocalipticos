import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateRoomModal from "../components/CreateRoomModal";
import JoinRoomModal from "../components/JoinRoomModal";
import { criarSala } from "../firebase/rooms";

export default function Home({ uid }) {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  const handleCreateRoom = async (roomData) => {
    if (!uid) return;
    const codigo = await criarSala(uid, roomData);
    navigate(`/lobby/${codigo}`);
  };
  const handleJoinRoomModal = ({ nome, nascimento, chave }) => {
    // Exemplo: salvar no localStorage
    localStorage.setItem("playerName", nome);
    localStorage.setItem("birthDate", nascimento);
    navigate(`/lobby/${chave}`);
  };
  

  if (!uid) {
    return <div className="text-white text-center mt-20">Carregando...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center text-black">
      <h1 className="text-4xl font-bold text-lime-400 mb-10 flex items-center gap-2">
        <span role="img" aria-label="skull">💀</span> Apocalípticos!
      </h1>

      <button
        onClick={() => setShowCreateModal(true)}
        className="bg-lime-500 text-black font-bold px-6 py-3 rounded-xl mb-6 hover:scale-105 transition"
      >
        Criar Sala
      </button>

      <button
        onClick={() => setShowJoinModal(true)}
        className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl hover:scale-105 transition"
      >
        Entrar na Sala
      </button>

      <CreateRoomModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateRoom}
      />

<JoinRoomModal
  isOpen={showJoinModal}
  onClose={() => setShowJoinModal(false)}
  onJoin={handleJoinRoomModal}
/>
    </div>
  );
}
