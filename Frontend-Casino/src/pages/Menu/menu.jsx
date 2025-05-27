import React from 'react';
import './menu.css';  // Asegúrate que este archivo tenga el CSS actualizado

const CasinoHero = () => {
  return (
    <section className="casino-hero">
      <div className="casino-hero-content">
        <h1>Welcome to <span className="highlight"> Colonial Casino </span></h1>
        <p>Where luck and excitement never stop. Play, win, and enjoy!</p>
        <button className="play-button">¡Play Now!</button>
      </div>
      <div className="casino-cards">
        <div className="card spade">♠</div>
        <div className="card heart">♥</div>
        <div className="card diamond">♦</div>
        <div className="card club">♣</div>
      </div>
    </section>
  );
};

export default CasinoHero;



