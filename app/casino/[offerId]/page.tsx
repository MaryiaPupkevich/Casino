"use client";

import { use, useEffect, useState } from "react";
import { getOffers } from "@/app/lib/api";
import type { Offer } from "@/app/lib/api";
import Header from "@/components/header";

export default function CasinoRedirectPage({
  params,
}: {
  params: Promise<{ offerId: string }>;
}) {
 
  const { offerId } = use(params);


  const [offers, setOffers] = useState<Offer[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchOffers() {
      try {
        const ofs = await getOffers();
        if (mounted) setOffers(ofs);
      } catch (err) {
        if (mounted) {
          const message =
            err instanceof Error
              ? err.message
              : "Failed to load offers (unknown error)";
          setError(message);
        }
      }
    }

    fetchOffers();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!offers) return;

    const target = offers.find((o) => String(o.id) === String(offerId));
    const url = target?.link;

    if (url) {

      const timer = setTimeout(() => {
        window.location.href = url;
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => {
      setError("Offer link not found"); }, 0);
    }
  }, [offers, offerId]);

  return (
    <>
    <Header />
    <main
      style={{
        minHeight: "calc(100vh - 96px)", 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b1523",
        color: "#fff",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      
      {error ? (
        <>
          <h2>Something went wrong</h2>
          <p style={{ opacity: 0.8 }}>{error}</p>
        </>
      ) : (
        <Loader />
      )}
      
    </main>
    </>
  );
}
function Loader() {
  return (
    <div
      style={{
        width: 64,
        height: 64,
        border: "6px solid rgba(255,255,255,.2)",
        borderTopColor: "#FDFF00",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    />
  );
}
