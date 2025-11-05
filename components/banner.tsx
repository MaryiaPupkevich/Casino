"use client";
import React from "react";

export default function Banner({
  offers,
}: {
  offers: { bonuses: { welcome_bonus: string } }[];
}) {
  const bonusText = offers?.[0]?.bonuses?.welcome_bonus;

  return (
    <section className="banner">
      <div className="container banner-content">
        <h1>{bonusText}</h1>
        <button className="claim-btn">Claim Bonus</button>
      </div>
    </section>
  );
}
