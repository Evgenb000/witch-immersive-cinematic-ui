"use client";

import React, { useState, useEffect } from "react";
import { SpinnerLoading } from "../spinnerLoading";
import { Fireflies } from "./fireflies";

interface HeroProps {
  loading: boolean;
  setEntrance: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Hero: React.FC<HeroProps> = ({ loading, setEntrance }) => {
  const [showButton, setShowButton] = useState(false);
  const [entering, setEntering] = useState(false);
  const [zoomDone, setZoomDone] = useState(false);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setShowButton(true), 500);
      return () => clearTimeout(timer);
    }
  }, [loading]);
  const handleEnter = () => {
    setEntering(true);
    setTimeout(() => {
      setZoomDone(true);
      setEntrance(true);
    }, 500);
  };

  return (
    <section
      className={`relative w-full h-screen flex flex-col justify-center items-center overflow-hidden transition-transform ${
        zoomDone ? "hidden" : ""
      }`}
    >
      <div
        className={`absolute inset-0 bg-[url('@/public/door.png')] bg-cover bg-center transition-transform duration-1500 ${
          entering ? "scale-150" : "scale-100"
        }`}
      ></div>

      <Fireflies />

      {loading && <SpinnerLoading size={60} color="text-purple-400" />}

      {!loading && showButton && !entering && (
        <button
          onClick={handleEnter}
          className="mt-8 px-8 py-4 bg-purple-700 hover:bg-purple-600 text-white font-bold rounded-lg shadow-lg transition-all duration-500 opacity-0 animate-fadeIn cursor-pointer z-30"
        >
          Войти в дом
        </button>
      )}

      <h1 className="relative text-4xl md:text-6xl font-black text-white drop-shadow-lg text-center z-30">
        Добро пожаловать в дом ведьмы
      </h1>
    </section>
  );
};
