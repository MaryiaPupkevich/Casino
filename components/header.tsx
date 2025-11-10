"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeaderProps {
  firstId?: string | number; 
}

export default function Header({ firstId }: HeaderProps) {
  const [open, setOpen] = useState(false);


  
const router = useRouter();

const openCasino = () => {
  if (!firstId) return;
  router.push(`/casino/${firstId}`); 
};


  return (
    <header className="header">
      <div className="container header-container">
        <div className="header-left">
          <button
            className={`burger ${open ? "is-open" : ""}`}
            aria-label="Открыть меню"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>

          <div className="logo">
            <Image
              src="/logo.jpg"
              alt="Ripper Casino Logo"
              width={60}
              height={60}
              priority
            />
            <div className="logo-text">
              <span className="logo-top">RIPPER</span>
              <span className="logo-bottom">CASINO</span>
            </div>
          </div>
        </div>

        <div className="header-right">
          <nav className="nav desktop-nav">
            <Link href="/bonus">Bonus</Link>
            <Link href="/application">App</Link>
            <Link href="/login">Log In</Link>
          </nav>

       
          <button className="play-btn" onClick={openCasino}>
            Play Now
          </button>
        </div>

        <nav
          id="mobile-menu"
          className={`mobile-nav ${open ? "is-open" : ""}`}
          onClick={() => setOpen(false)}
        >
          <div
            className="mobile-nav__panel"
            onClick={(e) => e.stopPropagation()}
          >
            <Link href="/bonus" className="mobile-link" onClick={() => setOpen(false)}>
              Bonus
            </Link>
            <Link href="/application" className="mobile-link" onClick={() => setOpen(false)}>
              App
            </Link>
            <Link href="/login" className="mobile-link" onClick={() => setOpen(false)}>
              Log In
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
