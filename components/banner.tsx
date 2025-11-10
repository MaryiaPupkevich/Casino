"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface BannerProps {
  offers: { bonuses: { welcome_bonus: string } }[];
  firstId?: string | number;            
}

export default function Banner({ offers, firstId}: BannerProps){
   const router = useRouter();

   const bonusText =
    offers?.[0]?.bonuses?.welcome_bonus ??
    "EXCLUSIVE WELCOME OFFER OF 2’000 AUD AND 275 FREE SPINS";
      const BtnClick = () => {
    if (!firstId) return;               
    router.push(`/casino/${firstId}`); 
  };

  return (
    <section className="banner">
      <div className="container banner-content">
        <h1>{bonusText}</h1>
        <button className="claim-btn" onClick={BtnClick}>Claim Bonus</button>
      </div>
    </section>
  );
}
