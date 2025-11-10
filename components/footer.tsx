"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-strip" />
 <div className="container">
      <div className="footer-inner">
        <div className="footer-logos-row">
          <img
            src="/fallback-logo.png"
            alt="Ripper Casino"
            className="footer-brand-logo"
          />

          <img
            src="/footer-logo.jpg"
            alt="Payment methods and responsible gambling logos"
            className="footer-logos-image"
          />
        </div>

        <div className="footer-bottom">
          <span className="footer-age">18+</span>
          <span className="footer-copy">
            Copyright © {year} Ripper Casino
          </span>
        </div>
      </div>
      </div>
    </footer>
  );
}
