import React, { useState } from "react";
import "./FirstUse.css";

const slides = [
  {
    title: "Bienvenido a la app 🎉",
    description: "Esta aplicación te ayudará a gestionar todo de forma fácil y rápida.",
    emoji: "👋",
  },
  {
    title: "Explora las funciones 🔎",
    description: "Navega entre las distintas pantallas para sacarle el máximo provecho.",
    emoji: "🧭",
  },
  {
    title: "Personaliza tu perfil 🛠️",
    description: "Configura tus datos y preferencias para una mejor experiencia.",
    emoji: "⚙️",
  },
  {
    title: "¡Listo para comenzar! 🚀",
    description: "Pulsa el botón para entrar y disfrutar la app.",
    emoji: "🎯",
  },
];

export default function FirstUse({ onFinish }) {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      onFinish();
    }
  };

  const prevSlide = () => {
    if (current > 0) setCurrent(current - 1);
  };

  return (
    <div className="firstuse-container">
      <div className="slide">
        <div className="emoji">{slides[current].emoji}</div>
        <h2 className="title">{slides[current].title}</h2>
        <p className="description">{slides[current].description}</p>
      </div>

      <div className="controls">
        <button
          className="btn prev"
          onClick={prevSlide}
          disabled={current === 0}
          aria-label="Anterior"
        >
          ←
        </button>

        <div className="dots">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${current === idx ? "active" : ""}`}
              onClick={() => setCurrent(idx)}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        <button className="btn next" onClick={nextSlide} aria-label="Siguiente">
          {current === slides.length - 1 ? "¡Comenzar!" : "→"}
        </button>
      </div>
    </div>
  );
}
