import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./FirstUse.css";

const suits = [
  { suit: "♦", color: "#D32F2F" },
  { suit: "♥", color: "#D32F2F" },
  { suit: "♠", color: "#212121" },
  { suit: "♣", color: "#212121" },
];

const values = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateCards = (count) => {
  const cardWidthPercent = 8;
  const cardHeightPercent = 12;
  const positions = [];

  const isOverlapping = (x1, y1, x2, y2) => {
    return positions.some(([px1, py1, px2, py2]) => {
      return !(x2 <= px1 || x1 >= px2 || y2 <= py1 || y1 >= py2);
    });
  };

  for (let i = 0; i < count; i++) {
    let attempts = 0;
    let top, left;
    let x1, y1, x2, y2;

    do {
      top = Math.floor(Math.random() * (100 - cardHeightPercent));
      left = Math.floor(Math.random() * (100 - cardWidthPercent));
      x1 = left;
      y1 = top;
      x2 = left + cardWidthPercent;
      y2 = top + cardHeightPercent;
      attempts++;
    } while (isOverlapping(x1, y1, x2, y2) && attempts < 1000);

    positions.push([x1, y1, x2, y2]);
  }

  return positions.map(([x1, y1]) => {
    const value = values[getRandomInt(0, values.length - 1)];
    const suitObj = suits[getRandomInt(0, suits.length - 1)];
    return {
      value,
      suit: suitObj.suit,
      color: suitObj.color,
      top: `${y1}%`,
      left: `${x1}%`,
      width: 72,
      height: 104,
      animationDelay: Math.random() * 6,
      opacity: 0.5 + Math.random() * 0.5,
      rotateInit: Math.random() * 40 - 20,
    };
  });
};

const FirstUse = () => {
  const [showButton, setShowButton] = useState(false);
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCards(generateCards(40));
    const timer = setTimeout(() => setShowButton(true), 4500);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    navigate("/casino");
  };

  return (
    <div className="firstuse-container">
      <div className="cards-background">
        {cards.map(
          (
            {
              value,
              suit,
              color,
              top,
              left,
              width,
              height,
              animationDelay,
              opacity,
              rotateInit,
            },
            index
          ) => (
            <motion.div
              key={index}
              className="card-bg"
              style={{
                top,
                left,
                width,
                height,
                color,
                opacity,
                rotate: rotateInit,
                boxShadow: `0 0 8px ${color}`,
                borderColor: color,
              }}
              initial={{ rotate: rotateInit, y: 0 }}
              animate={{
                rotate: [
                  rotateInit,
                  rotateInit + 10,
                  rotateInit - 10,
                  rotateInit,
                ],
                y: [0, -8, 8, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 6 + animationDelay,
                delay: animationDelay,
                ease: "easeInOut",
              }}
            >
              <div className="card-content">
                <div className="card-value top-left">{value}</div>
                <div className="card-suit">{suit}</div>
                <div className="card-value bottom-right">{value}</div>
              </div>
            </motion.div>
          )
        )}
      </div>

      <div className="firstuse-content">
        <motion.h1
          className="casino-title"
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to Colonial Casino
        </motion.h1>

        <motion.p
          className="casino-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
        >
          Enjoy a luxurious online experience where you can play slots, table
          games, and bet like a high roller. Earn rewards, challenge friends,
          and climb the leaderboard.
        </motion.p>

        {showButton && (
          <motion.button
            className="enter-button"
            whileHover={{
              scale: 1.1,
              backgroundColor: "#3a0a0a",
              boxShadow: "0 0 15px #3a0a0a",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEnter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            🎟️ Enter the Casino
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default FirstUse;
