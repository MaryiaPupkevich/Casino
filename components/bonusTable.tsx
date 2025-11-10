"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {  type Offer, OFFERS_IMAGE_BASE } from "@/app/lib/api";

type BonusTableProps = {
  offers: Offer[];
};

function shuffleOffers(list: Offer[]): Offer[] {
  const arr = [...list]; 
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function BonusTable({ offers }: BonusTableProps) {

  const [visibleOffers, setVisibleOffers] = useState<Offer[]>([]);

  const [openId, setOpenId] = useState<number | string | null>(null);


  useEffect(() => {
    setVisibleOffers(offers.slice(0, 6));
  }, [offers]);

  const handleToggleInfo = (id: number | string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

 
const handleRefresh = () => {
  const valid = offers.filter(
    (o) => o.bonuses?.rate && o.bonuses?.free_spins
  );

  const base = valid.length >= 6 ? valid : offers; 
  const shuffled = shuffleOffers(base);

  setVisibleOffers(shuffled.slice(0, 6));
  setOpenId(null); 
};

  if (!offers.length) return null; 

  return (
    <section className="bonus-section">
      <h2 className="bonus-section__title">BONUS DETAILS</h2>
      <div className="bonus-table">
        <div className="bonus-table__header">
          <div className="bonus-col bonus-col--casino">Casino</div>
          <div className="bonus-col">Bonuses</div>
          <div className="bonus-col">Rate</div>
          <div className="bonus-col">Free Spins</div>
          <div className="bonus-col bonus-col--info">More info</div>
          <div className="bonus-col bonus-col--get">Get</div>
        </div>

        {visibleOffers.map((offer) => {
          const logoUrl = offer.logo
            ? `${OFFERS_IMAGE_BASE}${offer.logo}`
            : "/fallback-logo.png";

          const welcomeText = offer.bonuses?.welcome_bonus || "—";

          const rateText = offer.bonuses?.rate || "—";
          const freeSpinsText = offer.bonuses?.free_spins
            ? `${offer.bonuses.free_spins} FS`
            : "—";

          const maxAmount = offer.bonuses?.amount || "—";
          const wager = offer.wager || "—";
          const bonusCode = offer.bonus_code || "—";

          const isOpen = openId === offer.id;

          return (
            <div key={offer.id} className="bonus-row">
              <div className="bonus-row__main">
                <div className="bonus-col bonus-col--casino">
                  <img
                    src={logoUrl}
                    alt={offer.name ?? "Casino"}
                    className="bonus-casino-logo"
                  />
                  
                </div>

                <div className="bonus-col">{welcomeText}</div>
                <div className="bonus-col">{rateText}</div>
                <div className="bonus-col">{freeSpinsText}</div>

                <div className="bonus-col bonus-col--info">
                  <button
                    type="button"
                    className="bonus-info-btn"
                    onClick={() => handleToggleInfo(offer.id)}
                  >
                    i
                  </button>
                </div>

                <div className="bonus-col bonus-col--get">
                  <Link
                    href={`/casino/${offer.id}`}
                    className="bonus-get-btn-desktop"
                  >
                    Get the bonus
                  </Link>
                </div>
              </div>

              {isOpen && (
                <div className="bonus-row__details">
                  <div className="bonus-detail">
                    <span className="bonus-detail__label">
                      Maximum amount:
                    </span>
                    <span className="bonus-detail__value">{maxAmount}</span>
                  </div>
                  <div className="bonus-detail">
                    <span className="bonus-detail__label">Wager:</span>
                    <span className="bonus-detail__value">{wager}</span>
                  </div>
                  <div className="bonus-detail">
                    <span className="bonus-detail__label">Bonus Code:</span>
                    <span className="bonus-detail__value">{bonusCode}</span>
                  </div>
                  <Link href={`casino/${offer.id}`} className="bonus-get-btn-mobile">
                  Get the bonus
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button className="bonus-refresh-btn" onClick={handleRefresh}>
        Refresh
      </button>
    </section>
  );
}
