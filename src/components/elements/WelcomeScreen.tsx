"use client";
import React from "react";
import { EncryptedText } from "../ui/encrypted-text";

export const WelcomeScreen = () => {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black">
      {/* Rimosso il font-mono e il colore azzurro per tornare all'originale */}
      <div className="text-1xl md:text-2xl text-white">
  
        <EncryptedText 
          text="Welcome to my portfolio" 
        />
      </div>
    </div>
  );
};