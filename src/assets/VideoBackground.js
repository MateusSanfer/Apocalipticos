import React from 'react';


// ...existing code...
// Remova esta linha:
// import videoSource from './public/Apocalipticos.mp4'; // Importe seu arquivo de vídeo

const VideoBackground = () => {
  return (
    <div className="video-background-container">
      <video autoPlay loop muted className="video-element">
        <source src="/Apocalipticos.mp4" type="video/mp4" />
        Seu navegador não suporta a tag de vídeo.
      </video>
      <div className="content-overlay">
        {/* Conteúdo que ficará por cima do vídeo, como um texto ou outros componentes */}
        <h1>Seu Conteúdo Aqui</h1>
        <p>Este texto está sobre o vídeo de fundo.</p>
      </div>
    </div>
  );
};
// ...existing code...

export default VideoBackground;
