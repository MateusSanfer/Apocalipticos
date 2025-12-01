import React from "react";
import ActionButton from "../buttons/ActionButton";

export default function ConfirmModal({ mensagem, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 px-4">
      <div className="bg-gray-900 p-6 rounded-lg text-center max-w-sm w-full">
        <p className="mb-4 text-white">{mensagem}</p>
        <div className="flex justify-center gap-4">
          <div className="w-32">
            <ActionButton onClick={onConfirm} theme="danger">
              Sim
            </ActionButton>
          </div>
          <div className="w-32">
            <ActionButton onClick={onCancel} theme="secondary">
              Cancelar
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
}
