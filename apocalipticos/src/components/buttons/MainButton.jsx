import React from 'react'; // Adicione esta linha

export default function MainButton({ children, onClick, theme, className }) {
  return (
    <button 
      onClick={onClick}
      className={`${className} px-4 py-2 rounded transition-colors ${
        theme === 'primary' ? 'bg-blue-600 hover:bg-blue-700' : 
        theme === 'secondary' ? 'bg-gray-600 hover:bg-gray-700' :
        'bg-gray-500 hover:bg-gray-600'
      }`}
    >
      {children}
    </button>
  );
}